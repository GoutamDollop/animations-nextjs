import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Users,
  Microscope,
  Palette,
  Globe,
  Calculator,
  Music,
  Dumbbell,
  ArrowRight,
  Sparkles,
  Star,
  Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SchoolCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
  stats: { value: string; label: string }[];
  color: string;
  gradient: string;
}

const schoolCards: SchoolCard[] = [
  {
    id: 1,
    title: "Modern Learning Facilities",
    subtitle: "State-of-the-Art Infrastructure",
    description:
      "Our campus features cutting-edge technology and modern architecture designed to inspire learning and creativity. Every classroom is equipped with interactive whiteboards, high-speed internet, and comfortable seating arrangements.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80",
    icon: <BookOpen className="w-6 h-6" />,
    features: [
      "Smart Classrooms",
      "High-Speed WiFi",
      "Interactive Technology",
      "Climate Control",
    ],
    stats: [
      { value: "50+", label: "Smart Classrooms" },
      { value: "100%", label: "Digital Coverage" },
    ],
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Advanced Science Labs",
    subtitle: "Hands-On Learning Experience",
    description:
      "Our fully equipped science laboratories provide students with hands-on experience in physics, chemistry, and biology. Safety-first approach with modern equipment ensures optimal learning conditions.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    icon: <Microscope className="w-6 h-6" />,
    features: [
      "Physics Lab",
      "Chemistry Lab",
      "Biology Lab",
      "Safety Equipment",
    ],
    stats: [
      { value: "6", label: "Specialized Labs" },
      { value: "200+", label: "Experiments" },
    ],
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Creative Arts Center",
    subtitle: "Nurturing Artistic Talents",
    description:
      "Our arts center encourages creativity through music, visual arts, drama, and dance. Professional-grade equipment and experienced instructors help students explore their artistic potential.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    icon: <Palette className="w-6 h-6" />,
    features: ["Music Studio", "Art Gallery", "Drama Theater", "Dance Studio"],
    stats: [
      { value: "15+", label: "Art Programs" },
      { value: "500+", label: "Performances" },
    ],
    color: "orange",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "Sports Complex",
    subtitle: "Physical Excellence & Team Spirit",
    description:
      "Our comprehensive sports facilities include indoor and outdoor courts, swimming pool, and fitness center. We promote physical fitness and team spirit through various sports programs.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    icon: <Dumbbell className="w-6 h-6" />,
    features: [
      "Swimming Pool",
      "Basketball Court",
      "Football Field",
      "Fitness Center",
    ],
    stats: [
      { value: "10+", label: "Sports Offered" },
      { value: "300+", label: "Athletes" },
    ],
    color: "green",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 5,
    title: "Digital Library & Research",
    subtitle: "Knowledge at Your Fingertips",
    description:
      "Our modern library combines traditional books with digital resources, providing students access to thousands of books, journals, and online databases for comprehensive research.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2128&q=80",
    icon: <Globe className="w-6 h-6" />,
    features: [
      "50K+ Books",
      "Digital Databases",
      "Study Rooms",
      "Research Support",
    ],
    stats: [
      { value: "50K+", label: "Books & Resources" },
      { value: "24/7", label: "Digital Access" },
    ],
    color: "indigo",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    title: "Innovation Hub",
    subtitle: "Future-Ready Technology",
    description:
      "Our innovation hub features robotics labs, 3D printing facilities, and coding spaces where students can explore emerging technologies and develop 21st-century skills.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    icon: <Calculator className="w-6 h-6" />,
    features: ["Robotics Lab", "3D Printing", "Coding Space", "AI/ML Projects"],
    stats: [
      { value: "100+", label: "Tech Projects" },
      { value: "20+", label: "Innovations" },
    ],
    color: "teal",
    gradient: "from-teal-500 to-blue-500",
  },
];

export default function SchoolImageCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".section-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Card animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isEven = index % 2 === 0;
        const imageElement = card.querySelector(".card-image");
        const contentElement = card.querySelector(".card-content");

        // Set initial states
        gsap.set(imageElement, {
          x: isEven ? -100 : 100,
          opacity: 0,
          scale: 0.8,
        });

        gsap.set(contentElement, {
          x: isEven ? 100 : -100,
          opacity: 0,
        });

        gsap.set(card.querySelectorAll(".feature-item"), {
          y: 30,
          opacity: 0,
        });

        gsap.set(card.querySelectorAll(".stat-item"), {
          scale: 0,
          opacity: 0,
        });

        // Create scroll-triggered animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Image animation
        tl.to(imageElement, {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        });

        // Content animation
        tl.to(
          contentElement,
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        );

        // Features animation
        tl.to(
          card.querySelectorAll(".feature-item"),
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6",
        );

        // Stats animation
        tl.to(
          card.querySelectorAll(".stat-item"),
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        );

        // Parallax effect for images
        gsap.to(imageElement, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Hover animations
        const handleMouseEnter = () => {
          gsap.to(imageElement, {
            scale: 1.05,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(card.querySelector(".card-overlay"), {
            opacity: 0.8,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(imageElement, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(card.querySelector(".card-overlay"), {
            opacity: 0.4,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="school-cards"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="section-header text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-blue-600 font-semibold">
              Explore Our Campus
            </span>
            <Star className="w-5 h-5 text-purple-500" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-gray-900">
            World-Class{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Facilities
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our state-of-the-art facilities designed to provide the
            best learning environment for students to excel in academics, arts,
            and sports.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-32">
          {schoolCards.map((card, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={card.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  !isEven ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`${!isEven ? "lg:col-start-2" : ""} relative group`}
                >
                  <div className="card-image relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <div
                      className={`card-overlay absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-40 transition-opacity duration-300`}
                    ></div>

                    {/* Floating icon */}
                    <div
                      className={`absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl text-${card.color}-500`}
                    >
                      {card.icon}
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="grid grid-cols-2 gap-4">
                        {card.stats.map((stat, statIndex) => (
                          <div
                            key={statIndex}
                            className="stat-item bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center"
                          >
                            <div
                              className={`text-2xl font-bold text-${card.color}-600 mb-1`}
                            >
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`card-content ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""} space-y-8`}
                >
                  {/* Badge */}
                  <div
                    className={`inline-flex items-center space-x-2 bg-gradient-to-r from-${card.color}-500/10 to-${card.color}-500/5 rounded-full px-4 py-2`}
                  >
                    <Award className={`w-4 h-4 text-${card.color}-500`} />
                    <span
                      className={`text-${card.color}-600 font-medium text-sm`}
                    >
                      {card.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    {card.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="feature-item flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${card.gradient} rounded-full flex-shrink-0`}
                        ></div>
                        <span className="text-gray-700 font-medium text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      className={`group inline-flex items-center space-x-2 bg-gradient-to-r ${card.gradient} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                      View Gallery →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
