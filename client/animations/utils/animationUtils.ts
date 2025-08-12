import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation presets
export const animationPresets = {
  fadeUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.8, ease: "power2.out" }
  },
  slideInLeft: {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
  },
  slideInRight: {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
  }
};

// Scroll-triggered animation helper
export const createScrollAnimation = (
  element: HTMLElement,
  preset: keyof typeof animationPresets,
  options: {
    trigger?: string | HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    delay?: number;
    stagger?: number;
  } = {}
) => {
  const { from, to } = animationPresets[preset];
  const {
    trigger = element,
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    delay = 0,
    stagger = 0
  } = options;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
      toggleActions: "play none none reverse"
    }
  });

  if (stagger > 0 && element.children.length > 0) {
    timeline.fromTo(element.children, from, { ...to, delay, stagger });
  } else {
    timeline.fromTo(element, from, { ...to, delay });
  }

  return timeline;
};

// Magnetic effect for buttons/cards
export const createMagneticEffect = (element: HTMLElement, strength = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Parallax scroll effect
export const createParallaxEffect = (
  element: HTMLElement,
  speed = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  return ScrollTrigger.create({
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const movement = progress * 100 * speed;
      
      if (direction === 'vertical') {
        gsap.set(element, { y: movement });
      } else {
        gsap.set(element, { x: movement });
      }
    }
  });
};

// Stagger animation helper
export const staggerAnimation = (
  elements: NodeListOf<Element> | Element[],
  preset: keyof typeof animationPresets,
  staggerDelay = 0.1
) => {
  const { from, to } = animationPresets[preset];
  
  return gsap.fromTo(elements, from, {
    ...to,
    stagger: staggerDelay
  });
};

// Text reveal animation
export const createTextReveal = (element: HTMLElement) => {
  const text = element.textContent || '';
  const words = text.split(' ');
  
  element.innerHTML = words
    .map(word => `<span class="word"><span class="char">${word}</span></span>`)
    .join(' ');

  const chars = element.querySelectorAll('.char');
  
  gsap.set(chars, { y: '100%' });
  
  return gsap.to(chars, {
    y: '0%',
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.05
  });
};
