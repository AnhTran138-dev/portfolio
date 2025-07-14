"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DynamicCornersProps {
  hoveredItem: {
    index: number;
    position: { x: number; y: number };
  } | null;
  className?: string;
}

interface ResponsiveConfig {
  offset: number;
  size: number;
  scale: number;
  borderWidth: string;
  cornerSize: {
    default: string;
    hovered: string;
  };
}

export const DynamicCorners: React.FC<DynamicCornersProps> = ({
  hoveredItem,
  className = "",
}) => {
  // Track screen size for responsive corners
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const updateScreenSize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) {
          setScreenSize("mobile");
        } else if (window.innerWidth < 1024) {
          setScreenSize("tablet");
        } else {
          setScreenSize("desktop");
        }
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Get responsive configuration
  const getResponsiveConfig = (): ResponsiveConfig => {
    switch (screenSize) {
      case "mobile":
        return {
          offset: 12,
          size: 50,
          scale: 1.1,
          borderWidth: "border-l-2 border-t-2",
          cornerSize: {
            default: "w-6 h-6",
            hovered: "w-3 h-3",
          },
        };
      case "tablet":
        return {
          offset: 16,
          size: 65,
          scale: 1.3,
          borderWidth: "border-l-3 border-t-3",
          cornerSize: {
            default: "w-8 h-8",
            hovered: "w-4 h-4",
          },
        };
      case "desktop":
      default:
        return {
          offset: 21,
          size: 85,
          scale: 1.5,
          borderWidth: "border-l-4 border-t-4",
          cornerSize: {
            default: "w-12 h-12",
            hovered: "w-6 h-6",
          },
        };
    }
  };

  const config = getResponsiveConfig();

  // Common animation props
  const animationProps = {
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
    style: { zIndex: 60 },
  };

  // Common animate logic
  const getAnimateProps = (position: "tl" | "tr" | "bl" | "br") => {
    if (!hoveredItem) {
      return {
        opacity: 0.5,
        scale: 1,
        ...(position === "tl" && { left: 0, top: 0 }),
        ...(position === "tr" && { right: 0, top: 0 }),
        ...(position === "bl" && { left: 0, bottom: 0 }),
        ...(position === "br" && { right: 0, bottom: 0 }),
      };
    }

    const baseProps = {
      opacity: 1,
      scale: config.scale,
    };

    switch (position) {
      case "tl":
        return {
          ...baseProps,
          left: hoveredItem.position.x - config.offset,
          top: hoveredItem.position.y - config.offset,
        };
      case "tr":
        return {
          ...baseProps,
          right: `calc(100% - ${hoveredItem.position.x + config.size}px)`,
          top: hoveredItem.position.y - config.offset,
        };
      case "bl":
        return {
          ...baseProps,
          left: hoveredItem.position.x - config.offset,
          bottom: `calc(100% - ${hoveredItem.position.y + config.size}px)`,
        };
      case "br":
        return {
          ...baseProps,
          right: `calc(100% - ${hoveredItem.position.x + config.size}px)`,
          bottom: `calc(100% - ${hoveredItem.position.y + config.size}px)`,
        };
      default:
        return baseProps;
    }
  };

  return (
    <>
      {/* Top Left Corner */}
      <motion.div
        className={cn(
          "absolute border-cyan-400 rounded-tl-lg pointer-events-none",
          config.borderWidth
            .replace("border-t-", "border-t-")
            .replace("border-l-", "border-l-"),
          hoveredItem ? config.cornerSize.hovered : config.cornerSize.default,
          className
        )}
        animate={getAnimateProps("tl")}
        {...animationProps}
      />

      {/* Top Right Corner */}
      <motion.div
        className={cn(
          "absolute border-cyan-400 rounded-tr-lg pointer-events-none",
          config.borderWidth
            .replace("border-l-", "border-r-")
            .replace("border-t-", "border-t-"),
          hoveredItem ? config.cornerSize.hovered : config.cornerSize.default,
          className
        )}
        animate={getAnimateProps("tr")}
        {...animationProps}
      />

      {/* Bottom Left Corner */}
      <motion.div
        className={cn(
          "absolute border-cyan-400 rounded-bl-lg pointer-events-none",
          config.borderWidth
            .replace("border-t-", "border-b-")
            .replace("border-l-", "border-l-"),
          hoveredItem ? config.cornerSize.hovered : config.cornerSize.default,
          className
        )}
        animate={getAnimateProps("bl")}
        {...animationProps}
      />

      {/* Bottom Right Corner */}
      <motion.div
        className={cn(
          "absolute border-cyan-400 rounded-br-lg pointer-events-none",
          config.borderWidth
            .replace("border-l-", "border-r-")
            .replace("border-t-", "border-b-"),
          hoveredItem ? config.cornerSize.hovered : config.cornerSize.default,
          className
        )}
        animate={getAnimateProps("br")}
        {...animationProps}
      />
    </>
  );
};
