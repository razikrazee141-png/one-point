import React from "react";
import Link from "next/link";

interface OnePointLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "dark-bg" | "light-bg";
  showTagline?: boolean;
  href?: string;
}

export default function OnePointLogo({
  className = "",
  size = "md",
  variant = "dark-bg",
  showTagline = false,
  href = "/",
}: OnePointLogoProps) {
  // Height profiles for different contexts
  const heights = {
    xs: 28,
    sm: 36,
    md: 44,
    lg: 56,
    xl: 72,
  }[size];

  // Aspect ratio is approx 422 : 112 (3.77 : 1)
  const width = Math.round(heights * 3.77);

  const isLightBg = variant === "light-bg";

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 422 112"
        width={width}
        height={heights}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-label="ONE POINT ASSURED TECH ZONE"
      >
        <defs>
          {/* Metallic Chrome Silver Gradient for ONE and ASSURED TECH ZONE */}
          <linearGradient id="chromeSilverGrad" x1="0" y1="0" x2="0" y2="100%">
            {isLightBg ? (
              <>
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="25%" stopColor="#334155" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="75%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#020617" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#F1F5F9" />
                <stop offset="45%" stopColor="#CBD5E1" />
                <stop offset="55%" stopColor="#94A3B8" />
                <stop offset="85%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#475569" />
              </>
            )}
          </linearGradient>

          {/* Chrome Edge Bevel Gradient for 3D realism */}
          <linearGradient id="chromeBevelGrad" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={isLightBg ? "0.3" : "0.85"} />
            <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={isLightBg ? "0.2" : "0.6"} />
          </linearGradient>

          {/* Vibrant 3D Red Gradient for POINT and SWOOSH */}
          <linearGradient id="vibrantRedGrad" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#FF3838" />
            <stop offset="35%" stopColor="#EE1D23" />
            <stop offset="75%" stopColor="#D80E14" />
            <stop offset="100%" stopColor="#990509" />
          </linearGradient>

          {/* Red Highlight Bevel */}
          <linearGradient id="redBevelGrad" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#FFA3A6" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FF3838" />
            <stop offset="100%" stopColor="#B3050A" />
          </linearGradient>

          {/* Paper Airplane Arrow Shading */}
          <linearGradient id="arrowWhiteFacet" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Drop Shadows */}
          <filter id="logoShadowFilter" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="2.5"
              floodColor="#000000"
              floodOpacity={isLightBg ? "0.2" : "0.65"}
            />
          </filter>

          <filter id="redSwooshFilter" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2.5"
              floodColor="#EE1D23"
              floodOpacity="0.45"
            />
          </filter>
        </defs>

        {/* =========================================================================
            LAYER 1: "ONE" (Metallic Polished 3D Silver Chrome)
            NOTE: The numeral "1" is uniquely integrated as the first upright of "N"
           ========================================================================= */}
        <g filter="url(#logoShadowFilter)">
          {/* Letter 'O' */}
          <path
            d="M 44 16 C 58 16 70 26 70 39 C 70 52 58 62 44 62 C 30 62 18 52 18 39 C 18 26 30 16 44 16 Z M 44 27 C 51 27 57 32 57 39 C 57 46 51 51 44 51 C 37 51 31 46 31 39 C 31 32 37 27 44 27 Z"
            fill="url(#chromeSilverGrad)"
            stroke="url(#chromeBevelGrad)"
            strokeWidth="0.75"
          />

          {/* Integrated '1-N' Ligature: Numeral "1" forms the taller left pillar of "N" */}
          <g>
            {/* The Numeral "1" (Taller Left Pillar with sharp top-left beak) */}
            <path
              d="M 86 62 L 86 17 L 72 16 L 86 4 L 99 4 L 99 62 Z"
              fill="url(#chromeSilverGrad)"
              stroke="url(#chromeBevelGrad)"
              strokeWidth="0.75"
            />

            {/* Diagonal stroke of the 'N' connecting from shoulder of 1 */}
            <path
              d="M 99 16 L 125 62 L 138 62 L 112 16 Z"
              fill="url(#chromeSilverGrad)"
              stroke="url(#chromeBevelGrad)"
              strokeWidth="0.75"
            />

            {/* Right Upright of the 'N' */}
            <path
              d="M 125 16 L 138 16 L 138 62 L 125 62 Z"
              fill="url(#chromeSilverGrad)"
              stroke="url(#chromeBevelGrad)"
              strokeWidth="0.75"
            />

            {/* Specular 3D highlight bevel on the tip of the '1' beak */}
            <path
              d="M 72 16 L 86 4 L 99 4"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity={isLightBg ? 0.4 : 0.85}
            />
          </g>

          {/* Letter 'E' */}
          <path
            d="M 150 16 L 184 16 L 184 26 L 162 26 L 162 34 L 179 34 L 179 43 L 162 43 L 162 52 L 184 52 L 184 62 L 150 62 Z"
            fill="url(#chromeSilverGrad)"
            stroke="url(#chromeBevelGrad)"
            strokeWidth="0.75"
          />
        </g>

        {/* =========================================================================
            LAYER 2: "POINT" (Vibrant 3D Crimson Red with Navigation Needle in 'O')
           ========================================================================= */}
        <g filter="url(#logoShadowFilter)">
          {/* Letter 'P' */}
          <path
            d="M 200 16 L 224 16 C 234 16 238 22 238 29 C 238 36 234 42 224 42 L 212 42 L 212 62 L 200 62 Z M 212 25 L 212 33 L 223 33 C 226 33 227 31 227 29 C 227 27 226 25 223 25 Z"
            fill="url(#vibrantRedGrad)"
            stroke="url(#redBevelGrad)"
            strokeWidth="0.75"
          />

          {/* Letter 'O' with Dynamic Paper-Airplane Navigation Compass Needle */}
          <g>
            {/* Outer Red Ring */}
            <path
              d="M 271 16 C 286 16 298 26 298 39 C 298 52 286 62 271 62 C 256 62 244 52 244 39 C 244 26 256 16 271 16 Z M 271 27 C 278 27 285 32 285 39 C 285 46 278 51 271 51 C 264 51 257 46 257 39 C 257 32 264 27 271 27 Z"
              fill="url(#vibrantRedGrad)"
              stroke="url(#redBevelGrad)"
              strokeWidth="0.75"
            />

            {/* 3D Paper-Airplane Navigation Arrow pointing UP-RIGHT (Northeast) */}
            <g>
              {/* White/Silver Specular Left Wing */}
              <path
                d="M 284 26 L 260 42 L 269 40 Z"
                fill="url(#arrowWhiteFacet)"
                filter="url(#logoShadowFilter)"
              />
              {/* Crimson Shadow Right Wing */}
              <path
                d="M 284 26 L 269 40 L 278 48 Z"
                fill="url(#vibrantRedGrad)"
              />
              {/* Center Crease Highlight */}
              <path
                d="M 284 26 L 269 40"
                stroke="#FFFFFF"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </g>
          </g>

          {/* Letter 'I' */}
          <path
            d="M 304 16 L 316 16 L 316 62 L 304 62 Z"
            fill="url(#vibrantRedGrad)"
            stroke="url(#redBevelGrad)"
            strokeWidth="0.75"
          />

          {/* Letter 'N' */}
          <path
            d="M 324 16 L 336 16 L 350 48 L 350 16 L 362 16 L 362 62 L 350 62 L 336 30 L 336 62 L 324 62 Z"
            fill="url(#vibrantRedGrad)"
            stroke="url(#redBevelGrad)"
            strokeWidth="0.75"
          />

          {/* Letter 'T' */}
          <path
            d="M 370 16 L 404 16 L 404 26 L 393 26 L 393 62 L 381 62 L 381 26 L 370 26 Z"
            fill="url(#vibrantRedGrad)"
            stroke="url(#redBevelGrad)"
            strokeWidth="0.75"
          />
        </g>

        {/* =========================================================================
            LAYER 3: "ASSURED TECH ZONE" (Polished Tracking Font)
           ========================================================================= */}
        <text
          x="211"
          y="80"
          textAnchor="middle"
          fill="url(#chromeSilverGrad)"
          fontSize="12.5"
          fontWeight="800"
          letterSpacing="0.32em"
          fontFamily="system-ui, -apple-system, sans-serif"
          filter="url(#logoShadowFilter)"
        >
          ASSURED TECH ZONE
        </text>

        {/* =========================================================================
            LAYER 4: RED SMILE SWOOSH ARROW (Underneath ASSURED TECH ZONE)
           ========================================================================= */}
        <g filter="url(#redSwooshFilter)">
          {/* Smooth Smile Swoop Arc */}
          <path
            d="M 135 86 C 175 106 245 106 284 88 C 280 94 240 112 135 86 Z"
            fill="url(#vibrantRedGrad)"
          />
          {/* Dynamic Arrowhead pointing up-right at the end of swoosh */}
          <path
            d="M 278 82 L 296 90 L 284 99 L 286 92 Z"
            fill="url(#vibrantRedGrad)"
          />
        </g>
      </svg>

      {showTagline && (
        <div className="hidden lg:flex flex-col border-l border-white/20 pl-3 leading-tight select-none">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF963F]">
            Public Tech Zone
          </span>
          <span className={`text-[10px] font-medium ${isLightBg ? "text-slate-500" : "text-[#F0EBFF]/70"}`}>
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
      >
        {content}
      </Link>
    );
  }

  return content;
}
