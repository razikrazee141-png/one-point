"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import BrandLogo from "./BrandLogo";
import WhatsAppIcon from "./WhatsAppIcon";
import {
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  FileQuestion,
  Layers,
  Sparkles,
  Building,
} from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#0D081D] text-slate-300 border-t border-purple-950/60">
      {/* Top Banner inside footer (Midnight Purple Gradient) */}
      <div className="border-b border-purple-950/60 bg-gradient-to-r from-[#130D29] via-[#1D143D] to-[#130D29] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[#FF963F] text-xs font-extrabold uppercase tracking-widest block">
              NEXTGEN ORGANISATION INITIATIVE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              &quot;Everything You Need. All in One Point.&quot;
            </h3>
            <p className="text-[#F0EBFF]/80 text-xs sm:text-sm">
              Empowering students and citizens with structured assistance for education and public welfare.
            </p>
          </div>
          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#6546C8] to-[#FF963F] hover:from-[#5435B5] hover:to-[#F28528] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20 shrink-0"
          >
            <span>Explore Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-[#FF963F] font-bold text-xs tracking-wider uppercase">
              {siteConfig.tagline}
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              A digital public service and student-support platform under <strong>NextGen Organisation</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-[#130D29] border border-purple-900/40 text-[11px] text-slate-400 leading-relaxed shadow-sm">
              <span className="text-amber-400 font-bold flex items-center gap-1.5 mb-1.5">
                <Shield className="w-3.5 h-3.5" /> Independent Status Disclosure
              </span>
              ONEPOINT is an independent private initiative and is NOT a government department or government-authorised entity. We provide digital facilitation and student-support services.
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Explore Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#FF963F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF963F] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#FF963F] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/schemes?category=scholarships" className="hover:text-[#FF963F] transition-colors">
                  Education &amp; Scholarships
                </Link>
              </li>
              <li>
                <Link href="/schemes?category=government-welfare" className="hover:text-[#FF963F] transition-colors">
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF963F] transition-colors">
                  Contact &amp; Assistance
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/services#education" className="hover:text-[#FF963F] transition-colors">
                  • Scholarships &amp; Grants
                </Link>
              </li>
              <li>
                <Link href="/services#loans" className="hover:text-[#FF963F] transition-colors">
                  • Higher Education Loans
                </Link>
              </li>
              <li>
                <Link href="/services#welfare" className="hover:text-[#FF963F] transition-colors">
                  • Government Welfare Schemes
                </Link>
              </li>
              <li>
                <Link href="/services#digital" className="hover:text-[#FF963F] transition-colors">
                  • Essential Digital Public Services
                </Link>
              </li>
              <li>
                <Link href="/services#technology" className="hover:text-[#FF963F] transition-colors">
                  • Technology Solutions &amp; Desks
                </Link>
              </li>
            </ul>
          </div>

          {/* District Assistance Network Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Contact &amp; Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF963F] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address.line1}, {siteConfig.contact.address.city}, {siteConfig.contact.address.state}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 fill-emerald-400 shrink-0" />
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp:</span>
                  <strong className="text-emerald-400 font-bold hover:underline">Official Assistance Desk &rarr;</strong>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Serving All 31 Districts of Karnataka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{siteConfig.contact.workingHours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FileQuestion className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Online Form Enquiry Tracking 24/7</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs text-[#FF963F] hover:underline font-bold"
              >
                <span>Submit Direct Assistance Request</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with NextGen Branding & Legal */}
      <div className="border-t border-purple-950/80 bg-[#090514] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} OnePoint. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms and Conditions
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">
              An initiative of <strong className="text-[#FF963F]">NextGen Organisation</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
