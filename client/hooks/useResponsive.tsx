import { useState, useEffect } from "react";

interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  wide: 1536,
};

export function useResponsive(breakpoints: BreakpointConfig = defaultBreakpoints) {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize.width < breakpoints.mobile;
  const isTablet = screenSize.width >= breakpoints.mobile && screenSize.width < breakpoints.tablet;
  const isDesktop = screenSize.width >= breakpoints.tablet && screenSize.width < breakpoints.desktop;
  const isWide = screenSize.width >= breakpoints.desktop;

  const isSmallScreen = screenSize.width < breakpoints.tablet;
  const isLargeScreen = screenSize.width >= breakpoints.desktop;

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isSmallScreen,
    isLargeScreen,
    breakpoints,
  };
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange(); // Set initial value
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

// Common media queries
export const useCommonQueries = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    isPortrait,
    prefersReducedMotion,
    prefersDarkMode,
  };
};

// Touch device detection
export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouch();
    window.addEventListener("touchstart", checkTouch, { once: true });

    return () => window.removeEventListener("touchstart", checkTouch);
  }, []);

  return isTouch;
}

// Component-level responsive utilities
interface ResponsiveProps {
  children: React.ReactNode;
  showOn?: "mobile" | "tablet" | "desktop" | "all";
  hideOn?: "mobile" | "tablet" | "desktop";
}

export function Responsive({ children, showOn = "all", hideOn }: ResponsiveProps) {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const shouldShow = () => {
    if (hideOn) {
      if (hideOn === "mobile" && isMobile) return false;
      if (hideOn === "tablet" && isTablet) return false;
      if (hideOn === "desktop" && isDesktop) return false;
    }

    if (showOn === "all") return true;
    if (showOn === "mobile" && isMobile) return true;
    if (showOn === "tablet" && isTablet) return true;
    if (showOn === "desktop" && isDesktop) return true;

    return false;
  };

  return shouldShow() ? <>{children}</> : null;
}

// Responsive container component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function ResponsiveContainer({ 
  children, 
  className = "", 
  maxWidth = "2xl" 
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}

export default useResponsive;
