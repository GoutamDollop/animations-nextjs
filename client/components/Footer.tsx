import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
  Star,
  ArrowUp,
  Linkedin,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  useEffect(() => {
    // Force immediate visibility and ensure footer always renders
    const footerContainer = document.querySelector(".footer-container");
    if (footerContainer) {
      (footerContainer as HTMLElement).style.visibility = "visible";
      (footerContainer as HTMLElement).style.opacity = "1";
      (footerContainer as HTMLElement).style.display = "block";
    }

    // Apply subtle entrance animations
    const timer = setTimeout(() => {
      gsap.fromTo(
        ".footer-item",
        { y: 20, opacity: 0.8 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { Icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
    { Icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
    { Icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
    { Icon: Youtube, color: "hover:bg-red-600", label: "YouTube" },
    { Icon: Linkedin, color: "hover:bg-blue-700", label: "LinkedIn" },
  ];

  return (
    <footer className="footer-container relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black mt-auto w-full">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-300 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="footer-item space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative p-3 bg-white rounded-2xl shadow-lg">
                  <GraduationCap className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div>
                <div className="font-display font-black text-2xl text-white">
                  EduVerse
                </div>
                <div className="text-orange-100 text-sm font-bold -mt-1">
                  Academy
                </div>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              🌟 Empowering minds, shaping futures. Join us in creating
              tomorrow's leaders through innovative education!
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ Icon, color, label }, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={label}
                  className={`p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white ${color} transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-300" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Home",
                "About",
                "Courses",
                "Teachers",
                "Events",
                "Contact",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-orange-100 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-2 transform transition-transform inline-block group"
                  >
                    <span className="group-hover:underline">{item}</span>
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      🚀
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic */}
          <div className="footer-item space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-yellow-300" />
              Academic
            </h3>
            <ul className="space-y-3">
              {[
                "Admissions",
                "Scholarships",
                "Student Portal",
                "Faculty",
                "Research",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-orange-100 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-2 transform transition-transform inline-block group"
                  >
                    <span className="group-hover:underline">{item}</span>
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      📚
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-item space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center">
              <Heart className="h-5 w-5 mr-2 text-yellow-300" />
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <MapPin className="h-5 w-5 text-yellow-300 mt-1 flex-shrink-0" />
                <span className="text-orange-100 text-sm leading-relaxed">
                  123 Education Street
                  <br />
                  Learning City, LC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <Phone className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <span className="text-orange-100 text-sm font-medium">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <Mail className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <span className="text-orange-100 text-sm font-medium">
                  info@eduverse.edu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-center md:text-left">
              <p className="text-orange-100 text-sm">
                © 2024 EduVerse Academy. All rights reserved. Made with
              </p>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <p className="text-orange-100 text-sm">for education.</p>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-orange-100 hover:text-white text-sm transition-colors font-medium hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-orange-100 hover:text-white text-sm transition-colors font-medium hover:underline"
              >
                Terms of Service
              </a>
              <button
                onClick={scrollToTop}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
