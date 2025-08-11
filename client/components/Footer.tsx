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
  Send,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  useEffect(() => {
    // Enhanced footer animations
    gsap.fromTo(
      ".footer-item",
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".footer-container",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Enhanced social icons animation
    gsap.to(".social-icon", {
      y: -15,
      rotation: 360,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3,
    });

    // Newsletter form animation
    gsap.fromTo(
      ".newsletter-form",
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".newsletter-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { duration: 2, scrollTo: 0, ease: "power3.out" });
  };

  const socialLinks = [
    { Icon: Facebook, color: "hover:bg-blue-600", label: "Facebook" },
    { Icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
    { Icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
    { Icon: Youtube, color: "hover:bg-red-600", label: "YouTube" },
    { Icon: Linkedin, color: "hover:bg-blue-700", label: "LinkedIn" },
  ];

  return (
    <footer className="footer-container relative overflow-hidden">
      {/* Enhanced Wave Background */}
      <div className="relative">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-24 md:h-32"
        >
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="75%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient)"
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          />
          <path
            fill="url(#wave-gradient)"
            fillOpacity="0.6"
            d="M1200,0V120H0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47Z"
          />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative">
        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-15">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 right-32 w-32 h-32 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-blue-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-300 rounded-full animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Enhanced Brand Section */}
            <div className="footer-item space-y-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative p-4 bg-white rounded-3xl shadow-2xl">
                    <GraduationCap className="h-10 w-10 text-orange-600" />
                  </div>
                </div>
                <div>
                  <div className="font-display font-black text-3xl text-white">
                    EduVerse
                  </div>
                  <div className="text-orange-100 text-sm font-bold -mt-1">
                    Academy
                  </div>
                </div>
              </Link>
              <p className="text-orange-100 text-base leading-relaxed">
                🌟 Empowering minds, shaping futures. Join us in creating
                tomorrow's leaders through innovative education and boundless
                opportunities!
              </p>
              <div className="flex space-x-4">
                {socialLinks.map(({ Icon, color, label }, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={label}
                    className={`social-icon p-4 bg-white/25 backdrop-blur-sm rounded-2xl text-white ${color} transition-all duration-300 transform hover:scale-125 shadow-xl hover:shadow-2xl`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div className="footer-item space-y-6">
              <h3 className="font-display font-black text-2xl text-white flex items-center">
                <Star className="h-6 w-6 mr-2 text-yellow-300" />
                Quick Links
              </h3>
              <ul className="space-y-4">
                {["About Us", "Courses", "Events", "Gallery", "Contact"].map(
                  (item, index) => (
                    <li key={index}>
                      <Link
                        to={`/${item.toLowerCase().replace(" ", "")}`}
                        className="text-orange-100 hover:text-white transition-all duration-300 text-base font-semibold hover:translate-x-3 transform transition-transform inline-block group"
                      >
                        <span className="group-hover:underline">{item}</span>
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          🚀
                        </span>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Enhanced Academic */}
            <div className="footer-item space-y-6">
              <h3 className="font-display font-black text-2xl text-white flex items-center">
                <GraduationCap className="h-6 w-6 mr-2 text-yellow-300" />
                Academic
              </h3>
              <ul className="space-y-4">
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
                      className="text-orange-100 hover:text-white transition-all duration-300 text-base font-semibold hover:translate-x-3 transform transition-transform inline-block group"
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

            {/* Enhanced Contact Info */}
            <div className="footer-item space-y-6">
              <h3 className="font-display font-black text-2xl text-white flex items-center">
                <Heart className="h-6 w-6 mr-2 text-yellow-300" />
                Contact Info
              </h3>
              <div className="space-y-5">
                <div className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <MapPin className="h-6 w-6 text-yellow-300 mt-1 flex-shrink-0" />
                  <span className="text-orange-100 text-base leading-relaxed">
                    123 Education Street
                    <br />
                    Learning City, LC 12345
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Phone className="h-6 w-6 text-yellow-300 flex-shrink-0" />
                  <span className="text-orange-100 text-base font-semibold">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Mail className="h-6 w-6 text-yellow-300 flex-shrink-0" />
                  <span className="text-orange-100 text-base font-semibold">
                    info@eduverse.edu
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="footer-item mt-20 pt-10 border-t-2 border-white/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex items-center space-x-3 text-center md:text-left">
                <p className="text-orange-100 text-base">
                  © 2024 EduVerse Academy. All rights reserved. Made with
                </p>
                <Heart className="h-5 w-5 text-red-400 animate-pulse" />
                <p className="text-orange-100 text-base">for education.</p>
              </div>
              <div className="flex items-center space-x-8">
                <a
                  href="#"
                  className="text-orange-100 hover:text-white text-base transition-colors font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-orange-100 hover:text-white text-base transition-colors font-semibold hover:underline"
                >
                  Terms of Service
                </a>
                <button
                  onClick={scrollToTop}
                  className="p-3 bg-white/25 backdrop-blur-sm rounded-2xl text-white hover:bg-white/40 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Newsletter Section */}
        <div className="newsletter-section bg-white/15 backdrop-blur-lg border-t-2 border-white/30">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="footer-item text-center max-w-4xl mx-auto">
              <h3 className="font-display font-black text-4xl text-white mb-4 flex items-center justify-center">
                <Send className="h-8 w-8 mr-3 text-yellow-300" />
                Stay Updated with EduVerse! 📧
              </h3>
              <p className="text-orange-100 text-xl mb-8 leading-relaxed">
                Subscribe to our newsletter for the latest updates on courses,
                events, and educational opportunities that will transform your
                future! ✨
              </p>
              <div className="newsletter-form flex flex-col sm:flex-row gap-6 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white placeholder-orange-200 focus:outline-none focus:ring-4 focus:ring-white/50 text-base font-medium"
                />
                <button className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-black text-base hover:bg-orange-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                  Subscribe Now! 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
