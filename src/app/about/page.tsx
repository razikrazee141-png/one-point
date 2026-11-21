import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import IndependentDisclaimerBanner from "@/components/IndependentDisclaimerBanner";
import {
  Target,
  Eye,
  CheckCircle2,
  Users,
  Lightbulb,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Award,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | ONE POINT – ASSURED TECH ZONE",
  description:
    "Learn about ONE POINT – ASSURED TECH ZONE, our mission, vision, core values, and our role under NextGen Organisation in simplifying access to educational opportunities and digital public services.",
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Accessibility",
      description:
        "Breaking down geographical, linguistic, and digital barriers so every student and household can access legitimate welfare and scholarship opportunities without friction.",
      icon: <Compass className="w-6 h-6 text-blue-600" />,
      color: "border-blue-200 bg-blue-50/40",
    },
    {
      title: "Transparency",
      description:
        "Providing honest, verified, and unadulterated information. Clear disclaimers regarding government processes, with zero hidden charges or false assurances.",
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      color: "border-emerald-200 bg-emerald-50/40",
    },
    {
      title: "Reliability",
      description:
        "Dependable technical guidance and document verification that applicants, educational institutions, and community partners can count on without hesitation.",
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      color: "border-indigo-200 bg-indigo-50/40",
    },
    {
      title: "Empowerment",
      description:
        "Enabling individuals through knowledge and digital confidence so they understand their entitlements and can build self-reliant academic and professional futures.",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      color: "border-purple-200 bg-purple-50/40",
    },
    {
      title: "Innovation",
      description:
        "Leveraging modern digital workflows, automated verification checklists, and secure cloud records to deliver speed, accuracy, and scalability across Karnataka.",
      icon: <Lightbulb className="w-6 h-6 text-amber-600" />,
      color: "border-amber-200 bg-amber-50/40",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> NextGen Organisation Initiative
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            About ONE POINT
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            An independent digital public service and student-support organisation operating under NextGen Organisation.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Prominent Independent Entity Notice */}
        <IndependentDisclaimerBanner />

        {/* Narrative & Purpose Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Our Genesis & Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bridging the Divide Between Citizens and Opportunities
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In an era where educational grants, scholarship portals, bank loan subsidies, and welfare schemes have shifted almost entirely to digital interfaces, hundreds of thousands of deserving students and families face unintended exclusion. Complex documentation requirements, portal server timeouts, clerical errors, and lack of ground-level tech literacy often stand between an aspiring student and their dreams.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>ONE POINT – ASSURED TECH ZONE</strong> was established under <strong>NextGen Organisation</strong> to eliminate this friction. We operate as a modern, technology-enabled assistance network designed to guide applicants step-by-step through legitimate digital gateways, verify their documents before submission, and provide reliable end-to-end support.
            </p>
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs sm:text-sm font-medium">
              &quot;{siteConfig.supportingStatement}&quot;
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Key Institutional Facts
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-28 shrink-0">Brand Name:</span>
                <span className="text-slate-600">ONE POINT</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-28 shrink-0">Descriptor:</span>
                <span className="text-slate-600 font-semibold text-blue-900">ASSURED TECH ZONE</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-28 shrink-0">Parent Body:</span>
                <span className="text-slate-600 font-bold text-slate-900">NextGen Organisation</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-28 shrink-0">Tagline:</span>
                <span className="text-slate-600 italic">&quot;{siteConfig.tagline}&quot;</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-28 shrink-0">Legal Status:</span>
                <span className="text-slate-600">Independent Private Public-Service Facilitator</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-slate-900 w-28 shrink-0">Geographic Scope:</span>
                <span className="text-slate-600">Karnataka State (All 31 Districts)</span>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
              <Target className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
              Our Mission
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Simplifying Access Through Technology
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium text-slate-800">
              &quot;To simplify access to educational opportunities, welfare schemes and essential digital services through technology-enabled assistance.&quot;
            </p>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              We empower learners and everyday citizens to confidently navigate official institutional schemes, eliminating middlemen and streamlining application lifecycles.
            </p>
          </div>

          {/* Vision Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-2">
              Our Vision
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              A Trusted Network Across Karnataka
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium text-slate-800">
              &quot;To establish a trusted service network across Karnataka, connecting individuals with opportunities and essential services.&quot;
            </p>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              We envision tech zone desks accessible in every district, creating a statewide support backbone that leaves no student or household behind.
            </p>
          </div>
        </section>

        {/* OUR CORE VALUES */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Foundational Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              The operational ethics that govern every interaction, application, and service delivered by our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border transition-all duration-200 hover:shadow-lg ${val.color} flex flex-col justify-between`}
              >
                <div>
                  <div className="p-3 bg-white rounded-xl shadow-xs inline-block mb-4">
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}

            {/* NextGen Organisation Value Card */}
            <div className="rounded-2xl p-6 border border-slate-900 bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-2">
                  Parent Stewardship
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  NextGen Organisation
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Guided by NextGen Organisation, One Point adheres to strict digital governance, data protection, and social impact objectives.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                <span>View Service Commitments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* STRICT LEGAL DISCLAIMER BOX */}
        <section className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <span>Important Governance & Non-Government Affiliation Disclosure</span>
          </div>
          <p className="text-xs text-amber-950/80 leading-relaxed">
            {siteConfig.disclaimer}
          </p>
          <p className="text-[11px] text-amber-900/70">
            For official notifications, citizens and students are always encouraged to cross-reference primary gazette publications issued by respective government ministries, boards, and accredited educational authorities.
          </p>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-blue-900 p-8 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold">
            Looking for Assistance with an Educational Scheme?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            Our team is available to assist you. Explore open opportunities or submit a direct enquiry to connect with a counsellor.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Browse Scheme Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-blue-700 shadow-sm"
            >
              <span>Contact Tech Zone Team</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
