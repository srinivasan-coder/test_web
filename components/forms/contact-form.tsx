"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";

import {
  contactSchema,
  EVENT_TYPE_OPTIONS,
  type ContactFormValues,
} from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormSuccess } from "@/components/contact/form-success";
import { EASE_OUT_SOFT } from "@/lib/animations";

interface ContactFormProps {
  /** Optional submit handler — defaults to a simulated success. */
  onSubmit?: (values: ContactFormValues) => Promise<void> | void;
  /** Pre-select an event type (e.g. from /contact?service=wedding). */
  defaultEventType?: ContactFormValues["eventType"];
}

/**
 * Premium contact form — React Hook Form + Zod, with success animation.
 */
export function ContactForm({ onSubmit, defaultEventType }: ContactFormProps) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      eventType: defaultEventType,
      message: "",
    },
  });

  const submit = handleSubmit(async (values) => {
    try {
      setStatus("idle");
      if (onSubmit) {
        await onSubmit(values);
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to send message");
        }
      }
      reset({
        name: "",
        phone: "",
        email: "",
        eventType: undefined,
        message: "",
      });
      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <FormSuccess
            key="success"
            onReset={() => setStatus("idle")}
          />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}
          >
            <div className="mb-8">
              <span className="eyebrow">Enquiry</span>
              <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Send a message
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Share a few details and we&apos;ll get back to you shortly.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5" noValidate>
              <Field id="name" label="Name" error={errors.name?.message}>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Alex Rivera"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
              </Field>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="phone" label="Phone" error={errors.phone?.message}>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 93848 16570"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                </Field>

                <Field id="email" label="Email" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@studio.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                </Field>
              </div>

              <Field
                id="eventType"
                label="Event Type"
                error={errors.eventType?.message}
              >
                <Select
                  id="eventType"
                  aria-invalid={!!errors.eventType}
                  defaultValue={defaultEventType ?? ""}
                  {...register("eventType")}
                >
                  <option value="" disabled>
                    Select an event type
                  </option>
                  {EVENT_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field
                id="message"
                label="Message"
                error={errors.message?.message}
              >
                <Textarea
                  id="message"
                  placeholder="Tell us about your date, location, and what you'd like created."
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
              </Field>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>
              </div>

              {status === "error" ? (
                <p className="text-sm text-destructive" role="alert">
                  {errorMessage ?? "Something went wrong. Please try again."}
                </p>
              ) : null}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
