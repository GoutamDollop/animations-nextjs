import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smile, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import AnimatedCounter from "../../../animations/counters/AnimatedCounter";
import statsData from "../../../data/stats.json";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Smile,
  GraduationCap,
  BookOpen,
  TrendingUp,
};

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Optimized scroll trigger animation
      gsap.utils.toArray(".stat-card").forEach((card: any, index) => {
        gsap.fromTo(
          card,
          {
            y: 60,
            opacity: 0,
            scale: 0.8,
          },
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
            delay: index * 0.15,
          },
        );

        // Subtle hover animation
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Our Amazing Numbers 📊
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every number tells a story of dreams fulfilled and futures
            transformed!
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData.stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];

            return (
              <div
                key={stat.id}
                className={`stat-card text-center p-8 bg-gradient-to-br ${stat.bgColor} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white`}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${stat.color} rounded-2xl mb-6 shadow-lg`}
                >
                  <IconComponent className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-black text-gray-800 mb-3">
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="text-gray-800 font-bold text-base lg:text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600 text-sm">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
