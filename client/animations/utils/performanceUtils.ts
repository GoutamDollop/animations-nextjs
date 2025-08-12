import { gsap } from 'gsap';

// Performance optimization utilities
export class PerformanceManager {
  private static instance: PerformanceManager;
  private rafId: number | null = null;
  private isReducedMotion = false;

  constructor() {
    this.checkReducedMotion();
    this.setupPerformanceMonitoring();
  }

  static getInstance(): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager();
    }
    return PerformanceManager.instance;
  }

  // Check for reduced motion preference
  private checkReducedMotion() {
    if (typeof window !== 'undefined') {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  // Setup performance monitoring
  private setupPerformanceMonitoring() {
    if (typeof window !== 'undefined') {
      // Monitor FPS
      let lastTime = performance.now();
      let frames = 0;
      
      const measureFPS = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
          const fps = Math.round((frames * 1000) / (currentTime - lastTime));
          
          // Adjust animation quality based on FPS
          if (fps < 30) {
            this.reducedQualityMode();
          } else if (fps > 50) {
            this.highQualityMode();
          }
          
          frames = 0;
          lastTime = currentTime;
        }
        
        this.rafId = requestAnimationFrame(measureFPS);
      };
      
      measureFPS();
    }
  }

  // Reduce animation quality for better performance
  private reducedQualityMode() {
    gsap.globalTimeline.timeScale(0.8);
    document.documentElement.style.setProperty('--animation-duration-multiplier', '0.7');
  }

  // Enable high quality animations
  private highQualityMode() {
    gsap.globalTimeline.timeScale(1);
    document.documentElement.style.setProperty('--animation-duration-multiplier', '1');
  }

  // Get optimized animation duration
  getOptimizedDuration(baseDuration: number): number {
    if (this.isReducedMotion) return baseDuration * 0.3;
    
    const multiplier = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--animation-duration-multiplier') || '1'
    );
    
    return baseDuration * multiplier;
  }

  // Debounce function for performance
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Throttle function for performance
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Cleanup resources
  cleanup() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

// Intersection Observer for lazy loading animations
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Preload critical animations
export const preloadAnimations = () => {
  // Preload GSAP plugins
  gsap.set(document.body, { opacity: 1 });
  
  // Create dummy timeline to initialize GSAP
  const tl = gsap.timeline({ paused: true });
  tl.to({}, { duration: 0.1 });
  tl.kill();
};

// Memory management for animations
export const cleanupAnimations = (elements: Element[]) => {
  elements.forEach(element => {
    gsap.killTweensOf(element);
    // Remove any custom properties
    gsap.set(element, { clearProps: "all" });
  });
};

export default PerformanceManager;
