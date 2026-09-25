import { headers } from "next/headers";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { t } from "@/data/dictionary";

export default async function NotFound() {
  const h = await headers();
  const locale = (h.get("x-pathname") || "").startsWith("/ar") ? "ar" : "en";
  return (
    <Container className="tex-night flex min-h-screen flex-col items-start justify-center gap-8 py-40">
      <h1 className="display fs-huge">{t(locale, "notfound.title")}</h1>
      <p className="max-w-md text-lg text-white/70">{t(locale, "notfound.body")}</p>
      <Button href={locale === "ar" ? "/ar" : "/"}>{t(locale, "notfound.button")}</Button>
    </Container>
  );
}
