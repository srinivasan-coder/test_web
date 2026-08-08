import type { Metadata } from "next";
import nextDynamic from "next/dynamic";

import { PageHeader } from "@/components/ui/page-header";
import { ExplorerSkeleton } from "@/components/ui/skeleton";
import { getAllBlogPosts } from "@/lib/content-store";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

// Reads data/db/blog.json at request time — must stay dynamic so newly
// added posts appear without a rebuild.
export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description: `Essays, tips, and behind-the-scenes notes from ${SITE_CONFIG.name} — light, process, gear, and inspiration.`,
  path: "/journal",
});

const BlogExplorer = nextDynamic(
  () =>
    import("@/components/blog/blog-explorer").then((mod) => mod.BlogExplorer),
  { loading: () => <ExplorerSkeleton variant="cards" /> },
);

export default async function JournalPage() {
  const blogPosts = await getAllBlogPosts();

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
