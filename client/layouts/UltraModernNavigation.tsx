import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import {
  Menu,
  X,
  GraduationCap,
  Home,
  Info,
  BookOpen,
  Users,
  Calendar,
  Image,
  MessageSquare,
  Phone,
  ChevronDown,
  Sparkles,
  ChevronRight,
  Award,
  Globe,
  Star
} from 'lucide-react';
import { useSmoothScroll } from '../components/SmoothScrollProvider';

const UltraModernNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const { scrollTo } = useSmoothScroll();
  const navRef = useRef<HTMLElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  const navItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: Home,
      description: 'Welcome to EduVerse'
    },
    { 
      name: 'About', 
      href: '/about', 
      icon: Info,
      description: 'Our story and mission',
      dropdown: [
        { name: 'Our Story', href: '/about#story', description: 'Learn about our journey', icon: Star },
        { name: 'Mission & Vision', href: '/about#mission', description: 'Our educational philosophy', icon: Globe },
        { name: 'Leadership', href: '/about#leadership', description: 'Meet our team', icon: Award }
      ]
    },
    { 
      name: 'Programs', 
      href: '/courses', 
      icon: BookOpen,
      description: 'Academic excellence',
      dropdown: [
        { name: 'All Courses', href: '/courses', description: 'Explore our curriculum', icon: BookOpen },
        { name: 'Faculty', href: '/teachers', description: 'Meet our educators', icon: Users },
        { name: 'Research', href: '/research', description: 'Innovation & discovery', icon: Sparkles }
      ]
    },
    { 
      name: 'Campus', 
      href: '/events', 
      icon: Calendar,
      description: 'Life at EduVerse',
      dropdown: [
        { name: 'Events', href: '/events', description: 'Upcoming activities', icon: Calendar },
        { name: 'Gallery', href: '/gallery', description: 'Campus moments', icon: Image },
        { name: 'Testimonials', href: '/testimonials', description: 'Student voices', icon: MessageSquare }
      ]
    },
    { 
      name: 'Contact', 
      href: '/contact', 
      icon: Phone,
      description: 'Get in touch'
    }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Initial animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMobileMenu = useCallback(() => {
    if (isAnimating) return; // Prevent multiple triggers
    
    setIsAnimating(true);
    setIsOpen(prev => !prev);
    
    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    // Reset animation state after animation completes
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }, [isAnimating]);

  const handleDropdownEnter = useCallback((itemName: string) => {
    setActiveDropdown(itemName);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const handleMobileDropdownToggle = useCallback((itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  }, [activeDropdown]);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl py-1 sm:py-2' 
            : 'bg-white/5 backdrop-blur-md py-2 sm:py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group relative z-10">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </motion.div>
              
              <div className="hidden sm:block">
                <motion.div 
                  className={`text-lg sm:text-xl md:text-2xl font-black transition-colors duration-300 ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  EduVerse
                </motion.div>
                <div className={`text-xs md:text-sm font-medium ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
                  Academy
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    to={item.href}
                    className={`group relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      location.pathname === item.href
                        ? scrolled 
                          ? 'text-blue-600 bg-blue-50 shadow-md' 
                          : 'text-white bg-white/20 shadow-lg'
                        : scrolled
                          ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                          : 'text-white/90 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <span className="whitespace-nowrap">{item.name}</span>
                    {item.dropdown && (
                      <motion.div
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    )}
                  </Link>

                  {/* Desktop Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 overflow-hidden"
                      >
                        {item.dropdown.map((subItem, index) => (
                          <motion.div
                            key={subItem.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={subItem.href}
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-all duration-200 group"
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                                <subItem.icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {subItem.name}
                                </div>
                                <div className="text-sm text-gray-500 mt-0.5">
                                  {subItem.description}
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="relative group inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <Sparkles className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Enroll Now</span>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              disabled={isAnimating}
              className={`lg:hidden relative p-2 rounded-xl transition-colors duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              } ${isAnimating ? 'opacity-50' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                duration: 0.5 
              }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-gray-900">EduVerse</div>
                      <div className="text-xs text-gray-600">Academy</div>
                    </div>
                  </div>
                  <motion.button
                    onClick={closeMobileMenu}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="mobile-nav-item"
                      >
                        <div
                          className={`flex items-center justify-between px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                            location.pathname === item.href
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Link
                            to={item.href}
                            className="flex items-center space-x-3 flex-1"
                            onClick={() => !item.dropdown && closeMobileMenu()}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                location.pathname === item.href
                                  ? 'bg-blue-100'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <item.icon className="w-4 h-4" />
                            </motion.div>
                            <div className="flex-1">
                              <div className="font-semibold text-sm">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.description}</div>
                            </div>
                          </Link>
                          
                          {item.dropdown && (
                            <motion.button
                              onClick={() => handleMobileDropdownToggle(item.name)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <motion.div
                                animate={{ rotate: activeDropdown === item.name ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </motion.div>
                            </motion.button>
                          )}
                        </div>

                        {/* Mobile Dropdown */}
                        <AnimatePresence>
                          {item.dropdown && activeDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 mt-2 space-y-1 border-l-2 border-blue-100 pl-3">
                                {item.dropdown.map((subItem, subIndex) => (
                                  <motion.div
                                    key={subItem.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: subIndex * 0.1 }}
                                  >
                                    <Link
                                      to={subItem.href}
                                      onClick={closeMobileMenu}
                                      className="flex items-center space-x-3 px-2 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                      <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <subItem.icon className="w-3 h-3 text-blue-600" />
                                      </div>
                                      <div>
                                        <div className="font-medium">{subItem.name}</div>
                                        <div className="text-xs text-gray-500">{subItem.description}</div>
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/contact"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Enroll Now</span>
                    </Link>
                  </motion.div>
                  
                  {/* Quick Stats */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-3 gap-3 mt-3 text-center"
                  >
                    <div>
                      <div className="text-sm font-bold text-gray-900">15+</div>
                      <div className="text-xs text-gray-600">Years</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">2.5K+</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">98%</div>
                      <div className="text-xs text-gray-600">Success</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default UltraModernNavigation;
