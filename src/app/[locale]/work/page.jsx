import { Suspense } from "react";
import WorkExplorer from "@/features/work/WorkExplorer";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { M } from "@/data/media";
import { t } from "@/data/dictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, title: t(locale, "work.page.title"), description: t(locale, "meta.work"), path: "/work" });
}

// Featured work first, then the rest of the portfolio in source order.
const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkExplorer projects={ordered} />
    </Suspense>
  );
}
