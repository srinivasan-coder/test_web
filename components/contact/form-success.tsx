"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EASE_OUT_SOFT } from "@/lib/animations";

interface FormSuccessProps {
  onReset: () => void;
}

/**
 * Celebratory success state after a contact form submission.
 */
export function FormSuccess({ onReset }: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
      className="flex min-h-[28rem] flex-col items-center justify-center px-6 py-12 text-center"
      role="status"
      aria-live="polite"
    >
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: 0.1,
        }}
        className="inline-flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md"
      >
        <motion.span
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Check className="size-7" strokeWidth={2.25} />
        </motion.span>
      </motion.span>

      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.45, ease: EASE_OUT_SOFT }}
        className="mt-6 font-serif text-2xl font-semibold sm:text-3xl"
      >
        Message sent
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36, duration: 0.45, ease: EASE_OUT_SOFT }}
        className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        Thank you for reaching out. We&apos;ll review your enquiry and reply
        within two business days.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44, duration: 0.45, ease: EASE_OUT_SOFT }}
        className="mt-8"
      >
        <Button type="button" variant="outline" size="lg" onClick={onReset}>
          Send another message
        </Button>
      </motion.div>
    </motion.div>
  );
}
