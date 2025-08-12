import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animationConfig } from "../config/animations";

gsap.registerPlugin(ScrollTrigger);

// Global scroll animation utilities
export class ScrollAnimationManager {
  private static instance: ScrollAnimationManager;
  private initialized = false;

  public static getInstance(): ScrollAnimationManager {
    if (!ScrollAnimationManager.instance) {
      ScrollAnimationManager.instance = new ScrollAnimationManager();
    }
    return ScrollAnimationManager.instance;
  }

  public init() {
    if (this.initialized) return;

    this.initialized = true;
    this.setupGlobalAnimations();
    this.setupIntersectionObserver();
  }

  private setupGlobalAnimations() {
    // Refresh ScrollTrigger on window resize
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    // Global fade-in animations
    gsap.utils.toArray(".fade-in").forEach((element: any) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: animationConfig.duration.normal,
          ease: animationConfig.ease.power2,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Global slide-in animations
    gsap.utils.toArray(".slide-in-left").forEach((element: any) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: animationConfig.duration.normal,
          ease: animationConfig.ease.power3,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    gsap.utils.toArray(".slide-in-right").forEach((element: any) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: animationConfig.duration.normal,
          ease: animationConfig.ease.power3,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Global scale animations
    gsap.utils.toArray(".scale-in").forEach((element: any) => {
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: animationConfig.duration.normal,
          ease: animationConfig.ease.back,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Stagger animations
    gsap.utils.toArray(".stagger-children").forEach((container: any) => {
      const children = container.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: animationConfig.duration.fast,
          stagger: animationConfig.stagger.small,
          ease: animationConfig.ease.power2,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Parallax effects
    gsap.utils.toArray(".parallax").forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Rotation animations
    gsap.utils.toArray(".rotate-in").forEach((element: any) => {
      gsap.fromTo(
        element,
        { opacity: 0, rotation: -45, scale: 0.5 },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: animationConfig.duration.slow,
          ease: animationConfig.ease.back,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Text reveal animations
    gsap.utils.toArray(".text-reveal").forEach((element: any) => {
      const chars = element.textContent.split("");
      element.innerHTML = chars
        .map(
          (char: string) =>
            `<span style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`,
        )
        .join("");

      gsap.fromTo(
        element.children,
        { opacity: 0, y: 50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: animationConfig.ease.power2,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Counter animations
    gsap.utils.toArray(".counter").forEach((counter: any) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: animationConfig.duration.verySlow,
        ease: animationConfig.ease.power2,
        onUpdate: () => {
          counter.textContent = Math.round(obj.value).toString();
        },
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }

  private setupIntersectionObserver() {
    // Enhanced visibility observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in",
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  public createSectionAnimation(
    trigger: string | Element,
    elements: string | Element[],
    animation: any = animations.fadeIn,
  ) {
    gsap.fromTo(elements, animation, {
      ...animation,
      scrollTrigger: {
        trigger,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }

  public createParallaxEffect(element: string | Element, speed: number = 0.5) {
    gsap.to(element, {
      yPercent: -(speed * 100),
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  public createMagneticEffect(element: Element, strength: number = 0.3) {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.power2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.elastic,
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }

  public refresh() {
    ScrollTrigger.refresh();
  }

  public kill() {
    ScrollTrigger.killAll();
    this.initialized = false;
  }
}

// Animation presets
export const animations = {
  fadeIn: {
    opacity: 0,
    y: 30,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power2,
  },

  slideInLeft: {
    opacity: 0,
    x: -60,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power3,
  },

  slideInRight: {
    opacity: 0,
    x: 60,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power3,
  },

  scaleIn: {
    opacity: 0,
    scale: 0.8,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.back,
  },

  rotateIn: {
    opacity: 0,
    rotation: -45,
    scale: 0.8,
    duration: animationConfig.duration.slow,
    ease: animationConfig.ease.back,
  },
};

// Export singleton instance
export const scrollAnimationManager = ScrollAnimationManager.getInstance();
