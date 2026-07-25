import { StatsStrip } from "@/components/ui/stats-strip";
import type { Stat } from "@/types";

interface ClientStatisticsProps {
  stats: Stat[];
}

/**
 * Reviews-page client happiness metrics.
 */
export function ClientStatistics({ stats }: ClientStatisticsProps) {
  return <StatsStrip stats={stats} />;
}
