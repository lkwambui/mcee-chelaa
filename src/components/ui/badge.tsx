import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "small-label inline-flex items-center rounded-full border border-accent/30 bg-accent/8 px-4 py-1.5 text-accent",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
