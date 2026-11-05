import { useEffect } from "react";

import { siteConfig } from "@/config/siteConfig";

type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  jsonLd?: StructuredData;
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertStructuredData(data: StructuredData | undefined) {
  const existing = document.getElementById("page-structured-data");

  if (!data) {
    existing?.remove();
    return;
  }

  const script =
    existing instanceof HTMLScriptElement
      ? existing
      : document.createElement("script");

  script.id = "page-structured-data";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);

  if (!existing) {
    document.head.appendChild(script);
  }
}

export function usePageMeta({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  jsonLd,
}: PageMeta) {
  const structuredDataKey = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    const fullTitle = title.includes(siteConfig.name)
      ? title
      : `${title} — ${siteConfig.name}`;
    const canonicalUrl = `${siteConfig.url}${path === "/" ? "" : path}`;
    const imageUrl = image
      ? image.startsWith("http")
        ? image
        : `${siteConfig.url}${image}`
      : `${siteConfig.url}/images/events/event1.jpeg`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:site_name", siteConfig.name);
    upsertMeta("property", "og:locale", "en_KE");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertLink("canonical", canonicalUrl);
    upsertStructuredData(
      structuredDataKey === "null"
        ? undefined
        : (JSON.parse(structuredDataKey) as StructuredData)
    );
  }, [title, description, path, image, type, noindex, structuredDataKey]);
}
