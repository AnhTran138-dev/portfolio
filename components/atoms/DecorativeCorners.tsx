"use client";

import React, { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DecorateCornersProps {
  hoveredSkill: {
    index: number;
    position: { x: number; y: number };
  } | null;
}

interface ScreenConfig {
  offset: number;
  size: number;
  scale: number;
  borderWidth: string;
  cornerSize: string;
  defaultSize: string;
}

const useResponsiveConfig = (): ScreenConfig => {
  const [config, setConfig] = useState<ScreenConfig>({
    offset: 21,
    size: 85,
    scale: 1.5,
    borderWidth: "border-l-4 border-t-4",
    cornerSize: "w-6 h-6",
    defaultSize: "w-12 h-12",
  });

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setConfig({
          offset: 12,
          size: 50,
          scale: 1.1,
          borderWidth: "border-l-2 border-t-2",
          cornerSize: "w-3 h-3",
          defaultSize: "w-6 h-6",
        });
      } else if (width < 1024) {
        setConfig({
          offset: 16,
          size: 65,
          scale: 1.3,
          borderWidth: "border-l-4 border-t-4",
          cornerSize: "w-4 h-4",
          defaultSize: "w-8 h-8",
        });
      } else {
        setConfig({
          offset: 21,
          size: 85,
          scale: 1.5,
          borderWidth: "border-l-4 border-t-4",
          cornerSize: "w-6 h-6",
          defaultSize: "w-12 h-12",
        });
      }
    };

    updateConfig();
    window.addEventListener("resize", updateConfig);
    return () => window.removeEventListener("resize", updateConfig);
  }, []);

  return config;
};

export const DecorativeCorners = memo<DecorateCornersProps>(
  ({ hoveredSkill }) => {
    const { offset, size, scale, borderWidth, cornerSize, defaultSize } =
      useResponsiveConfig();

    const cornerAnimation = hoveredSkill
      ? {
          scale,
          opacity: 1,
        }
      : {
          scale: 1,
          opacity: 0.5,
        };

    const springTransition = {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    };

    return (
      <React.Fragment>
        {/* Top Left Corner */}
        <motion.div
          className={cn(
            "absolute border-cyan-400 rounded-tl-lg pointer-events-none",
            borderWidth,
            hoveredSkill ? cornerSize : defaultSize
          )}
          animate={
            hoveredSkill
              ? {
                  left: hoveredSkill.position.x - offset,
                  top: hoveredSkill.position.y - offset,
                  ...cornerAnimation,
                }
              : {
                  left: 0,
                  top: 0,
                  ...cornerAnimation,
                }
          }
          transition={springTransition}
          style={{ zIndex: 60 }}
        />

        {/* Top Right Corner */}
        <motion.div
          className={cn(
            "absolute border-cyan-400 rounded-tr-lg pointer-events-none",
            borderWidth.replace("border-l-", "border-r-"),
            hoveredSkill ? cornerSize : defaultSize
          )}
          animate={
            hoveredSkill
              ? {
                  right: `calc(100% - ${hoveredSkill.position.x + size}px)`,
                  top: hoveredSkill.position.y - offset,
                  ...cornerAnimation,
                }
              : {
                  right: 0,
                  top: 0,
                  ...cornerAnimation,
                }
          }
          transition={springTransition}
          style={{ zIndex: 60 }}
        />

        {/* Bottom Left Corner */}
        <motion.div
          className={cn(
            "absolute border-cyan-400 rounded-bl-lg pointer-events-none",
            borderWidth.replace("border-t-", "border-b-"),
            hoveredSkill ? cornerSize : defaultSize
          )}
          animate={
            hoveredSkill
              ? {
                  left: hoveredSkill.position.x - offset,
                  bottom: `calc(100% - ${hoveredSkill.position.y + size}px)`,
                  ...cornerAnimation,
                }
              : {
                  left: 0,
                  bottom: 0,
                  ...cornerAnimation,
                }
          }
          transition={springTransition}
          style={{ zIndex: 60 }}
        />

        {/* Bottom Right Corner */}
        <motion.div
          className={cn(
            "absolute border-cyan-400 rounded-br-lg pointer-events-none",
            borderWidth
              .replace("border-l-", "border-r-")
              .replace("border-t-", "border-b-"),
            hoveredSkill ? cornerSize : defaultSize
          )}
          animate={
            hoveredSkill
              ? {
                  right: `calc(100% - ${hoveredSkill.position.x + size}px)`,
                  bottom: `calc(100% - ${hoveredSkill.position.y + size}px)`,
                  ...cornerAnimation,
                }
              : {
                  right: 0,
                  bottom: 0,
                  ...cornerAnimation,
                }
          }
          transition={springTransition}
          style={{ zIndex: 60 }}
        />
      </React.Fragment>
    );
  }
);

DecorativeCorners.displayName = "DecorativeCorners";
