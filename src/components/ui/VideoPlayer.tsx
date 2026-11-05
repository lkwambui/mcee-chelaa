import { cn } from "@/utils/cn";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  caption?: string;
};

export function VideoPlayer({ src, poster, title, className, caption }: VideoPlayerProps) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="relative aspect-video w-full overflow-hidden bg-ink">
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={poster}
          title={title}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-stone">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
