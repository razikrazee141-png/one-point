"use client";

import { useState, useMemo } from "react";
import {
  SCHEMES,
  SCHEME_CATEGORIES,
  SchemeCategory,
} from "@/data/schemes";
import SchemeCard from "@/components/SchemeCard";
import EnquiryModal from "@/components/EnquiryModal";
import IndependentDisclaimerBanner from "@/components/IndependentDisclaimerBanner";
import {
  Search,
  Filter,
  Sparkles,
  SlidersHorizontal,
  HelpCircle,
  FileQuestion,
  Info,
} from "lucide-react";

export default function SchemesPage() {
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter schemes by category and search term
  const filteredSchemes = useMemo(() => {
    return SCHEMES.filter((scheme) => {
      const matchesCategory =
        selectedCategory === "all" || scheme.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        scheme.title.toLowerCase().includes(q) ||
        scheme.shortDescription.toLowerCase().includes(q) ||
        scheme.eligibilitySummary.toLowerCase().includes(q) ||
        scheme.targetAudience.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SCHEMES.length };
    SCHEMES.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Dynamic Opportunities Catalog
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Schemes & Educational Opportunities
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover verified scholarships, education loans, public welfare schemes, and admission support facilitated by One Point.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search schemes by keyword, degree, or eligibility..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all shadow-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Mandate Notice */}
        <IndependentDisclaimerBanner compact />

        {/* Administrator Data Notice Box */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">
              Placeholder Schemes Notice (Ready for Live Data)
            </p>
            <p className="text-amber-950/80 leading-relaxed">
              In accordance with project specifications, the opportunities listed below are structured <strong>sample placeholders</strong>. Real government scheme names, gazetted criteria, and deadlines can be added or updated dynamically in <code>src/data/schemes.ts</code> without altering website components.
            </p>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 hidden md:flex">
              <Filter className="w-3.5 h-3.5" /> Filters:
            </div>
            {SCHEME_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-700 text-white shadow-sm font-bold"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-blue-800 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong>{filteredSchemes.length}</strong> opportunities
            {selectedCategory !== "all" && ` in ${SCHEME_CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-blue-700 hover:text-blue-900 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Schemes Grid */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <FileQuestion className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No Schemes Matched Your Criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any scheme matching your current search or category filter. Try clearing filters or submit a custom enquiry.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold mr-3"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-700 text-white text-xs font-semibold"
              >
                Request Custom Assistance
              </button>
            </div>
          </div>
        )}

        {/* Help Banner at the Bottom */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Can&apos;t find the specific scholarship or welfare scheme you are looking for?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our Karnataka tech zone counsellors track hundreds of state and central schemes. Submit your enquiry with the scheme title and we will verify its current portal status.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Submit Custom Enquiry</span>
          </button>
        </section>
      </div>

      {/* Global General Assistance Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schemeTitle="Custom Scheme Search / Inquiry"
        schemeCategory="other-opportunities"
      />
    </div>
  );
}
