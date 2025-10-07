"use client";

// export default function CasesTable({ cases, onCaseClick }) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm border overflow-x-auto">
//       <h3 className="text-sm font-medium text-gray-600 mb-3">All Cases</h3>
//       <table className="w-full text-sm text-left border-collapse">
//         <thead>
//           <tr className="border-b text-gray-500">
//             <th className="px-3 py-2 font-medium">Case ID</th>
//             <th className="px-3 py-2 font-medium">Case Name</th>
//             <th className="px-3 py-2 font-medium">Created</th>
//             <th className="px-3 py-2 font-medium">Updated</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cases?.length > 0 ? (
//             cases.map((c) => (
//               <tr
//                 key={c.id}
//                 onClick={() => onCaseClick?.(c)}
//                 className="border-b hover:bg-gray-50 cursor-pointer"
//               >
//                 <td className="px-3 py-2">{c.id}</td>
//                 <td className="px-3 py-2">{c.name}</td>
//                 <td className="px-3 py-2">{c.createdAt}</td>
//                 <td className="px-3 py-2">{c.updatedAt}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="px-3 py-4 text-center text-gray-400">
//                 No cases found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

export default function CasesTable({ cases, onCaseClick }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
          All Cases
        </h3>
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm text-left border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50/70 text-gray-600 uppercase text-xs tracking-wider">
              <th className="px-5 py-3 font-medium">Case ID</th>
              <th className="px-5 py-3 font-medium">Case Name</th>
              <th className="px-5 py-3 font-medium">Created</th>
              <th className="px-5 py-3 font-medium">Updated</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {cases?.length > 0 ? (
              cases.map((c, idx) => (
                <tr
                  key={c.id}
                  onClick={() => onCaseClick?.(c)}
                  className={`transition-all duration-200 cursor-pointer ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-blue-50/60`}
                >
                  <td className="px-5 py-3 font-medium text-gray-800 whitespace-nowrap">
                    {c.id}
                  </td>
                  <td className="px-5 py-3 text-gray-700 truncate max-w-[240px]">
                    {c.name}
                  </td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                    {c.createdAt}
                  </td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">
                    {c.updatedAt}
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
  );
}
