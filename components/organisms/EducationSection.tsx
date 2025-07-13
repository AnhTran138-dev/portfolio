"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "../atoms/Section";
import { FadeIn } from "../atoms/AnimatedText";
import { FaGraduationCap, FaCertificate, FaLanguage } from "react-icons/fa";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  major?: string;
}

interface CertificationItem {
  name: string;
  issuer?: string;
  year?: string;
}

interface LanguageItem {
  language: string;
  level: string;
}

interface EducationSectionProps {
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  certifications,
  languages,
}) => {
  return (
    <Section
      id="education"
      className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden"
    >
      {/* Academy-style background */}
      <div className="absolute inset-0">
        {/* Floating academic elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-24 h-24 border-2 border-purple-400/20 rounded-lg transform rotate-12"
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 right-32 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full"
        />

        {/* Academic constellation */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
                Academic
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h2>

              {/* Floating graduation cap */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 text-6xl text-purple-400/60"
              >
                🎓
              </motion.div>

              <div className="w-32 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto rounded-full"></div>
            </motion.div>
          </div>
        </FadeIn>

        {/* Academic sections in hexagonal layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Education - Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: 45 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center"
                >
                  <FaGraduationCap className="text-3xl text-purple-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Education
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto rounded-full"></div>
              </div>

              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 150,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                  }}
                  className="group perspective-1000"
                >
                  <div className="bg-purple-900/30 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-6 shadow-2xl transform-gpu group-hover:border-purple-400/60 transition-all duration-500">
                    {/* Diploma ribbon */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {item.degree}
                      </h4>
                      <p className="text-purple-300 font-semibold mb-1">
                        {item.institution}
                      </p>
                      {item.major && (
                        <p className="text-gray-300 text-sm mb-2">
                          {item.major}
                        </p>
                      )}
                      <p className="text-purple-400 text-sm font-medium">
                        {item.period}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certifications - Center Column */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.3,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center"
                >
                  <FaCertificate className="text-3xl text-indigo-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Certifications
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full"></div>
              </div>

              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, rotateZ: 180 }}
                  whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    rotateZ: 5,
                  }}
                  className="group"
                >
                  <div className="bg-indigo-900/40 backdrop-blur-lg border border-indigo-500/30 rounded-2xl p-6 shadow-xl group-hover:border-indigo-400/60 transition-all duration-500 transform-gpu">
                    {/* Certificate seal */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center"
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </motion.div>
                      {cert.year && (
                        <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold">
                          {cert.year}
                        </span>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {cert.name}
                    </h4>
                    {cert.issuer && (
                      <p className="text-indigo-300 text-sm">{cert.issuer}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Languages - Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -45 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: 1,
                delay: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateX: [0, 15, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center"
                >
                  <FaLanguage className="text-3xl text-pink-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Languages
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
              </div>

              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.3, rotateY: 90 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 180,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.08,
                    rotateX: 10,
                  }}
                  className="group perspective-1000"
                >
                  <div className="bg-pink-900/30 backdrop-blur-lg border border-pink-500/30 rounded-2xl p-6 shadow-xl group-hover:border-pink-400/60 transition-all duration-500 transform-gpu">
                    {/* Language flag placeholder */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
                          {lang.language}
                        </h4>
                        <div className="flex items-center">
                          <span className="text-pink-300 text-sm font-medium mr-2">
                            {lang.level}
                          </span>
                          {/* Proficiency bars */}
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.2 + i * 0.1,
                                }}
                                viewport={{ once: true }}
                                className={`w-2 h-2 rounded-full ${
                                  i < 4 ? "bg-pink-400" : "bg-pink-600/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="text-2xl"
                      >
                        🌍
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom achievement showcase */}
        <FadeIn delay={2}>
          <div className="mt-24 text-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8"
            >
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-400 mb-2">
                    4+
                  </div>
                  <div className="text-sm text-gray-300">Years Study</div>
                </div>
                <div className="w-px h-12 bg-purple-500/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-400 mb-2">
                    {certifications.length}
                  </div>
                  <div className="text-sm text-gray-300">Certificates</div>
                </div>
                <div className="w-px h-12 bg-purple-500/30"></div>
                <div className="text-center">
                  <div className="text-3xl font-black text-pink-400 mb-2">
                    {languages.length}
                  </div>
                  <div className="text-sm text-gray-300">Languages</div>
                </div>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};
