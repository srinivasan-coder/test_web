import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendContactEnquiry, MailerConfigError } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  try {
    await sendContactEnquiry(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof MailerConfigError) {
      console.error(err.message);
      return NextResponse.json(
        { error: "The contact form isn't fully set up yet. Please call or WhatsApp instead." },
        { status: 500 },
      );
    }
    console.error("Failed to send contact enquiry:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 },
    );
  }
}
