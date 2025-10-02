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