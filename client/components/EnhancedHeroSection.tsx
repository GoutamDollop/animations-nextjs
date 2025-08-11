import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Trophy, 
  Users, 
  BookOpen,
  Sparkles,
  Target,
  Clock
} from 'lucide-react';
import HeroSlider from './HeroSlider';
import ThreeBackground from './ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

export default function EnhancedHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced entrance animations
      gsap.fromTo(
        '.hero-main-content',
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3
        }
      );

      // Floating elements with different timing
      gsap.to('.floating-element-1', {
        y: -30,
        rotation: 15,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });

      gsap.to('.floating-element-2', {
        y: -20,
        rotation: -10,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5
      });

      gsap.to('.floating-element-3', {
        y: -25,
        rotation: 20,
        duration: 3.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1
      });

      // Animated statistics counter
      gsap.fromTo(
        '.stat-number',
        { innerText: 0 },
        {
          innerText: (index, target) => target.getAttribute('data-value'),
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Parallax effect for background elements
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Staggered feature cards animation
      gsap.fromTo(
        '.feature-card',
        { y: 60, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Trophy,
      title: "Award Winning",
      description: "Excellence in education recognized globally",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "World-class educators and mentors",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Modern Curriculum",
      description: "Future-ready programs and courses",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Target,
      title: "Career Focus",
      description: "Industry-aligned skill development",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const stats = [
    { number: 2500, label: "Students", suffix: "+" },
    { number: 150, label: "Courses", suffix: "+" },
    { number: 98, label: "Success Rate", suffix: "%" },
    { number: 20, label: "Years Experience", suffix: "+" }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground className="opacity-40" />
      
      {/* Parallax Background Elements */}
      <div className="parallax-bg absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-pink-400 to-yellow-500 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element-1 absolute top-20 left-20 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg opacity-60 shadow-lg"></div>
        <div className="floating-element-2 absolute top-1/3 right-20 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-70 shadow-lg"></div>
        <div className="floating-element-3 absolute bottom-1/3 left-1/4 w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg opacity-50 shadow-lg"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 z-10 relative">
        {/* Main Hero Content */}
        <div className="hero-main-content text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-orange-200">
            <Sparkles className="h-5 w-5 text-orange-600" />
            <span className="text-orange-800 font-semibold">Welcome to the Future of Education</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-8 leading-tight">
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Transform Your Future
            </div>
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              With EduVerse Academy
            </div>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            Experience world-class education with cutting-edge technology, expert faculty, and personalized learning paths designed for your success.
          </p>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/courses"
              className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <span>Start Learning Today</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group inline-flex items-center justify-center space-x-3 bg-white/90 backdrop-blur-sm border-2 border-orange-300 text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Enhanced Statistics Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  <span className="stat-number" data-value={stat.number}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-gray-600 font-semibold mt-2">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Wave Shape */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 md:h-24">
            <defs>
              <linearGradient id="enhanced-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="25%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="75%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path 
              fill="url(#enhanced-wave)" 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="animate-pulse"
              style={{ animationDuration: '6s' }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
