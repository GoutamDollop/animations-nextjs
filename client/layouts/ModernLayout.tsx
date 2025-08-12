import React, { useState, useEffect } from "react";
import ModernNavigation from "./ModernNavigation";
import ModernFooter from "./ModernFooter";
import AdvancedCursor from "../components/AdvancedCursor";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";

interface ModernLayoutProps {
  children: React.ReactNode;
}

export default function ModernLayout({ children }: ModernLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Optimized loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <AdvancedCursor />
        <ModernNavigation />

        <main className="flex-grow">{children}</main>

        <ModernFooter />
        <ScrollToTop />
      </div>
    </SmoothScrollProvider>
  );
}
