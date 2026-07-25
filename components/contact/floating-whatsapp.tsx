"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { SITE_CONFIG } from "@/lib/constants";
import { EASE_OUT_SOFT } from "@/lib/animations";

/**
 * Fixed WhatsApp chat button — quiet, accessible, site-wide.
 */
export function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={SITE_CONFIG.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4, ease: EASE_OUT_SOFT }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className="fixed bottom-6 right-5 z-50 inline-flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="size-5" strokeWidth={1.75} fill="currentColor" aria-hidden="true" />
    </motion.a>
  );
}
