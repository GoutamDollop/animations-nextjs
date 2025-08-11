import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function HeroBreadcrumb() {
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
    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
      <div className="flex items-center space-x-3">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group inline-flex items-center space-x-2 px-3 md:px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
        >
          <ArrowLeft className="h-4 w-4 text-gray-700 group-hover:text-orange-600 transition-colors" />
          <span className="text-gray-700 group-hover:text-orange-600 font-medium text-sm hidden sm:inline transition-colors">
            Back
          </span>
        </button>

        {/* Current Page Indicator */}
        <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-2 bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-sm text-white rounded-full shadow-lg">
          <Home className="h-4 w-4" />
          <span className="font-semibold text-sm">{currentPageName}</span>
          {currentPageName.includes('About') && <span className="text-orange-200">🎓</span>}
          {currentPageName.includes('Courses') && <span className="text-orange-200">📚</span>}
          {currentPageName.includes('Teachers') && <span className="text-orange-200">👩‍🏫</span>}
          {currentPageName.includes('Events') && <span className="text-orange-200">🎉</span>}
          {currentPageName.includes('Gallery') && <span className="text-orange-200">📷</span>}
          {currentPageName.includes('Contact') && <span className="text-orange-200">📞</span>}
          {currentPageName.includes('Testimonials') && <span className="text-orange-200">⭐</span>}
        </div>
      </div>
    </div>
  );
}
