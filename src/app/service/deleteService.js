// src/app/service/deleteService.js

export async function deleteCase(tenantID, caseID) {
  try {
    const response = await fetch(`/api/case/${tenantID}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseID }), // pass caseID in body
    });

    return await response.json();
  } catch (error) {
    console.error("Delete case error:", error);
    return { success: false, error: error.message };
  }
}
