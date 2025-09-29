export async function createCaseWithAI({ tenantId, caseName, file }) {
  try {
    const formData = new FormData();
    formData.append("tenant_id", tenantId);
    formData.append("case_name", caseName);
    if (file) formData.append("files", file);

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
