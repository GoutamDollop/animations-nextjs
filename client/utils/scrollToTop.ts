import { gsap } from 'gsap';

export const scrollToTop = (duration: number = 0.8) => {
  gsap.to(window, {
    scrollTo: { y: 0, autoKill: true },
    duration: duration,
    ease: "power2.out"
  });
};

export const smoothScrollTo = (target: string | number, duration: number = 0.8) => {
  gsap.to(window, {
    scrollTo: { y: target, autoKill: true },
    duration: duration,
    ease: "power2.out"
  });
};

export const useScrollRestoration = () => {
  const restoreScroll = () => {
    // Smooth scroll to top when route changes
    scrollToTop(1.2);
  };

  return { restoreScroll };
};
