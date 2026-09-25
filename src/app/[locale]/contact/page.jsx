import BriefBuilder from "@/features/contact/BriefBuilder";
import ContactHero from "@/features/contact/ContactHero";
import { buildMetadata } from "@/lib/seo";
import { t } from "@/data/dictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, title: t(locale, "nav.contact"), description: t(locale, "meta.contact"), path: "/contact" });
}

export default function ContactPage() {
  return (
    <ContactHero>
      <BriefBuilder />
    </ContactHero>
  );
}
