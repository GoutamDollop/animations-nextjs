import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const showcaseImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80",
    alt: "Modern Campus",
    title: "Modern Campus",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Interactive Learning",
    title: "Interactive Learning",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Science Labs",
    title: "Science Labs",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2322&q=80",
    alt: "Sports Facilities",
    title: "Sports Facilities",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Library",
    title: "Digital Library",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2532&q=80",
    alt: "Graduation",
    title: "Graduation Day",
  },
];

export default function ImageShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showcaseRef.current) return;

    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(
        ".showcase-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Images stagger animation
      gsap.fromTo(
        ".showcase-image",
        {
          y: 80,
          opacity: 0,
          scale: 0.8,
          rotation: -5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".showcase-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Hover animations for images
      const images = document.querySelectorAll(".showcase-image");
      images.forEach((img) => {
        const handleMouseEnter = () => {
          gsap.to(img, {
            scale: 1.05,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(img, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        img.addEventListener("mouseenter", handleMouseEnter);
        img.addEventListener("mouseleave", handleMouseLeave);
      });
    }, showcaseRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={showcaseRef}
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="showcase-title text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Experience Our Amazing Campus Life 🎓
          </h2>
        </div>

        {/* Images Grid */}
        <div className="showcase-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {showcaseImages.map((image, index) => (
            <div
              key={image.id}
              className="showcase-image group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold">{image.title}</h3>
                <p className="text-sm opacity-90">Explore our facilities</p>
              </div>

              {/* Floating number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a
            href="#gallery"
            className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span>View Complete Gallery</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
