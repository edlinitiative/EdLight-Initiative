export async function POST(request: Request) {
  const form = await request.formData();
  // Basic validation
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();
  const honeypot = String(form.get("website") || "").trim();

  if (honeypot || !name || !email || !message) {
    return new Response("ok", { status: 200 });
  }

  // Stub: In production, forward to email service or store safely.
  console.log("Contact submission:", { name, email, message });
  return new Response("ok", { status: 200 });
}
