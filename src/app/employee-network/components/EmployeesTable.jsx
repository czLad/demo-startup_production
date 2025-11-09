"use client";

import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function EmployeesTable({ employees = [], isLoading }) {
  const router = useRouter();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">
          All Employees
        </h3>
      </div>

      {/* Table */}
      <div className="relative border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50/70 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-5 py-3 font-medium w-[24%]">Employee Name</th>
              <th className="px-5 py-3 font-medium w-[34%]">Claims Handled Today</th>
              <th className="px-5 py-3 font-medium w-[20%]">Approved</th>
              <th className="px-5 py-3 font-medium w-[20%]">Weekly Trend</th>
            </tr>
          </thead>
        </table>

        {isLoading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-2xl">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium text-gray-600">
              Loading Employees...
            </p>
          </div>
        )}

        {/* Scrollable Table Body */}
        <div className="max-h-[300px] overflow-y-scroll">
          <table className="w-full text-sm text-left border-collapse table-fixed">
            <colgroup>
              <col className="w-[25%]" />
              <col className="w-[35%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
            </colgroup>

            <tbody>
              {employees.length > 0 ? (
                employees.map((e, idx) => (
                  <tr
                    key={e.id}
                    onClick={() => router.push(`/employee-network/${e.id}`)}
                    className={`transition-all duration-200 cursor-pointer ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    } hover:bg-blue-50/60`}
                  >
                    <td className="px-5 py-3 text-gray-800 font-medium whitespace-nowrap">
                      {e.name}
                    </td>

                    <td className="px-5 py-3 text-gray-700">
                      {e.handledToday}
                    </td>

                    <td className="px-5 py-3">
                      <span className="font-semibold text-blue-600">
                        {(e.approvedPct * 100).toFixed(0)}%
                      </span>
                    </td>

                    <td className="px-5 py-3 text-left">
                      {e.weeklyTrendPct >= 0 ? (
                        <span className="flex items-center text-green-600 font-medium">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          +{e.weeklyTrendPct}% this week
                        </span>
                      ) : (
                        <span className="flex items-center text-red-500 font-medium">
                          <TrendingDown className="w-4 h-4 mr-1" />
                          {e.weeklyTrendPct}% this week
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-6 text-center text-gray-400 text-sm"
                  >
                    No employees found
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
