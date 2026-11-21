import Link from "next/link";
import { ShieldCheck, Info } from "lucide-react";

interface Props {
  compact?: boolean;
  className?: string;
}

export default function IndependentDisclaimerBanner({
  compact = false,
  className = "",
}: Props) {
  if (compact) {
    return (
      <div
        className={`bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 ${className}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              <Info className="w-3 h-3" /> Independent Entity
            </span>
            <span className="hidden sm:inline text-slate-300">
              ONE POINT is an independent digital public service & student-support organisation operating under NextGen Organisation.
            </span>
            <span className="sm:hidden text-slate-300">
              Independent organisation under NextGen.
            </span>
          </div>
          <Link
            href="/about"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 shrink-0 font-medium"
          >
            Learn More
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-900/40 p-6 md:p-8 text-white shadow-xl ${className}`}
    >
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-amber-400 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg font-bold text-white">
                Official Independent Facilitation Notice
              </h3>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                NextGen Organisation
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              <strong>ONE POINT – ASSURED TECH ZONE</strong> is an independent service organisation operating under <strong>NextGen Organisation</strong>. We are NOT a government department or government-authorised entity unless specific authorisations are separately established. Our purpose is to provide transparent digital assistance, documentation support, and educational facilitation.
            </p>
          </div>
        </div>

        <Link
          href="/about"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wide transition-colors border border-white/15 whitespace-nowrap shrink-0"
        >
          Read Our Mandate
        </Link>
      </div>
    </div>
  );
}
