import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[15px] font-semibold tracking-[0.05em] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground shadow-(--shadow-button) hover:-translate-y-0.5 hover:shadow-(--shadow-button) hover:shadow-accent/30 hover:bg-accent-hover",
        outline:
          "border border-accent bg-card text-accent hover:bg-accent hover:text-accent-foreground hover:border-accent-hover",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        default: "h-11 px-7 py-3.5",
        sm: "h-9 px-5 py-2",
        lg: "h-13 px-9 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? ("span" as const) : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
