import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Loading from "./Loading";
import ScrollToTop from "./ScrollToTop";
import EnhancedCustomCursor from "./EnhancedCustomCursor";
import AnimatedBreadcrumb from "./AnimatedBreadcrumb";
import EnhancedPerformanceOptimizer from "./EnhancedPerformanceOptimizer";
import ScrollManager from "./ScrollManager";
import { SmoothScrollProvider } from "./AdvancedScrollAnimations";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimal loading time for optimal UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SmoothScrollProvider>
      <EnhancedPerformanceOptimizer />
      <ScrollManager />
      <EnhancedCustomCursor />
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <AnimatedBreadcrumb />

        <main className="flex-grow">{children}</main>

        <Footer />
        <ScrollToTop />
      </div>
    </SmoothScrollProvider>
  );
}
