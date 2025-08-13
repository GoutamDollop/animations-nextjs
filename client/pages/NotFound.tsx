import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Users, 
  Star,
  Sparkles,
  Heart,
  Rocket,
  Compass,
  MapPin,
  HelpCircle,
  RefreshCw,
  ChevronRight,
  Target,
  Zap,
  Calendar
} from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 404 text animation with enhanced effect
      gsap.fromTo(
        ".error-number",
        { scale: 0, rotation: -180, opacity: 0, y: 100 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "elastic.out(1, 0.3)",
          delay: 0.3,
        },
      );

      // Content stagger animation
      gsap.fromTo(
        ".error-content-item",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 1,
          ease: "power3.out",
          stagger: 0.15,
        },
      );

      // Floating particles with more variation
      gsap.to(".floating-particle", {
        y: (i) => -20 - (i * 5),
        x: (i) => Math.sin(i) * 10,
        rotation: (i) => i * 30,
        duration: (i) => 3 + (i * 0.5),
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3,
      });

      // Enhanced button hover effects
      document.querySelectorAll(".enhanced-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.05,
            y: -8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            y: 0,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Compass rotation animation
      gsap.to(".compass-icon", {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="floating-particle absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-xl"></div>
        <div className="floating-particle absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-300/40 to-cyan-300/40 rounded-full blur-lg"></div>
        <div className="floating-particle absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-br from-purple-300/25 to-pink-300/25 rounded-full blur-2xl"></div>
        <div className="floating-particle absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-green-300/35 to-emerald-300/35 rounded-full blur-lg"></div>
        <div className="floating-particle absolute top-1/2 left-16 w-16 h-16 bg-gradient-to-br from-yellow-300/40 to-orange-300/40 rounded-full blur-md"></div>
        <div className="floating-particle absolute top-1/4 right-16 w-12 h-12 bg-gradient-to-br from-indigo-300/30 to-purple-300/30 rounded-full blur-sm"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/3 left-1/4 w-2 h-24 bg-gradient-to-b from-blue-400/20 to-transparent rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-20 bg-gradient-to-b from-purple-400/25 to-transparent -rotate-45"></div>
      </div>

      {/* Main Content Container - Properly Centered */}
      <div 
        ref={containerRef}
        className="flex items-center justify-center min-h-screen p-4 relative z-10"
      >
        <div className="text-center max-w-6xl mx-auto space-y-12">
          {/* Error Number with Enhanced Design */}
          <motion.div 
            className="error-number relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          >
            <h1 className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-black leading-none">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent relative">
                4
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 opacity-20 blur-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              <span className="relative mx-4">
                <div className="compass-icon inline-block">
                  <Compass className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-blue-500" />
                </div>
              </span>
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                4
              </span>
            </h1>
          </motion.div>

          {/* Title and Description */}
          <div className="space-y-6">
            <motion.h2 
              className="error-content-item text-4xl sm:text-5xl lg:text-6xl font-black text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Lost in Space? 🚀
            </motion.h2>
            
            <motion.p 
              className="error-content-item text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Looks like you've ventured into uncharted territory! This page seems to have taken a different learning path. 
              Let's get you back to your educational journey.
            </motion.p>
          </div>

          {/* Action Buttons Grid */}
          <motion.div 
            className="error-content-item grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <Link
              to="/"
              className="enhanced-btn group relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <Home className="w-6 h-6" />
                <span>Back to Home</span>
              </div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/courses"
              className="enhanced-btn group relative bg-white border-2 border-blue-300 text-blue-600 p-6 rounded-2xl font-bold text-lg shadow-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
            >
              <div className="flex items-center justify-center space-x-3">
                <BookOpen className="w-6 h-6" />
                <span>Explore Courses</span>
              </div>
            </Link>

            <Link
              to="/contact"
              className="enhanced-btn group relative bg-white border-2 border-purple-300 text-purple-600 p-6 rounded-2xl font-bold text-lg shadow-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-6 h-6" />
                <span>Get Help</span>
              </div>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="error-content-item bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800">Quick Navigation</h3>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { to: "/about", icon: Target, label: "About Us" },
                { to: "/teachers", icon: Users, label: "Faculty" },
                { to: "/events", icon: Calendar, label: "Events" },
                { to: "/gallery", icon: MapPin, label: "Gallery" }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="group p-4 rounded-xl hover:bg-white/80 transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">{item.label}</span>
                </Link>
              ))}
            </div>
            
            <p className="text-gray-600 text-center leading-relaxed mt-6">
              "Every master was once a disaster. Every journey begins with a single step in the right direction."
              <br />
              <span className="text-blue-600 font-semibold">- Keep exploring, keep learning! 🌟</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
