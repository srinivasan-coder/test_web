import { StatsStrip } from "@/components/ui/stats-strip";
import { stats } from "@/data/stats";

/**
 * Homepage headline metrics.
 */
export function Statistics() {
  return <StatsStrip stats={stats} className="bg-secondary/40" />;
}
