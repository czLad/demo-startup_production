// src/app/components/dashboard/DashboardLayout.jsx
"use client";

import SidebarNav from "./SidebarNav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main section */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header
          className="
            h-16 px-6 flex items-center justify-between
            border-b border-gray-200 bg-white shadow-sm
          "
        >
          <h1 className="text-lg font-semibold tracking-wide">Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* placeholder for user avatar or settings later */}
            <span className="text-sm text-gray-500">Hello, Employee</span>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
