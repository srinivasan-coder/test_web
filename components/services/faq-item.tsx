"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FaqItem as FaqItemType } from "@/types";

interface FaqItemProps {
  item: FaqItemType;
  open: boolean;
  onToggle: () => void;
}

/**
 * Single FAQ row with smooth expand / collapse.
 */
export function FaqItem({ item, open, onToggle }: FaqItemProps) {
  const buttonId = `faq-button-${item.id}`;
  const panelId = `faq-panel-${item.id}`;

  return (
    <div className="border-b border-border">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="font-serif text-lg font-semibold text-foreground sm:text-xl">
            {item.question}
          </span>
          <span
            className={cn(
              "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-transform duration-300",
              open && "rotate-45 bg-secondary",
            )}
            aria-hidden="true"
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
      >
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.answer}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
