import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showTagline?: boolean;
}

export default function BrandLogo({
  className = "",
  variant = "dark",
  showTagline = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-opacity hover:opacity-95 ${className}`}
    >
      <div className="relative flex items-center justify-center h-11 w-11 rounded-xl bg-slate-900 border border-slate-700/60 shadow-sm overflow-hidden p-1 shrink-0">
        <Image
          src="/images/one-point-logo.jpg"
          alt="ONE POINT ASSURED TECH ZONE Logo"
          width={44}
          height={44}
          className="object-contain"
          priority
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black text-xl tracking-tight ${
              variant === "light" ? "text-white" : "text-slate-900"
            }`}
          >
            ONE <span className="text-red-600">POINT</span>
          </span>
        </div>
        <span
          className={`text-[9px] font-bold tracking-widest uppercase mt-0.5 ${
            variant === "light" ? "text-amber-400" : "text-blue-900"
          }`}
        >
          ASSURED TECH ZONE
        </span>
        {showTagline && (
          <span
            className={`text-[10px] mt-0.5 hidden sm:inline-block ${
              variant === "light" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Education • Empowerment • Digital Accessibility
          </span>
        )}
      </div>
    </Link>
  );
}
