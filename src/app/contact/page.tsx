import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import EnquiryForm from "@/components/EnquiryForm";
import IndependentDisclaimerBanner from "@/components/IndependentDisclaimerBanner";
import {
  MapPin,
  Clock,
  Sparkles,
  Share2,
  HelpCircle,
  ShieldAlert,
  Send,
  Layers,
  FileCheck2,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Assistance Desks | ONE POINT – ASSURED TECH ZONE",
  description:
    "Get in touch with ONE POINT – ASSURED TECH ZONE. Submit your student or public welfare enquiry directly to our team across Karnataka.",
};

export default function ContactPage() {
  const faqs = [
    {
      q: "Is ONE POINT a government department or official agency?",
      a: "No. ONE POINT – ASSURED TECH ZONE is an independent digital public service and student-support organisation operating under NextGen Organisation. We are not a government department or government-authorised entity unless specific authorisations are separately established.",
    },
    {
      q: "Does One Point guarantee that my scholarship or loan will be approved?",
      a: "No. Approval decisions are made strictly and independently by the relevant government departments, banks, or academic institutions. One Point provides independent guidance, eligibility screening, documentation assistance, and portal navigation support to help you submit an accurate, error-free application.",
    },
    {
      q: "How does my enquiry get stored and tracked?",
      a: "All website enquiries are securely processed and automatically recorded into our Google Sheets Enquiry Management system under unique Submission IDs (e.g. OP-2611-XXXX). Our team reviews submissions and contacts applicants directly.",
    },
    {
      q: "Which regions does One Point serve?",
      a: "Our network is structured to assist students and citizens across all 31 districts of Karnataka, with a special emphasis on semi-urban and rural digital inclusion.",
    },
    {
      q: "How soon will I receive assistance after submitting?",
      a: "Our student facilitation team processes enquiries during working hours (Monday to Saturday, 9:30 AM to 6:30 PM). Enquiries are queued directly to the appropriate category desk.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Direct Support Desks
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact & Assistance Desks
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions about a scheme, documentation requirement, or digital application? Submit an online enquiry directly to our team across Karnataka.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Mandate Notice */}
        <IndependentDisclaimerBanner compact />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Network & Information Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                  Assistance Network
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  How We Assist You
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Submit an enquiry online using the form on this page to connect with our support desk.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Direct WhatsApp Contact Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                        Direct WhatsApp Support
                      </span>
                      <span className="text-base font-bold text-slate-900 block mt-0.5">
                        +91 81978 03617
                      </span>
                      <span className="text-[11px] text-emerald-700">
                        Chat directly with our student assistance team
                      </span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/918197803617?text=Hello%20One%20Point%20Team%2C%20I%20would%20like%20assistance%20with%20an%20educational%20scheme."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>

                {/* Online Form Intake Channel */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
                  <div className="p-2.5 rounded-lg bg-blue-600 text-white shrink-0">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                      Direct Online Portal Inquiries
                    </span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      Fast Form-Based Submissions
                    </span>
                    <span className="text-[11px] text-slate-600 leading-relaxed block mt-1">
                      Fill out the enquiry form with your course, district, and questions. Every submission receives a unique tracking ID and is routed to our domain coordinators.
                    </span>
                  </div>
                </div>

                {/* Statewide District Network */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Geographic Coverage
                    </span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      All 31 Districts of Karnataka
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Bengaluru, Mysuru, Hubballi-Dharwad, Kalaburagi, Mangaluru, Belagavi, Ballari, and all rural districts.
                    </span>
                  </div>
                </div>

                {/* Operating Center Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Registered Tech Zone Center
                    </span>
                    <span className="font-semibold text-slate-900 block mt-0.5 leading-snug">
                      {siteConfig.contact.address.line1}
                    </span>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      {siteConfig.contact.address.line2}, {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
                    </span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Desk Working Hours
                    </span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      {siteConfig.contact.workingHours}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Sunday & Gazette Holidays: Closed
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-blue-600" /> Connect on Social Media
                </span>
                <div className="flex items-center gap-3 text-xs">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors font-medium"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-pink-700 transition-colors font-medium"
                  >
                    Instagram
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors font-medium"
                  >
                    Facebook
                  </a>
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors font-medium"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Non-Government Disclosure Notice Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Important Facilitation Guidelines</span>
              </div>
              <p className="leading-relaxed">
                All communications and follow-ups are conducted through authorized representatives of NextGen Organisation. One Point does not solicit fees for government welfare approvals. Please keep your Submission ID safe for all future references.
              </p>
            </div>
          </div>

          {/* Right Column: Custom Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <EnquiryForm
              initialSchemeName="General Tech Zone / Student Assistance"
              initialCategory="other-opportunities"
              isSchemePage={false}
            />

            {/* FAQs Accordion */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                  >
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.q}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
