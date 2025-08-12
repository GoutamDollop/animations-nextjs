import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollHighlightProps {
  children: React.ReactNode;
  className?: string;
  highlightColor?: string;
  animationType?: 'underline' | 'background' | 'border' | 'glow';
  trigger?: 'hover' | 'scroll' | 'both';
  delay?: number;
}

export default function ScrollHighlight({
  children,
  className = '',
  highlightColor = 'from-purple-600 to-pink-600',
  animationType = 'underline',
  trigger = 'scroll',
  delay = 0
}: ScrollHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1]);

  useEffect(() => {
    if (!ref.current || trigger === 'hover') return;

    const element = ref.current;
    const progressElement = progressRef.current;

    if (trigger === 'scroll' || trigger === 'both') {
      gsap.fromTo(progressElement,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            scrub: trigger === 'both' ? 1 : false,
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [trigger, delay]);

  const getHighlightStyles = () => {
    switch (animationType) {
      case 'background':
        return `bg-gradient-to-r ${highlightColor} bg-clip-text text-transparent`;
      case 'border':
        return `border-b-4 border-gradient-to-r ${highlightColor}`;
      case 'glow':
        return `shadow-lg shadow-purple-500/50`;
      default:
        return '';
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block ${className}`}
      whileHover={trigger === 'hover' || trigger === 'both' ? { scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <span className={`relative z-10 ${getHighlightStyles()}`}>
        {children}
      </span>
      
      {/* Animated Highlight */}
      {animationType === 'underline' && (
        <motion.div
          ref={progressRef}
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${highlightColor} origin-left z-0`}
          style={{ 
            scaleX: trigger === 'scroll' ? scaleX : 0,
            opacity: trigger === 'scroll' ? opacity : 1
          }}
          whileHover={trigger === 'hover' || trigger === 'both' ? { scaleX: 1 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {animationType === 'background' && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${highlightColor} opacity-20 rounded-lg`}
          style={{ 
            scaleX: trigger === 'scroll' ? scaleX : 0,
            opacity: trigger === 'scroll' ? opacity : 0
          }}
          whileHover={trigger === 'hover' || trigger === 'both' ? { opacity: 0.3, scaleX: 1 } : {}}
          transition={{ duration: 0.3 }}
        />
      )}

      {animationType === 'glow' && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${highlightColor} blur-xl opacity-0 -z-10`}
          style={{ 
            opacity: trigger === 'scroll' ? opacity : 0
          }}
          whileHover={trigger === 'hover' || trigger === 'both' ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

// Advanced Text Reveal Component
interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
}

export function TextReveal({
  children,
  className = '',
  stagger = 0.1,
  duration = 0.6
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll('.word');
    
    gsap.fromTo(words,
      { 
        opacity: 0, 
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: duration,
        stagger: stagger,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [stagger, duration]);

  const processText = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="word inline-block mr-2 perspective-1000">
        {word}
      </span>
    ));
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {typeof children === 'string' ? processText(children) : children}
    </div>
  );
}

// Magnetic Text Effect
interface MagneticTextProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticText({
  children,
  className = '',
  strength = 0.3
}: MagneticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`cursor-pointer ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
