const BLOB_HOST_PATTERN = /^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/i;

function isBlobUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return BLOB_HOST_PATTERN.test(hostname);
  } catch {
    return false;
  }
}

function extractBlobUrls(html: string): string[] {
  const urls: string[] = [];
  const imgPattern = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgPattern.exec(html)) !== null) {
    const url = match[1];
    if (isBlobUrl(url)) urls.push(url);
  }
  return urls;
}

export function diffBlobUrls(
  oldHtml: string,
  newHtml: string,
  oldCover: string | null,
  newCover: string | null
): string[] {
  const oldUrls = new Set(extractBlobUrls(oldHtml));
  const newUrls = new Set(extractBlobUrls(newHtml));

  const removed: string[] = [];
  for (const url of oldUrls) {
    if (!newUrls.has(url)) removed.push(url);
  }

  if (oldCover && oldCover !== newCover && isBlobUrl(oldCover)) {
    removed.push(oldCover);
  }

  return removed;
}
