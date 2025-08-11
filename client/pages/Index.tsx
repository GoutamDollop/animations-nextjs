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
  Quote,
  MapPin,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import AnimatedCounter from "../components/AnimatedCounter";
import HeroSlider from "../components/HeroSlider";
import TeacherCard from "../components/TeacherCard";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced stats animation with improved timing
      gsap.utils.toArray(".enhanced-stat-card").forEach((card: any, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });

        tl.fromTo(
          card,
          { 
            scale: 0.3, 
            opacity: 0,
            rotationY: 180,
            y: 150
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            y: 0,
            duration: 1.8,
            ease: "elastic.out(1, 0.3)",
            delay: index * 0.25
          }
        );

        // Continuous floating animation
        gsap.to(card, {
          y: -20,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.8
        });

        // Rotate icon
        gsap.to(card.querySelector('.stat-icon'), {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none"
        });
      });

      // Section reveals with improved animations
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.fromTo(
          section.children,
          { y: 120, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            stagger: 0.3,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Enhanced button interactions
      document.querySelectorAll(".enhanced-btn").forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, { 
            scale: 1.1, 
            rotationZ: 5,
            y: -8,
            duration: 0.4, 
            ease: "back.out(2)" 
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

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const enhancedStats = [
    { 
      number: 5000, 
      label: "Happy Students", 
      icon: Smile, 
      suffix: "+", 
      color: "from-pink-400 via-rose-400 to-red-500",
      bgColor: "from-pink-50 to-rose-50",
      description: "Achieving their dreams"
    },
    { 
      number: 200, 
      label: "Expert Teachers", 
      icon: GraduationCap, 
      suffix: "+", 
      color: "from-blue-400 via-indigo-400 to-purple-500",
      bgColor: "from-blue-50 to-indigo-50",
      description: "Passionate educators"
    },
    { 
      number: 50, 
      label: "Amazing Programs", 
      icon: BookOpen, 
      suffix: "+", 
      color: "from-green-400 via-emerald-400 to-teal-500",
      bgColor: "from-green-50 to-emerald-50",
      description: "Future-ready curricula"
    },
    { 
      number: 98, 
      label: "Success Rate", 
      icon: TrendingUp, 
      suffix: "%", 
      color: "from-yellow-400 via-orange-400 to-red-500",
      bgColor: "from-yellow-50 to-orange-50",
      description: "Outstanding results"
    },
  ];

  const teachers = [
    {
      name: "Dr. Sarah Johnson",
      position: "Principal & Mathematics Professor",
      image: "https://images.pexels.com/photos/6929160/pexels-photo-6929160.jpeg",
      experience: "15+ Years",
      education: "PhD in Mathematics Education, Harvard University",
      specialization: "Advanced Mathematics & STEM Education",
      email: "sarah.johnson@eduverse.edu",
      phone: "+1 (555) 123-4567",
      rating: 5,
      students: 500,
      description: "Dr. Sarah Johnson is our visionary principal with over 15 years of experience in mathematics education. She has revolutionized our STEM programs and mentored hundreds of students to achieve academic excellence.",
      achievements: [
        "Published 25+ research papers in mathematics education",
        "Recipient of National Teaching Excellence Award 2023",
        "Led the development of innovative STEM curriculum",
        "Mentored 50+ students into top universities"
      ]
    },
    {
      name: "Prof. Michael Chen",
      position: "Computer Science Department Head",
      image: "https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg",
      experience: "12+ Years",
      education: "PhD in Computer Science, MIT",
      specialization: "AI, Machine Learning & Programming",
      email: "michael.chen@eduverse.edu",
      phone: "+1 (555) 234-5678",
      rating: 5,
      students: 350,
      description: "Professor Michael Chen brings cutting-edge technology education to our students. His innovative teaching methods in AI and programming have inspired countless students to pursue careers in technology.",
      achievements: [
        "Former Google Senior Software Engineer",
        "Created award-winning programming bootcamp",
        "Published AI research in top-tier journals",
        "100% student placement rate in tech companies"
      ]
    }
  ];

  const studentStories = [
    {
      name: "Emma Rodriguez",
      grade: "Grade 12",
      image: "https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg",
      story: "EduVerse helped me discover my passion for science. The hands-on experiments and supportive teachers made learning so exciting!",
      achievement: "Science Fair Winner 2024"
    },
    {
      name: "Alex Thompson",
      grade: "Grade 10",
      image: "https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg",
      story: "The collaborative learning environment at EduVerse taught me teamwork and leadership skills that I'll carry forever.",
      achievement: "Student Council President"
    },
    {
      name: "Maya Patel",
      grade: "Grade 11",
      image: "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg",
      story: "Thanks to EduVerse's amazing art program, I've discovered my talent and will be studying Fine Arts at university!",
      achievement: "Art Scholarship Recipient"
    }
  ];

  return (
    <>
      <CustomCursor />
      <div ref={heroRef} className="min-h-screen overflow-hidden">
        {/* Enhanced Hero Section with Slider */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
          <AnimatedBackground />
          
          <div className="container mx-auto px-4 lg:px-8 z-10 relative">
            <HeroSlider />
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <Link
                to="/courses"
                className="enhanced-btn inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span>Explore Courses</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
              
              <button className="enhanced-btn inline-flex items-center justify-center space-x-3 bg-white border-2 border-orange-300 text-orange-600 px-12 py-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Play className="h-6 w-6" />
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          {/* Enhanced Wave Shape */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 md:h-32">
              <defs>
                <linearGradient id="hero-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path fill="url(#hero-wave)" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".8"></path>
              <path fill="url(#hero-wave)" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".6"></path>
              <path fill="url(#hero-wave)" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
            </svg>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section ref={statsRef} className="reveal-section py-32 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/50 to-pink-50/50"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-6xl md:text-7xl font-display font-black mb-8 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Our Success Story 🚀
              </h2>
              <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Every number tells a story of dreams fulfilled and futures transformed! ✨
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {enhancedStats.map((stat, index) => (
                <div
                  key={index}
                  className={`enhanced-stat-card text-center p-10 bg-gradient-to-br ${stat.bgColor} rounded-3xl shadow-2xl border-2 border-white hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6 hover:rotate-1`}
                >
                  <div className={`stat-icon inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br ${stat.color} rounded-3xl mb-8 shadow-xl`}>
                    <stat.icon className="h-14 w-14 text-white" />
                  </div>
                  <div className="text-6xl lg:text-7xl font-display font-black text-gray-800 mb-4">
                    <AnimatedCounter 
                      end={stat.number} 
                      suffix={stat.suffix}
                      duration={3}
                    />
                  </div>
                  <div className="text-gray-800 font-bold text-xl mb-2">
                    {stat.label}
                  </div>
                  <div className="text-gray-600 text-base">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Stories Section */}
        <section className="reveal-section py-32 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
                Student Success Stories 📚
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Hear from our amazing students about their incredible journey at EduVerse!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {studentStories.map((student, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1"
                >
                  <div className="text-center mb-6">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gradient-to-r from-orange-400 to-pink-400 shadow-xl object-cover"
                    />
                    <h3 className="text-2xl font-bold text-gray-800">{student.name}</h3>
                    <p className="text-orange-600 font-semibold">{student.grade}</p>
                  </div>
                  
                  <div className="relative mb-6">
                    <Quote className="h-8 w-8 text-orange-400 mb-4" />
                    <p className="text-gray-600 leading-relaxed text-lg italic">
                      "{student.story}"
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      <Award className="h-4 w-4" />
                      <span>{student.achievement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Teachers Section */}
        <section className="reveal-section py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-display font-black mb-6">
                Meet Our Amazing <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Teachers</span> 👨‍🏫👩‍🏫
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our passionate educators are dedicated to nurturing young minds and inspiring greatness!
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {teachers.map((teacher, index) => (
                <TeacherCard key={index} {...teacher} />
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Link
                to="/teachers"
                className="enhanced-btn inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span>Meet All Our Teachers</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="reveal-section py-32 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute bottom-32 right-32 w-32 h-32 bg-green-300 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-purple-300 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-pink-300 rounded-full animate-pulse"></div>
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-black mb-12 text-white leading-tight">
                Ready to Start Your Amazing 
                <br />
                <span className="text-yellow-300">Educational Journey</span>? 🎓
              </h2>
              <p className="text-2xl md:text-3xl text-orange-100 max-w-4xl mx-auto mb-16 leading-relaxed">
                Join thousands of students who have transformed their lives through our 
                innovative educational programs and supportive community! ✨🚀
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <Link
                  to="/contact"
                  className="enhanced-btn inline-flex items-center justify-center space-x-4 bg-white text-orange-600 px-16 py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <span>Apply Now - Transform Your Future!</span>
                  <ArrowRight className="h-8 w-8" />
                </Link>
                <Link
                  to="/events"
                  className="enhanced-btn inline-flex items-center justify-center space-x-4 bg-transparent border-4 border-white text-white px-16 py-8 rounded-3xl font-black text-2xl hover:bg-white hover:text-orange-600 transition-all duration-300"
                >
                  <Calendar className="h-8 w-8" />
                  <span>Upcoming Events</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
