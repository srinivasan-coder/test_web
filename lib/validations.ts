import { z } from "zod";

/**
 * Contact / booking enquiry schema — React Hook Form + Zod.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little long."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .max(30, "That phone number looks too long.")
    .regex(/^[\d\s+\-().]+$/, "Please use a valid phone number format."),
  email: z.string().email("Please enter a valid email address."),
  eventType: z.enum(
    [
      "wedding",
      "engagement",
      "pre-wedding",
      "baby",
      "maternity",
      "birthday",
      "other",
    ],
    { message: "Please select an event type." },
  ),
  message: z
    .string()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(1000, "Please keep it under 1000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const EVENT_TYPE_OPTIONS: {
  value: ContactFormValues["eventType"];
  label: string;
}[] = [
  { value: "wedding", label: "Wedding" },
  { value: "engagement", label: "Engagement" },
  { value: "pre-wedding", label: "Pre Wedding" },
  { value: "baby", label: "Baby Shoot" },
  { value: "maternity", label: "Maternity" },
  { value: "birthday", label: "Birthday" },
  { value: "other", label: "Something else" },
];

/** @deprecated Prefer EVENT_TYPE_OPTIONS — kept for older imports. */
export const SERVICE_OPTIONS = EVENT_TYPE_OPTIONS;
