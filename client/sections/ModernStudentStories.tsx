import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Quote,
  Star,
  ArrowLeft,
  ArrowRight,
  Play,
  Heart,
  MessageCircle,
  MessageSquare,
  Share2,
  Award,
  GraduationCap,
  Briefcase,
  MapPin,
  Sparkles,
  TrendingUp,
  Crown,
  Zap,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import studentsData from "../data/students.json";

gsap.registerPlugin(ScrollTrigger);

interface StudentStory {
  id: number;
  name: string;
  role: string;
  course: string;
  year: string;
  location: string;
  avatar: string;
  image: string;
  story: string;
  achievement: string;
  rating: number;
  videoUrl?: string;
  tags: string[];
  stats: {
    gpa: string;
    projects: number;
    awards: number;
  };
}

const studentStories: StudentStory[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Valedictorian 2023",
    course: "Computer Science",
    year: "Class of 2023",
    location: "San Francisco, CA",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b977?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    story:
      "EduVerse Academy transformed my life completely. The innovative teaching methods and supportive environment helped me discover my passion for artificial intelligence. The personalized mentorship program connected me with industry experts who guided my journey.",
    achievement: "Now working as AI Engineer at Google",
    rating: 5,
    videoUrl: "https://example.com/video1",
    tags: ["AI", "Machine Learning", "Research"],
    stats: {
      gpa: "3.98",
      projects: 15,
      awards: 8,
    },
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Student Leader",
    course: "Biomedical Engineering",
    year: "Class of 2022",
    location: "Boston, MA",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    story:
      "The hands-on laboratory experience at EduVerse was incredible. Working on real biomedical projects and collaborating with professors on cutting-edge research prepared me for my career in medical device innovation.",
    achievement: "Founded a successful medical startup",
    rating: 5,
    videoUrl: "https://example.com/video2",
    tags: ["Biomedical", "Innovation", "Startup"],
    stats: {
      gpa: "3.89",
      projects: 12,
      awards: 5,
    },
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Arts Scholar",
    course: "Digital Media Arts",
    year: "Class of 2023",
    location: "Los Angeles, CA",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    story:
      "EduVerse's creative arts program nurtured my artistic vision while teaching me valuable technical skills. The collaborative projects and industry connections helped me build a portfolio that landed me my dream job.",
    achievement: "Creative Director at major film studio",
    rating: 5,
    videoUrl: "https://example.com/video3",
    tags: ["Digital Arts", "Film", "Creative"],
    stats: {
      gpa: "3.92",
      projects: 20,
      awards: 6,
    },
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Research Assistant",
    course: "Environmental Science",
    year: "Class of 2022",
    location: "Seattle, WA",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    story:
      "The environmental science program at EduVerse opened my eyes to the urgent need for sustainable solutions. My research project on renewable energy systems led to a patent and international recognition.",
    achievement: "Leading climate research at NASA",
    rating: 5,
    videoUrl: "https://example.com/video4",
    tags: ["Environment", "Research", "Sustainability"],
    stats: {
      gpa: "3.95",
      projects: 8,
      awards: 10,
    },
  },
];

export default function ModernStudentStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % studentStories.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        ".stories-header",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stories-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards animation
      gsap.fromTo(
        ".story-card",
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stories-carousel",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating elements
      gsap.to(".floating-quote", {
        y: -15,
        rotation: 5,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Stats counter animation
      const counters = document.querySelectorAll(".stat-counter");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        const obj = { value: 0 };

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = Math.round(obj.value).toString();
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Carousel navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);

    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        x: `-${index * 100}%`,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % studentStories.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev =
      (currentIndex - 1 + studentStories.length) % studentStories.length;
    goToSlide(prev);
  };

  const currentStory = studentStories[currentIndex];

  return (
    <section
      ref={sectionRef}
      data-section="stories"
      className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="floating-quote absolute top-20 left-20">
          <Quote className="w-24 h-24 text-blue-300 transform rotate-12" />
        </div>
        <div className="floating-quote absolute bottom-20 right-20">
          <Quote className="w-32 h-32 text-purple-300 transform -rotate-12" />
        </div>
        <div className="floating-quote absolute top-1/2 left-1/4">
          <Quote className="w-16 h-16 text-pink-300 transform rotate-45" />
        </div>

        {/* Geometric shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="stories-header text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-gray-700 font-semibold">
              Student Success Stories
            </span>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Voices of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Success
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our incredible students who have transformed their dreams
            into reality through dedication, hard work, and the support of our
            academic community.
          </p>
        </div>

        {/* Enhanced Stories Grid with Motion */}
        <motion.div 
          className="stories-carousel mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Featured Stories Carousel */}
          <div className="relative mb-12">
            <div className="overflow-hidden rounded-3xl">
              <motion.div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {studentsData.students.map((student, index) => (
                  <motion.div 
                    key={student.id}
                    className="w-full flex-shrink-0 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: index === currentIndex ? 1 : 0.7, 
                      scale: index === currentIndex ? 1 : 0.95 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12">
                        {/* Student Avatar and Info */}
                        <div className="text-center lg:text-left">
                          <div className="relative inline-block mb-6">
                            <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                              <img
                                src={student.image}
                                alt={student.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                            <motion.div 
                              className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 shadow-xl"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Crown className="w-6 h-6 text-white" />
                            </motion.div>
                          </div>
                          
                          <div className="space-y-3">
                            <h3 className="text-2xl lg:text-3xl font-black text-gray-900">{student.name}</h3>
                            <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                              {student.grade}
                            </p>
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
                              <Award className="w-4 h-4 text-green-600" />
                              <span className="text-green-700 font-semibold text-sm">{student.achievement}</span>
                            </div>
                          </div>
                        </div>

                        {/* Story Content */}
                        <div className="lg:col-span-2 space-y-6">
                          {/* Quote */}
                          <div className="relative">
                            <motion.div
                              className="absolute -top-4 -left-4 text-6xl text-blue-200 opacity-30"
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 4, repeat: Infinity }}
                            >
                              <Quote className="w-12 h-12" />
                            </motion.div>
                            <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed font-medium italic relative z-10">
                              {student.story}
                            </blockquote>
                          </div>

                          {/* Interactive Elements */}
                          <div className="flex flex-wrap items-center gap-4">
                            <motion.button 
                              className="group flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="w-4 h-4" />
                              <span>Watch Story</span>
                            </motion.button>
                            
                            <motion.button 
                              className="group flex items-center space-x-2 bg-white/60 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl font-semibold border border-white/40 hover:bg-white/80 transition-all duration-300"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>Connect</span>
                            </motion.button>
                            
                            <motion.button 
                              className="group flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart className="w-5 h-5" />
                              <span className="font-semibold">Inspire</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Enhanced Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-8">
              <motion.button
                onClick={prevSlide}
                className="group relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              {/* Dots with enhanced styling */}
              <div className="flex space-x-3">
                {studentsData.students.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    {index === currentIndex && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                className="group relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Simplified Call-to-Action Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-lg border border-white/30 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-4 py-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">Inspiring Journeys</span>
            </motion.div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Want to Read More 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Success Stories?
              </span>
            </h3>
            
            <p className="text-gray-600 mb-6">
              Discover how EduVerse Academy has transformed the lives of hundreds of students worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/testimonials"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>View All Stories</span>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:border-purple-300 transition-all duration-300"
                >
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Share Your Story</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full aspect-video shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              ×
            </button>
            <iframe
              src={selectedVideo}
              title="Student Story Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
