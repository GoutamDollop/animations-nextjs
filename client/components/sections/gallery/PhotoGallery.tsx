import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  src: string;
  thumb: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2832&q=80",
    thumb:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Modern School Building",
    title: "Our Main Campus Building",
    description:
      "State-of-the-art educational facility with modern architecture",
    category: "Campus",
    tags: ["architecture", "building", "modern"],
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    thumb:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Students Learning",
    title: "Interactive Classroom Session",
    description: "Students engaging in collaborative learning activities",
    category: "Education",
    tags: ["students", "learning", "classroom"],
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    thumb:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Science Laboratory",
    title: "Advanced Science Lab",
    description: "Well-equipped laboratory for hands-on scientific experiments",
    category: "Facilities",
    tags: ["science", "laboratory", "equipment"],
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    thumb:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "School Library",
    title: "Digital Learning Center",
    description: "Modern library with extensive digital and physical resources",
    category: "Learning",
    tags: ["library", "books", "digital"],
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2322&q=80",
    thumb:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Sports Complex",
    title: "Athletic Facilities",
    description: "Professional sports facilities for physical education",
    category: "Sports",
    tags: ["sports", "fitness", "athletics"],
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2532&q=80",
    thumb:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Graduation Day",
    title: "Graduation Ceremony",
    description: "Celebrating our graduates' achievements and future success",
    category: "Events",
    tags: ["graduation", "celebration", "achievement"],
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    thumb:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Team Collaboration",
    title: "Student Collaboration",
    description: "Students working together on innovative projects",
    category: "Education",
    tags: ["teamwork", "collaboration", "projects"],
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    thumb:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Art Studio",
    title: "Creative Arts Studio",
    description: "Inspiring creativity through arts and design programs",
    category: "Arts",
    tags: ["art", "creativity", "design"],
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    thumb:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    alt: "Computer Lab",
    title: "Technology Center",
    description: "State-of-the-art computer lab for digital learning",
    category: "Technology",
    tags: ["computers", "technology", "digital"],
  },
];

const categories = [
  "All",
  "Campus",
  "Education",
  "Facilities",
  "Learning",
  "Sports",
  "Events",
  "Arts",
  "Technology",
];

interface PhotoGalleryProps {
  className?: string;
}

export default function PhotoGallery({ className = "" }: PhotoGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    if (!galleryRef.current) return;

    const ctx = gsap.context(() => {
      // Main container entrance animation
      gsap.fromTo(
        galleryRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Category filter animation
      gsap.fromTo(
        ".category-filter",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Gallery items stagger animation
      gsap.fromTo(
        ".gallery-item",
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
          rotation: -5,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          stagger: {
            amount: 1.2,
            grid: "auto",
            from: "center",
            ease: "power2.out",
          },
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Floating animation for gallery items
      gsap.to(".gallery-item", {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          amount: 2,
          from: "random",
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Re-animate items when category changes
    if (galleryRef.current) {
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.4)",
        },
      );
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Preload images
    const imagePromises = galleryImages.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
        img.src = image.thumb;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoaded(true);
    });
  }, []);

  const openLightbox = (image: GalleryImage) => {
    const index = galleryImages.findIndex((img) => img.id === image.id);
    setCurrentImageIndex(index);
    setLightboxImage(image);
    setZoom(1);
    setRotation(0);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % galleryImages.length
        : (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;

    setCurrentImageIndex(newIndex);
    setLightboxImage(galleryImages[newIndex]);
    setZoom(1);
    setRotation(0);
  };

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in") {
      setZoom((prev) => Math.min(prev + 0.5, 3));
    } else {
      setZoom((prev) => Math.max(prev - 0.5, 0.5));
    }
  };

  const handleRotate = () => {
    setRotation((prev) => prev + 90);
  };

  const handleDownload = () => {
    if (lightboxImage) {
      const link = document.createElement("a");
      link.href = lightboxImage.src;
      link.download = `${lightboxImage.title}.jpg`;
      link.click();
    }
  };

  const handleShare = async () => {
    if (lightboxImage && navigator.share) {
      try {
        await navigator.share({
          title: lightboxImage.title,
          text: lightboxImage.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Sharing failed:", error);
      }
    }
  };

  if (!isLoaded) {
    return (
      <div
        className={`w-full py-16 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        ref={galleryRef}
        className={`py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50 relative overflow-hidden ${className}`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Our Amazing Gallery 📸
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our vibrant campus life, state-of-the-art facilities, and
              memorable moments
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-filter px-4 md:px-6 py-2 md:py-3 rounded-2xl font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 magnetic ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer magnetic"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.thumb}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-medium mb-2">
                    {image.category}
                  </span>
                  <h3 className="font-bold text-sm md:text-base mb-1">
                    {image.title}
                  </h3>
                  <p className="text-xs md:text-sm opacity-90 line-clamp-2">
                    {image.description}
                  </p>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">
                No images found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Controls */}
          <div className="absolute top-4 left-4 flex space-x-2 z-10">
            <button
              onClick={() => handleZoom("out")}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleZoom("in")}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleRotate}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
            >
              <Download className="w-5 h-5" />
            </button>
            {navigator.share && (
              <button
                onClick={handleShare}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
              >
                <Share2 className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="max-w-7xl max-h-full flex items-center justify-center">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-w-full max-h-full object-contain transition-transform duration-300"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-lg text-sm font-medium mb-2">
                  {lightboxImage.category}
                </span>
                <h3 className="text-xl font-bold mb-1">
                  {lightboxImage.title}
                </h3>
                <p className="text-sm opacity-80">
                  {lightboxImage.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80">
                  {currentImageIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
