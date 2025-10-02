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
