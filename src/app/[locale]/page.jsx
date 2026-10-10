import { Suspense } from "react";
import Hero from "@/features/home/Hero";
import Intro from "@/features/home/Intro";
import SelectedWork from "@/features/home/SelectedWork";
import ServiceIndex from "@/features/home/ServiceIndex";
import MarketingWall from "@/features/home/MarketingWall";
import BrandShift from "@/features/home/BrandShift";
import MediaReel from "@/features/home/MediaReel";
import PartnersField from "@/features/home/PartnersField";
import EventJourney from "@/features/events/EventJourney";
import { featuredProjects } from "@/data/projects";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { t } from "@/data/dictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({ locale, description: t(locale, "meta.home"), path: "/" });
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <SelectedWork projects={featuredProjects} />
      <ServiceIndex services={services} />
      <MarketingWall />
      <BrandShift />
      <MediaReel />
      <EventJourney />
      <PartnersField />
    </>
  );
}