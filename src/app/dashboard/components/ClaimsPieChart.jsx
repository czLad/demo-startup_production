"use client";

// import dynamic from "next/dynamic";

// const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// export default function ClaimsPieChart({ completed, remaining }) {
//   return (
//     <div className="rounded-xl bg-white p-4">
//         <Plot
//           data={[
//             {
//               values: [completed, remaining],
//               labels: ["Completed", "Remaining"],
//               type: "pie",
//               marker: {
//                 colors: ["#3B82F6", "#E5E7EB"],
//                 line: { color: "white", width: 2 },
//               },
//               textinfo: "label+percent",
//             },
//           ]}
//           layout={{
//             autosize: true,
//             margin: { t: 20, b: 20, l: 20, r: 20 },
//             showlegend: false,
//             paper_bgcolor: "transparent", // outer background transparent
//           }}
//           config={{ displayModeBar: false }}
//           style={{ width: "100%", height: "300px" }}
//         />
//     </div>
//   );
// }

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function ClaimsPieChart({ completed = 0, remaining = 0 }) {
  const total = Math.max(completed + remaining, 1);
  const pct = (completed / total) * 100;
  const progress = useMotionValue(0); // 0 → pct
  const rounded = useTransform(progress, (v) => Math.round(v));

  // Motion values for number + stroke offset
  // const progress = useMotionValue(0); // 0 → pct
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = useTransform(progress, (v) => circumference * (1 - v / 100));
  const displayPct = useTransform(progress, (v) => Math.round(v));

  useEffect(() => {
    // Animate once on mount or whenever props change
    const controls = animate(progress, pct, { duration: 1.2, ease: "easeInOut" });
    return () => controls.stop();
  }, [pct, progress]);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-500">
      <div className="flex items-center justify-center">
        <div className="relative w-[220px] h-[220px]">
          {/* Base ring */}
          <svg className="-rotate-90" width="220" height="220" viewBox="0 0 220 220">
            <circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#E5E7EB"      // gray-200
              strokeWidth="18"
              fill="none"
            />
            {/* Animated ring */}
            <motion.circle
              cx="110"
              cy="110"
              r={radius}
              stroke="#3B82F6"       // blue-500
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: dashOffset }}
              initial={{ strokeDashoffset: circumference }}
            />
          </svg>

          {/* Center label */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <motion.span className="text-3xl font-semibold text-blue-600">
                {rounded}
              </motion.span>
              <span className="text-blue-600">%</span>
              <div className="text-xs text-gray-500">Completion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#3B82F6]" />
          <span className="text-gray-700">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#E5E7EB]" />
          <span className="text-gray-700">Remaining</span>
        </div>
      </div>
    </div>
  );
}

