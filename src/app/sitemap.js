
import { SITE_URL } from "@/lib/seo";
import { locales, localePath } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/work",
  "/case-studies",
  "/events",
  "/contact",
];

export default function sitemap() {
  // Main website pages
  const mainPaths = [...staticPaths];

  // Individual project pages
  const projectPaths = projects.map(
    (project) => `/work/${project.slug}`
  );

  // Individual service pages
  const servicePaths = services.map(
    (service) => `/services/${service.slug}`
  );

  // Combine all paths and remove duplicates
  const uniquePaths = [
    ...new Set([
      ...mainPaths,
      ...projectPaths,
      ...servicePaths,
    ]),
  ];

  return uniquePaths.flatMap((path) => {
    // Arabic, English and default language URLs
    const languages = Object.fromEntries([
      ...locales.map((locale) => [
        locale,
        `${SITE_URL}${localePath(locale, path)}`,
      ]),
      [
        "x-default",
        `${SITE_URL}${localePath("en", path)}`,
      ],
    ]);

    // Assign priority based on page type
    let priority = 0.8;

    if (path === "/") {
      priority = 1;
    } else if (path === "/services") {
      priority = 0.9;
    } else if (path.startsWith("/services/")) {
      priority = 0.8;
    } else if (path.startsWith("/work/")) {
      priority = 0.6;
    } else if (path === "/case-studies") {
      priority = 0.8;
    }

    return locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,

      changeFrequency:
        path === "/" ? "weekly" : "monthly",

      priority,

      alternates: {
        languages,
      },
    }));
  });
}
