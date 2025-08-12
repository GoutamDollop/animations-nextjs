import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Lenis dynamically to avoid SSR issues
let Lenis: any;

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function SmoothScroll({ children, className = '' }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Initialize smooth scrolling with fallback
    const initSmoothScroll = async () => {
      if (typeof window === 'undefined') return;
      
      try {+
        // Try to import Lenis if available
        const LenisModule = await import('lenis');
        const LenisClass = LenisModule.default;
        
        // Initialize Lenis
        lenisRef.current = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        // Lenis scroll event
        lenisRef.current.on('scroll', () => {
          ScrollTrigger.update();
        });

        // Animation loop
        function raf(time: number) {
          lenisRef.current?.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);
      } catch (error) {
        console.warn('Lenis not available, using fallback smooth scroll');
        // Fallback to CSS smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    };

    initSmoothScroll();

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 2 });
  };

  // Scroll to element function
  const scrollToElement = (target: string | HTMLElement, offset = 0) => {
    lenisRef.current?.scrollTo(target, { offset, duration: 1.5 });
  };

  // Expose methods globally for other components to use
  useEffect(() => {
    (window as any).smoothScroll = {
      scrollTo: (target: string | HTMLElement, offset?: number) => 
        scrollToElement(target, offset),
      scrollToTop,
      lenis: lenisRef.current,
    };
  }, []);

  return (
    <div className={`smooth-scroll-container ${className}`}>
      {children}
    </div>
  );
}
