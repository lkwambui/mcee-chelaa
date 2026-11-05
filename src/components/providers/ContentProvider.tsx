import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { fallbackContent } from "@/data/fallbackContent";
import {
  loadSiteContent,
  type ContentSource,
} from "@/services/content/contentService";
import type { SiteContent } from "@/services/content/types";

export type ContentStatus = "loading" | "ready" | "error";

export type ContentContextValue = {
  content: SiteContent;
  source: ContentSource;
  status: ContentStatus;
  error: string | null;
  reload: () => void;
};

export const ContentContext = createContext<ContentContextValue | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(fallbackContent);
  const [source, setSource] = useState<ContentSource>("local");
  const [status, setStatus] = useState<ContentStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);

    const result = await loadSiteContent();

    setContent(result.content);
    setSource(result.source);
    setError(result.error);
    setStatus(result.error ? "error" : "ready");
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  const value = useMemo(
    () => ({ content, source, status, error, reload }),
    [content, source, status, error, reload]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
