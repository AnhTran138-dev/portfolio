"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./AnimatedText";

export const SkillsHeader = memo(() => {
  return (
    <FadeIn>
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Technical{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400">
            Technologies and tools I work with
          </p>
        </motion.div>
      </div>
    </FadeIn>
  );
});

SkillsHeader.displayName = "SkillsHeader";
