import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  ChevronLeft,
  ChevronRight,
  Star,
  Ticket,
  Heart,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".events-header",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      // Event cards animation
      gsap.utils.toArray(".event-card").forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    "All",
    "Academic",
    "Sports",
    "Cultural",
    "Workshop",
    "Competition",
  ];

  const events = [
    {
      id: 1,
      title: "Annual Science Fair",
      category: "Academic",
      date: "2024-03-15",
      time: "9:00 AM - 5:00 PM",
      location: "Science Building",
      attendees: 150,
      price: "Free",
      image:
        "https://images.pexels.com/photos/6929160/pexels-photo-6929160.jpeg",
      description:
        "Showcase of innovative student projects and scientific discoveries.",
      featured: true,
    },
    {
      id: 2,
      title: "Basketball Championship",
      category: "Sports",
      date: "2024-03-22",
      time: "2:00 PM - 6:00 PM",
      location: "Sports Complex",
      attendees: 300,
      price: "$5",
      image:
        "https://images.pexels.com/photos/6238130/pexels-photo-6238130.jpeg",
      description: "Inter-school basketball tournament with exciting matches.",
      featured: false,
    },
    {
      id: 3,
      title: "Cultural Night",
      category: "Cultural",
      date: "2024-03-28",
      time: "7:00 PM - 10:00 PM",
      location: "Main Auditorium",
      attendees: 500,
      price: "$10",
      image:
        "https://images.pexels.com/photos/8199708/pexels-photo-8199708.jpeg",
      description:
        "Celebration of diverse cultures with performances and food.",
      featured: true,
    },
    {
      id: 4,
      title: "Coding Workshop",
      category: "Workshop",
      date: "2024-04-05",
      time: "10:00 AM - 4:00 PM",
      location: "Computer Lab",
      attendees: 50,
      price: "$25",
      image:
        "https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg",
      description: "Learn programming fundamentals and build your first app.",
      featured: false,
    },
    {
      id: 5,
      title: "Math Olympiad",
      category: "Competition",
      date: "2024-04-12",
      time: "9:00 AM - 3:00 PM",
      location: "Lecture Hall A",
      attendees: 100,
      price: "Free",
      image:
        "https://images.pexels.com/photos/5274601/pexels-photo-5274601.jpeg",
      description:
        "Test your mathematical skills in this challenging competition.",
      featured: false,
    },
    {
      id: 6,
      title: "Art Exhibition",
      category: "Cultural",
      date: "2024-04-18",
      time: "11:00 AM - 7:00 PM",
      location: "Art Gallery",
      attendees: 200,
      price: "Free",
      image:
        "https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg",
      description:
        "Showcase of student artwork from various mediums and styles.",
      featured: true,
    },
  ];

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Academic: "bg-blue-100 text-blue-800",
      Sports: "bg-green-100 text-green-800",
      Cultural: "bg-purple-100 text-purple-800",
      Workshop: "bg-orange-100 text-orange-800",
      Competition: "bg-red-100 text-red-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div ref={pageRef} className="min-h-screen pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <HeroBreadcrumb />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-300 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="events-header max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 md:mb-6">
              Events & Activities 🎉
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
              Join us for exciting events, competitions, and activities that
              bring our community together and create lasting memories!
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Upcoming Events
              </h2>
              <p className="text-gray-600">
                {filteredEvents.length} event
                {filteredEvents.length !== 1 ? "s" : ""} coming up
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`event-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${
                  event.featured ? "ring-2 ring-purple-500" : ""
                }`}
              >
                {/* Event Image */}
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  {event.featured && (
                    <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Featured</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-bold text-gray-800">
                      {event.price}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs md:text-sm font-semibold px-3 py-1 rounded-full ${getCategoryColor(event.category)}`}
                    >
                      {event.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {event.attendees}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 md:space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-1">
                      <Ticket className="h-4 w-4" />
                      <span>Register</span>
                    </button>
                    <button className="px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors duration-300">
                      <Heart className="h-4 md:h-5 w-4 md:w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">
              Have an Event Idea? 💡
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed">
              We love to hear from our community! Share your event ideas and
              help us create amazing experiences together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-white text-purple-600 px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                <span>Submit Event Idea</span>
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button className="inline-flex items-center justify-center space-x-2 md:space-x-3 bg-transparent border-2 md:border-3 border-white text-white px-6 md:px-10 py-3 md:py-5 rounded-2xl font-bold text-base md:text-xl hover:bg-white hover:text-purple-600 transition-all duration-300">
                <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                <span>View Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
