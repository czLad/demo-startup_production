"use client";

export default function CasesTable({ cases, onCaseClick }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border overflow-x-auto">
      <h3 className="text-sm font-medium text-gray-600 mb-3">All Cases</h3>
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="px-3 py-2 font-medium">Case ID</th>
            <th className="px-3 py-2 font-medium">Case Name</th>
            <th className="px-3 py-2 font-medium">Created</th>
            <th className="px-3 py-2 font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          {cases?.length > 0 ? (
            cases.map((c) => (
              <tr
                key={c.id}
                onClick={() => onCaseClick?.(c)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-3 py-2">{c.id}</td>
                <td className="px-3 py-2">{c.name}</td>
                <td className="px-3 py-2">{c.createdAt}</td>
                <td className="px-3 py-2">{c.updatedAt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-3 py-4 text-center text-gray-400">
                No cases found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
