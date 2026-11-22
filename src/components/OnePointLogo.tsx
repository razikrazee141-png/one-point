import React from "react";
import Image from "next/image";
import Link from "next/link";

interface OnePointLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "dark-bg" | "light-bg";
  showTagline?: boolean;
  href?: string;
  priority?: boolean;
}

export default function OnePointLogo({
  className = "",
  size = "md",
  variant = "dark-bg",
  showTagline = false,
  href = "/",
  priority = false,
}: OnePointLogoProps) {
  // Exact dimensions based on original 1024 x 364 (2.81 : 1) transparent PNG asset
  const dimensions = {
    xs: { width: 84, height: 30 },
    sm: { width: 112, height: 40 },
    md: { width: 138, height: 49 },
    lg: { width: 180, height: 64 },
    xl: { width: 236, height: 84 },
  }[size];

  const isLightBg = variant === "light-bg";

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 
        Exact Official ONE POINT Transparent 3D Asset
        Features:
        - Polished 3D chrome "ONE" with integrated numeral 1 in N
        - 3D vibrant crimson red "POINT" with compass target mark in O
        - Metallic "ASSURED TECH ZONE" tracking subline
        - Red smile swoosh arrow underneath
        - 100% alpha transparency (no boxes, no borders)
      */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-200"
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <Image
          src="/images/onepoint-logo.png"
          alt="ONE POINT ASSURED TECH ZONE"
          width={dimensions.width}
          height={dimensions.height}
          priority={priority || size === "md" || size === "lg" || size === "xl"}
          className={`w-full h-auto object-contain select-none ${
            isLightBg
              ? "filter drop-shadow-sm contrast-105"
              : "filter drop-shadow-[0_2px_12px_rgba(255,150,63,0.15)] drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          }`}
        />
      </div>

      {showTagline && (
        <div className="hidden lg:flex flex-col border-l border-white/20 pl-3 leading-tight select-none">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF963F]">
            Public Tech Zone
          </span>
          <span
            className={`text-[10px] font-medium ${
              isLightBg ? "text-slate-500" : "text-[#F0EBFF]/70"
            }`}
          >
            NextGen Organisation
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus:outline-none transition-transform duration-200 hover:scale-[1.02] inline-block"
        aria-label="ONE POINT – ASSURED TECH ZONE"
      >
        {content}
      </Link>
    );
  }

  return content;
}
