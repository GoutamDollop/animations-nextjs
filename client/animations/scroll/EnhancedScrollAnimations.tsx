import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { performanceManager } from '../utils/EnhancedPerformanceManager';
import EnhancedAnimationUtils from '../utils/EnhancedAnimationUtils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'parallax';
  trigger?: 'viewport' | 'scroll' | 'hover';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  offset?: number;
  parallaxSpeed?: number;
  threshold?: number;
}

// Enhanced Scroll Animation Component
export const EnhancedScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeIn',
  trigger = 'viewport',
  delay = 0,
  duration,
  stagger,
  className = '',
  offset = 0,
  parallaxSpeed = 0.5,
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(ref, { margin: `${offset}px`, amount: threshold });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth spring animation for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get optimized animation settings
  const optimizedDuration = duration || performanceManager.getOptimizedDuration(0.8);
  const optimizedStagger = stagger || performanceManager.getOptimizedStagger(0.1);

  // Parallax transforms (only for desktop and high-performance devices)
  const yParallax = useTransform(
    smoothProgress,
    [0, 1],
    performanceManager.shouldEnableParallax() ? 
      [0, -100 * parallaxSpeed] : [0, 0]
  );

  const scaleParallax = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    performanceManager.shouldEnableComplexAnimations() ? 
      [0.8, 1, 1.1] : [1, 1, 1]
  );

  // Animation variants based on type
  const getAnimationVariants = () => {
    const baseDelay = delay + (isMobile ? 0 : 0.1);
    
    switch (animation) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0, y: isMobile ? 20 : 30 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: optimizedDuration, 
              delay: baseDelay,
              ease: performanceManager.getAnimationEasing()
            }
          }
        };

      case 'slideUp':
        return {
          hidden: { opacity: 0, y: isMobile ? 40 : 60 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: optimizedDuration, 
              delay: baseDelay,
              ease: performanceManager.getAnimationEasing()
            }
          }
        };

      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: isMobile ? 30 : 50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: optimizedDuration, 
              delay: baseDelay,
              ease: performanceManager.getAnimationEasing()
            }
          }
        };

      case 'slideRight':
        return {
          hidden: { opacity: 0, x: isMobile ? -30 : -50 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: optimizedDuration, 
              delay: baseDelay,
              ease: performanceManager.getAnimationEasing()
            }
          }
        };

      case 'scaleIn':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: optimizedDuration, 
              delay: baseDelay,
              ease: performanceManager.getAnimationEasing()
            }
          }
        };

      case 'parallax':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration: optimizedDuration, 
              delay: baseDelay
            }
          }
        };

      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: optimizedDuration, delay: baseDelay } }
        };
    }
  };

  const variants = getAnimationVariants();

  // Render based on animation type
  if (animation === 'parallax' && performanceManager.shouldEnableParallax()) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ y: yParallax, scale: scaleParallax }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Staggered Children Animation Component
interface StaggeredAnimationProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({
  children,
  className = '',
  staggerDelay,
  animation = 'fadeIn'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(ref, { margin: "0px", amount: 0.1 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const optimizedStagger = staggerDelay || performanceManager.getOptimizedStagger(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: optimizedStagger,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 20 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: performanceManager.getOptimizedDuration(0.6),
        ease: performanceManager.getAnimationEasing()
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Magnetic Hover Effect Component
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

export const MagneticEffect: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.15,
  disabled = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!ref.current || disabled || isMobile || !performanceManager.shouldEnableComplexAnimations()) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

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

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, disabled, isMobile]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// Floating Animation Component
interface FloatingProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export const FloatingAnimation: React.FC<FloatingProps> = ({
  children,
  className = '',
  duration = 3,
  distance = 20,
  delay = 0
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!performanceManager.shouldEnableComplexAnimations() || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance/2, distance/2, -distance/2],
      }}
      transition={{
        duration: performanceManager.getOptimizedDuration(duration),
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Text Reveal Animation Component
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export const TextRevealAnimation: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration,
  staggerDelay
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(ref, { margin: "0px", amount: 0.5 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const optimizedDuration = duration || performanceManager.getOptimizedDuration(0.8);
  const optimizedStagger = staggerDelay || performanceManager.getOptimizedStagger(0.03);

  const words = children.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: optimizedStagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 20 : 30,
      rotateX: isMobile ? 0 : 90 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: { 
        duration: optimizedDuration,
        ease: performanceManager.getAnimationEasing()
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          style={{ 
            display: 'inline-block', 
            marginRight: '0.25em',
            transformOrigin: 'bottom'
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Enhanced Button with Smooth Animations
interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  loading = false
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const baseClasses = "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-md hover:shadow-lg",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  };

  const animationProps = isMobile ? {
    whileTap: { scale: 0.98 },
    transition: { duration: 0.1 }
  } : {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...animationProps}
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          children
        )}
      </motion.span>
      
      {/* Ripple effect for mobile */}
      {isMobile && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.button>
  );
};

// Export performance utilities
export { performanceManager, EnhancedAnimationUtils };

// Hook for scroll-based animations
export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement>,
  animation: string = 'fadeIn'
) => {
  const isInView = useInView(ref, { margin: "0px", amount: 0.1 });
  
  useEffect(() => {
    if (!ref.current || !isInView) return;

    const element = ref.current;
    
    switch (animation) {
      case 'fadeIn':
        EnhancedAnimationUtils.fadeIn(element);
        break;
      case 'slideUp':
        EnhancedAnimationUtils.slideIn(element, 'up');
        break;
      case 'scaleIn':
        EnhancedAnimationUtils.scaleIn(element);
        break;
      default:
        EnhancedAnimationUtils.fadeIn(element);
    }
  }, [isInView, animation]);

  return isInView;
};

export default EnhancedScrollAnimation;
