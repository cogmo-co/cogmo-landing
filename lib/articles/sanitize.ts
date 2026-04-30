// admin 전용 작성이라 DOMPurify의 공격적인 attribute 스트리핑이 오히려 방해.
// (Tiptap 커스텀 attrs `containerstyle`/`wrapperstyle` 등을 화이트리스트해도 strip됨)
// → 직접 위험 vector만 제거하는 minimal sanitize

const SCRIPT_TAG = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const STYLE_TAG = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;
const ON_HANDLER = /\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const JS_URL = /(\s(?:href|src|action|formaction)\s*=\s*["'])\s*javascript:[^"']*/gi;

export function sanitizeArticleHtml(rawHtml: string): string {
  let result = rawHtml;
  result = result.replace(SCRIPT_TAG, "");
  result = result.replace(STYLE_TAG, "");
  result = result.replace(ON_HANDLER, "");
  result = result.replace(JS_URL, "$1#");
  return result;
}
