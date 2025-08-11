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
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  useEffect(() => {
    // Enhanced footer animations
    gsap.fromTo(
      ".footer-item",
      { y: 80, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".footer-container",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating social icons
    gsap.to(".social-icon", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2
    });
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power3.out" });
  };

  return (
    <footer className="footer-container relative overflow-hidden">
      {/* Wave Background */}
      <div className="relative">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24 fill-gradient-to-r from-blue-500 to-purple-600"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-32 w-24 h-24 bg-white rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="footer-item space-y-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative p-3 bg-white rounded-2xl shadow-lg">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div>
                  <div className="font-display font-black text-2xl text-white">
                    EduVerse
                  </div>
                  <div className="text-blue-100 text-sm font-medium -mt-1">
                    Academy
                  </div>
                </div>
              </Link>
              <p className="text-blue-100 text-sm leading-relaxed">
                Empowering minds, shaping futures. Join us in creating tomorrow's
                leaders through innovative education and boundless opportunities.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, color: "hover:bg-blue-500" },
                  { Icon: Twitter, color: "hover:bg-sky-500" },
                  { Icon: Instagram, color: "hover:bg-pink-500" },
                  { Icon: Youtube, color: "hover:bg-red-500" },
                ].map(({ Icon, color }, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`social-icon p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white ${color} transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-item space-y-6">
              <h3 className="font-display font-bold text-xl text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {["About Us", "Courses", "Events", "Gallery", "Contact"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link
                        to={`/${item.toLowerCase().replace(" ", "")}`}
                        className="text-blue-100 hover:text-white transition-colors duration-300 text-sm font-medium hover:translate-x-2 transform transition-transform inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Academic */}
            <div className="footer-item space-y-6">
              <h3 className="font-display font-bold text-xl text-white">
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
                      className="text-blue-100 hover:text-white transition-colors duration-300 text-sm font-medium hover:translate-x-2 transform transition-transform inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-item space-y-6">
              <h3 className="font-display font-bold text-xl text-white">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-200 mt-1 flex-shrink-0" />
                  <span className="text-blue-100 text-sm leading-relaxed">
                    123 Education Street
                    <br />
                    Learning City, LC 12345
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-200 flex-shrink-0" />
                  <span className="text-blue-100 text-sm font-medium">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-200 flex-shrink-0" />
                  <span className="text-blue-100 text-sm font-medium">
                    info@eduverse.edu
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-item mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <p className="text-blue-100 text-sm text-center md:text-left">
                  © 2024 EduVerse Academy. All rights reserved. Made with
                </p>
                <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                <p className="text-blue-100 text-sm">for education.</p>
              </div>
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="text-blue-100 hover:text-white text-sm transition-colors font-medium"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white text-sm transition-colors font-medium"
                >
                  Terms of Service
                </a>
                <button
                  onClick={scrollToTop}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <div className="footer-item text-center">
              <h3 className="font-display font-bold text-2xl text-white mb-4">
                Stay Updated with EduVerse
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest updates on courses, events, and educational opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
