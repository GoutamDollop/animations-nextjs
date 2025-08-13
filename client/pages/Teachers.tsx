import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users } from "lucide-react";
import TeacherCard from "../components/ui/cards/TeacherCard";
import teachersData from "../data/teachers.json";
import UniversalPageHero from "../components/sections/hero/UniversalPageHero";

gsap.registerPlugin(ScrollTrigger);

export default function Teachers() {
  useEffect(() => {
    gsap.fromTo(
      ".teachers-header",
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
    );
  }, []);

  return (
    <div className="min-h-screen">
      {/* Universal Hero Section */}
      <UniversalPageHero
        title="Meet Our Amazing Teachers"
        subtitle="World-Class Educators"
        description="Our passionate educators are dedicated to nurturing young minds and inspiring the next generation of leaders, innovators, and changemakers."
        backgroundImage="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        badge={{
          icon: <Users className="w-5 h-5 text-yellow-400" />,
          text: "Expert Faculty"
        }}
      />

      {/* Teachers Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {teachersData.teachers.map((teacher, index) => (
              <TeacherCard key={teacher.id} {...teacher} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
            Want to Join Our Teaching Team? 🎓
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            We're always looking for passionate educators to join our mission of
            transforming young lives through education!
          </p>
          <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-white text-orange-600 px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
            <span>Apply to Teach</span>
          </button>
        </div>
      </section>
    </div>
  );
}
