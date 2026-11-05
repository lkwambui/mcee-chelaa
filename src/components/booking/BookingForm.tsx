import { useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/siteConfig";
import type { SiteContent } from "@/services/content/types";
import { cn } from "@/utils/cn";

type BookingFormProps = {
  contact: SiteContent["contact"];
};

type Status = "idle" | "sending" | "sent" | "error" | "draft";

const fieldClass =
  "block w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-stone/60 transition-colors focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze";

export function BookingForm({ contact }: BookingFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const usesEndpoint = Boolean(siteConfig.bookingEndpoint);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("website") ?? "").trim()) {
      return;
    }

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      eventType: String(data.get("eventType") ?? "").trim(),
      eventDate: String(data.get("eventDate") ?? "").trim(),
      location: String(data.get("location") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    if (!siteConfig.bookingEndpoint) {
      const subject = `Booking enquiry: ${payload.eventType || "Event"} — ${payload.name}`;
      const body = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.phone ? `Phone: ${payload.phone}` : "",
        `Event type: ${payload.eventType}`,
        payload.eventDate ? `Event date: ${payload.eventDate}` : "",
        payload.location ? `Location: ${payload.location}` : "",
        "",
        payload.message,
      ]
        .filter(Boolean)
        .join("\n");

      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus("draft");
      setErrorMessage("");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(siteConfig.bookingEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        `The enquiry could not be sent automatically. Please email ${siteConfig.email} directly.`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
            Full name <span className="text-bronze">*</span>
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="booking-email" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
            Email <span className="text-bronze">*</span>
          </label>
          <input
            id="booking-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="booking-phone" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
            Phone
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+254 ..."
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="booking-event-type" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
            Event type <span className="text-bronze">*</span>
          </label>
          <select
            id="booking-event-type"
            name="eventType"
            required
            defaultValue=""
            className={cn(fieldClass, "appearance-none")}
          >
            <option value="" disabled>
              Select an event type
            </option>
            {contact.eventTypes.map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="booking-date" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
            Event date
          </label>
          <input
            id="booking-date"
            name="eventDate"
            type="date"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="booking-location" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
            Location
          </label>
          <input
            id="booking-location"
            name="location"
            type="text"
            placeholder="Venue, town or city"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-message" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
          Tell us about the event <span className="text-bronze">*</span>
        </label>
        <textarea
          id="booking-message"
          name="message"
          required
          rows={5}
          placeholder="The audience, programme, tone and anything else that would help shape a response."
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="booking-website">Website</label>
        <input id="booking-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-stone">
          {usesEndpoint
            ? "Your enquiry will be sent directly to MC Chelaa's booking inbox."
            : contact.bookingNote}
        </p>
        <Button type="submit" disabled={status === "sending"} size="md" className="shrink-0">
          {status === "sending" ? "Sending" : "Prepare enquiry"}
          <Send className="h-4 w-4" aria-hidden />
        </Button>
      </div>

      <div aria-live="polite" role="status">
        {status === "sent" ? (
          <p className="border border-bronze bg-ivory px-4 py-3 text-sm leading-relaxed text-ink">
            Thank you. Your enquiry has been sent, and you should receive a response shortly.
          </p>
        ) : null}
        {status === "draft" ? (
          <p className="border border-line bg-ivory px-4 py-3 text-sm leading-relaxed text-stone">
            Your email app should now open with the enquiry drafted. Nothing is sent until you
            press send in that app. If it did not open, email{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-bronze underline underline-offset-4">
              {siteConfig.email}
            </a>
            .
          </p>
        ) : null}
        {status === "error" ? (
          <p className="border border-ink px-4 py-3 text-sm leading-relaxed text-ink">
            {errorMessage}{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-bronze underline underline-offset-4">
              {siteConfig.email}
            </a>
          </p>
        ) : null}
      </div>
    </form>
  );
}
