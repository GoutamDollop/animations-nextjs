import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

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
    description:
      "Interactive classroom experiences with cutting-edge technology",
    badge: "🎓 Excellence",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg",
    title: "Building",
    subtitle: "Community",
    description:
      "Creating lasting friendships and memories through shared learning",
    badge: "🌟 Unity",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg",
    title: "Success",
    subtitle: "Stories",
    description: "Celebrating every milestone in your educational journey",
    badge: "🏆 Success",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const changeSlide = useCallback(
    (index: number) => {
      if (index === currentSlide) return;

      // Enhanced transition animations
      if (imageRef.current && contentRef.current) {
        gsap.to([imageRef.current, contentRef.current], {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentSlide(index);
            gsap.fromTo(
              [imageRef.current, contentRef.current],
              { opacity: 0, y: -20, scale: 1.05 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
              },
            );
          },
        });
      }
    },
    [currentSlide],
  );

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length;
    changeSlide(next);
  }, [currentSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prev);
  }, [currentSlide, changeSlide]);

  useEffect(() => {
    // Auto-play is always enabled for better UX
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Enhanced entrance animations
  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(
        ".hero-content > *",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.5,
        },
      );

      gsap.fromTo(
        ".hero-image",
        { x: 100, opacity: 0, scale: 0.8, rotation: 10 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3,
        },
      );
    }
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div ref={sliderRef} className="relative w-full h-full">
      {/* Main Slider Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full min-h-[70vh] md:min-h-[80vh]">
        {/* Content Side */}
        <div
          ref={contentRef}
          className="hero-content text-center lg:text-left order-2 lg:order-1 space-y-6 md:space-y-8 px-4 lg:px-0"
        >
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-orange-600 font-bold text-sm shadow-lg border border-orange-200">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{currentSlideData.badge}</span>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-tight">
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                {currentSlideData.title}
              </div>
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {currentSlideData.subtitle}
              </div>
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {currentSlideData.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <span>Get Started</span>
              <Star className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <button className="inline-flex items-center justify-center space-x-2 bg-white border-2 border-orange-300 text-orange-600 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <span>Learn More</span>
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end px-4 lg:px-0">
          <div className="relative hero-image">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl md:rounded-3xl blur-2xl opacity-30 scale-110 animate-pulse"></div>
            <div ref={imageRef} className="relative">
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl md:rounded-3xl shadow-2xl border-2 md:border-4 border-white"
                loading="lazy"
              />
              <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Star className="h-6 w-6 md:h-8 md:w-8 text-white fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 md:space-x-4">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-700" />
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-1.5 md:space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-orange-500 to-red-500 scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="p-1.5 sm:p-2 md:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Next slide"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
