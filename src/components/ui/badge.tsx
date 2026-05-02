import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent/45 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
