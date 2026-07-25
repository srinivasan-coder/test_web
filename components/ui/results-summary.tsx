import { cn } from "@/lib/utils";

interface ResultsSummaryProps {
  visible: number;
  total: number;
  noun: string;
  className?: string;
}

/**
 * “Showing N of M …” summary used by explorers.
 */
export function ResultsSummary({
  visible,
  total,
  noun,
  className,
}: ResultsSummaryProps) {
  const plural = total === 1 ? noun : `${noun}s`;

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Showing{" "}
      <span className="font-medium text-foreground">{visible}</span>
      {total !== visible ? (
        <>
          {" "}
          of <span className="font-medium text-foreground">{total}</span>
        </>
      ) : null}{" "}
      {plural}
    </p>
  );
}
