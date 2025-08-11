import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  Heart,
  Star,
} from "lucide-react";

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
    title: "Happy Learning",
    subtitle: "Students",
    description:
      "Interactive classroom experiences with cutting-edge technology",
    badge: "🎓 Excellence",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg",
    title: "Diverse Community",
    subtitle: "Together",
    description: "Building friendships and memories that last a lifetime",
    badge: "🌟 Unity",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg",
    title: "Success Stories",
    subtitle: "Achievements",
    description: "Celebrating every milestone in your educational journey",
    badge: "🏆 Success",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/5274601/pexels-photo-5274601.jpeg",
    title: "Creative Learning",
    subtitle: "Outdoors",
    description: "Exploring knowledge through hands-on activities and play",
    badge: "🎨 Creativity",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    changeSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    changeSlide(prev);
  };

  const changeSlide = (index: number) => {
    if (index === currentSlide) return;

    const tl = gsap.timeline();

    // Animate out current content
    tl.to(contentRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Animate out current image
    tl.to(
      imageRef.current,
      {
        scale: 1.1,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.3",
    );

    // Change slide
    tl.call(() => {
      setCurrentSlide(index);
    });

    // Animate in new image
    tl.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0, rotationY: 45 },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      },
    );

    // Animate in new content
    tl.fromTo(
      contentRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3",
    );
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div ref={sliderRef} className="relative w-full h-full">
      {/* Main Slider Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
        {/* Content Side */}
        <div
          ref={contentRef}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 text-orange-600 font-bold text-sm shadow-lg border border-orange-200 animate-bounce">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>{currentSlideData.badge}</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-black leading-tight">
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  {currentSlideData.title}
                </div>
                <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                  {currentSlideData.subtitle}
                </div>
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {currentSlideData.description}
            </p>
          </div>
        </div>

        {/* Image Side */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl blur-2xl opacity-30 scale-110 animate-pulse"></div>
            <div ref={imageRef} className="relative">
              <img
                src={currentSlideData.image}
                alt={currentSlideData.title}
                className="w-full max-w-lg rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Heart className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-orange-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-orange-500 to-red-500 scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        >
          <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-orange-600" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        <span className="text-sm font-bold text-gray-700">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}
