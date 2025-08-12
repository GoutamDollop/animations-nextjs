import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModernLayout from "./layouts/ModernLayout";

// Pages
import ModernIndex from "./pages/ModernIndex";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Teachers from "./pages/Teachers";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ModernLayout>
        <Routes>
          <Route path="/" element={<ModernIndex />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ModernLayout>
    </BrowserRouter>
  );
}

export default App;
