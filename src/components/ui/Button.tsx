import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "bronze" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center gap-2 border text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-ink bg-ink text-ivory hover:border-bronze hover:bg-bronze hover:text-ink",
  secondary:
    "border-ink bg-transparent text-ink hover:bg-ink hover:text-ivory",
  bronze:
    "border-bronze bg-bronze text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  ghost:
    "border-transparent bg-transparent text-ink hover:border-line hover:bg-ivory",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5",
  md: "px-6 py-3.5",
  lg: "px-8 py-4",
};

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonStyles({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type ButtonProps = ComponentProps<"button"> & StyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props} />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> &
  StyleProps & {
    children: ReactNode;
  };

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}

type ButtonAnchorProps = ComponentProps<"a"> & StyleProps;

export function ButtonAnchor({ variant, size, className, ...props }: ButtonAnchorProps) {
  return <a className={buttonStyles({ variant, size, className })} {...props} />;
}
