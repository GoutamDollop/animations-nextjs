import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeacherCard from '../components/TeacherCard';
import teachersData from '../data/teachers.json';

gsap.registerPlugin(ScrollTrigger);

export default function Teachers() {
  useEffect(() => {
    gsap.fromTo(
      '.teachers-header',
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-300 rounded-full animate-ping"></div>
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <div className="teachers-header">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6">
                Meet Our Amazing Teachers 👨‍🏫👩‍🏫
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                Our passionate educators are dedicated to nurturing young minds and inspiring the next generation of leaders, innovators, and changemakers! ✨
              </p>
            </div>
          </div>
        </section>

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
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Want to Join Our Teaching Team? 🎓
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We're always looking for passionate educators to join our mission of transforming young lives through education!
            </p>
            <button className="inline-flex items-center space-x-3 bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <span>Apply to Teach</span>
            </button>
          </div>
        </section>
    </div>
  );
}
