import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeacherCard from "../components/TeacherCard";
import CustomCursor from "../components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function Teachers() {
  useEffect(() => {
    gsap.fromTo(
      ".teachers-header",
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
    );
  }, []);

  const allTeachers = [
    {
      name: "Dr. Sarah Johnson",
      position: "Principal & Mathematics Professor",
      image:
        "https://images.pexels.com/photos/6929160/pexels-photo-6929160.jpeg",
      experience: "15+ Years",
      education: "PhD in Mathematics Education, Harvard University",
      specialization: "Advanced Mathematics & STEM Education",
      email: "sarah.johnson@eduverse.edu",
      phone: "+1 (555) 123-4567",
      rating: 5,
      students: 500,
      description:
        "Dr. Sarah Johnson is our visionary principal with over 15 years of experience in mathematics education. She has revolutionized our STEM programs and mentored hundreds of students to achieve academic excellence.",
      achievements: [
        "Published 25+ research papers in mathematics education",
        "Recipient of National Teaching Excellence Award 2023",
        "Led the development of innovative STEM curriculum",
        "Mentored 50+ students into top universities",
      ],
    },
    {
      name: "Prof. Michael Chen",
      position: "Computer Science Department Head",
      image:
        "https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg",
      experience: "12+ Years",
      education: "PhD in Computer Science, MIT",
      specialization: "AI, Machine Learning & Programming",
      email: "michael.chen@eduverse.edu",
      phone: "+1 (555) 234-5678",
      rating: 5,
      students: 350,
      description:
        "Professor Michael Chen brings cutting-edge technology education to our students. His innovative teaching methods in AI and programming have inspired countless students to pursue careers in technology.",
      achievements: [
        "Former Google Senior Software Engineer",
        "Created award-winning programming bootcamp",
        "Published AI research in top-tier journals",
        "100% student placement rate in tech companies",
      ],
    },
    {
      name: "Dr. Emily Rodriguez",
      position: "English Literature & Creative Writing",
      image:
        "https://images.pexels.com/photos/6929160/pexels-photo-6929160.jpeg",
      experience: "10+ Years",
      education: "PhD in English Literature, Oxford University",
      specialization: "Creative Writing & Literature Analysis",
      email: "emily.rodriguez@eduverse.edu",
      phone: "+1 (555) 345-6789",
      rating: 5,
      students: 280,
      description:
        "Dr. Emily Rodriguez inspires students through the power of words and storytelling. Her dynamic teaching methods have helped students discover their voices and excel in creative expression.",
      achievements: [
        "Published novelist with 3 bestselling books",
        "Winner of National Creative Writing Award",
        "Established school literary magazine",
        "90% of students pursue creative writing",
      ],
    },
    {
      name: "Prof. David Kim",
      position: "Physics & Engineering Sciences",
      image:
        "https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg",
      experience: "8+ Years",
      education: "PhD in Physics, Stanford University",
      specialization: "Quantum Physics & Engineering Design",
      email: "david.kim@eduverse.edu",
      phone: "+1 (555) 456-7890",
      rating: 5,
      students: 200,
      description:
        "Professor David Kim makes complex physics concepts accessible and exciting. His hands-on approach to teaching has led to numerous student achievements in science competitions.",
      achievements: [
        "Former NASA research scientist",
        "Students won 15+ science fair awards",
        "Developed innovative physics lab equipment",
        "Featured in Science Education Journal",
      ],
    },
  ];

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen pt-20 lg:pt-24">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-300 rounded-full animate-ping"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <div className="teachers-header">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6">
                Meet Our Amazing Teachers 👨‍🏫👩‍🏫
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
                Our passionate educators are dedicated to nurturing young minds
                and inspiring the next generation of leaders, innovators, and
                changemakers! ✨
              </p>
            </div>
          </div>
        </section>

        {/* Teachers Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {allTeachers.map((teacher, index) => (
                <TeacherCard key={index} {...teacher} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Want to Join Our Teaching Team? 🎓
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We're always looking for passionate educators to join our mission
              of transforming young lives through education!
            </p>
            <button className="inline-flex items-center space-x-3 bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <span>Apply to Teach</span>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
