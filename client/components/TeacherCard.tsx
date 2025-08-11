import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Calendar, Award, Users, Star } from "lucide-react";

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
      { y: 40, opacity: 0, scale: 0.95 },
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

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 max-w-sm mx-auto"
    >
      {/* Header with Teacher Image and Basic Info */}
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-xl object-cover border-3 border-white shadow-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{name}</h3>
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
              <span className="text-purple-200 text-xs ml-1">({rating}/5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-orange-50 rounded-xl">
            <Calendar className="h-4 w-4 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-800">{experience}</div>
            <div className="text-xs text-gray-600">Experience</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <Users className="h-4 w-4 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-800">{students}</div>
            <div className="text-xs text-gray-600">Students</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Key Info */}
        <div className="space-y-2 mb-4 text-xs">
          <div>
            <span className="font-semibold text-gray-800">Education: </span>
            <span className="text-gray-600">{education}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-800">
              Specialization:{" "}
            </span>
            <span className="text-gray-600">{specialization}</span>
          </div>
        </div>

        {/* Top Achievement */}
        <div className="mb-4">
          <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-xl">
            <Award className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-gray-700 font-medium">
              {achievements[0]}
            </span>
          </div>
        </div>

        {/* Additional Info Display */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg">
            <Award className="h-3 w-3" />
            <span>Available for Consultation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
