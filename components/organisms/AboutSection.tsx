"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "../atoms/Section";
import { FadeIn } from "../atoms/AnimatedText";

interface AboutSectionProps {
  content: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  const contentParts = content.split(". ").filter((part) => part.trim());

  return (
    <Section
      id="about"
      className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Diagonal layout background */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent rotate-12 transform origin-center"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/5 to-transparent -rotate-12 transform origin-center"></div>

        {/* Floating geometric elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-cyan-400/30 transform rotate-45"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"
        />
      </div>

      <div className="relative z-10">
        {/* Header with split design */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h2 className="text-6xl md:text-8xl font-black leading-none">
                <span className="text-white">About</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              <div className="mt-8 w-32 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>

              {/* Decorative code-like element */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-8 font-mono text-cyan-400/60 text-sm"
              >
                <div>{"<developer>"}</div>
                <div className="ml-4">passion: true;</div>
                <div className="ml-4">creativity: 100%;</div>
                <div>{"</developer>"}</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Hexagonal pattern background */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-4 gap-4 h-full">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-full aspect-square border border-cyan-400/30 transform rotate-45"
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-10 text-right">
                <p className="text-2xl text-gray-300 leading-relaxed">
                  {contentParts[0] && contentParts[0] + "."}
                </p>
              </div>
            </motion.div>
          </div>
        </FadeIn>

        {/* Interactive story cards */}
        <FadeIn delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentParts.slice(1).map((part, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  scale: 1.05,
                }}
                className="group perspective-1000"
              >
                <div className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 h-full shadow-2xl transform-gpu group-hover:border-cyan-500/50 transition-all duration-500">
                  {/* Card number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                    {index + 1}
                  </div>

                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    {/* Icon based on content */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg opacity-80"></div>
                    </motion.div>

                    <p className="text-gray-300 leading-relaxed text-center group-hover:text-white transition-colors duration-300">
                      {part.trim() + "."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom decorative element */}
        <FadeIn delay={1}>
          <div className="mt-20 flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-24 h-24 border-4 border-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
            >
              <div className="absolute inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};
