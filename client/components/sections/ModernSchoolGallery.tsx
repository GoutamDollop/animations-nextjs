import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Play, Pause, Eye, Heart, Share2 } from 'lucide-react';
import schoolImagesData from '../../data/schoolImages.json';
import Breadcrumb from '../navigation/Breadcrumb';

gsap.registerPlugin(ScrollTrigger);

export default function ModernSchoolGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');
  
  const schoolImages = schoolImagesData.images;
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % schoolImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, schoolImages.length]);

  // GSAP animations
  useEffect(() => {
    if (!galleryRef.current || !isInView) return;

    const cards = galleryRef.current.querySelectorAll('.gallery-card');
    
    gsap.fromTo(cards, 
      { 
        opacity: 0, 
        y: 80,
        scale: 0.9,
        rotationY: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isInView]);

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % schoolImages.length);
    setIsAutoPlay(false);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + schoolImages.length) % schoolImages.length);
    setIsAutoPlay(false);
  };

  const currentImage = schoolImages[currentIndex];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden"
    >
      {/* Breadcrumb */}
      <div className="absolute top-24 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200/15 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 60, 0],
            y: [0, 90, -45, 0],
            scale: [1, 0.7, 1.4, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative z-10 pt-32 pb-20"
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              Campus{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Gallery
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Experience our vibrant campus life through this immersive visual journey
            </motion.p>
          </motion.div>

          {/* Main Image Carousel */}
          <motion.div 
            className="relative mb-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-purple-100 to-pink-100 aspect-[16/9] max-w-5xl mx-auto">
              
              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <img
                    src={currentImage?.url}
                    alt={currentImage?.title}
                    className="w-full h-full object-cover"
                    data-cursor="view"
                    data-cursor-text="View Full Size"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Image Info */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                key={`info-${currentIndex}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-3"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentImage?.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-200 text-lg mb-4 max-w-2xl"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentImage?.description}
                </motion.p>
                
                <div className="flex items-center space-x-4">
                  {currentImage?.category && (
                    <motion.span 
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {currentImage.category}
                    </motion.span>
                  )}
                  
                  <motion.div 
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
                data-cursor="button"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group"
                data-cursor="button"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Auto-play Control */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                data-cursor="button"
              >
                {isAutoPlay ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Progress Indicator */}
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-white font-medium text-sm">
                  {currentIndex + 1} / {schoolImages.length}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Thumbnail Gallery */}
          <motion.div 
            ref={galleryRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {schoolImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`gallery-card group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
                  index === currentIndex 
                    ? 'ring-4 ring-purple-500 ring-opacity-60 scale-105 shadow-2xl' 
                    : 'hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ 
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                data-cursor="magnetic"
                data-cursor-text={image.title}
              >
                <div className="aspect-square relative overflow-hidden">
                  <motion.img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Hover Content */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0"
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-bold text-sm mb-1 truncate">{image.title}</h4>
                    <p className="text-xs opacity-90 line-clamp-2">{image.description}</p>
                  </motion.div>

                  {/* Active Indicator */}
                  {index === currentIndex && (
                    <motion.div
                      className="absolute top-3 right-3 w-3 h-3 bg-purple-500 rounded-full shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Play Icon for Current */}
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
