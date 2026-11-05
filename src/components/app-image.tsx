import { type ImgHTMLAttributes, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type AppImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fallbackSrc?: string;
};

export function Image({
  src,
  alt,
  fill,
  priority,
  quality: _quality,
  sizes: _sizes,
  fallbackSrc,
  className,
  onError,
  ...props
}: AppImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      loading={priority ? "eager" : props.loading ?? "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      onError={(event) => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
