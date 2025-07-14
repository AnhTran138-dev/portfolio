"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SkillBadge } from "../atoms/SkillBadge";
import { DynamicCorners } from "../atoms/DynamicCorners";

interface SkillsGridProps {
  skills: string[];
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  className?: string;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({
  skills,
  columns = { mobile: 6, tablet: 8, desktop: 10 },
  className = "",
}) => {
  // State for tracking hovered skill position
  const [hoveredSkill, setHoveredSkill] = useState<{
    index: number;
    position: { x: number; y: number };
  } | null>(null);

  // Calculate grid classes
  const gridClasses = `grid grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} gap-0 max-w-7xl mx-auto`;

  // Calculate total cells needed for complete rows
  const totalCellsNeeded =
    Math.ceil(skills.length / columns.desktop) * columns.desktop;
  const emptyCellsCount = totalCellsNeeded - skills.length;

  return (
    <div className={`relative ${className}`}>
      {/* Grid Background Pattern */}
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

      {/* Skills Grid */}
      <div className={`relative z-10 ${gridClasses}`} id="skills-grid">
        {/* Render Skills */}
        {skills.map((skill, skillIndex) => {
          const row = Math.floor(skillIndex / columns.desktop);
          const col = skillIndex % columns.desktop;
          const isEvenPosition = (row + col) % 2 === 0;

          return (
            <SkillGridCell
              key={skillIndex}
              skill={skill}
              index={skillIndex}
              isEvenPosition={isEvenPosition}
              isHovered={hoveredSkill?.index === skillIndex}
              onHover={(position) =>
                setHoveredSkill({ index: skillIndex, position })
              }
              onLeave={() => {}}
            />
          );
        })}

        {/* Render Empty Cells */}
        {Array.from({ length: emptyCellsCount }).map((_, emptyIndex) => {
          const totalSkills = skills.length;
          const emptySkillIndex = totalSkills + emptyIndex;
          const row = Math.floor(emptySkillIndex / columns.desktop);
          const col = emptySkillIndex % columns.desktop;
          const isEvenPosition = (row + col) % 2 === 0;

          return (
            <EmptyGridCell
              key={`empty-${emptyIndex}`}
              index={emptySkillIndex}
              isEvenPosition={isEvenPosition}
            />
          );
        })}
      </div>

      {/* Dynamic Corners */}
      <DynamicCorners hoveredItem={hoveredSkill} />

      {/* Grid Container Mouse Leave Handler */}
      <div
        className="absolute inset-0 pointer-events-auto"
        onMouseLeave={() => setHoveredSkill(null)}
      />
    </div>
  );
};

// Skill Grid Cell Component
interface SkillGridCellProps {
  skill: string;
  index: number;
  isEvenPosition: boolean;
  isHovered: boolean;
  onHover: (position: { x: number; y: number }) => void;
  onLeave: () => void;
}

const SkillGridCell: React.FC<SkillGridCellProps> = ({
  skill,
  index,
  isEvenPosition,
  isHovered,
  onHover,
  onLeave,
}) => {
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const gridRect = document
      .getElementById("skills-grid")
      ?.getBoundingClientRect();
    if (gridRect) {
      onHover({
        x: rect.left - gridRect.left + rect.width / 2,
        y: rect.top - gridRect.top + rect.height / 2,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotateY: 180 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      animate={{
        scale: isHovered ? 1.4 : 1,
        zIndex: isHovered ? 50 : 1,
      }}
      whileHover={{ rotateY: 15 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      className={`
        aspect-square flex items-center justify-center cursor-pointer
        transition-all duration-300 relative group/cell
        ${isEvenPosition ? "bg-gray-800/60 hover:bg-gray-700/80" : "bg-gray-900/60 hover:bg-gray-800/80"}
        border border-gray-700/30 hover:border-cyan-500/50
        ${isHovered ? "border-cyan-400 bg-gray-700/90" : ""}
      `}
      title={skill}
    >
      {/* Glowing Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover/cell:from-cyan-500/20 group-hover/cell:to-blue-500/20 transition-all duration-300"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? "linear-gradient(to bottom right, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))"
            : "linear-gradient(to bottom right, rgba(6, 182, 212, 0), rgba(59, 130, 246, 0))",
        }}
      />

      {/* Icon Container */}
      <div className="relative z-10 transform group-hover/cell:scale-110 transition-transform duration-300">
        <SkillBadge skill={skill} />
      </div>

      {/* Tooltip */}
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
};

// Empty Grid Cell Component
interface EmptyGridCellProps {
  index: number;
  isEvenPosition: boolean;
}

const EmptyGridCell: React.FC<EmptyGridCellProps> = ({
  index,
  isEvenPosition,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.02,
      }}
      viewport={{ once: true }}
      className={`
        aspect-square border border-gray-700/30
        ${isEvenPosition ? "bg-gray-800/30" : "bg-gray-900/30"}
      `}
    />
  );
};
