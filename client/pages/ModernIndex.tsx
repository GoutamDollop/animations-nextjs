import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EnhancedHeroSection from "../sections/EnhancedHeroSection";
import SchoolImageCards from "../sections/SchoolImageCards";
import ModernStudentStories from "../sections/ModernStudentStories";
import StatsSection from "../components/StatsSection";
import TeacherCard from "../components/TeacherCard";
import teachersData from "../data/teachers.json";
import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpen, Award, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ModernIndex() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
      );

      // Scroll-triggered animations for various sections
      gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
        gsap.fromTo(
          element,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Parallax effects
      gsap.utils.toArray(".parallax-element").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Get featured teachers
  const featuredTeachers = teachersData.teachers.slice(0, 3);

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* School Image Cards Section */}
      <SchoolImageCards />

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-on-scroll">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Award className="w-5 h-5 text-blue-500" />
              <span className="text-blue-600 font-semibold">
                Our Achievements
              </span>
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              Excellence in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Numbers
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our commitment to academic excellence is reflected in these
              remarkable achievements.
            </p>
          </div>
          <StatsSection />
        </div>
      </section>

      {/* Student Stories Section */}
      <ModernStudentStories />

      {/* Featured Teachers Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 animate-on-scroll">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-purple-600 font-semibold">
                Meet Our Faculty
              </span>
              <BookOpen className="w-5 h-5 text-pink-500" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
              World-Class{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                Educators
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our passionate educators are dedicated to nurturing young minds
              and inspiring excellence in every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTeachers.map((teacher, index) => (
              <div
                key={teacher.id}
                className="animate-on-scroll transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <TeacherCard {...teacher} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/teachers"
              className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
            >
              <span>Meet All Our Teachers</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden animate-on-scroll">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="parallax-element absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
          <div className="parallax-element absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="parallax-element absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              Ready to Start Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Journey?
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join thousands of students who have transformed their lives
              through excellence in education. Your future starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/courses"
                className="group inline-flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="w-6 h-6" />
                <span>Explore Courses</span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
                <div className="text-white/70">Years Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  2.5K+
                </div>
                <div className="text-white/70">Graduates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  50+
                </div>
                <div className="text-white/70">Expert Faculty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">98%</div>
                <div className="text-white/70">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
