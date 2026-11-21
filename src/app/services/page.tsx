"use client";

import { useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";
import IndependentDisclaimerBanner from "@/components/IndependentDisclaimerBanner";
import {
  GraduationCap,
  Landmark,
  FileCheck,
  Cpu,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Send,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<{
    name: string;
    category: string;
  } | null>(null);

  const services = [
    {
      id: "education",
      categoryKey: "scholarships",
      badge: "Category 01",
      title: "Education Support",
      tagline: "Empowering Students to Reach Their Full Academic Potential",
      icon: <GraduationCap className="w-10 h-10 text-blue-600" />,
      color: "border-blue-200 bg-blue-50/20",
      accent: "from-blue-600 to-indigo-700",
      overview:
        "Higher education pathways can be financially challenging and procedurally complex. One Point provides end-to-end guidance to ensure deserving students access available grants, bank credit, and seats.",
      subservices: [
        {
          name: "Scholarships",
          description:
            "Pre-matric, post-matric, national merit, state minority, and merit-cum-means scholarship identification, documentation readiness, and portal application support.",
        },
        {
          name: "Education Loans",
          description:
            "Guidance through subsidized educational credit lines, Vidya Lakshmi portal registration, document structuring, and government interest subsidy schemes.",
        },
        {
          name: "Admissions Assistance",
          description:
            "Navigating counseling rounds (CET, NEET, PGCET), option entry guidance, seat allotment tracking, and reservation quota document verification.",
        },
        {
          name: "Career Guidance",
          description:
            "Aptitude mapping, vocational course roadmaps, industry certifications, and counseling for first-generation college aspirants.",
        },
      ],
      idealFor: "High school, PUC, Diploma, Undergraduate & Postgraduate students.",
    },
    {
      id: "welfare",
      categoryKey: "government-welfare",
      badge: "Category 02",
      title: "Government Scheme Assistance",
      tagline: "Demystifying Welfare Entitlements for Citizens and Families",
      icon: <Landmark className="w-10 h-10 text-emerald-600" />,
      color: "border-emerald-200 bg-emerald-50/20",
      accent: "from-emerald-600 to-teal-700",
      overview:
        "Many welfare initiatives fail to reach intended beneficiaries due to digital illiteracy and administrative complexity. We act as a trusted public-service companion.",
      subservices: [
        {
          name: "Welfare Scheme Information",
          description:
            "Curated, verified, and plain-language breakdowns of state and central citizen entitlements, criteria, and departmental mandates.",
        },
        {
          name: "Eligibility Guidance",
          description:
            "Objective screening of family income, category, domicile, and criteria matrices to determine exact scheme applicability.",
        },
        {
          name: "Application Assistance",
          description:
            "Assisted navigation of official e-governance gateways (Seva Sindhu, Nadakacheri, DBT Bharat) to ensure accurate submissions.",
        },
        {
          name: "Documentation Guidance",
          description:
            "Preparation of requisite revenue certificates, affidavits, income/caste papers, and Aadhaar-bank account seeding.",
        },
      ],
      idealFor: "Rural and semi-urban households, women beneficiaries, senior citizens, and farmers.",
    },
    {
      id: "digital",
      categoryKey: "other-opportunities",
      badge: "Category 03",
      title: "Digital Services",
      tagline: "Essential Online Application & Citizen Portal Facilitation",
      icon: <FileCheck className="w-10 h-10 text-amber-600" />,
      color: "border-amber-200 bg-amber-50/20",
      accent: "from-amber-600 to-orange-700",
      overview:
        "Fast, reliable, and secure technical assistance for standard digital administrative tasks, document conversions, and digital verification desks.",
      subservices: [
        {
          name: "Online Applications",
          description:
            "Facilitating public online forms, entrance test registrations, board examination forms, and competitive exam submissions.",
        },
        {
          name: "Documentation Assistance",
          description:
            "High-resolution document scanning, file compression, format compliance (PDF/JPEG specifications), and cloud backup counseling.",
        },
        {
          name: "Essential Digital Services",
          description:
            "Aadhaar demographic update advisory, PAN card application guidance, voter registration support, and digital signature setup.",
        },
      ],
      idealFor: "Any citizen or student seeking reliable, error-free online document processing.",
    },
    {
      id: "technology",
      categoryKey: "other-opportunities",
      badge: "Category 04",
      title: "Technology Solutions",
      tagline: "NextGen Software Platforms for Social Impact & Public Welfare",
      icon: <Cpu className="w-10 h-10 text-purple-600" />,
      color: "border-purple-200 bg-purple-50/20",
      accent: "from-purple-600 to-pink-700",
      overview:
        "Harnessing technology to build public service tools, student desk dashboards, and community-level digital enablement platforms under NextGen Organisation.",
      subservices: [
        {
          name: "Digital Platforms",
          description:
            "Modern, mobile-first web platforms designed to publish verified opportunities, track citizen enquiries, and manage community outreach.",
        },
        {
          name: "Technology-Enabled Public Service Solutions",
          description:
            "Workflow automation tools, automated spreadsheet tracking, and notification gateways engineered for grassroot NGOs and educational trusts.",
        },
      ],
      idealFor: "Educational trusts, schools, colleges, and social service organizations.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Assured Tech Zone Services
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Comprehensive Digital & Student Services
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover our four core service domains designed to support learners, families, and communities with independent technology-enabled assistance.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Mandate Notice */}
        <IndependentDisclaimerBanner compact />

        {/* Detailed Service Cards */}
        <div className="space-y-12">
          {services.map((svc) => (
            <div
              key={svc.id}
              id={svc.id}
              className={`rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden`}
            >
              <div className={`h-2 bg-gradient-to-r ${svc.accent}`} />

              <div className="p-6 sm:p-10 space-y-8">
                {/* Header row */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs shrink-0">
                      {svc.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                          {svc.badge}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {svc.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                        {svc.tagline}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedService({
                        name: svc.title,
                        category: svc.categoryKey,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm shrink-0 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enquire About {svc.title}</span>
                  </button>
                </div>

                {/* Service Overview */}
                <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
                  {svc.overview}
                </p>

                {/* Sub-services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {svc.subservices.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-colors space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h3 className="font-bold text-slate-900 text-sm">
                          {sub.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6">
                        {sub.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Target Audience Footer */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-slate-700">
                    <strong className="text-blue-950 font-semibold">Primary Beneficiaries:</strong>{" "}
                    {svc.idealFor}
                  </div>
                  <Link
                    href="/schemes"
                    className="text-blue-700 font-semibold hover:text-blue-900 inline-flex items-center gap-1 shrink-0"
                  >
                    <span>View Related Schemes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Process Section */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Standard Operating Procedure
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              How We Deliver Services
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Our 4-phase methodology guarantees accuracy and accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-blue-400 font-bold text-sm">Phase 1</span>
              <h4 className="font-bold text-white text-sm">Initial Inquiry</h4>
              <p className="text-slate-300 leading-relaxed">
                Applicant submits interest via website form or tech zone walk-in.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-blue-400 font-bold text-sm">Phase 2</span>
              <h4 className="font-bold text-white text-sm">Criteria Audit</h4>
              <p className="text-slate-300 leading-relaxed">
                Verification of academic marks, certificates, and eligibility thresholds.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-blue-400 font-bold text-sm">Phase 3</span>
              <h4 className="font-bold text-white text-sm">Portal Application</h4>
              <p className="text-slate-300 leading-relaxed">
                Step-by-step submission on designated official government gateways.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <span className="text-blue-400 font-bold text-sm">Phase 4</span>
              <h4 className="font-bold text-white text-sm">Status Archiving</h4>
              <p className="text-slate-300 leading-relaxed">
                Acknowledgement slip handover and periodic tracking till disbursement.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Dynamic Service Enquiry Modal */}
      {selectedService && (
        <EnquiryModal
          isOpen={Boolean(selectedService)}
          onClose={() => setSelectedService(null)}
          schemeTitle={`Service Assistance: ${selectedService.name}`}
          schemeCategory={selectedService.category}
        />
      )}
    </div>
  );
}
