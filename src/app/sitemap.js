import { SITE_URL } from "@/lib/seo";
import { locales, localePath } from "@/lib/i18n";
import { projects } from "@/data/projects";

const staticPaths = ["/", "/about", "/services", "/work", "/events", "/contact"];

export default function sitemap() {
  const entries = [...staticPaths, ...projects.map((p) => `/work/${p.slug}`)];
  return entries.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.startsWith("/work/") ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
      },
    }))
  );
}
