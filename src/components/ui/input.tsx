import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-2xl border border-border bg-card px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/25",
        className
      )}
      {...props}
    />
  );
}

export { Input };
