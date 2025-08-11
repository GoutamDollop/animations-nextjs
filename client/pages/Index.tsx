import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Calendar } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import HeroSlider from "../components/HeroSlider";
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

      // Floating elements animation
      gsap.to(".floating-1", {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".floating-2", {
        y: -15,
        rotation: 10,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      gsap.to(".floating-3", {
        y: -25,
        x: 10,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
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

      // Enhanced button interactions with better performance
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
      {/* Enhanced Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden">
        <AnimatedBackground />

        {/* Additional Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-1 absolute top-20 left-10 md:left-20 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="floating-2 absolute top-1/3 right-10 md:right-20 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-30"></div>
          <div className="floating-3 absolute bottom-1/4 left-1/4 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-25"></div>
          <div className="floating-1 absolute bottom-20 right-1/3 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20"></div>
        </div>

        <div className="hero-container container mx-auto px-4 lg:px-8 z-10 relative">
          <HeroSlider />
        </div>

        {/* Enhanced Wave Shape with Animation */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-20 lg:h-24"
          >
            <defs>
              <linearGradient id="hero-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="25%" stopColor="#ef4444" />
                <stop offset="75%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path
              fill="url(#hero-wave)"
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Student Stories Section */}
      <StudentStories />

      {/* Meet Our Teachers Section */}
      <section className="reveal-section py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Meet Our Amazing{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Teachers
              </span>{" "}
              ���‍🏫👩‍🏫
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our passionate educators are dedicated to nurturing young minds
              and inspiring greatness!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {featuredTeachers.map((teacher, index) => (
              <TeacherCard key={teacher.id} {...teacher} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/teachers"
              className="enhanced-btn inline-flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-2xl transition-all duration-300"
            >
              <span>Meet All Our Teachers</span>
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="reveal-section py-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-green-300 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-purple-300 rounded-full animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-6 md:mb-8 text-white leading-tight">
              Ready to Start Your Amazing
              <br className="hidden sm:block" />
              <span className="text-yellow-300">Educational Journey</span>? 🎓
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-orange-100 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
              Join thousands of students who have transformed their lives
              through our innovative educational programs and supportive
              community! ✨🚀
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link
                to="/contact"
                className="enhanced-btn inline-flex items-center justify-center space-x-2 md:space-x-4 bg-white text-orange-600 px-6 md:px-12 py-3 md:py-6 rounded-2xl font-black text-base md:text-xl shadow-2xl transition-all duration-300"
              >
                <span className="text-center">
                  Apply Now - Transform Your Future!
                </span>
                <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
              <Link
                to="/events"
                className="enhanced-btn inline-flex items-center justify-center space-x-2 md:space-x-4 bg-transparent border-2 md:border-3 border-white text-white px-6 md:px-12 py-3 md:py-6 rounded-2xl font-black text-base md:text-xl hover:bg-white hover:text-orange-600 transition-all duration-300"
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
