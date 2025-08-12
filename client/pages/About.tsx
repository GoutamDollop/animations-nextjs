import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Users,
  Target,
  Award,
  Heart,
  BookOpen,
  Globe,
  Lightbulb,
  Star,
  CheckCircle,
  Calendar,
  Trophy,
  Rocket,
} from "lucide-react";
import ConditionalBreadcrumb from "../components/ConditionalBreadcrumb";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".about-header",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      // Section animations
      gsap.utils.toArray(".about-section").forEach((section: any) => {
        gsap.fromTo(
          section.children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Timeline animation
      gsap.utils.toArray(".timeline-item").forEach((item: any, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: Heart,
      title: "Passion for Learning",
      description:
        "We believe in nurturing curiosity and fostering a love for lifelong learning.",
    },
    {
      icon: Users,
      title: "Inclusive Community",
      description:
        "Every student is valued and supported in our diverse, welcoming environment.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace cutting-edge teaching methods and technology to enhance education.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest standards in academic achievement and personal growth.",
    },
  ];

  const timeline = [
    {
      year: "1985",
      title: "Foundation",
      description:
        "EduVerse Academy was founded with a vision to transform education.",
    },
    {
      year: "1995",
      title: "Expansion",
      description:
        "Added high school programs and state-of-the-art science laboratories.",
    },
    {
      year: "2005",
      title: "Technology Integration",
      description:
        "Became one of the first schools to implement comprehensive digital learning.",
    },
    {
      year: "2015",
      title: "Global Recognition",
      description:
        "Received international accreditation and established exchange programs.",
    },
    {
      year: "2024",
      title: "Future Ready",
      description:
        "Leading the way in AI-enhanced learning and sustainable education practices.",
    },
  ];

  const achievements = [
    {
      icon: Trophy,
      number: "50+",
      label: "Awards Won",
      color: "text-yellow-600",
    },
    {
      icon: Star,
      number: "98%",
      label: "Graduate Success Rate",
      color: "text-orange-600",
    },
    {
      icon: Globe,
      number: "25+",
      label: "Countries Represented",
      color: "text-blue-600",
    },
    {
      icon: Rocket,
      number: "15+",
      label: "Years of Excellence",
      color: "text-purple-600",
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen">
      <div className="pt-4 md:pt-8 lg:pt-12">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-300 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="about-header max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 md:mb-6">
              About EduVerse Academy 🎓
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2">
              Empowering minds, shaping futures, and creating tomorrow's leaders
              through innovative education and boundless opportunities since
              1985.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center space-x-2 md:space-x-3 mb-4 md:mb-6">
                <Target className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold">
                  Our Mission
                </h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                To provide world-class education that nurtures critical
                thinking, creativity, and character development. We are
                committed to preparing students for success in an ever-evolving
                global society through innovative teaching methods and
                personalized learning experiences.
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  "Academic Excellence",
                  "Character Development",
                  "Global Citizenship",
                  "Innovation & Creativity",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 md:space-x-3"
                  >
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                    <span className="font-medium text-gray-800 text-sm md:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                src="https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg"
                alt="Students learning"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-3 md:-bottom-6 -right-3 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl">
                <Heart className="h-8 w-8 md:h-12 md:w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="about-section py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              Our Core Values 💎
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              These fundamental principles guide everything we do at EduVerse
              Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4 md:mb-6 shadow-lg">
                  <value.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-section py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              Our Journey Through Time 📅
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Discover the milestones that have shaped EduVerse Academy into the
              institution it is today.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>

            {/* Mobile Timeline */}
            <div className="block md:hidden space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <div className="text-xl font-bold text-orange-600 mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Timeline */}
            <div className="hidden md:block space-y-8 lg:space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-6 lg:pr-8 text-right" : "pl-6 lg:pl-8 text-left"}`}
                  >
                    <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-xl lg:text-2xl font-bold text-orange-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 lg:mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full border-2 lg:border-4 border-white shadow-lg"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="about-section py-12 md:py-16 lg:py-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              Our Achievements 🏆
            </h2>
            <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto px-4">
              Numbers that reflect our commitment to excellence and student
              success.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                <achievement.icon
                  className={`h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 mx-auto mb-3 md:mb-4 ${achievement.color}`}
                />
                <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
                  {achievement.number}
                </div>
                <div className="text-orange-100 font-medium text-sm md:text-base">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              Ready to Join Our Community? 🌟
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Become part of the EduVerse family and start your journey towards
              academic excellence and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                <span>Apply Now</span>
                <Rocket className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-white border-2 border-orange-300 text-orange-600 px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <span>Schedule Visit</span>
                <Calendar className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
