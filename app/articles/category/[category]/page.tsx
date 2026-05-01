import { notFound, redirect } from "next/navigation";
import { fetchPublishedArticles } from "../../_lib/queries";
import {
  ARTICLE_CATEGORIES,
  CATEGORY_LABEL,
  type ArticleCategory,
} from "@/lib/articles/categories";
import ArticleCard from "@/components/articles/ArticleCard";
import ArticlePageHeader from "@/components/articles/ArticlePageHeader";
import CategoryTabs from "@/components/articles/CategoryTabs";
import Pagination from "@/components/articles/Pagination";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  if (!ARTICLE_CATEGORIES.includes(category as ArticleCategory)) {
    return { title: "아티클 | Cogmo" };
  }
  const label = CATEGORY_LABEL[category as ArticleCategory];
  return {
    title: `${label} | Cogmo 아티클`,
    description: `${label} 분류의 글을 모아봅니다.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  if (!ARTICLE_CATEGORIES.includes(category as ArticleCategory)) {
    notFound();
  }
  const cat = category as ArticleCategory;

  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);

  const { articles, totalPages } = await fetchPublishedArticles({
    page,
    category: cat,
  });

  // page=1 은 totalPages=0(빈 결과) 이어도 그대로 표시 (자기 자신 redirect 방지)
  if (page > 1 && page > totalPages) {
    redirect(
      totalPages > 1
        ? `/articles/category/${cat}?page=${totalPages}`
        : `/articles/category/${cat}`,
    );
  }

  return (
    <>
      <ArticlePageHeader />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 flex justify-center">
          <CategoryTabs />
        </div>

      {articles.length === 0 ? (
        <div className="py-16 text-center text-muted">
          이 분류에 발행된 아티클이 없습니다.
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
            basePath={`/articles/category/${cat}`}
          />
        </div>
      )}
      </div>
    </>
  );
}
