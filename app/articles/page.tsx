import { redirect } from "next/navigation";
import {
  fetchPublishedArticles,
  fetchTrendingArticles,
} from "./_lib/queries";
import ArticleCard from "@/components/articles/ArticleCard";
import ArticlePageHeader from "@/components/articles/ArticlePageHeader";
import TrendingHero from "@/components/articles/TrendingHero";
import CategoryTabs from "@/components/articles/CategoryTabs";
import Pagination from "@/components/articles/Pagination";

export const metadata = {
  title: "아티클 | Cogmo",
  description: "코그모 소식과 건강정보를 모아 봅니다.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const [trending, listResult] = await Promise.all([
    fetchTrendingArticles(),
    fetchPublishedArticles({ page }),
  ]);

  const { articles, totalPages } = listResult;

  // page=1 은 totalPages=0(빈 결과) 이어도 그대로 표시 (자기 자신 redirect 방지)
  if (page > 1 && page > totalPages) {
    redirect(totalPages > 1 ? `/articles?page=${totalPages}` : "/articles");
  }

  return (
    <>
      <ArticlePageHeader />

      {page === 1 && trending.length > 0 && (
        <section className="bg-surface py-12">
          <div className="mx-auto max-w-6xl px-6">
            <TrendingHero articles={trending} />
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex justify-center">
        <CategoryTabs />
      </div>

      {articles.length === 0 ? (
        <div className="py-16 text-center text-muted">
          아직 발행된 아티클이 없습니다.
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </section>
      )}

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/articles"
          />
        </div>
      )}
      </div>
    </>
  );
}
