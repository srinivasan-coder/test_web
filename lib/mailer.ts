import nodemailer from "nodemailer";
import type { ContactFormValues } from "@/lib/validations";
import { EVENT_TYPE_OPTIONS } from "@/lib/validations";
import { SITE_CONFIG } from "@/lib/constants";

export class MailerConfigError extends Error {}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new MailerConfigError(
      "GMAIL_USER / GMAIL_APP_PASSWORD are not set. Add them to your .env.local before using the contact form.",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function eventTypeLabel(value: ContactFormValues["eventType"]): string {
  return EVENT_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export async function sendContactEnquiry(values: ContactFormValues): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.GMAIL_USER!;

  await transporter.sendMail({
    from: `"${SITE_CONFIG.name} website" <${from}>`,
    to: SITE_CONFIG.email,
    replyTo: `"${values.name}" <${values.email}>`,
    subject: `New enquiry — ${eventTypeLabel(values.eventType)} — ${values.name}`,
    text: [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Event type: ${eventTypeLabel(values.eventType)}`,
      "",
      "Message:",
      values.message,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(values.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p><strong>Event type:</strong> ${escapeHtml(eventTypeLabel(values.eventType))}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(values.message).replace(/\n/g, "<br>")}</p>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
