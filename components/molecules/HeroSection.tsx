import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import { Button } from "../ui/button";
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
  description,
  avatarUrl,
  githubUrl,
  linkedinUrl,
  email,
  cvUrl,
}) => {
  return (
    <section className="min-h-screen bg-black relative overflow-hidden sm:py-0 py-24">
      {/* Geometric background elements */}
      <div className="absolute inset-0">
        {/* Main background shapes */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-4 h-4 bg-cyan-400 rounded-full opacity-60"
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/2 right-20 w-3 h-3 bg-green-400 rounded-full"
        />

        {/* Large hero shape - similar to red blob in image */}
        <motion.div
          initial={{ scale: 0, x: 100 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4"
        >
          <div className="w-[600px] h-[500px] bg-gradient-to-br from-cyan-500/20 via-blue-500/30 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 w-[550px] h-[450px] bg-gradient-to-tl from-cyan-400/10 to-blue-400/20 rounded-[60%_40%_40%_60%] animate-pulse" />
        </motion.div>

        {/* Decorative dots pattern */}
        <div className="absolute bottom-32 right-32">
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="w-2 h-2 bg-cyan-400 rounded-full opacity-40"
              />
            ))}
          </div>
        </div>

        {/* Additional floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-6 h-6 border-2 border-cyan-400 rotate-45 opacity-30"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 lg:pr-8"
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-lg text-gray-300 font-medium">
                  Hey, I&apos;m a
                </span>
              </motion.div>

              {/* Main title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-2"
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Frontend
                  </span>
                  &nbsp;
                  <span className="text-white">Developer.</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-gray-300 leading-relaxed max-w-xl"
              >
                {description}
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Hire Me button */}
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
                  <a href="#contact">Hire Me</a>
                </Button>

                {/* Let's Chat button */}
                <Button
                  variant="outline"
                  className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 bg-transparent"
                >
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2"
                  >
                    <FaEnvelope className="text-sm" />
                    Let&apos;s Chat
                  </a>
                </Button>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex items-center gap-6 pt-4"
              >
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    <FaGithub size={24} />
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    <FaEnvelope size={24} />
                  </a>
                )}
                {cvUrl && (
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110 flex items-center gap-2 text-sm"
                  >
                    <FaDownload size={20} />
                    <span>Resume</span>
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Right side - Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Avatar container with gradient border */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full blur-md opacity-75 animate-pulse"></div>

                  {/* Avatar image */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-2 z-10 overflow-hidden">
                    <div className=" rounded-full overflow-hidden  ">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={name}
                          width={400}
                          height={400}
                          className="w-full h-full object-fill "
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                          <span className="text-6xl text-cyan-400 font-bold">
                            {name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Floating elements around avatar */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm"
                  >
                    JS
                  </motion.div>

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  >
                    TS
                  </motion.div>

                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-1/4 -left-8 w-6 h-6 bg-green-400 rounded-full opacity-80"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center opacity-60"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
