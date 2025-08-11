import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AdvancedScrollAnimations() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Wait for DOM to be ready
    const initAnimations = () => {
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

      // 2. Horizontal Scroll Gallery
      gsap.utils.toArray(".horizontal-scroll").forEach((section: any) => {
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
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: "top top",
              end: "bottom -100%",
              scrub: 1,
              anticipatePin: 1
            }
          });

          content.forEach((item: any, index: number) => {
            if (index === 0) {
              timeline.to(item, { opacity: 0, scale: 0.8, duration: 1 });
            } else if (index < content.length - 1) {
              timeline.to(item, { opacity: 1, scale: 1, duration: 1 }, "-=0.5")
                      .to(item, { opacity: 0, scale: 0.8, duration: 1 });
            } else {
              timeline.to(item, { opacity: 1, scale: 1, duration: 1 }, "-=0.5");
            }
          });
        }
      });

      // 4. Text Reveal Animations
      gsap.utils.toArray(".text-reveal").forEach((element: any) => {
        const text = element.textContent;
        const words = text.split(" ");
        element.innerHTML = words.map((word: string) => 
          `<span class="word-reveal" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`
        ).join(" ");

        gsap.fromTo(element.querySelectorAll(".word-reveal span"), 
          { 
            y: 100,
            skewY: 7,
            opacity: 0
          },
          {
            y: 0,
            skewY: 0,
            opacity: 1,
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

      // 5. 3D Rotation Cards on Scroll
      gsap.utils.toArray(".rotate-3d").forEach((card: any) => {
        gsap.set(card, { transformStyle: "preserve-3d" });
        
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

      // 6. Counter Animation on Scroll
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
            toggleActions: "play none none reset"
          }
        });
      });

      // 7. Stagger Animation with Physics
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

      // 8. Scroll-triggered Magnetic Effect
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

      // 9. Wave Text Animation
      gsap.utils.toArray(".wave-text").forEach((element: any) => {
        const text = element.textContent;
        const chars = text.split("");
        element.innerHTML = chars.map((char: string) => 
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

      // 10. Progress Bar Animation
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

      // 11. Zoom-in Section Effect
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

      // 12. Fade Slide Animations (inspired by gsap.com/scroll)
      gsap.utils.toArray(".fade-slide-up").forEach((element: any) => {
        gsap.fromTo(element,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.utils.toArray(".fade-slide-left").forEach((element: any) => {
        gsap.fromTo(element,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      gsap.utils.toArray(".fade-slide-right").forEach((element: any) => {
        gsap.fromTo(element,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 13. Scale and Rotate Effects
      gsap.utils.toArray(".scale-rotate").forEach((element: any) => {
        gsap.fromTo(element,
          { 
            scale: 0.5, 
            rotation: -180,
            opacity: 0
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 14. Typewriter Effect
      gsap.utils.toArray(".typewriter").forEach((element: any) => {
        const text = element.textContent;
        element.textContent = "";
        
        gsap.to(element, {
          duration: text.length * 0.05,
          ease: "none",
          onUpdate: function() {
            const progress = this.progress();
            const currentLength = Math.floor(progress * text.length);
            element.textContent = text.slice(0, currentLength) + (progress < 1 ? "|" : "");
          },
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 15. Morphing Shapes (using CSS clip-path)
      gsap.utils.toArray(".morph-shape").forEach((element: any) => {
        const morphStates = [
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
          "polygon(50% 0%, 100% 25%, 50% 100%, 0% 75%)",
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        ];
        
        gsap.to(element, {
          clipPath: morphStates[1],
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const stateIndex = Math.floor(progress * (morphStates.length - 1));
              const nextIndex = Math.min(stateIndex + 1, morphStates.length - 1);
              element.style.clipPath = morphStates[stateIndex];
            }
          }
        });
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    };

    // Initialize after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      isInitialized.current = false;
    };
  }, []);

  return null;
}

// Smooth Scroll Provider Component
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
    });

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

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

// Pre-defined animation classes for easy use
export const ScrollAnimationClasses = {
  // Text animations
  textReveal: "text-reveal",
  waveText: "wave-text",
  typewriter: "typewriter",
  
  // Movement animations
  fadeSlideUp: "fade-slide-up",
  fadeSlideLeft: "fade-slide-left", 
  fadeSlideRight: "fade-slide-right",
  
  // Transform animations
  rotate3d: "rotate-3d",
  scaleRotate: "scale-rotate",
  zoomSection: "zoom-section",
  
  // Interactive animations
  magneticScroll: "magnetic-scroll",
  physicsStagger: "physics-stagger",
  
  // Layout animations
  parallaxBg: "parallax-bg",
  horizontalScroll: "horizontal-scroll",
  pinSection: "pin-section",
  
  // Progress animations
  progressScroll: "progress-scroll",
  counterScroll: "counter-scroll",
  
  // Shape animations
  morphShape: "morph-shape"
};

// Utility function to apply multiple scroll animation classes
export const applyScrollAnimations = (element: HTMLElement, animations: string[]) => {
  animations.forEach(animation => {
    if (ScrollAnimationClasses[animation as keyof typeof ScrollAnimationClasses]) {
      element.classList.add(ScrollAnimationClasses[animation as keyof typeof ScrollAnimationClasses]);
    }
  });
};
