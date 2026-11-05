import { useContext } from "react";

import { ContentContext } from "@/components/providers/ContentProvider";

export function useSiteContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used within a ContentProvider");
  }

  return context;
}
