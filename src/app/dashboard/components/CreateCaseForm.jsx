// src/app/components/CreateCaseForm.jsx
"use client";

import { useState } from "react";
import { createCaseWithAI } from "@/app/service/createService";

export default function CreateCaseForm({ onSubmit, tenants, tenantID }) {

  const [tenantName, setTenantName] = useState("");
  const [caseName, setCaseName] = useState("");
  const [caseType, setCaseType] = useState("");
  const [file, setFile] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const data = await createCaseWithAI({ tenantID, caseName, caseType, file });
      // Will uncomment on next dev hour
      // console.log(data)
      if (data.success) {
        const mergedData = {
          ...data,
          result: {
            ...data.result,
            case_name: caseName
          }
        }
        onSubmit?.(mergedData);
        setCaseName("");
        setFile(null);
      } else {
        alert("Case creation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsLoading(false); // ✅ Stop loading
    }
  };

  const filteredTenants = tenants.filter((t) =>
    t.name.toLowerCase().includes(tenantName.toLowerCase())
  );

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-sm border overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-medium text-gray-600">Creating Case...</p>
        </div>
      )}
      
      <h3 className="text-sm font-medium text-gray-600 mb-4">
        Create Case
      </h3>
      <form onSubmit={handleSubmit} className={`space-y-4 transition duration-200 ${isLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
        {/* Tenant Autocomplete */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Tenant
          </label>
          <input
            type="text"
            value={tenantName}
            onChange={(e) => {
              setTenantName(e.target.value);
              setShowSuggestions(true);
              setError("");
              setHighlightIndex(-1);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightIndex((prev) =>
                  prev < filteredTenants.length - 1 ? prev + 1 : 0
                );
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightIndex((prev) =>
                  prev > 0 ? prev - 1 : filteredTenants.length - 1
                );
              }
              if (e.key === "Enter" && highlightIndex >= 0) {
                e.preventDefault();
                setTenantName(filteredTenants[highlightIndex].name);
                setShowSuggestions(false);
                setError("");
              }
            }}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 100);
              if (tenantName) {
                const match = tenants.find(
                  (t) => t.name.toLowerCase() === tenantName.toLowerCase()
                );
                if (match) {
                  setTenantName(match.name); // normalize casing
                  setError("");
                } else {
                  setError("Please select a valid tenant from the list.");
                }
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Start typing tenant name"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring focus:ring-blue-200 ${
              error ? "border-red-500" : ""
            }`}
            required
          />
          {/* Suggestions Dropdown */}
          {showSuggestions && filteredTenants.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredTenants.map((t, index) => (
                <li
                  key={t.id}
                  onMouseDown={() => {
                    setTenantName(t.name);
                    setShowSuggestions(false);
                    setError("");
                  }}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    index === highlightIndex
                      ? "bg-blue-100"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {t.name}
                </li>
              ))}
            </ul>
          )}
          {/* Inline Error */}
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
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

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Case Type
          </label>
          <input
            type="text"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            placeholder="Enter case type"
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
