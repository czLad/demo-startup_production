"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "./components/DashboardLayout";
import StatCard from "./components/StatCard";
import ClaimsPieChart from "./components/ClaimsPieChart";
import CasesTable from "./components/CasesTable";
import CaseDetailsModal from "./components/CaseDetailsModal";
import CreateCaseForm from "./components/CreateCaseForm";
import AICaseAssistant from "./components/AICaseAssistant";
import CaseAnalysisModal from "./components/CaseAnalysisModal";
import { getAllTenants, getTenantCases, getCaseAnalysis } from "../service/fetchService";

export default function DashboardPage() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCaseAI, setSelectedCaseAI] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
    const [cases, setCases] = useState([
      { id: "C-101", name: "Auto Claim - Tesla", createdAt: "2025-09-01", updatedAt: "2025-09-03" },
      { id: "C-102", name: "Home Insurance - Fire", createdAt: "2025-09-05", updatedAt: "2025-09-06" },
    ]);
  const [mockCases, setMockCases] = useState([]);

  const [tenants, setTenants] = useState([]);
  const [tenantMap, setTenantMap] = useState({});
  const [isLoadingTenantCases, setIsLoadingTenantCases] = useState(true);

  //Not gonna need all tenants when login gets implemented
  useEffect( () => {
    const fetchTenants = async () => {
      const data = await getAllTenants();
      // console.log(data)
      if(data.success) {
        setTenants(data.result);
        setTenantMap(
          Object.fromEntries(data.result.map((t) => [t.name, t.id]))
        );
      }
      else {
        console.error("Failed to fetch tenants", data.error);
      }
    }
    fetchTenants();
  }, []);

  // console.log(tenantMap)
  // console.log(tenantMap)
  //Hardcoded for now -> To be soft coded with login implemented
  const tenantID = tenantMap["alliant"]

  // Add a route to get all cases for tenant: alliant
  useEffect(() => {
    if(!tenantID) return;
    const fetchTenantCases = async () => {
      setIsLoadingTenantCases(true)
      try {
      const data = await getTenantCases(tenantID);
      if (data.success) {
        const normalized = data.result.map((c) => ({
          id: c.id,
          name: c.case_name || "Untitled Case",
          description: c.short_des,
          status: "Ready for Review",
          createdAt: c.created_at,
          updatedAt: c.updated_at,
        }));
        setMockCases(normalized);
      } else {
        console.error("Failed to fetch tenant cases", data.error);
      }
      } catch (error) {
        console.error("Error fetching tenant cases:", error);
      } finally {
        setIsLoadingTenantCases(false); // Always stop loading
      }
    }
    fetchTenantCases()
  }, [tenantID])

  // console.log(mockCases)

  const handleAddCase = (newCase) => {
    const newId = `C-${100 + cases.length + 1}`;
    const now = new Date().toISOString().split("T")[0];
    setCases([
      ...cases,
      { id: newId, name: newCase.caseName, createdAt: now, updatedAt: now },
    ]);
  };

  const handleAddAICase = (data) => {
    // console.log(data)
    if (!data.success) return;
    const now = new Date().toISOString().split("T")[0];

    setMockCases([
      ...mockCases,
      {
        id: data.new_case_id,
        name: data.result.case_name || "Untitled Case",   // map backend `case_name` -> `name`
        description: data.result.short_des,          // "Minor damages reported",              // backend doesn’t give one yet
        status: "Case Created",    //should be boolean new_case_processed later     // default/fallback since backend doesn’t send status
        createdAt: now,
        updatedAt: now,
      },
    ]);
  };

  const exampleResponse = {
  "confidence": 76,
  "short_des": "Missed connection—extra airfare and hotel night",
  "reasoning": "ClaimForm_Travel (CASE-004-TRAVEL) and OrbitFly itinerary confirm an interrupted trip due to a delayed connection with rebooking and one night lodging requested, but receipts and carrier delay confirmation are not yet provided, so conditions precedent to payment are incomplete. Under Chubb Travel Insurance Trip Interruption/Delay, coverage applies for common-carrier delay when the insured furnishes proof of loss (receipts, carrier documentation) and demonstrates reasonable, necessary expenses; handling must align with fair-claims standards, and potential third-party recovery from the carrier (e.g., EU261 if applicable) should be considered.",
  "riskScore": "MEDIUM",
  "flags": ["DOCUMENTATION_INCONSISTENT", "COVERAGE_ADEQUATE", "THIRD_PARTY_LIABILITY"],
  "rule_followed": "false",
  "rule_used": "Chubb Travel Insurance Policy—Trip Interruption/Trip Delay: Duties After Loss (proof of loss, receipts, carrier delay confirmation)#California Fair Claims Settlement Practices Regulations, 10 CCR §2695.7#NAIC Unfair Claims Settlement Practices Model Act (claims documentation and investigation standards)#Regulation (EC) No 261/2004 (EU261) (air passenger delay compensation; potential third-party recovery)"
  }

  const handleCaseClick = async (caseData) => {
    // Next stop: show temporary loading state in modal
    setSelectedCaseAI(caseData.id);
    setAnalysisData(null);

    const data = await getCaseAnalysis(tenantID, caseData.id);
    if (data.success) {
      // console.log(data)
      setAnalysisData(data.result);
    } else {
      console.error("Failed to fetch case analysis:", data.error);
      setAnalysisData({
        short_des: "Unable to load analysis.",
        reasoning: res.error,
        confidence: 0,
        riskScore: "N/A",
        flags: [],
        rule_used: "",
        rule_followed: false,
      });
    }
  };


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Row 1: Pie Chart */}
        <div className="grid grid-cols-1">
          <ClaimsPieChart completed={70} remaining={30} />
        </div>

        {/* Row 2: Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Active Claims"
            value="30%"
            status="In Progress"
            color="blue"
            trend={{ value: "+3%", direction: "up" }}
          />
          <StatCard
            title="Denied"
            value="32"
            status="Declined"
            color="red"
            trend={{ value: "-2%", direction: "down" }}
          />
          <StatCard
            title="Approved"
            value="54"
            status="Completed"
            color="green"
            trend={{ value: "+8%", direction: "up" }}
          />
        </div>

        {/* Row 3: Cases Table */}
        <div>
          <CasesTable cases={mockCases} onCaseClick={setSelectedCase} isLoadingCases={isLoadingTenantCases}/>
        </div>

        {/* Row 4: Create New Case Form */}
        <div>
          <CreateCaseForm onSubmit={handleAddAICase} tenants={tenants} tenantID={tenantID}/>
        </div>
        {/* Row 5: AI Case Assistant */}
        <div>
          <AICaseAssistant tenantID={tenantID} cases={mockCases} setCases={setMockCases} isLoadingCases={isLoadingTenantCases} onCaseClick={handleCaseClick}/>
        </div>
      </div>

      {/* Case Details Modal */}
      <CaseDetailsModal
        isOpen={!!selectedCase}
        caseData={selectedCase}
        onClose={() => setSelectedCase(null)}
      />

      {/* Case Analysis Modal */}
      <CaseAnalysisModal
        isOpen={!!selectedCaseAI}
        onClose={() => setSelectedCaseAI(null)}
        data={analysisData}
      />
    </DashboardLayout>
  );
}
