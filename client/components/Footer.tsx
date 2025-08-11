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
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  useEffect(() => {
    // Animate footer elements when they come into view
    gsap.fromTo(
      ".footer-item",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-container",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <footer className="footer-container bg-gradient-to-br from-muted/50 to-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="footer-item space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl transform transition-transform group-hover:scale-110">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="font-display font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EduVerse
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering minds, shaping futures. Join us in creating tomorrow's
              leaders through innovative education and boundless opportunities.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["About Us", "Courses", "Events", "Gallery", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "")}`}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Academic */}
          <div className="footer-item space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">
              Academic
            </h3>
            <ul className="space-y-2">
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
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-item space-y-4">
            <h3 className="font-display font-semibold text-lg text-foreground">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Education Street
                  <br />
                  Learning City, LC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  info@eduverse.edu
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © 2024 EduVerse. All rights reserved. Designed with ❤️ for
              education.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
