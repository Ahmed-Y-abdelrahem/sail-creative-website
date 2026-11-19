import { permanentRedirect } from "next/navigation";
import { localePath } from "@/lib/i18n";

export default async function CaseStudiesRedirect({ params, searchParams }) {
  const { locale } = await params;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(await searchParams)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item !== undefined) query.append(key, item);
    }
  }

  permanentRedirect(`${localePath(locale, "/work")}${query.size ? `?${query}` : ""}`);
}
