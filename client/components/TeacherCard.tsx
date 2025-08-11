import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

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
  achievements,
}: TeacherCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const socialLinks = [
    { Icon: Facebook, color: "hover:bg-blue-600", href: "#" },
    { Icon: Twitter, color: "hover:bg-sky-500", href: "#" },
    { Icon: Linkedin, color: "hover:bg-blue-700", href: "#" },
    { Icon: Instagram, color: "hover:bg-pink-600", href: "#" },
  ];

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:-translate-y-4 transition-all duration-500 hover:shadow-3xl"
    >
      {/* Header with Purple Background */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="flex items-center space-x-6 relative z-10">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">{name}</h3>
            <p className="text-purple-200 font-medium text-lg">{position}</p>
            <div className="flex items-center space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "text-yellow-400 fill-current"
                      : "text-purple-300"
                  }`}
                />
              ))}
              <span className="text-purple-200 text-sm ml-2">({rating}/5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
            <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{experience}</div>
            <div className="text-sm text-gray-600">Experience</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{students}</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <BookOpen className="h-5 w-5 text-purple-600" />
            <div>
              <div className="font-semibold text-gray-800">Education</div>
              <div className="text-sm text-gray-600">{education}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <Award className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-semibold text-gray-800">Specialization</div>
              <div className="text-sm text-gray-600">{specialization}</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center">
            <Award className="h-5 w-5 text-yellow-600 mr-2" />
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-600">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-sm">
            <Mail className="h-4 w-4 text-purple-600" />
            <span className="text-gray-600">{email}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Phone className="h-4 w-4 text-green-600" />
            <span className="text-gray-600">{phone}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200">
          {socialLinks.map(({ Icon, color, href }, index) => (
            <a
              key={index}
              href={href}
              className={`p-3 bg-gray-100 rounded-xl ${color} text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110`}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
