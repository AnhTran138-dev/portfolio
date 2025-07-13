"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "../atoms/Section";
import { FadeIn } from "../atoms/AnimatedText";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  projects?: string[];
}

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  return (
    <Section id="experience" className="bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
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
                Work{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl text-gray-400">
                Professional journey and achievements
              </p>
            </motion.div>
          </div>
        </FadeIn>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl hover:border-gray-600 transition-all duration-300 overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Timeline indicator */}
                <div className="absolute left-0 top-8 w-1 h-16 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>

                <div className="relative z-10 ml-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <motion.h3
                        className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        {experience.title}
                      </motion.h3>
                      <motion.p
                        className="text-xl font-semibold text-cyan-400"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        {experience.company}
                      </motion.p>
                    </div>
                    <motion.div
                      className="mt-2 md:mt-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      <span className="inline-flex items-center px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium rounded-full border border-gray-700">
                        {experience.period}
                      </span>
                    </motion.div>
                  </div>

                  <motion.p
                    className="text-gray-400 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {experience.description}
                  </motion.p>

                  {experience.projects && experience.projects.length > 0 && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-semibold text-white mb-3 text-lg">
                        Key Projects:
                      </h4>
                      <ul className="space-y-2">
                        {experience.projects.map((project, projectIndex) => (
                          <motion.li
                            key={projectIndex}
                            className="text-gray-400 flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + projectIndex * 0.05 + 0.7,
                            }}
                            viewport={{ once: true }}
                          >
                            <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {project}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <motion.div
                    className="flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
                    viewport={{ once: true }}
                  >
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm font-medium rounded-full border border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + techIndex * 0.05 + 0.9,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
