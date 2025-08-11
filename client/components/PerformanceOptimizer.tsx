import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Advanced performance optimizations for smooth animations
    const optimizePerformance = () => {
      // Throttled scroll events with requestAnimationFrame
      let ticking = false;
      let lastScrollY = 0;
      
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const scrollDelta = Math.abs(scrollY - lastScrollY);
            
            // Only trigger expensive operations if scroll is significant
            if (scrollDelta > 5) {
              // Add scroll-based optimizations here
              lastScrollY = scrollY;
            }
            ticking = false;
          });
          ticking = true;
        }
      };

      // Optimized resize handler
      let resizeTimer: number;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // Trigger resize-based optimizations
          document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }, 100);
      };

      // Add passive event listeners for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
      };
    };

    // Optimize images for better loading performance
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              
              // Add loading optimizations
              if (img.dataset.src && !img.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              
              // Add decode optimization for newer browsers
              if ('decode' in img) {
                img.decode().catch(() => {
                  // Fallback for decode errors
                });
              }
              
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });
        
        images.forEach((img) => {
          if (img.loading !== 'lazy') {
            img.loading = 'lazy';
          }
          imageObserver.observe(img);
        });
        
        return () => {
          images.forEach((img) => imageObserver.unobserve(img));
        };
      }
    };

    // Optimize animations with will-change property
    const optimizeAnimations = () => {
      const animatedElements = document.querySelectorAll('[class*="animate-"], [class*="transition-"], [class*="transform"], .enhanced-btn, .magnetic, .floating');
      
      animatedElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.willChange = 'transform, opacity';
        
        // Remove will-change after animation completes to save memory
        element.addEventListener('animationend', () => {
          element.style.willChange = 'auto';
        });
        
        element.addEventListener('transitionend', () => {
          element.style.willChange = 'auto';
        });
      });
      
      // Cleanup will-change after a reasonable time
      const cleanupTimer = setTimeout(() => {
        animatedElements.forEach((el) => {
          (el as HTMLElement).style.willChange = 'auto';
        });
      }, 5000);
      
      return () => clearTimeout(cleanupTimer);
    };

    // Optimize rendering with GPU acceleration
    const optimizeRendering = () => {
      // Force GPU acceleration for key elements
      const gpuElements = document.querySelectorAll('.three-canvas, .hero-container, .parallax-bg, .floating, .magnetic');
      
      gpuElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = element.style.transform || 'translateZ(0)';
        element.style.backfaceVisibility = 'hidden';
        element.style.perspective = '1000px';
      });
    };

    // Memory management for Three.js
    const optimizeThreeJS = () => {
      // Add memory management for Three.js scenes
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure' && entry.name.includes('three')) {
            // Monitor Three.js performance
            if (entry.duration > 16) { // More than 1 frame at 60fps
              console.warn('Three.js performance warning:', entry.duration);
            }
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['measure'] });
      } catch (e) {
        // Fallback for browsers that don't support this
      }
      
      return () => {
        try {
          observer.disconnect();
        } catch (e) {
          // Safe cleanup
        }
      };
    };

    // Advanced frame rate optimization
    const optimizeFrameRate = () => {
      let lastTime = 0;
      const targetFPS = 60;
      const targetFrameTime = 1000 / targetFPS;
      
      const monitor = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > targetFrameTime * 2) {
          // Frame rate is dropping, reduce animation complexity
          document.documentElement.style.setProperty('--reduced-motion', '1');
        } else {
          document.documentElement.style.setProperty('--reduced-motion', '0');
        }
        
        lastTime = currentTime;
        requestAnimationFrame(monitor);
      };
      
      requestAnimationFrame(monitor);
    };

    // Initialize all optimizations
    const cleanupScroll = optimizePerformance();
    const cleanupImages = optimizeImages();
    const cleanupAnimations = optimizeAnimations();
    const cleanupThreeJS = optimizeThreeJS();
    
    optimizeRendering();
    optimizeFrameRate();

    // Set initial CSS custom properties for responsive design
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

    // Performance monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Monitor key performance metrics
          if (entry.entryType === 'largest-contentful-paint') {
            if (entry.startTime > 2500) { // LCP threshold
              console.warn('Large Contentful Paint is slow:', entry.startTime);
            }
          }
          
          if (entry.entryType === 'first-input-delay') {
            if ((entry as any).processingStart - entry.startTime > 100) {
              console.warn('First Input Delay is high:', (entry as any).processingStart - entry.startTime);
            }
          }
        });
      });
      
      try {
        observer.observe({ 
          entryTypes: ['largest-contentful-paint', 'first-input-delay', 'layout-shift'] 
        });
      } catch (e) {
        // Fallback for older browsers
      }
    }

    // Cleanup function
    return () => {
      if (cleanupScroll) cleanupScroll();
      if (cleanupImages) cleanupImages();
      if (cleanupAnimations) cleanupAnimations();
      if (cleanupThreeJS) cleanupThreeJS();
    };
  }, []);
  
  return null; // This component only manages performance
}
