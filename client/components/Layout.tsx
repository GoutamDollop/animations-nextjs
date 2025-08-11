import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Loading from "./Loading";
import ScrollToTop from "./ScrollToTop";
import EnhancedCustomCursor from "./EnhancedCustomCursor";
import EnhancedPerformanceOptimizer from "./EnhancedPerformanceOptimizer";
import ConditionalBreadcrumb from "./ConditionalBreadcrumb";
import FinalOptimizations from "./FinalOptimizations";
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
      <FinalOptimizations />
      <ScrollManager />
      <EnhancedCustomCursor />
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />

        <main className="flex-grow">
          <ConditionalBreadcrumb />
          {children}
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </SmoothScrollProvider>
  );
}
