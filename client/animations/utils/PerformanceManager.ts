export class PerformanceManager {
  private static instance: PerformanceManager;
  private observers: IntersectionObserver[] = [];
  private animationFrames: number[] = [];
  private timeouts: NodeJS.Timeout[] = [];
  private intervals: NodeJS.Timeout[] = [];

  private constructor() {
    this.setupPerformanceMonitoring();
  }

  static getInstance(): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager();
    }
    return PerformanceManager.instance;
  }

  private setupPerformanceMonitoring() {
    // Monitor FPS and performance
    if (typeof window !== 'undefined') {
      let lastTime = performance.now();
      let frameCount = 0;

      const measureFPS = () => {
        const currentTime = performance.now();
        frameCount++;

        if (currentTime - lastTime >= 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          
          // Reduce animations if FPS is too low
          if (fps < 30) {
            this.reduceAnimations();
          }

          frameCount = 0;
          lastTime = currentTime;
        }

        this.addAnimationFrame(requestAnimationFrame(measureFPS));
      };

      measureFPS();
    }
  }

  private reduceAnimations() {
    // Add class to body to reduce animations via CSS
    if (typeof document !== 'undefined') {
      document.body.classList.add('reduce-motion');
    }
  }

  addIntersectionObserver(observer: IntersectionObserver) {
    this.observers.push(observer);
  }

  addAnimationFrame(id: number) {
    this.animationFrames.push(id);
  }

  addTimeout(id: NodeJS.Timeout) {
    this.timeouts.push(id);
  }

  addInterval(id: NodeJS.Timeout) {
    this.intervals.push(id);
  }

  // Throttle function for performance
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Debounce function for performance
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
      this.addTimeout(timeoutId);
    };
  }

  // Check if user prefers reduced motion
  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Get optimal animation duration based on performance
  getOptimalDuration(baseDuration: number): number {
    if (this.prefersReducedMotion()) return 0;
    
    // Reduce duration on lower-end devices
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === '2g') {
      return baseDuration * 0.5;
    }
    
    return baseDuration;
  }

  // Cleanup all managed resources
  cleanup() {
    // Clear intersection observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    // Clear animation frames
    this.animationFrames.forEach(id => cancelAnimationFrame(id));
    this.animationFrames = [];

    // Clear timeouts
    this.timeouts.forEach(id => clearTimeout(id));
    this.timeouts = [];

    // Clear intervals
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];

    // Remove performance monitoring class
    if (typeof document !== 'undefined') {
      document.body.classList.remove('reduce-motion');
    }
  }

  // Check if device is mobile
  isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768 || 'ontouchstart' in window;
  }

  // Get device performance tier
  getPerformanceTier(): 'low' | 'medium' | 'high' {
    if (typeof navigator === 'undefined') return 'medium';
    
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    
    if (memory && memory < 4 || cores && cores < 4) {
      return 'low';
    } else if (memory && memory >= 8 || cores && cores >= 8) {
      return 'high';
    }
    
    return 'medium';
  }
}

export default PerformanceManager;
