"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Flag, FileText } from "lucide-react";

export default function CaseAnalysisModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const modalRef = useRef(null);

  // Confidence color helper
  const getConfidenceColor = (value) => {
    if (value >= 90) return "bg-green-500";
    if (value >= 75) return "bg-green-400";
    if (value >= 60) return "bg-yellow-400";
    return "bg-red-500";
  };

  const rulesList = data.rule_used
    ? data.rule_used.split("#").map((rule) => rule.trim())
    : [];

  // Detect click outside the modal
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose?.();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        {/* Modal container */}
        <motion.div
          ref={modalRef}
          className="bg-white/95 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] w-full max-w-2xl sm:max-w-xl md:max-w-2xl overflow-y-auto max-h-[90vh]"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()} // prevent inner clicks from closing
        >
          {/* Header */}
          <div className="relative flex items-center justify-between px-5 sm:px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-500 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide">
              Case Analysis
            </h2>
            <button
              onClick={onClose}
              className="text-blue-100 hover:text-white transition transform hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-2xl"></div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 space-y-6 sm:space-y-8">
            {/* 1️⃣ Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                AI Short Description
              </h4>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug">
                {data.short_des || "Untitled Case"}
              </h3>
            </div>

            {/* 2️⃣ Confidence + Risk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Confidence */}
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-2">
                  AI Analysis Confidence
                </h4>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`${getConfidenceColor(data.confidence)} h-full rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${data.confidence}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {data.confidence}% confidence
                </p>
              </div>

              {/* Risk */}
              <div>
                <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  Risk Assessment
                </h4>
                <p
                  className={`text-sm sm:text-base font-semibold tracking-wide ${
                    data.riskScore === "HIGH"
                      ? "text-red-600"
                      : data.riskScore === "MEDIUM"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {data.riskScore || "N/A"}
                </p>
              </div>
            </div>

            {/* 3️⃣ Flags */}
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                <Flag className="w-4 h-4 text-blue-600" />
                Flags
              </h4>
              {data.flags?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.flags.map((flag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-700 font-medium"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">No flags detected</p>
              )}
            </div>

            {/* 4️⃣ Rules */}
            <div>
              <h4
                className={`text-sm sm:text-md font-semibold mb-3 ${
                  data.rule_followed === "true" ? "text-green-600" : "text-red-600"
                }`}
              >
                {data.rule_followed === "true"
                  ? "Rules Followed"
                  : "Rules Violated"}
              </h4>
              <ul className="list-none space-y-2 text-sm text-gray-700 border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                {rulesList.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 before:content-['•'] before:text-blue-500 before:font-bold"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* 5️⃣ Reasoning */}
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                <FileText className="w-4 h-4 text-gray-600" />
                AI Reasoning
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50/60 p-3 rounded-lg border border-gray-100">
                {data.reasoning || "No reasoning provided."}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

