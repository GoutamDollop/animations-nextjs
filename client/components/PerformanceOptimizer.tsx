import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Optimize smooth scrolling performance
    const optimizeScrolling = () => {
      // Throttle scroll events for better performance
      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Any global scroll optimizations can go here
            ticking = false;
          });
          ticking = true;
        }
      };

      // Add passive scroll listeners for better performance
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    // Optimize image loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]');

      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
              }
              imageObserver.unobserve(img);
            }
          });
        });

        images.forEach((img) => imageObserver.observe(img));

        return () => {
          images.forEach((img) => imageObserver.unobserve(img));
        };
      }
    };

    // Add will-change property for animated elements
    const optimizeAnimations = () => {
      const animatedElements = document.querySelectorAll(
        '[class*="animate-"], [class*="transition-"], [class*="transform"]',
      );
      animatedElements.forEach((el) => {
        (el as HTMLElement).style.willChange = "transform, opacity";
      });

      // Remove will-change after animations complete
      const removeWillChange = () => {
        animatedElements.forEach((el) => {
          (el as HTMLElement).style.willChange = "auto";
        });
      };

      setTimeout(removeWillChange, 3000);
    };

    const cleanupScroll = optimizeScrolling();
    const cleanupImages = optimizeImages();
    optimizeAnimations();

    // Performance monitoring
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        // Fallback for browsers that don't support this
      }
    }

    return () => {
      if (cleanupScroll) cleanupScroll();
      if (cleanupImages) cleanupImages();
    };
  }, []);

  return null;
}
