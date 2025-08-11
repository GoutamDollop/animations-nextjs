import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Loading from './Loading';
import ScrollToTop from './ScrollToTop';
import CustomCursor from './CustomCursor';
import PerformanceOptimizer from './PerformanceOptimizer';
import Breadcrumb from './Breadcrumb';
import ScrollManager from './ScrollManager';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - shorter for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PerformanceOptimizer />
      <ScrollManager />
      <CustomCursor />
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <Breadcrumb />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
