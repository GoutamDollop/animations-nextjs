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

export default function ModernCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isVisible: true,
    isHovering: false,
    isClicking: false,
    cursorType: 'default',
    cursorText: '',
    size: 20
  });

  const [isMoving, setIsMoving] = useState(false);
  const movingTimeoutRef = useRef<NodeJS.Timeout>();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth cursor movement with improved spring physics
  const cursorX = useSpring(mouseX, { 
    damping: 25, 
    stiffness: 700, 
    mass: 0.05 
  });
  const cursorY = useSpring(mouseY, { 
    damping: 25, 
    stiffness: 700, 
    mass: 0.05 
  });

  // Trailing cursor with smoother physics
  const trailX = useSpring(mouseX, { 
    damping: 20, 
    stiffness: 300, 
    mass: 0.2 
  });
  const trailY = useSpring(mouseY, { 
    damping: 20, 
    stiffness: 300, 
    mass: 0.2 
  });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      setIsMoving(true);
      
      if (movingTimeoutRef.current) {
        clearTimeout(movingTimeoutRef.current);
      }
      
      movingTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 150);
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

    // Enhanced cursor type detection
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
        target.classList.contains('cursor-pointer') ||
        target.role === 'button'
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
    const baseScale = cursorState.isClicking ? 0.8 : 1;
    
    switch (cursorState.cursorType) {
      case 'hover':
        return {
          scale: baseScale * 1.5,
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderColor: 'rgb(139, 92, 246)',
          borderWidth: '2px'
        };
      case 'button':
        return {
          scale: baseScale * 2,
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          borderColor: 'rgb(168, 85, 247)',
          borderWidth: '2px'
        };
      case 'text':
        return {
          scale: baseScale * 0.3,
          backgroundColor: 'rgb(59, 130, 246)',
          borderColor: 'transparent',
          borderWidth: '0px'
        };
      case 'magnetic':
        return {
          scale: baseScale * 1.8,
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          borderColor: 'rgb(139, 92, 246)',
          borderWidth: '3px'
        };
      case 'expand':
        return {
          scale: baseScale * 3.5,
          backgroundColor: 'rgba(236, 72, 153, 0.08)',
          borderColor: 'rgb(236, 72, 153)',
          borderWidth: '2px'
        };
      default:
        return {
          scale: baseScale,
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          borderColor: 'rgb(139, 92, 246)',
          borderWidth: '1px'
        };
    }
  };

  // Hide cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  if (!cursorState.isVisible) {
    return null;
  }

  return (
    <>
      {/* Trailing Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorState.isHovering ? 0.8 : 1,
          opacity: cursorState.isHovering ? 0.6 : 0.4
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full" />
      </motion.div>

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border backdrop-blur-sm"
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
          mass: 0.1
        }}
      >
        <div className="w-6 h-6 rounded-full" />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: cursorState.isClicking ? 0.5 : cursorState.cursorType === 'text' ? 0 : 0.8,
          backgroundColor: cursorState.isHovering 
            ? 'rgb(168, 85, 247)' 
            : cursorState.isClicking 
            ? 'rgb(239, 68, 68)' 
            : 'rgb(139, 92, 246)'
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 600
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full" />
      </motion.div>

      {/* Magnetic Field Effect */}
      {cursorState.cursorType === 'magnetic' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border border-purple-400/30"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 rounded-full bg-purple-400/10" />
        </motion.div>
      )}

      {/* Movement Ripple */}
      {isMoving && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full border border-purple-400/40"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-6 h-6 rounded-full" />
        </motion.div>
      )}

      {/* Click Ripple */}
      {cursorState.isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full border-2 border-purple-500"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%'
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-6 h-6 rounded-full" />
        </motion.div>
      )}

      {/* Cursor Text */}
      <AnimatePresence>
        {cursorState.cursorText && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10000]"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: '-50%',
              translateY: '-300%'
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              type: 'spring',
              damping: 20,
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

      {/* Expand Effect */}
      {cursorState.cursorType === 'expand' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
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
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm" />
        </motion.div>
      )}
    </>
  );
}
