import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/about": "About Us",
  "/courses": "Courses",
  "/teachers": "Teachers",
  "/events": "Events",
  "/gallery": "Gallery",
  "/contact": "Contact",
  "/testimonials": "Testimonials",
};

interface ConditionalBreadcrumbProps {
  showOnPages?: string[];
}

export default function ConditionalBreadcrumb({
  showOnPages = [
    "/about",
    "/courses",
    "/teachers",
    "/events",
    "/gallery",
    "/contact",
    "/testimonials",
  ],
}: ConditionalBreadcrumbProps) {
  const location = useLocation();

  // Only show on specified pages
  if (!showOnPages.includes(location.pathname)) return null;

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const items: BreadcrumbItem[] = [{ label: "Home", path: "/" }];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label =
        routeLabels[currentPath] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);
      items.push({
        label,
        path: currentPath,
      });
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <React.Fragment key={item.path}>
                {index === 0 ? (
                  <Home className="w-4 h-4 text-gray-500" />
                ) : null}

                {isLast ? (
                  <span className="text-orange-500 font-medium">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}

                {!isLast && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
