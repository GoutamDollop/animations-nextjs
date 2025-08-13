import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowUp,
  Heart,
  Star,
  Award,
  BookOpen,
  Users,
  Calendar,
  MessageSquare,
  Send,
  Shield,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useSmoothScroll } from "../components/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  academics: [
    { label: "All Courses", href: "/courses" },
    { label: "Admissions", href: "/admissions" },
    { label: "Faculty", href: "/teachers" },
    { label: "Academic Calendar", href: "/calendar" },
    { label: "Library", href: "/library" },
    { label: "Research", href: "/research" },
  ],
  campus: [
    { label: "Campus Life", href: "/campus-life" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Sports", href: "/sports" },
    { label: "Clubs", href: "/clubs" },
    { label: "Housing", href: "/housing" },
  ],
  support: [
    { label: "Student Support", href: "/support" },
    { label: "Career Services", href: "/careers" },
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Tech Support", href: "/tech-support" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  about: [
    { label: "About Us", href: "/about" },
    { label: "Mission & Vision", href: "/about#mission" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "News", href: "/news" },
    { label: "Careers", href: "/careers" },
  ],
};

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
    color: "hover:text-blue-600",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "hover:text-sky-500",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "hover:text-pink-600",
  },
  {
    icon: Youtube,
    href: "https://youtube.com",
    label: "YouTube",
    color: "hover:text-red-600",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "hover:text-blue-700",
  },
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Campus Address",
    details: ["123 Education Street", "Academic City, AC 12345"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    details: ["info@eduverse.edu", "admissions@eduverse.edu"],
  },
];

export default function ModernFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (!footerRef.current) return;

    // Force immediate visibility
    const footerSections = footerRef.current.querySelectorAll('.footer-section');
    footerSections.forEach((section) => {
      (section as HTMLElement).style.opacity = '1';
      (section as HTMLElement).style.transform = 'translateY(0)';
    });

    const ctx = gsap.context(() => {
      // Subtle footer entrance animation with immediate visibility
      gsap.set(".footer-section", { opacity: 1, y: 0 });
      
      gsap.fromTo(
        ".footer-section",
        { y: 10, opacity: 0.9 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power1.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      // Logo animation
      gsap.fromTo(
        ".footer-logo",
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Social icons animation
      gsap.fromTo(
        ".social-icon",
        { scale: 0, rotation: 180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".social-icons",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Newsletter form animation
      gsap.fromTo(
        ".newsletter-form",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".newsletter-form",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating elements
      gsap.to(".floating-element", {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <footer
      ref={footerRef}
      data-section="footer"
      className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
        <div className="floating-element absolute bottom-40 right-32 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        <div className="floating-element absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-2xl"></div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-8 relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="footer-section lg:col-span-1">
            <div className="footer-logo flex items-center space-x-3 mb-6">
              <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <GraduationCap className="w-10 h-10 text-white absolute inset-0 m-auto" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">EduVerse</div>
                <div className="text-cyan-400 font-semibold">Academy</div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              Empowering minds, shaping futures, and creating tomorrow's leaders
              through excellence in education since 2008.
            </p>

            {/* Awards/Certifications */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Accredited</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">5-Star Rated</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="social-icons">
              <p className="text-gray-400 mb-4 font-semibold">Follow Us</p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 transform hover:scale-110 hover:bg-white/20`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Academics</span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.academics.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-lg hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Campus Life</span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.campus.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-lg hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-pink-400" />
              <span>Support</span>
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-lg hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Newsletter section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pt-12 border-t border-white/10">
          {/* Contact Information */}
          <div className="footer-section">
            <h3 className="text-2xl font-bold mb-8 flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-cyan-400" />
              <span>Get In Touch</span>
            </h3>
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      {contact.title}
                    </h4>
                    {contact.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-300 text-lg">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="text-2xl font-bold mb-8 flex items-center space-x-2">
              <Send className="w-6 h-6 text-purple-400" />
              <span>Stay Connected</span>
            </h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Subscribe to our newsletter for the latest updates on admissions,
              events, and academic achievements.
            </p>

            <form className="newsletter-form space-y-4">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">15+</div>
                <div className="text-gray-400 text-sm">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">2.5K+</div>
                <div className="text-gray-400 text-sm">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">98%</div>
                <div className="text-gray-400 text-sm">Success</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-section pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 EduVerse Academy. Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for education.</span>
            </div>

            {/* Legal links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1"
              >
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1"
              >
                <FileText className="w-4 h-4" />
                <span>Terms of Service</span>
              </Link>
              <Link
                to="/accessibility"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Accessibility
              </Link>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
