import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Award, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import studentsData from '../data/students.json';

gsap.registerPlugin(ScrollTrigger);

export default function StudentStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, studentsData.students.length - itemsPerView);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(
        ".stories-header",
        { y: 50, opacity: 0 },
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
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stories-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const visibleStudents = studentsData.students.slice(currentIndex, currentIndex + itemsPerView);

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
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                currentIndex === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:shadow-xl transform hover:scale-105'
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow">
              {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, studentsData.students.length)} of {studentsData.students.length} stories
            </div>
            
            <button 
              onClick={scrollRight}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                currentIndex >= maxIndex 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:shadow-xl transform hover:scale-105'
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Stories Grid */}
          <div className="stories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleStudents.map((student, index) => (
              <div
                key={student.id}
                className="student-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Student Header */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-r from-orange-400 to-pink-400 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{student.name}</h3>
                  <p className="text-orange-600 font-semibold">{student.grade}</p>
                </div>
                
                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="h-6 w-6 text-orange-400 mb-3 opacity-50" />
                  <p className="text-gray-600 leading-relaxed italic">
                    "{student.story}"
                  </p>
                </div>
                
                {/* Achievement Badge */}
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    <Award className="h-4 w-4" />
                    <span>{student.achievement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
