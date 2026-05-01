"use client";

import { useEffect, useState } from "react";
import * as api from "./services";
import type { Article, AdminView } from "@/lib/articles/types";
import LoginForm from "./LoginForm";
import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";

export default function AdminPage() {
  const [view, setView] = useState<AdminView>("loading");
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function loadArticles(page = 1) {
    setLoading(true);
    try {
      const data = await api.fetchArticles(page);
      setArticles(data.articles);
      setCurrentPage(data.page);
      setTotalPages(Math.max(1, Math.ceil(data.total / data.limit)));
      setView("list");
    } catch (e) {
      if (e instanceof Error && e.message === "UNAUTHORIZED") {
        setView("login");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    try {
      await api.deleteArticle(id);
      await loadArticles(currentPage);
    } catch {
      alert("삭제 실패");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await api.logout();
    setView("login");
  }

  async function handleToggleStatus(article: Article) {
    setTogglingId(article.id);
    const nextStatus =
      article.status === "published" ? "draft" : "published";
    try {
      await api.updateArticle(article.id, {
        title: article.title,
        body: article.body,
        category: article.category,
        cover_url: article.cover_url,
        status: nextStatus,
      });
      // 목록의 해당 row만 즉시 갱신
      setArticles((prev) =>
        prev.map((a) =>
          a.id === article.id ? { ...a, status: nextStatus } : a
        )
      );
    } catch {
      alert("상태 변경 실패");
    } finally {
      setTogglingId(null);
    }
  }

  useEffect(() => {
    queueMicrotask(() => loadArticles(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (view === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-muted">
        로딩 중...
      </div>
    );
  }

  if (view === "login") {
    return (
      <LoginForm
        onSuccess={() => {
          loadArticles(1);
        }}
      />
    );
  }

  if (view === "create" || view === "edit") {
    return (
      <ArticleForm
        initialArticle={editingArticle}
        onSaved={() => {
          setEditingArticle(null);
          loadArticles(currentPage);
        }}
        onCancel={() => {
          setEditingArticle(null);
          setView("list");
        }}
      />
    );
  }

  return (
    <ArticleList
      articles={articles}
      loading={loading}
      togglingId={togglingId}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={loadArticles}
      onEdit={(article) => {
        setEditingArticle(article);
        setView("edit");
      }}
      onDelete={handleDelete}
      onToggleStatus={handleToggleStatus}
      onCreate={() => {
        setEditingArticle(null);
        setView("create");
      }}
      onLogout={handleLogout}
    />
  );
}
