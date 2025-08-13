import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  Star,
  Trophy,
  BookOpen,
  Users,
  Sparkles,
  ChevronDown,
  Award,
  Target,
  Zap,
  Globe,
  Rocket,
  GraduationCap,
  Heart,
  TrendingUp,
  Shield,
  Clock,
  MapPin
} from "lucide-react";
import { useSmoothScroll } from "../components/SmoothScrollProvider";
import { HeroThreeBackground } from "../components/ThreeBackground";
import heroData from "../data/hero.json";
import heroSliderData from "../data/heroSlider.json";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80",
    alt: "Students collaborating in modern classroom",
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Advanced science laboratory",
  },
  {
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2322&q=80",
    alt: "Modern campus facilities",
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80",
    alt: "Beautiful campus architecture",
  },
];

const mobileFloatingCards = [
  {
    icon: BookOpen,
    title: "50+",
    subtitle: "Courses",
    color: "from-blue-500 to-cyan-500",
    delay: 0,
  },
  {
    icon: Users,
    title: "Expert",
    subtitle: "Teachers",
    color: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    icon: Trophy,
    title: "98%",
    subtitle: "Success",
    color: "from-orange-500 to-red-500",
    delay: 0.4,
  },
  {
    icon: Award,
    title: "15+",
    subtitle: "Years",
    color: "from-green-500 to-emerald-500",
    delay: 0.6,
  },
];

const typewriterTexts = [
  "Excellence in Education",
  "Innovative Learning",
  "Future Leaders",
  "Academic Success",
];

const achievementBadges = [
  { icon: Star, text: "Top Rated", color: "from-yellow-400 to-orange-500" },
  { icon: Shield, text: "Certified", color: "from-blue-400 to-purple-500" },
  { icon: TrendingUp, text: "Growing", color: "from-green-400 to-emerald-500" },
];

export default function EnhancedHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollTo } = useSmoothScroll();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced main hero animations with mobile optimization
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states with responsive considerations
      gsap.set([textContainerRef.current, imageContainerRef.current], {
        opacity: 0,
      });

      gsap.set(".hero-title span", { y: "120%", opacity: 0 });
      gsap.set(".hero-subtitle", { y: isMobile ? 40 : 60, opacity: 0 });
      gsap.set(".hero-description", { y: isMobile ? 30 : 40, opacity: 0 });
      gsap.set(".hero-buttons", { y: isMobile ? 30 : 50, opacity: 0, scale: 0.9 });
      gsap.set(".floating-card", { scale: 0, opacity: 0, rotation: -180 });
      gsap.set(".mobile-floating-card", { scale: 0, opacity: 0, y: 50 });
      gsap.set(".stat-item", { scale: 0, opacity: 0 });
      gsap.set(".hero-image", { scale: 0.8, opacity: 0, rotationY: 45 });
      gsap.set(".achievement-badge", { scale: 0, opacity: 0, rotation: 180 });

      // Create main timeline with mobile-optimized timing
      const mainTl = gsap.timeline({ delay: 0.5 });

      // Text container entrance
      mainTl.to(textContainerRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      // Title animation with enhanced mobile stagger
      mainTl.to(
        ".hero-title span",
        {
          y: "0%",
          opacity: 1,
          duration: isMobile ? 0.6 : 0.8,
          stagger: isMobile ? 0.05 : 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );

      // Achievement badges (mobile-specific)
      if (isMobile) {
        mainTl.to(
          ".achievement-badge",
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        );
      }

      // Subtitle and description with mobile timing
      mainTl
        .to(
          ".hero-subtitle",
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.5 : 0.6,
            ease: "power3.out",
          },
          isMobile ? "-=0.3" : "-=0.4",
        )
        .to(
          ".hero-description",
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.5 : 0.6,
            ease: "power3.out",
          },
          "-=0.2",
        );

      // CTA buttons with mobile responsiveness
      mainTl.to(
        ".hero-buttons",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.6 : 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );

      // Image container
      mainTl.to(
        imageContainerRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.8",
      );

      // Hero image
      mainTl.to(
        ".hero-image",
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // Mobile floating cards (shown only on mobile)
      if (isMobile) {
        mainTl.to(
          ".mobile-floating-card",
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.6",
        );
      } else {
        // Desktop floating cards
        mainTl.to(
          ".floating-card",
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        );
      }

      // Stats with responsive timing
      mainTl.to(
        ".stat-item",
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: isMobile ? 0.05 : 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4",
      );

      // Floating elements animation (reduced on mobile)
      gsap.to(".floating-element", {
        y: isMobile ? -10 : -20,
        duration: isMobile ? 2 : 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Enhanced magnetic effects for desktop only
      if (!isMobile) {
        const magneticElements = document.querySelectorAll(".magnetic");
        magneticElements.forEach((element) => {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.15;
            const deltaY = (e.clientY - centerY) * 0.15;

            gsap.to(element, {
              x: deltaX,
              y: deltaY,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(element, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)",
            });
          };

          element.addEventListener("mousemove", handleMouseMove);
          element.addEventListener("mouseleave", handleMouseLeave);
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Enhanced Typewriter effect with mobile optimization
  useEffect(() => {
    if (!typewriterRef.current) return;

    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typewriterEffect = () => {
      const currentText = typewriterTexts[currentTextIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      if (typewriterRef.current) {
        typewriterRef.current.textContent = currentText.substring(0, charIndex);
        
        const cursor = typewriterRef.current.nextElementSibling as HTMLElement;
        if (cursor && cursor.classList.contains('typewriter-cursor')) {
          cursor.style.opacity = '1';
        }
      }

      let timeout = isDeleting ? (isMobile ? 30 : 50) : (isMobile ? 80 : 120);

      if (!isDeleting && charIndex === currentText.length) {
        timeout = isMobile ? 2000 : 3000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
        timeout = isMobile ? 500 : 800;
      }

      timeoutId = setTimeout(typewriterEffect, timeout);
    };

    const startTypewriter = setTimeout(typewriterEffect, isMobile ? 1500 : 2000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(startTypewriter);
    };
  }, [isMobile]);

  // Image transition effect
  useEffect(() => {
    const images = document.querySelectorAll(".hero-image-slide");

    gsap.to(images, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.to(images[currentImageIndex], {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });
  }, [currentImageIndex]);

  const scrollToNextSection = () => {
    scrollTo("#school-cards");
  };

  return (
    <section
      ref={heroRef}
      data-section="hero"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Three.js Particle Background - reduced on mobile for performance */}
        {!isMobile && <HeroThreeBackground />}

        {/* Gradient overlay with mobile optimization */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/60 to-pink-900/40"></div>

        {/* Floating background elements with responsive sizing */}
        <div
          ref={floatingElementsRef}
          className="absolute inset-0 pointer-events-none"
        >
          <div className={`floating-element absolute top-20 left-20 ${isMobile ? 'w-16 h-16' : 'w-32 h-32'} bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl`}></div>
          <div className={`floating-element absolute top-40 right-32 ${isMobile ? 'w-12 h-12' : 'w-24 h-24'} bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-lg`}></div>
          <div className={`floating-element absolute bottom-40 left-32 ${isMobile ? 'w-20 h-20' : 'w-40 h-40'} bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl`}></div>
          <div className={`floating-element absolute bottom-60 right-40 ${isMobile ? 'w-8 h-8' : 'w-16 h-16'} bg-gradient-to-br from-green-400/25 to-emerald-400/25 rounded-full blur-md`}></div>

          {/* Geometric shapes - simplified for mobile */}
          <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-blue-400/30 to-transparent rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1 h-24 bg-gradient-to-b from-purple-400/40 to-transparent -rotate-45"></div>
        </div>

        {/* Particle effect - reduced count on mobile */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: isMobile ? 20 : 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20 sm:py-24 lg:py-16">
          {/* Left Content - Enhanced Mobile Layout */}
          <div
            ref={textContainerRef}
            className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Enhanced Badge with Mobile Optimization */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-white/90 text-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="font-medium">
                  Premier Education
                </span>
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              </div>
              
              {/* Mobile Achievement Badges */}
              {isMobile && (
                <div className="flex gap-2">
                  {achievementBadges.map((badge, index) => (
                    <div
                      key={index}
                      className={`achievement-badge inline-flex items-center space-x-1 bg-gradient-to-r ${badge.color} rounded-full px-3 py-1.5 text-white text-xs font-medium shadow-lg`}
                    >
                      <badge.icon className="w-3 h-3" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Main Title with Mobile Responsive Text */}
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white">
              <span className="inline-block overflow-hidden">
                <span className="inline-block">Shape</span>
              </span>{" "}
              <span className="inline-block overflow-hidden">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Your
                </span>
              </span>
              <br />
              <span className="inline-block overflow-hidden">
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
                  Future
                </span>
              </span>{" "}
              <span className="inline-block overflow-hidden">
                <span className="inline-block">with</span>
              </span>
            </h1>

            {/* Enhanced Typewriter Subtitle */}
            <div className="hero-subtitle">
              <span
                ref={typewriterRef}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
              >
                Excellence in Education
              </span>
              <span className="typewriter-cursor animate-pulse text-cyan-400 text-xl sm:text-2xl md:text-3xl">|</span>
            </div>

            {/* Enhanced Description with Mobile Optimization */}
            <p className="hero-description text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-4 lg:px-0">
              Experience world-class education with innovative teaching methods,
              expert faculty, and cutting-edge facilities that prepare you for
              tomorrow's challenges.
            </p>

            {/* Enhanced Action Buttons with Mobile-First Design */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start px-2 sm:px-4 lg:px-0">
              <Link
                to="/contact"
                className={`${!isMobile ? 'magnetic' : ''} group relative inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden w-full sm:w-auto`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Start Your Journey</span>
                <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl blur-xl transition-opacity duration-300"></div>
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className={`${!isMobile ? 'magnetic' : ''} group relative inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto`}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                <span>Watch Story</span>
              </button>
            </div>

            {/* Enhanced Stats with Mobile Layout */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-6 sm:pt-8 px-2 sm:px-4 lg:px-0"
            >
              {[
                { value: "15+", label: "Years Experience", icon: Target },
                { value: "2.5K+", label: "Happy Students", icon: Users },
                { value: "50+", label: "Expert Teachers", icon: BookOpen },
                { value: "98%", label: "Success Rate", icon: Trophy },
              ].map((stat, index) => (
                <div key={index} className="stat-item text-center group">
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Mobile Floating Cards */}
            {isMobile && (
              <div className="grid grid-cols-2 gap-3 mt-6">
                {mobileFloatingCards.map((card, index) => (
                  <div
                    key={index}
                    className="mobile-floating-card bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg"
                    style={{ animationDelay: `${card.delay}s` }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center shadow-lg`}>
                        <card.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{card.title}</div>
                        <div className="text-xs text-gray-600">{card.subtitle}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Content - Enhanced Image Showcase with Mobile Optimization */}
          <div ref={imageContainerRef} className="relative order-1 lg:order-2">
            {/* Main Image Container */}
            <div className="relative z-10">
              <div className="hero-image relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform perspective-1000">
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className={`hero-image-slide absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Enhanced image indicators */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white scale-125 shadow-lg shadow-white/50"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>

                {/* Mobile info overlay */}
                {isMobile && (
                  <div className="absolute top-3 left-3 right-3">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center justify-between text-white text-xs">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>EduVerse Campus</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Live View</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Floating Cards */}
              {!isMobile && (
                <div className="hidden sm:block">
                  {mobileFloatingCards.map((card, index) => (
                    <div
                      key={index}
                      className={`floating-card absolute bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                        index === 0
                          ? "sm:-top-4 sm:-left-4 lg:-top-6 lg:-left-6"
                          : index === 1
                            ? "sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6"
                            : index === 2
                              ? "sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6"
                              : "sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6"
                      }`}
                      style={{ animationDelay: `${card.delay}s` }}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${card.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`}>
                          <card.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                            {card.title}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {card.subtitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl sm:rounded-3xl transform rotate-3 scale-105 -z-10 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer"
      >
        <div className="flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors duration-300">
          <span className="text-xs sm:text-sm font-medium">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-white/60 transition-colors duration-300">
            <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
          </div>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
        </div>
      </button>

      {/* Enhanced Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full aspect-video shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              ×
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="School Story Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
