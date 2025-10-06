// GET /api/task/status?tenant_id=xxx&task_ids=a,b,c
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenant_id = searchParams.get("tenant_id");
    const task_ids = searchParams.get("task_ids");

    const response = await fetch(
      `${process.env.BASE_URL}/task/status/${tenant_id}?task_ids=${task_ids}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.SYNSURE_PUBLIC_KEY,
        },
      }
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
