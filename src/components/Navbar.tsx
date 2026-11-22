"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import EnquiryModal from "./EnquiryModal";
import {
  Menu,
  X,
  Sparkles,
  HelpCircle,
  Info,
  ChevronRight,
  MessageCircle,
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
        {/* Top Disclaimer / Notice Bar */}
        <div className="bg-slate-950 text-slate-300 py-1.5 px-4 text-[11px] sm:text-xs border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-flex items-center gap-1 font-semibold text-amber-400 bg-amber-950/70 border border-amber-800/60 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
                <Info className="w-2.5 h-2.5" /> Notice
              </span>
              <span className="truncate text-slate-300">
                Independent service organisation under <strong>NextGen Organisation</strong>. Not a government agency.
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-400 shrink-0">
              <Link href="/about" className="hover:text-amber-300 transition-colors">
                Public Mandate
              </Link>
              <span>•</span>
              <a
                href="https://wa.me/918197803617?text=Hello%20One%20Point%20Team%2C%20I%20would%20like%20assistance%20with%20an%20educational%20scheme."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: 8197803617</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav
          className={`bg-white/95 backdrop-blur-md transition-shadow duration-200 border-b border-slate-200/80 ${
            scrolled ? "shadow-md" : "shadow-xs"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Brand Logo */}
              <div className="flex-shrink-0">
                <BrandLogo showTagline={true} />
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-blue-700 bg-blue-50/80 font-semibold"
                          : "text-slate-700 hover:text-blue-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Get Assistance</span>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex lg:hidden items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-semibold"
                >
                  Get Help
                </button>
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
              <div className="p-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Navigation
              </div>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <a
                  href="https://wa.me/918197803617?text=Hello%20One%20Point%20Team%2C%20I%20would%20like%20assistance%20with%20an%20educational%20scheme."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp: 8197803617</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
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
