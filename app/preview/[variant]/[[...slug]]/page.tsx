import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getVariant, variants } from "@/components/variants/registry";
import { renderVariantPage } from "@/components/variants/render";
import type { VariantPagePath } from "@/components/variants/types";

type PageProps = {
  params: Promise<{ variant: string; slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const VALID_PATHS: VariantPagePath[] = [
  "/",
  "/get-help-now",
  "/school-day",
  "/wellbeing-support",
];

function slugToPath(slug: string[] | undefined): VariantPagePath | null {
  if (!slug || slug.length === 0) return "/";
  const candidate = `/${slug.join("/")}` as VariantPagePath;
  return VALID_PATHS.includes(candidate) ? candidate : null;
}

export async function generateStaticParams() {
  const params: Array<{ variant: string; slug: string[] }> = [];
  for (const variant of variants) {
    for (const path of Object.keys(variant.pages) as VariantPagePath[]) {
      params.push({
        variant: variant.key,
        slug: path === "/" ? [] : path.replace(/^\//, "").split("/"),
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { variant: key, slug } = await params;
  const manifest = getVariant(key);
  const path = slugToPath(slug);
  if (!manifest || !path) return { title: "Preview not found" };
  return {
    title: `${manifest.name} preview · ${path === "/" ? "Home" : path.replace(/^\//, "")}`,
    description: manifest.description,
    robots: { index: false, follow: false },
  };
}

export default async function VariantPreviewPage({ params, searchParams }: PageProps) {
  const { variant: key, slug } = await params;
  const sp = await searchParams;
  const path = slugToPath(slug);
  if (!path) notFound();
  return renderVariantPage(key, path, sp);
}
