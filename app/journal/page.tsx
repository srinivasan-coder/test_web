import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { PageHeader } from "@/components/ui/page-header";
import { ExplorerSkeleton } from "@/components/ui/skeleton";
import { blogPosts } from "@/data/blog";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description: `Essays, tips, and behind-the-scenes notes from ${SITE_CONFIG.name} — light, process, gear, and inspiration.`,
  path: "/journal",
});

const BlogExplorer = dynamic(
  () =>
    import("@/components/blog/blog-explorer").then((mod) => mod.BlogExplorer),
  { loading: () => <ExplorerSkeleton variant="cards" /> },
);

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes on light and craft"
        description="Practical tips, studio stories, and quiet observations from the team behind the camera."
      />
      <BlogExplorer posts={blogPosts} />
    </>
  );
}
