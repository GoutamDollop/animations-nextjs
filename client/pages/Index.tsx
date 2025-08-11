import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Calendar } from "lucide-react";
import ModernHeroSection from "../components/ModernHeroSection";
import EnhancedThreeBackground from "../components/EnhancedThreeBackground";
import ImageShowcase from "../components/ImageShowcase";
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
        }
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
          }
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

      {/* Image Showcase - NEW */}
      <div className="fade-slide-up">
        <ImageShowcase />
      </div>

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
              Our passionate educators are dedicated to nurturing young minds and inspiring greatness!
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

      {/* Enhanced CTA Section with Advanced Animations */}
      <section className="py-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative overflow-hidden pin-section">
        {/* Advanced Floating Shapes with Parallax */}
        <div className="absolute inset-0 opacity-20 parallax-bg">
          <div className="float-fast absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full morph-shape"></div>
          <div className="float-slow absolute bottom-32 right-32 w-24 h-24 bg-green-300 rounded-full morph-shape"></div>
          <div className="float-medium absolute top-1/2 left-1/4 w-20 h-20 bg-blue-300 rounded-full morph-shape"></div>
          <div className="float-fast absolute top-1/3 right-1/4 w-28 h-28 bg-purple-300 rounded-full morph-shape"></div>
        </div>

        {/* Enhanced Three.js Background Layer */}
        <EnhancedThreeBackground className="opacity-40" intensity={0.8} />

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto pin-content">
            <h2 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-6 md:mb-8 text-white leading-tight">
              Ready to Start Your Amazing
              <br className="hidden sm:block" />
              <span className="text-yellow-300 gradient-reveal">Educational Journey</span>? 🎓
            </h2>
            <p className="wave-text text-lg md:text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
              Join thousands of students who have transformed their lives through our innovative educational programs and supportive community! ✨🚀
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center physics-stagger">
              <Link
                to="/contact"
                className="physics-item enhanced-btn inline-flex items-center justify-center space-x-2 md:space-x-4 bg-white text-orange-600 px-6 md:px-12 py-3 md:py-6 rounded-2xl font-black text-base md:text-xl shadow-2xl transition-all duration-300 magnetic-scroll"
              >
                <span className="text-center">Apply Now - Transform Your Future!</span>
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
              <Link
                to="/events"
                className="physics-item enhanced-btn inline-flex items-center justify-center space-x-2 md:space-x-4 bg-transparent border-2 md:border-3 border-white text-white px-6 md:px-12 py-3 md:py-6 rounded-2xl font-black text-base md:text-xl hover:bg-white hover:text-orange-600 transition-all duration-300 magnetic-scroll"
              >
                <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                <span>Upcoming Events</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
