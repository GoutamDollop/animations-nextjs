import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Lenis from "lenis";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Animation configuration
export const animationConfig = {
  // Global animation settings
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    verySlow: 2.0,
  },

  // Easing functions
  ease: {
    power1: "power1.out",
    power2: "power2.out",
    power3: "power3.out",
    power4: "power4.out",
    back: "back.out(1.7)",
    elastic: "elastic.out(1, 0.75)",
    bounce: "bounce.out",
    expo: "expo.out",
    circ: "circ.out",
    sine: "sine.out",
  },

  // Stagger settings
  stagger: {
    small: 0.1,
    medium: 0.2,
    large: 0.3,
  },

  // Cursor themes
  cursor: {
    default: {
      size: 8,
      color: "#f97316",
      mixBlendMode: "difference",
      trailLength: 20,
    },
    hover: {
      size: 16,
      color: "#ef4444",
      mixBlendMode: "multiply",
      trailLength: 15,
    },
    text: {
      size: 4,
      color: "#3b82f6",
      mixBlendMode: "difference",
      trailLength: 10,
    },
    hero: {
      size: 12,
      color: "#8b5cf6",
      mixBlendMode: "screen",
      trailLength: 25,
    },
    stories: {
      size: 10,
      color: "#10b981",
      mixBlendMode: "overlay",
      trailLength: 20,
    },
    teachers: {
      size: 8,
      color: "#f59e0b",
      mixBlendMode: "multiply",
      trailLength: 15,
    },
  },

  // Scroll trigger settings
  scrollTrigger: {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    markers: false, // Set to true for debugging
  },

  // Three.js settings
  three: {
    particleCount: 100,
    colors: ["#3b82f6", "#8b5cf6", "#f97316", "#ef4444"],
    speed: 0.02,
  },
};

// Lenis smooth scroll configuration
export const lenisConfig = {
  lerp: 0.1,
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical" as const,
  gestureDirection: "vertical" as const,
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
};

// Initialize Lenis
export const initLenis = () => {
  const lenis = new Lenis(lenisConfig);

  // Integrate with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
};

// Common animation presets
export const animations = {
  // Fade animations
  fadeIn: {
    opacity: 0,
    y: 30,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power2,
  },

  fadeInUp: {
    opacity: 0,
    y: 60,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power3,
  },

  fadeInDown: {
    opacity: 0,
    y: -60,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power3,
  },

  fadeInLeft: {
    opacity: 0,
    x: -60,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power3,
  },

  fadeInRight: {
    opacity: 0,
    x: 60,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power3,
  },

  // Scale animations
  scaleIn: {
    scale: 0.8,
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.back,
  },

  // Rotation animations
  rotateIn: {
    rotation: -180,
    opacity: 0,
    duration: animationConfig.duration.slow,
    ease: animationConfig.ease.power4,
  },

  // Slide animations
  slideInLeft: {
    x: "-100%",
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.expo,
  },

  slideInRight: {
    x: "100%",
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.expo,
  },

  // Text animations
  textReveal: {
    y: "100%",
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.power3,
  },

  // Magnetic effect
  magnetic: (strength = 0.5) => ({
    x: 0,
    y: 0,
    duration: animationConfig.duration.fast,
    ease: animationConfig.ease.power2,
    transformOrigin: "center center",
    scale: 1 + strength * 0.1,
  }),
};

export default animationConfig;
