import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let isVisible = false;

    // Throttled mouse move handler for better performance
    let animationId: number;

    const updateCursor = () => {
      if (cursor && follower && isVisible) {
        // Use fixed positioning which is relative to viewport
        cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        follower.style.transform = `translate3d(${mouseX - 16}px, ${mouseY - 16}px, 0)`;

        if (isHovering) {
          cursor.style.transform += " scale(1.5)";
          follower.style.transform += " scale(1.5)";
          follower.style.borderColor = "#ef4444";
        } else {
          follower.style.borderColor = "#f97316";
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Use clientX and clientY for fixed positioning
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (cursor) cursor.style.opacity = "1";
        if (follower) follower.style.opacity = "0.6";
      }

      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(updateCursor);
    };

    const handleMouseEnter = () => {
      isHovering = true;
      updateCursor();
    };

    const handleMouseLeave = () => {
      isHovering = false;
      updateCursor();
    };

    const handleMouseOut = () => {
      isVisible = false;
      if (cursor) cursor.style.opacity = "0";
      if (follower) follower.style.opacity = "0";
    };

    const handleMouseOver = () => {
      isVisible = true;
      if (cursor) cursor.style.opacity = "1";
      if (follower) follower.style.opacity = "0.6";
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    // Add hover effects to interactive elements
    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], .interactive-btn, .hover-image, .stat-card, .feature-card, .enhanced-btn, .nav-item, .mobile-nav-item, .form-field input, .form-field textarea, .form-field select, .gallery-item, .testimonial-card, .event-card, .course-card, .teacher-card, .student-card',
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      });

      return interactiveElements;
    };

    let interactiveElements = updateInteractiveElements();

    // Update interactive elements periodically for dynamic content
    const elementUpdateInterval = setInterval(() => {
      // Remove old listeners
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      // Add new listeners
      interactiveElements = updateInteractiveElements();
    }, 2000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseover", handleMouseOver);

      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      if (elementUpdateInterval) {
        clearInterval(elementUpdateInterval);
      }

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full pointer-events-none z-[9999] opacity-0 transition-all duration-150 ease-out hidden lg:block"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Cursor follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-orange-500 rounded-full pointer-events-none z-[9998] opacity-0 transition-all duration-300 ease-out hidden lg:block"
        style={{ willChange: "transform, opacity, border-color" }}
      />
    </>
  );
}
