export async function GET( request, { params } ) {
  try {
    const { tenantID } = await params;
    const response = await fetch(`${process.env.BASE_URL}/api/v2/case/${tenantID}`, {
      method : "GET",
      headers: {
        'Content-Type' : 'application/json',
        "x-api-key" : process.env.SYNSURE_PUBLIC_KEY,
      }
    }); 

    if(response.ok){
      const data = await response.json()
      return Response.json({ success: data.success, result: data.result });
    }
    return Response.json( { success: false, result: [] } );
  }
  catch {
    console.error("Backend returned error:", response.status);
    return Response.json( { success: false, result: [] } );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { tenantID } = await params;
    const { caseID } = await request.json();

    const response = await fetch(
      `${process.env.BASE_URL}/api/v2/case/${tenantID}/${caseID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.SYNSURE_PUBLIC_KEY,
        },
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Backend delete failed:", err);
      return Response.json({ success: false, error: err });
    }

    const data = await response.json();
    return Response.json({ success: true, result: data });
  } catch (error) {
    console.error("Proxy DELETE error:", error);
    return Response.json({ success: false, error: error.message });
  }
}