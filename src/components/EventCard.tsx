"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Images, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FeaturedEvent } from "@/lib/featured-events";

type EventCardProps = {
  event: FeaturedEvent;
  index: number;
  className?: string;
  onViewGallery: () => void;
  onPreviewSelect: (index: number) => void;
};

export function EventCard({ event, index, className, onViewGallery, onPreviewSelect }: EventCardProps) {
  const previewImages = [event.coverImage, ...event.galleryImages].slice(0, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`event-portfolio-card group relative overflow-hidden rounded-3xl border border-border/70 bg-card/88 shadow-lg shadow-black/5 backdrop-blur-sm ${className ?? ""}`}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={event.coverImage.src}
          alt={event.coverImage.alt}
          fill
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/28 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2">
          <Badge className="border-white/35 bg-black/30 text-white">Featured Event</Badge>
        </div>
      </div>

      <div className="relative space-y-4 p-5 md:p-6">
        <div>
          <h3 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">{event.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">{event.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/35 px-3 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {event.location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/35 px-3 py-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            {event.year}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {previewImages.map((image, previewIndex) => (
              <button
                key={`${event.slug}-${previewIndex}`}
                type="button"
                onClick={() => onPreviewSelect(previewIndex)}
                aria-label={`Preview ${event.title} image ${previewIndex + 1}`}
                className="relative h-12 w-12 overflow-hidden rounded-xl border border-border/80"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="48px"
                  className="object-cover transition duration-300 hover:scale-110"
                />
              </button>
            ))}
          </div>

          <Button type="button" size="sm" className="gap-2" onClick={onViewGallery}>
            <Images className="h-4 w-4" />
            View Gallery
          </Button>
        </div>
      </div>

      <div className="event-card-glow pointer-events-none absolute -inset-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}
