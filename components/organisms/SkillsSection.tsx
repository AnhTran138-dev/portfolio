"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { Section } from "../atoms/Section";
import { SkillGrid } from "../atoms/SkillGrid";
import { DecorativeCorners } from "../atoms/DecorativeCorners";
import { SkillsHeader } from "../atoms/SkillsHeader";
import { SkillsCounter } from "../atoms/SkillsCounter";
import { ChessBackground } from "../atoms/ChessBackground";

interface SkillsData {
  "Programming Languages": string[];
  "Frameworks/Libraries": string[];
  "Tools & Platforms": string[];
  Database: string[];
}

interface SkillsSectionProps {
  skills: SkillsData;
}

interface HoveredSkill {
  index: number;
  position: { x: number; y: number };
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  // Memoize flattened skills to prevent recalculation
  const allSkills = useMemo(() => Object.values(skills).flat(), [skills]);

  // State for tracking hovered skill position
  const [hoveredSkill, setHoveredSkill] = useState<HoveredSkill | null>(null);

  // Ref for grid container
  const gridRef = useRef<HTMLDivElement>(null);

  // Memoized callback to prevent re-renders
  const handleSkillHover = useCallback(
    (skillIndex: number, position: { x: number; y: number }) => {
      setHoveredSkill({ index: skillIndex, position });
    },
    []
  );

  // Memoized callback for mouse leave
  const handleMouseLeave = useCallback(() => {
    setHoveredSkill(null);
  }, []);

  return (
    <Section id="skills" className="bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <SkillsHeader />

        {/* Unified Chess Grid */}
        <div className="max-w-6xl mx-auto" onMouseLeave={handleMouseLeave}>
          <div className="relative p-4 md:p-6 lg:p-8">
            {/* Grid Background */}
            <ChessBackground />

            {/* Chess Grid with All Skills */}
            <SkillGrid
              ref={gridRef}
              skills={allSkills}
              hoveredSkill={hoveredSkill}
              onSkillHover={handleSkillHover}
            />

            {/* Dynamic Decorative corners */}
            <DecorativeCorners hoveredSkill={hoveredSkill} />
          </div>
        </div>

        {/* Skills Counter */}
        <SkillsCounter count={allSkills.length} />
      </div>
    </Section>
  );
};
