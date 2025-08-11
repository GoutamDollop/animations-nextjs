import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  Calendar,
  Award,
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
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Hover effect
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
    });
  }, []);

  const socialLinks = [
    { Icon: Facebook, color: "hover:bg-blue-600" },
    { Icon: Twitter, color: "hover:bg-sky-500" },
    { Icon: Linkedin, color: "hover:bg-blue-700" },
    { Icon: Instagram, color: "hover:bg-pink-600" },
  ];

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white relative">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-xl object-cover border-3 border-white shadow-lg"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-purple-200 text-sm">{position}</p>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < rating
                      ? "text-yellow-400 fill-current"
                      : "text-purple-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Calendar className="h-4 w-4 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-800">{experience}</div>
            <div className="text-xs text-gray-600">Experience</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Users className="h-4 w-4 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-800">{students}</div>
            <div className="text-xs text-gray-600">Students</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Education & Specialization */}
        <div className="space-y-2 mb-4">
          <div className="text-xs">
            <span className="font-semibold text-gray-800">Education: </span>
            <span className="text-gray-600">{education}</span>
          </div>
          <div className="text-xs">
            <span className="font-semibold text-gray-800">
              Specialization:{" "}
            </span>
            <span className="text-gray-600">{specialization}</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center">
            <Award className="h-4 w-4 text-yellow-600 mr-1" />
            Key Achievements
          </h4>
          <ul className="space-y-1">
            {achievements.slice(0, 2).map((achievement, index) => (
              <li key={index} className="flex items-start space-x-1">
                <div className="w-1 h-1 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-xs text-gray-600">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-1 mb-4 text-xs">
          <div className="flex items-center space-x-2">
            <Mail className="h-3 w-3 text-purple-600" />
            <span className="text-gray-600">{email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-3 w-3 text-green-600" />
            <span className="text-gray-600">{phone}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-2 pt-3 border-t border-gray-200">
          {socialLinks.map(({ Icon, color }, index) => (
            <button
              key={index}
              className={`p-2 bg-gray-100 rounded-lg ${color} text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110`}
            >
              <Icon className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
