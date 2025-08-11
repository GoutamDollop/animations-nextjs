import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, Phone } from "lucide-react";
import { gsap } from "gsap";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Teachers", path: "/teachers" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Enhanced navigation animations
    gsap.fromTo(
      ".nav-item",
      { y: -30, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
    );

    // Logo bounce animation
    gsap.fromTo(
      ".logo",
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
    );
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      gsap.fromTo(
        ".mobile-nav-item",
        { x: 100, opacity: 0, rotationY: 90 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      );
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Enhanced Logo */}
          <Link
            to="/"
            className="logo flex items-center space-x-3 nav-item group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative p-3 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl transform transition-transform group-hover:scale-110 shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-black text-2xl lg:text-3xl">
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  EduVerse
                </span>
              </div>
              <div className="text-xs text-gray-500 font-medium -mt-1">
                Academy
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl hover:bg-orange-50 group ${
                  location.pathname === item.path
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Contact Info */}
            <div className="hidden xl:flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-orange-600" />
              <span className="text-gray-600 font-medium">
                +1 (555) 123-4567
              </span>
            </div>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden md:inline-flex nav-item items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span>Apply Now</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden nav-item p-3 rounded-xl bg-orange-100 hover:bg-orange-200 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-orange-700" />
              ) : (
                <Menu className="h-5 w-5 text-orange-700" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-screen opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 space-y-2 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-gray-200">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-item block px-6 py-4 text-base font-semibold rounded-xl transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mobile-nav-item block px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply Now - Join EduVerse!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
