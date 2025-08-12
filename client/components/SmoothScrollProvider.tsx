import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisConfig } from "../config/animations";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number, options?: any) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error("useSmoothScroll must be used within a SmoothScrollProvider");
  }
  return context;
};

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis(lenisConfig);
    lenisRef.current = lenis;
    
    // Integrate with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    
    // Add to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    
    // Handle anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -100, // Account for fixed navbar
              duration: 2,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };
    
    document.addEventListener("click", handleAnchorClick);
    
    // Cleanup
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);
  
  const scrollTo = (target: string | number, options: any = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -100,
        duration: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    }
  };
  
  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };
  
  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };
  
  const contextValue: SmoothScrollContextType = {
    lenis: lenisRef.current,
    scrollTo,
    stop,
    start,
  };
  
  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
