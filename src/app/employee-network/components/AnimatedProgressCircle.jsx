"use client";

import { motion } from "framer-motion";

export default function AnimatedProgressCircle({
  value = 0.75, // accepts decimal (0–1)
  color = "#3B82F6", // default blue-500
  label = "Percentage Metric", // dynamic label
  duration = 1.2,
}) {
  const circleSize = 120;
  const strokeWidth = 10;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = circumference - circumference * value;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md">
      <div className="relative">
        <svg
          width={circleSize}
          height={circleSize}
          viewBox={`0 0 ${circleSize} ${circleSize}`}
          className="-rotate-90 transform"
        >
          {/* Base Circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Arc */}
          <motion.circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-800">
            {(value * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500 font-medium text-center">
        {label}
      </p>
    </div>
  );
}
