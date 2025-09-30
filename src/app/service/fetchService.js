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