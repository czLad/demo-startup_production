export async function GET(request) {
  try {

    const response = await fetch(`${process.env.BASE_URL}/tenant/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "x-api-key": process.env.SYNSURE_PUBLIC_KEY,
      },
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
