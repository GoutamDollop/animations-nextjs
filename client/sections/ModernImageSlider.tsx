import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Heart,
  Share2,
  Eye,
  Calendar,
  MapPin,
  Users,
  Star,
  Camera,
  Award,
  Sparkles,
  Grid3X3,
  Image as ImageIcon,
  Download,
  Bookmark
} from "lucide-react";
import schoolImagesData from "../data/schoolImages.json";

gsap.registerPlugin(ScrollTrigger);

interface ImageSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  location?: string;
  photographer?: string;
  likes?: number;
  views?: number;
}

export default function ModernImageSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageSlide | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showThumbnails, setShowThumbnails] = useState(false);

  const images: ImageSlide[] = schoolImagesData.images.map((img) => ({
    id: img.id,
    title: img.title,
    description: img.description,
    imageUrl: img.url,
    category: img.category,
    date: img.date,
    location: img.location,
    photographer: img.photographer,
    likes: img.stats?.likes || 0,
    views: img.stats?.views || 0,
  }));

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance slides with mobile consideration
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, isMobile ? 4000 : 5000); // Faster on mobile

    return () => clearInterval(interval);
  }, [isPlaying, images.length, isMobile]);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Enhanced GSAP Animations with mobile optimization
  useEffect(() => {
    if (!sliderRef.current) return;

    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(
        ".slider-header",
        { y: isMobile ? 50 : 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.8 : 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".slider-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Slider container animation
      gsap.fromTo(
        ".slider-container",
        { scale: isMobile ? 0.95 : 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: isMobile ? 0.8 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".slider-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Thumbnail animations (only for desktop)
      if (!isMobile) {
        gsap.fromTo(
          ".thumbnail-item",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".thumbnails-container",
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Controls animation
      gsap.fromTo(
        ".slider-controls",
        { y: isMobile ? 20 : 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".slider-controls",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sliderRef);

    return () => ctx.revert();
  }, [isMobile]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleLike = (imageId: number) => {
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const currentImage = images[currentSlide];

  return (
    <section
      ref={sliderRef}
      className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden"
      data-section="image-slider"
    >
      {/* Background Elements - simplified for mobile */}
      <div className={`absolute inset-0 ${isMobile ? 'opacity-20' : 'opacity-30'}`}>
        <div className={`absolute top-10 left-10 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'} bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-20 right-20 ${isMobile ? 'w-20 h-20' : 'w-40 h-40'} bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl`}></div>
        <div className={`absolute top-1/2 left-1/3 ${isMobile ? 'w-12 h-12' : 'w-24 h-24'} bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl`}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="slider-header text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 shadow-lg">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span className="text-gray-700 font-semibold text-sm sm:text-base">Campus Gallery</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 text-gray-900">
            Moments That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Define Us
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Explore the vibrant life at EduVerse Academy through our stunning
            collection of campus moments, achievements, and unforgettable experiences.
          </p>
        </div>

        {/* Enhanced Main Slider with Mobile Optimization */}
        <div className="slider-container relative mb-8 sm:mb-12">
          <div 
            className={`relative ${isMobile ? 'aspect-[4/3]' : 'aspect-[16/9] lg:aspect-[21/9]'} rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-gradient-to-br from-gray-900 to-slate-800`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: isMobile ? 0.5 : 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={currentImage.imageUrl}
                  alt={currentImage.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Content Overlay with Mobile Optimization */}
                <motion.div
                  initial={{ y: isMobile ? 30 : 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-4' : 'p-6 sm:p-8 lg:p-12'}`}
                >
                  <div className="max-w-4xl">
                    {/* Mobile-Optimized Meta Info */}
                    <div className={`flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4`}>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                        {currentImage.category}
                      </span>
                      {currentImage.location && (
                        <div className="flex items-center space-x-1 text-white/80">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">{currentImage.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-white/80">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{currentImage.date}</span>
                      </div>
                    </div>
                    
                    <h3 className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl lg:text-4xl'} font-bold text-white mb-2 sm:mb-4`}>
                      {currentImage.title}
                    </h3>
                    
                    <p className={`${isMobile ? 'text-sm' : 'text-base sm:text-lg lg:text-xl'} text-white/90 leading-relaxed mb-4 sm:mb-6 ${isMobile ? 'line-clamp-2' : ''}`}>
                      {currentImage.description}
                    </p>
                    
                    {/* Enhanced Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center ${isMobile ? 'space-x-3' : 'space-x-4 sm:space-x-6'}`}>
                        <div className="flex items-center space-x-1 text-white/80">
                          <Eye className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
                          <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>{currentImage.views}</span>
                        </div>
                        <button
                          onClick={() => toggleLike(currentImage.id)}
                          className="flex items-center space-x-1 text-white/80 hover:text-red-400 transition-colors"
                        >
                          <Heart
                            className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} ${
                              likedImages.has(currentImage.id)
                                ? "fill-red-400 text-red-400"
                                : ""
                            }`}
                          />
                          <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>{currentImage.likes}</span>
                        </button>
                        {currentImage.photographer && !isMobile && (
                          <div className="flex items-center space-x-1 text-white/80">
                            <Camera className="w-4 h-4" />
                            <span className="text-sm">{currentImage.photographer}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-3'}`}>
                        <motion.button
                          onClick={() => setSelectedImage(currentImage)}
                          className={`bg-white/20 backdrop-blur-sm text-white ${isMobile ? 'p-2' : 'p-2.5 sm:p-3'} rounded-full hover:bg-white/30 transition-all duration-300`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Maximize2 className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
                        </motion.button>
                        
                        {!isMobile && (
                          <motion.button
                            className="bg-white/20 backdrop-blur-sm text-white p-2.5 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              className={`absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 ${isMobile ? 'w-10 h-10' : 'w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14'} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7'} transition-transform group-hover:-translate-x-0.5`} />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className={`absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 ${isMobile ? 'w-10 h-10' : 'w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14'} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7'} transition-transform group-hover:translate-x-0.5`} />
            </motion.button>

            {/* Mobile Image Counter */}
            {isMobile && (
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {currentSlide + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Mobile Swipe Indicator */}
          {isMobile && (
            <motion.div 
              className="text-center mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                <span>Swipe for more images</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  👆
                </motion.span>
              </p>
            </motion.div>
          )}
        </div>

        {/* Enhanced Controls with Mobile Optimization */}
        <div className="slider-controls flex items-center justify-center space-x-4 sm:space-x-8 mb-8 sm:mb-12">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white ${isMobile ? 'px-4 py-2.5' : 'px-5 sm:px-6 py-2.5 sm:py-3'} rounded-lg sm:rounded-xl font-semibold ${isMobile ? 'text-sm' : 'text-sm sm:text-base'} shadow-lg hover:shadow-xl transition-all duration-300`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <>
                <Pause className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
                <span>Play</span>
              </>
            )}
          </motion.button>

          {/* Mobile-Optimized Progress Dots */}
          <div className={`flex ${isMobile ? 'space-x-1.5' : 'space-x-2'}`}>
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'} rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                whileHover={{ scale: isMobile ? 1.1 : 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                {index === currentSlide && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm`}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Thumbnails Toggle (Desktop only) */}
          {!isMobile && (
            <motion.button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm text-gray-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base border border-white/40 hover:bg-white/80 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{showThumbnails ? 'Hide' : 'Show'} Gallery</span>
            </motion.button>
          )}
        </div>

        {/* Enhanced Thumbnails (Desktop) or Mobile Grid */}
        {(showThumbnails || isMobile) && (
          <div className="thumbnails-container">
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 mb-6 sm:mb-8 text-center`}>
              {isMobile ? 'More Images' : 'Gallery Highlights'}
            </h3>
            
            <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'}`}>
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  className={`thumbnail-item relative ${isMobile ? 'aspect-square' : 'aspect-square'} rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group ${
                    index === currentSlide ? "ring-2 sm:ring-4 ring-blue-500" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: isMobile ? 1.02 : 1.05, y: isMobile ? 0 : -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}></div>
                  <div className={`absolute bottom-1 sm:bottom-2 left-1 sm:left-2 right-1 sm:right-2 text-white ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                    <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-semibold truncate`}>{image.title}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-300`}>{image.category}</p>
                  </div>
                  
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 border-2 sm:border-4 border-blue-500 rounded-lg sm:rounded-xl"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Mobile category badge */}
                  {isMobile && (
                    <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                      {image.category}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`relative ${isMobile ? 'max-w-full max-h-[80vh]' : 'max-w-6xl max-h-[90vh]'} w-full`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
              />
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                ×
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 rounded-b-xl sm:rounded-b-2xl">
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-bold text-white mb-2`}>{selectedImage.title}</h3>
                <p className={`text-gray-300 mb-4 ${isMobile ? 'text-sm' : 'text-base'}`}>{selectedImage.description}</p>
                <div className={`flex items-center ${isMobile ? 'space-x-3' : 'space-x-4'} ${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>
                  <span>{selectedImage.category}</span>
                  <span>{selectedImage.date}</span>
                  {selectedImage.location && <span>{selectedImage.location}</span>}
                </div>
              </div>

              {/* Mobile navigation in fullscreen */}
              {isMobile && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIndex = (currentSlide - 1 + images.length) % images.length;
                      setSelectedImage(images[prevIndex]);
                      setCurrentSlide(prevIndex);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIndex = (currentSlide + 1) % images.length;
                      setSelectedImage(images[nextIndex]);
                      setCurrentSlide(nextIndex);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
