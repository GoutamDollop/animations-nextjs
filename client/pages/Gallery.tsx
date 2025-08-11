import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Camera, 
  Play, 
  Download, 
  Share2, 
  Heart, 
  Eye,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.gallery-header',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Gallery items animation
      gsap.utils.toArray('.gallery-item').forEach((item: any, index) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.05,
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [selectedCategory, viewMode]);

  const categories = ['All', 'Campus', 'Events', 'Students', 'Sports', 'Facilities'];

  const galleryItems = [
    {
      id: 1,
      title: 'Science Laboratory',
      category: 'Facilities',
      type: 'image',
      url: 'https://images.pexels.com/photos/6929160/pexels-photo-6929160.jpeg',
      likes: 45,
      views: 128,
      description: 'State-of-the-art science laboratory with modern equipment.'
    },
    {
      id: 2,
      title: 'Basketball Court',
      category: 'Sports',
      type: 'image',
      url: 'https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg',
      likes: 62,
      views: 245,
      description: 'Our professional basketball court for sports activities.'
    },
    {
      id: 3,
      title: 'Student Performance',
      category: 'Events',
      type: 'video',
      url: 'https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg',
      likes: 89,
      views: 356,
      description: 'Annual cultural night performance by our talented students.'
    },
    {
      id: 4,
      title: 'Computer Lab',
      category: 'Facilities',
      type: 'image',
      url: 'https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg',
      likes: 34,
      views: 198,
      description: 'Modern computer laboratory with latest technology.'
    },
    {
      id: 5,
      title: 'Campus Garden',
      category: 'Campus',
      type: 'image',
      url: 'https://images.pexels.com/photos/5274601/pexels-photo-5274601.jpeg',
      likes: 78,
      views: 289,
      description: 'Beautiful garden area where students relax and study.'
    },
    {
      id: 6,
      title: 'Art Studio',
      category: 'Facilities',
      type: 'image',
      url: 'https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg',
      likes: 56,
      views: 167,
      description: 'Creative art studio for our artistic students.'
    },
    {
      id: 7,
      title: 'Library Study Area',
      category: 'Campus',
      type: 'image',
      url: 'https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg',
      likes: 91,
      views: 412,
      description: 'Quiet study areas in our modern library.'
    },
    {
      id: 8,
      title: 'Student Life',
      category: 'Students',
      type: 'image',
      url: 'https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg',
      likes: 123,
      views: 598,
      description: 'Vibrant student life and community activities.'
    }
  ];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div ref={pageRef} className="min-h-screen pt-16 md:pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 md:w-32 h-20 md:h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-16 md:w-24 h-16 md:h-24 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-12 md:w-16 h-12 md:h-16 bg-green-300 rounded-full animate-ping"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="gallery-header max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 md:mb-6">
              Campus Gallery 📷
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2">
              Explore our vibrant campus life, modern facilities, and memorable moments through our photo gallery!
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Controls Section */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Photo & Video Gallery
              </h2>
              <p className="text-gray-600">
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} in gallery
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'masonry' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-item group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
                  viewMode === 'masonry' && index % 3 === 1 ? 'md:row-span-2' : ''
                }`}
              >
                {/* Image/Video Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Type Indicator */}
                  <div className="absolute top-4 left-4">
                    <div className={`p-2 rounded-full ${
                      item.type === 'video' 
                        ? 'bg-red-500' 
                        : 'bg-blue-500'
                    } text-white shadow-lg`}>
                      {item.type === 'video' ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Camera className="h-4 w-4" />
                      )}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              Want to Be Part of Our Story? 📸
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-6 md:mb-8 leading-relaxed px-4">
              Join our vibrant community and create your own memorable moments at EduVerse Academy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-white text-purple-600 px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                <span>Schedule Campus Visit</span>
                <Camera className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-transparent border-2 md:border-3 border-white text-white px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl hover:bg-white hover:text-purple-600 transition-all duration-300">
                <Share2 className="h-5 w-5 md:h-6 md:w-6" />
                <span>Share Your Photos</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
