import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Award, ChevronLeft, ChevronRight, Star } from "lucide-react";
import studentsData from "../data/students.json";

gsap.registerPlugin(ScrollTrigger);

export default function StudentStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1; // Mobile: 1 card
      if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
      return 3; // Desktop: 3 cards
    }
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const maxIndex = Math.max(0, studentsData.students.length - itemsPerView);

  useEffect(() => {
    // Handle responsive updates
    const handleResize = () => {
      const newItemsPerView = getItemsPerView();
      setItemsPerView(newItemsPerView);
      setIsMobile(window.innerWidth < 768);

      // Adjust current index if needed
      const newMaxIndex = Math.max(
        0,
        studentsData.students.length - newItemsPerView,
      );
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(newMaxIndex);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

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
            toggleActions: "play none none reverse",
          },
        },
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
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex]);

  // Auto-scroll for mobile
  useEffect(() => {
    if (isMobile && studentsData.students.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newMaxIndex = Math.max(
            0,
            studentsData.students.length - itemsPerView,
          );
          return prevIndex >= newMaxIndex ? 0 : prevIndex + 1;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isMobile, itemsPerView]);

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  const visibleStudents = studentsData.students.slice(
    currentIndex,
    currentIndex + itemsPerView,
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="stories-header text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
            Student Success Stories 📚
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our amazing students about their incredible journey at
            EduVerse!
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Controls - Hidden on mobile during auto-scroll */}
          {!isMobile && (
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                  currentIndex === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:shadow-xl transform hover:scale-105"
                }`}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow">
                {currentIndex + 1}-
                {Math.min(
                  currentIndex + itemsPerView,
                  studentsData.students.length,
                )}{" "}
                of {studentsData.students.length} stories
              </div>

              <button
                onClick={scrollRight}
                disabled={currentIndex >= maxIndex}
                className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
                  currentIndex >= maxIndex
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:shadow-xl transform hover:scale-105"
                }`}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Mobile indicator and controls */}
          {isMobile && (
            <div className="text-center mb-6">
              <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow inline-block mb-4">
                {currentIndex + 1} of {studentsData.students.length} stories •
                Auto-scrolling
              </div>

              {/* Manual controls for mobile */}
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={scrollLeft}
                  disabled={currentIndex === 0}
                  className={`p-2 rounded-full shadow-md transition-all duration-300 ${
                    currentIndex === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:shadow-lg transform hover:scale-105"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="text-xs text-gray-500 bg-orange-50 px-3 py-1 rounded-full">
                  Manual Control
                </div>

                <button
                  onClick={scrollRight}
                  disabled={currentIndex >= maxIndex}
                  className={`p-2 rounded-full shadow-md transition-all duration-300 ${
                    currentIndex >= maxIndex
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:shadow-lg transform hover:scale-105"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Stories Grid */}
          <div
            className={`stories-grid grid gap-6 md:gap-8 ${
              itemsPerView === 1
                ? "grid-cols-1"
                : itemsPerView === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {visibleStudents.map((student, index) => (
              <div
                key={student.id}
                className={`student-card bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                  isMobile ? "mx-auto max-w-sm" : ""
                }`}
              >
                {/* Student Header */}
                <div className="text-center mb-4 md:mb-6">
                  <div className="relative inline-block mb-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className={`rounded-full object-cover border-4 border-gradient-to-r from-orange-400 to-pink-400 shadow-lg ${
                        isMobile ? "w-16 h-16" : "w-20 h-20"
                      }`}
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h3
                    className={`font-bold text-gray-800 mb-1 ${
                      isMobile ? "text-lg" : "text-xl"
                    }`}
                  >
                    {student.name}
                  </h3>
                  <p
                    className={`text-orange-600 font-semibold ${
                      isMobile ? "text-sm" : "text-base"
                    }`}
                  >
                    {student.grade}
                  </p>
                </div>

                {/* Quote */}
                <div className={`relative ${isMobile ? "mb-4" : "mb-6"}`}>
                  <Quote
                    className={`text-orange-400 mb-2 opacity-50 ${
                      isMobile ? "h-5 w-5" : "h-6 w-6 mb-3"
                    }`}
                  />
                  <p
                    className={`text-gray-600 leading-relaxed italic ${
                      isMobile ? "text-sm" : "text-base"
                    }`}
                  >
                    "{student.story}"
                  </p>
                </div>

                {/* Achievement Badge */}
                <div className="text-center">
                  <div
                    className={`inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold shadow-lg ${
                      isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
                    }`}
                  >
                    <Award className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
                    <span>{student.achievement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator - Now clickable on mobile too */}
          <div className="flex justify-center space-x-2 mt-6 md:mt-8">
            {Array.from({ length: Math.max(1, maxIndex + 1) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  isMobile ? "w-3 h-3" : "w-3 h-3"
                } ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-orange-500 to-red-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
