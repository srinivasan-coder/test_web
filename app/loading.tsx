import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Global route loading state — calm skeleton shell.
 */
export default function Loading() {
  return (
    <div className="section-y" aria-busy="true" aria-live="polite" role="status">
      <span className="sr-only">Loading page…</span>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Skeleton pill className="h-5 w-24" />
          <Skeleton className="h-12 w-full max-w-xl" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-3/4 max-w-sm" />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/5] w-full" />
          ))}
        </div>
      </Container>
    </div>
  );
}
