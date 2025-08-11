import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimationSystem() {
  useEffect(() => {
    // Enhanced scroll-based animations with different effects for each section
    const animations = [
      // Fade and slide from left
      {
        selector: '.scroll-fade-left',
        from: { x: -100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      },
      // Fade and slide from right
      {
        selector: '.scroll-fade-right',
        from: { x: 100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      },
      // Fade and scale up
      {
        selector: '.scroll-scale-up',
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
      },
      // Rotate and fade in
      {
        selector: '.scroll-rotate-in',
        from: { rotation: 45, opacity: 0, scale: 0.5 },
        to: { rotation: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.75)' }
      },
      // Slide up with stagger
      {
        selector: '.scroll-stagger-up',
        from: { y: 80, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      },
      // Bounce in effect
      {
        selector: '.scroll-bounce-in',
        from: { y: 100, opacity: 0, scale: 0.3 },
        to: { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'bounce.out' }
      },
      // Flip in from bottom
      {
        selector: '.scroll-flip-up',
        from: { rotationX: 90, opacity: 0, transformOrigin: 'bottom center' },
        to: { rotationX: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      },
      // Zoom in with rotation
      {
        selector: '.scroll-zoom-rotate',
        from: { scale: 0, rotation: 180, opacity: 0 },
        to: { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      },
      // Slide in from different directions with delay
      {
        selector: '.scroll-slide-random',
        from: { x: () => gsap.utils.random(-200, 200), y: () => gsap.utils.random(-100, 100), opacity: 0 },
        to: { x: 0, y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      },
      // Morphing scale effect
      {
        selector: '.scroll-morph',
        from: { scaleX: 0.1, scaleY: 2, opacity: 0 },
        to: { scaleX: 1, scaleY: 1, opacity: 1, duration: 1, ease: 'power2.inOut' }
      }
    ];

    animations.forEach(({ selector, from, to }) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        elements.forEach((element, index) => {
          gsap.fromTo(element, from, {
            ...to,
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
              // Add some randomness to timing
              delay: index * 0.1
            }
          });
        });
      }
    });

    // Advanced parallax effects for background elements
    gsap.utils.toArray('.parallax-slow').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    gsap.utils.toArray('.parallax-fast').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Horizontal scroll reveal for wide elements
    gsap.utils.toArray('.scroll-reveal-width').forEach((element: any) => {
      gsap.fromTo(element, 
        { width: '0%', transformOrigin: 'left center' },
        {
          width: '100%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Counter animations for numbers
    gsap.utils.toArray('.counter').forEach((element: any) => {
      const endValue = element.getAttribute('data-count') || 100;
      gsap.fromTo(element, 
        { innerText: 0 },
        {
          innerText: endValue,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Text reveal animation
    gsap.utils.toArray('.text-reveal').forEach((element: any) => {
      const text = element.textContent;
      element.innerHTML = text.split('').map((char: string) => 
        `<span style="display: inline-block; opacity: 0; transform: translateY(50px);">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      gsap.to(element.children, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Magnetic effect for interactive elements
    gsap.utils.toArray('.magnetic').forEach((element: any) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Floating elements with different speeds
    gsap.utils.toArray('.float-slow').forEach((element: any) => {
      gsap.to(element, {
        y: -20,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    });

    gsap.utils.toArray('.float-medium').forEach((element: any) => {
      gsap.to(element, {
        y: -30,
        rotation: 5,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });
    });

    gsap.utils.toArray('.float-fast').forEach((element: any) => {
      gsap.to(element, {
        y: -40,
        rotation: -10,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1
      });
    });

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null; // This component only sets up animations
}
