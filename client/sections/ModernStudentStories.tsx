import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Quote, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Play,
  Heart,
  MessageCircle,
  Share2,
  Award,
  GraduationCap,
  Briefcase,
  MapPin
} from "lucide-react";

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
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    story: "EduVerse Academy transformed my life completely. The innovative teaching methods and supportive environment helped me discover my passion for artificial intelligence. The personalized mentorship program connected me with industry experts who guided my journey.",
    achievement: "Now working as AI Engineer at Google",
    rating: 5,
    videoUrl: "https://example.com/video1",
    tags: ["AI", "Machine Learning", "Research"],
    stats: {
      gpa: "3.98",
      projects: 15,
      awards: 8
    }
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Student Leader",
    course: "Biomedical Engineering",
    year: "Class of 2022",
    location: "Boston, MA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    story: "The hands-on laboratory experience at EduVerse was incredible. Working on real biomedical projects and collaborating with professors on cutting-edge research prepared me for my career in medical device innovation.",
    achievement: "Founded a successful medical startup",
    rating: 5,
    videoUrl: "https://example.com/video2",
    tags: ["Biomedical", "Innovation", "Startup"],
    stats: {
      gpa: "3.89",
      projects: 12,
      awards: 5
    }
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Arts Scholar",
    course: "Digital Media Arts",
    year: "Class of 2023",
    location: "Los Angeles, CA",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    story: "EduVerse's creative arts program nurtured my artistic vision while teaching me valuable technical skills. The collaborative projects and industry connections helped me build a portfolio that landed me my dream job.",
    achievement: "Creative Director at major film studio",
    rating: 5,
    videoUrl: "https://example.com/video3",
    tags: ["Digital Arts", "Film", "Creative"],
    stats: {
      gpa: "3.92",
      projects: 20,
      awards: 6
    }
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Research Assistant",
    course: "Environmental Science",
    year: "Class of 2022",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    story: "The environmental science program at EduVerse opened my eyes to the urgent need for sustainable solutions. My research project on renewable energy systems led to a patent and international recognition.",
    achievement: "Leading climate research at NASA",
    rating: 5,
    videoUrl: "https://example.com/video4",
    tags: ["Environment", "Research", "Sustainability"],
    stats: {
      gpa: "3.95",
      projects: 8,
      awards: 10
    }
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
        }
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
        }
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
    const prev = (currentIndex - 1 + studentStories.length) % studentStories.length;
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
            <span className="text-gray-700 font-semibold">Student Success Stories</span>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            Voices of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Success
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from our incredible students who have transformed their dreams into 
            reality through dedication, hard work, and the support of our academic community.
          </p>
        </div>
        
        {/* Main Story Showcase */}
        <div className="relative mb-16">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Story Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-8">
                  {/* Student Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={currentStory.avatar}
                        alt={currentStory.name}
                        className="w-16 h-16 rounded-full object-cover shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <GraduationCap className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {currentStory.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {currentStory.role}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{currentStory.course}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{currentStory.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < currentStory.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">
                      {currentStory.rating}.0
                    </span>
                  </div>
                  
                  {/* Story */}
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 relative">
                    <Quote className="absolute -top-4 -left-4 w-8 h-8 text-blue-300 opacity-50" />
                    {currentStory.story}
                  </blockquote>
                  
                  {/* Achievement */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-600 font-semibold text-sm">
                        Current Achievement
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {currentStory.achievement}
                    </p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentStory.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">
                        {currentStory.stats.gpa}
                      </div>
                      <div className="text-sm text-gray-600">GPA</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 stat-counter" data-target={currentStory.stats.projects}>
                        0
                      </div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600 stat-counter" data-target={currentStory.stats.awards}>
                        0
                      </div>
                      <div className="text-sm text-gray-600">Awards</div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    {currentStory.videoUrl && (
                      <button
                        onClick={() => setSelectedVideo(currentStory.videoUrl || null)}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Play className="w-4 h-4" />
                        <span>Watch Video</span>
                      </button>
                    )}
                    
                    <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    
                    <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Story Image */}
              <div className="relative">
                <img
                  src={currentStory.image}
                  alt={`${currentStory.name}'s story`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Year badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  <span className="text-gray-800 font-semibold text-sm">
                    {currentStory.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex space-x-2">
              {studentStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-500 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white transition-all duration-200"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* All Stories Grid */}
        <div className="stories-carousel">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            More Success Stories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentStories.map((story, index) => (
              <div
                key={story.id}
                className="story-card bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {story.name}
                    </h4>
                    <p className="text-blue-600 text-xs">
                      {story.course}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {story.story}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < story.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-blue-600 text-xs font-medium">
                    Read More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
