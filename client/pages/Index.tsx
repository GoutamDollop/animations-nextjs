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
  Smile,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import AnimatedCounter from "../components/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced hero animations with image
      const tl = gsap.timeline({ delay: 0.5 });

      // Hero image animation
      tl.fromTo(
        heroImageRef.current,
        { 
          scale: 0.8, 
          opacity: 0, 
          rotationY: -45,
          transformOrigin: "center center"
        },
        { 
          scale: 1, 
          opacity: 1, 
          rotationY: 0,
          duration: 1.5, 
          ease: "elastic.out(1, 0.5)" 
        }
      );

      // Floating elements animation
      gsap.set(".floating-element", { scale: 0, rotation: 0 });
      
      tl.to(".floating-element", {
        scale: 1,
        rotation: 360,
        duration: 2,
        stagger: 0.3,
        ease: "elastic.out(1, 0.3)"
      }, "-=1");

      // Enhanced hero text animations
      tl.fromTo(
        ".hero-word",
        { 
          y: 120, 
          opacity: 0, 
          rotationX: -90,
          transformOrigin: "50% 50% -100px"
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.5, 
          stagger: 0.2, 
          ease: "back.out(1.4)" 
        },
        "-=1"
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 80, opacity: 0, scale: 0.7 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(
        ".cta-button",
        { y: 50, opacity: 0, scale: 0.8, rotationZ: -5 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          rotationZ: 0,
          duration: 0.8, 
          stagger: 0.15, 
          ease: "back.out(2)" 
        },
        "-=0.3"
      );

      // Continuous floating animations for decorative elements
      gsap.to(".floating-element", {
        y: -40,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.7
      });

      // Enhanced section reveals
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.fromTo(
          section.children,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
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

      // Enhanced stats cards animation
      gsap.utils.toArray(".stat-card").forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { 
            scale: 0.5, 
            opacity: 0,
            rotationY: 180,
            y: 100
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            y: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.4)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );

        // Continuous floating for stats
        gsap.to(card, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.5
        });
      });

      // Enhanced feature cards
      gsap.utils.toArray(".feature-card").forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { 
            y: 120, 
            opacity: 0, 
            rotationX: -45,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 1.3,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.15
          }
        );
      });

      // Enhanced button interactions
      document.querySelectorAll(".interactive-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, { 
            scale: 1.08, 
            rotationZ: 3,
            y: -5,
            duration: 0.4, 
            ease: "back.out(1.7)" 
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { 
            scale: 1, 
            rotationZ: 0,
            y: 0,
            duration: 0.4, 
            ease: "power2.out" 
          });
        });
      });

      // Image hover effects
      document.querySelectorAll(".hover-image").forEach((img) => {
        img.addEventListener("mouseenter", () => {
          gsap.to(img, { 
            scale: 1.05, 
            rotationZ: 2,
            duration: 0.5, 
            ease: "power2.out" 
          });
        });
        img.addEventListener("mouseleave", () => {
          gsap.to(img, { 
            scale: 1, 
            rotationZ: 0,
            duration: 0.5, 
            ease: "power2.out" 
          });
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: 5000, label: "Happy Students", icon: Smile, suffix: "+", color: "from-pink-400 to-rose-500" },
    { number: 200, label: "Expert Teachers", icon: GraduationCap, suffix: "+", color: "from-blue-400 to-indigo-500" },
    { number: 50, label: "Amazing Programs", icon: BookOpen, suffix: "+", color: "from-green-400 to-emerald-500" },
    { number: 98, label: "Success Rate", icon: TrendingUp, suffix: "%", color: "from-yellow-400 to-orange-500" },
  ];

  const features = [
    {
      title: "Interactive Learning",
      description: "Engaging digital classrooms with cutting-edge technology and VR experiences",
      icon: Lightbulb,
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      image: "https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg"
    },
    {
      title: "Expert Faculty",
      description: "Learn from industry professionals and experienced educators worldwide",
      icon: Users,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      image: "https://images.pexels.com/photos/6990292/pexels-photo-6990292.jpeg"
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art labs, libraries, and recreational spaces for holistic development",
      icon: Rocket,
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      image: "https://images.pexels.com/photos/6084269/pexels-photo-6084269.jpeg"
    },
    {
      title: "Global Recognition",
      description: "Internationally accredited programs with worldwide university partnerships",
      icon: Globe,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      image: "https://images.pexels.com/photos/12442773/pexels-photo-12442773.jpeg"
    },
    {
      title: "Career Excellence",
      description: "100% placement assistance and strong industry connections for bright futures",
      icon: Target,
      color: "from-red-400 to-rose-500",
      bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
      image: "https://images.pexels.com/photos/2801567/pexels-photo-2801567.jpeg"
    },
    {
      title: "Safe Environment",
      description: "Secure campus with 24/7 safety, mental health, and well-being support",
      icon: Shield,
      color: "from-indigo-400 to-blue-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
      image: "https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg"
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen overflow-hidden">
      {/* Enhanced Hero Section with Images */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <AnimatedBackground />
        
        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-80 shadow-xl"></div>
          <div className="floating-element absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-70 shadow-lg"></div>
          <div className="floating-element absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60 shadow-xl"></div>
          <div className="floating-element absolute bottom-20 right-32 w-18 h-18 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-80 shadow-lg"></div>
          <div className="floating-element absolute top-1/2 left-32 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-90 shadow-md"></div>
          <div className="floating-element absolute top-1/3 right-40 w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-70 shadow-lg"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="space-y-6 mb-8">
                <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 text-orange-600 font-bold text-sm shadow-lg border border-orange-200">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>🎓 Welcome to EduVerse Academy</span>
                </div>
                
                <div ref={titleRef} className="space-y-3">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-tight">
                    <div className="hero-word inline-block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                      Shape
                    </div>
                    <br />
                    <div className="hero-word inline-block bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                      Your
                    </div>
                    <br />
                    <div className="hero-word inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                      Future
                    </div>
                  </h1>
                </div>
              </div>
              
              <p 
                ref={subtitleRef}
                className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium"
              >
                Join thousands of students in their journey to excellence with our 
                innovative learning experiences and world-class education! 🌟
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link
                  to="/courses"
                  className="cta-button interactive-btn inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
                
                <button className="cta-button interactive-btn inline-flex items-center justify-center space-x-3 bg-white border-2 border-orange-300 text-orange-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Play className="h-6 w-6" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div 
                ref={heroImageRef}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl blur-2xl opacity-30 scale-110"></div>
                <img
                  src="https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg"
                  alt="Happy students learning in classroom"
                  className="hover-image relative w-full max-w-lg rounded-3xl shadow-2xl border-4 border-white transform"
                />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                  <Heart className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20 md:h-32 fill-white"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="reveal-section py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 opacity-80"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-black mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Our Amazing Journey
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our growing community of learners and achievers! 🚀
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card text-center p-8 bg-white rounded-3xl shadow-2xl border-2 border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3"
              >
                <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${stat.color} rounded-3xl mb-6 shadow-xl`}>
                  <stat.icon className="h-12 w-12 text-white" />
                </div>
                <div className="text-5xl lg:text-6xl font-display font-black text-gray-800 mb-4">
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix}
                    duration={3}
                  />
                </div>
                <div className="text-gray-600 font-bold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with Images */}
      <section className="reveal-section py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EduVerse</span>? 🎯
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience education reimagined with cutting-edge technology, expert guidance, 
              and endless opportunities for personal and professional growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card group p-8 ${feature.bgColor} rounded-3xl border-2 border-white shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4`}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
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

      {/* Enhanced CTA Section with Floating Shapes */}
      <section className="reveal-section py-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-32 h-32 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-blue-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-purple-300 rounded-full animate-bounce"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-8 text-white">
              Ready to Start Your Amazing <br />
              <span className="text-yellow-300">Journey</span>? 🚀
            </h2>
            <p className="text-2xl md:text-3xl text-orange-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of students who have transformed their lives through our 
              innovative educational programs and supportive community! ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link
                to="/contact"
                className="interactive-btn inline-flex items-center justify-center space-x-3 bg-white text-orange-600 px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span>Get Started Today</span>
                <ArrowRight className="h-7 w-7" />
              </Link>
              <Link
                to="/events"
                className="interactive-btn inline-flex items-center justify-center space-x-3 bg-transparent border-3 border-white text-white px-12 py-6 rounded-2xl font-black text-2xl hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                <Calendar className="h-7 w-7" />
                <span>View Events</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
