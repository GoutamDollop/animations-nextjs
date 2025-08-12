import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PageTransitionsProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransitions({ children, className = '' }: PageTransitionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    
    if (!container || !overlay) return;

    // Page enter animation
    const tl = gsap.timeline();
    
    tl.set(overlay, { scaleX: 0, transformOrigin: 'left center' })
      .set(container, { opacity: 0, y: 50 })
      .to(overlay, { 
        scaleX: 1, 
        duration: 0.6, 
        ease: "power2.inOut" 
      })
      .to(container, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.3")
      .to(overlay, { 
        scaleX: 0, 
        transformOrigin: 'right center',
        duration: 0.6, 
        ease: "power2.inOut" 
      }, "-=0.4");

    // Cleanup function for page exit
    return () => {
      gsap.set([container, overlay], { clearProps: "all" });
    };
  }, []);

  const handlePageExit = (callback: () => void) => {
    const overlay = overlayRef.current;
    const container = containerRef.current;
    
    if (!overlay || !container) {
      callback();
      return;
    }

    const tl = gsap.timeline({
      onComplete: callback
    });

    tl.set(overlay, { scaleX: 0, transformOrigin: 'left center' })
      .to(container, { 
        opacity: 0, 
        y: -30, 
        duration: 0.4, 
        ease: "power2.in" 
      })
      .to(overlay, { 
        scaleX: 1, 
        duration: 0.6, 
        ease: "power2.inOut" 
      }, "-=0.2");
  };

  // Expose the exit function globally for navigation
  useEffect(() => {
    (window as any).pageTransition = {
      exit: handlePageExit
    };
  }, []);

  return (
    <div className={`page-transition-container ${className}`} style={{ position: 'relative' }}>
      <div
        ref={overlayRef}
        className="page-transition-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />
      <div ref={containerRef} className="page-content">
        {children}
      </div>
    </div>
  );
}
