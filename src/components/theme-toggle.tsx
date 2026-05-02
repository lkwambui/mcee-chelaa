"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" aria-label="Toggle theme" className="h-9 w-9 rounded-full">
        <span className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 w-9 rounded-full border border-border bg-card p-0 hover:scale-105"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <Sun
          className={`absolute h-4 w-4 transform text-accent transition-all duration-300 ease-in-out ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
          }`}
        />
        <Moon
          className={`absolute h-4 w-4 transform text-accent transition-all duration-300 ease-in-out ${
            isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          }`}
        />
      </span>
    </Button>
  );
}
