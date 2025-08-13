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

  // Auto-advance slides
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  // GSAP Animations
  useEffect(() => {
    if (!sliderRef.current) return;

    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(
        ".slider-header",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
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
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".slider-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Thumbnail animations
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

      // Controls animation
      gsap.fromTo(
        ".slider-controls",
        { y: 30, opacity: 0 },
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
  }, []);

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
      className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden"
      data-section="image-slider"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="slider-header text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
            <Camera className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 font-semibold">Campus Gallery</span>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Moments That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Define Us
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the vibrant life at EduVerse Academy through our stunning
            collection of campus moments, achievements, and unforgettable experiences.
          </p>
        </div>

        {/* Main Slider */}
        <div className="slider-container relative mb-12">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-slate-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={currentImage.imageUrl}
                  alt={currentImage.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Content Overlay */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 p-8 lg:p-12"
                >
                  <div className="max-w-4xl">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {currentImage.category}
                      </span>
                      {currentImage.location && (
                        <div className="flex items-center space-x-1 text-white/80">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{currentImage.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-white/80">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{currentImage.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                      {currentImage.title}
                    </h3>
                    
                    <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-6">
                      {currentImage.description}
                    </p>
                    
                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1 text-white/80">
                          <Eye className="w-5 h-5" />
                          <span className="font-medium">{currentImage.views}</span>
                        </div>
                        <button
                          onClick={() => toggleLike(currentImage.id)}
                          className="flex items-center space-x-1 text-white/80 hover:text-red-400 transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              likedImages.has(currentImage.id)
                                ? "fill-red-400 text-red-400"
                                : ""
                            }`}
                          />
                          <span className="font-medium">{currentImage.likes}</span>
                        </button>
                        {currentImage.photographer && (
                          <div className="flex items-center space-x-1 text-white/80">
                            <Camera className="w-4 h-4" />
                            <span className="text-sm">{currentImage.photographer}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <motion.button
                          onClick={() => setSelectedImage(currentImage)}
                          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Maximize2 className="w-5 h-5" />
                        </motion.button>
                        
                        <motion.button
                          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Share2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 transition-transform group-hover:-translate-x-0.5" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </div>

        {/* Controls */}
        <div className="slider-controls flex items-center justify-center space-x-8 mb-12">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Play</span>
              </>
            )}
          </motion.button>

          {/* Progress Dots */}
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="thumbnails-container">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Gallery Highlights
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className={`thumbnail-item relative aspect-square rounded-xl overflow-hidden cursor-pointer group ${
                  index === currentSlide ? "ring-4 ring-blue-500" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold truncate">{image.title}</h4>
                  <p className="text-xs text-gray-300">{image.category}</p>
                </div>
                
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 border-4 border-blue-500 rounded-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
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
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-2xl"
              />
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                ×
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{selectedImage.category}</span>
                  <span>{selectedImage.date}</span>
                  {selectedImage.location && <span>{selectedImage.location}</span>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
