import { registerUser } from "@/app/actions/auth/registerUser";

export async function POST(request) {
  try {
    // Parse JSON body from the request
    const body = await request.json();

    // Call your registration logic
    const result = await registerUser(body);

    // Respond with success message and data
    return new Response(
      JSON.stringify({ message: "User registered successfully", result }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Register API Error:", error);

    // Respond with error message
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
