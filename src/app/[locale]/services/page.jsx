import ServiceChapters from "@/features/services/ServiceChapters";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { t } from "@/data/dictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, title: t(locale, "nav.services"), description: t(locale, "meta.services"), path: "/services" });
}

export default function ServicesPage() {
  return <ServiceChapters services={services} />;
}
