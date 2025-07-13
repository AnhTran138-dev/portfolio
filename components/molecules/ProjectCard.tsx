"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="h-full group"
    >
      <div className="relative h-full bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:border-gray-600 transition-all duration-300">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Project preview area */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors duration-300"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded opacity-60"></div>
              </div>
              <span className="text-sm font-medium">Project Preview</span>
            </div>
          </motion.div>

          {/* Floating action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-gray-800 transition-colors border border-gray-700"
              >
                <FaGithub size={16} />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-blue-600 transition-colors border border-gray-700"
              >
                <FaExternalLinkAlt size={14} />
              </motion.a>
            )}
          </div>
        </div>

        <div className="relative z-10 p-6">
          <motion.h3
            className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h3>

          <motion.p
            className="text-gray-400 mb-4 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
            viewport={{ once: true }}
          >
            {technologies.map((tech, techIndex) => (
              <motion.div
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + techIndex * 0.05 + 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full border border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-200">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
