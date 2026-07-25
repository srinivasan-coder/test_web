"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface FilterChipOption<T extends string> {
  value: T;
  label: string;
}

interface FilterChipsProps<T extends string> {
  options: FilterChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

/**
 * Accessible filter chip group (radiogroup + roving tabindex).
 */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: FilterChipsProps<T>) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const focusOption = (index: number) => {
    const next = options[index];
    if (!next) return;
    onChange(next.value);
    refs.current[index]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusOption(index === last ? 0 : index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusOption(index === 0 ? last : index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusOption(0);
        break;
      case "End":
        event.preventDefault();
        focusOption(last);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={cn(
        "fade-x no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0",
        className,
      )}
      role="radiogroup"
      aria-label={label}
    >
      {options.map((option, index) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              active
                ? "bg-ink text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:bg-[color-mix(in_srgb,var(--color-surface)_55%,var(--color-line))] hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
