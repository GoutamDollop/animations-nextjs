import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  isMobile?: boolean;
}

export class EnhancedAnimationUtils {
  private static isMobile = false;

  static setMobile(mobile: boolean) {
    this.isMobile = mobile;
  }

  // Enhanced fade in animation with mobile optimization
  static fadeIn(
    elements: string | Element | Element[],
    config: AnimationConfig = {}
  ) {
    const {
      duration = this.isMobile ? 0.6 : 0.8,
      delay = 0,
      ease = "power2.out",
      stagger = this.isMobile ? 0.05 : 0.1,
    } = config;

    gsap.fromTo(
      elements,
      { opacity: 0, y: this.isMobile ? 30 : 50 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        stagger,
      }
    );
  }

  // Enhanced fade in with scroll trigger
  static fadeInOnScroll(
    elements: string | Element | Element[],
    config: AnimationConfig = {}
  ) {
    const {
      duration = this.isMobile ? 0.6 : 0.8,
      ease = "power2.out",
      stagger = this.isMobile ? 0.05 : 0.1,
    } = config;

    gsap.fromTo(
      elements,
      { opacity: 0, y: this.isMobile ? 30 : 50 },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: elements,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Scale in animation
  static scaleIn(
    elements: string | Element | Element[],
    config: AnimationConfig = {}
  ) {
    const {
      duration = this.isMobile ? 0.5 : 0.7,
      delay = 0,
      ease = "back.out(1.7)",
      stagger = this.isMobile ? 0.05 : 0.1,
    } = config;

    gsap.fromTo(
      elements,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease,
        stagger,
      }
    );
  }

  // Slide in from direction
  static slideIn(
    elements: string | Element | Element[],
    direction: "left" | "right" | "up" | "down" = "left",
    config: AnimationConfig = {}
  ) {
    const {
      duration = this.isMobile ? 0.6 : 0.8,
      delay = 0,
      ease = "power2.out",
      stagger = this.isMobile ? 0.05 : 0.1,
    } = config;

    let fromProps: any = { opacity: 0 };
    const distance = this.isMobile ? 30 : 50;

    switch (direction) {
      case "left":
        fromProps.x = -distance;
        break;
      case "right":
        fromProps.x = distance;
        break;
      case "up":
        fromProps.y = distance;
        break;
      case "down":
        fromProps.y = -distance;
        break;
    }

    gsap.fromTo(
      elements,
      fromProps,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease,
        stagger,
      }
    );
  }

  // Typewriter effect
  static typewriter(
    element: string | Element,
    text: string,
    config: AnimationConfig = {}
  ) {
    const { duration = 2, delay = 0 } = config;
    const speed = this.isMobile ? 50 : 80;

    gsap.to(element, {
      duration,
      delay,
      text: {
        value: text,
        delimiter: "",
      },
      ease: "none",
    });
  }

  // Magnetic effect for interactive elements (desktop only)
  static addMagneticEffect(elements: string | Element | Element[]) {
    if (this.isMobile) return;

    const elementsArray = gsap.utils.toArray(elements);

    elementsArray.forEach((element: any) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;

        gsap.to(element, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);

      // Store cleanup function
      element._cleanupMagnetic = () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }

  // Parallax scroll effect
  static addParallaxEffect(
    elements: string | Element | Element[],
    speed: number = 0.5
  ) {
    if (this.isMobile) return; // Disable on mobile for performance

    gsap.utils.toArray(elements).forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  // Floating animation
  static addFloatingEffect(
    elements: string | Element | Element[],
    config: AnimationConfig = {}
  ) {
    const {
      duration = this.isMobile ? 2 : 3,
      delay = 0,
    } = config;

    const distance = this.isMobile ? 10 : 20;

    gsap.to(elements, {
      y: -distance,
      duration,
      delay,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    });
  }

  // Card hover animation
  static addCardHoverEffect(elements: string | Element | Element[]) {
    const elementsArray = gsap.utils.toArray(elements);

    elementsArray.forEach((element: any) => {
      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: this.isMobile ? 1.02 : 1.05,
          y: this.isMobile ? -2 : -5,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      if (!this.isMobile) {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        // Store cleanup function
        element._cleanupHover = () => {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    });
  }

  // Number counter animation
  static animateCounter(
    element: string | Element,
    targetValue: number,
    config: AnimationConfig = {}
  ) {
    const {
      duration = this.isMobile ? 1.5 : 2,
      delay = 0,
      ease = "power2.out",
    } = config;

    const obj = { value: 0 };
    const el = gsap.utils.toArray(element)[0] as Element;

    gsap.to(obj, {
      value: targetValue,
      duration,
      delay,
      ease,
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toString();
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }

  // Stagger container children
  static staggerChildren(
    container: string | Element,
    config: AnimationConfig = {}
  ) {
    const {
      duration = this.isMobile ? 0.5 : 0.6,
      delay = 0,
      ease = "power2.out",
      stagger = this.isMobile ? 0.05 : 0.1,
    } = config;

    const children = gsap.utils.toArray(`${container} > *`);

    gsap.fromTo(
      children,
      { opacity: 0, y: this.isMobile ? 20 : 30 },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        stagger,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Clean up all animations
  static cleanup() {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.killTweensOf("*");
    
    // Clean up magnetic and hover effects
    document.querySelectorAll("*").forEach((element: any) => {
      if (element._cleanupMagnetic) {
        element._cleanupMagnetic();
        delete element._cleanupMagnetic;
      }
      if (element._cleanupHover) {
        element._cleanupHover();
        delete element._cleanupHover;
      }
    });
  }

  // Page transition helper
  static pageTransition(onComplete?: () => void) {
    const tl = gsap.timeline({
      onComplete,
    });

    tl.to(".page-transition", {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.inOut",
    })
      .to(".page-transition", {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.inOut",
        transformOrigin: "right",
        delay: 0.1,
      });

    return tl;
  }
}

// Framer Motion variants for common animations
export const motionVariants = {
  fadeIn: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  },

  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  },

  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  },

  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  },

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  },

  buttonHover: {
    scale: 1.05,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" },
  },

  buttonTap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },

  cardHover: {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" },
  },

  magneticHover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Responsive animation configuration
export const getResponsiveConfig = (isMobile: boolean): AnimationConfig => ({
  duration: isMobile ? 0.5 : 0.8,
  stagger: isMobile ? 0.05 : 0.1,
  isMobile,
});

// Performance optimized scroll animations
export const createScrollAnimation = (
  trigger: string,
  animation: any,
  isMobile: boolean = false
) => {
  return {
    ...animation,
    scrollTrigger: {
      trigger,
      start: "top 85%",
      toggleActions: "play none none reverse",
      // Reduce scroll calculations on mobile
      fastScrollEnd: isMobile,
      onUpdate: isMobile ? undefined : animation.scrollTrigger?.onUpdate,
    },
  };
};

export default EnhancedAnimationUtils;
