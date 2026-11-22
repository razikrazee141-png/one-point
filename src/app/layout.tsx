import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ONE POINT – ASSURED TECH ZONE | Education. Empowerment. Digital Accessibility.",
    template: "%s | ONE POINT – ASSURED TECH ZONE",
  },
  description:
    "Discover educational opportunities, scholarships, education loans, government welfare schemes, and essential digital public services through one trusted destination. Operating under NextGen Organisation.",
  keywords: [
    "One Point",
    "Assured Tech Zone",
    "NextGen Organisation",
    "Karnataka Educational Schemes",
    "Scholarships",
    "Education Loans",
    "Government Welfare Schemes",
    "Digital Services Assistance",
    "Public Service Portal",
  ],
  authors: [{ name: "ONE POINT – NextGen Organisation" }],
  openGraph: {
    title: "ONE POINT – ASSURED TECH ZONE",
    description:
      "One destination. Multiple solutions. Better opportunities. Simplifying access to educational opportunities and welfare schemes.",
    url: "https://onepointtechzone.org",
    siteName: "ONE POINT",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
