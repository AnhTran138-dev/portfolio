"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./AnimatedText";

interface SkillsCounterProps {
  count: number;
}

export const SkillsCounter = memo<SkillsCounterProps>(({ count }) => {
  return (
    <FadeIn delay={1}>
      <div className="mt-12 text-center">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-lg border border-gray-700/30 rounded-2xl px-8 py-4"
        >
          <div className="text-3xl font-black text-cyan-400 mb-1">{count}</div>
          <div className="text-sm text-gray-400 font-medium">
            Technologies Mastered
          </div>
        </motion.div>
      </div>
    </FadeIn>
  );
});

SkillsCounter.displayName = "SkillsCounter";
