import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EnhancedHeroSection from "../sections/EnhancedHeroSection";
import SchoolImageCards from "../sections/SchoolImageCards";
import ModernStudentStories from "../sections/ModernStudentStories";
import StatsSection from "../components/sections/stats/StatsSection";
import TeacherCard from "../components/ui/cards/TeacherCard";
import teachersData from "../data/teachers.json";
import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpen, Award, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ModernIndex() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
      );

      // Scroll-triggered animations for various sections
      gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
        gsap.fromTo(
          element,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Parallax effects
      gsap.utils.toArray(".parallax-element").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Get featured teachers
  const featuredTeachers = teachersData.teachers.slice(0, 3);

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* School Image Cards Section */}
      <SchoolImageCards />

      {/* Enhanced Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-on-scroll">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 mb-4 md:mb-6">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
              <span className="text-blue-600 font-semibold text-sm md:text-base">
                Our Achievements
              </span>
              <Target className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 text-gray-900 leading-tight">
              Excellence in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Numbers
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our commitment to academic excellence is reflected in these
              remarkable achievements.
            </p>
          </div>
          
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-black text-blue-600 mb-2">2.5K+</div>
              <div className="text-gray-800 font-bold text-sm md:text-base mb-1">Students</div>
              <div className="text-gray-600 text-xs md:text-sm">Active Learners</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-black text-purple-600 mb-2">150+</div>
              <div className="text-gray-800 font-bold text-sm md:text-base mb-1">Courses</div>
              <div className="text-gray-600 text-xs md:text-sm">Available Programs</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-lg">
                <Target className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-black text-green-600 mb-2">98%</div>
              <div className="text-gray-800 font-bold text-sm md:text-base mb-1">Success Rate</div>
              <div className="text-gray-600 text-xs md:text-sm">Graduate Success</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
                <Award className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-black text-orange-600 mb-2">15+</div>
              <div className="text-gray-800 font-bold text-sm md:text-base mb-1">Years</div>
              <div className="text-gray-600 text-xs md:text-sm">Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Stories Section */}
      <ModernStudentStories />

      {/* Featured Teachers Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 animate-on-scroll">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 md:mb-16 px-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 mb-4 md:mb-6">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
              <span className="text-purple-600 font-semibold text-sm md:text-base">
                Meet Our Faculty
              </span>
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-6 text-gray-900 leading-tight">
              World-Class{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                Educators
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our passionate educators are dedicated to nurturing young minds
              and inspiring excellence in every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTeachers.map((teacher, index) => (
              <div
                key={teacher.id}
                className="animate-on-scroll transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <TeacherCard {...teacher} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/teachers"
              className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
            >
              <span>Meet All Our Teachers</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-on-scroll">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Start Your Educational{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Journey Today
              </span>
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of students who have achieved their dreams with us.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/courses"
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="w-5 h-5" />
                <span>View Courses</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
