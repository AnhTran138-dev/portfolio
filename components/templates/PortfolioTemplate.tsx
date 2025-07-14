"use client";

import React from "react";
import Navigation from "../organisms/Navigation";
import ScrollToTop from "../atoms/ScrollToTop";
import { HeroSection } from "../molecules/HeroSection";
import { AboutSection } from "../organisms/AboutSection";
import { SkillsSection } from "../organisms/SkillsSection";
import { ExperienceSection } from "../organisms/ExperienceSection";
import { ProjectsSection } from "../organisms/ProjectsSection";
import { ContactSection } from "../organisms/ContactSection";

interface PortfolioData {
  personal: {
    name: string;
    title: string;
    description: string;
    avatarUrl?: string;
    cvUrl?: string;
  };
  about: {
    content: string;
  };
  skills: {
    "Programming Languages": string[];
    "Frameworks/Libraries": string[];
    "Tools & Platforms": string[];
    Database: string[];
  };
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
    projects?: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
  }>;
  education: {
    education: Array<{
      degree: string;
      institution: string;
      period: string;
      major?: string;
    }>;
    certifications: Array<{
      name: string;
      issuer?: string;
      year?: string;
    }>;
    languages: Array<{
      language: string;
      level: string;
    }>;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
    githubUrl?: string;
    linkedinUrl?: string;
  };
}

interface PortfolioTemplateProps {
  data: PortfolioData;
}

export const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({
  data,
}) => {
  return (
    <main className="min-h-screen">
      <Navigation />

      <HeroSection
        name={data.personal.name}
        title={data.personal.title}
        description={data.personal.description}
        avatarUrl={data.personal.avatarUrl}
        cvUrl={data.personal.cvUrl}
        githubUrl={data.contact.githubUrl}
        linkedinUrl={data.contact.linkedinUrl}
        email={data.contact.email}
      />

      <AboutSection content={data.about.content} />

      <SkillsSection skills={data.skills} />

      <ExperienceSection experiences={data.experience} />

      <ProjectsSection projects={data.projects} />

      {/* <EducationSection
        education={data.education.education}
        certifications={data.education.certifications}
        languages={data.education.languages}
      /> */}

      <ContactSection contactInfo={data.contact} />

      <ScrollToTop />
    </main>
  );
};
