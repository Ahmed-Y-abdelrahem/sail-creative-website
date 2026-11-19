import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/careers",
    title: locale === "ar"
      ? "الوظائف والتدريب | سيل للحلول الإبداعية"
      : "Careers & Internships | SAIL Creative Solutions",
  });
}

export default function CareersLayout({ children }) {
  return children;
}
