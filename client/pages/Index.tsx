import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Calendar,
  GraduationCap,
  Star,
  ChevronRight,
  Play,
  Heart,
  Lightbulb,
  Target,
  Zap,
  Rocket,
  Globe,
  Shield,
} from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import AnimatedCounter from "../components/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero animations
      const tl = gsap.timeline({ delay: 0.3 });

      // Floating elements animation
      gsap.set(".floating-element", { scale: 0, rotation: 0 });
      
      tl.to(".floating-element", {
        scale: 1,
        rotation: 360,
        duration: 1.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
      });

      // Hero text animations with morphing effect
      tl.fromTo(
        ".hero-word",
        { 
          y: 100, 
          opacity: 0, 
          rotationX: -90,
          transformOrigin: "50% 50% -50px"
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.2, 
          stagger: 0.15, 
          ease: "back.out(1.7)" 
        },
        "-=1"
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      tl.fromTo(
        ".cta-button",
        { y: 30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "back.out(1.7)" 
        },
        "-=0.3"
      );

      // Continuous floating animations
      gsap.to(".floating-element", {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.5
      });

      // Section reveal animations
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.fromTo(
          section.children,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Advanced card animations
      gsap.utils.toArray(".feature-card").forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { 
            y: 80, 
            opacity: 0, 
            rotationY: -15,
            transformOrigin: "center center"
          },
          {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1
          }
        );
      });

      // Stats counter animations
      gsap.utils.toArray(".stat-card").forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { 
            scale: 0.8, 
            opacity: 0,
            rotationY: 180
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.15
          }
        );
      });

      // Interactive hover effects
      document.querySelectorAll(".interactive-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, { 
            scale: 1.08, 
            rotationZ: 2,
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { 
            scale: 1, 
            rotationZ: 0,
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: 5000, label: "Happy Students", icon: Users, suffix: "+" },
    { number: 200, label: "Expert Teachers", icon: GraduationCap, suffix: "+" },
    { number: 50, label: "Programs", icon: BookOpen, suffix: "+" },
    { number: 98, label: "Success Rate", icon: Award, suffix: "%" },
  ];

  const features = [
    {
      title: "Interactive Learning",
      description: "Engaging digital classrooms with cutting-edge technology",
      icon: Lightbulb,
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50"
    },
    {
      title: "Expert Faculty",
      description: "Learn from industry professionals and experienced educators",
      icon: Users,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art labs, libraries, and sports complexes",
      icon: Rocket,
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Global Recognition",
      description: "Internationally accredited programs and partnerships",
      icon: Globe,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Career Focus",
      description: "100% placement assistance and industry connections",
      icon: Target,
      color: "from-red-400 to-rose-500",
      bgColor: "bg-red-50"
    },
    {
      title: "Safe Environment",
      description: "Secure campus with 24/7 safety and well-being support",
      icon: Shield,
      color: "from-indigo-400 to-blue-500",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        
        {/* Floating Elements */}
        <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-80"></div>
          <div className="floating-element absolute top-32 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-70"></div>
          <div className="floating-element absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-60"></div>
          <div className="floating-element absolute bottom-20 right-32 w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-80"></div>
          <div className="floating-element absolute top-1/2 left-32 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-90"></div>
          <div className="floating-element absolute top-1/3 right-40 w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-70"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center z-10 relative">
          <div className="space-y-6 mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 text-primary font-semibold text-sm shadow-lg">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>🎉 Welcome to EduVerse Academy</span>
            </div>
            
            <div ref={titleRef} className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-black leading-tight">
                <div className="hero-word inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Shape
                </div>
                <br />
                <div className="hero-word inline-block bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
                  Your
                </div>
                <br />
                <div className="hero-word inline-block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Future
                </div>
              </h1>
            </div>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Join thousands of students in their journey to excellence with our 
            world-class education and innovative learning experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/courses"
              className="cta-button interactive-btn inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <span>Explore Courses</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
            
            <button className="cta-button interactive-btn inline-flex items-center space-x-3 bg-white border-2 border-gray-200 text-gray-700 px-10 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Play className="h-6 w-6" />
              <span>Watch Video</span>
            </button>
          </div>
        </div>

        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-24 fill-white"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="reveal-section py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Amazing Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our growing community of learners and achievers
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-display font-black text-gray-800 mb-3">
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="text-gray-600 font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="reveal-section py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EduVerse</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience education reimagined with cutting-edge technology, expert guidance, 
              and endless opportunities for personal and professional growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card group p-8 ${feature.bgColor} rounded-3xl border border-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="reveal-section py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-white">
            Ready to Start Your Amazing <br />
            <span className="text-yellow-300">Journey</span>?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join thousands of students who have transformed their lives through our 
            innovative educational programs and supportive community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="interactive-btn inline-flex items-center space-x-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
            <Link
              to="/events"
              className="interactive-btn inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <Calendar className="h-6 w-6" />
              <span>View Events</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
