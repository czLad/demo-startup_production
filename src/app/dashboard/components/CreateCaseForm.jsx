// // src/app/components/CreateCaseForm.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { createCaseWithAI } from "@/app/service/createService";

export default function CreateCaseForm({ onSubmit, tenants, tenantID }) {
  const [tenantName, setTenantName] = useState("");
  const [caseName, setCaseName] = useState("");
  const [caseType, setCaseType] = useState("");
  const [files, setFiles] = useState([]);
  const [showTenantSuggestions, setShowTenantSuggestions] = useState(false);
  const [showCaseTypeSuggestions, setShowCaseTypeSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const insuranceTypes = [
    "Auto Insurance",
    "Travelers Insurance",
    "P&C",
    "Liability",
    "Worker’s Compensation",
    "Cyber",
    "Financial Insurance",
  ];

  const filteredTypes = insuranceTypes.filter((type) =>
    type.toLowerCase().includes(caseType.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const data = await createCaseWithAI({
        tenantID,
        caseName,
        caseType,
        files,
      });

      // console.log(data);

      if (data.success) {
        const mergedData = {
          ...data,
          result: { ...data.result, case_name: caseName },
        };
        onSubmit?.(mergedData);

        // ✅ Reset all fields
        setCaseName("");
        setCaseType("");
        setFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = ""; // important
      } else {
        alert("Case creation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const filteredTenants = tenants.filter((t) =>
    t.name.toLowerCase().includes(tenantName.toLowerCase())
  );

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected); // Replace files on each upload
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));

    // Also clear input if no files remain
    if (fileInputRef.current && files.length <= 1) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    let timer;
    if (isCreating) {
      setSeconds(0);
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isCreating]);

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Loading Overlay */}
      {isCreating && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
          {/* Spinning Loader */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin-slow"></div>
            {/* Subtle pulse ring */}
            <div className="absolute w-14 h-14 rounded-full border border-blue-200 animate-ping opacity-40"></div>
          </div>

          {/* Title */}
          <h2 className="text-base font-semibold text-gray-700 tracking-tight mb-1 animate-fade-in">
            Creating Case Using Advanced Automation...
          </h2>

          {/* Timer */}
          <p className="text-sm text-blue-600 font-medium tracking-wide animate-pulse">
            ({seconds.toString().padStart(2, "0")}s elapsed)
          </p>
        </div>
      )}

      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Case</h3>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 transition duration-200 ${
          isCreating ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Tenant Autocomplete */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Tenant
          </label>
          <input
            type="text"
            value={tenantName}
            onChange={(e) => {
              setTenantName(e.target.value);
              setShowTenantSuggestions(true);
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
                setShowTenantSuggestions(false);
                setError("");
              }
            }}
            onBlur={() => {
              setTimeout(() => setShowTenantSuggestions(false), 100);
              if (tenantName) {
                const match = tenants.find(
                  (t) => t.name.toLowerCase() === tenantName.toLowerCase()
                );
                if (match) {
                  setTenantName(match.name);
                  setError("");
                } else {
                  setError("Please select a valid tenant from the list.");
                }
              }
            }}
            onFocus={() => setShowTenantSuggestions(true)}
            placeholder="Start typing tenant name"
            className={`w-full px-3 py-2.5 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              error ? "border border-red-400" : "border border-gray-200"
            }`}
            required
          />
          {showTenantSuggestions && filteredTenants.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto">
              {filteredTenants.map((t, index) => (
                <li
                  key={t.id}
                  onMouseDown={() => {
                    setTenantName(t.name);
                    setShowTenantSuggestions(false);
                    setError("");
                  }}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    index === highlightIndex
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {t.name}
                </li>
              ))}
            </ul>
          )}
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>

        {/* Case Name */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Case Name
          </label>
          <input
            type="text"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            placeholder="Enter case name"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        {/* Case Type Autocomplete */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Case Type
          </label>

          <input
            type="text"
            value={caseType}
            onChange={(e) => {
              setCaseType(e.target.value);
              setShowCaseTypeSuggestions(true);
              setHighlightIndex(-1);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightIndex((prev) =>
                  prev < filteredTypes.length - 1 ? prev + 1 : 0
                );
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightIndex((prev) =>
                  prev > 0 ? prev - 1 : filteredTypes.length - 1
                );
              }
              if (e.key === "Enter" && highlightIndex >= 0) {
                e.preventDefault();
                setCaseType(filteredTypes[highlightIndex]);
                setShowCaseTypeSuggestions(false);
              }
            }}
            onBlur={() => setTimeout(() => setShowCaseTypeSuggestions(false), 100)}
            onFocus={() => setShowCaseTypeSuggestions(true)}
            placeholder="Select insurance type"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          {/* Suggestions Dropdown */}
          {showCaseTypeSuggestions && filteredTypes.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto">
              {filteredTypes.map((type, index) => (
                <li
                  key={type}
                  onMouseDown={() => {
                    setCaseType(type);
                    setShowCaseTypeSuggestions(false);
                  }}
                  className={`px-3 py-2 cursor-pointer text-sm ${
                    index === highlightIndex
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* File Upload (Multiple) */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Attach Files (optional)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="inline-block cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Choose Files
          </label>

          {/* File List */}
          {files.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-gray-700">
              {files.map((f, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100"
                >
                  <span className="truncate w-3/4">{f.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
        >
          Submit Case
        </button>
      </form>
    </div>
  );
}
