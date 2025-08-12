import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import schoolImagesData from '../../data/schoolImages.json';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedSchoolGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const schoolImages = schoolImagesData.images;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!containerRef.current || !imagesRef.current) return;

    const container = containerRef.current;
    const imagesContainer = imagesRef.current;

    // Create scroll-triggered animation for changing images
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const imageIndex = Math.floor(progress * (schoolImages.length - 1));
          setCurrentImageIndex(Math.min(imageIndex, schoolImages.length - 1));
        }
      }
    });

    // Animate individual image cards
    const imageCards = imagesContainer.querySelectorAll('.image-card');
    gsap.fromTo(imageCards, 
      { 
        opacity: 0, 
        y: 100, 
        rotationX: -15,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imagesContainer,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [schoolImages.length]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-blue-200/20 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="relative z-10"
        style={{ y, opacity, scale }}
      >
        {/* Title Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Discover Our{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Campus Life
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our state-of-the-art facilities and vibrant learning environment through this interactive gallery
          </motion.p>
        </motion.div>

        {/* Main Featured Image */}
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-purple-100 to-pink-100">
            <motion.img
              key={currentImageIndex}
              src={schoolImages[currentImageIndex]?.url}
              alt={schoolImages[currentImageIndex]?.title}
              className="w-full h-96 md:h-[500px] object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              data-cursor="view"
              data-cursor-text="View Gallery"
            />
            
            {/* Overlay with Image Info */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-white mb-2"
                key={`title-${currentImageIndex}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {schoolImages[currentImageIndex]?.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-200 text-lg"
                key={`desc-${currentImageIndex}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {schoolImages[currentImageIndex]?.description}
              </motion.p>
              
              {schoolImages[currentImageIndex]?.category && (
                <motion.span 
                  className="inline-block mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                  key={`cat-${currentImageIndex}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {schoolImages[currentImageIndex]?.category}
                </motion.span>
              )}
            </motion.div>

            {/* Progress Indicator */}
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white font-medium text-sm">
                {currentImageIndex + 1} / {schoolImages.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          ref={imagesRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {schoolImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`image-card group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-500 ${
                  index === currentImageIndex 
                    ? 'ring-4 ring-purple-500 ring-opacity-60 scale-105' 
                    : 'hover:scale-105'
                }`}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
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
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Hover Content */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0"
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-bold text-sm mb-1">{image.title}</h4>
                    <p className="text-xs opacity-90 line-clamp-2">{image.description}</p>
                  </motion.div>

                  {/* Active Indicator */}
                  {index === currentImageIndex && (
                    <motion.div
                      className="absolute top-3 right-3 w-3 h-3 bg-purple-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Instruction */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-gray-600 text-lg mb-4">Scroll to explore more images</p>
          <motion.div
            className="inline-block w-6 h-10 border-2 border-purple-400 rounded-full relative"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-purple-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
