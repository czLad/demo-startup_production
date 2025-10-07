// src/app/components/dashboard/StatCard.jsx
"use client";

// export default function StatCard({ title, value, status, icon, color }) {
//   return (
//     <div
//       className={`
//         flex items-center justify-between
//         p-4 rounded-xl border shadow-sm
//         bg-white
//       `}
//     >
//       <div>
//         <div className="text-sm text-gray-500">{title}</div>
//         <div className="mt-1 text-xl font-semibold">{value}</div>
//         {status && (
//           <div className="mt-1 text-xs text-gray-400 italic">{status}</div>
//         )}
//       </div>

//       {icon && (
//         <div
//           className={`
//             flex items-center justify-center
//             w-10 h-10 rounded-full
//             ${color || "bg-gray-100 text-gray-600"}
//           `}
//         >
//           {icon}
//         </div>
//       )}
//     </div>
//   );
// }

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({ title, value, status, color, trend }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
  };

  const isTrendUp = trend?.direction === "up";

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs uppercase font-medium text-gray-500 tracking-wider">
          {title}
        </h3>
        <span
          className={`px-2 py-1 text-[10px] rounded-md font-semibold ${colorMap[color]}`}
        >
          {status}
        </span>
      </div>

      {/* Main Value */}
      <p className="text-3xl font-semibold text-gray-900">{value}</p>

      {/* Trend Indicator */}
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          {isTrendUp ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-xs font-medium ${
              isTrendUp ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.value} this week
          </span>
        </div>
      )}
    </div>
  );
}
