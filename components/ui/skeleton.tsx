import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rounded full pill (chips, avatars). */
  pill?: boolean;
}

/**
 * Quiet shimmer placeholder for loading states.
 */
export function Skeleton({ className, pill = false, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("skeleton", pill ? "rounded-full" : "rounded-2xl", className)}
      {...props}
    />
  );
}

/**
 * Portfolio explorer loading placeholder.
 */
export function ExplorerSkeleton({
  variant = "masonry",
}: {
  variant?: "masonry" | "cards";
}) {
  return (
    <div
      className="section-y-tight"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <span className="sr-only">Loading content…</span>
      <div className="mx-auto w-full max-w-[var(--container-content)] px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="fade-x no-scrollbar flex gap-2 overflow-x-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} pill className="h-10 w-24 shrink-0" />
            ))}
          </div>
          <Skeleton className="h-12 w-full rounded-2xl lg:max-w-sm" />
        </div>

        <Skeleton className="mt-6 h-4 w-40" />

        {variant === "masonry" ? (
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {[280, 360, 240, 320, 300, 260].map((height, i) => (
              <Skeleton
                key={i}
                className="mb-4 w-full break-inside-avoid"
                style={{ height }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
