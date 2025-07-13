"use client";

import { PortfolioTemplate } from "@/components/templates/PortfolioTemplate";

const portfolioData = {
  personal: {
    name: "Trần Hoàng Trung Anh",
    title: "Frontend Developer",
    description:
      "Passionate Frontend Developer with experience in modern web technologies. Recent graduate from FPT University with a strong foundation in React, Next.js, Expo and Node.js.",
    avatarUrl:
      "https://res.cloudinary.com/core-app/image/upload/v1752314236/465847014_543426968395672_883528601496996806_n_amebqj.jpg",
    cvUrl: "/cv.pdf",
  },
  about: {
    content:
      "Passionate Frontend Developer with hands-on experience in building modern web applications using React, Next.js, and TypeScript. Fresh graduate from FPT University with a Software Engineering degree, I have gained practical experience through internships and personal projects. I enjoy creating user-friendly interfaces and staying up-to-date with the latest web technologies. My goal is to contribute to innovative projects while continuously learning and growing as a developer.",
  },
  skills: {
    "Programming Languages": ["TypeScript", "JavaScript", "Java"],
    "Frameworks/Libraries": [
      "ReactJS",
      "NextJS",
      "NestJS",
      "Expo",
      "Redux Toolkit",
      "Framer Motion",
      "React Native",
      "TailwindCSS",
      "ThreeJS",
      "NextAuth",
      "Prisma",
      "ReactQuery",
    ],
    "Tools & Platforms": [
      "Docker",
      "Git",
      "Figma",
      "Postman",
      "WebSocket",
      "Bun",
      "VS Code",
    ],
    Database: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  experience: [
    {
      title: "Frontend Developer Intern",
      company: "FPT Software",
      period: "Jun 2024 - Sep 2024",
      description:
        "Worked on the FAMS (Faculty Academic Management System) project, developing responsive web interfaces and implementing user-friendly features for academic management.",
      technologies: [
        "React",
        "TypeScript",
        "Redux",
        "Material-UI",
        "REST APIs",
      ],
      projects: [
        "Developed student management module with CRUD operations",
        "Implemented responsive dashboard with data visualization",
        "Created user authentication and authorization features",
      ],
    },
  ],
  projects: [
    {
      title: "PCDACO - Rental Car Platform",
      description:
        "A comprehensive car rental platform built with modern technologies, featuring real-time location tracking, booking management, and payment integration.",
      technologies: [
        "Expo",
        "NextJS",
        "React Native",
        "Mapbox",
        "TypeScript",
        "Node.js",
      ],
      githubUrl: "https://github.com/username/pcdaco",
      imageUrl: "/api/placeholder/400/250",
    },
    {
      title: "VitomOrg - 3D Ecommerce Platform",
      description:
        "An innovative e-commerce platform featuring 3D product visualization, allowing customers to interact with products in a virtual environment before purchase.",
      technologies: [
        "ThreeJS",
        "React",
        "NextJS",
        "WebGL",
        "TypeScript",
        "MongoDB",
      ],
      githubUrl: "https://github.com/username/vitomorg",
      liveUrl: "https://vitomorg.vercel.app",
      imageUrl: "/api/placeholder/400/250",
    },
  ],
  education: {
    education: [
      {
        degree: "Bachelor of Software Engineering",
        institution: "FPT University",
        period: "09/2020 - 05/2025",
        major: "Software Engineering",
      },
    ],
    certifications: [
      {
        name: "Academic English Certificate",
        issuer: "FPT University",
      },
      {
        name: "Software Development Lifecycle",
        issuer: "FPT University",
      },
      {
        name: "Project Management Fundamentals",
        issuer: "FPT University",
      },
    ],
    languages: [
      {
        language: "English",
        level: "B1",
      },
      {
        language: "Japanese",
        level: "N4",
      },
      {
        language: "Vietnamese",
        level: "Native",
      },
    ],
  },
  contact: {
    email: "developer@example.com",
    phone: "+84 xxx xxx xxx",
    address: "Ho Chi Minh City, Vietnam",
    githubUrl: "https://github.com/username",
    linkedinUrl: "https://linkedin.com/in/username",
  },
};

export default function HomePage() {
  return <PortfolioTemplate data={portfolioData} />;
}
