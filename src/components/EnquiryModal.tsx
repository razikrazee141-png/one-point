"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  schemeTitle?: string;
  schemeCategory?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  schemeTitle = "General Service Assistance",
  schemeCategory = "other-opportunities",
}: EnquiryModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
              ONE POINT • ASSURED TECH ZONE
            </span>
            <h4 className="text-base font-bold text-white leading-tight">
              Direct Enquiry & Support Request
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto p-2 sm:p-4">
          <EnquiryForm
            initialSchemeName={schemeTitle}
            initialCategory={schemeCategory}
            isSchemePage={schemeTitle !== "General Service Assistance"}
            className="border-0 shadow-none p-4"
          />
        </div>
      </div>
    </div>
  );
}
