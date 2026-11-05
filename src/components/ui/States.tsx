import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-stone">
        <span className="h-4 w-4 animate-spin border border-line border-t-bronze" aria-hidden />
        {label}
      </div>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="border border-line bg-ivory px-6 py-12 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
        Something went wrong
      </p>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone">{message}</p>
      {onRetry ? (
        <Button variant="secondary" size="sm" className="mt-6" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" aria-hidden />
          Try again
        </Button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-line bg-ivory px-6 py-16 text-center">
      <p className="font-display text-2xl text-ink">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone">{description}</p>
    </div>
  );
}
