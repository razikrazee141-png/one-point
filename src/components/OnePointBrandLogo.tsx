import React from "react";
import OnePointLogo from "./OnePointLogo";

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
  const logoVariant = variant === "dark" ? "light-bg" : "dark-bg";

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
