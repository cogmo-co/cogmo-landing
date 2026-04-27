"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoAdvanceMs?: number;
  className?: string;
}

export default function ImageCarousel({
  images,
  autoAdvanceMs = 5000,
  className = "",
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, autoAdvanceMs);
    return () => clearInterval(t);
  }, [current, images.length, autoAdvanceMs]);

  const prev = () =>
    setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Slide track — translateX로 슬라이드 전환 */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div key={img.src} className="relative h-full w-full flex-none">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={idx === 0}
              quality={90}
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>

      {/* 이전 화살표 */}
      <button
        type="button"
        onClick={prev}
        aria-label="이전 이미지"
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-md backdrop-blur-sm transition hover:bg-white"
      >
        <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M7.5 3 4.5 6 7.5 9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 다음 화살표 */}
      <button
        type="button"
        onClick={next}
        aria-label="다음 이미지"
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-md backdrop-blur-sm transition hover:bg-white"
      >
        <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M4.5 3 7.5 6 4.5 9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 하단 콩단추 (페이지네이션) */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`슬라이드 ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
