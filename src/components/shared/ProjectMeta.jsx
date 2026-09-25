"use client";
import { useLocale } from "./LocaleProvider";

/** Small technical metadata: client / work / category. */
export default function ProjectMeta({ project, className = "", keys = ["client", "work", "category"], stacked = false }) {
  const { t, x } = useLocale();
  const rows = {
    client: [t("common.client"), x(project.client)],
    work: [t("common.work"), x(project.work)],
    category: [t("common.category"), project.categories.map((c) => t(`filter.${c}`)).join(" / ")],
  };
  return (
    <dl className={`grid gap-x-8 gap-y-4 ${stacked ? "" : "sm:grid-cols-3"} ${className}`}>
      {keys.map((k) => (
        <div key={k}>
          <dt className="meta opacity-55">{rows[k][0]}</dt>
          <dd className="mt-1 text-[0.9375rem] leading-snug">{rows[k][1]}</dd>
        </div>
      ))}
    </dl>
  );
}
