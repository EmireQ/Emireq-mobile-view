"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  TbCalendar, TbWorld, TbFileText, TbChevronDown, TbChevronUp,
  TbTrash, TbPlus, TbShieldCheck, TbCloudUpload,
  TbPencil, TbBuilding, TbUser, TbChartLine,
  TbCurrencyDollar, TbShield, TbFile, TbAlertTriangle,
  TbRocket, TbMail, TbTrendingUp, TbMapPin, TbCheck,
  TbEye, TbEyeOff, TbStarFilled, TbCircleCheck,
} from "react-icons/tb";
import { FaLinkedinIn, FaGoogle } from "react-icons/fa";
import logologin from "@/public/assets/logologin.png";
import loginbg from "@/public/assets/loginbg.png";
import logo1 from "@/public/assets/logo1.png";
import signuplast from "@/public/assets/signuplast.png";

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const YELLOW = "#EAB308";
const YELLOW_HOVER = "#CA8A04";
const NAVY = "#1E2A4A";
const GRAY_700 = "#374151";
const GRAY_600 = "#4B5563";
const GRAY_500 = "#6B7280";
const GRAY_400 = "#9CA3AF";
const GRAY_300 = "#D1D5DB";
const GRAY_200 = "#E5E7EB";
const GRAY_100 = "#F3F4F6";
const GREEN = "#10B981";
const GREEN_DARK = "#059669";
const BLUE = "#3B82F6";
const ORANGE = "#F97316";

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "E-commerce",
  "Real Estate", "Food & Beverage", "Transportation", "Energy",
  "Agriculture", "Media & Entertainment", "Manufacturing", "Other",
];

const COUNTRIES = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Bahrain", "Kuwait",
  "Oman", "Jordan", "Egypt", "Turkey", "Malaysia", "Indonesia",
  "Pakistan", "United Kingdom", "United States", "Canada", "Other",
];

const REVENUE_MODELS = [
  "Subscription", "Transaction-based", "Advertising", "Marketplace Commission",
  "Licensing", "Freemium", "Direct Sales", "Other",
];

const COMPANY_STAGES = [
  { label: "Ideal Stage", desc: "Concept development phase" },
  { label: "MVP/Prototype", desc: "Building minimum viable product" },
  { label: "Early Revenue", desc: "Initial sales and traction" },
  { label: "Growth Stage", desc: "Scaling the business" },
  { label: "Expansion", desc: "Market expansion and maturity" },
];

const COMPANY_TYPES = [
  { label: "Product Company", desc: "Building and selling products" },
  { label: "Service Company", desc: "Providing services to clients" },
  { label: "Platform", desc: "Marketplace or platform business" },
  { label: "SaaS", desc: "Software as a service model" },
];

const TEAM_SIZES = [
  "1-5 employees", "5-10 employees", "11-25 employees",
  "25-50 employees", "50-100 employees", "100+ employees",
];

const FUNDING_STAGES = [
  { label: "Pre-Seed", desc: "$50k-$500k" },
  { label: "Seed Round", desc: "$500k-$2m" },
  { label: "Series A", desc: "$2M-$15M" },
  { label: "Series B", desc: "$15M+" },
];

const FUND_USAGES = [
  "Product Development", "Team Expansion", "Marketing & Sales",
  "Operations", "Market Expansions", "Working Capital",
];

const COMPLIANCE_AREAS = [
  "Interest-free operations", "Halal products services",
  "Ethical business practices", "No prohibited industries",
  "Transparent transactions", "Social responsibility",
];

const HERO_CONFIG: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Your Company Identity", subtitle: "Access your startup dashboard and funding journey" },
  2: { title: "Your Journey Matters", subtitle: "Access your startup dashboard and funding journey" },
  3: { title: "The Team behind the vision", subtitle: "Access your startup dashboard and funding journey" },
  4: { title: "Show Your Business Model", subtitle: "Access your startup dashboard and funding journey" },
  5: { title: "Secure Your Funding", subtitle: "Access your startup dashboard and funding journey" },
  6: { title: "Build Trust Through\nCompliance", subtitle: "Access your startup dashboard and funding journey" },
  7: { title: "Build Trust Through\nCompliance", subtitle: "Access your startup dashboard and funding journey" },
  8: { title: "Build Trust Through\nCompliance", subtitle: "Access your startup dashboard and funding journey" },
};

const CARD_CONFIG: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Tell Us about your Startup", subtitle: "Complete your profile to connect with the global ecosystem." },
  2: { title: "Company Stage & Type", subtitle: "Complete your profile to connect with the global ecosystem." },
  3: { title: "Company Stage & Type", subtitle: "Complete your profile to connect with the global ecosystem." },
  4: { title: "Business Model", subtitle: "Explain how your startup creates and captures value" },
  5: { title: "Funding Information", subtitle: "Tell us about your funding needs and goals" },
  6: { title: "Shariah Compliance", subtitle: "Verify your business adheres to islamic finance principles" },
  7: { title: "Upload Documents", subtitle: "Add your pitch deck and supporting documents" },
  8: { title: "Review & Submit", subtitle: "Almost there! Please review your submission and submit." },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface CoFounder {
  name: string;
  role: string;
  email: string;
}

interface UploadedFile {
  name: string;
  category: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  companyName: string;
  industry: string;
  foundedDate: string;
  website: string;
  registrationNumber: string;
  country: string;
  companyStage: string;
  companyType: string;
  teamSize: string;
  founderName: string;
  founderRole: string;
  founderEmail: string;
  founderLinkedin: string;
  businessDescription: string;
  problemSolving: string;
  targetMarket: string;
  revenueModel: string;
  currentRevenue: string;
  projectedRevenue: string;
  fundingStage: string;
  amountRaising: string;
  currentFunding: string;
  fundUsage: string[];
  previousInvestors: string;
  shariahStatus: string;
  complianceAreas: string[];
}

// ─── Shared Style Helpers ─────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: `1px solid ${GRAY_300}`,
  borderRadius: 10,
  fontSize: 14,
  fontFamily: FONT,
  color: "#111827",
  outline: "none",
  background: "#fff",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: GRAY_700,
  marginBottom: 6,
  display: "block",
  fontFamily: FONT,
};

const btnYellow: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: "none",
  background: YELLOW,
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  fontFamily: FONT,
  cursor: "pointer",
  transition: "background 0.2s, transform 0.1s",
  WebkitTapHighlightColor: "transparent",
};

const btnBack: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  borderRadius: 12,
  border: `1px solid ${GRAY_300}`,
  background: "#fff",
  color: GRAY_700,
  fontSize: 15,
  fontWeight: 600,
  fontFamily: FONT,
  cursor: "pointer",
  transition: "background 0.2s",
  WebkitTapHighlightColor: "transparent",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldGroup({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: ORANGE }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function IconInput({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: GRAY_400, display: "flex", alignItems: "center", pointerEvents: "none" }}>
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, paddingLeft: 38 }}
        onFocus={(e) => (e.target.style.borderColor = BLUE)}
        onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
      />
    </div>
  );
}

function SelectField({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...inputStyle,
          paddingRight: 36,
          appearance: "none",
          color: value ? "#111827" : GRAY_400,
          cursor: "pointer",
        }}
        onFocus={(e) => (e.target.style.borderColor = BLUE)}
        onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <TbChevronDown
        size={18}
        color={GRAY_400}
        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      />
    </div>
  );
}

function CheckOption({
  label,
  desc,
  selected,
  onSelect,
  selectedColor = GREEN,
}: {
  label: string;
  desc: string;
  selected: boolean;
  onSelect: () => void;
  selectedColor?: string;
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 16px",
        borderRadius: 12,
        border: `1.5px solid ${selected ? selectedColor : GRAY_300}`,
        background: selected ? `${selectedColor}08` : "#fff",
        cursor: "pointer",
        transition: "all 0.2s",
        marginBottom: 12,
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = GRAY_400; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = selected ? selectedColor : GRAY_300; e.currentTarget.style.boxShadow = 'none'; }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.99)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          border: `2px solid ${selected ? selectedColor : GRAY_300}`,
          background: selected ? selectedColor : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
          transition: "all 0.2s",
        }}
      >
        {selected && <TbCheck size={14} color="#fff" strokeWidth={3} />}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT }}>{label}</div>
        <div style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT, marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

function PillOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        padding: "8px 16px",
        borderRadius: 999,
        border: `1.5px solid ${selected ? NAVY : GRAY_300}`,
        background: selected ? NAVY : "#fff",
        color: selected ? "#fff" : GRAY_600,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: FONT,
        cursor: "pointer",
        transition: "all 0.2s",
        WebkitTapHighlightColor: "transparent",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.color = NAVY; } }}
      onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = GRAY_300; e.currentTarget.style.color = GRAY_600; } }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.96)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {label}
    </button>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={onChange}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
        borderRadius: 12,
        border: `1.5px solid ${checked ? GREEN : GRAY_300}`,
        background: checked ? "#ECFDF5" : "#fff",
        cursor: "pointer",
        transition: "all 0.2s",
        marginBottom: 10,
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={(e) => { if (!checked) e.currentTarget.style.borderColor = GRAY_400; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = checked ? GREEN : GRAY_300; e.currentTarget.style.boxShadow = 'none'; }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.99)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          border: `2px solid ${checked ? GREEN : GRAY_300}`,
          background: checked ? GREEN : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
      >
        {checked && <TbCheck size={14} color="#fff" strokeWidth={3} />}
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", fontFamily: FONT }}>{label}</span>
    </div>
  );
}

function ShariahInfoBox() {
  return (
    <div style={{
      display: "flex", gap: 12, padding: 16, borderRadius: 12,
      background: "#ECFDF5", border: "1px solid #D1FAE5", marginTop: 8,
    }}>
      <TbShieldCheck size={22} color={GREEN_DARK} style={{ flexShrink: 0, marginTop: 2 }} />
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: GREEN_DARK, fontFamily: FONT }}>
          Why Shariah Compliance Matters
        </div>
        <div style={{ fontSize: 13, color: GREEN_DARK, fontFamily: FONT, marginTop: 4, lineHeight: 1.5 }}>
          Shariah-compliant businesses attract ethical investors and access Islamic finance markets worth trillions of dollars globally.
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StartupSignupFlow() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [view, setView] = useState<"register" | "onboarding" | "submitted">("register");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [documents, setDocuments] = useState<UploadedFile[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0, 1, 2, 3, 4, 5]));
  const [coFounders, setCoFounders] = useState<CoFounder[]>([{ name: "", role: "", email: "" }]);
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    companyName: "",
    industry: "",
    foundedDate: "",
    website: "",
    registrationNumber: "",
    country: "",
    companyStage: "",
    companyType: "",
    teamSize: "",
    founderName: "",
    founderRole: "",
    founderEmail: "",
    founderLinkedin: "",
    businessDescription: "",
    problemSolving: "",
    targetMarket: "",
    revenueModel: "",
    currentRevenue: "",
    projectedRevenue: "",
    fundingStage: "",
    amountRaising: "",
    currentFunding: "",
    fundUsage: [],
    previousInvestors: "",
    shariahStatus: "",
    complianceAreas: [],
  });

  const update = useCallback((field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleArrayItem = useCallback((field: "fundUsage" | "complianceAreas", item: string) => {
    setFormData((prev) => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item] };
    });
  }, []);

  const handleRegister = () => {
    setView("onboarding");
    setStep(1);
  };

  const handleContinue = () => {
    if (step < 8) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setView("submitted");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setView("register");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).map((f) => ({ name: f.name, category: guessCat(f.name) }));
    setDocuments((prev) => [...prev, ...newFiles]);
  };

  const guessCat = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes("bank") || n.includes("statement")) return "funds";
    if (n.includes("accreditation") || n.includes("letter")) return "accreditation";
    if (n.includes("government") || n.includes("id") || n.includes("registration")) return "id";
    if (n.includes("pitch")) return "pitch";
    return "general";
  };

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // ─── Hero Layout ──────────────────────────────────────────────────────────

  const renderPageWrapper = (rightLabel: React.ReactNode, heroTitle: string, heroSub: string, children: React.ReactNode) => (
    <div style={{
      minHeight: "100vh",
      fontFamily: FONT,
      position: "relative",
      background: "#F3F4F6",
    }}>
      {/* Background image section — top half only */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "46%",
        backgroundImage: `url(${loginbg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(15,23,52,0.82) 0%, rgba(15,23,52,0.7) 50%, rgba(15,23,52,0.92) 100%)",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%",
        maxWidth: 430, margin: "0 auto",
        padding: "20px clamp(14px, 4.5vw, 18px) 40px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Image src={logologin} alt="emireq" width={44} height={38} style={{ objectFit: "contain" }} />
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, fontFamily: FONT }}>
            {rightLabel}
          </div>
        </div>

        {/* Hero Text */}
        <h1 style={{
          color: "#fff", fontSize: 28, fontWeight: 700, lineHeight: 1.2,
          marginTop: 28, fontFamily: FONT, whiteSpace: "pre-line",
        }}>
          {heroTitle}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 10, fontFamily: FONT, lineHeight: 1.5 }}>
          {heroSub}
        </p>
        <div style={{ width: 60, height: 3, background: YELLOW, borderRadius: 2, marginTop: 14 }} />

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 22, marginTop: 28,
          padding: "28px clamp(16px, 5vw, 22px)", boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        }}>
          {children}
        </div>
      </div>
    </div>
  );

  // ─── Onboarding Card Header ───────────────────────────────────────────────

  const renderOnboardingHeader = (stepNum: number) => {
    const config = CARD_CONFIG[stepNum];
    if (!config) return null;
    return (
      <>
        <span style={{
          display: "inline-block", padding: "4px 14px", borderRadius: 999,
          background: "#FEF3C7", color: "#92400E", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: FONT,
          marginBottom: 14,
        }}>
          Onboarding
        </span>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: FONT, marginBottom: 8 }}>
          {config.title}
        </h2>
        <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, marginBottom: 20, lineHeight: 1.5 }}>
          {config.subtitle}
        </p>
        <div style={{ width: "100%", height: 1, background: GRAY_200, marginBottom: 16 }} />
        <div style={{ width: "100%", height: 3, background: GRAY_200, borderRadius: 2, marginBottom: 24, position: "relative" }}>
          <div style={{
            position: "absolute", left: 0, top: 0, height: 3, borderRadius: 2,
            background: YELLOW,
            width: `${(stepNum / 10) * 100}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      </>
    );
  };

  // ─── Navigation Buttons ───────────────────────────────────────────────────

  const renderNavButtons = (continueLabel = "Continue") => (
    <div style={{ marginTop: 24 }}>
      <button
        onClick={handleContinue}
        style={btnYellow}
        onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
        onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {continueLabel}
      </button>
      <button
        onClick={handleBack}
        style={{ ...btnBack, marginTop: 12 }}
        onMouseEnter={(e) => (e.currentTarget.style.background = GRAY_100)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Back
      </button>
      <div style={{ textAlign: "center", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${GRAY_200}` }}>
        <span style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>
          Need assistance?{" "}
          <span
            style={{ color: BLUE, fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >Contact Support</span>
        </span>
      </div>
    </div>
  );

  // ─── REGISTRATION ─────────────────────────────────────────────────────────

  const renderRegistration = () =>
    renderPageWrapper(
      <span style={{ cursor: "pointer" }}>English(UK) ▾</span>,
      "Build Your Startup the\nShariah Way",
      "Access your startup dashboard and funding journey",
      <>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: FONT }}>
          Welcome to emireq
        </h2>
        <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, marginTop: 6, marginBottom: 24 }}>
          Sign Up to continue your journey.
        </p>

        <FieldGroup label="Username">
          <input
            placeholder="username"
            value={formData.username}
            onChange={(e) => update("username", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = BLUE)}
            onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
          />
        </FieldGroup>

        <FieldGroup label="Email">
          <input
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = BLUE)}
            onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
          />
        </FieldGroup>

        <FieldGroup label="Password">
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="************"
              value={formData.password}
              onChange={(e) => update("password", e.target.value)}
              style={{ ...inputStyle, paddingRight: 42 }}
              onFocus={(e) => (e.target.style.borderColor = BLUE)}
              onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 4,
                display: "flex", alignItems: "center", color: GRAY_400,
              }}
            >
              {showPassword ? <TbEyeOff size={18} /> : <TbEye size={18} />}
            </button>
          </div>
        </FieldGroup>

        <button
          onClick={handleRegister}
          style={{ ...btnYellow, marginTop: 8 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: 18, fontSize: 14, color: GRAY_500, fontFamily: FONT }}>
          Already have an account?{" "}
          <span
            style={{ color: "#111827", fontWeight: 600, textDecoration: "underline", cursor: "pointer", transition: "color 0.2s" }}
            onClick={() => router.push("/startups/login")}
            onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
          >
            Log in
          </span>
        </p>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", margin: "20px 0", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: GRAY_200 }} />
          <span style={{ fontSize: 13, color: GRAY_400, fontFamily: FONT }}>Or</span>
          <div style={{ flex: 1, height: 1, background: GRAY_200 }} />
        </div>

        {/* Social Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button
            style={{
              width: 48, height: 48, borderRadius: "50%", border: `1px solid ${GRAY_300}`,
              background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GRAY_100)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <FaGoogle size={20} color="#4285F4" />
          </button>
          <button
            style={{
              width: 48, height: 48, borderRadius: "50%", border: `1px solid ${GRAY_300}`,
              background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GRAY_100)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <FaLinkedinIn size={20} color="#0A66C2" />
          </button>
        </div>
      </>
    );

  // ─── STEP 1: Company Identity ─────────────────────────────────────────────

  const renderStep1 = () => (
    <>
      {renderOnboardingHeader(1)}

      <FieldGroup label="Company Name" required>
        <input
          placeholder="Acme Technologies inc."
          value={formData.companyName}
          onChange={(e) => update("companyName", e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      <FieldGroup label="Industry" required>
        <SelectField
          placeholder="Select your industry"
          value={formData.industry}
          onChange={(v) => update("industry", v)}
          options={INDUSTRIES}
        />
      </FieldGroup>

      <FieldGroup label="Founded Date" required>
        <IconInput
          icon={<TbCalendar size={18} />}
          placeholder="Current Stage"
          value={formData.foundedDate}
          onChange={(v) => update("foundedDate", v)}
        />
      </FieldGroup>

      <FieldGroup label="Website">
        <IconInput
          icon={<TbWorld size={18} />}
          placeholder="https://example.com"
          value={formData.website}
          onChange={(v) => update("website", v)}
        />
      </FieldGroup>

      <FieldGroup label="Company Registration Number">
        <IconInput
          icon={<TbFileText size={18} />}
          placeholder="REG123456"
          value={formData.registrationNumber}
          onChange={(v) => update("registrationNumber", v)}
        />
      </FieldGroup>

      <FieldGroup label="Website">
        <SelectField
          placeholder="Country"
          value={formData.country}
          onChange={(v) => update("country", v)}
          options={COUNTRIES}
        />
      </FieldGroup>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 2: Company Stage & Type ─────────────────────────────────────────

  const renderStep2 = () => (
    <>
      {renderOnboardingHeader(2)}

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>What stage is your company at?</label>
        {COMPANY_STAGES.map((s) => (
          <CheckOption
            key={s.label}
            label={s.label}
            desc={s.desc}
            selected={formData.companyStage === s.label}
            onSelect={() => update("companyStage", s.label)}
          />
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>What Type of company are you?</label>
        {COMPANY_TYPES.map((t) => (
          <CheckOption
            key={t.label}
            label={t.label}
            desc={t.desc}
            selected={formData.companyType === t.label}
            onSelect={() => update("companyType", t.label)}
          />
        ))}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>Company team size</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TEAM_SIZES.map((size) => (
            <PillOption
              key={size}
              label={size}
              selected={formData.teamSize === size}
              onSelect={() => update("teamSize", size)}
            />
          ))}
        </div>
      </div>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 3: Team Information ─────────────────────────────────────────────

  const renderStep3 = () => (
    <>
      {renderOnboardingHeader(3)}

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827", fontFamily: FONT, marginBottom: 16 }}>
          Primary Founder
        </h3>

        <FieldGroup label="Full Name">
          <input
            placeholder="John Doe"
            value={formData.founderName}
            onChange={(e) => update("founderName", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = BLUE)}
            onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
          />
        </FieldGroup>

        <FieldGroup label="Role">
          <input
            placeholder="CEO & Co-Founder"
            value={formData.founderRole}
            onChange={(e) => update("founderRole", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = BLUE)}
            onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
          />
        </FieldGroup>

        <FieldGroup label="Email">
          <input
            type="email"
            placeholder="john@company.com"
            value={formData.founderEmail}
            onChange={(e) => update("founderEmail", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = BLUE)}
            onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
          />
        </FieldGroup>

        <FieldGroup label="Linkedin Profile">
          <input
            placeholder="linkedin.com/in/johndoe"
            value={formData.founderLinkedin}
            onChange={(e) => update("founderLinkedin", e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = BLUE)}
            onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
          />
        </FieldGroup>
      </div>

      {/* Co-Founders */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827", fontFamily: FONT, marginBottom: 16 }}>
          Co-Founders (Optional)
        </h3>

        {coFounders.map((cf, idx) => (
          <div
            key={idx}
            style={{
              padding: 16, borderRadius: 14, border: `1px solid ${GRAY_200}`,
              background: GRAY_100, marginBottom: 12, position: "relative",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: GRAY_600, fontFamily: FONT }}>
                Co-Founder {idx + 1}
              </span>
              <button
                onClick={() => setCoFounders((prev) => prev.filter((_, i) => i !== idx))}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: 4,
                  display: "flex", alignItems: "center", color: "#EF4444",
                  transition: "transform 0.15s",
                  WebkitTapHighlightColor: "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <TbTrash size={18} />
              </button>
            </div>

            <input
              placeholder="John Doe"
              value={cf.name}
              onChange={(e) => {
                const updated = [...coFounders];
                updated[idx] = { ...updated[idx], name: e.target.value };
                setCoFounders(updated);
              }}
              style={{ ...inputStyle, marginBottom: 10, background: "#fff" }}
              onFocus={(e) => (e.target.style.borderColor = BLUE)}
              onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
            />
            <input
              placeholder="Role (e.g., CEO)"
              value={cf.role}
              onChange={(e) => {
                const updated = [...coFounders];
                updated[idx] = { ...updated[idx], role: e.target.value };
                setCoFounders(updated);
              }}
              style={{ ...inputStyle, marginBottom: 10, background: "#fff" }}
              onFocus={(e) => (e.target.style.borderColor = BLUE)}
              onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
            />
            <input
              type="email"
              placeholder="Email"
              value={cf.email}
              onChange={(e) => {
                const updated = [...coFounders];
                updated[idx] = { ...updated[idx], email: e.target.value };
                setCoFounders(updated);
              }}
              style={{ ...inputStyle, background: "#fff" }}
              onFocus={(e) => (e.target.style.borderColor = BLUE)}
              onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
            />
          </div>
        ))}

        <button
          onClick={() => setCoFounders((prev) => [...prev, { name: "", role: "", email: "" }])}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "12px", borderRadius: 12,
            border: `1.5px dashed ${GRAY_300}`, background: "#fff",
            color: GRAY_600, fontSize: 14, fontWeight: 500, fontFamily: FONT,
            cursor: "pointer", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = BLUE)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = GRAY_300)}
        >
          <TbPlus size={18} /> Add Co-Founder
        </button>
      </div>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 4: Business Model ───────────────────────────────────────────────

  const renderStep4 = () => (
    <>
      {renderOnboardingHeader(4)}

      <FieldGroup label="Business Description">
        <textarea
          placeholder="Describe what your company does in 2-3 sentences..."
          value={formData.businessDescription}
          onChange={(e) => update("businessDescription", e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      <FieldGroup label="What problem are you solving?">
        <textarea
          placeholder="Explain the key problem your startup addresses..."
          value={formData.problemSolving}
          onChange={(e) => update("problemSolving", e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      <FieldGroup label="Target Market">
        <input
          placeholder="e.g., Small businesses in MENA region"
          value={formData.targetMarket}
          onChange={(e) => update("targetMarket", e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      <FieldGroup label="Revenue Modal">
        <SelectField
          placeholder="Select your revenue modal"
          value={formData.revenueModel}
          onChange={(v) => update("revenueModel", v)}
          options={REVENUE_MODELS}
        />
      </FieldGroup>

      <FieldGroup label="Current Monthly Revenue">
        <input
          placeholder="$0 or enter amount"
          value={formData.currentRevenue}
          onChange={(e) => update("currentRevenue", e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      <FieldGroup label="Projected Annual Revenue (Next Year)">
        <input
          placeholder="Enter projected amount"
          value={formData.projectedRevenue}
          onChange={(e) => update("projectedRevenue", e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 5: Funding Information ──────────────────────────────────────────

  const renderStep5 = () => (
    <>
      {renderOnboardingHeader(5)}

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>What stage is your company at?</label>
        {FUNDING_STAGES.map((s) => (
          <CheckOption
            key={s.label}
            label={s.label}
            desc={s.desc}
            selected={formData.fundingStage === s.label}
            onSelect={() => update("fundingStage", s.label)}
          />
        ))}
      </div>

      <FieldGroup label="Amount Raising">
        <input
          placeholder="e.g., $1,000,000"
          value={formData.amountRaising}
          onChange={(e) => update("amountRaising", e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      <FieldGroup label="Current Funding Raised">
        <input
          placeholder="e.g., $250,000 or $0"
          value={formData.currentFunding}
          onChange={(e) => update("currentFunding", e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>How will you use the funds?</label>
        {FUND_USAGES.map((usage) => (
          <CheckboxItem
            key={usage}
            label={usage}
            checked={formData.fundUsage.includes(usage)}
            onChange={() => toggleArrayItem("fundUsage", usage)}
          />
        ))}
      </div>

      <FieldGroup label="Previous Investors (if any)">
        <textarea
          placeholder="List any previous investors"
          value={formData.previousInvestors}
          onChange={(e) => update("previousInvestors", e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 6: Shariah Compliance ───────────────────────────────────────────

  const renderStep6 = () => (
    <>
      {renderOnboardingHeader(6)}

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>Is your business Shariah compliant?</label>

        {/* Yes option */}
        <div
          onClick={() => update("shariahStatus", "yes")}
          style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            padding: "14px 16px", borderRadius: 12,
            border: `1.5px solid ${formData.shariahStatus === "yes" ? GREEN : GRAY_300}`,
            background: formData.shariahStatus === "yes" ? "#ECFDF5" : "#fff",
            cursor: "pointer", transition: "all 0.2s", marginBottom: 12,
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => { if (formData.shariahStatus !== "yes") e.currentTarget.style.borderColor = GRAY_400; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = formData.shariahStatus === "yes" ? GREEN : GRAY_300; e.currentTarget.style.boxShadow = 'none'; }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.99)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            border: `2px solid ${formData.shariahStatus === "yes" ? GREEN : GRAY_300}`,
            background: formData.shariahStatus === "yes" ? GREEN : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: 1, transition: "all 0.2s",
          }}>
            {formData.shariahStatus === "yes" && <TbCheck size={14} color="#fff" strokeWidth={3} />}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT }}>Yes, we are Shariah compliant</div>
            <div style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT, marginTop: 2 }}>Our business follows islamic finance principles</div>
          </div>
        </div>

        {/* Working towards option */}
        <div
          onClick={() => update("shariahStatus", "working")}
          style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            padding: "14px 16px", borderRadius: 12,
            border: `1.5px solid ${formData.shariahStatus === "working" ? ORANGE : GRAY_300}`,
            background: formData.shariahStatus === "working" ? "#FFF7ED" : "#fff",
            cursor: "pointer", transition: "all 0.2s", marginBottom: 12,
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => { if (formData.shariahStatus !== "working") e.currentTarget.style.borderColor = GRAY_400; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = formData.shariahStatus === "working" ? ORANGE : GRAY_300; e.currentTarget.style.boxShadow = 'none'; }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.99)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            border: `2px solid ${formData.shariahStatus === "working" ? GREEN : GRAY_300}`,
            background: formData.shariahStatus === "working" ? GREEN : "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: 1, transition: "all 0.2s",
          }}>
            {formData.shariahStatus === "working" && <TbCheck size={14} color="#fff" strokeWidth={3} />}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT }}>Working towards compliance</div>
            <div style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT, marginTop: 2 }}>We&apos;re in the process of becoming compliant</div>
          </div>
        </div>
      </div>

      {/* Compliance Areas - show when "yes" selected */}
      {formData.shariahStatus === "yes" && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ ...labelStyle, marginBottom: 12 }}>Compliance Areas</label>
          {COMPLIANCE_AREAS.map((area) => (
            <CheckboxItem
              key={area}
              label={area}
              checked={formData.complianceAreas.includes(area)}
              onChange={() => toggleArrayItem("complianceAreas", area)}
            />
          ))}
        </div>
      )}

      <ShariahInfoBox />

      {renderNavButtons()}
    </>
  );

  // ─── STEP 7: Upload Documents ─────────────────────────────────────────────

  const renderStep7 = () => (
    <>
      {renderOnboardingHeader(7)}

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 8 }}>Documents (Optional)</label>

        {/* Drag & Drop Area */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFileSelect(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: "32px 20px",
            border: `2px dashed ${dragActive ? BLUE : GRAY_300}`,
            borderRadius: 14,
            background: dragActive ? "#EFF6FF" : "#FAFBFC",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => { if (!dragActive) { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = '#F0F7FF'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(59,130,246,0.08)'; } }}
          onMouseLeave={(e) => { if (!dragActive) { e.currentTarget.style.borderColor = GRAY_300; e.currentTarget.style.background = '#FAFBFC'; e.currentTarget.style.boxShadow = 'none'; } }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.99)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{
            width: 48, height: 48, borderRadius: "50%", background: "#F3E8FF",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 12px",
          }}>
            <TbCloudUpload size={24} color="#7C3AED" />
          </div>
          <p style={{ fontSize: 14, color: GRAY_600, fontFamily: FONT }}>
            Drag and drop files here, or{" "}
            <span style={{ color: BLUE, fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>browse</span>
          </p>
          <p style={{ fontSize: 12, color: GRAY_400, fontFamily: FONT, marginTop: 4 }}>
            PDF,PPT,DOC(max 10MB per file)
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.ppt,.pptx,.doc,.docx"
          style={{ display: "none" }}
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        {/* Uploaded files list */}
        {documents.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {documents.map((doc, idx) => (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 10,
                background: GRAY_100, marginBottom: 6,
                transition: "all 0.2s",
                cursor: "default",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = GRAY_200; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = GRAY_100; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <TbFile size={18} color={GRAY_500} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", fontFamily: FONT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</div>
                  <div style={{ fontSize: 11, color: GRAY_400, fontFamily: FONT }}>{doc.category}</div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setDocuments((prev) => prev.filter((_, i) => i !== idx)); }}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#EF4444", transition: "transform 0.15s", flexShrink: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <TbTrash size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: GRAY_700, fontFamily: FONT, marginBottom: 8 }}>
          Recommended documents:
        </p>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {["Pitch Deck", "Business Plan", "Financial Projections", "Company Registration"].map((doc) => (
            <li key={doc} style={{ fontSize: 14, color: GRAY_600, fontFamily: FONT, marginBottom: 4 }}>{doc}</li>
          ))}
        </ul>
      </div>

      <div style={{
        padding: 14, borderRadius: 12, background: "#EFF6FF",
        border: "1px solid #BFDBFE", marginTop: 8,
      }}>
        <p style={{ fontSize: 13, color: "#1D4ED8", fontFamily: FONT, lineHeight: 1.5 }}>
          A well-prepared pitch deck significantly increases your chances of securing funding.
        </p>
      </div>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 8: Review & Submit ──────────────────────────────────────────────

  const reviewSections = [
    {
      title: "Company Information",
      step: "Step 1",
      icon: <TbBuilding size={18} color="#fff" />,
      gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
      fields: [
        { label: "Company Nmae", value: formData.companyName },
        { label: "Industry", value: formData.industry },
        { label: "Founded Date", value: formData.foundedDate },
        { label: "Wensite", value: formData.website },
        { label: "Country", value: formData.country },
        { label: "Stage", value: formData.companyStage },
        { label: "Type", value: formData.companyType },
        { label: "Team Size", value: formData.teamSize },
      ],
    },
    {
      title: "Founder Information",
      step: "Step 2",
      icon: <TbUser size={18} color="#fff" />,
      gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
      fields: [
        { label: "Founder Name", value: formData.founderName },
        { label: "Role", value: formData.founderRole },
        { label: "Email", value: formData.founderEmail },
        { label: "Linkedin", value: formData.founderLinkedin },
      ],
    },
    {
      title: "Business Model",
      step: "Step 2",
      icon: <TbChartLine size={18} color="#fff" />,
      gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)",
      fields: [
        { label: "Revenue Model", value: formData.revenueModel },
        { label: "Current Revenue", value: formData.currentRevenue },
        { label: "Projected Revenue", value: formData.projectedRevenue },
      ],
    },
    {
      title: "Funding Information",
      step: "Step 2",
      icon: <TbCurrencyDollar size={18} color="#fff" />,
      gradient: "linear-gradient(135deg, #10B981, #34D399)",
      fields: [
        { label: "Funding Stage", value: formData.fundingStage },
        { label: "AmountRaising", value: formData.amountRaising },
        { label: "Current Funding", value: formData.currentFunding },
      ],
    },
    {
      title: "Shariah Compliance",
      step: "Step 4",
      icon: <TbShield size={18} color="#fff" />,
      gradient: "linear-gradient(135deg, #EC4899, #F472B6)",
      fields: [
        { label: "Shariah Compliant", value: formData.shariahStatus === "yes" ? "Yes" : formData.shariahStatus === "working" ? "Working towards" : "" },
        { label: "Certification", value: formData.complianceAreas.length > 0 ? "Yes" : "No" },
      ],
    },
    {
      title: "Documents",
      step: "Step 10",
      icon: <TbFile size={18} color="#fff" />,
      gradient: "linear-gradient(135deg, #F97316, #FB923C)",
      fields: [],
      documents: documents,
    },
  ];

  const renderStep8 = () => (
    <>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", fontFamily: FONT, marginBottom: 4 }}>
        Review & Submit
      </h2>
      <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, marginBottom: 18, lineHeight: 1.5 }}>
        Almost there! Please review your submission and submit.
      </p>
      <div style={{ height: 1, background: GRAY_200, marginBottom: 20 }} />

      {reviewSections.map((section, idx) => (
        <div key={idx} style={{ marginBottom: 12, borderRadius: 14, overflow: "hidden", border: `1px solid ${GRAY_200}` }}>
          {/* Section Header */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 14px", background: section.gradient,
              cursor: "pointer",
              transition: "filter 0.2s, opacity 0.2s",
              WebkitTapHighlightColor: "transparent",
            }}
            onClick={() => toggleSection(idx)}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
            onMouseDown={(e) => (e.currentTarget.style.filter = 'brightness(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.filter = 'brightness(1.08)')}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {section.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: FONT }}>{section.title}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: FONT }}>{section.step}</div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setStep(idx + 1 > 6 ? 6 : idx + 1); }}
              style={{
                background: "rgba(255,255,255,0.2)", border: "none",
                borderRadius: 6, padding: 6, cursor: "pointer", display: "flex",
                marginRight: 6,
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <TbPencil size={14} color="#fff" />
            </button>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              {expandedSections.has(idx)
                ? <TbChevronUp size={18} color="#fff" />
                : <TbChevronDown size={18} color="#fff" />
              }
            </div>
          </div>

          {/* Section Content */}
          {expandedSections.has(idx) && (
            <div style={{ padding: "12px 14px" }}>
              {section.fields.map((field, fi) => (
                <div key={fi} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0", borderBottom: fi < section.fields.length - 1 ? `1px solid ${GRAY_100}` : "none",
                }}>
                  <span style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>{field.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: field.value ? "#111827" : GRAY_400, fontFamily: FONT }}>
                    {field.value || "Not Provided"}
                  </span>
                </div>
              ))}

              {/* Document files */}
              {section.documents && section.documents.length > 0 && (
                <div style={{ marginTop: 4 }}>
                  {section.documents.map((doc, di) => (
                    <div key={di} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 12px", borderRadius: 10,
                      background: GRAY_100, marginBottom: 6,
                      transition: "background 0.2s",
                      cursor: "default",
                    }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = GRAY_200)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = GRAY_100)}
                    >
                      <TbFile size={16} color={GRAY_500} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", fontFamily: FONT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</div>
                        <div style={{ fontSize: 11, color: GRAY_400, fontFamily: FONT }}>{doc.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {section.documents && section.documents.length === 0 && (
                <p style={{ fontSize: 13, color: GRAY_400, fontFamily: FONT, padding: "8px 0" }}>No documents uploaded</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Important Confirmation */}
      <div style={{
        display: "flex", gap: 12, padding: 16, borderRadius: 12,
        background: "#FEF3C7", border: "1px solid #FDE68A", marginTop: 16,
      }}>
        <TbAlertTriangle size={22} color="#D97706" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#92400E", fontFamily: FONT }}>
            Important Confirmation
          </div>
          <div style={{ fontSize: 13, color: "#92400E", fontFamily: FONT, marginTop: 4, lineHeight: 1.5 }}>
            By submitting, you confirm that all information provided is accurate and complete. Our team will review your application within 24-48 hours.
          </div>
        </div>
      </div>

      {renderNavButtons("Continue")}
    </>
  );

  // ─── APPLICATION SUBMITTED ────────────────────────────────────────────────

  const renderSubmitted = () => (
    <div style={{
      minHeight: "100vh", background: "#fff", fontFamily: FONT,
      width: "100%", maxWidth: 430, margin: "0 auto",
      boxSizing: "border-box",
    }}>
      {/* Top Bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px clamp(16px, 5vw, 20px)", borderBottom: `1px solid ${GRAY_200}`,
      }}>
        <Image src={logo1} alt="emireq" width={140} height={36} style={{ objectFit: "contain" }} />
        <span
          style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT, cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
          onMouseLeave={(e) => (e.currentTarget.style.color = GRAY_500)}
        >
          English(UK) ▾
        </span>
      </div>

      <div style={{ padding: "24px clamp(16px, 5vw, 20px) 40px" }}>
        {/* Dashboard Preview Image */}
        <div style={{
          width: "100%", borderRadius: 14,
          marginBottom: 20, overflow: "hidden",
          border: `1px solid ${GRAY_200}`,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}>
          <Image
            src={signuplast}
            alt="Dashboard Preview"
            width={430}
            height={220}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
        </div>

        <h1 style={{
          fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 700, color: "#111827",
          fontFamily: FONT, textAlign: "center", marginBottom: 24,
        }}>
          Application Submitted!!
        </h1>

        {/* Profile Card */}
        <div style={{
          borderRadius: 18, overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: `1px solid ${GRAY_200}`,
          marginBottom: 24,
        }}>
          {/* Card Header - Purple Gradient */}
          <div style={{
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            padding: "16px 18px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <TbRocket size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: FONT }}>Startup Profile</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: FONT }}>Active & Under Review</div>
              </div>
            </div>
            <span style={{
              padding: "5px 14px", borderRadius: 999,
              background: "#EAB308", color: "#fff",
              fontSize: 12, fontWeight: 700, fontFamily: FONT,
              whiteSpace: "nowrap",
            }}>
              Pending Review
            </span>
          </div>

          {/* Card Body */}
          <div style={{ padding: "8px 18px 16px" }}>
            {[
              { icon: <TbBuilding size={18} color={GRAY_500} />, label: "Company Name", value: formData.companyName || "N/A" },
              { icon: <TbMail size={18} color={GRAY_500} />, label: "Contact Email", value: formData.email || formData.founderEmail || "N/A" },
              { icon: <TbTrendingUp size={18} color={GRAY_500} />, label: "Industry", value: formData.industry || "N/A" },
              { icon: <TbCurrencyDollar size={18} color={GRAY_500} />, label: "Funding Stage", value: formData.fundingStage || "N/A" },
              { icon: <TbMapPin size={18} color={GRAY_500} />, label: "Location", value: formData.country || "N/A" },
            ].map((item, idx) => (
              <div key={idx} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0",
                borderBottom: idx < 4 ? `1px solid ${GRAY_100}` : "none",
              }}>
                <div style={{ flexShrink: 0 }}>{item.icon}</div>
                <span style={{ flex: 1, fontSize: 14, color: GRAY_500, fontFamily: FONT }}>{item.label}</span>
                <span style={{
                  fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT,
                  textAlign: "right", maxWidth: "50%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {item.value}
                </span>
              </div>
            ))}

            {/* Bottom Stats */}
            <div style={{
              display: "flex", gap: 10, marginTop: 16,
            }}>
              <div style={{
                flex: 1, padding: "12px 8px", borderRadius: 12,
                background: "#EFF6FF", textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(59,130,246,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <TbRocket size={20} color="#3B82F6" style={{ margin: "0 auto 4px", display: "block" }} />
                <div style={{ fontSize: 12, color: GRAY_500, fontFamily: FONT }}>Stage</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT, marginTop: 2 }}>
                  {formData.companyStage || "N/A"}
                </div>
              </div>
              <div style={{
                flex: 1, padding: "12px 8px", borderRadius: 12,
                background: "#F3E8FF", textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(124,58,237,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <TbStarFilled size={20} color="#7C3AED" style={{ margin: "0 auto 4px", display: "block" }} />
                <div style={{ fontSize: 12, color: GRAY_500, fontFamily: FONT }}>Raising</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT, marginTop: 2 }}>
                  {formData.amountRaising || "N/A"}
                </div>
              </div>
              <div style={{
                flex: 1, padding: "12px 8px", borderRadius: 12,
                background: "#ECFDF5", textAlign: "center",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(16,185,129,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <TbCircleCheck size={20} color="#10B981" style={{ margin: "0 auto 4px", display: "block" }} />
                <div style={{ fontSize: 12, color: GRAY_500, fontFamily: FONT }}>Documents</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT, marginTop: 2 }}>
                  {documents.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={() => router.push("/startups")}
          style={{ ...btnYellow, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Go to Dashboard <span style={{ fontSize: 18 }}>→</span>
        </button>

        <button
          onClick={() => router.push("/marketplace")}
          style={{
            ...btnBack, marginTop: 12,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = GRAY_100)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <TbRocket size={18} /> Browse Investors
        </button>
      </div>
    </div>
  );

  // ─── Onboarding Step Router ───────────────────────────────────────────────

  const renderCurrentStep = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      case 7: return renderStep7();
      case 8: return renderStep8();
      default: return renderStep1();
    }
  };

  // ─── Main Render ──────────────────────────────────────────────────────────

  if (view === "register") return renderRegistration();
  if (view === "submitted") return renderSubmitted();

  const heroConfig = HERO_CONFIG[step] || HERO_CONFIG[1];

  return renderPageWrapper(
    <span>STEP {step} OF 10</span>,
    heroConfig.title,
    heroConfig.subtitle,
    renderCurrentStep()
  );
}
