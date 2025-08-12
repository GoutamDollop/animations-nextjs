import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import StudentStories from '../components/sections/StudentStories';
import ModernSchoolGallery from '../components/sections/ModernSchoolGallery';
import { TextAnimations } from "../animations";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* New Modern Hero Section */}
      <HeroSection />

      {/* Student Stories Section */}
      <StudentStories />

      {/* Modern School Gallery Section */}
      <ModernSchoolGallery />



      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-pink-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-spin"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <TextAnimations animation="fadeUp">
              <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">
                Join Our Educational Community Today! 🎓
              </h2>
            </TextAnimations>
            
            <TextAnimations animation="fadeUp" delay={0.2}>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                Take the first step towards excellence in education and unlock your potential.
              </p>
            </TextAnimations>

            <TextAnimations animation="fadeUp" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="cursor-hover group inline-flex items-center justify-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/courses"
                  className="cursor-hover group inline-flex items-center justify-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>View Courses</span>
                </Link>
              </div>
            </TextAnimations>
          </div>
        </div>
      </section>
    </div>
  );
}