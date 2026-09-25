import { EventsHero, EventSpecialties } from "@/features/events/EventsIntro";
import EventJourney from "@/features/events/EventJourney";
import ProjectShowcase from "@/features/work/ProjectShowcase";
import PartnersField from "@/features/home/PartnersField";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { t } from "@/data/dictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, title: t(locale, "nav.events"), description: t(locale, "meta.events"), path: "/events" });
}

const eventProjects = projects.filter((p) => p.categories.includes("events"));

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <EventJourney index="01" showLink={false} showHeading={false} />
      <EventSpecialties />
      {eventProjects.map((p, i) => (
        <ProjectShowcase key={p.slug} project={p} index={i} total={eventProjects.length} />
      ))}
      <PartnersField index="03" compact />
    </>
  );
}
