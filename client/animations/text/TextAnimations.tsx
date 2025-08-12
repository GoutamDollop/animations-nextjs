import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextAnimationsProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'slideIn' | 'slideInLeft' | 'fadeIn' | 'typewriter' | 'reveal' | 'split';
  delay?: number;
  duration?: number;
  className?: string;
}

export default function TextAnimations({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 1,
  className = ''
}: TextAnimationsProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      switch (animation) {
        case 'fadeUp':
          gsap.fromTo(element, 
            { 
              opacity: 0, 
              y: 50 
            },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'slideIn':
          gsap.fromTo(element,
            {
              opacity: 0,
              x: -100
            },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'slideInLeft':
          gsap.fromTo(element,
            {
              opacity: 0,
              x: -100
            },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'fadeIn':
          gsap.fromTo(element,
            {
              opacity: 0
            },
            {
              opacity: 1,
              duration,
              delay,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'reveal':
          // Create a mask effect
          gsap.set(element, { overflow: 'hidden' });
          gsap.fromTo(element.children,
            {
              y: '100%'
            },
            {
              y: '0%',
              duration,
              delay,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'split':
          // Split text into characters for animation
          const text = element.textContent || '';
          element.innerHTML = text
            .split('')
            .map(char => `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');

          gsap.fromTo(element.children,
            {
              opacity: 0,
              y: 50,
              rotationX: -90
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              delay,
              ease: "back.out(1.7)",
              stagger: 0.02,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
          break;

        case 'typewriter':
          const originalText = element.textContent || '';
          element.textContent = '';
          
          ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
              let i = 0;
              const typeInterval = setInterval(() => {
                if (i < originalText.length) {
                  element.textContent += originalText.charAt(i);
                  i++;
                } else {
                  clearInterval(typeInterval);
                }
              }, 50);
            }
          });
          break;
      }
    }, element);

    return () => ctx.revert();
  }, [animation, delay, duration]);

  return (
    <div ref={elementRef} className={`text-animation ${className}`}>
      {children}
    </div>
  );
}
