import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import schoolImagesData from '../../data/schoolImages.json';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const scrollContent = [
  {
    id: 1,
    title: "State-of-the-Art Campus",
    subtitle: "Modern Learning Environment",
    description: "Our campus features cutting-edge architecture designed to inspire creativity and foster collaborative learning. Every corner is thoughtfully designed to enhance the educational experience.",
    highlights: ["Smart Classrooms", "Green Spaces", "Innovation Labs", "Study Lounges"],
    imageIndex: 0
  },
  {
    id: 2,
    title: "Interactive Learning Spaces",
    subtitle: "Technology-Enhanced Education",
    description: "Experience the future of education with our interactive classrooms equipped with the latest technology. From virtual reality labs to AI-powered learning systems.",
    highlights: ["VR Learning Labs", "AI Tutoring", "Digital Whiteboards", "Cloud Computing"],
    imageIndex: 1
  },
  {
    id: 3,
    title: "Research & Innovation",
    subtitle: "Advancing Knowledge",
    description: "Our research facilities provide students and faculty with the tools they need to push the boundaries of knowledge and make groundbreaking discoveries.",
    highlights: ["Research Labs", "Innovation Hub", "Patent Support", "Industry Partnerships"],
    imageIndex: 2
  },
  {
    id: 4,
    title: "Student Life & Community",
    subtitle: "Beyond the Classroom",
    description: "A vibrant campus life with diverse activities, clubs, and events that help students develop leadership skills and lifelong friendships.",
    highlights: ["Student Clubs", "Cultural Events", "Sports Teams", "Leadership Programs"],
    imageIndex: 4
  }
];

export default function AdvancedScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!containerRef.current || !imagesRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section during scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinRef.current,
          pinSpacing: false,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Animate images based on scroll
      scrollContent.forEach((_, index) => {
        const imageElement = imagesRef.current?.children[index];
        if (imageElement) {
          gsap.set(imageElement, { opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 0.8 });
          
          if (index > 0) {
            tl.to(imagesRef.current?.children[index - 1], {
              opacity: 0,
              scale: 0.8,
              duration: 0.5
            }, index * 0.25)
            .to(imageElement, {
              opacity: 1,
              scale: 1,
              duration: 0.5
            }, index * 0.25);
          }
        }
      });

      // Animate text content
      scrollContent.forEach((_, index) => {
        const textElement = textRef.current?.children[index];
        if (textElement) {
          gsap.set(textElement, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 50 });
          
          if (index > 0) {
            tl.to(textRef.current?.children[index - 1], {
              opacity: 0,
              y: -50,
              duration: 0.3
            }, index * 0.25)
            .to(textElement, {
              opacity: 1,
              y: 0,
              duration: 0.3
            }, index * 0.25);
          }
        }
      });

      // Typewriter effect for highlights
      scrollContent.forEach((content, sectionIndex) => {
        content.highlights.forEach((highlight, highlightIndex) => {
          const element = document.querySelector(`[data-highlight="${sectionIndex}-${highlightIndex}"]`);
          if (element) {
            gsap.fromTo(element, 
              { width: 0 },
              {
                width: "auto",
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div ref={pinRef} className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Animation */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 1],
              [
                "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, #8b5cf6 0%, transparent 50%)"
              ]
            )
          }}
        />

        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full h-full items-center">
            
            {/* Images Side */}
            <div className="relative h-full flex items-center justify-center">
              <div ref={imagesRef} className="relative w-full max-w-lg aspect-square">
                {schoolImagesData.images.slice(0, 5).map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                    animate={isInView ? { opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 0.8, rotateY: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Floating Elements */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Text Side */}
            <div className="relative h-full flex items-center">
              <div ref={textRef} className="w-full">
                {scrollContent.map((content, index) => (
                  <motion.div
                    key={content.id}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : 50 } : {}}
                  >
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <span className="text-purple-400 font-semibold text-lg tracking-wide">
                        {content.subtitle}
                      </span>
                    </motion.div>

                    <motion.h2
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {content.title}
                    </motion.h2>

                    <motion.p
                      className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {content.description}
                    </motion.p>

                    <div className="space-y-3">
                      {content.highlights.map((highlight, highlightIndex) => (
                        <motion.div
                          key={highlightIndex}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 + highlightIndex * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                          <span 
                            className="text-gray-200 font-medium overflow-hidden whitespace-nowrap"
                            data-highlight={`${index}-${highlightIndex}`}
                          >
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress Indicator */}
                    <motion.div
                      className="mt-12 flex space-x-2"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      {scrollContent.map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            dotIndex === index 
                              ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-125' 
                              : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
