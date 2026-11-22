"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import EnquiryModal from "./EnquiryModal";
import WhatsAppIcon from "./WhatsAppIcon";
import { siteConfig } from "@/config/site";
import {
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Education", href: "/schemes?category=scholarships" },
    { label: "Government Schemes", href: "/schemes?category=government-welfare" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full transition-all duration-300">
        {/* Top Official Portal Header Bar */}
        <div className="bg-[#0D081D] text-slate-300 py-1.5 px-4 text-[11px] sm:text-xs border-b border-purple-950/60">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-flex items-center gap-1 font-bold text-[#FF963F] bg-[#FF963F]/15 border border-[#FF963F]/30 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider shrink-0">
                <ShieldCheck className="w-3 h-3 text-[#FF963F]" /> Official Platform
              </span>
              <span className="truncate text-slate-300 font-medium">
                Digital Public Service &amp; Student Support Platform • <span className="text-[#8E78E6]">NextGen Organisation</span>
              </span>
            </div>

            {/* Official WhatsApp Top Channel */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                Public Mandate
              </Link>
              <span className="text-purple-900">•</span>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                title="Chat with Official WhatsApp Assistance Desk"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-400" />
                <span>Official WhatsApp Assistance</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Sticky Navbar (Midnight Navy with Glassmorphism) */}
        <nav
          className={`transition-all duration-300 border-b ${
            scrolled
              ? "bg-[#130D29]/95 backdrop-blur-xl border-purple-900/30 shadow-xl py-3"
              : "bg-[#130D29]/80 backdrop-blur-md border-white/10 py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Brand Logo with Authentic ONE POINT Typography */}
              <div className="flex-shrink-0">
                <BrandLogo showTagline={true} variant="light" size="md" />
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-wide transition-all ${
                        isActive
                          ? "text-[#FF963F] bg-white/10 font-bold border border-[#FF963F]/30 shadow-xs"
                          : "text-slate-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop Action Tools: Official WhatsApp & Get Assistance */}
              <div className="hidden lg:flex items-center gap-2.5">
                {/* Official WhatsApp Button (No raw phone number) */}
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-all"
                  title="Official OnePoint WhatsApp Channel"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-emerald-400" />
                  <span>WhatsApp Desk</span>
                </a>

                {/* Primary CTA (Vibrant Purple & Orange Gradient) */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6546C8] to-[#FF963F] hover:from-[#5435B5] hover:to-[#F28528] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Get Assistance</span>
                </button>
              </div>

              {/* Mobile Controls */}
              <div className="flex lg:hidden items-center gap-2">
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                  title="Official WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-emerald-400" />
                </a>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#130D29] border-b border-purple-900/40 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl">
              <div className="p-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Official Navigation
              </div>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                      isActive
                        ? "bg-purple-900/40 text-[#FF963F] font-bold border border-[#FF963F]/30"
                        : "text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-purple-900/40 space-y-2.5">
                {/* Official WhatsApp Button for Mobile (NO raw number) */}
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>Connect on Official WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#6546C8] to-[#FF963F] text-white font-bold text-sm shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Request Student / Public Assistance</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Global General Assistance Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schemeTitle="General Service Assistance"
        schemeCategory="other-opportunities"
      />
    </>
  );
}
