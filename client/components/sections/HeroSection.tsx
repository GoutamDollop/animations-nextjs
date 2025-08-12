import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Star, Users, Award, Globe, GraduationCap, BookOpen, Sparkles, ChevronRight, Zap, ChevronLeft, Pause, ArrowDown } from 'lucide-react';
import heroData from '../../data/hero.json';
import { TextAnimations } from '../../animations';
import Breadcrumb from '../navigation/Breadcrumb';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const learnMoreRef = useRef<HTMLButtonElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

  const { hero } = heroData;
  const slides = useMemo(() => hero.slides, []);

  // Optimized for smooth performance - removed magnetic effects to prevent lag

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, slides.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / innerWidth;
    const y = (clientY - innerHeight / 2) / innerHeight;
    
    setMousePosition({ x: clientX, y: clientY });
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Breadcrumb */}
      <div className="absolute top-24 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
        </div>
      </div>
      {/* Advanced Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale }}
      >
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.2, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <div className="w-full h-full relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlay}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 4 === 0 && <GraduationCap className="w-6 h-6 text-blue-400/30" />}
            {i % 4 === 1 && <BookOpen className="w-5 h-5 text-purple-400/30" />}
            {i % 4 === 2 && <Star className="w-4 h-4 text-yellow-400/30" />}
            {i % 4 === 3 && <Globe className="w-5 h-5 text-green-400/30" />}
          </motion.div>
        ))}
      </div>

      {/* Mouse-Following Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1), transparent 40%)`,
        }}
      />

      {/* Main Content with 3D Effects */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              ref={titleRef}
              className="text-left space-y-8"
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, x: -100 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={titleInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-200 text-sm font-medium">Transform Your Future</span>
              </motion.div>

              {/* Main Title with 3D Effect */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <motion.span
                    className="block text-white drop-shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {hero.title.main}
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -50 }}
                    animate={titleInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {hero.title.highlight}
                  </motion.span>
                  <motion.span
                    className="block text-white/90"
                    initial={{ opacity: 0, x: 50 }}
                    animate={titleInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {hero.title.subtitle}
                  </motion.span>
                </motion.h1>
              </div>
              
              {/* Description */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {hero.description}
              </motion.p>

              {/* CTA Buttons with Advanced Hover Effects */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <motion.button
                  ref={ctaButtonRef}
                  className="cursor-hover group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.5)",
                    rotateX: 5,
                    rotateY: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {hero.cta.primary}
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
                
                <motion.button
                  ref={learnMoreRef}
                  className="cursor-hover group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {hero.cta.secondary}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookOpen className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Interactive Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                whileHover={{ 
                  rotateY: 5, 
                  rotateX: 5, 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {/* Dynamic Slide Info */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <GraduationCap className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {slides[currentSlide].title}
                        </h3>
                        <p className="text-gray-300">
                          {slides[currentSlide].description}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                      {hero.features.slice(0, 4).map((feature, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/5 rounded-xl p-4 border border-white/10"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-blue-400" />
                            <span className="text-white font-medium text-sm">{feature.title}</span>
                          </div>
                          <p className="text-gray-400 text-xs">{feature.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Stats Section */}
      <motion.div
        ref={statsRef}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid grid-cols-3 gap-8 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          {hero.stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-3 mx-auto"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {index === 0 && <Users className="w-6 h-6 text-white" />}
                {index === 1 && <Award className="w-6 h-6 text-white" />}
                {index === 2 && <BookOpen className="w-6 h-6 text-white" />}
              </motion.div>
              <motion.div 
                className="text-2xl font-bold text-white mb-1"
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Slider Controls */}
      <motion.div 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={prevSlide}
          className="cursor-hover w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={nextSlide}
          className="cursor-hover w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <motion.div 
        className="absolute top-4 right-4 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`cursor-hover w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isAutoPlaying 
              ? 'bg-white/20 text-white hover:bg-white/30' 
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
        >
          {isAutoPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}
