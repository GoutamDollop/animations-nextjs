import { gsap } from "gsap";

interface PerformanceConfig {
  enableReducedMotion?: boolean;
  enableGPUAcceleration?: boolean;
  enableWebGL?: boolean;
  preferredFPS?: number;
  batteryOptimization?: boolean;
}

export class EnhancedPerformanceManager {
  private static instance: EnhancedPerformanceManager;
  private config: PerformanceConfig;
  private deviceCapabilities: any = {};
  private animationQuality: 'low' | 'medium' | 'high' = 'high';
  private rafId: number | null = null;
  private performanceObserver: PerformanceObserver | null = null;

  private constructor() {
    this.config = {
      enableReducedMotion: false,
      enableGPUAcceleration: true,
      enableWebGL: true,
      preferredFPS: 60,
      batteryOptimization: true,
    };

    this.detectDeviceCapabilities();
    this.initializePerformanceOptimizations();
    this.setupReducedMotionPreference();
  }

  static getInstance(): EnhancedPerformanceManager {
    if (!EnhancedPerformanceManager.instance) {
      EnhancedPerformanceManager.instance = new EnhancedPerformanceManager();
    }
    return EnhancedPerformanceManager.instance;
  }

  private detectDeviceCapabilities() {
    // Device memory detection
    const navigator: any = window.navigator;
    this.deviceCapabilities.memory = navigator.deviceMemory || 4;
    
    // CPU cores detection
    this.deviceCapabilities.cores = navigator.hardwareConcurrency || 4;
    
    // Connection speed detection
    const connection: any = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    this.deviceCapabilities.connectionType = connection?.effectiveType || 'unknown';
    
    // Battery level detection
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery: any) => {
        this.deviceCapabilities.batteryLevel = battery.level;
        this.deviceCapabilities.charging = battery.charging;
        
        // Adjust quality based on battery
        if (this.config.batteryOptimization && battery.level < 0.2 && !battery.charging) {
          this.animationQuality = 'low';
        }
      });
    }

    // Screen resolution and pixel ratio
    this.deviceCapabilities.pixelRatio = window.devicePixelRatio || 1;
    this.deviceCapabilities.screenWidth = window.screen.width;
    this.deviceCapabilities.screenHeight = window.screen.height;
    
    // Mobile detection
    this.deviceCapabilities.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // GPU detection (basic)
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        this.deviceCapabilities.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }

    // Determine animation quality based on capabilities
    this.determineAnimationQuality();
  }

  private determineAnimationQuality() {
    let score = 0;

    // Memory scoring
    if (this.deviceCapabilities.memory >= 8) score += 3;
    else if (this.deviceCapabilities.memory >= 4) score += 2;
    else score += 1;

    // CPU cores scoring
    if (this.deviceCapabilities.cores >= 8) score += 3;
    else if (this.deviceCapabilities.cores >= 4) score += 2;
    else score += 1;

    // Connection scoring
    if (this.deviceCapabilities.connectionType === '4g') score += 2;
    else if (this.deviceCapabilities.connectionType === '3g') score += 1;

    // Mobile penalty
    if (this.deviceCapabilities.isMobile) score -= 2;

    // High DPI penalty
    if (this.deviceCapabilities.pixelRatio > 2) score -= 1;

    // Determine quality
    if (score >= 7) this.animationQuality = 'high';
    else if (score >= 4) this.animationQuality = 'medium';
    else this.animationQuality = 'low';

    console.log(`Animation quality set to: ${this.animationQuality} (score: ${score})`);
  }

  private initializePerformanceOptimizations() {
    // Set GSAP force3D based on device capabilities
    gsap.config({
      force3D: this.config.enableGPUAcceleration && this.animationQuality !== 'low',
      autoSleep: 60, // Auto-sleep after 60 seconds of inactivity
    });

    // Optimize based on animation quality
    switch (this.animationQuality) {
      case 'low':
        this.optimizeForLowEnd();
        break;
      case 'medium':
        this.optimizeForMidRange();
        break;
      case 'high':
        this.optimizeForHighEnd();
        break;
    }
  }

  private optimizeForLowEnd() {
    gsap.config({
      force3D: false,
      autoSleep: 30,
    });

    // Reduce default animation durations
    gsap.defaults({
      duration: 0.3,
      ease: "power1.out",
    });
  }

  private optimizeForMidRange() {
    gsap.config({
      force3D: true,
      autoSleep: 45,
    });

    gsap.defaults({
      duration: 0.5,
      ease: "power2.out",
    });
  }

  private optimizeForHighEnd() {
    gsap.config({
      force3D: true,
      autoSleep: 60,
    });

    gsap.defaults({
      duration: 0.8,
      ease: "power3.out",
    });
  }

  private setupReducedMotionPreference() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      this.config.enableReducedMotion = e.matches;
      
      if (e.matches) {
        // Disable or reduce animations
        gsap.globalTimeline.timeScale(0.1);
        this.animationQuality = 'low';
      } else {
        gsap.globalTimeline.timeScale(1);
      }
    };

    mediaQuery.addListener(handleReducedMotion);
    handleReducedMotion(mediaQuery);
  }

  // Public methods for animation optimization
  getOptimizedDuration(baseDuration: number): number {
    if (this.config.enableReducedMotion) return baseDuration * 0.1;
    
    switch (this.animationQuality) {
      case 'low': return baseDuration * 0.5;
      case 'medium': return baseDuration * 0.75;
      case 'high': return baseDuration;
      default: return baseDuration;
    }
  }

  getOptimizedStagger(baseStagger: number): number {
    if (this.config.enableReducedMotion) return 0;
    
    switch (this.animationQuality) {
      case 'low': return baseStagger * 0.5;
      case 'medium': return baseStagger * 0.75;
      case 'high': return baseStagger;
      default: return baseStagger;
    }
  }

  shouldEnableParallax(): boolean {
    return !this.deviceCapabilities.isMobile && 
           this.animationQuality !== 'low' && 
           !this.config.enableReducedMotion;
  }

  shouldEnableComplexAnimations(): boolean {
    return this.animationQuality === 'high' && !this.config.enableReducedMotion;
  }

  shouldEnableParticles(): boolean {
    return this.animationQuality === 'high' && 
           !this.deviceCapabilities.isMobile && 
           !this.config.enableReducedMotion;
  }

  shouldEnableBlur(): boolean {
    return this.animationQuality !== 'low' && !this.config.enableReducedMotion;
  }

  getAnimationEasing(): string {
    switch (this.animationQuality) {
      case 'low': return 'none';
      case 'medium': return 'power1.out';
      case 'high': return 'power3.out';
      default: return 'power2.out';
    }
  }

  // Frame rate monitoring
  startFPSMonitoring() {
    let frames = 0;
    let lastTime = performance.now();

    const monitor = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        
        // Adjust quality based on FPS
        if (fps < 30 && this.animationQuality !== 'low') {
          this.animationQuality = 'low';
          this.optimizeForLowEnd();
          console.log('Downgraded to low quality due to low FPS:', fps);
        } else if (fps >= 50 && this.animationQuality === 'low') {
          this.animationQuality = 'medium';
          this.optimizeForMidRange();
          console.log('Upgraded to medium quality due to good FPS:', fps);
        }
        
        frames = 0;
        lastTime = currentTime;
      }
      
      this.rafId = requestAnimationFrame(monitor);
    };

    this.rafId = requestAnimationFrame(monitor);
  }

  stopFPSMonitoring() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  // Memory usage monitoring
  startMemoryMonitoring() {
    if ('memory' in performance) {
      const monitor = () => {
        const memory: any = (performance as any).memory;
        const memoryUsage = memory.usedJSHeapSize / memory.totalJSHeapSize;
        
        // If memory usage is high, reduce animation quality
        if (memoryUsage > 0.8 && this.animationQuality !== 'low') {
          this.animationQuality = 'low';
          this.optimizeForLowEnd();
          console.log('Reduced animation quality due to high memory usage:', memoryUsage);
        }
      };

      setInterval(monitor, 5000); // Check every 5 seconds
    }
  }

  // Adaptive quality adjustment
  adaptQualityToPerformance() {
    this.startFPSMonitoring();
    this.startMemoryMonitoring();

    // Battery level monitoring
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const handleBatteryChange = () => {
          if (this.config.batteryOptimization) {
            if (battery.level < 0.15 && !battery.charging) {
              this.animationQuality = 'low';
              this.optimizeForLowEnd();
            } else if (battery.level > 0.5 && battery.charging) {
              this.determineAnimationQuality();
              this.initializePerformanceOptimizations();
            }
          }
        };

        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
      });
    }
  }

  // Utility methods
  getDeviceInfo() {
    return {
      ...this.deviceCapabilities,
      animationQuality: this.animationQuality,
      reducedMotion: this.config.enableReducedMotion,
    };
  }

  setAnimationQuality(quality: 'low' | 'medium' | 'high') {
    this.animationQuality = quality;
    this.initializePerformanceOptimizations();
  }

  // Cleanup
  cleanup() {
    this.stopFPSMonitoring();
    
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }

  // Create optimized GSAP timeline
  createOptimizedTimeline(options: any = {}) {
    return gsap.timeline({
      ...options,
      delay: this.getOptimizedDuration(options.delay || 0),
      ease: this.getAnimationEasing(),
    });
  }

  // Create optimized animation
  createOptimizedAnimation(targets: any, vars: any) {
    return gsap.to(targets, {
      ...vars,
      duration: this.getOptimizedDuration(vars.duration || 1),
      ease: vars.ease || this.getAnimationEasing(),
      force3D: this.config.enableGPUAcceleration && this.animationQuality !== 'low',
    });
  }
}

// Export singleton instance
export const performanceManager = EnhancedPerformanceManager.getInstance();

// Export utility functions
export const getOptimizedConfig = () => ({
  quality: performanceManager.getDeviceInfo().animationQuality,
  isMobile: performanceManager.getDeviceInfo().isMobile,
  shouldEnableParallax: performanceManager.shouldEnableParallax(),
  shouldEnableParticles: performanceManager.shouldEnableParticles(),
  shouldEnableBlur: performanceManager.shouldEnableBlur(),
  shouldEnableComplexAnimations: performanceManager.shouldEnableComplexAnimations(),
});

export default EnhancedPerformanceManager;
