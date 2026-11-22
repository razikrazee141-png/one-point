import React from "react";
import Image from "next/image";
import Link from "next/link";

interface OnePointBrandLogoProps {
  className?: string;
  variant?: "light" | "dark" | "default";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function OnePointBrandLogo({
  className = "",
  variant = "default",
  showTagline = true,
  size = "md",
}: OnePointBrandLogoProps) {
  // Height and dimensions depending on size
  const heightClasses = {
    sm: "h-9",
    md: "h-11 sm:h-12",
    lg: "h-14 sm:h-16",
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}
      aria-label="ONE POINT – ASSURED TECH ZONE"
    >
      {/* 3D Logo Image or Stylized Typo */}
      <div className={`relative ${heightClasses} aspect-[3/1] flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]`}>
        <Image
          src="/images/one-point-logo.jpg"
          alt="ONE POINT ASSURED TECH ZONE"
          fill
          className="object-contain filter drop-shadow-sm rounded-lg"
          priority
        />
      </div>

      {showTagline && (
        <div className="hidden xl:flex flex-col border-l border-slate-300 dark:border-slate-700/80 pl-3 leading-tight">
          <span className="text-[11px] font-bold tracking-wider text-royal-700 dark:text-royal-400 uppercase">
            Official Tech Zone
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-normal">
            NextGen Organisation
          </span>
        </div>
      )}
    </Link>
  );
}
