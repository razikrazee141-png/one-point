import React from "react";
import OnePointLogo from "./OnePointLogo";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({
  className = "",
  variant = "light",
  showTagline = true,
  size = "md",
}: BrandLogoProps) {
  // Map variant to dark-bg or light-bg
  const logoVariant = variant === "light" ? "dark-bg" : "light-bg";

  return (
    <OnePointLogo
      className={className}
      size={size}
      variant={logoVariant}
      showTagline={showTagline}
      href="/"
    />
  );
}
