export async function createCaseWithAI({ tenantID, caseName, caseType, file }) {
  try {
    const formData = new FormData();
    formData.append("tenant_id", tenantID);
    formData.append("case_name", caseName);
    formData.append("case_type", caseType)
    if (file) formData.append("files", file);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    // ✅ Call Next.js API route, not FastAPI
    const response = await fetch("/api/cases/new", {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}
