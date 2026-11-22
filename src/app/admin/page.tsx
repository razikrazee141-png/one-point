"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Lock,
  User,
  KeyRound,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  MessageSquare,
  Send,
  Eye,
  EyeOff,
  AlertCircle,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Check,
  Building,
} from "lucide-react";

interface EnquiryItem {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  rawMessage: string;
  cleanMessage: string;
  scheme: string;
  education?: string;
  district?: string;
  preferredContact: string;
  status: "new" | "pending" | "contacted" | "in_progress" | "resolved" | "cancelled" | string;
  ip?: string;
  isOnePoint: boolean;
}

export default function AdminPage() {
  // Authentication states
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<string>("");

  // Login form states
  const [usernameInput, setUsernameInput] = useState("admin");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard data states
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "onepoint">("all");

  // Selected Enquiry for Respond Modal
  const [activeEnquiry, setActiveEnquiry] = useState<EnquiryItem | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [adminNote, setAdminNote] = useState("");
  const [customReplyMessage, setCustomReplyMessage] = useState("");
  const [activeTemplate, setActiveTemplate] = useState<string>("acknowledgement");
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // 1. Check Session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setAuthChecking(true);
    try {
      const res = await fetch("/api/admin/session");
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setIsAuthenticated(true);
        setAdminUser(data.user?.username || "Admin");
        fetchEnquiries();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthChecking(false);
    }
  };

  // 2. Fetch Enquiries
  const fetchEnquiries = async () => {
    setDataLoading(true);
    setDataError("");
    try {
      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries(data.enquiries || []);
      } else {
        setDataError(data.error || "Failed to fetch enquiries from database.");
      }
    } catch {
      setDataError("Network error while connecting to administrative database.");
    } finally {
      setDataLoading(false);
    }
  };

  // 3. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAdminUser(data.user?.username || usernameInput);
        setPasswordInput("");
        fetchEnquiries();
      } else {
        setLoginError(data.error || "Invalid administrative credentials.");
      }
    } catch {
      setLoginError("Login service error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // 4. Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (_) {}
    setIsAuthenticated(false);
    setEnquiries([]);
    setActiveEnquiry(null);
  };

  // 5. Open Modal & Initialize Templates
  const handleOpenRespondModal = (item: EnquiryItem) => {
    setActiveEnquiry(item);
    setSelectedStatus(item.status);
    setAdminNote("");
    setSaveSuccessNotice(false);

    // Prepare default response template
    const defaultTemplateText = `Hello ${item.name},

Thank you for reaching out to ONE POINT – ASSURED TECH ZONE (NextGen Organisation) regarding your enquiry (#${item.id}) for:
*${item.scheme || item.subject}*.

Our assistance team has received your details. How may we assist you with your application or documentation today?

Warm regards,
ONE POINT Support Team
NextGen Organisation`;

    setCustomReplyMessage(defaultTemplateText);
    setActiveTemplate("acknowledgement");
  };

  // Switch response template
  const handleTemplateChange = (templateKey: string) => {
    if (!activeEnquiry) return;
    setActiveTemplate(templateKey);

    const name = activeEnquiry.name;
    const scheme = activeEnquiry.scheme || activeEnquiry.subject;

    if (templateKey === "acknowledgement") {
      setCustomReplyMessage(`Hello ${name},

Thank you for contacting ONE POINT – ASSURED TECH ZONE (NextGen Organisation) regarding your enquiry (#${activeEnquiry.id}) for:
*${scheme}*.

Our student support team has received your request. We are ready to help you navigate this opportunity.

Warm regards,
ONE POINT Support Team`);
    } else if (templateKey === "documents") {
      setCustomReplyMessage(`Hello ${name},

Regarding your enquiry for *${scheme}*, please keep the following preliminary documents ready for verification and application submission:

1. Student Aadhaar Card
2. SSLC / PUC Marks Card
3. Income & Caste Certificate (RD Number)
4. College Fee Receipt / Admission Proof
5. Bank Account Passbook (Aadhaar Seeded)

Reply to this message with your questions, or visit our support hub for step-by-step facilitation.

Warm regards,
ONE POINT – ASSURED TECH ZONE`);
    } else if (templateKey === "portal") {
      setCustomReplyMessage(`Hello ${name},

Regarding *${scheme}*, the official government portal application window is active.

We can guide you through each step of the online portal submission and document upload to avoid rejection errors.

Please let us know if you need assistance submitting it online or if you'd like our team to review your application.

Warm regards,
ONE POINT Assistance Team`);
    } else if (templateKey === "call") {
      setCustomReplyMessage(`Hello ${name},

Our advisor from ONE POINT – ASSURED TECH ZONE would like to connect with you regarding your enquiry for *${scheme}*.

Could you please let us know a convenient time for a brief 3-minute telephone discussion?

Warm regards,
ONE POINT Team`);
    }
  };

  // 6. Save Status & Note to Database
  const handleSaveStatus = async () => {
    if (!activeEnquiry) return;
    setUpdatingStatus(true);
    setSaveSuccessNotice(false);

    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeEnquiry.id,
          status: selectedStatus,
          note: adminNote,
          phone: activeEnquiry.phone,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccessNotice(true);
        // Update local state
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === activeEnquiry.id
              ? {
                  ...item,
                  status: selectedStatus,
                  cleanMessage: adminNote
                    ? `${item.cleanMessage}\n[Admin Note]: ${adminNote}`
                    : item.cleanMessage,
                }
              : item
          )
        );
        setActiveEnquiry((prev) => (prev ? { ...prev, status: selectedStatus } : null));
        setAdminNote("");
        setTimeout(() => setSaveSuccessNotice(false), 3000);
      } else {
        alert(data.error || "Failed to update enquiry status.");
      }
    } catch {
      alert("Error saving status changes to database.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // 7. Trigger WhatsApp Response
  const handleSendWhatsApp = () => {
    if (!activeEnquiry || !activeEnquiry.phone) return;
    const cleanPhone = activeEnquiry.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const encodedText = encodeURIComponent(customReplyMessage);
    const waUrl = `https://wa.me/${formattedPhone}?text=${encodedText}`;
    window.open(waUrl, "_blank");
  };

  // 8. Trigger Phone Call
  const handleCall = () => {
    if (!activeEnquiry || !activeEnquiry.phone) return;
    window.location.href = `tel:${activeEnquiry.phone}`;
  };

  // 9. Trigger Email
  const handleEmail = () => {
    if (!activeEnquiry || !activeEnquiry.email) return;
    const subject = encodeURIComponent(`ONE POINT Assistance: Response to enquiry #${activeEnquiry.id}`);
    const body = encodeURIComponent(customReplyMessage);
    window.location.href = `mailto:${activeEnquiry.email}?subject=${subject}&body=${body}`;
  };

  // 10. Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Source filter
      if (sourceFilter === "onepoint" && !item.isOnePoint) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all") {
        if (statusFilter === "new" && item.status !== "new" && item.status !== "pending") {
          return false;
        }
        if (statusFilter === "contacted" && item.status !== "contacted") {
          return false;
        }
        if (statusFilter === "in_progress" && item.status !== "in_progress") {
          return false;
        }
        if (statusFilter === "resolved" && item.status !== "resolved") {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesPhone = item.phone.toLowerCase().includes(q);
        const matchesEmail = item.email.toLowerCase().includes(q);
        const matchesScheme = item.scheme.toLowerCase().includes(q);
        const matchesDistrict = (item.district || "").toLowerCase().includes(q);
        const matchesId = item.id.toLowerCase().includes(q);
        const matchesMsg = item.rawMessage.toLowerCase().includes(q);

        return (
          matchesName ||
          matchesPhone ||
          matchesEmail ||
          matchesScheme ||
          matchesDistrict ||
          matchesId ||
          matchesMsg
        );
      }

      return true;
    });
  }, [enquiries, sourceFilter, statusFilter, searchQuery]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = enquiries.length;
    const pending = enquiries.filter(
      (e) => e.status === "new" || e.status === "pending"
    ).length;
    const contacted = enquiries.filter((e) => e.status === "contacted").length;
    const inProgress = enquiries.filter((e) => e.status === "in_progress").length;
    const resolved = enquiries.filter((e) => e.status === "resolved").length;
    return { total, pending, contacted, inProgress, resolved };
  }, [enquiries]);

  // Export CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = [
      "Submission ID",
      "Date",
      "Name",
      "Phone",
      "Email",
      "District",
      "Education",
      "Scheme/Subject",
      "Status",
      "Message",
    ];

    const rows = enquiries.map((e) => [
      `"${e.id}"`,
      `"${new Date(e.created_at).toLocaleString("en-IN")}"`,
      `"${(e.name || "").replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${(e.district || "").replace(/"/g, '""')}"`,
      `"${(e.education || "").replace(/"/g, '""')}"`,
      `"${(e.scheme || "").replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${(e.cleanMessage || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `onepoint_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for Status Badge styling
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "new":
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            New / Action Req
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-700 border border-blue-300">
            <MessageSquare className="w-3 h-3" />
            Contacted
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-700 border border-purple-300">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3" />
            Resolved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            {status}
          </span>
        );
    }
  };

  // Initial Auth Loading Screen
  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4">
        <div className="w-12 h-12 border-4 border-royal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium tracking-wide text-sm">Verifying Administrative Access...</p>
      </div>
    );
  }

  // =========================================================================
  // LOGIN SCREEN (When Not Authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 flex items-center justify-center p-4 selection:bg-royal-500 selection:text-white">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block group mb-4">
              <div className="relative w-48 h-14 mx-auto">
                <Image
                  src="/images/logo.png"
                  alt="ONE POINT – ASSURED TECH ZONE"
                  fill
                  className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-500/10 border border-royal-500/30 text-royal-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Shield className="w-3.5 h-3.5" />
              Restricted Admin Control Center
            </div>
            <p className="text-slate-400 text-sm">
              Sign in with your administrative credentials to manage enquiries and respond to applicants.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-royal-600/10 rounded-full blur-3xl pointer-events-none"></div>

            {loginError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Admin Username
                </label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full bg-slate-950/60 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Admin Passcode
                </label>
                <div className="relative">
                  <KeyRound className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter secure passcode"
                    className="w-full bg-slate-950/60 border border-slate-700 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-royal-600 to-navy-700 hover:from-royal-500 hover:to-navy-600 text-white font-semibold text-sm tracking-wide shadow-lg shadow-royal-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Access Admin Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
              <p className="text-xs text-slate-400">
                Default Credentials: <code className="text-royal-400 font-mono">admin</code> / <code className="text-royal-400 font-mono">onepoint@2026</code>
              </p>
              <div className="mt-3">
                <Link href="/" className="text-xs text-slate-400 hover:text-royal-400 inline-flex items-center gap-1 transition-colors">
                  &larr; Return to OnePoint Homepage
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-slate-400">
            ONE POINT – ASSURED TECH ZONE &bull; NextGen Organisation
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // DASHBOARD SCREEN (When Authenticated)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="relative w-36 h-10 block">
              <Image
                src="/images/logo.png"
                alt="OnePoint"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-slate-700/80">
              <span className="px-2.5 py-0.5 rounded-md bg-royal-500/20 text-royal-300 font-mono text-xs font-semibold uppercase tracking-wider border border-royal-500/30">
                Admin Zone
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Supabase Connected
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchEnquiries}
              disabled={dataLoading}
              title="Refresh database"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-medium border border-slate-700"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? "animate-spin text-royal-400" : ""}`} />
              <span className="hidden md:inline">Refresh Data</span>
            </button>

            <button
              onClick={handleExportCSV}
              disabled={enquiries.length === 0}
              title="Export enquiries to CSV"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-xs font-medium border border-slate-700"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Export CSV</span>
            </button>

            <div className="h-6 w-px bg-slate-800 mx-1"></div>

            <div className="flex items-center gap-2 pl-2">
              <div className="w-8 h-8 rounded-full bg-royal-600/30 text-royal-300 border border-royal-500/40 flex items-center justify-center font-bold text-xs uppercase">
                {adminUser.slice(0, 2)}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Sign out of Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Overview Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Enquiry Management Console
              <span className="text-xs px-2.5 py-1 rounded-full bg-royal-950 text-royal-300 border border-royal-700 font-semibold tracking-normal">
                NextGen Unified
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Review visitor scheme applications, track response progress, and connect instantly via WhatsApp or Call.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Website
            </Link>
          </div>
        </div>

        {/* Analytics / Stats KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Enquiries
              </span>
              <Building className="w-4 h-4 text-royal-400" />
            </div>
            <p className="text-3xl font-black text-white mt-2">{stats.total}</p>
            <p className="text-xs text-slate-500 mt-1">Stored in database</p>
          </div>

          {/* Card 2: Action Required / New */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden bg-gradient-to-br from-slate-900 to-amber-950/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                New / Pending
              </span>
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <p className="text-3xl font-black text-amber-400 mt-2">{stats.pending}</p>
            <p className="text-xs text-amber-500/80 mt-1">Awaiting response</p>
          </div>

          {/* Card 3: Contacted / In Progress */}
          <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                In Progress
              </span>
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-3xl font-black text-blue-400 mt-2">{stats.contacted + stats.inProgress}</p>
            <p className="text-xs text-blue-500/80 mt-1">Engaged with applicant</p>
          </div>

          {/* Card 4: Resolved */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-lg relative overflow-hidden bg-gradient-to-br from-slate-900 to-emerald-950/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Resolved
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-emerald-400 mt-2">{stats.resolved}</p>
            <p className="text-xs text-emerald-500/80 mt-1">Assisted successfully</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, phone, district, scheme, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-all"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { key: "all", label: "All" },
              { key: "new", label: "New" },
              { key: "contacted", label: "Contacted" },
              { key: "in_progress", label: "In Progress" },
              { key: "resolved", label: "Resolved" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === tab.key
                    ? "bg-royal-600 text-white shadow-md shadow-royal-600/30"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries List / Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          {dataLoading && enquiries.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-royal-400 mb-3" />
              <p className="font-medium text-sm">Fetching enquiries from database...</p>
            </div>
          ) : dataError ? (
            <div className="p-12 text-center text-red-400">
              <AlertCircle className="w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold">{dataError}</p>
              <button
                onClick={fetchEnquiries}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Try Again
              </button>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <MessageSquare className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="font-semibold text-slate-300 text-base">No enquiries found</p>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search criteria or status filter."
                  : "New enquiries submitted through website forms will appear here automatically."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {filteredEnquiries.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 hover:bg-slate-850/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
                >
                  {/* Left Column: Applicant & Scheme Info */}
                  <div className="flex-1 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-royal-400 bg-royal-950/80 px-2 py-0.5 rounded border border-royal-800">
                        {item.id}
                      </span>
                      {renderStatusBadge(item.status)}
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                      {item.isOnePoint && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 bg-royal-500/10 px-2 py-0.5 rounded border border-royal-500/20">
                          OnePoint Hub
                        </span>
                      )}
                    </div>

                    {/* Applicant Name & Subject */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-royal-300 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold text-royal-400/90 mt-0.5 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-gold-400" />
                        {item.scheme || item.subject}
                      </p>
                    </div>

                    {/* Details Badges: Phone, Email, Location, Education */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                      {item.phone && (
                        <a
                          href={`tel:${item.phone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                        >
                          <Phone className="w-3 h-3 text-emerald-400" />
                          {item.phone}
                        </a>
                      )}

                      {item.email && !item.email.endsWith("@onepoint.nextgen.org") && (
                        <a
                          href={`mailto:${item.email}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                        >
                          <Mail className="w-3 h-3 text-blue-400" />
                          {item.email}
                        </a>
                      )}

                      {item.district && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {item.district}
                        </span>
                      )}

                      {item.education && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                          <GraduationCap className="w-3 h-3 text-purple-400" />
                          {item.education}
                        </span>
                      )}
                    </div>

                    {/* Message Preview */}
                    <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 text-xs text-slate-300 line-clamp-2">
                      <span className="text-slate-500 font-medium">Message: </span>
                      {item.cleanMessage}
                    </div>
                  </div>

                  {/* Right Column: Action Buttons */}
                  <div className="flex items-center gap-2.5 flex-shrink-0 self-end lg:self-center">
                    {/* Quick WhatsApp Button */}
                    {item.phone && (
                      <button
                        onClick={() => {
                          const cleanPhone = item.phone.replace(/[^0-9]/g, "");
                          const p = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                          const defaultMsg = encodeURIComponent(
                            `Hello ${item.name}, this is One Point – Assured Tech Zone regarding your enquiry #${item.id} for ${item.scheme || item.subject}. How may we assist you?`
                          );
                          window.open(`https://wa.me/${p}?text=${defaultMsg}`, "_blank");
                        }}
                        title="Quick WhatsApp message"
                        className="p-3 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                    )}

                    {/* Quick Phone Call Button */}
                    {item.phone && (
                      <a
                        href={`tel:${item.phone}`}
                        title="Call applicant"
                        className="p-3 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 border border-blue-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span className="hidden sm:inline">Call</span>
                      </a>
                    )}

                    {/* View Details & Respond Button */}
                    <button
                      onClick={() => handleOpenRespondModal(item)}
                      className="px-4 py-3 rounded-xl bg-royal-600 hover:bg-royal-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-royal-600/20 transition-all flex items-center gap-1.5"
                    >
                      <span>View &amp; Respond</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
          RESPOND & ENQUIRY DETAILS MODAL
         ========================================================================= */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between sticky top-0 z-10 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-royal-600/20 text-royal-400 border border-royal-500/30 flex items-center justify-center font-bold text-sm">
                  OP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">{activeEnquiry.name}</h2>
                    <span className="font-mono text-xs text-royal-400 bg-royal-950 px-2 py-0.5 rounded border border-royal-800">
                      {activeEnquiry.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Received on {new Date(activeEnquiry.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveEnquiry(null)}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-lg"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Applicant Summary Dossier */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Applicant Information
                  </h4>
                  {renderStatusBadge(activeEnquiry.status)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Scheme / Requested Service</span>
                    <span className="font-bold text-royal-300 text-sm block mt-0.5">
                      {activeEnquiry.scheme || activeEnquiry.subject}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Contact Mobile</span>
                    <span className="font-bold text-white text-sm block mt-0.5 font-mono">
                      {activeEnquiry.phone}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Email Address</span>
                    <span className="font-medium text-slate-300 block mt-0.5">
                      {activeEnquiry.email && !activeEnquiry.email.endsWith("@onepoint.nextgen.org")
                        ? activeEnquiry.email
                        : "Not provided"}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">District / Location</span>
                    <span className="font-medium text-slate-300 block mt-0.5">
                      {activeEnquiry.district || "Karnataka"}
                    </span>
                  </div>

                  {activeEnquiry.education && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-500 block">Education Qualification</span>
                      <span className="font-medium text-slate-300 block mt-0.5">
                        {activeEnquiry.education}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-slate-500 text-xs block mb-1">Enquiry Message:</span>
                  <div className="bg-slate-900 rounded-xl p-3 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap border border-slate-800">
                    {activeEnquiry.cleanMessage}
                  </div>
                </div>
              </div>

              {/* Status Update & Team Notes Section */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Update Resolution Status &amp; Team Remarks
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Change Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-royal-500"
                    >
                      <option value="new">New / Action Required</option>
                      <option value="contacted">Contacted Applicant</option>
                      <option value="in_progress">In Progress (Processing)</option>
                      <option value="resolved">Resolved / Completed</option>
                      <option value="cancelled">Cancelled / Disqualified</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Add Team Remark (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Sent documents list on WhatsApp..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {saveSuccessNotice ? (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Database updated successfully!
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">
                      Saves status changes directly to live Supabase backend.
                    </span>
                  )}

                  <button
                    onClick={handleSaveStatus}
                    disabled={updatingStatus}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                  >
                    {updatingStatus ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    Save Status &amp; Note
                  </button>
                </div>
              </div>

              {/* Respond Actions Section */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-royal-400" />
                    Respond to Applicant
                  </h4>
                  <span className="text-xs text-emerald-400 font-semibold">1-Click WhatsApp Ready</span>
                </div>

                {/* Quick Templates Selection */}
                <div>
                  <span className="text-xs text-slate-400 block mb-2">Select Response Template:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "acknowledgement", label: "Acknowledgement" },
                      { key: "documents", label: "Required Documents" },
                      { key: "portal", label: "Portal Guidance" },
                      { key: "call", label: "Call Request" },
                    ].map((tpl) => (
                      <button
                        key={tpl.key}
                        onClick={() => handleTemplateChange(tpl.key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeTemplate === tpl.key
                            ? "bg-royal-600 text-white shadow-md shadow-royal-600/30"
                            : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Custom Reply Message (Editable)</label>
                  <textarea
                    rows={6}
                    value={customReplyMessage}
                    onChange={(e) => setCustomReplyMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-royal-500 font-sans leading-relaxed"
                  />
                </div>

                {/* Action Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {/* WhatsApp Action */}
                  <button
                    onClick={handleSendWhatsApp}
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send on WhatsApp
                  </button>

                  {/* Phone Call Action */}
                  <button
                    onClick={handleCall}
                    className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Call Applicant
                  </button>

                  {/* Email Action */}
                  <button
                    onClick={handleEmail}
                    disabled={!activeEnquiry.email || activeEnquiry.email.endsWith("@onepoint.nextgen.org")}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs tracking-wide border border-slate-700 transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    <Mail className="w-4 h-4" />
                    Send via Email
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span>ONE POINT – ASSURED TECH ZONE</span>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
