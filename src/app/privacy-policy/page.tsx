import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ONE POINT – ASSURED TECH ZONE",
  description:
    "Privacy Policy for ONE POINT – ASSURED TECH ZONE under NextGen Organisation. Understand how your enquiry details and personal information are handled and protected.",
};

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Legal & Data Protection
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated: November 2026 • ONE POINT – ASSURED TECH ZONE (NextGen Organisation)
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Overview and Scope
            </h2>
            <p>
              This Privacy Policy explains how <strong>ONE POINT – ASSURED TECH ZONE</strong>, an independent digital public service and student-support organisation operating under <strong>NextGen Organisation</strong>, collects, manages, and safeguards personal data submitted by visitors, students, and citizens through our website forms and digital channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              2. Information We Collect
            </h2>
            <p>When you submit an enquiry form on our website, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>Applicant Name:</strong> To identify the student or citizen.</li>
              <li><strong>Mobile Number:</strong> To contact you via call or WhatsApp regarding your enquiry.</li>
              <li><strong>District & Taluk:</strong> To map your inquiry to our nearest Karnataka district desk.</li>
              <li><strong>Scheme Name & Category:</strong> To identify the specific educational or welfare scheme of interest.</li>
              <li><strong>Email Address & Qualification (Optional):</strong> To provide written guidance and eligibility matching.</li>
              <li><strong>Enquiry Message:</strong> Specific queries or details regarding your application requirements.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              3. Purpose of Processing and Google Sheets Storage
            </h2>
            <p>
              Your enquiry data is submitted securely via encrypted HTTPS channels to our backend API and recorded directly into an internal Google Sheets Enquiry Management document titled <em>&quot;ONE POINT – ENQUIRY MANAGEMENT&quot;</em>.
            </p>
            <p>We use this information exclusively to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>Assign a counsellor or support executive to evaluate your scheme eligibility.</li>
              <li>Follow up via phone or messaging channels to assist with documentation.</li>
              <li>Archive service interactions under a unique tracking Submission ID.</li>
            </ul>
            <p>
              We do <strong>NOT</strong> sell, rent, or trade your personal contact details to any third-party commercial marketing or advertising entities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              4. Independent Entity & Non-Government Clarification
            </h2>
            <p>
              ONE POINT is an independent service organisation and NOT a government department. Submitting an enquiry to ONE POINT does NOT constitute formal application to any government ministry, welfare board, or educational university. Formal applications must always be executed directly on official governmental portals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. Data Security & Retention
            </h2>
            <p>
              Access to our Google Sheets and internal databases is restricted to authorized personnel of NextGen Organisation. Personal records are retained only for as long as necessary to address the enquiry or satisfy internal auditing guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              6. Contact for Privacy Inquiries
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request modification or deletion of your enquiry record, please reach out to our team at <strong>contact@onepoint.org.in</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
