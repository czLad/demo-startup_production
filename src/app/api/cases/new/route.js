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
    // for (const [key, value] of formData.entries()) {
    //   console.log("key:", key, "value:", value instanceof File ? `${value.name} (${value.size} bytes)` : value);
    // }

    const forwardForm = new FormData();

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

// export async function POST(request) {
//   try {
//     // Parse incoming form data from frontend
//     const incoming = await request.formData();
//     const forwardForm = new FormData();

//     // Re-append normal fields
//     forwardForm.append("tenant_id", incoming.get("tenant_id"));
//     forwardForm.append("case_name", incoming.get("case_name"));
//     forwardForm.append("case_type", incoming.get("case_type"));

//     // Re-append each file with its filename
//     const files = incoming.getAll("files");
//     for (const file of files) {
//       forwardForm.append("files", file, file.name);
//     }

//     // Optional debug log
//     // for (const [key, value] of forwardForm.entries()) {
//     //   console.log("Forwarding:", key, value.name || value);
//     // }

//     // Forward request to external AI Processing API
//     const response = await fetch(
//       `${process.env.BASE_URL}/api/v1/submission/newcase`,
//       {
//         method: "POST",
//         headers: {
//           "x-api-key": process.env.SYNSURE_PUBLIC_KEY,
//         },
//         body: forwardForm, // ✅ let fetch auto-handle multipart boundaries
//       }
//     );

//     // Handle API error responses
//     if (!response.ok) {
//       const text = await response.text();
//       console.error("Backend error:", text);
//       return Response.json(
//         { success: false, error: text },
//         { status: response.status }
//       );
//     }

//     // Return parsed JSON from backend
//     const data = await response.json();
//     return Response.json(data);
//   } catch (error) {
//     console.error("Proxy error:", error);
//     return Response.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

