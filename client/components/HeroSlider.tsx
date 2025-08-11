import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Play, Pause, Star } from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg",
    title: "Excellence in",
    subtitle: "Education",
    description: "Interactive classroom experiences with cutting-edge technology",
    badge: "🎓 Excellence"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg",
    title: "Building",
    subtitle: "Community",
    description: "Creating lasting friendships and memories through shared learning",
    badge: "🌟 Unity"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg",
    title: "Success",
    subtitle: "Stories",
    description: "Celebrating every milestone in your educational journey",
    badge: "🏆 Success"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const changeSlide = useCallback((index: number) => {
    if (index === currentSlide) return;

    // Simple fade transition for better performance
    if (imageRef.current && contentRef.current) {
      gsap.to([imageRef.current, contentRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentSlide(index);
          gsap.to([imageRef.current, contentRef.current], {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    changeSlide(next);
  }, [currentSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prev);
  }, [currentSlide, changeSlide]);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div ref={sliderRef} className="relative w-full h-full">
      {/* Main Slider Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full min-h-[80vh]">
        {/* Content Side */}
        <div ref={contentRef} className="text-center lg:text-left order-2 lg:order-1 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-orange-600 font-bold text-sm shadow-lg border border-orange-200">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{currentSlideData.badge}</span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-tight">
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                {currentSlideData.title}
              </div>
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {currentSlideData.subtitle}
              </div>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {currentSlideData.description}
          </p>
        </div>

        {/* Image Side */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl blur-2xl opacity-30 scale-110"></div>
            <div ref={imageRef} className="relative">
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full max-w-md rounded-3xl shadow-2xl border-4 border-white"
                loading="lazy"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <Star className="h-8 w-8 text-white fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Auto-play Toggle */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlay ? (
            <Pause className="h-5 w-5 text-gray-700" />
          ) : (
            <Play className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}
