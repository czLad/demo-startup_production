"use client";

import { useState, useMemo } from "react";
import EmployeesTable from "./components/EmployeesTable";
import SearchBar from "./components/SearchBar";
import { employees as allEmployees } from "./data/mockEmployees";

export default function EmployeeNetworkPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Real-time search filtering
  const filteredEmployees = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return allEmployees;
    return allEmployees.filter(
      (e) =>
        e.name.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {/* Employees Table */}
      <EmployeesTable employees={filteredEmployees} />
    </div>
  );
}
