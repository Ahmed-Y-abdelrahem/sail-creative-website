import { notFound } from "next/navigation";
import CaseHero from "@/features/case/CaseHero";
import CaseBody from "@/features/case/CaseBody";
import NextProject from "@/features/case/NextProject";
import { projects, projectBySlug, relatedProjects, nextProject } from "@/data/projects";
import { buildMetadata, projectJsonLd } from "@/lib/seo";
import { locales, tx } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = projectBySlug[slug];
  if (!project) return {};
  return buildMetadata({
    locale,
    title: `${tx(project.name, locale)} — ${tx(project.work, locale)}`,
    description: tx(project.overview, locale).slice(0, 190),
    path: `/work/${slug}`,
    image: project.cover.src,
  });
}

export default async function CasePage({ params }) {
  const { locale, slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();

  return (
    <>
      <CaseHero project={project} />
      <CaseBody project={project} related={relatedProjects(project, 3)} />
      <NextProject project={nextProject(project)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project, locale, project.cover)) }}
      />
    </>
  );
}
