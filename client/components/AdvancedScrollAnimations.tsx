import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AdvancedScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || !containerRef.current) return;
    isInitialized.current = true;

    const ctx = gsap.context(() => {
      // 1. Parallax Background Layers
      gsap.utils.toArray(".parallax-bg").forEach((element: any, i) => {
        const depth = (i + 1) * 0.3;
        gsap.to(element, {
          yPercent: -50 * depth,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 2. Horizontal Scroll Gallery (like gsap.com/scroll/)
      const horizontalSections = gsap.utils.toArray(".horizontal-scroll");
      horizontalSections.forEach((section: any) => {
        const slides = section.querySelectorAll(".scroll-slide");
        if (slides.length > 1) {
          gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              snap: 1 / (slides.length - 1),
              end: () => "+=" + section.offsetWidth * slides.length,
              anticipatePin: 1
            }
          });
        }
      });

      // 3. Pinned Sections with Content Morphing
      gsap.utils.toArray(".pin-section").forEach((section: any) => {
        const content = section.querySelectorAll(".pin-content");
        if (content.length > 1) {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: "top top",
              end: "bottom -100%",
              scrub: 1,
              anticipatePin: 1
            }
          })
          .to(content[0], { opacity: 0, scale: 0.8, duration: 1 })
          .to(content[1], { opacity: 1, scale: 1, duration: 1 }, "-=0.5")
          .to(content[1], { opacity: 0, scale: 0.8, duration: 1 })
          .to(content[2], { opacity: 1, scale: 1, duration: 1 }, "-=0.5");
        }
      });

      // 4. Text Reveal Animations
      gsap.utils.toArray(".text-reveal").forEach((element: any) => {
        const text = element.textContent;
        const words = text.split(" ");
        element.innerHTML = words.map((word: string) => 
          `<span class="word-reveal">${word}</span>`
        ).join(" ");

        gsap.fromTo(element.querySelectorAll(".word-reveal"), 
          { 
            opacity: 0, 
            y: 50,
            skewY: 7,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 5. Morphing Path Animations
      gsap.utils.toArray(".morph-path").forEach((path: any) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: path.closest('.morph-container'),
            start: "top center",
            end: "bottom center",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              // Create morphing effect with custom path data
              const morphStates = [
                "M0,50 Q50,10 100,50 T200,50",
                "M0,50 Q50,90 100,50 T200,50",
                "M0,50 Q50,50 100,50 T200,50"
              ];
              const currentIndex = Math.floor(progress * (morphStates.length - 1));
              const nextIndex = Math.min(currentIndex + 1, morphStates.length - 1);
              const localProgress = (progress * (morphStates.length - 1)) % 1;
              
              // Simple interpolation between path states
              path.setAttribute('d', morphStates[currentIndex]);
            }
          }
        });
      });

      // 6. 3D Rotation Cards on Scroll
      gsap.utils.toArray(".rotate-3d").forEach((card: any, i) => {
        gsap.fromTo(card,
          { 
            rotationY: -30,
            rotationX: 15,
            z: -100,
            opacity: 0.3,
            scale: 0.8
          },
          {
            rotationY: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      // 7. Counter Animation on Scroll
      gsap.utils.toArray(".counter-scroll").forEach((counter: any) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = Math.round(obj.value).toLocaleString();
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 8. Stagger Animation with Physics
      gsap.utils.toArray(".physics-stagger").forEach((container: any) => {
        const items = container.querySelectorAll(".physics-item");
        
        gsap.fromTo(items,
          { 
            y: 100,
            opacity: 0,
            rotation: -15,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            stagger: {
              amount: 0.8,
              from: "random",
              ease: "power2.inOut"
            },
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 9. Liquid Morphing Background
      gsap.utils.toArray(".liquid-bg").forEach((bg: any) => {
        const shapes = bg.querySelectorAll(".liquid-shape");
        
        shapes.forEach((shape: any, i: number) => {
          gsap.to(shape, {
            morphSVG: shape.getAttribute("data-morph") || shape,
            duration: 2 + i * 0.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            scrollTrigger: {
              trigger: bg,
              start: "top bottom",
              end: "bottom top",
              scrub: 2
            }
          });
        });
      });

      // 10. Scroll-triggered Magnetic Effect
      gsap.utils.toArray(".magnetic-scroll").forEach((element: any) => {
        gsap.set(element, { transformOrigin: "center center" });
        
        ScrollTrigger.create({
          trigger: element,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to(element, {
              scale: 1.05,
              rotation: 2,
              duration: 0.6,
              ease: "power2.out"
            });
          },
          onLeave: () => {
            gsap.to(element, {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "power2.out"
            });
          },
          onEnterBack: () => {
            gsap.to(element, {
              scale: 1.05,
              rotation: -2,
              duration: 0.6,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(element, {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        });
      });

      // 11. Wave Text Animation
      gsap.utils.toArray(".wave-text").forEach((element: any) => {
        const text = element.textContent;
        const chars = text.split("");
        element.innerHTML = chars.map((char: string, i: number) => 
          `<span class="wave-char" style="display: inline-block; transform-origin: bottom center;">${char === " " ? "&nbsp;" : char}</span>`
        ).join("");

        const waveChars = element.querySelectorAll(".wave-char");
        
        gsap.fromTo(waveChars,
          { y: 50, opacity: 0, rotationX: -90 },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Continuous wave effect
        gsap.to(waveChars, {
          y: -10,
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            amount: 1,
            repeat: -1,
            yoyo: true
          },
          scrollTrigger: {
            trigger: element,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play pause resume pause"
          }
        });
      });

      // 12. Progress Bar Animation
      gsap.utils.toArray(".progress-scroll").forEach((bar: any) => {
        gsap.fromTo(bar,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 13. Zoom-in Section Effect
      gsap.utils.toArray(".zoom-section").forEach((section: any) => {
        gsap.fromTo(section,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => {
      ctx.revert();
      isInitialized.current = false;
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* This component sets up scroll triggers globally */}
    </div>
  );
}

// Additional utility component for smooth scrolling
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize smooth scrolling with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll configuration
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
    });

    // Update ScrollTrigger when fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    // Refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

// Utility function to add scroll classes to elements
export const addScrollClasses = (element: HTMLElement, classes: string[]) => {
  classes.forEach(className => {
    element.classList.add(className);
  });
};

// Pre-defined animation presets
export const ScrollAnimationPresets = {
  textReveal: "text-reveal",
  parallaxBg: "parallax-bg", 
  horizontalScroll: "horizontal-scroll",
  pinSection: "pin-section",
  rotate3d: "rotate-3d",
  counterScroll: "counter-scroll",
  physicsStagger: "physics-stagger",
  magneticScroll: "magnetic-scroll",
  waveText: "wave-text",
  progressScroll: "progress-scroll",
  zoomSection: "zoom-section"
};
