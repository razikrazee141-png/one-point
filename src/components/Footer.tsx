"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import BrandLogo from "./BrandLogo";
import {
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  FileQuestion,
  Layers,
} from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner inside footer */}
      <div className="border-b border-slate-800/80 bg-blue-950/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
              NextGen Organisation Initiative
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              &quot;One destination. Multiple solutions. Better opportunities.&quot;
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Empowering students and citizens with structured assistance for education and public welfare.
            </p>
          </div>
          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-md shrink-0"
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
            <BrandLogo variant="light" />
            <p className="text-amber-400 font-semibold text-xs tracking-wider uppercase">
              {siteConfig.tagline}
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              &quot;An independent service organisation operating under <strong>NextGen Organisation</strong>.&quot;
            </p>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <span className="text-amber-300 font-bold flex items-center gap-1 mb-1">
                <Shield className="w-3.5 h-3.5" /> Independent Status Disclosure
              </span>
              ONE POINT is an independent private initiative and is NOT a government department or government-authorised entity. We provide digital facilitation and student-support services.
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-blue-400 transition-colors">
                  Schemes & Opportunities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Service Domains
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/services#education" className="hover:text-blue-400 transition-colors">
                  • Education Support & Scholarships
                </Link>
              </li>
              <li>
                <Link href="/services#loans" className="hover:text-blue-400 transition-colors">
                  • Higher Education Loans Guidance
                </Link>
              </li>
              <li>
                <Link href="/services#welfare" className="hover:text-blue-400 transition-colors">
                  • Government Scheme Assistance
                </Link>
              </li>
              <li>
                <Link href="/services#digital" className="hover:text-blue-400 transition-colors">
                  • Essential Digital & Citizen Services
                </Link>
              </li>
              <li>
                <Link href="/services#technology" className="hover:text-blue-400 transition-colors">
                  • Technology Solutions & Public Portals
                </Link>
              </li>
            </ul>
          </div>

          {/* District Assistance Network Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Tech Zone Assistance
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address.line1}, {siteConfig.contact.address.city}, {siteConfig.contact.address.state}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Serving All 31 Districts of Karnataka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{siteConfig.contact.workingHours}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FileQuestion className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Online Form Enquiry Tracking Available 24/7</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
              >
                <span>Submit Direct Assistance Request</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with NextGen Branding & Legal */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} ONE POINT – ASSURED TECH ZONE. All rights reserved.</span>
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
            <span className="font-semibold text-slate-300">
              Powered by <span className="text-blue-400">NextGen</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
