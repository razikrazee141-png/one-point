"use client";

import WhatsAppIcon from "./WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { ShieldCheck } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <aside
      aria-label="Official WhatsApp Channel"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with One Point on Official WhatsApp"
        className="flex items-center gap-2.5 px-4.5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/60 cursor-pointer"
      >
        <div className="relative">
          <WhatsAppIcon className="w-5 h-5 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-emerald-600 animate-pulse"></span>
        </div>
        <div className="hidden sm:flex flex-col text-left leading-none">
          <span className="font-extrabold tracking-wide text-xs">Official WhatsApp</span>
          <span className="text-[9px] text-emerald-100 font-medium flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-2.5 h-2.5 text-amber-300" />
            Verified Support Desk
          </span>
        </div>
      </a>
    </aside>
  );
}
