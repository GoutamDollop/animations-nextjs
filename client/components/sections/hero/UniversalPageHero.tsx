import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface UniversalPageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  className?: string;
}

export default function UniversalPageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  breadcrumbs,
  badge,
  className = '',
}: UniversalPageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Generate breadcrumbs from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/', isActive: location.pathname === '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Capitalize and format segment
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isActive: isLast
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbItems = breadcrumbs || generateBreadcrumbs();

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(['.hero-badge', '.hero-title', '.hero-subtitle', '.hero-description', '.hero-breadcrumbs'], {
        opacity: 0,
        y: 60,
      });

      // Create animation timeline
      const tl = gsap.timeline({ delay: 0.2 });

      // Animate elements in sequence
      tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to('.hero-title', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4')
        .to('.hero-subtitle', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.3')
        .to('.hero-description', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.2')
        .to('.hero-breadcrumbs', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.2');

      // Floating animation for background elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const defaultBackgroundImage = "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  return (
    <section
      ref={heroRef}
      className={`relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage || defaultBackgroundImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-purple-900/90" />
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl" />
        <div className="floating-element absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-lg" />
        <div className="floating-element absolute bottom-40 left-32 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl" />
        <div className="floating-element absolute bottom-60 right-40 w-16 h-16 bg-gradient-to-br from-green-400/25 to-emerald-400/25 rounded-full blur-md" />

        {/* Particle effect */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <div className="hero-badge inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              {badge.icon}
              <span className="text-white/90 font-semibold text-sm">
                {badge.text}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <div className="hero-subtitle text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">
              {subtitle}
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="hero-description text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              {description}
            </p>
          )}

          {/* Breadcrumbs */}
          <nav className="hero-breadcrumbs">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/20">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumbItems.map((item, index) => (
                  <li key={item.path} className="flex items-center">
                    {index > 0 && (
                      <ChevronRight className="w-4 h-4 text-white/40 mx-2 flex-shrink-0" />
                    )}
                    
                    {item.isActive ? (
                      <span className="text-cyan-400 font-medium cursor-default flex items-center">
                        {index === 0 && <Home className="w-4 h-4 mr-1 flex-shrink-0" />}
                        <span className="truncate">{item.label}</span>
                      </span>
                    ) : (
                      <Link
                        to={item.path}
                        className="text-white/70 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        {index === 0 && (
                          <Home className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                        )}
                        <span className="truncate hover:underline">{item.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
