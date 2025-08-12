import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  scrollPerformance: number;
}

export default function EnhancedPerformanceOptimizer() {
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    scrollPerformance: 100,
  });
  const isInitialized = useRef(false);
  const performanceObserver = useRef<PerformanceObserver | null>(null);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initializeOptimizations = () => {
      // 1. GPU Acceleration for Common Elements
      const enableGPUAcceleration = () => {
        const elementsToAccelerate = [
          ".enhanced-btn",
          ".magnetic",
          ".magnetic-scroll",
          ".rotate-3d",
          ".float-slow",
          ".float-medium",
          ".float-fast",
          ".parallax-bg",
          ".hero-container",
          ".three-background",
          ".cursor-follower",
          ".cursor-dot",
          ".gallery-item",
          ".slider-container",
          ".card-title",
          ".section-title",
        ];

        elementsToAccelerate.forEach((selector) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element: Element) => {
            const htmlElement = element as HTMLElement;
            htmlElement.style.willChange = "transform, opacity";
            htmlElement.style.transform = "translateZ(0)";
            htmlElement.style.backfaceVisibility = "hidden";
            htmlElement.style.perspective = "1000px";
          });
        });
      };

      // 2. Lazy Loading Images with Intersection Observer
      const setupLazyLoading = () => {
        if ("IntersectionObserver" in window) {
          const imageObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const img = entry.target as HTMLImageElement;
                  const src = img.dataset.src;

                  if (src) {
                    img.src = src;
                    img.classList.remove("lazy");
                    img.classList.add("loaded");
                    imageObserver.unobserve(img);

                    // Animate image on load
                    gsap.fromTo(
                      img,
                      { opacity: 0, scale: 1.1 },
                      {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out",
                      },
                    );
                  }
                }
              });
            },
            {
              rootMargin: "50px 0px",
              threshold: 0.1,
            },
          );

          // Convert existing images to lazy loading
          const images = document.querySelectorAll("img[src]");
          images.forEach((img) => {
            const htmlImg = img as HTMLImageElement;
            if (
              !htmlImg.dataset.src &&
              htmlImg.src &&
              !htmlImg.classList.contains("no-lazy")
            ) {
              htmlImg.dataset.src = htmlImg.src;
              htmlImg.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjZGNkY2QiLz48L3N2Zz4=";
              htmlImg.classList.add("lazy");
              imageObserver.observe(htmlImg);
            }
          });

          // Watch for new images added dynamically
          const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as Element;
                  const newImages = element.querySelectorAll
                    ? element.querySelectorAll("img[src]")
                    : [];
                  newImages.forEach((img) => {
                    const htmlImg = img as HTMLImageElement;
                    if (
                      !htmlImg.dataset.src &&
                      !htmlImg.classList.contains("no-lazy")
                    ) {
                      htmlImg.dataset.src = htmlImg.src;
                      htmlImg.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjZGNkY2QiLz48L3N2Zz4=";
                      htmlImg.classList.add("lazy");
                      imageObserver.observe(htmlImg);
                    }
                  });
                }
              });
            });
          });

          mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
          });
        }
      };

      // 3. Memory Management and Cleanup
      const optimizeMemoryUsage = () => {
        // Clean up unused GSAP timelines
        const cleanupGSAP = () => {
          gsap.globalTimeline
            .getChildren(true, true, false)
            .forEach((timeline) => {
              if (timeline.progress() === 1 && !timeline.repeat()) {
                timeline.kill();
              }
            });
        };

        // Clean up Three.js resources
        const cleanupThreeJS = () => {
          const canvases = document.querySelectorAll("canvas");
          canvases.forEach((canvas) => {
            const gl =
              canvas.getContext("webgl") || canvas.getContext("webgl2");
            if (gl) {
              const ext = gl.getExtension("WEBGL_lose_context");
              if (ext && !canvas.closest(".active-scene")) {
                // Only clean up inactive scenes
                ext.loseContext();
              }
            }
          });
        };

        // Periodic cleanup
        setInterval(() => {
          cleanupGSAP();
          if (metricsRef.current.memoryUsage > 50) {
            cleanupThreeJS();
          }
        }, 30000); // Every 30 seconds
      };

      // 4. Performance Monitoring
      const setupPerformanceMonitoring = () => {
        let frames = 0;
        let lastTime = performance.now();

        const measureFPS = () => {
          frames++;
          const currentTime = performance.now();

          if (currentTime - lastTime >= 1000) {
            metricsRef.current.fps = Math.round(
              (frames * 1000) / (currentTime - lastTime),
            );
            frames = 0;
            lastTime = currentTime;

            // Adjust quality based on FPS
            adjustQualityBasedOnPerformance();
          }

          requestAnimationFrame(measureFPS);
        };

        measureFPS();

        // Memory usage monitoring
        if ("memory" in performance) {
          setInterval(() => {
            const memory = (performance as any).memory;
            metricsRef.current.memoryUsage = Math.round(
              (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
            );
          }, 5000);
        }

        // Performance observer for render times
        if ("PerformanceObserver" in window) {
          performanceObserver.current = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.entryType === "measure") {
                metricsRef.current.renderTime = entry.duration;
              }
            });
          });

          performanceObserver.current.observe({ entryTypes: ["measure"] });
        }
      };

      // 5. Dynamic Quality Adjustment
      const adjustQualityBasedOnPerformance = () => {
        const fps = metricsRef.current.fps;
        const memory = metricsRef.current.memoryUsage;

        // Reduce Three.js quality on low performance
        const canvases = document.querySelectorAll("canvas");
        canvases.forEach((canvas) => {
          const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
          if (gl) {
            if (fps < 30 || memory > 70) {
              // Reduce quality
              canvas.style.transform = "scale(0.8)";
              canvas.style.filter = "blur(0.5px)";
            } else if (fps > 50 && memory < 50) {
              // Restore quality
              canvas.style.transform = "scale(1)";
              canvas.style.filter = "none";
            }
          }
        });

        // Adjust animation complexity
        if (fps < 25) {
          document.body.classList.add("low-performance");
          // Disable heavy animations
          gsap.globalTimeline.timeScale(0.5);
        } else if (fps > 50) {
          document.body.classList.remove("low-performance");
          gsap.globalTimeline.timeScale(1);
        }
      };

      // 6. Preload Critical Resources
      const preloadCriticalResources = () => {
        const criticalImages = [
          "/api/placeholder/800/600", // Hero image
          "/api/placeholder/400/300", // Common card image
        ];

        criticalImages.forEach((src) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = src;
          document.head.appendChild(link);
        });

        // Preload fonts
        const fonts = ["Inter", "Poppins"];

        fonts.forEach((fontFamily) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "font";
          link.type = "font/woff2";
          link.crossOrigin = "anonymous";
          link.href = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;500;600;700&display=swap`;
          document.head.appendChild(link);
        });
      };

      // 7. Viewport-based Animation Control
      const optimizeViewportAnimations = () => {
        let isVisible = true;

        const handleVisibilityChange = () => {
          isVisible = !document.hidden;

          if (!isVisible) {
            // Pause animations when tab is not visible
            gsap.globalTimeline.pause();
          } else {
            // Resume animations when tab becomes visible
            gsap.globalTimeline.resume();
          }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Reduce motion for users who prefer it
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        if (prefersReducedMotion.matches) {
          document.body.classList.add("reduced-motion");
          gsap.globalTimeline.timeScale(0.1);
        }
      };

      // 8. Network-aware Optimizations
      const optimizeForNetwork = () => {
        if ("connection" in navigator) {
          const connection = (navigator as any).connection;

          if (
            connection.effectiveType === "slow-2g" ||
            connection.effectiveType === "2g"
          ) {
            document.body.classList.add("slow-network");
            // Disable heavy animations and Three.js
            const canvases = document.querySelectorAll("canvas");
            canvases.forEach((canvas) => {
              canvas.style.display = "none";
            });
          }
        }
      };

      // 9. Scroll Performance Optimization
      const optimizeScrollPerformance = () => {
        let ticking = false;

        const updateScrollPerformance = () => {
          // Throttle scroll-based animations
          if (!ticking) {
            requestAnimationFrame(() => {
              // Update scroll-based elements
              ticking = false;
            });
            ticking = true;
          }
        };

        window.addEventListener("scroll", updateScrollPerformance, {
          passive: true,
        });
      };

      // Initialize all optimizations
      enableGPUAcceleration();
      setupLazyLoading();
      optimizeMemoryUsage();
      setupPerformanceMonitoring();
      preloadCriticalResources();
      optimizeViewportAnimations();
      optimizeForNetwork();
      optimizeScrollPerformance();

      // Add performance monitoring styles
      const style = document.createElement("style");
      style.textContent = `
        .lazy {
          opacity: 0;
          transition: opacity 0.3s;
        }
        .loaded {
          opacity: 1;
        }
        .low-performance * {
          animation-duration: 2s !important;
          transition-duration: 0.1s !important;
        }
        .reduced-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        .slow-network .three-background,
        .slow-network .parallax-bg {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize after DOM is ready
    const timeoutId = setTimeout(initializeOptimizations, 100);

    return () => {
      clearTimeout(timeoutId);
      if (performanceObserver.current) {
        performanceObserver.current.disconnect();
      }
      isInitialized.current = false;
    };
  }, []);

  // Development performance panel (only in dev mode)
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-[10000] hidden lg:block">
        <div>FPS: {metricsRef.current.fps}</div>
        <div>Memory: {metricsRef.current.memoryUsage}%</div>
        <div>Render: {metricsRef.current.renderTime.toFixed(1)}ms</div>
      </div>
    );
  }

  return null;
}

// Performance utility functions
export const enableGPULayer = (element: HTMLElement) => {
  element.style.willChange = "transform, opacity";
  element.style.transform = "translateZ(0)";
  element.style.backfaceVisibility = "hidden";
};

export const disableGPULayer = (element: HTMLElement) => {
  element.style.willChange = "auto";
  element.style.transform = "none";
  element.style.backfaceVisibility = "visible";
};

export const optimizeImage = (img: HTMLImageElement) => {
  img.loading = "lazy";
  img.decoding = "async";

  // Add responsive image attributes if not present
  if (!img.sizes) {
    img.sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  }
};

// Export performance metrics for monitoring
export const getPerformanceMetrics = () => {
  return {
    fps: 60, // This would be updated by the component
    memory: 0,
    renderTime: 0,
  };
};
