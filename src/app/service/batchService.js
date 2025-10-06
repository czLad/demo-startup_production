export async function submitBatch(tenantID, caseIDs) {
  try {
    const response = await fetch("/api/batch/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenant_id: tenantID, case_ids: caseIDs }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getTaskStatus(tenantID, taskIDs) {
  try {
    const query = new URLSearchParams({
      tenant_id: tenantID,
      task_ids: taskIDs.join(","),
    });
    //default GET due to query string
    const response = await fetch(`/api/task/status?${query.toString()}`);
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}
