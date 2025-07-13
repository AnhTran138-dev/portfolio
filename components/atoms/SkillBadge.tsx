import React from "react";
import { Icon } from "@iconify/react";

interface SkillBadgeProps {
  skill: string;
}

const getSkillIcon = (skill: string): string => {
  const skillLower = skill.toLowerCase();

  // Programming Languages
  if (skillLower.includes("reactquery")) return "logos:react-query-icon";
  if (skillLower.includes("typescript")) return "logos:typescript-icon";
  if (skillLower.includes("javascript")) return "logos:javascript";
  if (skillLower.includes("java") && !skillLower.includes("javascript"))
    return "logos:java";
  if (skillLower.includes("python")) return "logos:python";

  // Frameworks/Libraries
  if (skillLower.includes("threejs") || skillLower.includes("three.js"))
    return "logos:threejs";
  if (skillLower.includes("react") && !skillLower.includes("native"))
    return "logos:react";
  if (skillLower.includes("react native")) return "tabler:brand-react-native";
  if (skillLower.includes("nextjs") || skillLower.includes("next.js"))
    return "logos:nextjs-icon";
  if (skillLower.includes("nestjs") || skillLower.includes("nest.js"))
    return "logos:nestjs";
  if (skillLower.includes("expo")) return "simple-icons:expo";
  if (skillLower.includes("tailwind")) return "logos:tailwindcss-icon";
  if (skillLower.includes("redux")) return "logos:redux";
  if (skillLower.includes("framer")) return "logos:framer";
  if (skillLower.includes("express")) return "logos:express";
  if (skillLower.includes("nextauth")) return "simple-icons:nextdotjs";
  if (skillLower.includes("prisma")) return "logos:prisma";

  // Tools & Platforms
  if (skillLower.includes("docker")) return "logos:docker-icon";
  if (skillLower.includes("git")) return "logos:git-icon";
  if (skillLower.includes("bun")) return "logos:bun";
  if (skillLower.includes("figma")) return "logos:figma";
  if (skillLower.includes("postman")) return "logos:postman-icon";
  if (skillLower.includes("websocket")) return "simple-icons:socketdotio";
  if (skillLower.includes("vs code") || skillLower.includes("vscode"))
    return "logos:visual-studio-code";
  if (skillLower.includes("eas")) return "simple-icons:expo";

  // Databases
  if (skillLower.includes("mysql")) return "logos:mysql-icon";
  if (skillLower.includes("postgresql") || skillLower.includes("postgres"))
    return "logos:postgresql";
  if (skillLower.includes("mongodb") || skillLower.includes("mongo"))
    return "logos:mongodb-icon";

  // Default fallback
  return "mdi:code-tags";
};

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  const iconName = getSkillIcon(skill);

  return (
    <div className="flex items-center justify-center">
      <Icon
        icon={iconName}
        className="text-2xl md:text-3xl text-white/80 hover:text-white transition-colors duration-300"
      />
    </div>
  );
};
