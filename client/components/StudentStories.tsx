import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Award, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import studentsData from '../data/students.json';

gsap.registerPlugin(ScrollTrigger);

export default function StudentStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(
        ".stories-header",
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards entrance animation
      gsap.fromTo(
        ".student-card",
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stories-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      scrollRight();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  // Check scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScrollPosition = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    container.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();

    return () => container.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // w-80 = 320px
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      
      scrollContainerRef.current.scrollTo({
        left: newIndex * (cardWidth + 24), // 24px gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      const maxIndex = studentsData.students.length - 1;
      const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      
      scrollContainerRef.current.scrollTo({
        left: newIndex * (cardWidth + 24),
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      setCurrentIndex(index);
      
      scrollContainerRef.current.scrollTo({
        left: index * (cardWidth + 24),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="stories-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Student Success Stories 📚
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our amazing students about their incredible journey at EduVerse!
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Scroll Controls */}
          <button 
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/95 backdrop-blur-sm rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
              canScrollLeft ? 'hover:shadow-2xl' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          
          <button 
            onClick={scrollRight}
            disabled={!canScrollRight && currentIndex < studentsData.students.length - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/95 backdrop-blur-sm rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
              canScrollRight || currentIndex < studentsData.students.length - 1 ? 'hover:shadow-2xl' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-0 right-0 z-10 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            {isAutoPlaying ? (
              <Pause className="h-5 w-5 text-gray-700" />
            ) : (
              <Play className="h-5 w-5 text-gray-700" />
            )}
          </button>

          {/* Stories Container */}
          <div 
            ref={scrollContainerRef}
            className="stories-container flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-12"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {studentsData.students.map((student, index) => (
              <div
                key={student.id}
                className="student-card flex-shrink-0 w-80 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gradient-to-r from-orange-400 to-pink-400 shadow-xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{student.name}</h3>
                  <p className="text-orange-600 font-semibold text-lg">{student.grade}</p>
                </div>
                
                <div className="relative mb-8">
                  <Quote className="h-8 w-8 text-orange-400 mb-4 opacity-50" />
                  <p className="text-gray-600 leading-relaxed text-lg italic relative z-10">
                    "{student.story}"
                  </p>
                  <Quote className="h-6 w-6 text-orange-300 absolute bottom-0 right-0 opacity-30 rotate-180" />
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                    <Award className="h-5 w-5" />
                    <span>{student.achievement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {studentsData.students.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / studentsData.students.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              {currentIndex + 1} of {studentsData.students.length} stories
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
