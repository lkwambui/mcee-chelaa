"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Copy, Mail, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type BookingEntry = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  source: "form" | "fallback";
};

export default function AdminBookingsPage() {
  const [token, setToken] = useState("");
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [feedback, setFeedback] = useState("");

  const sorted = useMemo(
    () => [...bookings].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [bookings]
  );

  const loadBookings = async () => {
    setStatus("loading");
    setFeedback("Loading bookings...");

    try {
      const response = await fetch("/api/bookings", {
        headers: {
          "x-admin-token": token,
        },
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        bookings?: BookingEntry[];
      };

      if (!response.ok || !data.ok || !data.bookings) {
        setStatus("error");
        setFeedback(data.message || "Could not load bookings.");
        return;
      }

      setBookings(data.bookings);
      setStatus("success");
      setFeedback(`Loaded ${data.bookings.length} booking request(s).`);
    } catch {
      setStatus("error");
      setFeedback("Network error while loading bookings.");
    }
  };

  const copyMessage = async (entry: BookingEntry) => {
    await navigator.clipboard.writeText(
      `Name: ${entry.name}\nEmail: ${entry.email}\nDate: ${new Date(entry.createdAt).toLocaleString()}\n\nMessage:\n${entry.message}`
    );
  };

  return (
    <main className="min-h-screen bg-background px-5 py-14 text-foreground md:px-10">
      <div className="mx-auto max-w-5xl space-y-7">
        <div>
          <Badge>Admin</Badge>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl">Booking Inbox</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Secure view for website booking submissions. Use your admin token to load and review requests.
          </p>
        </div>

        <Card className="glass rounded-3xl p-5 md:p-7">
          <label className="text-sm font-medium text-foreground/90">Admin Token</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <Input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Enter BOOKINGS_ADMIN_TOKEN"
              type="password"
            />
            <Button onClick={loadBookings} disabled={!token || status === "loading"}>
              {status === "loading" ? "Loading..." : "Load Inbox"}
            </Button>
          </div>
          {feedback && (
            <p className={`mt-3 text-sm ${status === "error" ? "text-rose-600 dark:text-rose-300" : "text-muted-foreground"}`}>{feedback}</p>
          )}
        </Card>

        <div className="grid gap-4">
          {sorted.map((entry) => (
            <Card key={entry.id} className="rounded-3xl p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl">{entry.name}</h2>
                  <a href={`mailto:${entry.email}`} className="text-sm text-accent hover:underline">
                    {entry.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarClock className="h-4 w-4" />
                  {new Date(entry.createdAt).toLocaleString()}
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">{entry.message}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Badge className="border-border bg-muted text-foreground">{entry.source}</Badge>
                <a href={`mailto:${entry.email}`} className="inline-flex">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" /> Reply
                  </Button>
                </a>
                <Button size="sm" variant="outline" onClick={() => void copyMessage(entry)}>
                  <Copy className="h-4 w-4" /> Copy
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {status === "success" && sorted.length === 0 && (
          <Card className="rounded-3xl p-7 text-center text-muted-foreground">
            <ShieldCheck className="mx-auto h-7 w-7 text-accent" />
            <p className="mt-3">No bookings yet. New submissions will appear here.</p>
          </Card>
        )}
      </div>
    </main>
  );
}
