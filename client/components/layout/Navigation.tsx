import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, GraduationCap, Sparkles, ChevronDown } from 'lucide-react';
import { createMagneticEffect } from '../../animations/utils/animationUtils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    setIsScrolled(currentScrollY > 50);
    
    // Hide/show navbar based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  });

  useEffect(() => {
    if (logoRef.current) {
      createMagneticEffect(logoRef.current, 0.2);
    }
    if (ctaButtonRef.current) {
      createMagneticEffect(ctaButtonRef.current, 0.3);
    }
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-purple-200/30' 
          : 'bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 backdrop-blur-sm'
      }`}
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0)'
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            ref={logoRef} 
            className="cursor-hover flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor="magnetic"
            data-cursor-text="Home"
          >
            <motion.div 
              className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${
                isScrolled 
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 shadow-lg' 
                  : 'bg-white/20 backdrop-blur-sm border border-white/30'
              }`}
              whileHover={{ 
                rotate: [0, -5, 5, 0],
                boxShadow: isScrolled 
                  ? "0 20px 40px -12px rgba(147, 51, 234, 0.4)" 
                  : "0 10px 30px -12px rgba(255, 255, 255, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-7 h-7 text-white" />
              </motion.div>
              <AnimatePresence>
                {!isScrolled && (
                  <motion.div 
                    className="absolute -top-1 -right-1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <div>
              <span className={`text-xl font-bold transition-colors duration-500 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                EduVerse
              </span>
              <div className={`text-xs font-medium transition-colors duration-500 ${
                isScrolled ? 'text-purple-600' : 'text-purple-200'
              }`}>
                Academy
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  to={link.path}
                  className={`cursor-hover relative px-4 py-2 rounded-xl font-medium group block ${
                    location.pathname === link.path
                      ? isScrolled
                        ? 'text-purple-600 bg-purple-50 shadow-sm'
                        : 'text-white bg-white/20 backdrop-blur-sm'
                      : isScrolled
                        ? 'text-gray-700 hover:text-purple-600'
                        : 'text-gray-200 hover:text-white'
                  }`}
                  data-cursor="hover"
                  data-cursor-text={link.name}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.name}
                  </motion.span>
                  
                  {/* Hover background */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl ${
                      isScrolled ? 'bg-purple-50' : 'bg-white/10'
                    }`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Active indicator */}
                  <AnimatePresence>
                    {location.pathname === link.path && (
                      <motion.div 
                        className={`absolute bottom-0 left-1/2 w-1 h-1 rounded-full ${
                          isScrolled ? 'bg-purple-600' : 'bg-white'
                        }`}
                        initial={{ scale: 0, x: '-50%' }}
                        animate={{ scale: 1, x: '-50%' }}
                        exit={{ scale: 0, x: '-50%' }}
                        layoutId="activeIndicator"
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button 
              ref={ctaButtonRef}
              className={`cursor-hover relative px-6 py-3 rounded-full font-semibold overflow-hidden group ${
                isScrolled
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white'
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: isScrolled 
                  ? "0 20px 40px -12px rgba(147, 51, 234, 0.4)" 
                  : "0 10px 30px -12px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              data-cursor="button"
              data-cursor-text="Join Now!"
            >
              <motion.span 
                className="relative z-10 flex items-center"
                whileHover={{ y: -1 }}
              >
                Get Started
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="ml-2 w-4 h-4" />
                </motion.div>
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-600"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              onClick={toggleMobileMenu}
              className={`cursor-hover p-3 rounded-xl ${
                isScrolled 
                  ? 'text-gray-700 bg-gray-50' 
                  : 'text-white bg-white/10 backdrop-blur-sm'
              }`}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: isScrolled ? 'rgba(243, 244, 246, 1)' : 'rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
              data-cursor="button"
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
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium relative overflow-hidden ${
                      location.pathname === link.path
                        ? 'text-purple-600 bg-purple-50 shadow-sm'
                        : 'text-gray-700'
                    }`}
                    data-cursor="hover"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.name}
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-purple-50"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }}
              >
                <motion.button 
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white font-semibold rounded-xl flex items-center justify-center overflow-hidden relative"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px -12px rgba(147, 51, 234, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor="button"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles className="ml-2 w-4 h-4" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-600"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
