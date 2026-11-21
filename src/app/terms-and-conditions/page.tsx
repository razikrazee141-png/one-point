import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FileCheck, ArrowLeft, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | ONE POINT – ASSURED TECH ZONE",
  description:
    "Terms and Conditions governing the use of the ONE POINT – ASSURED TECH ZONE website and independent facilitation services under NextGen Organisation.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-semibold mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <FileCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              User Agreement
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated: November 2026 • ONE POINT – ASSURED TECH ZONE (NextGen Organisation)
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {/* Important Highlight Box */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Crucial Facilitation Notice</p>
              <p>
                ONE POINT is an independent service organisation operating under NextGen Organisation and is NOT a government department. We do not charge unauthorized government fees and do not guarantee approval for any third-party or government scheme.
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and utilizing the website of <strong>ONE POINT – ASSURED TECH ZONE</strong> (&quot;Website&quot;), or submitting an enquiry for any service or scheme, you acknowledge and agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Nature of Services
            </h2>
            <p>
              One Point provides independent technical assistance, public information dissemination, documentation readiness, and student counseling across Karnataka.
            </p>
            <p>
              All scheme descriptions, eligibility parameters, required documents, and dates shown on this website are provided for informative facilitation purposes only. Official parameters are determined exclusively by the respective issuing government authorities, colleges, or banking bodies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              3. Non-Guarantee of Approvals or Sanctions
            </h2>
            <p>
              One Point provides assistance to help applicants complete legitimate applications accurately. However:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>One Point does <strong>NOT</strong> have discretionary authority to approve or grant any scholarship, pension, subsidy, or loan.</li>
              <li>Approval, rejection, disbursement amounts, and timelines remain under the exclusive domain of the respective government ministry, university, or financial institution.</li>
              <li>No employee, agent, or representative of One Point is authorized to make guarantees regarding guaranteed selection or sanction.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              4. Accuracy of Submitted Information
            </h2>
            <p>
              Applicants must provide truthful, accurate, and current information when submitting enquiries. The applicant is solely responsible for ensuring that all documents provided (academic marks, caste, income certificates, etc.) are authentic and issued by competent legal authorities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. Intellectual Property
            </h2>
            <p>
              The ONE POINT branding, logo, text, design, and proprietary code are the property of NextGen Organisation. Third-party scheme names, portal names, and government trademarks mentioned belong to their respective statutory owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              6. Governance and Jurisdiction
            </h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in Karnataka.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
