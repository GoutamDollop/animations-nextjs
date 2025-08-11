import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    // Throttled mouse move handler for better performance
    let animationId: number;
    
    const updateCursor = () => {
      if (cursor && follower) {
        cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        follower.style.transform = `translate3d(${mouseX - 16}px, ${mouseY - 16}px, 0)`;
        
        if (isHovering) {
          cursor.style.transform += ' scale(1.5)';
          follower.style.transform += ' scale(1.5)';
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      animationId = requestAnimationFrame(updateCursor);
    };

    const handleMouseEnter = () => {
      isHovering = true;
      updateCursor();
    };

    const handleMouseLeave = () => {
      isHovering = false;
      updateCursor();
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .interactive-btn, .hover-image, .stat-card, .feature-card, .enhanced-btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden lg:block"
      />
      
      {/* Cursor follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-orange-500 rounded-full pointer-events-none z-[9998] opacity-60 transition-transform duration-300 ease-out hidden lg:block"
      />
    </>
  );
}
