import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Award, ChevronLeft, ChevronRight } from "lucide-react";
import studentsData from "../data/students.json";

gsap.registerPlugin(ScrollTrigger);

export default function StudentStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards entrance animation
      gsap.fromTo(
        ".student-card",
        { x: 100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stories-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="stories-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Student Success Stories 📚
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our amazing students about their incredible journey at
            EduVerse!
          </p>
        </div>

        <div className="relative">
          {/* Scroll Controls */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Stories Container */}
          <div
            ref={scrollContainerRef}
            className="stories-container flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {studentsData.students.map((student, index) => (
              <div
                key={student.id}
                className="student-card flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gradient-to-r from-orange-400 to-pink-400 shadow-lg object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-800">
                    {student.name}
                  </h3>
                  <p className="text-orange-600 font-semibold">
                    {student.grade}
                  </p>
                </div>

                <div className="relative mb-6">
                  <Quote className="h-6 w-6 text-orange-400 mb-3" />
                  <p className="text-gray-600 leading-relaxed italic">
                    "{student.story}"
                  </p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    <Award className="h-4 w-4" />
                    <span>{student.achievement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
