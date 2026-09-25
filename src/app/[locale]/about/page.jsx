import AboutStory from "@/features/about/AboutStory";
import { buildMetadata } from "@/lib/seo";
import { t } from "@/data/dictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, title: t(locale, "nav.about"), description: t(locale, "meta.about"), path: "/about" });
}

export default function AboutPage() {
  return <AboutStory />;
}
