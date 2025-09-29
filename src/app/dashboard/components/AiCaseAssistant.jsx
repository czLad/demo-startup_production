// src/app/components/AiCaseAssistant.jsx
"use client";

import { useState } from "react";
import { Edit, Trash2, Play, PlayCircle, RefreshCcw } from "lucide-react";

export default function AiCaseAssistant({ initialCases = [] }) {
  const [cases, setCases] = useState(initialCases);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          AI Case Assistant
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <button
            disabled={selected.length === 0}
            className={`flex items-center gap-1 ${
              selected.length === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }`}
          >
            <Play className="h-4 w-4" /> Run Selected
          </button>
          <button className="text-blue-600 hover:underline flex items-center gap-1">
            <PlayCircle className="h-4 w-4" /> Run All
          </button>
          <button className="text-blue-600 hover:underline">Refresh</button>
          <button className="text-blue-600 hover:underline">New Case</button>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {cases.map((c) => (
          <div
            key={c.id}
            className="border rounded-lg p-4 flex flex-col space-y-3 bg-gray-50"
          >
            {/* Select + status */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={selected.includes(c.id)}
                  onChange={() => toggleSelect(c.id)}
                  className="accent-blue-600"
                />
                Select
              </label>
              {/* Placeholder for status badge */}
              {c.status && (
                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                  {c.status}
                </span>
              )}
            </div>

            {/* Case Info */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800 mb-1">
                {c.name}
              </h3>
              {c.description && (
                <p className="text-xs text-gray-500">{c.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                className="text-yellow-600 hover:text-yellow-700"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="text-red-600 hover:text-red-700"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {cases.length === 0 && (
          <div className="col-span-full text-center text-sm text-gray-400 py-8">
            No cases available
          </div>
        )}
      </div>
    </div>
  );
}
