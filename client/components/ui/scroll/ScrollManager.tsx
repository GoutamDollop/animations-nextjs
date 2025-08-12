import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // Always scroll to top when route changes
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // Handle page refresh - ensure we start at top
    const handlePageRefresh = () => {
      if (window.pageYOffset > 0) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto", // Instant for page refresh
        });
      }
    };

    // Call immediately for page refresh
    handlePageRefresh();

    // Also handle browser back/forward buttons
    const handlePopState = () => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 100);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
