import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Calendar, BookOpen } from "lucide-react";
import ModernHeroSection from "../components/ModernHeroSection";
import EnhancedThreeBackground from "../components/EnhancedThreeBackground";
import PhotoGallery from "../components/PhotoGallery";
import AdvancedScrollAnimations from "../components/AdvancedScrollAnimations";
import TextRevealAnimations from "../components/TextRevealAnimations";
import StatsSection from "../components/StatsSection";
import StudentStories from "../components/StudentStories";
import TeacherCard from "../components/TeacherCard";
import teachersData from "../data/teachers.json";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero entrance animation
      gsap.fromTo(
        ".hero-container",
        { scale: 0.9, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // Floating elements animation with improved performance
      const floatingElements = [
        { selector: ".floating-1", y: -20, duration: 3, delay: 0 },
        { selector: ".floating-2", y: -15, duration: 4, delay: 0.5 },
        { selector: ".floating-3", y: -25, duration: 2.5, delay: 1 },
      ];

      floatingElements.forEach(({ selector, y, duration, delay }) => {
        gsap.to(selector, {
          y,
          duration,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay,
        });
      });

      // Optimized section reveals with better performance
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.fromTo(
          section.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Enhanced button interactions
      document.querySelectorAll(".enhanced-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.05,
            y: -3,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Get first 2 teachers for homepage
  const featuredTeachers = teachersData.teachers.slice(0, 2);

  return (
    <div ref={heroRef} className="min-h-screen overflow-hidden">
      {/* Advanced Animation Systems */}
      <AdvancedScrollAnimations />
      <TextRevealAnimations />

      {/* Modern Hero Section */}
      <ModernHeroSection />


      {/* Stats Section with Enhanced Animations - PRESERVED */}
      <div className="fade-slide-left">
        <StatsSection />
      </div>

      {/* Student Stories Section with Scroll Animation - PRESERVED */}
      <div className="scale-rotate">
        <StudentStories />
      </div>

      {/* Meet Our Teachers Section with Advanced Animations */}
      <section className="py-20 bg-white relative overflow-hidden zoom-section">
        {/* Enhanced Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none parallax-bg">
          <div className="float-slow absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20"></div>
          <div className="float-medium absolute bottom-32 right-32 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-15 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16 fade-slide-right">
            <h2 className="section-title text-4xl md:text-5xl font-display font-bold mb-6">
              Meet Our Amazing Teachers 👨‍🏫👩‍🏫
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed fade-slide-left">
              Our passionate educators are dedicated to nurturing young minds
              and inspiring greatness!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto physics-stagger">
            {featuredTeachers.map((teacher, index) => (
              <div key={teacher.id} className="physics-item magnetic-scroll">
                <TeacherCard {...teacher} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12 scale-rotate">
            <Link
              to="/teachers"
              className="enhanced-btn inline-flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-2xl transition-all duration-300 magnetic-scroll"
            >
              <span>Meet All Our Teachers</span>
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section - NEW */}
      <div className="fade-slide-up">
        <PhotoGallery />
      </div>

      {/* Modern CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-pink-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">
              Join Our Educational Community Today! 🎓
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
              Take the first step towards excellence in education and unlock
              your potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
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
