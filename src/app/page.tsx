"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getFeaturedSchemes } from "@/data/schemes";
import SchemeCard from "@/components/SchemeCard";
import EnquiryModal from "@/components/EnquiryModal";
import IndependentDisclaimerBanner from "@/components/IndependentDisclaimerBanner";
import {
  GraduationCap,
  Building2,
  FileCheck,
  Cpu,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Users,
  Compass,
  Laptop,
  CheckCheck,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredSchemes = getFeaturedSchemes();

  const serviceCategories = [
    {
      id: "education-support",
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      title: "Education Support",
      description:
        "Comprehensive assistance for scholarships, low-interest education loans, institutional admissions, and career pathways.",
      items: [
        "Pre-matric & post-matric scholarships",
        "Higher education bank loan facilitation",
        "Merit counselling & admissions assistance",
        "Specialized career & degree pathway guidance",
      ],
      link: "/services#education",
      color: "border-blue-200 hover:border-blue-400 bg-blue-50/30",
    },
    {
      id: "government-scheme",
      icon: <Building2 className="w-8 h-8 text-emerald-600" />,
      title: "Government Scheme Assistance",
      description:
        "Independent verification and digital assistance for state and central citizen welfare, social security, and livelihood schemes.",
      items: [
        "Welfare scheme eligibility checks",
        "Public welfare entitlement assistance",
        "Application documentation readiness",
        "Official portal navigation support",
      ],
      link: "/services#welfare",
      color: "border-emerald-200 hover:border-emerald-400 bg-emerald-50/30",
    },
    {
      id: "digital-services",
      icon: <FileCheck className="w-8 h-8 text-amber-600" />,
      title: "Digital Services",
      description:
        "Reliable tech assistance for online certificate applications, identity linkages, and essential public digital portals.",
      items: [
        "Online certificate registrations",
        "Document digitization & formatting",
        "Portal submission tracking",
        "Essential citizen digital assistance",
      ],
      link: "/services#digital",
      color: "border-amber-200 hover:border-amber-400 bg-amber-50/30",
    },
    {
      id: "technology-solutions",
      icon: <Cpu className="w-8 h-8 text-purple-600" />,
      title: "Technology Solutions",
      description:
        "Modern digital platforms, student information systems, and technology-enabled public service solutions by NextGen.",
      items: [
        "Custom tech platforms for institutions",
        "Scalable student information desks",
        "Automated workflow assistance",
        "Digital literacy & skill workshops",
      ],
      link: "/services#technology",
      color: "border-purple-200 hover:border-purple-400 bg-purple-50/30",
    },
  ];

  const whyChoosePoints = [
    {
      title: "Independent & Transparent Guidance",
      description:
        "Operating under NextGen Organisation, we provide honest, unbiased support without hidden agency fees or misleading claims.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Zero Middlemen & No Corruption",
      description:
        "We guide students and citizens through direct official government portals. We never solicit or charge unauthorized backdoor fees.",
      icon: <CheckCheck className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: "Documentation Pre-Verification",
      description:
        "Over 60% of scheme applications fail due to minor clerical mismatches. Our specialists review all certificates prior to submission.",
      icon: <FileCheck className="w-6 h-6 text-amber-600" />,
    },
    {
      title: "Statewide Karnataka Focus",
      description:
        "Designed to serve candidates across all 31 districts of Karnataka, bringing digital accessibility to semi-urban and rural communities.",
      icon: <Compass className="w-6 h-6 text-purple-600" />,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Discover Opportunities",
      description:
        "Browse our curated directory of educational scholarships, subsidized loans, welfare schemes, and admissions.",
    },
    {
      number: "02",
      title: "Submit Direct Enquiry",
      description:
        "Submit your enquiry using our streamlined form with your district and academic profile details.",
    },
    {
      number: "03",
      title: "Document Review",
      description:
        "Our team evaluates your eligibility criteria and assists you with compiling the exact required certificates.",
    },
    {
      number: "04",
      title: "Assisted Application",
      description:
        "We assist you in safely applying directly on official government or institutional portals with full tracking.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white pt-12 pb-20 md:pt-16 md:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 shadow-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-semibold text-white tracking-wide">
                ONE POINT – ASSURED TECH ZONE
              </span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-amber-400 font-medium hidden sm:inline">
                NextGen Organisation
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Your Opportunities. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-red-400">
                Our Assistance.
              </span>{" "}
              One Point.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Discover educational opportunities, government welfare schemes and essential digital services, all through one trusted destination.
            </p>

            {/* Supporting Statement */}
            <p className="text-xs sm:text-sm text-amber-300/90 font-medium tracking-wide">
              &quot;{siteConfig.supportingStatement}&quot;
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/schemes"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
              >
                <span>Explore Schemes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide transition-all border border-white/20 backdrop-blur-sm active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Get Assistance</span>
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block text-lg font-bold text-white">100%</span>
                <span className="text-xs text-slate-400">Independent Guidance</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block text-lg font-bold text-white">4 Major</span>
                <span className="text-xs text-slate-400">Service Domains</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block text-lg font-bold text-white">31 Districts</span>
                <span className="text-xs text-slate-400">Karnataka Reach</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block text-lg font-bold text-white">Direct</span>
                <span className="text-xs text-slate-400">Sheets Integration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDEPENDENT STATUS MANDATE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-10 w-full">
        <IndependentDisclaimerBanner />
      </section>

      {/* INTRODUCTION TO ONE POINT */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" /> Introduction to One Point
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Empowering Students and Citizens Across Karnataka
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                <strong>ONE POINT – ASSURED TECH ZONE</strong> is an independent digital public service and student-support organisation operating under <strong>NextGen Organisation</strong>.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every year, hundreds of thousands of deserving students miss out on merit scholarships and educational loan subsidies because of confusing digital portals, lack of document clarity, or absence of local handholding. At One Point, we bridge this critical divide through technology-enabled assistance, transparent counseling, and trustworthy digital zone desks.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Personalized document checklist preparation for scholarship portals</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subsidized educational bank loan application facilitation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Public welfare scheme eligibility matching and awareness</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Read About Our Mission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-4"
                >
                  View All Services →
                </Link>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      Core Purpose
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      Why One Point Exists
                    </h3>
                  </div>
                  <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <Laptop className="w-6 h-6" />
                  </span>
                </div>

                <div className="space-y-4 text-xs text-slate-600">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Mission Statement
                    </h4>
                    <p className="leading-relaxed">
                      To simplify access to educational opportunities, welfare schemes and essential digital services through technology-enabled assistance.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Vision Statement
                    </h4>
                    <p className="leading-relaxed">
                      To establish a trusted service network across Karnataka, connecting individuals with opportunities and essential services.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-900">
                    <p className="font-bold text-blue-950 mb-1">
                      NextGen Stewardship
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      Maintained with highest ethical standards, data privacy protocols, and citizen-first accountability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR MAJOR SERVICE CATEGORIES */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Four Major Service Pillars
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Providing holistic digital and counseling assistance across key touchpoints in student education and public welfare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((cat) => (
              <div
                key={cat.id}
                className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${cat.color}`}
              >
                <div>
                  <div className="mb-4 p-3 bg-white rounded-xl shadow-xs inline-block">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-slate-200/60 pt-3">
                    {cat.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={cat.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Explore Full Service Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED SCHEMES SECTION */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                Opportunities & Grants
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                Featured Schemes & Opportunities
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Explore currently showcased educational assistance schemes, loans, and welfare programmes.
              </p>
            </div>

            <Link
              href="/schemes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900"
            >
              <span>View All Schemes ({getFeaturedSchemes().length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSchemes.slice(0, 3).map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>

          {/* Notice on dynamic data */}
          <div className="mt-10 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-center text-xs text-blue-900">
            <strong>Administrator Notice:</strong> All initial scheme listings are sample placeholders. Official scheme parameters, eligibility notifications, and application dates can be updated dynamically via our structured data system.
          </div>
        </div>
      </section>

      {/* WHY CHOOSE ONE POINT */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Our Value Proposition
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Choose One Point?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A reliable, tech-first facilitation partner dedicated to student empowerment and digital inclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoosePoints.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-200 space-y-3"
              >
                <div className="p-3 rounded-xl bg-white shadow-xs inline-block border border-slate-100">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Streamlined Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              How One Point Assistance Works
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              From discovering schemes to final submission, we ensure a seamless and verified experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative space-y-3">
                <span className="text-4xl font-black text-blue-500/30 block mb-1">
                  {step.number}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Get Started With Free Guidance</span>
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA PREVIEW SECTION */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Need Immediate Help?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Have questions about a scholarship or welfare scheme?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect with our team today. We provide free preliminary eligibility counseling and document verification across Karnataka.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Contact Tech Zone</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                <span>Submit Quick Enquiry</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global General Assistance Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schemeTitle="General Service Assistance"
        schemeCategory="other-opportunities"
      />
    </div>
  );
}
