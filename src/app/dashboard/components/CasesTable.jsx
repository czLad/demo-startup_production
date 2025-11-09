"use client";

import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";

export default function CasesTable({ cases, onCaseClick, isLoadingCases }) {
  const [copiedId, setCopiedId] = useState(null);

  const sortedCases = useMemo(() => {
    if (!cases) return [];
    return [...cases].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
  }, [cases]);

  const handleCopy = async (id) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(id);
      } else {
        // Fallback for insecure contexts
        const tempInput = document.createElement("input");
        tempInput.value = id;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
          All Cases
        </h3>
      </div>

      {/* Table */}
      <div className="relative border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50/70 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-5 py-3 font-medium w-[24.5%]">Case ID</th>
              <th className="px-5 py-3 font-medium w-[34%]">Case Name</th>
              <th className="px-5 py-3 font-medium w-[20%]">Created</th>
              <th className="px-5 py-3 font-medium w-[20%]">Updated</th>
            </tr>
          </thead>
        </table>

        {isLoadingCases && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium text-gray-600">
              Loading Cases...
            </p>
          </div>
        )}

        {/* Scrollable Table Body */}
        <div className="max-h-[220px] overflow-y-scroll">
          <table className="w-full text-sm text-left border-collapse table-fixed">
            <colgroup>
              <col className="w-[25%]" />
              <col className="w-[35%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
            </colgroup>
            <tbody>
              {sortedCases?.length > 0 ? (
                sortedCases.map((c, idx) => (
                  <tr
                    key={c.id}
                    onClick={() => onCaseClick?.(c)}
                    className={`transition-all duration-200 cursor-pointer ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    } hover:bg-blue-50/60`}
                  >
                    <td className="px-5 py-3 font-mono text-gray-800 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span title={c.id}>
                          {`${c.id.slice(0, 6)}...${c.id.slice(-4)}`}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(c.id);
                          }}
                          title={
                            copiedId === c.id
                              ? "Copied!"
                              : "Copy full Case ID"
                          }
                          className="text-gray-400 hover:text-blue-600 transition"
                        >
                          {copiedId === c.id ? (
                            <Check size={14} className="text-green-600" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-700 truncate">
                      {c.name}
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(c.createdAt).toISOString().split("T")[0]}
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(c.updatedAt).toISOString().split("T")[0]}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-6 text-center text-gray-400 text-sm"
                  >
                    No cases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

