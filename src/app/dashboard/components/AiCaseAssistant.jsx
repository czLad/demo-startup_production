// src/app/components/AiCaseAssistant.jsx
"use client";

import { useState } from "react";
import { Edit, Trash2, Play, PlayCircle, RefreshCcw } from "lucide-react";
import { submitBatch, getTaskStatus } from "@/app/service/batchService";

export default function AICaseAssistant({ tenantID, cases = [] , setCases , isLoadingCases = false}) {

  const [selected, setSelected] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleRun = async (selectedOnly = true) => {
    const caseIDs = selectedOnly ? selected : cases.map((c) => c.id);

    if (caseIDs.length == 0) return alert("No cases selected.");

    setIsProcessing(true);
    const res = await submitBatch(tenantID, caseIDs)
    if(!res.success){
      alert("Batch submission failed");
      setIsProcessing(false);
      return;
    }

    //Convert response { case id: task id}
    const taskMap = res.task_ids;
    const taskIDs = Object.values(taskMap)
    const caseTaskPairs = Object.entries(taskMap)

    setCases((prev) => prev.map((c) => caseIDs.includes(c.id)
    ? {...c, status: "In Progress"}
    : c))

    let retries = 0;
    const MAX_RETRIES = 20; // ≈100 seconds total if polling every 5s

    //Start polling
    const pollInterval = setInterval(async () => {
      const statusRes = await getTaskStatus(tenantID, taskIDs);

      // If backend temporarily not ready yet, retry a few times then stop
      if (!statusRes || statusRes.status === 404) {
        retries++;
        if (retries >= MAX_RETRIES) {
          console.warn("Polling stopped — task endpoint unavailable after retries");
          clearInterval(pollInterval);
          setIsProcessing(false);
        }
        return;
      }

      if(!statusRes?.tasks) return;

      // Merge task statuses into case list
      setCases( (prev) => 
      // new prev will be cases after the map processing
      prev.map((c) => {
        const pair = caseTaskPairs.find(([cid]) => cid === c.id);
        if (!pair) return c;
        // if found a case that's in both caseTaskPairs and prev
        const taskInfo = statusRes.tasks[c.id];
        if (!taskInfo) return c;

        let displayStatus = "In Progress"
        if (taskInfo.status === "completed") displayStatus = "Ready for Review";
        else if (taskInfo.status === "failed") displayStatus = "!! Batch Failed";

        return {...c, status: displayStatus};
      }));

      const allDone = Object.values(statusRes.tasks).every((t) => {
        return ["completed", "failed"].includes(t.status)
      });

      if (allDone) {
        console.log(allDone)
        clearInterval(pollInterval)
        setIsProcessing(false)
        setSelected([])
      }
    }, 5000); //every 5s
  }; 

  return (
    <div className="bg-white rounded-xl shadow-sm border relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          AI Case Assistant
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => handleRun(true)}
            disabled={selected.length === 0 || isProcessing}
            className={`flex items-center gap-1 ${
              selected.length === 0 || isProcessing
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }`}
          >
            <Play className="h-4 w-4" /> Run Selected
          </button>
          <button
            onClick={() => handleRun(false)}
            disabled={isProcessing} 
            className={`${isProcessing ? "text-gray-400 cursor-not-allowed": "text-blue-600 hover:underline"} flex items-center gap-1`}
          >
            <PlayCircle className="h-4 w-4" /> Run All
          </button>
          <button className="text-blue-600 hover:underline">Refresh</button>
          <button className="text-blue-600 hover:underline">New Case</button>
        </div>
      </div>

      {/* Scrollable Case Grid */}
      <div className="p-4 max-h-[490px] overflow-y-auto">
        {/* Loading Overlay */}
        {isLoadingCases && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm font-medium text-gray-600">Loading Cases...</p>
          </div>
        )}

        {/* Case grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="border rounded-lg p-4 flex flex-col space-y-3 bg-gray-50"
            >
              {/* Select + status */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input
                    type="checkbox"
                    checked={selected.includes(c.id)}
                    onChange={() => toggleSelect(c.id)}
                    className="accent-blue-600"
                  />
                  Select
                </label>
                {/* Placeholder for status badge */}
                {c.status && (
                  <span className={`text-xs px-2 py-1 
                    ${
                      c.status === "Ready for Review"
                      ? "bg-green-100 text-green-700"
                      : c.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : (c.status === "Case Created" || c.status === "!! Batch Failed")
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                    }`}>
                    {c.status}
                  </span>
                )}
              </div>

              {/* Case Info */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800 mb-1">
                  {c.name}
                </h3>
                {c.description && (
                  <p className="text-xs text-gray-500">{c.description}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  className="text-yellow-600 hover:text-yellow-700"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  className="text-red-600 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {/* Empty state */}
          {!isLoadingCases && cases.length === 0 && (
            <div className="col-span-full text-center text-sm text-gray-400 py-8">
              No cases available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
