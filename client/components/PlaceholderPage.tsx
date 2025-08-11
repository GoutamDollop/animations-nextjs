import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export default function PlaceholderPage({ title, description, comingSoon = true }: PlaceholderPageProps) {
  useEffect(() => {
    gsap.fromTo(
      '.placeholder-content',
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', stagger: 0.2 }
    );
  }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-24 flex items-center justify-center">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Icon */}
          <div className="placeholder-content">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl mb-6">
              <Construction className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div className="placeholder-content">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="placeholder-content">
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Coming Soon Badge */}
          {comingSoon && (
            <div className="placeholder-content">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-warning/20 rounded-full px-6 py-3 mb-8">
                <div className="w-2 h-2 bg-gradient-to-r from-accent to-warning rounded-full animate-pulse"></div>
                <span className="font-semibold text-foreground">Coming Soon</span>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="placeholder-content">
            <p className="text-muted-foreground mb-8">
              This page is currently under development. Please continue exploring other sections of our website or contact us for more information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-background border border-border text-foreground px-6 py-3 rounded-xl font-semibold hover:bg-muted transform hover:scale-105 transition-all duration-300"
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
