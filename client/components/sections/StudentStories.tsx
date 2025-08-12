import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause, Award, TrendingUp } from 'lucide-react';
import { TextAnimations } from '../../animations';
import { createMagneticEffect } from '../../animations/utils/animationUtils';
import studentsData from '../../data/students.json';

export default function StudentStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout>();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const maxIndex = Math.max(0, studentsData.students.length - itemsPerView);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, itemsPerView]);

  // Add magnetic effects
  useEffect(() => {
    if (prevButtonRef.current) {
      createMagneticEffect(prevButtonRef.current, 0.2);
    }
    if (nextButtonRef.current) {
      createMagneticEffect(nextButtonRef.current, 0.2);
    }
  }, []);

  const maxIndex = Math.max(0, studentsData.students.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const visibleStudents = studentsData.students.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <TextAnimations animation="fadeUp" delay={0.1}>
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transforming Lives Through
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
                {" "}Education
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover how our students have achieved remarkable success and transformed their careers with our world-class programs.
            </p>
          </div>
        </TextAnimations>

        {/* Stats Bar */}
        <TextAnimations animation="fadeUp" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 lg:mb-20">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
              <div className="text-3xl lg:text-4xl font-bold text-pink-600 mb-2">5000+</div>
              <div className="text-gray-600 font-medium">Graduates</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">4.9</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600 font-medium">Career Growth</div>
            </div>
          </div>
        </TextAnimations>

        {/* Stories Slider */}
        <div className="relative">
          {/* Controls */}
          <div className="flex justify-between items-center mb-8 lg:mb-12">
            <button
              ref={prevButtonRef}
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="cursor-hover p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <div className="flex items-center space-x-4">
              {/* Auto-play Control */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`cursor-hover p-3 rounded-xl transition-all duration-300 ${
                  isAutoPlaying 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(studentsData.students.length / itemsPerView) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index * itemsPerView)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / itemsPerView) === index
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              ref={nextButtonRef}
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="cursor-hover p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/50"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Stories Cards */}
          <TextAnimations animation="fadeUp" delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visibleStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 relative overflow-hidden"
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  
                  {/* Quote Icon */}
                  <div className="relative mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Quote className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>

                  {/* Story */}
                  <div className="relative mb-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      "{student.story}"
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="relative flex items-center mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 transition-colors duration-200 ${
                            i < student.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {student.rating}/5
                    </span>
                  </div>

                  {/* Student Info */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-14 h-14 rounded-2xl object-cover mr-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {student.name}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium">
                          {student.grade}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TextAnimations>

          {/* Call to Action */}
          <TextAnimations animation="fadeUp" delay={0.5}>
            <div className="text-center mt-16 lg:mt-20">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 rounded-3xl" />
                <div className="relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    Ready to Write Your Success Story?
                  </h3>
                  <p className="text-lg lg:text-xl mb-8 opacity-90">
                    Join thousands of students who have transformed their careers with our programs.
                  </p>
                  <button className="cursor-hover px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Start Your Journey Today
                  </button>
                </div>
              </div>
            </div>
          </TextAnimations>
        </div>
      </div>
    </section>
  );
}
