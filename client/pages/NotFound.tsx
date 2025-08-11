import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Home, ArrowLeft, Search, BookOpen, Users, Star } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 404 text animation
      gsap.fromTo(
        ".error-text",
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        },
      );

      // Content animation
      gsap.fromTo(
        ".error-content",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          stagger: 0.2,
        },
      );

      // Floating elements
      gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5,
      });

      // Interactive buttons
      document.querySelectorAll(".error-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.05,
            y: -5,
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-60"></div>
        <div className="floating-element absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-50"></div>
        <div className="floating-element absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-40"></div>
        <div className="floating-element absolute bottom-20 right-20 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-70"></div>
        <div className="floating-element absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
        <div className="floating-element absolute top-1/3 right-10 w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* 404 Text */}
          <div className="error-text mb-8">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="error-content mb-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
              Oops! Page Not Found 🔍
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              It looks like you've wandered off the learning path! The page
              you're looking for doesn't exist, but don't worry - there's
              plenty more to explore at EduVerse Academy.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="error-content mb-12">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/"
                className="error-btn inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300"
              >
                <Home className="h-6 w-6" />
                <span>Back to Home</span>
              </Link>

              <Link
                to="/courses"
                className="error-btn inline-flex items-center justify-center space-x-3 bg-white border-2 border-orange-300 text-orange-600 px-8 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all duration-300"
              >
                <BookOpen className="h-6 w-6" />
                <span>Explore Courses</span>
              </Link>

              <Link
                to="/contact"
                className="error-btn inline-flex items-center justify-center space-x-3 bg-transparent border-2 border-gray-400 text-gray-600 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300"
              >
                <Users className="h-6 w-6" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Helpful Suggestions */}
          <div className="error-content bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
              <span>Suggested Pages</span>
              <Search className="h-6 w-6 text-orange-600" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/about"
                className="error-btn p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  About Us
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Learn about our academy
                </p>
              </Link>

              <Link
                to="/teachers"
                className="error-btn p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  Our Teachers
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Meet our amazing faculty
                </p>
              </Link>

              <Link
                to="/events"
                className="error-btn p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                  Events
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Upcoming activities
                </p>
              </Link>
            </div>
          </div>

          {/* Fun Fact */}
          <div className="error-content mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="text-lg font-bold text-gray-800">
                Did you know?
              </span>
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-gray-600">
              At EduVerse Academy, we believe every mistake is a learning
              opportunity! Just like this 404 error taught you something new
              about web navigation. 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
