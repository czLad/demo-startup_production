"use client";

import QuickTypesChart from "./QuickTypesChart";
import TopRulesCard from "./TopRulesCard";
import CategoryPanel from "./CategoryPanel";

export default function InsightsOverview() {
  const mockData = [
    {
      title: "Auto",
      stats: [
        { label: "Total Claims", value: 134 },
        { label: "Fraud Cases", value: 12 },
        { label: "Most Broken Rule", value: "Missing repair documentation" },
      ],
      mostBrokenRulePercent: 78,
      modalData: {
        fraudTypes: [
          "Duplicate accident claim",
          "Fake vehicle damage photos",
          "Inflated repair invoices",
          "Phantom passenger injuries",
        ],
        rulesBroken: [
          { label: "Missing repair documentation", percent: 78 },
          { label: "Late claim submission", percent: 63 },
          { label: "Policyholder mismatch", percent: 48 },
        ],
        adjudication: [
          { label: "Crashes", percent: 80 },
          { label: "Theft", percent: 50 },
          { label: "False Injury", percent: 30 },
        ],
      },
    },
    {
      title: "P&C",
      stats: [
        { label: "Total Claims", value: 89 },
        { label: "Fraud Cases", value: 5 },
        { label: "Most Broken Rule", value: "Unverified receipts" },
      ],
      mostBrokenRulePercent: 65,
      modalData: {
        fraudTypes: [
          "Fake inventory loss",
          "Overstated property damage",
          "False rental invoices",
          "Altered contractor estimates",
        ],
        rulesBroken: [
          { label: "Unverified receipts", percent: 65 },
          { label: "No proof of ownership", percent: 52 },
          { label: "Tampered date on invoices", percent: 41 },
        ],
        adjudication: [
          { label: "Property Damage", percent: 70 },
          { label: "Rental Loss", percent: 40 },
          { label: "Fire Damage", percent: 55 },
        ],
      },
    },
    {
      title: "Travelers Insurance",
      stats: [
        { label: "Total Claims", value: 61 },
        { label: "Fraud Cases", value: 4 },
        { label: "Most Broken Rule", value: "Unverified travel documents" },
      ],
      mostBrokenRulePercent: 58,
      modalData: {
        fraudTypes: [
          "Forged medical receipts abroad",
          "Double-dipped baggage claims",
          "False trip delay reports",
          "Faked itinerary cancellations",
        ],
        rulesBroken: [
          { label: "Unverified travel documents", percent: 58 },
          { label: "Duplicate reimbursement attempts", percent: 47 },
          { label: "Late claim submission", percent: 39 },
        ],
        adjudication: [
          { label: "Trip Cancellation", percent: 60 },
          { label: "Medical Coverage", percent: 45 },
          { label: "Baggage Loss", percent: 50 },
        ],
      },
    },
    {
      title: "Workers Compensation",
      stats: [
        { label: "Total Claims", value: 43 },
        { label: "Fraud Cases", value: 8 },
        { label: "Most Broken Rule", value: "Missing employer verification" },
      ],
      mostBrokenRulePercent: 72,
      modalData: {
        fraudTypes: [
          "Fake workplace injury",
          "Unreported part-time job",
          "Exaggerated medical costs",
          "Extended leave under false pretense",
        ],
        rulesBroken: [
          { label: "Missing employer verification", percent: 72 },
          { label: "Unverified doctor’s note", percent: 58 },
          { label: "Inconsistent timeline", percent: 44 },
        ],
        adjudication: [
          { label: "Injury", percent: 75 },
          { label: "Rehabilitation", percent: 55 },
          { label: "Lost Wages", percent: 65 },
        ],
      },
    },
    {
      title: "Liability",
      stats: [
        { label: "Total Claims", value: 102 },
        { label: "Fraud Cases", value: 9 },
        { label: "Most Broken Rule", value: "Insufficient incident evidence" },
      ],
      mostBrokenRulePercent: 74,
      modalData: {
        fraudTypes: [
          "False injury at workplace",
          "Inflated third-party damage costs",
          "Staged slip-and-fall claims",
          "Duplicate liability submissions",
        ],
        rulesBroken: [
          { label: "Insufficient incident evidence", percent: 74 },
          { label: "Inconsistent witness reports", percent: 61 },
          { label: "Missing police documentation", percent: 46 },
        ],
        adjudication: [
          { label: "Bodily Injury", percent: 68 },
          { label: "Property Damage", percent: 52 },
          { label: "Third-Party Liability", percent: 60 },
        ],
      },
    },
    {
      title: "Cyber",
      stats: [
        { label: "Total Claims", value: 78 },
        { label: "Fraud Cases", value: 6 },
        { label: "Most Broken Rule", value: "Unreported breach timeline" },
      ],
      mostBrokenRulePercent: 69,
      modalData: {
        fraudTypes: [
          "Simulated ransomware attack",
          "False data loss report",
          "Duplicated incident submission",
          "Fabricated malware infection logs",
        ],
        rulesBroken: [
          { label: "Unreported breach timeline", percent: 69 },
          { label: "Missing server logs", percent: 56 },
          { label: "Unverified vendor breach source", percent: 42 },
        ],
        adjudication: [
          { label: "Data Breach", percent: 72 },
          { label: "Ransomware Attack", percent: 63 },
          { label: "Phishing Compromise", percent: 49 },
        ],
      },
    },
    {
      title: "Financial Insurance",
      stats: [
        { label: "Total Claims", value: 57 },
        { label: "Fraud Cases", value: 7 },
        { label: "Most Broken Rule", value: "Unsupported transaction trail" },
      ],
      mostBrokenRulePercent: 66,
      modalData: {
        fraudTypes: [
          "False funds transfer report",
          "Duplicate investment loss claim",
          "Inflated accounting discrepancies",
          "Falsified audit confirmations",
        ],
        rulesBroken: [
          { label: "Unsupported transaction trail", percent: 66 },
          { label: "Unverified beneficiary identity", percent: 52 },
          { label: "Inconsistent statement timestamps", percent: 41 },
        ],
        adjudication: [
          { label: "Funds Transfer Fraud", percent: 68 },
          { label: "Investment Misrepresentation", percent: 54 },
          { label: "Account Hacking", percent: 48 },
        ],
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Top Row */}
      <div className="xl:col-span-7">
        <QuickTypesChart />
      </div>

      <div className="xl:col-span-5">
        <TopRulesCard />
      </div>

      {/* Category Panels */}
      {mockData.map((cat, idx) => (
        <div key={idx} className="xl:col-span-6">
          <CategoryPanel
            title={cat.title}
            stats={cat.stats}
            mostBrokenRulePercent={cat.mostBrokenRulePercent}
            modalData={cat.modalData}
          />
        </div>
      ))}
    </div>
  );
}
