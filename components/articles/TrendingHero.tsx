"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Article } from "@/lib/articles/types";
import TrendingCard from "./TrendingCard";

interface TrendingHeroProps {
  articles: Article[];
}

export default function TrendingHero({ articles }: TrendingHeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (articles.length === 0) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="이전"
          className="absolute -left-10 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-muted transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 md:-left-14 md:flex"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="다음"
          className="absolute -right-10 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-muted transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-30 md:-right-14 md:flex"
        >
          <ChevronRight size={32} strokeWidth={2.5} />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {articles.map((article) => (
              <div key={article.id} className="min-w-0 shrink-0 basis-full">
                <TrendingCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot indicators — 모바일 전용 */}
      <div className="mt-6 flex justify-center gap-2 md:hidden">
        {articles.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`${i + 1}번 슬라이드`}
            className={`h-2 w-2 rounded-full transition ${
              i === selectedIndex ? "bg-ink" : "bg-hairline"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
