import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ModernNavigation from './ModernNavigation';
import Footer from './Footer';
import ModernCursor from '../animations/ModernCursor';
import SmoothScroll from '../../animations/scroll/SmoothScroll';
import PageTransitions from '../../animations/transitions/PageTransitions';
import Breadcrumb from '../navigation/Breadcrumb';
import PerformanceManager from '../../animations/utils/PerformanceManager';
import { scrollToTop } from '../../utils/scrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    // Initialize performance monitoring
    const performanceManager = PerformanceManager.getInstance();
    performanceManager.setupPerformanceMonitoring();
    
    // Cleanup on unmount   
    return () => {
      performanceManager.cleanup();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    scrollToTop(1.2);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Modern Navigation */}
      <ModernNavigation />
      
      {/* Modern Cursor */}
      <ModernCursor />
      
      {/* Smooth Scroll Container */}
      <SmoothScroll>
        <PageTransitions>
          <div className="relative z-10">
            <div className="pt-20">
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </PageTransitions>
      </SmoothScroll>
    </div>
  );
}
