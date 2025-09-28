// src/app/components/dashboard/StatCard.jsx
"use client";

export default function StatCard({ title, value, status, icon, color }) {
  return (
    <div
      className={`
        flex items-center justify-between
        p-4 rounded-xl border shadow-sm
        bg-white
      `}
    >
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="mt-1 text-xl font-semibold">{value}</div>
        {status && (
          <div className="mt-1 text-xs text-gray-400 italic">{status}</div>
        )}
      </div>

      {icon && (
        <div
          className={`
            flex items-center justify-center
            w-10 h-10 rounded-full
            ${color || "bg-gray-100 text-gray-600"}
          `}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
