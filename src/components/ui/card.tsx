import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-[24px] border border-border/80 bg-card shadow-[var(--shadow-card)] transition-all duration-[350ms] hover:-translate-y-2 hover:shadow-[var(--shadow-card-hover)] dark:shadow-none dark:ring-1 dark:ring-border/60",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-7 md:p-8", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("card-title text-foreground", className)} {...props} />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("body-text text-muted-foreground mt-3", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-7 pb-7 md:px-8 md:pb-8", className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
