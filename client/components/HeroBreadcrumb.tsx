import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import { gsap } from "gsap";

export default function HeroBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const breadcrumbRef = useRef<HTMLDivElement>(null);

  // Define page mappings
  const pageMapping: {
    [key: string]: { name: string; emoji: string; color: string };
  } = {
    "/": { name: "Home", emoji: "🏠", color: "from-blue-500 to-cyan-500" },
    "/about": {
      name: "About Us",
      emoji: "🎓",
      color: "from-blue-500 to-indigo-500",
    },
    "/courses": {
      name: "Courses",
      emoji: "📚",
      color: "from-orange-500 to-red-500",
    },
    "/teachers": {
      name: "Teachers",
      emoji: "👩‍🏫",
      color: "from-green-500 to-emerald-500",
    },
    "/events": {
      name: "Events",
      emoji: "🎉",
      color: "from-purple-500 to-pink-500",
    },
    "/gallery": {
      name: "Gallery",
      emoji: "📷",
      color: "from-pink-500 to-rose-500",
    },
    "/contact": {
      name: "Contact",
      emoji: "📞",
      color: "from-indigo-500 to-purple-500",
    },
    "/testimonials": {
      name: "Testimonials",
      emoji: "⭐",
      color: "from-emerald-500 to-teal-500",
    },
  };

  // Get current page info
  const currentPath = location.pathname;
  const currentPageInfo = pageMapping[currentPath] || {
    name: "Page",
    emoji: "📄",
    color: "from-gray-500 to-gray-600",
  };

  useEffect(() => {
    if (breadcrumbRef.current) {
      // Entrance animation
      gsap.fromTo(
        breadcrumbRef.current,
        { y: -50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.3,
        },
      );
    }
  }, [currentPath]);

  // Handle back navigation
  const handleBack = () => {
    navigate("/");
  };

  // Don't show breadcrumb on home page
  if (currentPath === "/") {
    return null;
  }

  return (
    <div
      ref={breadcrumbRef}
      className="absolute top-4 left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-20"
    >
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group inline-flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/30 hover:border-orange-300"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-700 group-hover:text-orange-600 transition-colors duration-300" />
          <span className="text-gray-700 group-hover:text-orange-600 font-semibold text-sm md:text-base hidden sm:inline transition-colors duration-300">
            Home
          </span>
        </button>

        {/* Separator */}
        <div className="hidden sm:flex items-center">
          <ChevronRight className="h-4 w-4 text-white/60" />
        </div>

        {/* Current Page Indicator */}
        <div
          className={`inline-flex items-center space-x-2 md:space-x-3 px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r ${currentPageInfo.color} backdrop-blur-md text-white rounded-full shadow-lg border border-white/20`}
        >
          <Home className="h-4 w-4 md:h-5 md:w-5" />
          <span className="font-bold text-sm md:text-base">
            {currentPageInfo.name}
          </span>
          <span className="text-lg md:text-xl">{currentPageInfo.emoji}</span>
        </div>
      </div>

      {/* Enhanced Path Display for larger screens */}
      <div className="hidden lg:flex items-center space-x-2 mt-3 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full text-white/90 text-sm">
        <Home className="h-3 w-3" />
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium">{currentPageInfo.name}</span>
      </div>
    </div>
  );
}
