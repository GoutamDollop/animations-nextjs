import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  Calendar,
  User,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".testimonials-header",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      // Testimonial cards animation
      gsap.utils.toArray(".testimonial-card").forEach((card: any, index) => {
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
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Computer Science Graduate",
      year: "2024",
      rating: 5,
      image:
        "https://images.pexels.com/photos/6929160/pexels-photo-6929160.jpeg",
      testimonial:
        "EduVerse Academy provided me with the perfect foundation for my career in technology. The professors are incredibly knowledgeable and supportive, and the hands-on learning approach really prepared me for the real world.",
      achievement: "Now working at Google as Software Engineer",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Administration Graduate",
      year: "2023",
      rating: 5,
      image:
        "https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg",
      testimonial:
        "The business program at EduVerse exceeded all my expectations. The curriculum is cutting-edge, and the networking opportunities are incredible. I felt truly prepared to launch my startup after graduation.",
      achievement: "Founded successful tech startup valued at $2M",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Creative Arts Graduate",
      year: "2024",
      rating: 5,
      image:
        "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg",
      testimonial:
        "The creative arts program here is phenomenal! The facilities are world-class and the faculty genuinely care about helping students discover their artistic voice. My portfolio from EduVerse landed me my dream job.",
      achievement: "Lead Designer at Creative Agency in NYC",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Engineering Graduate",
      year: "2023",
      rating: 5,
      image:
        "https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg",
      testimonial:
        "The engineering program combines theoretical knowledge with practical application perfectly. The labs are amazing, and the project-based learning approach really develops problem-solving skills.",
      achievement: "Senior Engineer at Tesla",
    },
    {
      id: 5,
      name: "Maria Garcia",
      role: "Psychology Graduate",
      year: "2024",
      rating: 5,
      image:
        "https://images.pexels.com/photos/5274601/pexels-photo-5274601.jpeg",
      testimonial:
        "EduVerse helped me understand not just psychology theories, but how to apply them in real-world situations. The clinical experience opportunities were invaluable for my career development.",
      achievement: "Licensed Therapist helping 200+ clients",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <div ref={pageRef} className="min-h-screen pt-16 md:pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white relative overflow-hidden">
        <HeroBreadcrumb />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 md:w-32 h-20 md:h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-16 md:w-24 h-16 md:h-24 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-12 md:w-16 h-12 md:h-16 bg-pink-300 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="testimonials-header max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 md:mb-6">
              Student Success Stories 🌟
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2">
              Hear from our amazing graduates who are making their mark in the
              world!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Testimonial Content */}
                <div className="order-2 lg:order-1">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>

                  <Quote className="h-12 w-12 text-teal-500 mb-6 opacity-50" />

                  <blockquote className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6 italic">
                    "{currentData.testimonial}"
                  </blockquote>

                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                      {currentData.name}
                    </h3>
                    <p className="text-teal-600 font-semibold">
                      {currentData.role}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Class of {currentData.year}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg inline-block">
                    <p className="font-semibold text-sm">
                      {currentData.achievement}
                    </p>
                  </div>
                </div>

                {/* Student Image */}
                <div className="order-1 lg:order-2 text-center">
                  <div className="relative inline-block">
                    <img
                      src={currentData.image}
                      alt={currentData.name}
                      className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-8 border-white shadow-2xl mx-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                      <ThumbsUp className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-6 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "bg-gradient-to-r from-teal-500 to-cyan-500 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              All Success Stories 📚
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Every student has a unique journey. Here are some of the amazing
              stories from our graduates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-teal-200"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-teal-600 font-semibold text-sm">
                      {testimonial.role}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{testimonial.testimonial}"
                </p>

                <div className="bg-teal-50 p-3 rounded-lg">
                  <p className="text-teal-700 font-semibold text-xs">
                    {testimonial.achievement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              Ready to Write Your Success Story? ✨
            </h2>
            <p className="text-lg md:text-xl text-teal-100 mb-6 md:mb-8 leading-relaxed px-4">
              Join thousands of successful graduates who started their journey
              at EduVerse Academy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-white text-teal-600 px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                <span>Start Your Journey</span>
                <User className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-transparent border-2 md:border-3 border-white text-white px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl hover:bg-white hover:text-teal-600 transition-all duration-300">
                <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
