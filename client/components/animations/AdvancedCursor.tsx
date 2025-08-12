import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface CursorState {
  isVisible: boolean;
  isHovering: boolean;
  isClicking: boolean;
  cursorType: 'default' | 'hover' | 'text' | 'button' | 'drag' | 'view' | 'magnetic' | 'expand';
  cursorText: string;
  size: number;
}

interface TrailDot {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export default function AdvancedCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isVisible: true,
    isHovering: false,
    isClicking: false,
    cursorType: 'default',
    cursorText: '',
    size: 20
  });

  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const trailLength = 12;
  const trailIdRef = useRef(0);
  const movingTimeoutRef = useRef<NodeJS.Timeout>();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 400, mass: 0.4 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 400, mass: 0.4 });

  // Trail with different spring configs for smooth following
  const trailSprings = trail.map((_, index) => ({
    x: useSpring(mouseX, { 
      damping: 20 + index * 2, 
      stiffness: 300 - index * 15, 
      mass: 0.5 + index * 0.1 
    }),
    y: useSpring(mouseY, { 
      damping: 20 + index * 2, 
      stiffness: 300 - index * 15, 
      mass: 0.5 + index * 0.1 
    })
  }));

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      setIsMoving(true);
      
      // Clear previous timeout
      if (movingTimeoutRef.current) {
        clearTimeout(movingTimeoutRef.current);
      }
      
      // Set moving to false after a delay
      movingTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);

      // Update trail
      setTrail(prevTrail => {
        const newDot: TrailDot = {
          x: e.clientX,
          y: e.clientY,
          id: trailIdRef.current++,
          timestamp: Date.now()
        };
        
        const updatedTrail = [newDot, ...prevTrail.slice(0, trailLength - 1)];
        return updatedTrail;
      });
    };

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, isVisible: true }));
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, isVisible: false }));
    };

    // Enhanced hover detection with more selectors
    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorData = target.getAttribute('data-cursor');
      const cursorText = target.getAttribute('data-cursor-text') || '';
      
      if (cursorData) {
        setCursorState(prev => ({
          ...prev,
          cursorType: cursorData as any,
          cursorText,
          isHovering: true
        }));
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorState(prev => ({
          ...prev,
          cursorType: 'button',
          cursorText: '',
          isHovering: true
        }));
      } else if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        setCursorState(prev => ({
          ...prev,
          cursorType: 'text',
          cursorText: '',
          isHovering: true
        }));
      } else {
        setCursorState(prev => ({
          ...prev,
          cursorType: 'default',
          cursorText: '',
          isHovering: false
        }));
      }
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousemove', updateCursorType);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousemove', updateCursorType);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (movingTimeoutRef.current) {
        clearTimeout(movingTimeoutRef.current);
      }
    };
  }, [mouseX, mouseY]);

  const getCursorVariants = () => {
    const baseSize = cursorState.isClicking ? 0.8 : 1;
    
    switch (cursorState.cursorType) {
      case 'hover':
        return {
          scale: baseSize * 1.5,
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          border: '2px solid rgb(139, 92, 246)',
          backdropFilter: 'blur(10px)'
        };
      case 'button':
        return {
          scale: baseSize * 2.2,
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          border: '2px solid rgb(168, 85, 247)',
          backdropFilter: 'blur(15px)'
        };
      case 'text':
        return {
          scale: baseSize * 0.4,
          backgroundColor: 'rgba(59, 130, 246, 0.9)',
          border: 'none'
        };
      case 'drag':
        return {
          scale: baseSize * 1.8,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          border: '2px solid rgb(34, 197, 94)',
          backdropFilter: 'blur(8px)'
        };
      case 'view':
        return {
          scale: baseSize * 3,
          backgroundColor: 'rgba(245, 101, 101, 0.1)',
          border: '2px solid rgb(245, 101, 101)',
          backdropFilter: 'blur(20px)'
        };
      case 'magnetic':
        return {
          scale: baseSize * 1.8,
          backgroundColor: 'rgba(139, 92, 246, 0.3)',
          border: '3px solid rgb(139, 92, 246)',
          backdropFilter: 'blur(12px)'
        };
      case 'expand':
        return {
          scale: baseSize * 4,
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          border: '2px solid rgb(236, 72, 153)',
          backdropFilter: 'blur(25px)'
        };
      default:
        return {
          scale: baseSize,
          backgroundColor: 'rgba(139, 92, 246, 0.4)',
          border: 'none',
          backdropFilter: 'blur(5px)'
        };
    }
  };

  // Hide cursor on mobile devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  if (!cursorState.isVisible) {
    return null;
  }

  return (
    <>
      {/* Enhanced Trail Effect */}
      {trail.map((dot, index) => (
        <motion.div
          key={dot.id}
          className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
          style={{
            x: trailSprings[index]?.x || dot.x,
            y: trailSprings[index]?.y || dot.y,
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: (trailLength - index) / trailLength * 0.6,
            opacity: (trailLength - index) / trailLength * 0.4
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            delay: index * 0.015
          }}
        >
          <div 
            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
            style={{
              filter: `blur(${index * 0.5}px)`,
              background: `linear-gradient(${index * 30}deg, #a855f7, #ec4899, #3b82f6)`
            }}
          />
        </motion.div>
      ))}

      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={getCursorVariants()}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
          mass: 0.5
        }}
      >
        <div className="w-5 h-5 rounded-full transition-all duration-300" />
      </motion.div>

      {/* Inner Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorState.isClicking ? 0.2 : 0.6,
          backgroundColor: cursorState.isHovering 
            ? 'rgb(168, 85, 247)' 
            : cursorState.isClicking 
            ? 'rgb(239, 68, 68)' 
            : 'rgb(139, 92, 246)'
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 500
        }}
      >
        <div className="w-2 h-2 rounded-full" />
      </motion.div>

      {/* Magnetic Field Effect */}
      {cursorState.cursorType === 'magnetic' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-20 h-20 rounded-full border border-purple-400/30 bg-purple-400/5" />
        </motion.div>
      )}

      {/* Movement Ripple Effect */}
      {isMoving && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-purple-400/50"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-8 h-8 rounded-full" />
        </motion.div>
      )}

      {/* Enhanced Cursor Text */}
      <AnimatePresence>
        {cursorState.cursorText && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10000]"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-250%'
            }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 300
            }}
          >
            <div className="bg-gradient-to-r from-purple-900/95 to-pink-900/95 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border border-purple-400/30 shadow-2xl">
              {cursorState.cursorText}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-900/95" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Ripple Effect */}
      {cursorState.isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border-2 border-purple-400"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-8 h-8 rounded-full" />
        </motion.div>
      )}
    </>
  );
}
