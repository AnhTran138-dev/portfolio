"use client";

import React, { memo } from "react";

export const ChessBackground = memo(() => {
  return (
    <div className="absolute inset-0 opacity-20">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(14, 165, 233, 0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(14, 165, 233, 0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(14, 165, 233, 0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(14, 165, 233, 0.1) 75%)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "0 0, 0 40px, 40px -40px, -40px 0px",
        }}
      />
    </div>
  );
});

ChessBackground.displayName = "ChessBackground";
