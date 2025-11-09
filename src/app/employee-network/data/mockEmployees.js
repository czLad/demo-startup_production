// src/app/employee-network/data/mockEmployees.js
// Hard-coded demo data for the Employee Network pages.
// Keep all display fields here so components stay dumb/presentational.

export const employees = [
  {
    id: "dan-smith",
    name: "Dan Smith",
    role: "Senior Claims Adjuster",
    handledToday: 28,
    approvedPct: 0.72,
    fraudRejectPct: 0.08,
    weeklyTrendPct: +8,
    categories: ["Auto", "P&C", "Travel"],
    avatarSeed: "DS",
    categoryPerformance: {
      Auto: 82,
      "P&C": 74,
      Travel: 65,
    },
    aiAnalysis:
      "Dan prioritizes documentation completeness and consistently flags low-confidence receipts.",
    aiRecommendation:
      "Auto-suggest missing documents before final review to cut cycle time and reduce manual follow-ups.",
    recentCases: [
      { id: "c-9da8c7a07ac", name: "Chen v. Johnson — Sideswipe (Auto)", createdAt: "2025-10-20", updatedAt: "2025-10-20" },
      { id: "c-ce2be3ea1b", name: "Personal Device Theft (P&C)", createdAt: "2025-10-20", updatedAt: "2025-10-20" },
      { id: "c-a08328707e", name: "Missed Connection at JFK (Travel)", createdAt: "2025-10-20", updatedAt: "2025-10-20" },
    ],
  },
  {
    id: "james-brown",
    name: "James Brown",
    role: "Claims Adjuster",
    handledToday: 21,
    approvedPct: 0.65,
    fraudRejectPct: 0.11,
    weeklyTrendPct: +3,
    categories: ["P&C", "Workers Comp"],
    avatarSeed: "JB",
    categoryPerformance: {
      "P&C": 70,
      "Workers Comp": 58,
    },
    aiAnalysis:
      "James is strongest on P&C. Fraud rejections correlate with unverifiable receipts.",
    aiRecommendation:
      "Implement an automated vendor verification pre-check to reduce false positives in fraud detection.",
    recentCases: [
      { id: "c-80160ee279", name: "Homeowners — Burst Pipe", createdAt: "2025-10-20", updatedAt: "2025-10-20" },
      { id: "c-4b9af0a177", name: "Employer Verification Pending", createdAt: "2025-10-20", updatedAt: "2025-10-20" },
    ],
  },
  {
    id: "alexa-ruiz",
    name: "Alexa Ruiz",
    role: "Senior Examiner",
    handledToday: 32,
    approvedPct: 0.78,
    fraudRejectPct: 0.05,
    weeklyTrendPct: +12,
    categories: ["Auto", "Liability"],
    avatarSeed: "AR",
    categoryPerformance: {
      Auto: 88,
      Liability: 79,
    },
    aiAnalysis:
      "Alexa resolves liability disputes quickly by referencing prior similar rulings.",
    aiRecommendation:
      "Add a quick-link cluster to top 10 precedent cases to streamline her liability assessment workflow.",
    recentCases: [
      { id: "c-7fa1b2c3d4", name: "Rear-End Collision (Auto)", createdAt: "2025-10-19", updatedAt: "2025-10-20" },
    ],
  },
  {
    id: "maria-cho",
    name: "Maria Cho",
    role: "Claims Analyst",
    handledToday: 18,
    approvedPct: 0.61,
    fraudRejectPct: 0.09,
    weeklyTrendPct: -2,
    categories: ["Travel", "Financial"],
    avatarSeed: "MC",
    categoryPerformance: {
      Travel: 62,
      Financial: 55,
    },
    aiAnalysis:
      "Maria’s approvals dip on travel claims with missing itinerary proofs.",
    aiRecommendation:
      "Prompt claimants to provide airline booking or itinerary references during initial intake to prevent incomplete submissions.",
    recentCases: [
      { id: "c-2a2a2a2a2a", name: "Travel Delay — Europe Trip", createdAt: "2025-10-18", updatedAt: "2025-10-20" },
    ],
  },
  {
    id: "owen-lee",
    name: "Owen Lee",
    role: "Adjuster",
    handledToday: 24,
    approvedPct: 0.69,
    fraudRejectPct: 0.07,
    weeklyTrendPct: +5,
    categories: ["Workers Comp", "Cyber"],
    avatarSeed: "OL",
    categoryPerformance: {
      "Workers Comp": 68,
      Cyber: 72,
    },
    aiAnalysis:
      "Owen benefits from a checklist for employer verification and breach timeline validation.",
    aiRecommendation:
      "Deploy an auto-generated checklist at case creation for employer and breach verification steps.",
    recentCases: [
      { id: "c-5b5b5b5b5b", name: "Breach Timeline Review (Cyber)", createdAt: "2025-10-18", updatedAt: "2025-10-20" },
    ],
  },

  {
    id: "nora-kim",
    name: "Nora Kim",
    role: "Claims Supervisor",
    handledToday: 26,
    approvedPct: 0.74,
    fraudRejectPct: 0.06,
    weeklyTrendPct: +9,
    categories: ["Auto Insurance", "P&C", "Financial Insurance"],
    avatarSeed: "NK",
    categoryPerformance: {
      "Auto Insurance": 82,
      "P&C": 76,
      "Financial Insurance": 88,
    },
    aiAnalysis:
      "Nora demonstrates strong analytical consistency in complex auto and financial insurance cases, ensuring proper documentation and fair adjudication.",
    aiRecommendation:
      "Integrate predictive claim scoring to automatically flag high-value financial claims and reduce her manual prioritization workload.",
    recentCases: [
      {
        id: "c-55cd91a7e4",
        name: "Fleet Collision — Multi-Vehicle (Auto Insurance)",
        createdAt: "2025-10-22",
        updatedAt: "2025-10-23",
      },
      {
        id: "c-2e6f8c9d0a",
        name: "Corporate Policy Audit — Overbilling Review (Financial Insurance)",
        createdAt: "2025-10-21",
        updatedAt: "2025-10-22",
      },
    ],
  },

];


// Lightweight utilities the list/detail pages can use.
export function searchEmployees(term) {
  const q = (term || "").toLowerCase().trim();
  if (!q) return employees;
  return employees.filter(
    (e) =>
      e.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.categories.some((c) => c.toLowerCase().includes(q))
  );
}

export function getEmployeeById(id) {
  return employees.find((e) => e.id === id);
}
