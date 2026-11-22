"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getFeaturedSchemes } from "@/data/schemes";
import SchemeCard from "@/components/SchemeCard";
import EnquiryModal from "@/components/EnquiryModal";
import IndependentDisclaimerBanner from "@/components/IndependentDisclaimerBanner";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import OnePointLogo from "@/components/OnePointLogo";
import {
  GraduationCap,
  Building2,
  FileCheck,
  Cpu,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  CheckCircle2,
  HelpCircle,
  Users,
  Compass,
  Laptop,
  CheckCheck,
  Sparkles,
  Calendar,
  Layers,
  Award,
  BookOpen,
  ArrowUpRight,
  HeartHandshake,
  Star,
  Quote,
  Clock,
  Landmark,
  BadgeCheck,
} from "lucide-react";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredSchemes = getFeaturedSchemes();

  // 1. Service Cards (Section 6: Explore Our Services) - Featuring Indian Student, Karnataka Vidhana Soudha & Rural Guidance Imagery
  const serviceCards = [
    {
      id: "education-scholarships",
      title: "Education & Scholarships",
      description:
        "Comprehensive assistance for state and central scholarships, fee reimbursement schemes, nursing incentives, and pre-matric to post-matric grants.",
      image: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?q=80&w=800&auto=format&fit=crop",
      badge: "Education",
      link: "/services#education",
    },
    {
      id: "government-schemes",
      title: "Government Schemes",
      description:
        "Independent verification and digital assistance for state citizen welfare, social security, minority welfare schemes, and Seva Sindhu services.",
      image: "https://images.unsplash.com/photo-1709967884183-7ffa9d168508?q=80&w=800&auto=format&fit=crop",
      badge: "Welfare",
      link: "/services#welfare",
    },
    {
      id: "student-guidance",
      title: "Student & Career Guidance",
      description:
        "Personalized documentation checklists, higher education loan guidance, college entrance admissions support, and career pathway counseling.",
      image: "/images/indian-student-hero.jpg",
      badge: "Guidance",
      link: "/services#education",
    },
    {
      id: "digital-public-services",
      title: "Digital Public Services",
      description:
        "Reliable tech assistance for online certificate applications, RD number verification, document digitization, and public digital portal submissions.",
      image: "https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?q=80&w=800&auto=format&fit=crop",
      badge: "Digital",
      link: "/services#digital",
    },
  ];

  // 2. Four Steps (Section 7: How It Works)
  const workflowSteps = [
    {
      number: "01",
      name: "Discover",
      title: "Explore Opportunities",
      desc: "Browse our curated directory of educational scholarships, subsidized loans, welfare schemes, and admissions.",
      icon: <Compass className="w-6 h-6 text-[#FF963F]" />,
    },
    {
      number: "02",
      name: "Apply",
      title: "Submit Requirements",
      desc: "Submit your basic details online using our unified enquiry form with your district and academic profile.",
      icon: <FileCheck className="w-6 h-6 text-[#FF963F]" />,
    },
    {
      number: "03",
      name: "Connect",
      title: "Review & Validate",
      desc: "Our team evaluates your eligibility criteria and assists you with compiling the exact required certificates.",
      icon: <Users className="w-6 h-6 text-[#FF963F]" />,
    },
    {
      number: "04",
      name: "Get Guidance",
      title: "Assisted Application",
      desc: "Receive step-by-step assistance to apply directly on official government or institutional portals safely.",
      icon: <CheckCheck className="w-6 h-6 text-[#FF963F]" />,
    },
  ];

  // 3. Pastel Categories (Section 8: Popular Service Categories)
  const pastelCategories = [
    {
      title: "Scholarships",
      desc: "Pre & Post-Matric, Nursing, Minority",
      bg: "bg-[#F0EBFF] hover:bg-[#E6DDFF] border-[#E0D4FF]",
      textColor: "text-[#6546C8]",
      icon: <GraduationCap className="w-6 h-6 text-[#6546C8]" />,
      link: "/schemes?category=scholarships",
    },
    {
      title: "Education Loans",
      desc: "Bank Subsidy & Low-Interest Schemes",
      bg: "bg-[#ECFDF5] hover:bg-[#D1FAE5] border-[#A7F3D0]",
      textColor: "text-emerald-700",
      icon: <Landmark className="w-6 h-6 text-emerald-600" />,
      link: "/schemes?category=education-loans",
    },
    {
      title: "Government Benefits",
      desc: "State Welfare & Citizen Programmes",
      bg: "bg-[#FFFBEB] hover:bg-[#FEF3C7] border-[#FDE68A]",
      textColor: "text-amber-800",
      icon: <HeartHandshake className="w-6 h-6 text-amber-600" />,
      link: "/schemes?category=government-welfare",
    },
    {
      title: "Career Guidance",
      desc: "Admissions, Degrees & Skill Desks",
      bg: "bg-[#F0F9FF] hover:bg-[#E0F2FE] border-[#BAE6FD]",
      textColor: "text-sky-800",
      icon: <BookOpen className="w-6 h-6 text-sky-600" />,
      link: "/services#education",
    },
    {
      title: "Digital Assistance",
      desc: "Online Portals, Documentation, KYC",
      bg: "bg-[#FFF1F2] hover:bg-[#FFE4E6] border-[#FECDD3]",
      textColor: "text-rose-800",
      icon: <Cpu className="w-6 h-6 text-rose-600" />,
      link: "/services#digital",
    },
  ];

  // 4. Testimonials (Section 11)
  const testimonials = [
    {
      name: "Syed Rehan",
      role: "B.Sc Nursing Student, Mangaluru",
      district: "Dakshina Kannada",
      quote:
        "OnePoint helped me verify my RD caste-income certificate and guided me through the Karnataka Nursing Incentive Scheme application on Seva Sindhu without paying any middlemen fees.",
      rating: 5,
    },
    {
      name: "Pooja Hegde",
      role: "Engineering 3rd Year, Bengaluru",
      district: "Bengaluru Urban",
      quote:
        "The fee reimbursement additional window dates were clearly explained. Their checklist prevented my application from being rejected due to mismatching marks cards.",
      rating: 5,
    },
    {
      name: "Anil Kumar",
      role: "Post-Graduate Scholar, Mysuru",
      district: "Mysuru",
      quote:
        "Very professional and transparent team. They guided me through the SSP scholarship submission step-by-step and answered all my questions on WhatsApp promptly.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col bg-white text-[#191725] selection:bg-[#FF963F] selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO SECTION — CINEMATIC AND IMPACTFUL
         ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#130D29] via-[#1D143D] to-[#130D29] text-white pt-10 pb-28 md:pt-16 md:pb-36">
        {/* Subtle architectural grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6546C812_1px,transparent_1px),linear-gradient(to_bottom,#6546C812_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Cinematic ambient glows (Orange & Royal Purple) */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#6546C8]/25 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-[#FF963F]/20 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Authentic OnePoint Vector Brand Mark */}
              <div className="mb-2">
                <OnePointLogo size="lg" variant="dark-bg" showTagline={false} />
              </div>

              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#FF963F]/40 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF963F] animate-pulse" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF963F]">
                  Digital Public Service &amp; Student Support
                </span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="text-[11px] text-[#F0EBFF] font-medium hidden sm:inline">
                  NextGen Organisation
                </span>
              </div>

              {/* Large Cinematic Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]">
                Your <span className="text-[#FF963F]">Opportunities</span>. <br />
                Our <span className="text-[#FF963F]">Commitment</span>. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F0EBFF] to-[#FF963F]">
                  OnePoint.
                </span>
              </h1>

              {/* Subheading Description */}
              <p className="text-base sm:text-xl text-[#F0EBFF]/90 font-normal leading-relaxed max-w-xl">
                Discover educational opportunities, access government scheme guidance and get essential digital services — all through one trusted destination.
              </p>

              {/* Tagline Statement */}
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#FF963F]/90">
                &quot;Everything You Need. All in One Point.&quot;
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {/* Button 1: Explore Our Services */}
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#6546C8] to-[#FF963F] hover:from-[#5435B5] hover:to-[#F28528] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Button 2: Get Assistance Modal */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F0EBFF] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all border border-white/20 backdrop-blur-md active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#FF963F]" />
                  <span>Get Assistance</span>
                </button>

                {/* Button 3: Official WhatsApp Channel */}
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-95"
                  title="Official WhatsApp Assistance"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>

              {/* Verified Trust Strip under CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-[#F0EBFF]/75">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#FF963F]" />
                  <span>100% Independent Guidance</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  <span>Serving All 31 Karnataka Districts</span>
                </span>
              </div>
            </div>

            {/* Right Column: Photograph with Floating Glassmorphic Cards */}
            <div className="lg:col-span-5 relative">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#6546C8] to-[#FF963F] opacity-30 blur-2xl rounded-3xl" />

              {/* Main Photograph Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#1D143D]/60 aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src="/images/indian-student-hero.jpg"
                  alt="Indian student on campus at OnePoint"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Gradient Overlays for Cinematic Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#130D29] via-[#130D29]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6546C8]/30 via-transparent to-[#FF963F]/20" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#130D29]/80 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#FF963F] tracking-wider block">
                        Student Assistance Network
                      </span>
                      <h4 className="text-sm font-bold text-white">Karnataka Digital Access Hub</h4>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: Top-Left (Education Support) */}
              <div className="absolute -top-6 -left-6 sm:-left-10 bg-[#130D29]/90 backdrop-blur-xl border border-white/20 text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-float hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-[#6546C8]/30 border border-[#6546C8]/50 flex items-center justify-center text-[#FF963F]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#FF963F] tracking-wider block">
                    Education Support
                  </span>
                  <span className="text-xs font-bold text-white">Scholarships &amp; Loans</span>
                </div>
              </div>

              {/* Floating Card 2: Top-Right (Government Schemes) */}
              <div className="absolute top-10 -right-6 sm:-right-8 bg-[#130D29]/90 backdrop-blur-xl border border-white/20 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-float-delayed hidden sm:flex">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                    Welfare Schemes
                  </span>
                  <span className="text-xs font-bold text-white">Verified Eligibility</span>
                </div>
              </div>

              {/* Floating Card 3: Bottom-Left (Student Guidance) */}
              <div className="absolute bottom-20 -left-6 sm:-left-8 bg-[#130D29]/90 backdrop-blur-xl border border-white/20 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-float hidden sm:flex">
                <div className="w-9 h-9 rounded-xl bg-[#FF963F]/20 border border-[#FF963F]/40 flex items-center justify-center text-[#FF963F]">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#FF963F] tracking-wider block">
                    Student Guidance
                  </span>
                  <span className="text-xs font-bold text-white">Admissions &amp; Career</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRUST HIGHLIGHT STRIP (FLOATING OVERLAP)
         ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-18 z-20 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#F0EBFF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#F0EBFF] text-[#6546C8] flex items-center justify-center shrink-0 shadow-inner">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#191725]">Student Focused</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Curated scholarships, fee reimbursement &amp; educational loan facilitation.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#191725]">Accessible Services</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Equitable digital public assistance across all 31 districts of Karnataka.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] text-amber-600 flex items-center justify-center shrink-0 shadow-inner">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#191725]">Guided Assistance</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Pre-verification of documents to eliminate costly application rejections.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] text-rose-600 flex items-center justify-center shrink-0 shadow-inner">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#191725]">Digital Convenience</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Safe application tracking on official state portals with zero middlemen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDEPENDENT MANDATE DISCLAIMER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 w-full">
        <IndependentDisclaimerBanner />
      </section>

      {/* =========================================================================
          SECTION 3: EXPLORE OUR SERVICES (CINEMATIC IMAGE CARDS)
         ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F8F5FF] border-y border-[#F0EBFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#FF963F] bg-[#FF963F]/10 px-3 py-1 rounded-full border border-[#FF963F]/25">
                OUR SERVICES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#191725] tracking-tight leading-tight">
                Explore Services Designed Around You
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From educational support to essential digital services, discover assistance that makes everyday opportunities easier to access.
              </p>
              <div className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6546C8] hover:bg-[#5435B5] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-purple-600/20"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Subtitle & Highlights */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D4FF] shadow-sm">
              <h3 className="text-base font-bold text-[#191725] mb-2">
                Comprehensive Handholding for Students &amp; Citizens
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We remove the digital barriers, complex documentation requirements, and confusing eligibility criteria that prevent deserving candidates from receiving legitimate scholarships, loans, and benefits.
              </p>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((card) => (
              <Link
                key={card.id}
                href={card.link}
                className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-[#130D29] aspect-[3/4] flex flex-col justify-end p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-65"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#130D29] via-[#130D29]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#6546C8]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10 space-y-2.5">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FF963F] text-white">
                    {card.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF963F] transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#FF963F] transition-colors">
                    <span>Explore Service</span>
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#FF963F] group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOW IT WORKS — FOUR SIMPLE STEPS (DARK MIDNIGHT SECTION)
         ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#130D29] text-white relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#6546C8]/20 blur-[150px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold text-[#FF963F] uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
              SIMPLE WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Getting Assistance Is Simple
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A structured, transparent pathway to securing your educational and welfare benefits.
            </p>
          </div>

          {/* 4 Steps Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {workflowSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-md flex flex-col justify-between hover:border-[#FF963F]/50 transition-all duration-300 group"
              >
                {/* Step Top Bar: Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black font-mono text-[#FF963F] opacity-90">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 group-hover:bg-[#FF963F]/20 border border-white/10 group-hover:border-[#FF963F]/40 flex items-center justify-center transition-all">
                    {step.icon}
                  </div>
                </div>

                {/* Step Details */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F0EBFF]/70">
                    {step.name}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF963F] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Help Notice */}
          <div className="mt-14 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#6546C8] to-[#FF963F] hover:from-[#5435B5] hover:to-[#F28528] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Start Your Assistance Enquiry</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: POPULAR SERVICE CATEGORIES (PASTEL CARDS)
         ========================================================================= */}
      <section className="py-20 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-[#6546C8] uppercase tracking-widest">
              POPULAR DOMAINS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#191725] tracking-tight">
              Popular Assistance Categories
            </h2>
            <p className="text-slate-600 text-sm">
              Quickly jump into the category matching your current requirement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pastelCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${cat.bg}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-4">
                    {cat.icon}
                  </div>
                  <h3 className={`text-base font-bold ${cat.textColor} mb-1`}>
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Explore</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ABOUT ONEPOINT — MORE THAN A SERVICE PLATFORM
         ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F8F5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Benefit Points */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#FF963F] bg-[#FF963F]/10 px-3 py-1 rounded-full border border-[#FF963F]/25">
                WHY ONEPOINT
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#191725] tracking-tight leading-tight">
                More Than Services. A Partner in Your Progress.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                OnePoint is committed to connecting individuals with educational opportunities, government scheme information and essential digital services through accessible, guided support.
              </p>

              {/* Four Benefit Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#E0D4FF] shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6546C8] shrink-0" />
                    <h4 className="text-xs font-bold text-[#191725]">Accessible Information</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Clear guidance on eligibility, deadlines, and required documentation.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E0D4FF] shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6546C8] shrink-0" />
                    <h4 className="text-xs font-bold text-[#191725]">Student-Centred Support</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Direct handholding for post-matric grants, loans, and course counseling.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E0D4FF] shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6546C8] shrink-0" />
                    <h4 className="text-xs font-bold text-[#191725]">Simplified Digital Services</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Easy certificate preparation and portal error resolution.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E0D4FF] shadow-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6546C8] shrink-0" />
                    <h4 className="text-xs font-bold text-[#191725]">Opportunities for Everyone</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Reaching semi-urban and rural youth across Karnataka state.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#130D29] hover:bg-[#1D143D] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#6546C8] hover:underline"
                >
                  Contact Our Desks →
                </Link>
              </div>
            </div>

            {/* Right Column: High Quality Photograph */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E0D4FF] aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=900&auto=format&fit=crop"
                  alt="Indian student learning in a modern collaborative digital environment"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#130D29]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white text-[#191725] shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#6546C8]">
                        NextGen Stewardship
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#191725]">
                        Technology-Enabled Public Assistance
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F0EBFF] text-[#6546C8] border border-[#6546C8]/30">
                      Assured Zone
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: OUR COMMITMENT (FOUR PILLARS)
         ========================================================================= */}
      <section className="py-20 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-[#6546C8] uppercase tracking-widest">
              OUR CORE PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#191725] tracking-tight">
              Our Core Commitment
            </h2>
            <p className="text-slate-600 text-sm">
              Built on four fundamental values that govern every public enquiry we handle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-[#6546C8]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#F0EBFF] text-[#6546C8] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#191725] mb-1">Accessibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Breaking linguistic, technical, and geographical barriers so information reaches students across every taluk.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-[#6546C8]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#191725] mb-1">Transparency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear eligibility terms, direct government portal links, and zero unauthorized fee collections.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-[#6546C8]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#191725] mb-1">Empowerment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Providing candidates with the knowledge and tools needed to navigate digital governance independently.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-[#6546C8]/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] text-rose-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#191725] mb-1">Reliability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verified notification deadlines, accurate portal steps, and dependable coordinator support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: TESTIMONIALS (STUDENT VOICES)
         ========================================================================= */}
      <section className="py-20 md:py-24 bg-[#F8F5FF] border-b border-[#F0EBFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold text-[#FF963F] uppercase tracking-widest">
              FEEDBACK &amp; EXPERIENCES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#191725] tracking-tight">
              Voices From Across Karnataka
            </h2>
            <p className="text-slate-600 text-sm">
              Authentic feedback from students and citizens assisted through OnePoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E0D4FF] shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#6546C8]/10 text-[#6546C8] font-black text-xs flex items-center justify-center">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#191725]">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                    <span className="text-[10px] text-[#6546C8] font-semibold">{t.district}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: IMPACT SECTION — DARK CINEMATIC BANNER
         ========================================================================= */}
      <section className="relative py-24 md:py-32 bg-[#130D29] text-white overflow-hidden">
        {/* Cinematic Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop"
          alt="Indian higher education campus library"
          fill
          className="object-cover object-center opacity-25"
        />
        {/* Deep Midnight Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#130D29] via-[#1D143D]/90 to-[#130D29]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#FF963F] bg-white/10 px-4 py-1 rounded-full border border-white/15">
              STATEWIDE OUTREACH
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Making Opportunities Accessible to Everyone
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Connecting students and citizens across Karnataka with verified government schemes, scholarships, and public welfare assistance.
            </p>
          </div>

          {/* 4 Verified Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-3xl sm:text-4xl font-black text-white font-mono">31</span>
              <span className="text-xs text-[#FF963F] font-bold uppercase tracking-wider block mt-1">Districts</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Karnataka State Reach</span>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-3xl sm:text-4xl font-black text-[#FF963F] font-mono">100%</span>
              <span className="text-xs text-[#FF963F] font-bold uppercase tracking-wider block mt-1">Free Guidance</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Independent Support</span>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-3xl sm:text-4xl font-black text-emerald-400 font-mono">4</span>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mt-1">Service Pillars</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Education &amp; Welfare</span>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-3xl sm:text-4xl font-black text-purple-300 font-mono">NextGen</span>
              <span className="text-xs text-purple-300 font-bold uppercase tracking-wider block mt-1">Governance</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Ethical Supervision</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: CALL TO ACTION SECTION (SOFT LAVENDER/PURPLE BANNER)
         ========================================================================= */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#F0EBFF] via-[#E9DFFF] to-[#F0EBFF] border border-[#E0D4FF] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-left">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#6546C8]">
                ASSURED TECH ZONE ASSISTANCE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#191725] tracking-tight">
                Ready to Take Your Next Step?
              </h2>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Whether you are a student seeking opportunities or an individual looking for essential services, OnePoint is here to help you get started.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#6546C8] hover:bg-[#5435B5] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-purple-600/25 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Get Assistance Now
              </button>

              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: LATEST UPDATES AND INSIGHTS (SCHEMES LISTING PREVIEW)
         ========================================================================= */}
      <section className="py-20 md:py-24 bg-[#F8F5FF] border-t border-[#F0EBFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-extrabold text-[#6546C8] uppercase tracking-widest">
                VERIFIED OPPORTUNITIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#191725] tracking-tight mt-1">
                Updates, Opportunities &amp; Insights
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Real-time active educational grants, incentives, and scholarship application windows across Karnataka.
              </p>
            </div>

            <Link
              href="/schemes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6546C8] hover:text-[#5435B5]"
            >
              <span>View All Opportunities ({featuredSchemes.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSchemes.slice(0, 3).map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>
      </section>

      {/* Direct Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schemeTitle="General Service Assistance"
        schemeCategory="other-opportunities"
      />
    </div>
  );
}
