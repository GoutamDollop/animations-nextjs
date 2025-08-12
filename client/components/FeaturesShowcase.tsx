import React from "react";
import {
  Sparkles,
  Zap,
  Layers,
  MousePointer,
  Smartphone,
  Gauge,
  Star,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "GSAP Animations",
    description:
      "Advanced scroll-triggered animations with smooth transitions and physics-based effects",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Layers,
    title: "Lenis Smooth Scrolling",
    description: "Buttery smooth scrolling experience with momentum and easing",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MousePointer,
    title: "Advanced Cursor",
    description:
      "Section-specific cursor effects with trails, sparkles, and magnetic interactions",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Three.js Particles",
    description:
      "Interactive 3D particle systems and geometric animations for premium feel",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description:
      "Perfect experience across all devices with optimized touch interactions",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Gauge,
    title: "Performance Optimized",
    description:
      "60fps animations with GPU acceleration and efficient memory usage",
    color: "from-red-500 to-pink-500",
  },
];

export default function FeaturesShowcase() {
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 transform transition-all duration-500 hover:scale-105">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Modern Features</h3>
          <p className="text-sm text-gray-600">Premium animations & UX</p>
        </div>
      </div>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 group">
            <div
              className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
            >
              <feature.icon className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-200">
                {feature.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Built with ❤️</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>Premium Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}
