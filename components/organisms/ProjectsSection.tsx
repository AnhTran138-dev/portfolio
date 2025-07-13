"use client";

import React from "react";
import { Section } from "../atoms/Section";
import { ProjectCard } from "../molecules/ProjectCard";
import { FadeIn } from "../atoms/AnimatedText";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
}) => {
  return (
    <Section id="projects" className="bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-400">
              Some of my recent work and personal projects
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
};
