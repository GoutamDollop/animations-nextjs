import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  Send,
  Shield,
  FileText,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useSmoothScroll } from '../components/SmoothScrollProvider';

gsap.registerPlugin(ScrollTrigger);

const UltraModernFooter = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const isInView = useInView(footerRef, { once: true });

  const quickLinks = {
    academics: [
      { label: 'All Courses', href: '/courses' },
      { label: 'Faculty', href: '/teachers' },
      { label: 'Admissions', href: '/admissions' },
      { label: 'Academic Calendar', href: '/calendar' },
      { label: 'Library', href: '/library' },
      { label: 'Research', href: '/research' }
    ],
    campus: [
      { label: 'Campus Life', href: '/campus' },
      { label: 'Events', href: '/events' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Sports', href: '/sports' },
      { label: 'Student Clubs', href: '/clubs' },
      { label: 'Testimonials', href: '/testimonials' }
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Career Services', href: '/careers' },
      { label: 'Alumni Network', href: '/alumni' },
      { label: 'Scholarships', href: '/scholarships' },
      { label: 'Tech Support', href: '/tech-support' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' }
  ];

  const stats = [
    { value: '15+', label: 'Years of Excellence', icon: Clock },
    { value: '2,500+', label: 'Students', icon: Users },
    { value: '150+', label: 'Expert Faculty', icon: Award },
    { value: '98%', label: 'Success Rate', icon: TrendingUp }
  ];

  useEffect(() => {
    if (footerRef.current) {
      // Force immediate visibility
      const footerSections = footerRef.current.querySelectorAll('.footer-section');
      footerSections.forEach((section) => {
        (section as HTMLElement).style.opacity = '1';
        (section as HTMLElement).style.transform = 'translateY(0)';
      });

      const ctx = gsap.context(() => {
        // Simplified footer animation with immediate visibility
        gsap.set('.footer-section', { opacity: 1, y: 0 });
        
        gsap.fromTo('.footer-section', 
          { y: 10, opacity: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.4,
            stagger: 0.05,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Floating animation for background elements
        gsap.to('.floating-bg', {
          y: -15,
          duration: 4,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.5
        });

        // Stats counter animation
        gsap.fromTo('.stat-number',
          { innerHTML: 0 },
          {
            innerHTML: (index, target) => target.getAttribute('data-value'),
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            stagger: 0.2,
            scrollTrigger: {
              trigger: '.stats-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }, footerRef);

      return () => ctx.revert();
    }
  }, [isInView]);

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="floating-bg absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl"></div>
        <div className="floating-bg absolute bottom-40 right-32 w-32 h-32 bg-gradient-to-br from-purple-400/40 to-pink-400/40 rounded-full blur-2xl"></div>
        <div className="floating-bg absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-400/25 to-red-400/25 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 pt-16 pb-8">
          
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
            
            {/* Brand Section */}
            <motion.div 
              className="footer-section lg:col-span-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Link to="/" className="flex items-center space-x-3 group">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <GraduationCap className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.div 
                      className="text-2xl font-black text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      EduVerse
                    </motion.div>
                    <div className="text-cyan-400 font-semibold">Academy</div>
                  </div>
                </Link>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                Shaping the future through innovative education. Join us on a journey of 
                discovery, growth, and excellence that will transform your potential into achievement.
              </p>

              {/* Achievement Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <motion.div 
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">Accredited</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">5-Star Rated</span>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>Connect With Us</span>
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Academics */}
              <motion.div 
                className="footer-section"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>Academics</span>
                </h3>
                <div className="space-y-3">
                  {quickLinks.academics.map((link, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-lg block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Campus Life */}
              <motion.div 
                className="footer-section"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>Campus Life</span>
                </h3>
                <div className="space-y-3">
                  {quickLinks.campus.map((link, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-lg block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Support */}
              <motion.div 
                className="footer-section"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-pink-400" />
                  <span>Support</span>
                </h3>
                <div className="space-y-3">
                  {quickLinks.support.map((link, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Link
                        to={link.href}
                        className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-lg block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>


          {/* Bottom Section */}
          <motion.div 
            className="footer-section flex flex-col lg:flex-row items-center justify-between pt-8 border-t border-white/10 space-y-6 lg:space-y-0"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 EduVerse Academy. Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
              <span>for education.</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Privacy</span>
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Terms</span>
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors duration-200">
                Accessibility
              </Link>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default UltraModernFooter;
