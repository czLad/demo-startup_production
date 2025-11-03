"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BreathingComingSoon({
  text = "Synsure is building something intelligent...",
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      {/* Synsure Logo */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.95, 1, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/transp-logo.png" // place in /public/
          alt="Synsure Logo"
          width={200}
          height={200}
          priority
          className="transition-all"
        />
      </motion.div>

      {/* Coming Soon Text */}
      <motion.h1
        className="mt-8 text-lg md:text-2xl font-medium text-gray-800 leading-relaxed"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {text}
      </motion.h1>

      {/* Subtle footer pulse (visual balance) */}
      <motion.div
        className="mt-10 h-[2px] w-20 rounded-full bg-blue-500"
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.95, 1.2, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

