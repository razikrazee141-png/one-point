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
    xs: 30,
    sm: 38,
    md: 46,
    lg: 58,
    xl: 74,
  }[size];

  // Aspect ratio is approx 415 : 115 (3.6 : 1)
  const width = Math.round(heights * 3.6);

  const isLightBg = variant === "light-bg";

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 415 115"
        width={width}
        height={heights}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-label="ONE POINT ASSURED TECH ZONE"
      >
        <defs>
          {/* Metallic Chrome Silver Gradient for ONE and ASSURED TECH ZONE */}
          <linearGradient id="chromeSilver" x1="0" y1="0" x2="0" y2="100%">
            {isLightBg ? (
              <>
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="25%" stopColor="#334155" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="75%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#F8FAFC" />
                <stop offset="45%" stopColor="#E2E8F0" />
                <stop offset="55%" stopColor="#94A3B8" />
                <stop offset="85%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#475569" />
              </>
            )}
          </linearGradient>

          {/* Chrome Edge Bevel Gradient for 3D realism */}
          <linearGradient id="chromeHighlight" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={isLightBg ? "0.3" : "0.8"} />
            <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={isLightBg ? "0.2" : "0.6"} />
          </linearGradient>

          {/* Vibrant 3D Red Gradient for POINT and SWOOSH */}
          <linearGradient id="vibrantRed" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#FF3838" />
            <stop offset="40%" stopColor="#EE1D23" />
            <stop offset="80%" stopColor="#D80E14" />
            <stop offset="100%" stopColor="#A8070C" />
          </linearGradient>

          {/* Red Highlight Bevel */}
          <linearGradient id="redBevel" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#FFA3A6" />
            <stop offset="30%" stopColor="#FF3838" />
            <stop offset="100%" stopColor="#B3050A" />
          </linearGradient>

          {/* Subtle 3D Depth Shadow */}
          <filter id="logoShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="2"
              floodColor="#000000"
              floodOpacity={isLightBg ? "0.25" : "0.6"}
            />
          </filter>

          <filter id="redSwooshShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#EE1D23"
              floodOpacity="0.4"
            />
          </filter>
        </defs>

        {/* =========================================================================
            LAYER 1: "ONE" (Metallic Polished 3D Silver Chrome)
           ========================================================================= */}
        <g filter="url(#logoShadow)">
          {/* Letter 'O' */}
          <path
            d="M 12 37 C 12 21 24 10 40 10 C 56 10 68 21 68 37 C 68 53 56 64 40 64 C 24 64 12 53 12 37 Z M 27 37 C 27 47 32 53 40 53 C 48 53 53 47 53 37 C 53 27 48 21 40 21 C 32 21 27 27 27 37 Z"
            fill="url(#chromeSilver)"
            stroke="url(#chromeHighlight)"
            strokeWidth="0.75"
          />

          {/* Stylized Number '1' (Taller, Nestled between O and N with bevel) */}
          <path
            d="M 68 18 L 81 8 L 88 8 L 88 64 L 74 64 L 74 23 L 68 27 Z"
            fill="url(#chromeSilver)"
            stroke="url(#chromeHighlight)"
            strokeWidth="0.75"
          />

          {/* Letter 'N' */}
          <path
            d="M 94 12 L 108 12 L 129 44 L 129 12 L 142 12 L 142 64 L 128 64 L 107 32 L 107 64 L 94 64 Z"
            fill="url(#chromeSilver)"
            stroke="url(#chromeHighlight)"
            strokeWidth="0.75"
          />

          {/* Letter 'E' */}
          <path
            d="M 148 12 L 183 12 L 183 23 L 162 23 L 162 32 L 180 32 L 180 43 L 162 43 L 162 53 L 184 53 L 184 64 L 148 64 Z"
            fill="url(#chromeSilver)"
            stroke="url(#chromeHighlight)"
            strokeWidth="0.75"
          />
        </g>

        {/* =========================================================================
            LAYER 2: "POINT" (Vibrant 3D Crimson Red with Compass Target Icon in 'O')
           ========================================================================= */}
        <g filter="url(#logoShadow)">
          {/* Letter 'P' */}
          <path
            d="M 197 12 L 221 12 C 231 12 238 18 238 27 C 238 36 231 42 221 42 L 211 42 L 211 64 L 197 64 Z M 211 22 L 211 32 L 220 32 C 224 32 226 30 226 27 C 226 24 224 22 220 22 Z"
            fill="url(#vibrantRed)"
            stroke="url(#redBevel)"
            strokeWidth="0.75"
          />

          {/* Letter 'O' with Directional Compass Navigation Arrow (The Core Mark) */}
          <g>
            {/* Outer Circular Ring */}
            <path
              d="M 242 38 C 242 22 254 10 270 10 C 286 10 298 22 298 38 C 298 54 286 66 270 66 C 254 66 242 54 242 38 Z M 256 38 C 256 48 261 54 270 54 C 279 54 284 48 284 38 C 284 28 279 22 270 22 C 261 22 256 28 256 38 Z"
              fill="url(#vibrantRed)"
              stroke="url(#redBevel)"
              strokeWidth="0.75"
            />
            {/* Stylized Diagonal Arrow / Pin Marker pointing Up-Right */}
            <path
              d="M 261 47 L 270 27 L 280 43 L 273 40 L 271 47 Z"
              fill="#FFFFFF"
              opacity="0.95"
            />
            <path
              d="M 264 45 L 270 30 L 277 42 L 272 40 Z"
              fill="url(#vibrantRed)"
            />
          </g>

          {/* Letter 'I' */}
          <path
            d="M 304 12 L 317 12 L 317 64 L 304 64 Z"
            fill="url(#vibrantRed)"
            stroke="url(#redBevel)"
            strokeWidth="0.75"
          />

          {/* Letter 'N' */}
          <path
            d="M 323 12 L 337 12 L 358 44 L 358 12 L 371 12 L 371 64 L 357 64 L 336 32 L 336 64 L 323 64 Z"
            fill="url(#vibrantRed)"
            stroke="url(#redBevel)"
            strokeWidth="0.75"
          />

          {/* Letter 'T' */}
          <path
            d="M 368 12 L 398 12 L 398 23 L 388 23 L 388 64 L 376 64 L 376 23 L 368 23 Z"
            fill="url(#vibrantRed)"
            stroke="url(#redBevel)"
            strokeWidth="0.75"
          />
        </g>

        {/* =========================================================================
            LAYER 3: "ASSURED TECH ZONE" (Polished Tracking Font)
           ========================================================================= */}
        <text
          x="205"
          y="83"
          textAnchor="middle"
          fill="url(#chromeSilver)"
          fontSize="13"
          fontWeight="800"
          letterSpacing="0.28em"
          fontFamily="system-ui, -apple-system, sans-serif"
          filter="url(#logoShadow)"
        >
          ASSURED TECH ZONE
        </text>

        {/* =========================================================================
            LAYER 4: RED SMILE SWOOSH ARROW (Underneath ASSURED TECH ZONE)
           ========================================================================= */}
        <g filter="url(#redSwooshShadow)">
          {/* Smooth Smile Swoop Arc */}
          <path
            d="M 125 88 C 170 108 240 108 290 89 C 285 96 235 116 125 88 Z"
            fill="url(#vibrantRed)"
          />
          {/* Dynamic Arrowhead pointing up-right at the end of swoosh */}
          <path
            d="M 284 83 L 302 91 L 289 101 L 291 93 Z"
            fill="url(#vibrantRed)"
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
