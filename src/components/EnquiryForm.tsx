"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  Phone,
  User,
  MapPin,
  Mail,
  GraduationCap,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";

interface EnquiryFormProps {
  initialSchemeName?: string;
  initialCategory?: string;
  isSchemePage?: boolean;
  formType?: "enquiry" | "student_application" | "service_request";
  onSuccessCallback?: (submissionId: string) => void;
  className?: string;
}

export default function EnquiryForm({
  initialSchemeName = "General Service Assistance",
  initialCategory = "other-opportunities",
  isSchemePage = false,
  formType,
  onSuccessCallback,
  className = "",
}: EnquiryFormProps) {
  const resolvedFormType =
    formType || (isSchemePage ? "student_application" : "enquiry");

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    district: "",
    taluk: "",
    qualification: "",
    schemeName: initialSchemeName,
    category: initialCategory,
    preferredContactMethod: "whatsapp",
    formType: resolvedFormType,
    message: "",
    consent: true,
    website_honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionId, setSubmissionId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Field change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (minimum 2 characters).";
    }

    const cleanedMobile = formData.mobileNumber.replace(/[^0-9]/g, "");
    if (!cleanedMobile) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (cleanedMobile.length !== 10) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      newErrors.mobileNumber = "Please enter a valid Indian mobile number starting with 6-9.";
    }

    if (!formData.district) {
      newErrors.district = "Please select your district.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      newErrors.message = "Please write a brief enquiry message (minimum 5 characters).";
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address or leave it blank.";
      }
    }

    if (!formData.consent) {
      newErrors.consent = "You must accept the facilitation and contact consent to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.error || "Unable to submit enquiry. Please check your details and try again."
        );
        return;
      }

      setSubmissionId(data.submissionId);
      setStatus("success");
      if (onSuccessCallback) {
        onSuccessCallback(data.submissionId);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("error");
      setErrorMessage("Network connection error. Please verify your connection and retry.");
    }
  };

  const handleCopyId = () => {
    if (submissionId) {
      navigator.clipboard.writeText(submissionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      mobileNumber: "",
      email: "",
      district: "",
      taluk: "",
      qualification: "",
      schemeName: initialSchemeName,
      category: initialCategory,
      preferredContactMethod: "whatsapp",
      formType: resolvedFormType,
      message: "",
      consent: true,
      website_honeypot: "",
    });
    setErrors({});
    setStatus("idle");
    setSubmissionId("");
  };

  if (status === "success") {
    return (
      <div className={`rounded-2xl bg-white border border-emerald-200 p-8 shadow-xl text-center animate-fade-in ${className}`}>
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Enquiry Registered Successfully!
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          Thank you for reaching out to <strong>ONE POINT – ASSURED TECH ZONE</strong>. Your enquiry has been safely recorded in our database.
        </p>

        {/* Unique Submission ID Badge */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto mb-6">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Unique Submission ID
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="font-mono text-xl font-bold text-blue-900 tracking-wider">
              {submissionId}
            </span>
            <button
              type="button"
              onClick={handleCopyId}
              title="Copy Submission ID"
              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-slate-200 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Please quote this ID for any follow-up with our support team.
          </span>
        </div>

        {/* Instant WhatsApp Follow-up button */}
        <div className="mb-6">
          <a
            href={`https://wa.me/918197803617?text=Hello%20One%20Point%20Team%2C%20I%20have%20submitted%20my%20enquiry%20with%20ID%20${submissionId}.%20Please%20guide%20me.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Fast-Track on WhatsApp: 8197803617</span>
          </a>
        </div>

        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 max-w-md mx-auto text-left mb-6 text-xs text-blue-900 space-y-1">
          <p className="font-semibold text-blue-950 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Next Steps:
          </p>
          <p>• Our student facilitation counsellor will review your details.</p>
          <p>• You will be contacted via WhatsApp or phone within 1–2 business working days.</p>
          <p>• Keep all your relevant educational marks and caste/income certificates ready.</p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors shadow-sm cursor-pointer"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-2xl bg-white border border-slate-200/80 p-6 md:p-8 shadow-xl ${className}`}
    >
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            One Point Assistance Desk
          </span>
          <span className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200/80 px-2 py-0.5 rounded font-medium">
            Direct Team Contact
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          {isSchemePage ? "Enquire About This Opportunity" : "General Enquiry Form"}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Fill in your details below. Our team at One Point Assured Tech Zone will review your query and reach out to you directly.
        </p>
      </div>

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
          <div>
            <p className="font-semibold text-red-900">Submission Error</p>
            <p className="text-xs mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Hidden honeypot trap for spam prevention */}
      <input
        type="text"
        name="website_honeypot"
        value={formData.website_honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-4 text-sm">
        {/* Scheme Name - Automatically Populated */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Scheme / Opportunity Name <span className="text-slate-400 font-normal">(Auto-populated)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="schemeName"
              value={formData.schemeName}
              readOnly={isSchemePage}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border ${
                isSchemePage
                  ? "bg-slate-100/80 text-slate-700 border-slate-300 font-medium cursor-not-allowed"
                  : "bg-white text-slate-900 border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              } text-xs sm:text-sm`}
            />
          </div>
        </div>

        {/* Full Name & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Enter applicant's full name"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border ${
                  errors.fullName ? "border-red-500 bg-red-50/20" : "border-slate-300 focus:border-blue-600"
                } text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors`}
              />
            </div>
            {errors.fullName && (
              <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number (WhatsApp Preferred) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                name="mobileNumber"
                placeholder="10-digit mobile number"
                maxLength={10}
                value={formData.mobileNumber}
                onChange={handleChange}
                className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border ${
                  errors.mobileNumber ? "border-red-500 bg-red-50/20" : "border-slate-300 focus:border-blue-600"
                } text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors`}
              />
            </div>
            {errors.mobileNumber && (
              <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.mobileNumber}</p>
            )}
          </div>
        </div>

        {/* District & Taluk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              District (Karnataka) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`w-full pl-9 pr-8 py-2.5 rounded-xl border bg-white ${
                  errors.district ? "border-red-500 bg-red-50/20" : "border-slate-300 focus:border-blue-600"
                } text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors`}
              >
                <option value="">-- Select Your District --</option>
                {siteConfig.districtsKarnataka.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
            {errors.district && (
              <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.district}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Taluk / City / Institution <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="taluk"
              placeholder="e.g. North Taluk / College Name"
              value={formData.taluk}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* Email & Education Qualification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border ${
                  errors.email ? "border-red-500 bg-red-50/20" : "border-slate-300 focus:border-blue-600"
                } text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Education / Course <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="qualification"
                placeholder="e.g. B.Sc Nursing, MBBS, B.E., PUC"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Contact Channel
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <label
              className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                formData.preferredContactMethod === "whatsapp"
                  ? "border-emerald-500 bg-emerald-50/50 text-emerald-900 font-semibold"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="preferredContactMethod"
                value="whatsapp"
                checked={formData.preferredContactMethod === "whatsapp"}
                onChange={handleChange}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Message</span>
            </label>

            <label
              className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                formData.preferredContactMethod === "phone"
                  ? "border-blue-500 bg-blue-50/50 text-blue-900 font-semibold"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="preferredContactMethod"
                value="phone"
                checked={formData.preferredContactMethod === "phone"}
                onChange={handleChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Direct Phone Call</span>
            </label>
          </div>
        </div>

        {/* Enquiry Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Enquiry Details & Question <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="Please specify what assistance you need (e.g. eligibility check, required documents, SSP portal help, nursing incentive guidance)..."
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded-xl border ${
              errors.message ? "border-red-500 bg-red-50/20" : "border-slate-300 focus:border-blue-600"
            } text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors`}
          />
          {errors.message && (
            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.message}</p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              I agree to be contacted by <strong>ONE POINT – ASSURED TECH ZONE</strong> representatives regarding my enquiry. I understand that One Point is an independent service facilitator operating under NextGen Organisation and does not guarantee government approval.
            </span>
          </label>
          {errors.consent && (
            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.consent}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Recording in System...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Enquiry / Request Contact</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-center text-slate-400 pt-1">
          🔒 Secure submission • Stored directly in NextGen Cloud Database
        </p>
      </div>
    </form>
  );
}
