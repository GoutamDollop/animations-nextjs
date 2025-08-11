import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let isVisible = false;

    // Animation frame for smooth performance
    let animationId: number;
    let followerX = 0;
    let followerY = 0;

    const updateCursor = () => {
      if (cursor && follower && isVisible) {
        // Smooth following animation for follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        // Direct positioning for main cursor
        cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        follower.style.transform = `translate3d(${followerX - 16}px, ${followerY - 16}px, 0)`;

        // Scale and color changes for hovering
        if (isHovering) {
          cursor.style.transform += " scale(1.5)";
          follower.style.transform += " scale(1.5)";
          follower.style.borderColor = "#ef4444";
          cursor.style.backgroundColor = "#ef4444";
        } else {
          follower.style.borderColor = "#f97316";
          cursor.style.backgroundColor = "#f97316";
        }
      }

      animationId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Use clientX/Y for viewport-relative positioning
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (cursor) {
          cursor.style.opacity = "1";
          cursor.style.visibility = "visible";
        }
        if (follower) {
          follower.style.opacity = "0.6";
          follower.style.visibility = "visible";
        }
      }
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      // Enhanced hover detection for more elements
      if (target && (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive-btn') ||
        target.classList.contains('enhanced-btn') ||
        target.classList.contains('nav-item') ||
        target.classList.contains('mobile-nav-item') ||
        target.classList.contains('form-field') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      )) {
        isHovering = true;
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Only hide if mouse leaves the document
      if (!e.relatedTarget) {
        isVisible = false;
        if (cursor) {
          cursor.style.opacity = "0";
          cursor.style.visibility = "hidden";
        }
        if (follower) {
          follower.style.opacity = "0";
          follower.style.visibility = "hidden";
        }
      }
    };

    const handleMouseOver = () => {
      isVisible = true;
      if (cursor) {
        cursor.style.opacity = "1";
        cursor.style.visibility = "visible";
      }
      if (follower) {
        follower.style.opacity = "0.6";
        follower.style.visibility = "visible";
      }
    };

    // Start the animation loop
    updateCursor();

    // Global event listeners for all interactions
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true, capture: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true, capture: true });

    // Enhanced interactive elements detection
    const setupInteractiveElements = () => {
      const selectors = [
        'a', 'button', '[role="button"]', 'input', 'textarea', 'select',
        '.interactive-btn', '.enhanced-btn', '.nav-item', '.mobile-nav-item',
        '.form-field', '.gallery-item', '.testimonial-card', '.event-card',
        '.course-card', '.teacher-card', '.student-card', '.stat-card',
        '.feature-card', '.hover-image', '[data-cursor="pointer"]'
      ];

      const elements = document.querySelectorAll(selectors.join(', '));

      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      });

      return elements;
    };

    // Initial setup and periodic updates for dynamic content
    let interactiveElements = setupInteractiveElements();
    
    const updateInterval = setInterval(() => {
      // Remove old listeners
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      // Setup new ones
      interactiveElements = setupInteractiveElements();
    }, 3000);

    // Handle scroll events specifically
    const handleScroll = () => {
      // Cursor continues to work during scroll without any special handling needed
      // since we're using viewport coordinates
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // Cleanup
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      clearInterval(updateInterval);
      
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      window.removeEventListener("scroll", handleScroll);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });

      isInitialized.current = false;
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] opacity-0 invisible transition-all duration-150 ease-out hidden lg:block"
        style={{ 
          willChange: 'transform, opacity',
          backgroundColor: '#f97316',
          mixBlendMode: 'difference'
        }}
      />

      {/* Cursor follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-[9998] opacity-0 invisible transition-all duration-300 ease-out hidden lg:block"
        style={{ 
          willChange: 'transform, opacity, border-color',
          borderColor: '#f97316'
        }}
      />
    </>
  );
}
