"use client";

import { useMemo, useState } from "react";

import { EventCard } from "@/components/EventCard";
import { LightboxModal } from "@/components/LightboxModal";
import type { FeaturedEvent } from "@/lib/featured-events";

type EventGalleryProps = {
  events: FeaturedEvent[];
  onOpenChange?: (isOpen: boolean) => void;
};

const cardLayout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
];

export function EventGallery({ events, onOpenChange }: EventGalleryProps) {
  const [activeEventSlug, setActiveEventSlug] = useState<string | null>(null);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const activeEvent = useMemo(
    () => events.find((event) => event.slug === activeEventSlug) ?? null,
    [activeEventSlug, events]
  );

  const openGallery = (eventSlug: string, imageIndex = 0) => {
    setActiveEventSlug(eventSlug);
    setInitialImageIndex(imageIndex);
    onOpenChange?.(true);
  };

  const closeGallery = () => {
    setActiveEventSlug(null);
    onOpenChange?.(false);
  };

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[minmax(280px,auto)]">
        {events.map((event, index) => (
          <EventCard
            key={event.slug}
            event={event}
            index={index}
            className={cardLayout[index % cardLayout.length]}
            onViewGallery={() => openGallery(event.slug, 0)}
            onPreviewSelect={(imageIndex) => openGallery(event.slug, imageIndex)}
          />
        ))}
      </div>

      <LightboxModal
        event={activeEvent}
        isOpen={Boolean(activeEvent)}
        initialIndex={initialImageIndex}
        onClose={closeGallery}
      />
    </>
  );
}
