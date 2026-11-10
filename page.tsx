import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Agencies } from "@/components/sections/Agencies";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Routes } from "@/components/sections/Routes";
import { Trust } from "@/components/sections/Trust";
import { Waitlist } from "@/components/sections/Waitlist";
import { Windows } from "@/components/sections/Windows";
import { JsonLd } from "@/components/site/JsonLd";
import { PROGRAMS, pickFeatured } from "@/data/registry";
import { todayInTashkent } from "@/lib/dates";
import { getDict } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { buildViews } from "@/lib/program-view";
import { pageMetadata } from "@/lib/seo";

/** Rebuilt at most every 5 minutes, so "days left" is never more than a few minutes stale. */
export const revalidate = 300;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({ locale, dict: await getDict(locale) });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDict(locale);
  const today = todayInTashkent();
  const views = buildViews(dict, today);
  const featuredId = pickFeatured(PROGRAMS, today).id;
  const featured = views.find((view) => view.id === featuredId) ?? views[0];

  return (
    <>
      <Hero dict={dict} locale={locale} today={today} featured={featured} />
      <Problem dict={dict} />
      <Windows dict={dict} locale={locale} today={today} views={views} featured={featured} />
      <HowItWorks dict={dict} />
      <Routes dict={dict} />
      <Trust dict={dict} />
      <Pricing dict={dict} />
      <Agencies dict={dict} />
      <Faq dict={dict} />
      <Waitlist dict={dict} locale={locale} />
      <JsonLd locale={locale} description={dict.meta.description} />
    </>
  );
}
