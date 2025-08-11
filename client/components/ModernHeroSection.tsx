import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star, Trophy, BookOpen, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2322&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

export default function ModernHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animations
      gsap.fromTo(
        textRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.6
        }
      );

      // Floating elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Text reveal animations
      gsap.fromTo(
        '.hero-title span',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.8
        }
      );

      // Button animations
      gsap.fromTo(
        '.hero-buttons > *',
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          delay: 1.2
        }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating shapes */}
        <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"></div>
        <div className="floating-element absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-25"></div>
        <div className="floating-element absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-15"></div>
        <div className="floating-element absolute bottom-60 right-40 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-30"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-blue-200 rounded-full opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-purple-200 rounded-full opacity-15"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div ref={textRef} className="space-y-8">
            {/* Subtitle */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
              <span className="text-orange-500 font-semibold text-lg tracking-wide uppercase">
                Premier Education Institution
              </span>
            </div>

            {/* Main Title */}
            <h1 className="hero-title text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-gray-900">
              <span className="inline-block">Together</span>{' '}
              <span className="inline-block text-blue-600">we'll</span>
              <br />
              <span className="inline-block">explore</span>{' '}
              <span className="inline-block text-orange-500">new</span>
              <br />
              <span className="inline-block text-purple-600">knowledge</span>
            </h1>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
              Discover excellence in education with our innovative learning environment, 
              expert faculty, and comprehensive programs designed for future leaders.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">2.5K+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Expert Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <button className="group inline-flex items-center justify-center space-x-3 bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-orange-500">
                <Play className="w-5 h-5 text-orange-500" />
                <span>Watch Video</span>
              </button>
            </div>

            {/* Awards/Recognition */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-sm text-gray-600">Award Winning</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="text-sm text-gray-600">5-Star Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-500" />
                <span className="text-sm text-gray-600">Expert Faculty</span>
              </div>
            </div>
          </div>

          {/* Right Content - Images */}
          <div ref={imageRef} className="relative">
            {/* Main Image */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                alt="Students learning together"
                className="w-full h-auto rounded-3xl shadow-2xl object-cover"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-8 -left-8 bg-white p-4 rounded-2xl shadow-xl z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">50+ Courses</div>
                    <div className="text-sm text-gray-600">Available Now</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-xl z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">Expert Teachers</div>
                    <div className="text-sm text-gray-600">World Class</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Images */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 transform translate-x-4 -translate-y-4">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2322&q=80"
                alt="School facilities"
                className="w-full h-full object-cover rounded-2xl shadow-lg opacity-80"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 transform -translate-x-4 translate-y-4">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Science lab"
                className="w-full h-full object-cover rounded-2xl shadow-lg opacity-80"
              />
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-orange-500 to-transparent rounded-full"></div>
      </div>
    </section>
  );
}
