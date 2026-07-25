import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level for accessibility. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
}

/**
 * Consistent section title block: eyebrow → heading → description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Heading
        className={cn(
          "type-title",
          align === "center" ? "max-w-2xl" : "max-w-3xl",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn("type-body", align === "center" && "max-w-2xl")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
