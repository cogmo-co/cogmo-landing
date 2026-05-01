import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import { fetchArticleById } from "../_lib/queries";
import { CATEGORY_LABEL } from "@/lib/articles/categories";
import { formatLongDate } from "@/lib/articles/format";
import ArticleBody from "@/components/articles/ArticleBody";
import ViewTracker from "@/components/articles/ViewTracker";

interface PageProps {
  params: Promise<{ id: string }>;
}

function extractDescription(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength).trim() + "…" : text;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = await fetchArticleById(id);
  if (!article) return { title: "아티클 | Cogmo" };

  const description = extractDescription(article.body);
  return {
    title: `${article.title} | Cogmo 아티클`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      images: article.cover_url ? [article.cover_url] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = await fetchArticleById(id);
  if (!article) notFound();

  const dateStr = article.published_at
    ? formatLongDate(article.published_at)
    : "";

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <ViewTracker articleId={article.id} />

      <header className="mb-10 text-center">
        <nav
          aria-label="breadcrumb"
          className="flex items-center justify-center gap-2 text-base text-muted"
        >
          <Link
            href="/"
            aria-label="홈"
            className="transition hover:text-ink"
          >
            <Home size={20} />
          </Link>
          <ChevronRight size={18} className="text-muted/60" />
          <Link href="/articles" className="transition hover:text-ink">
            아티클
          </Link>
          <ChevronRight size={18} className="text-muted/60" />
          <Link
            href={`/articles/category/${article.category}`}
            className="transition hover:text-ink"
          >
            {CATEGORY_LABEL[article.category]}
          </Link>
        </nav>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
          {article.title}
        </h1>
        {dateStr && (
          <time
            dateTime={article.published_at ?? undefined}
            className="mt-3 block text-sm text-muted"
          >
            {dateStr}
          </time>
        )}
      </header>

      {article.cover_url && (
        <div className="mb-10 overflow-hidden rounded-2xl border border-hairline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover_url}
            alt={article.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      )}

      <ArticleBody html={article.body} />

      <div className="mt-20 flex justify-center border-t border-hairline pt-12">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-[0_8px_20px_rgba(50,81,49,0.2)] transition hover:bg-primary-dark hover:shadow-[0_10px_24px_rgba(50,81,49,0.3)]"
        >
          <ArrowLeft size={18} />
          목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
