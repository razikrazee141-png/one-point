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
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Schemes & Opportunities", href: "/schemes" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-200">
        {/* Top Official Portal Header Bar */}
        <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-[11px] sm:text-xs border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-flex items-center gap-1 font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> Official Service Hub
              </span>
              <span className="truncate text-slate-300 font-medium">
                Karnataka Digital Assistance &amp; Student Support Network • <span className="text-slate-400">NextGen Organisation</span>
              </span>
            </div>

            {/* Official WhatsApp Top Channel */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                Public Mandate
              </Link>
              <span className="text-slate-700">•</span>
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

        {/* Main Navbar */}
        <nav
          className={`bg-white/95 backdrop-blur-md transition-shadow duration-200 border-b border-slate-200/90 ${
            scrolled ? "shadow-md" : "shadow-xs"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Brand Logo with Authentic ONE POINT Typography */}
              <div className="flex-shrink-0">
                <BrandLogo showTagline={true} size="md" />
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
                          ? "text-royal-800 bg-royal-50 font-bold border border-royal-200/60 shadow-xs"
                          : "text-slate-700 hover:text-royal-700 hover:bg-slate-50"
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
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-300/80 transition-all shadow-xs"
                  title="Official OnePoint WhatsApp Channel"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
                  <span>WhatsApp Desk</span>
                </a>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-royal-700 to-navy-900 hover:from-royal-600 hover:to-navy-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Get Assistance</span>
                </button>
              </div>

              {/* Mobile Controls */}
              <div className="flex lg:hidden items-center gap-2">
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700"
                  title="Official WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-emerald-600" />
                </a>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fade-in shadow-xl">
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
                        ? "bg-royal-50 text-royal-800 font-bold border border-royal-200"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-100 space-y-2.5">
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
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-royal-700 to-navy-900 text-white font-bold text-sm shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Request Scheme Facilitation</span>
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
