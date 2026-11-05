import { type ImgHTMLAttributes, useEffect, useState } from "react";

import { cn } from "@/utils/cn";

type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
  fallbackSrc?: string;
};

export function SmartImage({
  src,
  alt,
  fill,
  priority,
  fallbackSrc,
  className,
  loading,
  onError,
  ...props
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      loading={priority ? "eager" : (loading ?? "lazy")}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
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
