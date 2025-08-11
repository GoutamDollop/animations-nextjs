import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  GraduationCap,
  Star,
  ChevronRight
} from 'lucide-react';
import HeroBackground from '../components/HeroBackground';

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal animations
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(
        titleRef.current?.children || [],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.2'
      );

      // Section animations
      gsap.utils.toArray('.section-animate').forEach((section: any) => {
        gsap.fromTo(
          section.children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Floating animations for stats
      gsap.utils.toArray('.stat-card').forEach((card: any, index) => {
        gsap.to(card, {
          y: -20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: index * 0.2
        });
      });

      // Button hover animations
      document.querySelectorAll('.btn-hover').forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '5000+', label: 'Students', icon: Users },
    { number: '200+', label: 'Faculty', icon: GraduationCap },
    { number: '50+', label: 'Programs', icon: BookOpen },
    { number: '98%', label: 'Success Rate', icon: Award },
  ];

  const features = [
    {
      title: 'World-Class Education',
      description: 'Experience cutting-edge curriculum designed by industry experts',
      icon: BookOpen,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Expert Faculty',
      description: 'Learn from renowned professors and industry professionals',
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Modern Facilities',
      description: 'State-of-the-art labs, libraries, and recreational spaces',
      icon: Award,
      color: 'from-pink-500 to-red-600'
    },
    {
      title: 'Global Network',
      description: 'Connect with alumni and partners worldwide',
      icon: Calendar,
      color: 'from-red-500 to-orange-600'
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        
        <div className="container mx-auto px-4 lg:px-8 text-center z-10">
          <div ref={titleRef} className="space-y-4 mb-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 text-primary font-medium text-sm">
              <Star className="h-4 w-4" />
              <span>Welcome to EduVerse</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Shaping
              </span>
              <span className="block bg-gradient-to-r from-accent via-warning to-success bg-clip-text text-transparent">
                Tomorrow's
              </span>
              <span className="block bg-gradient-to-r from-success via-primary to-secondary bg-clip-text text-transparent">
                Leaders
              </span>
            </h1>
          </div>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Discover excellence in education with our innovative programs, world-class faculty, and vibrant campus community.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="btn-hover inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Explore Courses</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link
              to="/about"
              className="btn-hover inline-flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-muted transition-all duration-300"
            >
              <span>Learn More</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-animate py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card text-center p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-border shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-animate py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">EduVerse</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience education reimagined with cutting-edge technology, expert guidance, and endless opportunities for growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-background rounded-2xl border border-border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-animate py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Ready to Start Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Journey</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of students who have transformed their lives through our innovative educational programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-hover inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/events"
              className="btn-hover inline-flex items-center space-x-2 bg-background border border-border text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-muted transition-all duration-300"
            >
              <span>Upcoming Events</span>
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
