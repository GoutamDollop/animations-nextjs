import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Home, BookOpen, Users, Calendar, Phone, GraduationCap, ImageIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const routeConfig: Record<string, { label: string; icon: React.ReactNode }> = {
  "/": { label: "Home", icon: <Home className="w-4 h-4" /> },
  "/about": { label: "About Us", icon: <BookOpen className="w-4 h-4" /> },
  "/courses": { label: "Courses", icon: <GraduationCap className="w-4 h-4" /> },
  "/teachers": { label: "Teachers", icon: <Users className="w-4 h-4" /> },
  "/events": { label: "Events", icon: <Calendar className="w-4 h-4" /> },
  "/gallery": { label: "Gallery", icon: <ImageIcon className="w-4 h-4" /> },
  "/contact": { label: "Contact", icon: <Phone className="w-4 h-4" /> }
};

export default function AnimatedBreadcrumb() {
  const location = useLocation();
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  // Check if we should show breadcrumb (but don't return early)
  const shouldShowBreadcrumb = location.pathname !== "/";

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const items: BreadcrumbItem[] = [
      { label: "Home", path: "/", icon: <Home className="w-4 h-4" /> }
    ];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const config = routeConfig[currentPath];
      if (config) {
        items.push({
          label: config.label,
          path: currentPath,
          icon: config.icon
        });
      } else {
        // Fallback for dynamic routes
        items.push({
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          path: currentPath
        });
      }
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  useEffect(() => {
    if (!shouldShowBreadcrumb || !breadcrumbRef.current) return;

    const ctx = gsap.context(() => {
      // Main container entrance animation
      gsap.fromTo(
        breadcrumbRef.current,
        { 
          opacity: 0, 
          y: -30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2
        }
      );

      // Stagger animation for breadcrumb items
      gsap.fromTo(
        ".breadcrumb-item",
        { 
          opacity: 0, 
          x: -20,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.4
        }
      );

      // Animated underline effect
      gsap.fromTo(
        ".breadcrumb-underline",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out"
        }
      );

      // Floating animation for the entire breadcrumb
      gsap.to(breadcrumbRef.current, {
        y: -3,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Sparkle effect animation
      gsap.to(".breadcrumb-sparkle", {
        rotation: 360,
        scale: 1.2,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

    }, breadcrumbRef);

    return () => ctx.revert();
  }, [location.pathname]);

  const handleItemHover = (index: number) => {
    const item = itemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1.05,
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleItemLeave = (index: number) => {
    const item = itemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 border-b border-gray-200/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="breadcrumb-sparkle absolute top-2 left-20 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="breadcrumb-sparkle absolute top-6 right-32 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
        <div className="breadcrumb-sparkle absolute bottom-3 left-1/3 w-1 h-1 bg-pink-400 rounded-full"></div>
        <div className="breadcrumb-sparkle absolute bottom-2 right-20 w-2 h-2 bg-orange-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div 
          ref={breadcrumbRef}
          className="py-4 md:py-6"
        >
          {/* Animated underline */}
          <div className="breadcrumb-underline absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          <nav className="flex items-center space-x-2 md:space-x-3 flex-wrap">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              
              return (
                <React.Fragment key={item.path}>
                  <div
                    ref={(el) => {
                      if (el) itemsRef.current[index] = el;
                    }}
                    className="breadcrumb-item group"
                    onMouseEnter={() => handleItemHover(index)}
                    onMouseLeave={() => handleItemLeave(index)}
                  >
                    {isLast ? (
                      <span className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-sm md:text-base shadow-lg">
                        {item.icon}
                        <span>{item.label}</span>
                      </span>
                    ) : (
                      <Link
                        to={item.path}
                        className="flex items-center space-x-2 px-3 py-2 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-medium text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white hover:text-blue-600 group-hover:scale-105"
                      >
                        {item.icon}
                        <span className="relative">
                          {item.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    )}
                  </div>

                  {!isLast && (
                    <div className="breadcrumb-item flex items-center">
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Page Title Section */}
          <div className="mt-6 mb-2">
            <div className="flex items-center space-x-3">
              {breadcrumbItems[breadcrumbItems.length - 1].icon && (
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg">
                  {breadcrumbItems[breadcrumbItems.length - 1].icon}
                </div>
              )}
              <div>
                <h1 className="text-2xl md:text-4xl font-display font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {breadcrumbItems[breadcrumbItems.length - 1].label}
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Explore our {breadcrumbItems[breadcrumbItems.length - 1].label.toLowerCase()} section
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
    </div>
  );
}
