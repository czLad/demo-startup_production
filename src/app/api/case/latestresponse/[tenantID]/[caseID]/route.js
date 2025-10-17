export async function GET(request, { params }) {
  const { tenantID, caseID } = await params;
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/v2/case/latestresponse/${tenantID}/${caseID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.SYNSURE_PUBLIC_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      return Response.json({ success: false, error: errorText }, { status: 500 });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}