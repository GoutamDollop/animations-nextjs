import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Users, 
  Star,
  BookOpen,
  GraduationCap,
  MapPin,
  ExternalLink,
  Heart,
  MessageCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeacherCardProps {
  name: string;
  position: string;
  image: string;
  experience: string;
  education: string;
  specialization: string;
  email: string;
  phone: string;
  rating: number;
  students: number;
  description: string;
  achievements: string[];
}

export default function TeacherCard({
  name,
  position,
  image,
  experience,
  education,
  specialization,
  email,
  phone,
  rating,
  students,
  description,
  achievements
}: TeacherCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover effect
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, duration: 0.4, ease: "power2.out" });
      gsap.to(card.querySelector('.teacher-image'), { scale: 1.05, duration: 0.4, ease: "power2.out" });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(card.querySelector('.teacher-image'), { scale: 1, duration: 0.4, ease: "power2.out" });
    });
  }, []);

  return (
    <div ref={cardRef} className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-gray-100">
      {/* Hero Section with Image */}
      <div className="relative h-64 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-yellow-300 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-pink-300 rounded-full"></div>
        </div>

        {/* Teacher Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="teacher-image w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-2xl"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-bold text-gray-800">{rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{name}</h3>
          <p className="text-purple-600 font-semibold text-lg">{position}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100">
            <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-800">{experience}</div>
            <div className="text-xs text-gray-600 font-medium">Experience</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-800">{students}</div>
            <div className="text-xs text-gray-600 font-medium">Students</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center leading-relaxed mb-6">{description}</p>

        {/* Education & Specialization */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
            <GraduationCap className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-800 text-sm">Education</div>
              <div className="text-xs text-gray-600">{education}</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
            <BookOpen className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-gray-800 text-sm">Specialization</div>
              <div className="text-xs text-gray-600">{specialization}</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
            <Award className="h-4 w-4 text-yellow-600 mr-2" />
            Key Achievements
          </h4>
          <div className="space-y-2">
            {achievements.slice(0, 2).map((achievement, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-xs text-gray-600 leading-relaxed">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <MessageCircle className="h-4 w-4" />
            <span>Message</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <ExternalLink className="h-4 w-4" />
            <span>Profile</span>
          </button>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-center space-x-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3 text-purple-600" />
              <span className="text-gray-600 truncate">{email.split('@')[0]}@...</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3 text-green-600" />
              <span className="text-gray-600">{phone.slice(-4)}</span>
            </div>
          </div>
        </div>

        {/* Love Badge */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center space-x-1 text-xs text-gray-500">
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>Loved by students</span>
          </div>
        </div>
      </div>
    </div>
  );
}
