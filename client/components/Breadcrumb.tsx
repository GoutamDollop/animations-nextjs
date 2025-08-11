import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

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

  // Handle back navigation
  const handleBack = () => {
    navigate('/');
  };

  // Don't show breadcrumb on home page
  if (currentPath === '/') {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100 py-3 md:py-4">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Back Button with improved design */}
          <button
            onClick={handleBack}
            className="group inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-orange-200 hover:border-orange-300"
          >
            <ArrowLeft className="h-4 w-4 text-orange-600 group-hover:text-orange-700" />
            <span className="text-orange-600 group-hover:text-orange-700 font-medium text-sm">Back to Home</span>
          </button>

          {/* Current Page Indicator with modern design */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <Home className="h-4 w-4" />
              <span>/</span>
              <span>{currentPageName}</span>
            </div>
            
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-md">
              <span className="font-semibold text-sm">{currentPageName}</span>
              {currentPageName.includes('About') && <span className="text-orange-200">🎓</span>}
              {currentPageName.includes('Courses') && <span className="text-orange-200">📚</span>}
              {currentPageName.includes('Teachers') && <span className="text-orange-200">👩‍🏫</span>}
              {currentPageName.includes('Events') && <span className="text-orange-200">🎉</span>}
              {currentPageName.includes('Gallery') && <span className="text-orange-200">📷</span>}
              {currentPageName.includes('Contact') && <span className="text-orange-200">📞</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
