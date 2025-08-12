import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const location = useLocation();
  
  // Generate breadcrumb items from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/', isActive: location.pathname === '/' }
    ];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Capitalize and format segment
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isActive: isLast
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/' && !items) {
    return null;
  }

  return (
    <motion.nav
      className={`w-full max-w-none sm:max-w-4xl mx-auto ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Breadcrumb"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg border border-white/20">
        <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto scrollbar-hide">
          {breadcrumbItems.map((item, index) => (
            <motion.li
              key={item.path}
              className="flex items-center whitespace-nowrap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {index > 0 && (
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mx-1 sm:mx-2 flex-shrink-0" />
              )}
              
              {item.isActive ? (
                <span className="text-purple-600 font-medium cursor-default flex items-center">
                  {index === 0 && <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />}
                  <span className="truncate max-w-[100px] sm:max-w-none">{item.label}</span>
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group"
                  data-cursor="hover"
                  data-cursor-text={item.label}
                >
                  {index === 0 && (
                    <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 group-hover:scale-110 transition-transform flex-shrink-0" />
                  )}
                  <motion.span
                    className="truncate max-w-[100px] sm:max-w-none"
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.nav>
  );
};

export default Breadcrumb;
