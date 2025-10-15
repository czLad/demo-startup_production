"use client";

import InsightsCard from "./InsightsCard";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TopRulesCard() {
  const [rules] = useState({
    approvals: [
      { name: "Accurate Policy Match", count: 142 },
      { name: "Verified Claimant Identity", count: 128 },
      { name: "Sufficient Documentation Provided", count: 115 },
    ],
    rejections: [
      { name: "Incomplete Forms Submitted", count: 135 },
      { name: "Unsupported Expense Type", count: 122 },
      { name: "Policy Exclusion Triggered", count: 108 },
    ],
  });

  const maxValue = Math.max(
    ...rules.approvals.map((r) => r.count),
    ...rules.rejections.map((r) => r.count)
  );

  return (
    <InsightsCard title="Rules Leading to / Rejecting Most Approvals">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Approvals */}
        <div>
          <h3 className="text-sm font-semibold text-green-600 mb-3">
            Approvals
          </h3>
          <div className="space-y-3">
            {rules.approvals.map((rule, i) => (
              <div key={rule.name}>
                <div className="flex justify-between text-xs mb-1 text-gray-600">
                  <span>{rule.name}</span>
                  <span>{rule.count}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(rule.count / maxValue) * 100}%` }}
                    transition={{
                      duration: 1,
                      delay: i * 0.15, // slight stagger
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rejections */}
        <div>
          <h3 className="text-sm font-semibold text-red-600 mb-3">
            Rejections
          </h3>
          <div className="space-y-3">
            {rules.rejections.map((rule, i) => (
              <div key={rule.name}>
                <div className="flex justify-between text-xs mb-1 text-gray-600">
                  <span>{rule.name}</span>
                  <span>{rule.count}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(rule.count / maxValue) * 100}%` }}
                    transition={{
                      duration: 1,
                      delay: i * 0.15, // stagger for each bar
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InsightsCard>
  );
}
