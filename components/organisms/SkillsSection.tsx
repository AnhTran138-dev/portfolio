"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "../atoms/Section";
import { SkillBadge } from "../atoms/SkillBadge";
import { FadeIn } from "../atoms/AnimatedText";
import { cn } from "@/lib/utils";

interface SkillsData {
  "Programming Languages": string[];
  "Frameworks/Libraries": string[];
  "Tools & Platforms": string[];
  Database: string[];
}

interface SkillsSectionProps {
  skills: SkillsData;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  // Flatten all skills into one array
  const allSkills = Object.values(skills).flat();

  // State for tracking hovered skill position
  const [hoveredSkill, setHoveredSkill] = useState<{
    index: number;
    position: { x: number; y: number };
  } | null>(null);

  return (
    <Section id="skills" className="bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Technical{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Skills
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-400">
                Technologies and tools I work with
              </p>
            </motion.div>
          </div>
        </FadeIn>

        {/* Unified Chess Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="relative p-8">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(14, 165, 233, 0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(14, 165, 233, 0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(14, 165, 233, 0.1) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(14, 165, 233, 0.1) 75%)
                  `,
                  backgroundSize: "80px 80px",
                  backgroundPosition: "0 0, 0 40px, 40px -40px, -40px 0px",
                }}
              />
            </div>

            {/* Chess Grid with All Skills */}
            <div
              className="relative z-10 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-0 max-w-7xl mx-auto"
              id="skills-grid"
            >
              {allSkills.map((skill, skillIndex) => {
                const row = Math.floor(skillIndex / 10);
                const col = skillIndex % 10;
                const isEvenPosition = (row + col) % 2 === 0;

                return (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: skillIndex * 0.05,
                      type: "spring",
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    animate={{
                      scale: hoveredSkill?.index === skillIndex ? 1.4 : 1,
                      zIndex: hoveredSkill?.index === skillIndex ? 50 : 1,
                    }}
                    whileHover={{
                      rotateY: 15,
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const gridRect = document
                        .getElementById("skills-grid")
                        ?.getBoundingClientRect();
                      if (gridRect) {
                        setHoveredSkill({
                          index: skillIndex,
                          position: {
                            x: rect.left - gridRect.left + rect.width / 2,
                            y: rect.top - gridRect.top + rect.height / 2,
                          },
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      // Don't reset immediately, let the grid container handle it
                    }}
                    className={`
                      aspect-square flex items-center justify-center cursor-pointer
                      transition-all duration-300 relative group/cell
                      ${
                        isEvenPosition
                          ? "bg-gray-800/60 hover:bg-gray-700/80"
                          : "bg-gray-900/60 hover:bg-gray-800/80"
                      }
                      border border-gray-700/30 hover:border-cyan-500/50
                      ${
                        hoveredSkill?.index === skillIndex
                          ? "border-cyan-400 bg-gray-700/90"
                          : ""
                      }
                    `}
                    title={skill}
                  >
                    {/* Enhanced glowing effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover/cell:from-cyan-500/20 group-hover/cell:to-blue-500/20 transition-all duration-300"
                      animate={{
                        opacity: hoveredSkill?.index === skillIndex ? 1 : 0,
                        background:
                          hoveredSkill?.index === skillIndex
                            ? "linear-gradient(to bottom right, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))"
                            : "linear-gradient(to bottom right, rgba(6, 182, 212, 0), rgba(59, 130, 246, 0))",
                      }}
                    />

                    {/* Icon container */}
                    <div className="relative z-10 transform group-hover/cell:scale-110 transition-transform duration-300">
                      <SkillBadge skill={skill} />
                    </div>

                    {/* Enhanced skill name tooltip */}
                    <motion.div
                      className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-xl opacity-0 group-hover/cell:opacity-100 transition-opacity duration-300 pointer-events-none z-20 whitespace-nowrap border border-cyan-400/50 shadow-2xl"
                      animate={{
                        scale: hoveredSkill?.index === skillIndex ? 1.1 : 1,
                        y: hoveredSkill?.index === skillIndex ? -5 : 0,
                      }}
                    >
                      {skill}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-400/50" />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Fill empty grid cells if needed */}
              {Array.from({
                length: Math.max(
                  0,
                  Math.ceil(allSkills.length / 10) * 10 - allSkills.length
                ),
              }).map((_, emptyIndex) => {
                const totalSkills = allSkills.length;
                const emptySkillIndex = totalSkills + emptyIndex;
                const row = Math.floor(emptySkillIndex / 10);
                const col = emptySkillIndex % 10;
                const isEvenPosition = (row + col) % 2 === 0;

                return (
                  <motion.div
                    key={`empty-${emptyIndex}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: emptySkillIndex * 0.02,
                    }}
                    viewport={{ once: true }}
                    className={`
                      aspect-square border border-gray-700/30
                      ${isEvenPosition ? "bg-gray-800/30" : "bg-gray-900/30"}
                    `}
                  />
                );
              })}
            </div>

            {/* Dynamic Decorative corners that follow hovered skill */}
            <motion.div
              className={cn(
                "absolute border-l-4 border-t-4 border-cyan-400 rounded-tl-lg pointer-events-none",
                hoveredSkill ? "size-6" : "size-12"
              )}
              animate={
                hoveredSkill
                  ? {
                      left: hoveredSkill.position.x - 21,
                      top: hoveredSkill.position.y - 21,
                      scale: 1.5,
                      opacity: 1,
                    }
                  : {
                      left: 0,
                      top: 0,
                      scale: 1,
                      opacity: 0.5,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              style={{ zIndex: 60 }}
            />
            <motion.div
              className={cn(
                "absolute border-r-4 border-t-4 border-cyan-400 rounded-tr-lg pointer-events-none",
                hoveredSkill ? "size-6" : "size-12"
              )}
              animate={
                hoveredSkill
                  ? {
                      right: `calc(100% - ${hoveredSkill.position.x + 85}px)`,
                      top: hoveredSkill.position.y - 21,
                      scale: 1.5,
                      opacity: 1,
                    }
                  : {
                      right: 0,
                      top: 0,
                      scale: 1,
                      opacity: 0.5,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              style={{ zIndex: 60 }}
            />
            <motion.div
              className={cn(
                "absolute border-l-4 border-b-4 border-cyan-400 rounded-bl-lg pointer-events-none",
                hoveredSkill ? "size-6" : "size-12"
              )}
              animate={
                hoveredSkill
                  ? {
                      left: hoveredSkill.position.x - 21,
                      bottom: `calc(100% - ${hoveredSkill.position.y + 86}px)`,
                      scale: 1.5,
                      opacity: 1,
                    }
                  : {
                      left: 0,
                      bottom: 0,
                      scale: 1,
                      opacity: 0.5,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              style={{ zIndex: 60 }}
            />
            <motion.div
              className={cn(
                "absolute border-r-4 border-b-4 border-cyan-400 rounded-br-lg pointer-events-none",
                hoveredSkill ? "size-6" : "size-12"
              )}
              animate={
                hoveredSkill
                  ? {
                      right: `calc(100% - ${hoveredSkill.position.x + 85}px)`,
                      bottom: `calc(100% - ${hoveredSkill.position.y + 86}px)`,
                      scale: 1.5,
                      opacity: 1,
                    }
                  : {
                      right: 0,
                      bottom: 0,
                      scale: 1,
                      opacity: 0.5,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              style={{ zIndex: 60 }}
            />

            {/* Grid container mouse leave handler */}
            <div
              className="absolute inset-0 pointer-events-auto"
              onMouseLeave={() => setHoveredSkill(null)}
            />
          </div>
        </div>

        {/* Skills Counter */}
        <FadeIn delay={1}>
          <div className="mt-12 text-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700/30 rounded-2xl px-8 py-4"
            >
              <div className="text-3xl font-black text-cyan-400 mb-1">
                {allSkills.length}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                Technologies Mastered
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};
