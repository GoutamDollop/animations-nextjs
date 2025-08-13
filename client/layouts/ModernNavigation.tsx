import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  Image,
  MessageSquare,
  Phone,
  Info,
} from "lucide-react";
import { useSmoothScroll } from "../components/SmoothScrollProvider";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  dropdown?: SubNavItem[];
}

interface SubNavItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    label: "About",
    href: "/about",
    icon: <Info className="w-4 h-4" />,
    dropdown: [
      {
        label: "Our Story",
        href: "/about#story",
        description: "Learn about our journey and mission",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        label: "Leadership",
        href: "/about#leadership",
        description: "Meet our leadership team",
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Academic",
    href: "/courses",
    icon: <BookOpen className="w-4 h-4" />,
    dropdown: [
      {
        label: "All Courses",
        href: "/courses",
        description: "Browse our complete course catalog",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        label: "Faculty",
        href: "/teachers",
        description: "Meet our expert educators",
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Campus Life",
    href: "/events",
    icon: <Calendar className="w-4 h-4" />,
    dropdown: [
      {
        label: "Events",
        href: "/events",
        description: "Upcoming campus events",
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        label: "Gallery",
        href: "/gallery",
        description: "Campus photo gallery",
        icon: <Image className="w-4 h-4" />,
      },
      {
        label: "Student Stories",
        href: "/testimonials",
        description: "Hear from our students",
        icon: <MessageSquare className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    icon: <Phone className="w-4 h-4" />,
  },
];

export default function ModernNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollTo } = useSmoothScroll();

  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Animation on mount
  useEffect(() => {
    if (navRef.current && logoRef.current && menuRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          logoRef.current,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4",
        )
        .fromTo(
          menuRef.current.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          "-=0.2",
        );
    }
  }, []);

  // Handle dropdown animations
  const showDropdown = (itemLabel: string) => {
    setActiveDropdown(itemLabel);
    const dropdown = dropdownRefs.current[itemLabel];
    if (dropdown) {
      gsap.fromTo(
        dropdown,
        {
          opacity: 0,
          y: -20,
          scale: 0.95,
          rotationX: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
      );

      gsap.fromTo(
        dropdown.children,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.1,
        },
      );
    }
  };

  const hideDropdown = (itemLabel: string) => {
    const dropdown = dropdownRefs.current[itemLabel];
    if (dropdown) {
      gsap.to(dropdown, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setActiveDropdown(null),
      });
    }
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (mobileMenuRef.current) {
      if (!isMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, x: "100%" },
          { opacity: 1, x: "0%", duration: 0.4, ease: "power3.out" },
        );

        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll(".mobile-nav-item"),
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2,
          },
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          x: "100%",
          duration: 0.3,
          ease: "power3.in",
        });
      }
    }
  };

  // Handle navigation click
  const handleNavClick = (href: string) => {
    if (href.includes("#")) {
      const [path, anchor] = href.split("#");
      if (path === location.pathname || path === "") {
        const element = document.getElementById(anchor);
        if (element) {
          scrollTo(element);
        }
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-2"
            : "bg-white/10 backdrop-blur-md shadow-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div
                ref={logoRef}
                className="relative w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <GraduationCap className="w-7 h-7 text-white absolute inset-0 m-auto" />
              </div>
              <div className="hidden sm:block">
                <div
                  className={`text-xl font-bold transition-colors duration-300 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  EduVerse
                </div>
                <div
                  className={`text-sm transition-colors duration-300 ${
                    isScrolled ? "text-gray-600" : "text-white/80"
                  }`}
                >
                  Academy
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div
              ref={menuRef}
              className="hidden lg:flex items-center space-x-1"
            >
              {navigationItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.dropdown && showDropdown(item.label)}
                  onMouseLeave={() => item.dropdown && hideDropdown(item.label)}
                >
                  {item.dropdown ? (
                    <button
                      className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 group-hover:bg-white/10 group-hover:backdrop-blur-sm ${
                        isScrolled
                          ? "text-gray-700 hover:text-blue-600"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                        location.pathname === item.href
                          ? isScrolled
                            ? "text-blue-600 bg-blue-50"
                            : "text-white bg-white/20"
                          : isScrolled
                            ? "text-gray-700 hover:text-blue-600"
                            : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div
                      ref={(el) => (dropdownRefs.current[item.label] = el)}
                      className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 opacity-0"
                      style={{ perspective: "1000px" }}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          onClick={() => handleNavClick(subItem.href)}
                          className="flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200 group"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            {subItem.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {subItem.label}
                            </div>
                            {subItem.description && (
                              <div className="text-sm text-gray-500 mt-1">
                                {subItem.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Get Started</span>
                <div className="relative ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden p-2 rounded-xl transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    EduVerse
                  </div>
                  <div className="text-sm text-gray-600">Academy</div>
                </div>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.label} className="mobile-nav-item">
                  <Link
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>

                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          onClick={() => handleNavClick(subItem.href)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          {subItem.icon}
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
