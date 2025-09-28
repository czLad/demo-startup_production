// src/app/components/CreateCaseForm.jsx
"use client";

import { useState } from "react";

export default function CreateCaseForm({ onSubmit }) {
  const [tenantId, setTenantId] = useState("");
  const [caseName, setCaseName] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCase = { tenantId, caseName, file };
    onSubmit?.(newCase);

    // reset form
    setTenantId("");
    setCaseName("");
    setFile(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Create Case
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tenant ID */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Tenant ID
          </label>
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            placeholder="Enter tenant ID"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Case Name */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Case Name
          </label>
          <input
            type="text"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            placeholder="Enter case name"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Attach File (optional)
          </label>
        
          {/* Hidden file input */}
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        
          {/* Styled button */}
          <label
            htmlFor="file-upload"
            className="inline-block cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Choose File
          </label>
        
          {/* File preview */}
          {file && (
            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
              <span className="text-gray-500">📎</span>
              <span>{file.name}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
        >
          Submit Case
        </button>
      </form>
    </div>
  );
}
