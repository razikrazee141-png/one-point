"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FloatingWhatsApp() {
  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with One Point on WhatsApp: 8197803617"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/40 cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-semibold tracking-wide">
          WhatsApp: 8197803617
        </span>
      </a>
    </aside>
  );
}
