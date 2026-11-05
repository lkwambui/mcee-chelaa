const DEFAULT_API_URL = "";

const apiUrl = (import.meta.env.VITE_WP_API_URL || DEFAULT_API_URL).replace(/\/$/, "");

export const wordpressEndpoints = {
  pages: "/pages",
  posts: "/posts",
  media: "/media",
  categories: "/categories",
  portfolio: import.meta.env.VITE_WP_PORTFOLIO_ENDPOINT || "/portfolio",
} as const;

export type WordPressRendered = {
  rendered: string;
};

export type WordPressFeaturedMedia = number | { id: number; source_url?: string };

export type WordPressEntity = {
  id: number;
  slug: string;
  date?: string;
  title?: WordPressRendered;
  content?: WordPressRendered;
  excerpt?: WordPressRendered;
  featured_media?: WordPressFeaturedMedia;
  categories?: number[];
  _embedded?: Record<string, unknown>;
  [key: string]: unknown;
};

export type WordPressMedia = {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
  };
};

export type QueryParams = Record<string, string | number | boolean | undefined>;

export function isWordPressConfigured() {
  return Boolean(apiUrl);
}

export function getWordPressApiUrl() {
  return apiUrl;
}

async function request<T>(path: string, params: QueryParams = {}): Promise<T> {
  if (!apiUrl) {
    throw new Error("WordPress API URL is not configured.");
  }

  const url = new URL(`${apiUrl}${path}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed (${response.status} ${response.statusText}).`);
  }

  return (await response.json()) as T;
}

export function fetchPages(params: QueryParams = {}) {
  return request<WordPressEntity[]>(wordpressEndpoints.pages, params);
}

export function fetchPageBySlug(slug: string, params: QueryParams = {}) {
  return request<WordPressEntity[]>(wordpressEndpoints.pages, { slug, ...params });
}

export function fetchPosts(params: QueryParams = {}) {
  return request<WordPressEntity[]>(wordpressEndpoints.posts, params);
}

export function fetchPostBySlug(slug: string, params: QueryParams = {}) {
  return request<WordPressEntity[]>(wordpressEndpoints.posts, { slug, ...params });
}

export function fetchMedia(params: QueryParams = {}) {
  return request<WordPressMedia[]>(wordpressEndpoints.media, params);
}

export function fetchMediaById(mediaId: number) {
  return request<WordPressMedia>(`${wordpressEndpoints.media}/${mediaId}`);
}

export async function fetchFeaturedImage(featuredMedia: WordPressFeaturedMedia | undefined) {
  if (!featuredMedia) {
    return null;
  }

  if (typeof featuredMedia === "object") {
    return featuredMedia as WordPressMedia;
  }

  return fetchMediaById(featuredMedia);
}

export function fetchPortfolioEntries(params: QueryParams = {}) {
  return request<WordPressEntity[]>(wordpressEndpoints.portfolio, params);
}

export function fetchPortfolioBySlug(slug: string, params: QueryParams = {}) {
  return request<WordPressEntity[]>(wordpressEndpoints.portfolio, { slug, ...params });
}

export function fetchCategories(params: QueryParams = {}) {
  return request<Array<{ id: number; name: string; slug: string; count: number }>>(
    wordpressEndpoints.categories,
    params
  );
}

export function fetchContentBySlug(
  type: keyof Pick<typeof wordpressEndpoints, "pages" | "posts" | "portfolio">,
  slug: string,
  params: QueryParams = {}
) {
  return request<WordPressEntity[]>(wordpressEndpoints[type], { slug, ...params });
}
