export async function getAllTenants() {
  try {
    const response = await fetch("/api/tenants", {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getTenantCases(tenantID) {
    try {
        const response = await fetch(`/api/case/${tenantID}`, {
            method: "GET",
        });
        return await response.json();
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function getCaseAnalysis(tenantID, caseID) {
  try {
    const response = await fetch(`/api/case/latestresponse/${tenantID}/${caseID}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching case analysis:", error);
    return { success: false, error: error.message };
  }
}