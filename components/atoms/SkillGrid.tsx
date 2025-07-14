"use client";

import React, { forwardRef, memo } from "react";
import { motion } from "framer-motion";
import { SkillBadge } from "./SkillBadge";

interface SkillGridProps {
  skills: string[];
  hoveredSkill: {
    index: number;
    position: { x: number; y: number };
  } | null;
  onSkillHover: (
    skillIndex: number,
    position: { x: number; y: number }
  ) => void;
}

export const SkillGrid = memo(
  forwardRef<HTMLDivElement, SkillGridProps>(
    ({ skills, hoveredSkill, onSkillHover }, ref) => {
      return (
        <div
          ref={ref}
          className="relative z-10 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-0 max-w-7xl mx-auto"
          id="skills-grid"
        >
          {skills.map((skill, skillIndex) => {
            const row = Math.floor(skillIndex / 10);
            const col = skillIndex % 10;
            const isEvenPosition = (row + col) % 2 === 0;
            const isHovered = hoveredSkill?.index === skillIndex;

            return (
              <motion.div
                key={`${skill}-${skillIndex}`}
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
                  scale: isHovered ? 1.4 : 1,
                  zIndex: isHovered ? 50 : 1,
                }}
                whileHover={{
                  rotateY: 15,
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  let gridRect: DOMRect | undefined;
                  if (ref && typeof ref !== "function" && ref.current) {
                    gridRect = ref.current.getBoundingClientRect();
                  }
                  if (gridRect) {
                    onSkillHover(skillIndex, {
                      x: rect.left - gridRect.left + rect.width / 2,
                      y: rect.top - gridRect.top + rect.height / 2,
                    });
                  }
                }}
                className={`
                aspect-square flex items-center justify-center cursor-pointer
                transition-all duration-200 relative group/cell
                ${
                  isEvenPosition
                    ? "bg-gray-800/60 hover:bg-gray-700/80"
                    : "bg-gray-900/60 hover:bg-gray-800/80"
                }
                border border-gray-700/30 hover:border-cyan-500/50
                ${isHovered ? "border-cyan-400 bg-gray-700/90" : ""}
              `}
                title={skill}
              >
                {/* Enhanced glowing effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover/cell:from-cyan-500/20 group-hover/cell:to-blue-500/20 transition-all duration-300"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    background: isHovered
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
                    scale: isHovered ? 1.1 : 1,
                    y: isHovered ? -5 : 0,
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
              Math.ceil(skills.length / 10) * 10 - skills.length
            ),
          }).map((_, emptyIndex) => {
            const totalSkills = skills.length;
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
      );
    }
  )
);

SkillGrid.displayName = "SkillGrid";
