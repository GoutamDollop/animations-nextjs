import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Calendar,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".contact-header",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      // Form animation
      gsap.fromTo(
        ".contact-form",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Info cards animation
      gsap.fromTo(
        ".contact-info",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-info",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Form fields animation
      gsap.fromTo(
        ".form-field",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general",
    });

    // Show success message
    gsap.fromTo(
      ".success-message",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
    );
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Campus",
      details: ["123 Education Street", "Learning City, LC 12345"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri: 8AM-6PM"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@eduverse.edu", "Quick response guaranteed"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 8AM - 6PM", "Saturday: 9AM - 4PM"],
      color: "from-orange-500 to-red-500",
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "admission", label: "Admissions" },
    { value: "academic", label: "Academic Programs" },
    { value: "financial", label: "Financial Aid" },
    { value: "visit", label: "Campus Visit" },
    { value: "other", label: "Other" },
  ];

  return (
    <div ref={pageRef} className="min-h-screen pt-16 md:pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <HeroBreadcrumb />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 md:w-32 h-20 md:h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-16 md:w-24 h-16 md:h-24 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-12 md:w-16 h-12 md:h-16 bg-green-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-1/4 w-8 md:w-12 h-8 md:h-12 bg-orange-300 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="contact-header max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 md:mb-6">
              Get In Touch 📞
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2">
              Ready to start your educational journey? We're here to help you
              every step of the way!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <div className="contact-form">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Send us a Message 💌
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div className="form-field">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What can we help you with?
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone and Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us more about your inquiry..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="form-field">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Success Message */}
                <div className="success-message hidden mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800 font-semibold">
                      Message sent successfully!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info">
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Contact Information 📍
                  </h2>
                  <p className="text-gray-600">
                    Multiple ways to reach us. Choose what works best for you!
                  </p>
                </div>

                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${info.color} rounded-xl shadow-lg`}
                      >
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Ready to Apply? 🎓</h3>
                  <p className="mb-6">
                    Start your journey with us today! Our admissions team is
                    ready to guide you.
                  </p>
                  <div className="space-y-3">
                    <button className="w-full bg-white text-orange-600 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      Apply for Admission
                    </button>
                    <button className="w-full bg-transparent border-2 border-white text-white py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:bg-white hover:text-orange-600 transition-all duration-300 flex items-center justify-center space-x-2">
                      <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Schedule Campus Tour</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
