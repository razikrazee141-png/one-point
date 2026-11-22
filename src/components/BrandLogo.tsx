import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({
  className = "",
  variant = "dark",
  showTagline = true,
  size = "md",
}: BrandLogoProps) {
  // Dimension profiles
  const dimensions = {
    sm: { width: 140, height: 40, container: "h-10" },
    md: { width: 175, height: 50, container: "h-12" },
    lg: { width: 210, height: 60, container: "h-14 sm:h-16" },
  }[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 transition-transform duration-200 hover:scale-[1.01] focus:outline-none ${className}`}
      aria-label="ONE POINT – ASSURED TECH ZONE"
    >
      {/* Official 3D Typography Logo */}
      <div
        className={`relative ${dimensions.container} flex items-center justify-center rounded-xl p-1 shrink-0 ${
          variant === "light"
            ? "bg-slate-900/90 border border-slate-700/80 shadow-md"
            : "bg-white/95 border border-slate-200/90 shadow-sm"
        }`}
        style={{ width: dimensions.width }}
      >
        <Image
          src="/images/one-point-logo.jpg"
          alt="ONE POINT ASSURED TECH ZONE Official Logo"
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain h-full w-auto rounded-lg"
          priority
        />
      </div>

      {showTagline && (
        <div className="hidden sm:flex flex-col border-l border-slate-300 dark:border-slate-700 pl-3 leading-tight select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            <span
              className={`text-[11px] font-extrabold tracking-wider uppercase font-mono ${
                variant === "light" ? "text-slate-200" : "text-slate-800"
              }`}
            >
              Public Tech Zone
            </span>
          </div>
          <span
            className={`text-[10px] font-medium tracking-normal ${
              variant === "light" ? "text-slate-400" : "text-slate-500"
            }`}
          >
            NextGen Organisation
          </span>
        </div>
      )}
    </Link>
  );
}
