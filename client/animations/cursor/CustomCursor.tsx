import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  cursorType: 'default' | 'hover' | 'text' | 'button' | 'drag' | 'view' | 'magnetic';
  cursorText: string;
  isVisible: boolean;
}

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    cursorType: 'default',
    cursorText: '',
    isVisible: true
  });

  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailLength = 8;
  const trailIdRef = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const cursorX = useSpring(mouseX, { damping: 30, stiffness: 500, mass: 0.3 });
  const cursorY = useSpring(mouseY, { damping: 30, stiffness: 500, mass: 0.3 });

  const trailSpringConfig = { damping: 30, stiffness: 200, mass: 1 };

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      mouseX.set(x);
      mouseY.set(y);

      // Update trail
      setTrail(prevTrail => {
        const newTrail = [
          { x, y, id: trailIdRef.current++ },
          ...prevTrail.slice(0, trailLength - 1)
        ];
        return newTrail;
      });
    };

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const cursorType = target.getAttribute('data-cursor') || 'hover';
      const cursorText = target.getAttribute('data-cursor-text') || '';
      
      setCursorState(prev => ({
        ...prev,
        isHovering: true,
        cursorType: cursorType as CursorState['cursorType'],
        cursorText,
        isVisible: true
      }));
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({
        ...prev,
        isHovering: false,
        cursorType: 'default',
        cursorText: '',
        isVisible: true
      }));
    };

    const handleMouseEnterWindow = () => {
      setCursorState(prev => ({ ...prev, isVisible: true }));
    };

    const handleMouseLeaveWindow = () => {
      setCursorState(prev => ({ ...prev, isVisible: false }));
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    const hoverElements = document.querySelectorAll('.cursor-hover, button, a, [data-cursor], input, textarea');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      hoverElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  const getCursorVariants = () => {
    const baseSize = cursorState.isClicking ? 0.7 : 1;
    
    switch (cursorState.cursorType) {
      case 'hover':
        return {
          scale: baseSize * 2,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          border: '2px solid rgb(99, 102, 241)',
          backdropFilter: 'blur(10px)'
        };
      case 'button':
        return {
          scale: baseSize * 2.5,
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          border: '2px solid rgb(168, 85, 247)',
          backdropFilter: 'blur(15px)'
        };
      case 'text':
        return {
          scale: baseSize * 0.3,
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
          scale: baseSize * 1.5,
          backgroundColor: 'rgba(139, 92, 246, 0.3)',
          border: '3px solid rgb(139, 92, 246)',
          backdropFilter: 'blur(12px)'
        };
      default:
        return {
          scale: baseSize,
          backgroundColor: 'rgba(99, 102, 241, 0.4)',
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
      {/* Trail Effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
          style={{
            x: point.x,
            y: point.y,
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: (trailLength - index) / trailLength * 0.5,
            opacity: (trailLength - index) / trailLength * 0.3
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            delay: index * 0.02
          }}
        >
          <div 
            className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            style={{
              filter: 'blur(1px)'
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
          damping: 25,
          stiffness: 400,
          mass: 0.6
        }}
      >
        <div className="w-8 h-8 rounded-full transition-all duration-300" />
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
          scale: cursorState.isClicking ? 0.3 : 0.8,
          backgroundColor: cursorState.isHovering 
            ? 'rgb(168, 85, 247)' 
            : cursorState.isClicking 
            ? 'rgb(239, 68, 68)' 
            : 'rgb(99, 102, 241)'
        }}
        transition={{
          type: 'spring',
          damping: 30,
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
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 rounded-full border border-purple-400/30 bg-purple-400/5" />
        </motion.div>
      )}

      {/* Cursor Text with Enhanced Styling */}
      <AnimatePresence>
        {cursorState.cursorText && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10000]"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-200%'
            }}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 300
            }}
          >
            <div className="bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border border-white/10 shadow-2xl">
              {cursorState.cursorText}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple Effect on Click */}
      {cursorState.isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border-2 border-blue-400"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-8 h-8 rounded-full" />
        </motion.div>
      )}
    </>
  );
}
