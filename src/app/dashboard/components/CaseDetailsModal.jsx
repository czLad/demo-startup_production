// src/app/components/CaseDetailsModal.jsx
"use client";

export default function CaseDetailsModal({ isOpen, onClose, caseData }) {
  if (!isOpen || !caseData) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // close when clicking background
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transform transition-transform duration-200 hover:scale-125"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Case Details</h2>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium text-gray-600">Case ID:</span>{" "}
            {caseData.id}
          </p>
          <p>
            <span className="font-medium text-gray-600">Case Name:</span>{" "}
            {caseData.name}
          </p>
          <p>
            <span className="font-medium text-gray-600">Created:</span>{" "}
            {caseData.createdAt}
          </p>
          <p>
            <span className="font-medium text-gray-600">Updated:</span>{" "}
            {caseData.updatedAt}
          </p>
        </div>

        {/* Later we can add related files + presigned links here */}
      </div>
    </div>
  );
}
