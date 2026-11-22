"use client";

import { useState } from "react";
import Link from "next/link";
import { Scheme } from "@/data/schemes";
import {
  GraduationCap,
  Landmark,
  HeartHandshake,
  BookOpen,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import EnquiryModal from "./EnquiryModal";

interface SchemeCardProps {
  scheme: Scheme;
}

export default function SchemeCard({ scheme }: SchemeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Category Icon & Badge Color resolver
  const getCategoryDetails = (cat: string) => {
    switch (cat) {
      case "scholarships":
        return {
          icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
          badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
          cardBorder: "hover:border-blue-300",
          accentColor: "from-blue-600 to-indigo-700",
        };
      case "education-loans":
        return {
          icon: <Landmark className="w-4 h-4 text-emerald-600" />,
          badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          cardBorder: "hover:border-emerald-300",
          accentColor: "from-emerald-600 to-teal-700",
        };
      case "government-welfare":
        return {
          icon: <HeartHandshake className="w-4 h-4 text-amber-600" />,
          badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
          cardBorder: "hover:border-amber-300",
          accentColor: "from-amber-600 to-orange-700",
        };
      case "admissions":
        return {
          icon: <BookOpen className="w-4 h-4 text-purple-600" />,
          badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
          cardBorder: "hover:border-purple-300",
          accentColor: "from-purple-600 to-pink-700",
        };
      default:
        return {
          icon: <Sparkles className="w-4 h-4 text-slate-600" />,
          badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
          cardBorder: "hover:border-slate-300",
          accentColor: "from-slate-700 to-slate-900",
        };
    }
  };

  const catStyle = getCategoryDetails(scheme.category);

  return (
    <>
      <div
        className={`group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${catStyle.cardBorder}`}
      >
        {/* Top color highlight bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${catStyle.accentColor}`} />

        <div className="p-6 flex-1 flex flex-col">
          {/* Top header row: Category badge, Status & Optional Announcement Badge */}
          <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${catStyle.badgeBg}`}
              >
                {catStyle.icon}
                {scheme.categoryLabel}
              </span>
              {scheme.badge && (
                <span className="bg-red-50 text-red-700 border border-red-200 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                  {scheme.badge}
                </span>
              )}
            </div>

            {scheme.isPlaceholder ? (
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                Sample Scheme
              </span>
            ) : (
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Verified Active
              </span>
            )}
          </div>

          {/* Scheme Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug mb-2">
            <Link href={`/schemes/${scheme.slug}`}>{scheme.title}</Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
            {scheme.shortDescription}
          </p>

          {/* Eligibility Summary Box */}
          <div className="mt-auto pt-3 border-t border-slate-100 mb-4 bg-slate-50/70 p-3 rounded-xl">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-700">
                <span className="font-semibold text-slate-900 block mb-0.5">Eligibility:</span>
                <span className="line-clamp-2">{scheme.eligibilitySummary}</span>
              </div>
            </div>
          </div>

          {/* Deadline or schedule preview */}
          {scheme.importantDates?.[0] && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-4">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {scheme.importantDates[0].label}:{" "}
                <strong className="text-slate-800">{scheme.importantDates[0].value}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            href={`/schemes/${scheme.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>

      {/* Direct Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schemeTitle={scheme.title}
        schemeCategory={scheme.category}
      />
    </>
  );
}
