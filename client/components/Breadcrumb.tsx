import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export default function Breadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();

  // Define page mappings
  const pageMapping: { [key: string]: string } = {
    '/': 'Home',
    '/about': 'About Us',
    '/courses': 'Courses',
    '/teachers': 'Teachers',
    '/events': 'Events',
    '/gallery': 'Gallery',
    '/contact': 'Contact',
    '/testimonials': 'Testimonials'
  };

  // Get current page info
  const currentPath = location.pathname;
  const currentPageName = pageMapping[currentPath] || 'Page';

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' }
  ];

  // Add current page if not home
  if (currentPath !== '/') {
    breadcrumbItems.push({ label: currentPageName, path: currentPath });
  }

  // Handle back navigation
  const handleBack = () => {
    if (currentPath === '/') {
      return; // Already on home, no back action
    }
    navigate('/'); // Always go back to home for simplicity
  };

  // Don't show breadcrumb on home page
  if (currentPath === '/') {
    return null;
  }

  return (
    <div className="bg-white border-b border-gray-200 py-3 md:py-4 sticky top-16 md:top-20 z-40">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-300 group"
          >
            <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-orange-100 transition-colors duration-300">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <span className="font-medium text-sm md:text-base hidden sm:inline">Back to Home</span>
          </button>

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm md:text-base">
              {breadcrumbItems.map((item, index) => (
                <li key={item.path} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                  )}
                  {index === 0 ? (
                    <Link
                      to={item.path}
                      className="flex items-center space-x-1 text-gray-500 hover:text-orange-600 transition-colors duration-300"
                    >
                      <Home className="h-4 w-4" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  ) : index === breadcrumbItems.length - 1 ? (
                    <span className="text-gray-800 font-semibold flex items-center space-x-1">
                      <span>{item.label}</span>
                      {currentPageName.includes('🎓') && <span>🎓</span>}
                      {currentPageName.includes('📚') && <span>📚</span>}
                      {currentPageName.includes('🎉') && <span>🎉</span>}
                      {currentPageName.includes('📞') && <span>📞</span>}
                    </span>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-gray-500 hover:text-orange-600 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Current Page Indicator */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <span>Page:</span>
            <span className="font-semibold text-gray-800">{currentPageName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
