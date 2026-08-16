import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";
import { CallToAction } from "@/components/sections/cta";
import { StudioStorySection, MissionVision, TeamGrid } from "@/components/about";
import { studioStory, mission, vision } from "@/data/about";
import { getAllTeam } from "@/lib/content-store";
import { resolveStudioStory } from "@/lib/site-images";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

// Reads data/db/team.json at request time — must stay dynamic so newly
// added team members appear without a rebuild.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Meet ${SITE_CONFIG.name} — our story, our team, and the mission behind every frame.`,
  path: "/about",
});

export default async function AboutPage() {
  const [team, resolvedStudioStory] = await Promise.all([
    getAllTeam(),
    resolveStudioStory(studioStory),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We don’t just capture weddings. We preserve the feeling."
        description="Your story happens only once — we’re here to make sure you can relive it forever."
      />

      <StudioStorySection story={resolvedStudioStory} />
      <MissionVision mission={mission} vision={vision} />
      <TeamGrid members={team} />
      <CallToAction />
    </>
  );
}
