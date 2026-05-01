import { sanitizeArticleHtml } from "@/lib/articles/sanitize";

interface ArticleBodyProps {
  html: string;
}

export default function ArticleBody({ html }: ArticleBodyProps) {
  // defense in depth: 저장 시 이미 sanitize되지만 렌더 직전 한 번 더
  const safe = sanitizeArticleHtml(html);

  return (
    <div
      className="prose prose-base md:prose-lg max-w-none prose-p:leading-[1.8] prose-li:leading-[1.8] prose-headings:leading-[1.3] prose-headings:font-bold prose-img:rounded-lg prose-img:max-w-full prose-img:h-auto prose-a:text-primary prose-a:underline-offset-2 prose-code:bg-hairline prose-code:text-ink prose-code:font-normal prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
