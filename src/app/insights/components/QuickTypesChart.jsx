"use client";

import InsightsCard from "./InsightsCard";
import { useState } from "react";
import { motion } from "framer-motion";

export default function QuickTypesChart() {
  // Temporary mock data
  const [claims] = useState([
    { name: "Auto", percent: 45, color: "bg-blue-500" },
    { name: "P&C", percent: 30, color: "bg-green-500" },
    { name: "Travel", percent: 15, color: "bg-yellow-500" },
    { name: "Workers Comp", percent: 10, color: "bg-violet-500" },
  ]);

  return (
    <InsightsCard title="Types of Claims Being Filed — today">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Distribution of claims by category (select time)
        </p>
        <button className="text-xs text-blue-600 hover:underline">
          Today
        </button>
      </div>

      {/* Grid of tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
        {claims.map((c) => (
          <div
            key={c.name}
            className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white transition flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-800">{c.name}</span>
              <span className="text-xs text-gray-500">{c.percent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-2 rounded-full ${c.color}`}
                initial={{ width: 0 }}
                animate={{width: `${c.percent}%` }}
                transition={{
                    duration: 1.2,
                    ease: "easeOut"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </InsightsCard>
  );
}
