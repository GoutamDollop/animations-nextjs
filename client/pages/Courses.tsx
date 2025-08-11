import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Award,
  Filter,
  ChevronDown,
  ArrowRight,
  Calendar,
  DollarSign,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Courses() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".courses-header",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      // Course cards animation
      gsap.utils.toArray(".course-card").forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          },
        );
      });

      // Filter animation
      gsap.fromTo(
        ".filter-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".filter-section",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    "All",
    "STEM",
    "Arts",
    "Languages",
    "Sports",
    "Technology",
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      category: "STEM",
      description:
        "Comprehensive program covering calculus, statistics, and advanced mathematical concepts.",
      duration: "12 months",
      students: 45,
      rating: 4.9,
      price: "$1,200",
      image:
        "https://images.pexels.com/photos/6929160/pexels-photo-6929160.jpeg",
      instructor: "Dr. Sarah Johnson",
      level: "Advanced",
    },
    {
      id: 2,
      title: "Computer Science & AI",
      category: "Technology",
      description:
        "Learn programming, algorithms, and artificial intelligence fundamentals.",
      duration: "18 months",
      students: 38,
      rating: 4.8,
      price: "$1,800",
      image:
        "https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg",
      instructor: "Prof. Michael Chen",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Creative Writing & Literature",
      category: "Arts",
      description:
        "Express yourself through various forms of creative writing and literary analysis.",
      duration: "10 months",
      students: 28,
      rating: 4.7,
      price: "$900",
      image:
        "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg",
      instructor: "Dr. Emily Rodriguez",
      level: "Beginner",
    },
    {
      id: 4,
      title: "Physics & Engineering",
      category: "STEM",
      description:
        "Explore the fundamental laws of physics and their engineering applications.",
      duration: "15 months",
      students: 32,
      rating: 4.8,
      price: "$1,500",
      image:
        "https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg",
      instructor: "Prof. David Kim",
      level: "Advanced",
    },
    {
      id: 5,
      title: "Spanish Language Immersion",
      category: "Languages",
      description:
        "Comprehensive Spanish language program with cultural immersion activities.",
      duration: "8 months",
      students: 25,
      rating: 4.6,
      price: "$800",
      image:
        "https://images.pexels.com/photos/5274601/pexels-photo-5274601.jpeg",
      instructor: "Prof. Maria Garcia",
      level: "Beginner",
    },
    {
      id: 6,
      title: "Digital Art & Design",
      category: "Arts",
      description:
        "Master digital art techniques using industry-standard software and tools.",
      duration: "12 months",
      students: 30,
      rating: 4.7,
      price: "$1,100",
      image:
        "https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg",
      instructor: "Prof. Alex Thompson",
      level: "Intermediate",
    },
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 md:w-32 h-20 md:h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-16 md:w-24 h-16 md:h-24 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/3 w-12 md:w-16 h-12 md:h-16 bg-blue-300 rounded-full animate-ping"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <div className="courses-header max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 md:mb-6">
                Our Courses & Programs 📚
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2">
                Discover world-class education programs designed to unlock your potential and prepare you for future success.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="filter-section py-12 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Explore Our Programs
                </h2>
                <p className="text-gray-600">
                  {filteredCourses.length} course
                  {filteredCourses.length !== 1 ? "s" : ""} available
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="course-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Course Image */}
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(course.level)}`}
                      >
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-bold text-gray-800">
                        {course.price}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                        {course.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-gray-700">
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {course.students} students
                        </span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="font-semibold text-gray-800">
                          {course.instructor}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 md:space-x-3">
                      <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                        Enroll Now
                      </button>
                      <button className="px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl hover:border-orange-300 transition-colors duration-300">
                        <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
                Ready to Start Learning? 🚀
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed px-4">
                Join thousands of students who are already transforming their futures with our world-class education programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-white text-orange-600 px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                  <span>Apply for Admission</span>
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-transparent border-2 md:border-3 border-white text-white px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl hover:bg-white hover:text-orange-600 transition-all duration-300">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Schedule Campus Tour</span>
                </button>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
