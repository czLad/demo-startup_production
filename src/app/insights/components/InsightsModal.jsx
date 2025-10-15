"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function InsightsModal({ isOpen, onClose, category, data }) {
  if (!isOpen) return null;

  const modalRef = useRef(null);
  const { fraudTypes = [], rulesBroken = [], adjudication = [] } = data || {};

  // Handle click outside the modal
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
        <motion.div
          ref={modalRef}
          className="bg-white/95 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] w-full max-w-4xl overflow-y-auto max-h-[90vh] flex flex-col"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
            <h2 className="text-lg font-semibold text-black tracking-wide">
              Insights — {category}
            </h2>
            <button
              onClick={onClose}
              className="text-black-100 hover:text-blue-600 transition transform hover:scale-110"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Types of Fraud Detected */}
            {fraudTypes.length > 0 && (
              <section>
                <h3 className="text-base font-semibold mb-3 text-gray-800">
                  Types of Fraud Detected
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fraudTypes.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white transition"
                    >
                      <p className="text-sm text-gray-700">{f}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Rules Broken the Most */}
            {rulesBroken.length > 0 && (
              <section>
                <h3 className="text-base font-semibold mb-3 text-gray-800">
                  Rules Broken the Most
                </h3>
                <div className="space-y-3">
                  {rulesBroken.map((r, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{r.label}</span>
                        <span>{r.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-2 bg-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${r.percent}%` }}
                          transition={{
                            duration: 1,
                            delay: idx * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* My Adjudication */}
            {adjudication.length > 0 && (
              <section>
                <h3 className="text-base font-semibold mb-3 text-gray-800">
                  My Adjudication for Types of Claims
                </h3>
                <div className="space-y-3">
                  {adjudication.map((a, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{a.label}</span>
                        <span>{a.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-2 bg-green-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${a.percent}%` }}
                          transition={{
                            duration: 1,
                            delay: idx * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
