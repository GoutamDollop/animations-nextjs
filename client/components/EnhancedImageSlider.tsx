import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade, Thumbs } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
// Swiper styles are handled via global CSS

gsap.registerPlugin(ScrollTrigger);

interface ImageSlide {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
}

const schoolImages: ImageSlide[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
    alt: "Modern School Campus",
    title: "Our Beautiful Campus",
    description: "State-of-the-art facilities designed for modern learning",
    category: "Campus"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Students in Classroom",
    title: "Interactive Learning",
    description: "Engaging classroom environments that foster creativity",
    category: "Education"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Science Laboratory",
    title: "Advanced Laboratories",
    description: "Cutting-edge science labs for hands-on experiments",
    category: "Facilities"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "School Library",
    title: "Digital Library",
    description: "Extensive collection of books and digital resources",
    category: "Learning"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2322&q=80",
    alt: "Sports Facilities",
    title: "Sports & Recreation",
    description: "Modern sports facilities for physical development",
    category: "Sports"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
    alt: "Graduation Ceremony",
    title: "Achievement Celebration",
    description: "Celebrating our students' success and achievements",
    category: "Events"
  }
];

export default function EnhancedImageSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!sliderRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        sliderRef.current,
        { 
          opacity: 0, 
          y: 100,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for the slider container
      gsap.to(sliderRef.current, {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Text reveal animation
      gsap.fromTo(
        ".slider-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Controls animation
      gsap.fromTo(
        ".slider-controls",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Preload images
    const imagePromises = schoolImages.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
        img.src = image.src;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoaded(true);
    });
  }, []);

  const handlePlayPause = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
    
    // Animate slide content
    gsap.fromTo(
      ".slide-content",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl animate-pulse flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-500">Loading Amazing Content...</div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="slider-title text-3xl md:text-5xl lg:text-6xl font-display font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Discover Our Amazing Campus 🏫
          </h2>
          <p className="slider-title text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a visual journey through our state-of-the-art facilities and vibrant learning environment
          </p>
        </div>

        {/* Main Slider Container */}
        <div ref={sliderRef} className="relative max-w-6xl mx-auto">
          {/* Main Image Slider */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
              modules={[Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next"
              }}
              pagination={{
                el: ".custom-pagination",
                clickable: true,
                dynamicBullets: true
              }}
              className="aspect-[16/9] md:aspect-[21/9]"
            >
              {schoolImages.map((image, index) => (
                <SwiperSlide key={image.id}>
                  <div className="relative w-full h-full group">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Content */}
                    <div className="slide-content absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                      <div className="max-w-4xl">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                          {image.category}
                        </span>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                          {image.title}
                        </h3>
                        <p className="text-base md:text-lg lg:text-xl opacity-90 max-w-2xl">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button className="custom-prev slider-controls absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300">
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <button className="custom-next slider-controls absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300">
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="slider-controls absolute top-4 md:top-6 right-4 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Play className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
          </div>

          {/* Thumbnail Slider */}
          <div className="mt-6 md:mt-8">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              spaceBetween={12}
              slidesPerView={3}
              breakpoints={{
                640: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 }
              }}
              watchSlidesProgress
              className="thumbs-slider"
            >
              {schoolImages.map((image, index) => (
                <SwiperSlide key={`thumb-${image.id}`}>
                  <div 
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      index === activeIndex 
                        ? 'ring-4 ring-blue-500 scale-105' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-semibold truncate">
                        {image.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Custom Pagination */}
          <div className="slider-controls custom-pagination flex justify-center mt-6 md:mt-8"></div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / schoolImages.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>{activeIndex + 1} of {schoolImages.length}</span>
            <span>Campus Gallery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
