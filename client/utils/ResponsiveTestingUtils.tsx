import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { performanceManager } from '../animations/utils/EnhancedPerformanceManager';

// Device breakpoints for testing
export const deviceBreakpoints = {
  mobile: {
    xs: { width: 320, height: 568, name: 'iPhone SE' },
    sm: { width: 375, height: 667, name: 'iPhone 8' },
    md: { width: 414, height: 896, name: 'iPhone 11 Pro' },
  },
  tablet: {
    sm: { width: 768, height: 1024, name: 'iPad' },
    md: { width: 834, height: 1194, name: 'iPad Air' },
    lg: { width: 1024, height: 1366, name: 'iPad Pro' },
  },
  desktop: {
    sm: { width: 1280, height: 720, name: 'Small Desktop' },
    md: { width: 1440, height: 900, name: 'Medium Desktop' },
    lg: { width: 1920, height: 1080, name: 'Large Desktop' },
    xl: { width: 2560, height: 1440, name: 'XL Desktop' },
  },
};

// Hook for responsive utilities
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');

  useEffect(() => {
    const updateScreenSize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      setScreenSize({ width: newWidth, height: newHeight });
      
      // Determine device type
      if (newWidth < 768) {
        setDeviceType('mobile');
      } else if (newWidth < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      
      // Determine orientation
      setOrientation(newWidth > newHeight ? 'landscape' : 'portrait');
      
      // Update performance manager
      performanceManager.setAnimationQuality(
        newWidth < 768 ? 'medium' : 
        newWidth < 1200 ? 'medium' : 'high'
      );
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    window.addEventListener('orientationchange', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      window.removeEventListener('orientationchange', updateScreenSize);
    };
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  const isPortrait = orientation === 'portrait';
  const isLandscape = orientation === 'landscape';

  // Responsive class helpers
  const getResponsiveClass = (baseClass: string) => {
    return `${baseClass} ${isMobile ? `mobile:${baseClass}` : ''} ${isTablet ? `tablet:${baseClass}` : ''} ${isDesktop ? `desktop:${baseClass}` : ''}`;
  };

  const getSpacing = (mobile: string, tablet?: string, desktop?: string) => {
    if (isMobile) return mobile;
    if (isTablet && tablet) return tablet;
    if (isDesktop && desktop) return desktop;
    return mobile;
  };

  const getTextSize = (mobile: string, tablet?: string, desktop?: string) => {
    if (isMobile) return mobile;
    if (isTablet && tablet) return tablet;
    if (isDesktop && desktop) return desktop;
    return mobile;
  };

  return {
    screenSize,
    deviceType,
    orientation,
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape,
    getResponsiveClass,
    getSpacing,
    getTextSize,
  };
};

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  mobileClass?: string;
  tabletClass?: string;
  desktopClass?: string;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  mobileClass = '',
  tabletClass = '',
  desktopClass = '',
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getActiveClass = () => {
    if (isMobile && mobileClass) return `${className} ${mobileClass}`;
    if (isTablet && tabletClass) return `${className} ${tabletClass}`;
    if (isDesktop && desktopClass) return `${className} ${desktopClass}`;
    return className;
  };

  return (
    <div className={getActiveClass()}>
      {children}
    </div>
  );
};

// Responsive Text Component
interface ResponsiveTextProps {
  children: React.ReactNode;
  mobile?: string;
  tablet?: string;
  desktop?: string;
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  mobile = 'text-base',
  tablet = 'text-lg',
  desktop = 'text-xl',
  className = '',
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getTextClass = () => {
    let textClass = mobile;
    if (isTablet) textClass = tablet;
    if (isDesktop) textClass = desktop;
    return `${textClass} ${className}`;
  };

  return <span className={getTextClass()}>{children}</span>;
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  mobileColumns?: number;
  tabletColumns?: number;
  desktopColumns?: number;
  gap?: string;
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  gap = 'gap-4',
  className = '',
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getGridClass = () => {
    let columns = mobileColumns;
    if (isTablet) columns = tabletColumns;
    if (isDesktop) columns = desktopColumns;
    
    return `grid grid-cols-${columns} ${gap} ${className}`;
  };

  return <div className={getGridClass()}>{children}</div>;
};

// Performance Monitor Component
export const PerformanceMonitor: React.FC = () => {
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    setDeviceInfo(performanceManager.getDeviceInfo());

    // FPS monitoring
    let frames = 0;
    let lastTime = performance.now();

    const fpsMonitor = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const currentFps = Math.round((frames * 1000) / (currentTime - lastTime));
        setFps(currentFps);
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(fpsMonitor);
    };

    requestAnimationFrame(fpsMonitor);

    // Memory monitoring
    if ('memory' in performance) {
      const memoryMonitor = setInterval(() => {
        const memory: any = (performance as any).memory;
        const usage = (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
        setMemoryUsage(Math.round(usage));
      }, 1000);

      return () => clearInterval(memoryMonitor);
    }
  }, []);

  if (!showMonitor) {
    return (
      <button
        onClick={() => setShowMonitor(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg z-50"
        title="Show Performance Monitor"
      >
        📊
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-lg z-50 text-xs max-w-xs"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Performance Monitor</span>
        <button
          onClick={() => setShowMonitor(false)}
          className="text-white hover:text-red-400"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={fps < 30 ? 'text-red-400' : fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
            {fps}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Memory:</span>
          <span className={memoryUsage > 80 ? 'text-red-400' : memoryUsage > 60 ? 'text-yellow-400' : 'text-green-400'}>
            {memoryUsage}%
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Quality:</span>
          <span className="capitalize">{deviceInfo.animationQuality}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Device:</span>
          <span>{deviceInfo.isMobile ? 'Mobile' : 'Desktop'}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Reduced Motion:</span>
          <span>{deviceInfo.reducedMotion ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Responsive Debug Grid (for development)
export const ResponsiveDebugGrid: React.FC = () => {
  const { screenSize, deviceType, orientation } = useResponsive();
  const [showGrid, setShowGrid] = useState(false);

  if (!showGrid) {
    return (
      <button
        onClick={() => setShowGrid(true)}
        className="fixed top-4 right-4 bg-purple-500 text-white p-2 rounded-full shadow-lg z-50"
        title="Show Debug Grid"
      >
        🔧
      </button>
    );
  }

  return (
    <>
      {/* Debug Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 bg-purple-500 text-white p-3 rounded-lg shadow-lg z-50 text-xs"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Debug Info</span>
          <button
            onClick={() => setShowGrid(false)}
            className="text-white hover:text-red-400"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-1">
          <div>{screenSize.width} × {screenSize.height}</div>
          <div>Device: {deviceType}</div>
          <div>Orientation: {orientation}</div>
        </div>
      </motion.div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="h-full w-full grid grid-cols-12 gap-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-full border-r border-red-300/30 border-dashed"
            />
          ))}
        </div>
        
        {/* Horizontal guides */}
        <div className="absolute inset-0 grid grid-rows-12 gap-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-full border-b border-red-300/30 border-dashed"
            />
          ))}
        </div>
      </div>
    </>
  );
};

// Breakpoint Indicator
export const BreakpointIndicator: React.FC = () => {
  const { deviceType, screenSize } = useResponsive();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, [deviceType, screenSize]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        >
          <div className="text-center">
            <div className="font-semibold">{deviceType.toUpperCase()}</div>
            <div className="text-sm">{screenSize.width} × {screenSize.height}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Responsive Testing Component
interface ResponsiveTestProps {
  enabled?: boolean;
}

export const ResponsiveTesting: React.FC<ResponsiveTestProps> = ({ enabled = false }) => {
  if (!enabled || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <>
      <PerformanceMonitor />
      <ResponsiveDebugGrid />
      <BreakpointIndicator />
    </>
  );
};

// CSS Classes for responsive utilities
export const responsiveClasses = {
  container: {
    mobile: 'px-4 mx-auto max-w-full',
    tablet: 'px-6 mx-auto max-w-4xl',
    desktop: 'px-8 mx-auto max-w-7xl',
  },
  text: {
    heading: {
      mobile: 'text-2xl md:text-3xl lg:text-4xl',
      tablet: 'text-3xl md:text-4xl lg:text-5xl',
      desktop: 'text-4xl md:text-5xl lg:text-6xl',
    },
    body: {
      mobile: 'text-sm md:text-base',
      tablet: 'text-base md:text-lg',
      desktop: 'text-lg md:text-xl',
    },
  },
  spacing: {
    section: {
      mobile: 'py-8 md:py-12',
      tablet: 'py-12 md:py-16',
      desktop: 'py-16 md:py-20 lg:py-24',
    },
    element: {
      mobile: 'mb-4 md:mb-6',
      tablet: 'mb-6 md:mb-8',
      desktop: 'mb-8 md:mb-10 lg:mb-12',
    },
  },
  grid: {
    mobile: 'grid-cols-1 sm:grid-cols-2',
    tablet: 'grid-cols-2 md:grid-cols-3',
    desktop: 'grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  },
};

export default useResponsive;
