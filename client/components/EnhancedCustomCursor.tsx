import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CursorSettings {
  size: number;
  color: string;
  mixBlendMode: string;
  trailLength: number;
}

const cursorThemes = {
  light: {
    size: 8,
    color: "#f97316",
    mixBlendMode: "difference",
    trailLength: 20,
  },
  dark: {
    size: 8,
    color: "#60a5fa",
    mixBlendMode: "difference",
    trailLength: 20,
  },
  interactive: {
    size: 16,
    color: "#ef4444",
    mixBlendMode: "multiply",
    trailLength: 15,
  },
};

export default function EnhancedCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement[]>([]);
  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof cursorThemes>("light");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trail = trailRef.current;

    if (!cursor || !follower || !trail) return;

    let mouseX = 0;
    let mouseY = 0;
    let isVisible = false;
    let scrollTimeout: NodeJS.Timeout;

    // Animation frame for smooth performance
    let animationId: number;
    let followerX = 0;
    let followerY = 0;

    // Trail system
    const trailPoints: { x: number; y: number; age: number }[] = [];
    const maxTrailPoints = cursorThemes[currentTheme].trailLength;

    // Sparkle system
    const sparkles: {
      element: HTMLDivElement;
      x: number;
      y: number;
      life: number;
    }[] = [];

    const updateCursor = () => {
      if (cursor && follower && trail && isVisible) {
        // Smooth following animation for follower
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        // Direct positioning for main cursor with fixed positioning
        cursor.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        cursor.style.position = "fixed";
        cursor.style.zIndex = "9999";

        follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;
        follower.style.position = "fixed";
        follower.style.zIndex = "9998";

        // Update trail
        updateTrail();

        // Update sparkles during scroll
        if (isScrolling) {
          updateSparkles();
        }

        // Theme-based effects
        const theme = cursorThemes[currentTheme];

        if (isHovering) {
          cursor.style.transform += " scale(2)";
          follower.style.transform += " scale(1.5)";
          cursor.style.backgroundColor = theme.color;
          follower.style.borderColor = theme.color;
          follower.style.backgroundColor = `${theme.color}20`;
        } else if (isScrolling) {
          cursor.style.transform += " scale(1.5)";
          follower.style.transform += " scale(1.2)";
          cursor.style.backgroundColor = "#8b5cf6";
          follower.style.borderColor = "#8b5cf6";
          follower.style.backgroundColor = "#8b5cf620";
        } else {
          cursor.style.backgroundColor = theme.color;
          follower.style.borderColor = theme.color;
          follower.style.backgroundColor = "transparent";
        }
      }

      animationId = requestAnimationFrame(updateCursor);
    };

    const updateTrail = () => {
      // Add new trail point
      trailPoints.push({ x: mouseX, y: mouseY, age: 0 });

      // Remove old points
      if (trailPoints.length > maxTrailPoints) {
        trailPoints.shift();
      }

      // Update trail visualization
      if (trail) {
        trail.innerHTML = "";
        trailPoints.forEach((point, index) => {
          const trailDot = document.createElement("div");
          const opacity = ((index + 1) / trailPoints.length) * 0.5;
          const size = Math.max(2, ((index + 1) / trailPoints.length) * 6);

          trailDot.style.cssText = `
            position: fixed;
            left: ${point.x - size / 2}px;
            top: ${point.y - size / 2}px;
            width: ${size}px;
            height: ${size}px;
            background: ${cursorThemes[currentTheme].color};
            border-radius: 50%;
            opacity: ${opacity};
            pointer-events: none;
            z-index: 9997;
            mix-blend-mode: ${cursorThemes[currentTheme].mixBlendMode};
          `;

          trail.appendChild(trailDot);
        });
      }
    };

    const createSparkle = () => {
      const sparkle = document.createElement("div");
      const size = Math.random() * 6 + 2;
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;

      sparkle.style.cssText = `
        position: fixed;
        left: ${mouseX + offsetX}px;
        top: ${mouseY + offsetY}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #fbbf24, #f59e0b);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9996;
        opacity: 1;
      `;

      document.body.appendChild(sparkle);

      // Animate sparkle
      gsap.to(sparkle, {
        y: "-=" + (Math.random() * 50 + 20),
        x: "+=" + (Math.random() - 0.5) * 30,
        scale: 0,
        opacity: 0,
        duration: 0.8 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        },
      });
    };

    const updateSparkles = () => {
      // Create sparkles randomly during scroll
      if (Math.random() < 0.3) {
        createSparkle();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Use pageX/Y to account for scroll position
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (cursor) {
          cursor.style.opacity = "1";
          cursor.style.visibility = "visible";
        }
        if (follower) {
          follower.style.opacity = "0.8";
          follower.style.visibility = "visible";
        }
        if (trail) {
          trail.style.opacity = "1";
          trail.style.visibility = "visible";
        }
      }
    };

    const handleScroll = () => {
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set timeout to stop scroll effect
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Create scroll sparkles
      if (Math.random() < 0.7) {
        createSparkle();
      }
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.nodeType === Node.ELEMENT_NODE) {
        const isInteractive =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target.getAttribute && target.getAttribute("role") === "button") ||
          (target.classList &&
            (target.classList.contains("group") ||
              target.classList.contains("interactive-btn") ||
              target.classList.contains("enhanced-btn") ||
              target.classList.contains("nav-item") ||
              target.classList.contains("magnetic") ||
              target.classList.contains("cursor-pointer"))) ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest('[role="button"]') ||
          target.closest(".group") ||
          target.closest(".magnetic");

        if (isInteractive) {
          setIsHovering(true);
          setCurrentTheme("interactive");
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCurrentTheme("light");
    };

    const handleMouseOut = (e: MouseEvent) => {
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
        if (trail) {
          trail.style.opacity = "0";
          trail.style.visibility = "hidden";
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
        follower.style.opacity = "0.8";
        follower.style.visibility = "visible";
      }
      if (trail) {
        trail.style.opacity = "1";
        trail.style.visibility = "visible";
      }
    };

    // Theme detection based on page background
    const detectTheme = () => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      const backgroundColor = computedStyle.backgroundColor;

      // Simple theme detection based on background lightness
      if (backgroundColor.includes("rgb")) {
        const rgbValues = backgroundColor.match(/\d+/g);
        if (rgbValues) {
          const brightness =
            (parseInt(rgbValues[0]) +
              parseInt(rgbValues[1]) +
              parseInt(rgbValues[2])) /
            3;
          setCurrentTheme(brightness > 128 ? "light" : "dark");
        }
      }
    };

    // Start the animation loop
    updateCursor();

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
      capture: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
      capture: true,
    });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Enhanced interactive elements detection
    const setupInteractiveElements = () => {
      const selectors = [
        "a",
        "button",
        '[role="button"]',
        "input",
        "textarea",
        "select",
        ".interactive-btn",
        ".enhanced-btn",
        ".nav-item",
        ".mobile-nav-item",
        ".form-field",
        ".gallery-item",
        ".testimonial-card",
        ".event-card",
        ".course-card",
        ".teacher-card",
        ".student-card",
        ".stat-card",
        ".feature-card",
        ".hover-image",
        ".magnetic",
        '[data-cursor="pointer"]',
      ];

      const elements = document.querySelectorAll(selectors.join(", "));
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      });

      return elements;
    };

    // Initial setup and periodic updates for dynamic content
    let interactiveElements = setupInteractiveElements();
    detectTheme();

    const updateInterval = setInterval(() => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      interactiveElements = setupInteractiveElements();
      detectTheme();
    }, 3000);

    return () => {
      // Cleanup
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
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

      // Clean up sparkles
      document.querySelectorAll('[style*="z-index: 9996"]').forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });

      isInitialized.current = false;
    };
  }, [currentTheme, isScrolling, isHovering]);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] opacity-0 invisible transition-all duration-150 ease-out hidden lg:block"
        style={{
          willChange: "transform, opacity, background-color",
          backgroundColor: cursorThemes[currentTheme].color,
          mixBlendMode: cursorThemes[currentTheme].mixBlendMode as any,
        }}
      />

      {/* Cursor follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 rounded-full pointer-events-none z-[9998] opacity-0 invisible transition-all duration-300 ease-out hidden lg:block"
        style={{
          willChange: "transform, opacity, border-color, background-color",
          borderColor: cursorThemes[currentTheme].color,
        }}
      />

      {/* Trail container */}
      <div
        ref={trailRef}
        className="fixed inset-0 pointer-events-none z-[9997] opacity-0 invisible hidden lg:block"
        style={{ willChange: "opacity" }}
      />

      {/* Scroll indicator */}
      {isScrolling && (
        <div className="fixed top-4 right-4 z-[9995] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold opacity-80 hidden lg:block">
          Scrolling ✨
        </div>
      )}

      {/* Theme indicator */}
      <div className="fixed bottom-4 right-4 z-[9995] bg-black/20 backdrop-blur-sm text-white px-2 py-1 rounded text-xs opacity-50 hidden lg:block">
        Cursor: {currentTheme}
      </div>
    </>
  );
}
