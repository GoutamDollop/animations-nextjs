import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GraduationCap, BookOpen, Users, Star } from 'lucide-react';

export default function Loading() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.fromTo(
        '.loading-logo',
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }
      );

      // Text animation
      gsap.fromTo(
        '.loading-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
      );

      // Floating icons
      gsap.to('.floating-icon', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 0.3
      });

      // Progress bar animation
      gsap.fromTo(
        '.progress-bar',
        { width: '0%' },
        { width: '100%', duration: 2, ease: 'power2.inOut', delay: 1 }
      );

      // Rotating border
      gsap.to('.rotating-border', {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: 'none'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center z-50"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BookOpen className="floating-icon absolute top-20 left-20 h-8 w-8 text-orange-400 opacity-30" />
        <Users className="floating-icon absolute top-32 right-32 h-6 w-6 text-blue-400 opacity-40" />
        <Star className="floating-icon absolute bottom-40 left-32 h-10 w-10 text-purple-400 opacity-35" />
        <GraduationCap className="floating-icon absolute bottom-20 right-20 h-12 w-12 text-green-400 opacity-30" />
        <div className="floating-icon absolute top-1/2 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="floating-icon absolute top-1/3 right-10 w-6 h-6 bg-pink-400 rounded-full opacity-40"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo with rotating border */}
        <div className="relative mb-8">
          <div className="rotating-border absolute inset-0 w-24 h-24 mx-auto border-4 border-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-30"></div>
          <div className="loading-logo relative w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="loading-text mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            EduVerse
          </h1>
          <p className="text-lg text-gray-600 font-medium">Academy</p>
        </div>

        {/* Loading Message */}
        <div className="loading-text mb-8">
          <p className="text-xl text-gray-600">
            Preparing your learning experience...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="loading-text w-64 mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="progress-bar h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="loading-text flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
