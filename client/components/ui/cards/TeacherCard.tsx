import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Users, 
  Star,
  MapPin, 
  BookOpen, 
  MessageCircle,
  ExternalLink,
  Clock,
  Trophy,
  Heart,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TeacherCardProps {
  name: string;
  position: string;
  image: string;
  experience: string;
  education: string;
  specialization: string;
  email: string;
  phone: string;
  rating: number;
  students: number;
  description: string;
  achievements: string[];
  department?: string;
  office?: string;
  availability?: {
    days: string[];
    hours: string;
  };
}

export default function TeacherCard({
  name,
  position,
  image,
  experience,
  education,
  specialization,
  email,
  phone,
  rating,
  students,
  description,
  achievements,
  department = 'Academic',
  office,
  availability = { days: ['Mon-Fri'], hours: '9:00 AM - 5:00 PM' }
}: TeacherCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Simplified animations on mount
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: Math.random() * 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // Generate color scheme based on department
  const getColorScheme = (dept: string) => {
    const colorMap: { [key: string]: string } = {
      'Computer Science': 'from-blue-500 to-cyan-500',
      'Mathematics': 'from-purple-500 to-pink-500',
      'Physics': 'from-orange-500 to-red-500',
      'Chemistry': 'from-green-500 to-emerald-500',
      'Biology': 'from-teal-500 to-blue-500',
      'Literature': 'from-indigo-500 to-purple-500',
      'History': 'from-amber-500 to-orange-500',
      'Art': 'from-pink-500 to-rose-500',
      'Music': 'from-violet-500 to-purple-500',
      'Physical Education': 'from-lime-500 to-green-500',
      'Academic': 'from-gray-600 to-gray-800',
    };
    return colorMap[dept] || 'from-gray-500 to-slate-500';
  };

  // Hover effects
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        rotationY: 5,
        z: 50,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        rotationY: 0,
        z: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000 max-w-sm mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.random() * 0.2 }}
    >
      {/* Main Card */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 overflow-hidden transform-gpu transition-all duration-500 hover:shadow-2xl">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getColorScheme(department)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-purple-500" />
          </motion.div>
        </div>

        {/* Header Section */}
        <div className="relative p-6 pb-4">
          {/* Profile Image */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-white/50 group-hover:border-white/80 transition-all duration-300">
              <motion.img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Rating Badge */}
            <motion.div
              className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 12 }}
            >
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-white fill-current" />
                <span className="text-white font-bold text-xs">{rating}</span>
              </div>
            </motion.div>
          </div>

          {/* Teacher Info */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              {name}
            </h3>
            <p className="text-blue-600 font-semibold text-sm">{position}</p>
            <div className={`inline-flex items-center space-x-1 bg-gradient-to-r ${getColorScheme(department)} text-white px-3 py-1 rounded-full text-xs font-medium shadow-md`}>
              <BookOpen className="w-3 h-3" />
              <span>{department}</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-3 gap-3">
            <motion.div 
              className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.8)' }}
            >
              <div className="flex items-center justify-center mb-1">
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-lg font-bold text-gray-900">{experience}</div>
              <div className="text-xs text-gray-600">Years</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.8)' }}
            >
              <div className="flex items-center justify-center mb-1">
                <Users className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-lg font-bold text-gray-900">{students}</div>
              <div className="text-xs text-gray-600">Students</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.8)' }}
            >
              <div className="flex items-center justify-center mb-1">
                <Trophy className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-lg font-bold text-gray-900">{achievements.length}</div>
              <div className="text-xs text-gray-600">Awards</div>
            </motion.div>
          </div>
        </div>

        {/* Bio Preview */}
        <div className="px-6 pb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Specialization */}
        <div className="px-6 pb-6">
          <div className="flex justify-center">
            <motion.span
              className="px-3 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-xl text-sm font-medium border border-purple-200"
              whileHover={{ scale: 1.05 }}
            >
              <Target className="w-4 h-4 inline mr-2" />
              {specialization}
            </motion.span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 flex space-x-3">
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="w-4 h-4" />
            <span>View Profile</span>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
          
          <motion.a
            href={`mailto:${email}`}
            className="flex items-center justify-center bg-white/80 backdrop-blur-sm text-gray-700 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="border-t border-gray-200/50 bg-gradient-to-br from-gray-50/50 to-blue-50/30 backdrop-blur-sm"
            >
              <div className="p-6 space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span>Contact Information</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${email}`} className="hover:text-blue-600 transition-colors">
                        {email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{phone}</span>
                    </div>
                    {office && (
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{office}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-purple-500" />
                    <span>Education</span>
                  </h4>
                  <div className="text-sm text-gray-600 flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{education}</span>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>Recent Achievements</span>
                  </h4>
                  <div className="space-y-2">
                    {achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <Trophy className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span>Office Hours</span>
                  </h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm text-green-700">
                      <div className="font-medium">{availability.days.join(', ')}</div>
                      <div className="text-green-600 mt-1">{availability.hours}</div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Meeting</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Like Button */}
      <motion.button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart className={`w-5 h-5 transition-colors duration-300 ${
          isLiked ? 'text-red-500 fill-current' : 'text-gray-400'
        }`} />
      </motion.button>
    </motion.div>
  );
}
