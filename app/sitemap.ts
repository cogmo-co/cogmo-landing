import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://cogmo.life";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: articles } = await supabase
    .from("articles")
    .select("id, updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const articleEntries: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${BASE_URL}/articles/${a.id}`,
    lastModified: new Date(a.updated_at),
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/story`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/articles`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/articles/category/cogmo_news`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/articles/category/health_info`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/service-hi`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/service-fea`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/rehab-visit`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/rehab-postop`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/healthcare-corporate`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/healthcare-senior`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/healthcare-youth`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE_URL}/download`, lastModified: new Date(), priority: 0.5 },
    ...articleEntries,
  ];
}