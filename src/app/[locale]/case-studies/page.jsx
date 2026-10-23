
import CaseStudiesPage from "@/features/case-studies/CaseStudiesPage";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return buildMetadata({
    locale,
    title:
      locale === "ar"
        ? "دراسات الحالة | SAIL Creative Solutions"
        : "Case Studies | SAIL Creative Solutions",
    description:
      locale === "ar"
        ? "اكتشف مشاريع SAIL Creative Solutions في 9 قطاعات، والشركات التي عملنا معها والخدمات التي قدمناها."
        : "Explore SAIL Creative Solutions projects across nine industries, the brands we've worked with and the services we've delivered.",
    path: "/case-studies",
  });
}

export default function Page() {
  return <CaseStudiesPage />;
}
