"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHAT_STORAGE_KEY = "mc-chelaa-whatsapp-chat-v1";
const CHAT_OPEN_STORAGE_KEY = "mc-chelaa-whatsapp-open-v1";

type Message = {
  id: number;
  sender: "bot" | "user";
  text: string;
  timestamp?: Date;
};

type WhatsAppChatWidgetProps = {
  phone: string;
  className?: string;
};

export default function WhatsAppChatWidget({ phone, className }: WhatsAppChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const initializedRef = useRef(false);
  const openStateHydratedRef = useRef(false);
  const messageIdRef = useRef(1);
  const timeoutIdsRef = useRef<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sanitizedPhone = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  useEffect(() => {
    try {
      const storedOpenState = window.localStorage.getItem(CHAT_OPEN_STORAGE_KEY);
      if (storedOpenState === "1") {
        setIsOpen(true);
      }
    } catch {
      window.localStorage.removeItem(CHAT_OPEN_STORAGE_KEY);
    } finally {
      openStateHydratedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!openStateHydratedRef.current) {
      return;
    }

    try {
      window.localStorage.setItem(CHAT_OPEN_STORAGE_KEY, isOpen ? "1" : "0");
    } catch {
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    try {
      const storedRaw = window.localStorage.getItem(CHAT_STORAGE_KEY);
      if (!storedRaw) {
        return;
      }

      const parsed = JSON.parse(storedRaw) as Array<
        Omit<Message, "timestamp"> & { timestamp?: string }
      >;

      if (!Array.isArray(parsed) || parsed.length === 0) {
        return;
      }

      const hydratedMessages: Message[] = parsed
        .filter(
          (message) =>
            typeof message.id === "number" &&
            (message.sender === "bot" || message.sender === "user") &&
            typeof message.text === "string"
        )
        .map((message) => ({
          ...message,
          timestamp: message.timestamp ? new Date(message.timestamp) : undefined,
        }));

      if (!hydratedMessages.length) {
        return;
      }

      setMessages(hydratedMessages);
      initializedRef.current = true;
      messageIdRef.current =
        Math.max(...hydratedMessages.map((message) => message.id), 0) + 1;
    } catch {
      window.localStorage.removeItem(CHAT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIdsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isOpen || initializedRef.current) {
      return;
    }

    initializedRef.current = true;
    setMessages([
      {
        id: messageIdRef.current++,
        sender: "bot",
        text: "Hi 👋 Welcome to MC Chelaa support.",
        timestamp: new Date(),
      },
      {
        id: messageIdRef.current++,
        sender: "bot",
        text: "How can we help you today?",
        timestamp: new Date(),
      },
    ]);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    try {
      if (!messages.length) {
        window.localStorage.removeItem(CHAT_STORAGE_KEY);
        return;
      }

      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
      return;
    }
  }, [messages]);

  const userMessageCount = messages.filter((message) => message.sender === "user").length;
  const showWhatsAppCta = userMessageCount >= 2;

  const buildPrefilledText = () => {
    const transcript = messages
      .slice(-8)
      .map((message) => `${message.sender === "user" ? "Me" : "MC Chelaa"}: ${message.text}`)
      .join("\n");

    const content = transcript
      ? `Hi MC Chelaa, continuing from website chat:\n${transcript}`
      : "Hi MC Chelaa, I would like to continue this chat on WhatsApp.";

    return encodeURIComponent(content);
  };

  const whatsappHref = `https://wa.me/${sanitizedPhone}?text=${buildPrefilledText()}`;

  const queueBotReply = (nextUserMessageCount: number) => {
    setIsTyping(true);

    const replyDelay = 800 + Math.floor(Math.random() * 401);
    const timeoutId = window.setTimeout(() => {
      setIsTyping(false);

      const fallbackReply =
        nextUserMessageCount >= 2
          ? "You can also continue this chat on WhatsApp."
          : "Thanks for reaching out. We’ll get back to you shortly.";

      setMessages((prev) => [
        ...prev,
        {
          id: messageIdRef.current++,
          sender: "bot",
          text: fallbackReply,
          timestamp: new Date(),
        },
      ]);
    }, replyDelay);

    timeoutIdsRef.current.push(timeoutId);
  };

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) {
      return;
    }

    const nextUserMessageCount = userMessageCount + 1;

    setMessages((prev) => [
      ...prev,
      {
        id: messageIdRef.current++,
        sender: "user",
        text,
        timestamp: new Date(),
      },
    ]);

    setInputValue("");
    queueBotReply(nextUserMessageCount);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 px-0 transition-all duration-300 sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-95 sm:px-0",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
          className
        )}
        aria-hidden={!isOpen}
      >
        <section className="mx-0 h-[74vh] max-h-160 rounded-t-2xl border border-border bg-background/95 shadow-xl backdrop-blur-md sm:h-140 sm:rounded-2xl">
          <header className="flex items-center justify-between border-b border-border/80 bg-background/70 px-4 py-3 backdrop-blur-md">
            <div>
              <h2 className="text-sm font-semibold text-foreground">MC Chelaa Online</h2>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                Online
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="flex h-[calc(100%-61px)] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm transition-all duration-300",
                    message.sender === "user"
                      ? "ml-auto rounded-br-md bg-[#25D366] text-white"
                      : "mr-auto rounded-bl-md border border-border/70 bg-muted/70 text-foreground"
                  )}
                >
                  <p>{message.text}</p>
                </div>
              ))}

              {isTyping ? (
                <div className="mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-border/70 bg-muted/70 px-3 py-2 text-xs text-muted-foreground shadow-sm">
                  MC Chelaa is typing...
                </div>
              ) : null}

              {showWhatsAppCta ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-3 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
                >
                  Continue on WhatsApp
                </a>
              ) : null}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border/80 bg-background/80 p-3 backdrop-blur-md">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-2 py-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type your message..."
                  className="h-8 w-full bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  aria-label="Type your message"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  aria-label="Send message"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        className="group fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#25D366] text-white shadow-lg ring-2 ring-yellow-400/40 transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/45 blur-sm animate-pulse" />
        <svg aria-hidden="true" viewBox="0 0 24 24" className="relative h-5 w-5 sm:h-6 sm:w-6" fill="currentColor">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.12.55 4.2 1.6 6.05L0 24l6.1-1.6A11.97 11.97 0 0 0 12.02 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.2-3.5-8.52zm-8.5 18.5c-1.8 0-3.55-.48-5.08-1.4l-.36-.22-3.62.95.97-3.53-.24-.36A9.94 9.94 0 0 1 2.02 12c0-5.51 4.49-10 10-10 2.67 0 5.17 1.04 7.06 2.94A9.9 9.9 0 0 1 22.02 12c0 5.51-4.49 9.98-10 9.98zm5.48-7.48c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.75-1.63-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.57-.49-.5-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.48.71.3 1.26.48 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.57-.35z" />
        </svg>
      </button>
    </>
  );
}