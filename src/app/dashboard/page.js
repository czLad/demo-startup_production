"use client";

import { useState } from "react";
import DashboardLayout from "./components/DashboardLayout";
import StatCard from "./components/StatCard";
import ClaimsPieChart from "./components/ClaimsPieChart";
import CasesTable from "./components/CasesTable";
import CaseDetailsModal from "./components/CaseDetailsModal";
import CreateCaseForm from "./components/CreateCaseForm";
import AICaseAssistant from "./components/AICaseAssistant";

export default function DashboardPage() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [cases, setCases] = useState([
    { id: "C-101", name: "Auto Claim - Tesla", createdAt: "2025-09-01", updatedAt: "2025-09-03" },
    { id: "C-102", name: "Home Insurance - Fire", createdAt: "2025-09-05", updatedAt: "2025-09-06" },
  ]);

  const [mockCases, setMockCases] = useState([
  {
    id: "CA-201",
    name: "Travel Insurance Claim - Missed Connection at JFK",
    description: "Flight missed due to delay",
    status: "Pending",
  },
  {
    id: "CA-202",
    name: "Auto Collision Claim - Rear-End at Mission Bay",
    description: "Minor damages reported",
    status: "Approved",
  },
  ]);

  const handleAddCase = (newCase) => {
    const newId = `C-${100 + cases.length + 1}`;
    const now = new Date().toISOString().split("T")[0];
    setCases([
      ...cases,
      { id: newId, name: newCase.caseName, createdAt: now, updatedAt: now },
    ]);
  };

  const handleAddAICase = (data) => {
    if (!data.success) return;
    const now = new Date().toISOString().split("T")[0];

    setMockCases([
      ...mockCases,
      {
        id: data.new_case_id,                       // ✅ backend UUID
        name: data.result?.reasoning || "New Case",
        description: `Confidence: ${data.result?.confidence ?? "N/A"}`,
        status: data.result?.decision || "N/A",
        createdAt: now,
        updatedAt: now,
        analysis: data.result?.ai_analysis,
        confidence: data.result?.confidence_score,
        processingTime: data.result?.processing_time,
      },
    ]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Row 1: Pie Chart */}
        <div className="grid grid-cols-1">
          <ClaimsPieChart completed={70} remaining={30} />
        </div>

        {/* Row 2: Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatCard title="Active Claims" value="70%" status="Completion" color="bg-blue-100 text-blue-600" />
          <StatCard title="Denied" value="32" color="bg-red-100 text-red-600" />
          <StatCard title="Approved" value="54" color="bg-green-100 text-green-600" />
        </div>

        {/* Row 3: Cases Table */}
        <div>
          <CasesTable cases={cases} onCaseClick={setSelectedCase} />
        </div>

        {/* Row 4: Create New Case Form */}
        <div>
          <CreateCaseForm onSubmit={handleAddAICase} />
        </div>
        {/* Row 5: AI Case Assistant */}
        <div>
          <AICaseAssistant cases={mockCases} />
        </div>
      </div>

      {/* Case Details Modal */}
      <CaseDetailsModal
        isOpen={!!selectedCase}
        caseData={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </DashboardLayout>
  );
}
