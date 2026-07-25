import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { CallToAction } from "@/components/sections/cta";
import {
  StudioStorySection,
  MissionVision,
  Timeline,
  TeamGrid,
  Equipment,
  Awards,
} from "@/components/about";
import {
  studioStory,
  mission,
  vision,
  timeline,
  equipment,
  awards,
} from "@/data/about";
import { team } from "@/data/team";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Meet ${SITE_CONFIG.name} — our story, team, equipment, and the milestones that shaped a quieter kind of photography.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The studio behind the frames"
        description="A small team in San Francisco, devoted to light, patience, and photographs made to last."
      />

      <StudioStorySection story={studioStory} />
      <MissionVision mission={mission} vision={vision} />
      <Timeline events={timeline} />
      <TeamGrid members={team} />
      <Equipment items={equipment} />
      <Awards items={awards} />
      <CallToAction />
    </>
  );
}
