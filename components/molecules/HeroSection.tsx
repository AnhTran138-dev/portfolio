"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Button } from "../ui/button";
import { FadeIn } from "../atoms/AnimatedText";
import Image from "next/image";

interface HeroSectionProps {
  name: string;
  title: string;
  description: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  cvUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  title,
  description,
  avatarUrl,
  githubUrl,
  linkedinUrl,
  email,
  cvUrl,
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgb(6, 182, 212) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgb(59, 130, 246) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgb(147, 51, 234) 0%, transparent 50%)
            `,
            backgroundSize: "100% 100%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <FadeIn delay={0.2}>
          <div className="mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="relative w-40 h-40 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full p-1">
                <div className="w-full h-full bg-black rounded-full p-2">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full overflow-hidden">
                    <Image
                      src={avatarUrl || "/avatar-placeholder.png"}
                      alt={name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Floating particles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4"
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2"></div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <div className="absolute left-0 top-1/2 w-1 h-1 bg-purple-500 rounded-full -translate-y-1/2"></div>
              </motion.div>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {name}
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            <span className="text-white">I&apos;m a </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.8}>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </FadeIn>

        <FadeIn delay={1.0}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            {cvUrl && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-2xl shadow-blue-500/25 border-0"
                  onClick={() => window.open(cvUrl, "_blank")}
                >
                  Download CV
                </Button>
              </motion.div>
            )}
            <div className="flex gap-4">
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-300"
                >
                  <FaGithub
                    size={24}
                    className="text-white group-hover:text-cyan-400 transition-colors"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.a>
              )}
              {linkedinUrl && (
                <motion.a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-300"
                >
                  <FaLinkedin
                    size={24}
                    className="text-white group-hover:text-blue-400 transition-colors"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.a>
              )}
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="group relative p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:border-gray-500 transition-all duration-300"
                >
                  <FaEnvelope
                    size={24}
                    className="text-white group-hover:text-purple-400 transition-colors"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.a>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FadeIn delay={1.2}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full relative">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
              />
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};
