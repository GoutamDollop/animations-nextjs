import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { animationConfig } from "../config/animations";

interface CursorState {
  x: number;
  y: number;
  isVisible: boolean;
  isHovering: boolean;
  currentSection: string;
  isScrolling: boolean;
  isDragging: boolean;
}

interface CursorTrail {
  x: number;
  y: number;
  age: number;
  opacity: number;
}

export default function AdvancedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const sparkleContainerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isHovering: false,
    currentSection: "default",
    isScrolling: false,
    isDragging: false,
  });

  const [isMobile, setIsMobile] = useState(false);
  const trailPoints = useRef<CursorTrail[]>([]);
  const animationFrameId = useRef<number>();
  const lastScrollTime = useRef<number>(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024 || "ontouchstart" in window;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get cursor theme based on current section
  const getCurrentTheme = useCallback(() => {
    return (
      animationConfig.cursor[
        state.currentSection as keyof typeof animationConfig.cursor
      ] || animationConfig.cursor.default
    );
  }, [state.currentSection]);

  // Create sparkle effect
  const createSparkle = useCallback((x: number, y: number) => {
    if (!sparkleContainerRef.current) return;

    const sparkle = document.createElement("div");
    const size = Math.random() * 6 + 2;
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;

    sparkle.className = "cursor-sparkle";
    sparkle.style.cssText = `
      position: fixed;
      left: ${x + offsetX}px;
      top: ${y + offsetY}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, #fbbf24, #f59e0b);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9996;
      opacity: 1;
      transform: translateZ(0);
      will-change: transform, opacity;
    `;

    sparkleContainerRef.current.appendChild(sparkle);

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
  }, []);

  // Update trail points
  const updateTrail = useCallback(() => {
    const theme = getCurrentTheme();
    const maxTrailPoints = theme.trailLength;

    // Add new trail point
    trailPoints.current.push({
      x: state.x,
      y: state.y,
      age: 0,
      opacity: 1,
    });

    // Remove old points and update ages
    trailPoints.current = trailPoints.current
      .map((point) => ({
        ...point,
        age: point.age + 1,
        opacity: 1 - point.age / maxTrailPoints,
      }))
      .filter((point) => point.age < maxTrailPoints);

    // Render trail
    if (trailContainerRef.current) {
      trailContainerRef.current.innerHTML = "";
      trailPoints.current.forEach((point, index) => {
        const trailDot = document.createElement("div");
        const size = Math.max(2, point.opacity * 6);

        trailDot.className = "cursor-trail-dot";
        trailDot.style.cssText = `
          position: fixed;
          left: ${point.x - size / 2}px;
          top: ${point.y - size / 2}px;
          width: ${size}px;
          height: ${size}px;
          background: ${theme.color};
          border-radius: 50%;
          opacity: ${point.opacity * 0.5};
          pointer-events: none;
          z-index: 9997;
          mix-blend-mode: ${theme.mixBlendMode};
          transform: translateZ(0);
          will-change: transform;
        `;

        trailContainerRef.current?.appendChild(trailDot);
      });
    }
  }, [state.x, state.y, getCurrentTheme]);

  // Main animation loop
  const animate = useCallback(() => {
    if (!cursorRef.current || !followerRef.current || !state.isVisible) {
      animationFrameId.current = requestAnimationFrame(animate);
      return;
    }

    const theme = getCurrentTheme();
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Update cursor position
    cursor.style.transform = `translate3d(${state.x - theme.size / 2}px, ${state.y - theme.size / 2}px, 0)`;

    // Smooth follower animation
    const followerRect = follower.getBoundingClientRect();
    const centerX = followerRect.left + followerRect.width / 2;
    const centerY = followerRect.top + followerRect.height / 2;

    const deltaX = state.x - centerX;
    const deltaY = state.y - centerY;

    gsap.to(follower, {
      x: `+=${deltaX * 0.1}`,
      y: `+=${deltaY * 0.1}`,
      duration: 0.1,
      ease: "none",
    });

    // Update visual states
    if (state.isHovering) {
      cursor.style.transform += ` scale(2)`;
      follower.style.transform += ` scale(1.5)`;
    } else if (state.isScrolling) {
      cursor.style.transform += ` scale(1.5)`;
      follower.style.transform += ` scale(1.2)`;
    } else if (state.isDragging) {
      cursor.style.transform += ` scale(0.8) rotate(15deg)`;
      follower.style.transform += ` scale(1.8)`;
    }

    // Update colors
    cursor.style.backgroundColor = theme.color;
    cursor.style.width = `${theme.size}px`;
    cursor.style.height = `${theme.size}px`;

    follower.style.borderColor = theme.color;

    // Update trail
    updateTrail();

    // Create sparkles during scroll
    if (state.isScrolling && Math.random() < 0.3) {
      createSparkle(state.x, state.y);
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [state, getCurrentTheme, updateTrail, createSparkle]);

  // Detect current section
  const detectCurrentSection = useCallback((y: number) => {
    const sections = [
      { name: "hero", selector: '[data-section="hero"]' },
      { name: "stories", selector: '[data-section="stories"]' },
      { name: "teachers", selector: '[data-section="teachers"]' },
      { name: "footer", selector: '[data-section="footer"]' },
    ];

    for (const section of sections) {
      const element = document.querySelector(section.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (y >= rect.top && y <= rect.bottom) {
          return section.name;
        }
      }
    }

    return "default";
  }, []);

  // Event handlers
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const newSection = detectCurrentSection(e.clientY);

      setState((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        isVisible: true,
        currentSection: newSection,
      }));
    },
    [detectCurrentSection],
  );

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target;
    
    // Check if target is a valid DOM element with the closest method
    if (target && typeof target === 'object' && 'closest' in target && typeof target.closest === 'function') {
      const isInteractive =
        (target as Element).closest('a, button, [role="button"], .interactive, .magnetic') !== null;
      setState((prev) => ({ ...prev, isHovering: isInteractive }));
    } else {
      setState((prev) => ({ ...prev, isHovering: false }));
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState((prev) => ({ ...prev, isHovering: false }));
  }, []);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    lastScrollTime.current = now;

    setState((prev) => ({ ...prev, isScrolling: true }));

    // Clear scroll state after delay
    setTimeout(() => {
      if (Date.now() - lastScrollTime.current >= 150) {
        setState((prev) => ({ ...prev, isScrolling: false }));
      }
    }, 150);
  }, []);

  const handleMouseDown = useCallback(() => {
    setState((prev) => ({ ...prev, isDragging: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setState((prev) => ({ ...prev, isDragging: false }));
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    if (!e.relatedTarget) {
      setState((prev) => ({ ...prev, isVisible: false }));
    }
  }, []);

  // Setup event listeners
  useEffect(() => {
    if (isMobile) return;

    const events = [
      ["mousemove", handleMouseMove],
      ["mouseenter", handleMouseEnter, { capture: true }],
      ["mouseleave", handleMouseLeave, { capture: true }],
      ["mousedown", handleMouseDown],
      ["mouseup", handleMouseUp],
      ["mouseout", handleMouseOut],
    ] as const;

    events.forEach(([event, handler, options]) => {
      document.addEventListener(event, handler as EventListener, options);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      events.forEach(([event, handler, options]) => {
        document.removeEventListener(event, handler as EventListener, options);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    isMobile,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleMouseOut,
    handleScroll,
  ]);

  // Start animation loop
  useEffect(() => {
    if (!isMobile) {
      animationFrameId.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }
  }, [isMobile, animate]);

  // Don't render on mobile
  if (isMobile) return null;

  const theme = getCurrentTheme();

  return (
    <>
      {/* Hide default cursor */}
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            cursor: none !important;
          }
        `
      }} />

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full opacity-0 invisible transition-opacity duration-200"
        style={{
          backgroundColor: theme.color,
          width: theme.size,
          height: theme.size,
          mixBlendMode: theme.mixBlendMode as any,
          willChange: "transform, opacity",
        }}
      />

      {/* Cursor follower */}
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998] w-10 h-10 border-2 rounded-full opacity-0 invisible transition-all duration-300"
        style={{
          borderColor: theme.color,
          willChange: "transform, opacity",
        }}
      />

      {/* Trail container */}
      <div
        ref={trailContainerRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ willChange: "contents" }}
      />

      {/* Sparkle container */}
      <div
        ref={sparkleContainerRef}
        className="fixed inset-0 pointer-events-none z-[9996]"
        style={{ willChange: "contents" }}
      />
    </>
  );
}
