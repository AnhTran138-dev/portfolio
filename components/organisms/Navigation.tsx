"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  // const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        " sm:fixed top-0 left-0 right-0 z-50 transition-all duration-300 sm:bg-black/40 bg-transparent/10 backdrop-blur-md shadow-2xl"
      )}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center py-4">
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                )}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"
                  whileHover={{ scale: 1.05 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-400 hover:text-white transition-colors p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
