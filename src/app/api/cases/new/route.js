// src/app/api/cases/new/route.js
// export async function POST(request) {
//   try {
//     const formData = await request.formData();

//     const response = await fetch(`${process.env.BASE_URL}/api/v1/submission/newcase`, {
//       method: "POST",
//       body: formData,
//       headers: {
//         // "Content-Type" : 'application/json',
//         "x-api-key": process.env.SYNSURE_PUBLIC_KEY,
//       },
//     });

//     const data = await response.json();
//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

export async function POST(request) {
  try {
    const formData = await request.formData();

    const response = await fetch(`${process.env.BASE_URL}/api/v1/submission/newcase`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.SYNSURE_PUBLIC_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend error:", text);
      return Response.json({ success: false, error: text }, { status: 500 });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
