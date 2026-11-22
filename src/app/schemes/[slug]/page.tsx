import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllSchemes,
  getSchemeBySlug,
} from "@/data/schemes";
import { siteConfig } from "@/config/site";
import EnquiryForm from "@/components/EnquiryForm";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  CheckCircle2,
  FileText,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  Layers,
  Send,
  Users,
  MessageCircle,
} from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const schemes = getAllSchemes();
  return schemes.map((scheme) => ({
    slug: scheme.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const scheme = getSchemeBySlug(slug);

  if (!scheme) {
    return {
      title: "Scheme Not Found | ONE POINT",
    };
  }

  return {
    title: `${scheme.title} | ONE POINT – ASSURED TECH ZONE`,
    description: scheme.shortDescription,
  };
}

export default async function SchemeDetailPage({ params }: Props) {
  const { slug } = await params;
  const scheme = getSchemeBySlug(slug);

  if (!scheme) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-slate-900 text-slate-300 border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <Link
            href="/schemes"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Schemes</span>
          </Link>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Category:</span>
            <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
              {scheme.categoryLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Main Scheme Hero Title Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-850 to-blue-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 text-xs font-bold border border-blue-500/30">
                {scheme.categoryLabel}
              </span>
              {scheme.isPlaceholder ? (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  Sample Scheme Profile
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Official Notification Active
                </span>
              )}
              {scheme.badge && (
                <span className="px-3 py-1 rounded-full bg-red-600/40 text-red-200 text-xs font-bold border border-red-500/40">
                  {scheme.badge}
                </span>
              )}
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Target: {scheme.targetAudience}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {scheme.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {scheme.shortDescription}
            </p>

            {/* Quick Action Link */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Jump to Enquiry Form</span>
              </a>

              {scheme.officialWebsite && (
                <a
                  href={scheme.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wide transition-colors border border-white/20"
                >
                  <span>Official Application Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Scheme Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Disclaimer Alert */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3 shadow-xs">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">
                  Independent Facilitation & Non-Guarantee Disclaimer
                </p>
                <p className="text-amber-900 leading-relaxed">
                  ONE POINT – ASSURED TECH ZONE provides independent informational guidance, document verification, and portal assistance. <strong>One Point does NOT guarantee scheme approval, grant sanctions, or seat allocations.</strong> All final decisions rest solely with the respective government department, university, or financial institution.
                </p>
              </div>
            </div>

            {/* Official Announcement Summary Banner */}
            {scheme.badge && (
              <div className="bg-gradient-to-r from-red-50 via-white to-amber-50 rounded-2xl p-5 border border-red-200 shadow-xs flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                    {scheme.badge}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    Official Karnataka State Notification Update
                  </h3>
                  <p className="text-xs text-slate-600">
                    Verified opportunity extracted from official public gazettes. Follow instructions below to apply on time.
                  </p>
                </div>
              </div>
            )}

            {/* Scheme Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Scheme Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {scheme.fullDescription}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>Benefits & Assistance Scope</span>
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {scheme.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/50 border border-blue-100/70 text-xs sm:text-sm text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <span>Eligibility Criteria</span>
              </h2>
              <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-900 mb-2">
                <strong>Summary:</strong> {scheme.eligibilitySummary}
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {scheme.eligibilityCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents Checklist */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <span>Required Documents Checklist</span>
              </h2>
              <p className="text-xs text-slate-500">
                Ensure you have clear scanned copies or originals of the following documents before submitting your application:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                <span>Step-by-Step Application Process</span>
              </h2>
              <div className="space-y-4 pt-2">
                {scheme.applicationProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700 pt-1">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Important Dates & Verification Schedule</span>
              </h2>
              <div className="space-y-3">
                {scheme.importantDates.map((dateItem, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <span className="font-semibold text-slate-800">
                      {dateItem.label}
                    </span>
                    <span className="font-mono text-blue-900 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200/80">
                      {dateItem.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Enquiry Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div id="enquiry-form" className="sticky top-28">
              <EnquiryForm
                initialSchemeName={scheme.title}
                initialCategory={scheme.category}
                isSchemePage={true}
              />

              {/* Quick Tech Zone Support Help */}
              <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Direct Assistance Desk
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have questions about this scheme&apos;s deadline or documentation? Submit the enquiry form above or chat directly with our coordinator on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/918197803617?text=Hello%20One%20Point%20Team%2C%20I%20need%20assistance%20regarding%20${encodeURIComponent(scheme.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: 8197803617</span>
                </a>
                <div className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <span>View District Network Information</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
