// // src/app/components/CreateCaseForm.jsx
"use client";

// import { useState, useRef } from "react";
// import { createCaseWithAI } from "@/app/service/createService";

// export default function CreateCaseForm({ onSubmit, tenants, tenantID }) {
//   const [tenantName, setTenantName] = useState("");
//   const [caseName, setCaseName] = useState("");
//   const [caseType, setCaseType] = useState("");
//   const [files, setFiles] = useState([]); // ✅ now supports multiple files
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [error, setError] = useState("");
//   const [highlightIndex, setHighlightIndex] = useState(-1);
//   const [isLoading, setIsLoading] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const data = await createCaseWithAI({
//         tenantID,
//         caseName,
//         caseType,
//         files, // ✅ pass as array
//       });
//       console.log(data)

//       if (data.success) {
//         const mergedData = {
//           ...data,
//           result: { ...data.result, case_name: caseName },
//         };
//         onSubmit?.(mergedData);
//         setCaseName("");
//         setFiles([]);

//         if (fileInputRef.current) fileInputRef.current.value = "";
//       } else alert("Case creation failed");
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredTenants = tenants.filter((t) =>
//     t.name.toLowerCase().includes(tenantName.toLowerCase())
//   );

//   const handleFileChange = (e) => {
//     const selected = Array.from(e.target.files);
//     setFiles(selected);
//   };

//   const removeFile = (index) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));

//     if (fileInputRef.current && files.length <= 1) {
//       fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <div className="relative bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
//       {/* Loading Overlay */}
//       {isLoading && (
//         <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
//           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
//           <p className="text-sm font-medium text-gray-600">Creating Case...</p>
//         </div>
//       )}

//       {/* Header */}
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">
//         Create Case
//       </h3>

//       <form
//         onSubmit={handleSubmit}
//         className={`space-y-4 transition duration-200 ${
//           isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
//         }`}
//       >
//         {/* Tenant Autocomplete (unchanged) */}
//         <div className="relative">
//           <label className="block text-xs font-medium text-gray-500 mb-1">
//             Tenant
//           </label>
//           <input
//             ref={fileInputRef}
//             type="text"
//             value={tenantName}
//             onChange={(e) => {
//               setTenantName(e.target.value);
//               setShowSuggestions(true);
//               setError("");
//               setHighlightIndex(-1);
//             }}
//             onKeyDown={(e) => {
//               if (e.key === "ArrowDown") {
//                 e.preventDefault();
//                 setHighlightIndex((prev) =>
//                   prev < filteredTenants.length - 1 ? prev + 1 : 0
//                 );
//               }
//               if (e.key === "ArrowUp") {
//                 e.preventDefault();
//                 setHighlightIndex((prev) =>
//                   prev > 0 ? prev - 1 : filteredTenants.length - 1
//                 );
//               }
//               if (e.key === "Enter" && highlightIndex >= 0) {
//                 e.preventDefault();
//                 setTenantName(filteredTenants[highlightIndex].name);
//                 setShowSuggestions(false);
//                 setError("");
//               }
//             }}
//             onBlur={() => {
//               setTimeout(() => setShowSuggestions(false), 100);
//               if (tenantName) {
//                 const match = tenants.find(
//                   (t) => t.name.toLowerCase() === tenantName.toLowerCase()
//                 );
//                 if (match) {
//                   setTenantName(match.name);
//                   setError("");
//                 } else {
//                   setError("Please select a valid tenant from the list.");
//                 }
//               }
//             }}
//             onFocus={() => setShowSuggestions(true)}
//             placeholder="Start typing tenant name"
//             className={`w-full px-3 py-2.5 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
//               error ? "border border-red-400" : "border border-gray-200"
//             }`}
//             required
//           />
//           {showSuggestions && filteredTenants.length > 0 && (
//             <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto">
//               {filteredTenants.map((t, index) => (
//                 <li
//                   key={t.id}
//                   onMouseDown={() => {
//                     setTenantName(t.name);
//                     setShowSuggestions(false);
//                     setError("");
//                   }}
//                   className={`px-3 py-2 cursor-pointer text-sm ${
//                     index === highlightIndex
//                       ? "bg-blue-100 text-blue-700"
//                       : "hover:bg-blue-50"
//                   }`}
//                 >
//                   {t.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//           {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
//         </div>

//         {/* Case Name */}
//         <div>
//           <label className="block text-xs font-medium text-gray-500 mb-1">
//             Case Name
//           </label>
//           <input
//             type="text"
//             value={caseName}
//             onChange={(e) => setCaseName(e.target.value)}
//             placeholder="Enter case name"
//             className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
//             required
//           />
//         </div>

//         {/* Case Type */}
//         <div>
//           <label className="block text-xs font-medium text-gray-500 mb-1">
//             Case Type
//           </label>
//           <input
//             type="text"
//             value={caseType}
//             onChange={(e) => setCaseType(e.target.value)}
//             placeholder="Enter case type"
//             className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
//             required
//           />
//         </div>

//         {/* File Upload (multiple) */}
//         <div>
//           <label className="block text-xs font-medium text-gray-500 mb-1">
//             Attach Files (optional)
//           </label>
//           <input
//             type="file"
//             id="file-upload"
//             className="hidden"
//             multiple
//             onChange={handleFileChange}
//           />
//           <label
//             htmlFor="file-upload"
//             className="inline-block cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
//           >
//             Choose Files
//           </label>

//           {/* File preview */}
//           {files.length > 0 && (
//             <ul className="mt-3 space-y-1 text-sm text-gray-700">
//               {files.map((f, i) => (
//                 <li
//                   key={i}
//                   className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100"
//                 >
//                   <span className="truncate w-3/4">{f.name}</span>
//                   <button
//                     type="button"
//                     onClick={() => removeFile(i)}
//                     className="text-red-500 hover:text-red-700 text-xs font-medium"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
//         >
//           Submit Case
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import { createCaseWithAI } from "@/app/service/createService";

export default function CreateCaseForm({ onSubmit, tenants, tenantID }) {
  const [tenantName, setTenantName] = useState("");
  const [caseName, setCaseName] = useState("");
  const [caseType, setCaseType] = useState("");
  const [files, setFiles] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Ref to manually clear file input value
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await createCaseWithAI({
        tenantID,
        caseName,
        caseType,
        files,
      });

      console.log(data);

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
      setIsLoading(false);
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

    // ✅ Also clear input if no files remain
    if (fileInputRef.current && files.length <= 1) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
      {/* ✅ Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-medium text-gray-600">Creating Case...</p>
        </div>
      )}

      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Case</h3>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 transition duration-200 ${
          isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
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
                  setTenantName(match.name);
                  setError("");
                } else {
                  setError("Please select a valid tenant from the list.");
                }
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Start typing tenant name"
            className={`w-full px-3 py-2.5 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              error ? "border border-red-400" : "border border-gray-200"
            }`}
            required
          />
          {showSuggestions && filteredTenants.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto">
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

        {/* Case Type */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Case Type
          </label>
          <input
            type="text"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            placeholder="Enter case type"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
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
