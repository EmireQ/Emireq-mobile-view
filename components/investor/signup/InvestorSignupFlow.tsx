"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  TbCheck, TbChevronDown, TbChevronUp, TbEye, TbEyeOff,
  TbMail, TbPhone, TbHelpCircle, TbShield, TbCircleCheck,
  TbDeviceDesktop, TbHeart, TbBuildingBank, TbBolt, TbBrain,
  TbCloudUpload, TbFileText, TbX, TbPencil,
  TbUser, TbAlertTriangle, TbTrendingUp, TbFileCheck,
  TbChartLine, TbShieldCheck, TbCar,
} from "react-icons/tb";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";
import { submitInvestorOnboardingStep, getInvestorOnboardingStatus } from "@/services/investors";

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_sparkle)">
      <path d="M5.79663 9.04116C5.74455 8.83929 5.63933 8.65506 5.49191 8.50763C5.34449 8.36021 5.16025 8.25499 4.95838 8.20291L1.37963 7.28008C1.31857 7.26275 1.26483 7.22597 1.22657 7.17534C1.18831 7.1247 1.1676 7.06296 1.1676 6.99949C1.1676 6.93603 1.18831 6.87429 1.22657 6.82365C1.26483 6.77301 1.31857 6.73624 1.37963 6.71891L4.95838 5.79549C5.16018 5.74346 5.34437 5.63833 5.49178 5.49102C5.6392 5.34371 5.74446 5.1596 5.79663 4.95783L6.71946 1.37908C6.73662 1.31778 6.77335 1.26378 6.82407 1.22531C6.87478 1.18684 6.93668 1.16602 7.00034 1.16602C7.06399 1.16602 7.1259 1.18684 7.17661 1.22531C7.22732 1.26378 7.26406 1.31778 7.28121 1.37908L8.20346 4.95783C8.25554 5.1597 8.36077 5.34393 8.50819 5.49135C8.65561 5.63878 8.83984 5.744 9.04171 5.79608L12.6205 6.71833C12.682 6.7353 12.7363 6.772 12.775 6.82279C12.8136 6.87358 12.8346 6.93566 12.8346 6.99949C12.8346 7.06333 12.8136 7.12541 12.775 7.1762C12.7363 7.22699 12.682 7.26369 12.6205 7.28066L9.04171 8.20291C8.83984 8.25499 8.65561 8.36021 8.50819 8.50763C8.36077 8.65506 8.25554 8.83929 8.20346 9.04116L7.28063 12.6199C7.26347 12.6812 7.22674 12.7352 7.17603 12.7737C7.12531 12.8122 7.06341 12.833 6.99975 12.833C6.9361 12.833 6.8742 12.8122 6.82348 12.7737C6.77277 12.7352 6.73603 12.6812 6.71888 12.6199L5.79663 9.04116Z" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6667 1.75V4.08333" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.8333 2.91699H10.5" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.33331 9.91699V11.0837" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.91667 10.5H1.75" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_sparkle">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);
const BuildingIcon = ({ size = 20, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip_building)">
      <path d="M4.25 15.5832V2.83317C4.25 2.45745 4.39926 2.09711 4.66493 1.83144C4.93061 1.56576 5.29094 1.4165 5.66667 1.4165H11.3333C11.7091 1.4165 12.0694 1.56576 12.3351 1.83144C12.6007 2.09711 12.75 2.45745 12.75 2.83317V15.5832H4.25Z" stroke={color} strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.24984 8.5H2.83317C2.45745 8.5 2.09711 8.64926 1.83144 8.91493C1.56576 9.18061 1.4165 9.54094 1.4165 9.91667V14.1667C1.4165 14.5424 1.56576 14.9027 1.83144 15.1684C2.09711 15.4341 2.45745 15.5833 2.83317 15.5833H4.24984" stroke={color} strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.75 6.375H14.1667C14.5424 6.375 14.9027 6.52426 15.1684 6.78993C15.4341 7.05561 15.5833 7.41594 15.5833 7.79167V14.1667C15.5833 14.5424 15.4341 14.9027 15.1684 15.1684C14.9027 15.4341 14.5424 15.5833 14.1667 15.5833H12.75" stroke={color} strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.0835 4.25H9.91683" stroke={color} strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.0835 7.0835H9.91683" stroke={color} strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.0835 9.9165H9.91683" stroke={color} strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.0835 12.75H9.91683" stroke={color} strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip_building">
        <rect width="17" height="17" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);
import logologin from "@/public/assets/logologin.png";
import logoinvestors from "@/public/assets/logoinvestors.png";

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const YELLOW = "#FFC300";
const YELLOW_HOVER = "#E6B000";
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
const TOTAL_STEPS = 9;

// ─── Data ─────────────────────────────────────────────────────────────────────

const COUNTRIES = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Bahrain", "Kuwait",
  "Oman", "Jordan", "Egypt", "Turkey", "India", "Malaysia", "Indonesia",
  "Pakistan", "United Kingdom", "United States", "Canada",
  "Singapore", "Australia", "Germany", "France", "Other",
];

const INVESTOR_TYPES = [
  { label: "Individual Investor", desc: "Investing personal funds" },
  { label: "Angel Investor", desc: "High-net-worth individual investor" },
  { label: "Venture Capital", desc: "Professional investment firm" },
  { label: "Corporate Investor", desc: "Corporate venture arm" },
  { label: "Family Office", desc: "Managing family wealth" },
  { label: "Institutional Investor", desc: "Pension funds, endowments" },
  { label: "Government / Fund of Funds", desc: "Public sector investment" },
];

const INVESTMENT_GOALS = [
  "Build Long-term ethical wealth",
  "Support startups & technology ventures",
  "Diversity with real estate and tokenized assets",
  "Drive Islamic Finance projects",
  "create a balanced halal portfolio",
];

const TIME_HORIZONS = [
  "Short-term (1-3 years)",
  "Medium-term (3-7 years)",
  "Long-term (7+ years)",
];

const INVESTMENT_STAGES = [
  "Pre-Seed", "Seed", "MVP", "Series A/B/C", "Expansion/Growth Stage", "Other",
];

const SECTORS: { label: string; Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }> }[] = [
  { label: "Technology & Software", Icon: TbDeviceDesktop },
  { label: "Healthcare & Biotech", Icon: TbHeart },
  { label: "Fintech & Banking", Icon: TbBuildingBank },
  { label: "Clean Energy & Climate", Icon: TbBolt },
  { label: "AI & Machine Learning", Icon: TbBrain },
  { label: "Automotive & Mobility", Icon: TbCar },
];

// ─── Hero / Card Config per step ──────────────────────────────────────────────

const HERO_CONFIG: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Tell Us About Yourself", subtitle: "We'd love to get to know you better. This information helps us personalize your investment experience." },
  2: { title: "We'll keep you updated on deals\nthat match your profile.", subtitle: "" },
  3: { title: "We'll keep you updated on deals\nthat match your profile.", subtitle: "" },
  4: { title: "Shariah-Compliant Investment", subtitle: "Emireq is commited to providing only Shariah-compliant investment opportunities." },
  5: { title: "Shariah-Compliant Investment", subtitle: "Emireq is commited to providing only Shariah-compliant investment opportunities." },
  6: { title: "Shariah-Compliant Investment", subtitle: "Emireq is commited to providing only Shariah-compliant investment opportunities." },
  7: { title: "Find your perfect match", subtitle: "By understanding your sector preferences, we can curate investment opportunities that align with your interests and expertise." },
  8: { title: "Secure Verification", subtitle: "To comply with regulations and protect all parties, we need to verify your identity and investment qualifications." },
  9: { title: "Secure Verification", subtitle: "To comply with regulations and protect all parties, we need to verify your identity and investment qualifications." },
};

const CARD_CONFIG: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Personal Information", subtitle: "Let's start by getting to know you" },
  2: { title: "Contact Information", subtitle: "How can we reach you with important updates and opportunities?" },
  3: { title: "Investor Type", subtitle: "How can we reach you with important updates and opportunities?" },
  4: { title: "Shariah Compliance", subtitle: "Confirm your commitment to Shariah-complaint investing" },
  5: { title: "Investor Mission", subtitle: "What's your primary investment goal?" },
  6: { title: "Investor Stages", subtitle: "Which Investment stages interests you?" },
  7: { title: "Sector Interests", subtitle: "Select at least 3 sectors you're interested in investing" },
  8: { title: "Document Upload", subtitle: "Upload required documents to verify your identity and investor status" },
  9: { title: "Review & Submit", subtitle: "Almost there! Please review your submission and submit." },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadedDoc {
  name: string;
  file: File;
  category: "id" | "accreditation" | "funds";
}

interface OnboardingFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  country: string;
  contactEmail: string;
  mobileNumber: string;
  investorTypes: string[];
  shariahConfirmed: boolean;
  investmentGoals: string[];
  timeHorizon: string;
  investmentStages: string[];
  otherStages: string;
  sectors: string[];
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

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
  boxSizing: "border-box",
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
  color: NAVY,
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

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function SelectField({
  placeholder, value, onChange, options,
}: {
  placeholder: string; value: string; onChange: (v: string) => void; options: string[];
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InvestorSignupFlow() {
  const router = useRouter();
  const { investorRegister, investorLogin, getToken } = useAuth();
  const idFileRef = useRef<HTMLInputElement>(null);
  const accreditationFileRef = useRef<HTMLInputElement>(null);
  const fundsFileRef = useRef<HTMLInputElement>(null);

  const [view, setView] = useState<"register" | "onboarding" | "submitted">("register");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]));
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [documents, setDocuments] = useState<UploadedDoc[]>([]);

  const [formData, setFormData] = useState<OnboardingFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    country: "",
    contactEmail: "",
    mobileNumber: "",
    investorTypes: [],
    shariahConfirmed: false,
    investmentGoals: [],
    timeHorizon: "",
    investmentStages: [],
    otherStages: "",
    sectors: [],
  });

  const update = useCallback((field: keyof OnboardingFormData, value: string | string[] | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleArrayItem = useCallback((field: "investorTypes" | "investmentGoals" | "investmentStages" | "sectors", item: string) => {
    setFormData((prev) => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item] };
    });
  }, []);

  const handleRegister = async () => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      await investorRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      // Auto-login after registration
      await investorLogin(formData.email, formData.password);

      // getToken() may return null because React state hasn't re-rendered yet
      // Read directly from localStorage as fallback
      const token = await getToken() || localStorage.getItem("emireq_investor_token");
      if (token) {
        try {
          const status = await getInvestorOnboardingStatus(token);
          if (status.completed) {
            router.push("/investors");
            return;
          }
          setStep(status.current_step || 1);
        } catch {
          setStep(1);
        }
      } else {
        setStep(1);
      }
      setView("onboarding");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      if (err instanceof ApiError) {
        const errors = err.data.errors as Record<string, string[]> | undefined;
        if (errors) {
          const firstError = Object.values(errors).flat()[0];
          setApiError(firstError || "Registration failed.");
        } else {
          setApiError(String(err.data.message || "Registration failed. Please try again."));
        }
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = async () => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      const token = await getToken() || localStorage.getItem("emireq_investor_token");
      if (token && step <= TOTAL_STEPS) {
        const stepData = getStepData(step);
        await submitInvestorOnboardingStep(token, step, stepData);
      }
      if (step < TOTAL_STEPS) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setView("submitted");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setApiError(String(err.data.message || "Failed to save. Please try again."));
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepData = (s: number): Record<string, unknown> | FormData => {
    switch (s) {
      case 1: return { action: "confirm", full_name: formData.fullName, country: formData.country };
      case 2: return { action: "confirm", contact_email: formData.contactEmail, mobile_number: formData.mobileNumber };
      case 3: return { action: "confirm", investor_types: formData.investorTypes };
      case 4: return { action: "confirm", shariah_confirmed: formData.shariahConfirmed };
      case 5: return { action: "confirm", investment_goals: formData.investmentGoals, time_horizon: formData.timeHorizon };
      case 6: return { action: "confirm", investment_stages: formData.investmentStages, other_stages: formData.otherStages };
      case 7: return { action: "confirm", sectors: formData.sectors };
      case 8: {
        // Upload documents as multipart/form-data
        const fd = new FormData();
        fd.append("action", "confirm");
        for (const doc of documents) {
          fd.append(doc.category, doc.file);
        }
        return fd;
      }
      case 9: return { action: "confirm" }; // Review step
      default: return { action: "confirm" };
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

  const addDocument = (file: File, category: UploadedDoc["category"]) => {
    setDocuments((prev) => {
      const filtered = prev.filter((d) => d.category !== category);
      return [...filtered, { name: file.name, file, category }];
    });
  };

  const removeDocument = (category: UploadedDoc["category"]) => {
    setDocuments((prev) => prev.filter((d) => d.category !== category));
  };

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // ─── Page Wrapper ─────────────────────────────────────────────────────────

  const renderPageWrapper = (rightLabel: React.ReactNode, heroTitle: string, heroSub: string, children: React.ReactNode, headerPill = true) => (
    <div style={{
      minHeight: "100vh",
      fontFamily: FONT,
      position: "relative",
      background: "#F3F4F6",
    }}>
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "46%",
        backgroundImage: `url(${logoinvestors.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(20,12,50,0.25) 0%, rgba(20,12,50,0.15) 50%, rgba(20,12,50,0.45) 100%)",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%",
        maxWidth: 430,
        margin: "0 auto",
        padding: "20px clamp(14px, 4.5vw, 18px) 40px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Image src={logologin} alt="emireq" width={44} height={38} style={{ objectFit: "contain" }} />
          <div style={{
            color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, fontFamily: FONT,
            ...(headerPill ? {
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)", borderRadius: 999,
              padding: "6px 14px",
            } : {}),
          }}>
            {rightLabel}
          </div>
        </div>

        {/* Trusted badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)", borderRadius: 999,
          padding: "6px 14px", marginTop: 24,
        }}>
          <SparkleIcon />
          <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.9)", fontFamily: FONT }}>
            Trusted by 50,000+ users worldwide
          </span>
        </div>

        {/* Hero Text */}
        <h1 style={{
          color: "#fff", fontSize: 26, fontWeight: 500, lineHeight: 1.22,
          marginTop: 14, fontFamily: FONT, whiteSpace: "pre-line",
        }}>
          {heroTitle}
        </h1>
        {heroSub && (
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 10, fontFamily: FONT, lineHeight: 1.55 }}>
            {heroSub}
          </p>
        )}

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 22, marginTop: 24,
          padding: "28px clamp(16px, 5vw, 22px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
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
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: FONT, marginBottom: 6 }}>
          {config.title}
        </h2>
        <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, marginBottom: 16, lineHeight: 1.5 }}>
          {config.subtitle}
        </p>
        {/* Progress bar */}
        <div style={{ width: "100%", height: 3, background: GRAY_200, borderRadius: 2, marginBottom: 24, position: "relative" }}>
          <div style={{
            position: "absolute", left: 0, top: 0, height: 3, borderRadius: 2,
            background: YELLOW,
            width: `${(stepNum / TOTAL_STEPS) * 100}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
      </>
    );
  };

  // ─── Nav Buttons ──────────────────────────────────────────────────────────

  const renderNavButtons = (continueLabel = "Continue") => (
    <div style={{ marginTop: 24 }}>
      {apiError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#dc2626", fontFamily: FONT }}>
          {apiError}
        </div>
      )}
      <button
        onClick={handleContinue}
        disabled={isSubmitting}
        style={{ ...btnYellow, opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
        onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = YELLOW_HOVER; }}
        onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
        onMouseDown={(e) => { if (!isSubmitting) e.currentTarget.style.transform = "scale(0.98)"; }}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isSubmitting ? "Saving..." : continueLabel}
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
          >
            Contact Support
          </span>
        </span>
      </div>
    </div>
  );

  // ─── REGISTRATION VIEW ────────────────────────────────────────────────────

  const renderRegistration = () =>
    renderPageWrapper(
      <span style={{ cursor: "pointer" }}>English(UK) ▾</span>,
      "Get Access to Your Investor Profile\nand Unlock Exclusive Deals.",
      "",
      <>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: FONT }}>
          Welcome to emireq
        </h2>
        <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, marginTop: 6, marginBottom: 24 }}>
          Log in to continue your funding journey.
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

        <FieldGroup label="Confirm Password">
          <div style={{ position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="************"
              value={formData.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              style={{ ...inputStyle, paddingRight: 42 }}
              onFocus={(e) => (e.target.style.borderColor = BLUE)}
              onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 4,
                display: "flex", alignItems: "center", color: GRAY_400,
              }}
            >
              {showConfirmPassword ? <TbEyeOff size={18} /> : <TbEye size={18} />}
            </button>
          </div>
        </FieldGroup>

        {apiError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginTop: 8, fontSize: 13, color: "#dc2626", fontFamily: FONT }}>
            {apiError}
          </div>
        )}

        <button
          onClick={handleRegister}
          disabled={isSubmitting}
          style={{ ...btnYellow, marginTop: 8, opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
          onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = YELLOW_HOVER; }}
          onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
          onMouseDown={(e) => { if (!isSubmitting) e.currentTarget.style.transform = "scale(0.98)"; }}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {isSubmitting ? "Creating Account..." : "Create an Account"}
        </button>

        {/* Already have an account */}
        <div style={{ display: "flex", alignItems: "center", margin: "20px 0 0", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: GRAY_200 }} />
          <span style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, whiteSpace: "nowrap" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#111827", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}
              onClick={() => router.push("/investors/login")}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
            >
              Log in
            </span>
          </span>
          <div style={{ flex: 1, height: 1, background: GRAY_200 }} />
        </div>
      </>
    );

  // ─── STEP 1: Personal Information ─────────────────────────────────────────

  const renderStep1 = () => (
    <>
      {renderOnboardingHeader(1)}

      <FieldGroup label="Full Name">
        <input
          placeholder="username"
          value={formData.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      <FieldGroup label="Country">
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

  // ─── STEP 2: Contact Information ──────────────────────────────────────────

  const renderStep2 = () => (
    <>
      {renderOnboardingHeader(2)}

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Email Address</label>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            color: GRAY_400, display: "flex", alignItems: "center", pointerEvents: "none",
          }}>
            <TbMail size={18} />
          </div>
          <input
            type="email"
            placeholder="username"
            value={formData.contactEmail}
            onChange={(e) => update("contactEmail", e.target.value)}
            style={{ ...inputStyle, paddingLeft: 38 }}
            onFocus={(e) => (e.target.style.borderColor = BLUE)}
            onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
          />
        </div>
        <p style={{ fontSize: 12, color: GRAY_400, fontFamily: FONT, marginTop: 6 }}>
          We&apos;ll send important notifications to this address
        </p>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>Mobile Number</label>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            color: GRAY_400, display: "flex", alignItems: "center", pointerEvents: "none",
          }}>
            <TbPhone size={18} />
          </div>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.mobileNumber}
            onChange={(e) => update("mobileNumber", e.target.value)}
            style={{ ...inputStyle, paddingLeft: 38 }}
            onFocus={(e) => (e.target.style.borderColor = BLUE)}
            onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
          />
        </div>
        <p style={{ fontSize: 12, color: GRAY_400, fontFamily: FONT, marginTop: 6 }}>
          For SMS alerts about time-sensitive opportunities
        </p>
      </div>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 3: Investor Type ────────────────────────────────────────────────

  const renderStep3 = () => (
    <>
      {renderOnboardingHeader(3)}

      {INVESTOR_TYPES.map((type) => {
        const selected = formData.investorTypes.includes(type.label);
        return (
          <div
            key={type.label}
            onClick={() => toggleArrayItem("investorTypes", type.label)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 16px", borderRadius: 12,
              border: `1.5px solid ${selected ? GRAY_700 : GRAY_300}`,
              background: selected ? "#F9FAFB" : "#fff",
              cursor: "pointer", transition: "all 0.2s",
              marginBottom: 12, WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = GRAY_400; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = selected ? GRAY_700 : GRAY_300; e.currentTarget.style.boxShadow = "none"; }}
          >
            {/* Checkbox */}
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              border: `2px solid ${selected ? GRAY_700 : GRAY_300}`,
              background: selected ? GRAY_700 : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "all 0.2s",
            }}>
              {selected && <TbCheck size={14} color="#fff" strokeWidth={3} />}
            </div>
            {/* Label + Desc */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT }}>{type.label}</span>
                <TbHelpCircle size={16} color={GRAY_400} style={{ cursor: "pointer" }} />
              </div>
              <span style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>{type.desc}</span>
            </div>
          </div>
        );
      })}

      {renderNavButtons()}
    </>
  );

  // ─── STEP 4: Shariah Compliance ───────────────────────────────────────────

  const renderStep4 = () => (
    <>
      {renderOnboardingHeader(4)}

      {/* Shariah Principles Box */}
      <div style={{
        border: `1px solid ${GRAY_200}`, borderRadius: 14,
        padding: 20, marginBottom: 20, background: "#FAFAFA",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <TbShield size={22} color={NAVY} strokeWidth={1.8} />
          <span style={{ fontSize: 16, fontWeight: 700, color: "#111827", fontFamily: FONT }}>Our Shariah Principles</span>
        </div>
        {[
          "No involvement in prohibited activities(alcohol, gambling, tabacco, etc)",
          "No involvement in prohibited activities(alcohol, gambling, tabacco, etc)",
        ].map((text, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i === 0 ? 12 : 0 }}>
            <TbCircleCheck size={20} color={GREEN} style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 13, color: GRAY_600, fontFamily: FONT, lineHeight: 1.5 }}>{text}</span>
          </div>
        ))}
      </div>

      {/* Confirmation checkbox */}
      <div
        onClick={() => update("shariahConfirmed", !formData.shariahConfirmed)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 12,
          padding: "16px", borderRadius: 12,
          border: `1.5px solid ${formData.shariahConfirmed ? GREEN : GRAY_300}`,
          background: formData.shariahConfirmed ? "#ECFDF5" : "#fff",
          cursor: "pointer", transition: "all 0.2s",
          WebkitTapHighlightColor: "transparent",
        }}
        onMouseEnter={(e) => { if (!formData.shariahConfirmed) e.currentTarget.style.borderColor = GRAY_400; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = formData.shariahConfirmed ? GREEN : GRAY_300; }}
      >
        <div style={{
          width: 22, height: 22, borderRadius: 6,
          border: `2px solid ${formData.shariahConfirmed ? GREEN : GRAY_300}`,
          background: formData.shariahConfirmed ? GREEN : "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 1, transition: "all 0.2s",
        }}>
          {formData.shariahConfirmed && <TbCheck size={14} color="#fff" strokeWidth={3} />}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT, lineHeight: 1.4 }}>
            I confirm that i want to invest only in Shariah-compliant opportunities
          </div>
          <div style={{ fontSize: 12, color: GRAY_500, fontFamily: FONT, marginTop: 6, lineHeight: 1.5 }}>
            By checking this box, you acknowledge that all your investments through Emireq will be screened for Shariah Compliance
          </div>
        </div>
      </div>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 5: Investor Mission ─────────────────────────────────────────────

  const renderStep5 = () => (
    <>
      {renderOnboardingHeader(5)}

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>Primary Investment Goals</label>
        {INVESTMENT_GOALS.map((goal) => {
          const selected = formData.investmentGoals.includes(goal);
          return (
            <div
              key={goal}
              onClick={() => toggleArrayItem("investmentGoals", goal)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", borderRadius: 12,
                border: `1.5px solid ${selected ? GRAY_700 : GRAY_300}`,
                background: selected ? "#F9FAFB" : "#fff",
                cursor: "pointer", transition: "all 0.2s",
                marginBottom: 10, WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = GRAY_400; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = selected ? GRAY_700 : GRAY_300; }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                border: `2px solid ${selected ? GRAY_700 : GRAY_300}`,
                background: selected ? GRAY_700 : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
              }}>
                {selected && <TbCheck size={14} color="#fff" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", fontFamily: FONT }}>{goal}</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>Investment Time Horizon</label>
        {TIME_HORIZONS.map((horizon) => {
          const selected = formData.timeHorizon === horizon;
          return (
            <div
              key={horizon}
              onClick={() => update("timeHorizon", horizon)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", borderRadius: 12,
                border: `1.5px solid ${selected ? GRAY_700 : GRAY_300}`,
                background: selected ? "#F9FAFB" : "#fff",
                cursor: "pointer", transition: "all 0.2s",
                marginBottom: 10, WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = GRAY_400; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = selected ? GRAY_700 : GRAY_300; }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                border: `2px solid ${selected ? GRAY_700 : GRAY_300}`,
                background: selected ? GRAY_700 : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
              }}>
                {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", fontFamily: FONT }}>{horizon}</span>
            </div>
          );
        })}
      </div>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 6: Investor Stages ──────────────────────────────────────────────

  const renderStep6 = () => (
    <>
      {renderOnboardingHeader(6)}

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>Primary Investment Goals</label>
        {INVESTMENT_STAGES.map((stage) => {
          const selected = formData.investmentStages.includes(stage);
          return (
            <div
              key={stage}
              onClick={() => toggleArrayItem("investmentStages", stage)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", borderRadius: 12,
                border: `1.5px solid ${selected ? GRAY_700 : GRAY_300}`,
                background: selected ? "#F9FAFB" : "#fff",
                cursor: "pointer", transition: "all 0.2s",
                marginBottom: 10, WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = GRAY_400; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = selected ? GRAY_700 : GRAY_300; }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                border: `2px solid ${selected ? GRAY_700 : GRAY_300}`,
                background: selected ? GRAY_700 : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
              }}>
                {selected && <TbCheck size={14} color="#fff" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", fontFamily: FONT }}>{stage}</span>
            </div>
          );
        })}
      </div>

      <FieldGroup label="Other Stages (optional)">
        <input
          placeholder="Specify other investment stages"
          value={formData.otherStages}
          onChange={(e) => update("otherStages", e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = BLUE)}
          onBlur={(e) => (e.target.style.borderColor = GRAY_300)}
        />
      </FieldGroup>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 7: Sector Interests ─────────────────────────────────────────────

  const renderStep7 = () => (
    <>
      {renderOnboardingHeader(7)}

      <div style={{ marginBottom: 20 }}>
        <label style={{ ...labelStyle, marginBottom: 12 }}>Primary Investment Goals</label>
        {SECTORS.map(({ label, Icon }) => {
          const selected = formData.sectors.includes(label);
          return (
            <div
              key={label}
              onClick={() => toggleArrayItem("sectors", label)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px", borderRadius: 12,
                border: `1.5px solid ${selected ? GRAY_700 : GRAY_300}`,
                background: selected ? "#F9FAFB" : "#fff",
                cursor: "pointer", transition: "all 0.2s",
                marginBottom: 10, WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = GRAY_400; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = selected ? GRAY_700 : GRAY_300; }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                border: `2px solid ${selected ? GRAY_700 : GRAY_300}`,
                background: selected ? GRAY_700 : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "all 0.2s",
              }}>
                {selected && <TbCheck size={14} color="#fff" strokeWidth={3} />}
              </div>
              <Icon size={20} color={selected ? NAVY : GRAY_500} strokeWidth={1.6} />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#111827", fontFamily: FONT }}>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#F5F3FF", border: "1px solid #E9D5FF",
        borderRadius: 10, padding: "10px 14px",
      }}>
        <span style={{ fontSize: 16 }}>💡</span>
        <span style={{ fontSize: 13, color: "#7C3AED", fontFamily: FONT, fontWeight: 500 }}>
          Selected {formData.sectors.length} sectors. Choose at least 3 for better deal matching.
        </span>
      </div>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 8: Document Upload ──────────────────────────────────────────────

  const renderUploadSlot = (
    label: string,
    subtitle: string,
    category: UploadedDoc["category"],
    fileRef: React.RefObject<HTMLInputElement | null>,
    optional = false,
  ) => {
    const doc = documents.find((d) => d.category === category);

    return (
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>
          {label}{optional ? " (Optional)" : ""}
        </label>
        <p style={{ fontSize: 12, color: GRAY_500, fontFamily: FONT, marginBottom: 8 }}>{subtitle}</p>

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) addDocument(file, category);
            e.target.value = "";
          }}
        />

        {doc ? (
          /* Uploaded state */
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 16px", borderRadius: 12,
            border: `1.5px solid ${GREEN}`, background: "#ECFDF5",
          }}>
            <TbCircleCheck size={22} color={GREEN} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", fontFamily: FONT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {doc.name}
              </div>
              <div style={{ fontSize: 12, color: GREEN_DARK, fontFamily: FONT, marginTop: 2 }}>
                Uploaded successfully
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); removeDocument(category); }}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 4,
                display: "flex", alignItems: "center", color: GRAY_400,
              }}
            >
              <TbX size={18} />
            </button>
          </div>
        ) : (
          /* Empty upload area */
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: "28px 16px", borderRadius: 12,
              border: `2px dashed ${GRAY_300}`, background: "#FAFAFA",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = GRAY_400; e.currentTarget.style.background = "#F3F4F6"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = GRAY_300; e.currentTarget.style.background = "#FAFAFA"; }}
          >
            <TbFileText size={32} color="#A78BFA" strokeWidth={1.4} />
            <span style={{ fontSize: 14, fontWeight: 500, color: GRAY_600, fontFamily: FONT, marginTop: 8 }}>
              Click to upload
            </span>
            <span style={{ fontSize: 12, color: GRAY_400, fontFamily: FONT, marginTop: 4 }}>
              PDF format preferred
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderStep8 = () => (
    <>
      {renderOnboardingHeader(8)}

      {renderUploadSlot(
        "Government-Issued ID",
        "Passport, Driver's License, or National ID",
        "id",
        idFileRef,
      )}

      {renderUploadSlot(
        "Accreditation Verification",
        "Letter from CPA, attorney, or broker-dealer",
        "accreditation",
        accreditationFileRef,
        true,
      )}

      {renderUploadSlot(
        "Proof of Funds",
        "Bank or brokerage statement (last 90 days)",
        "funds",
        fundsFileRef,
        true,
      )}

      {/* Hint */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "#F5F3FF", border: "1px solid #E9D5FF",
        borderRadius: 10, padding: "10px 14px", marginBottom: 4,
      }}>
        <span style={{ fontSize: 16 }}>💡</span>
        <span style={{ fontSize: 13, color: "#7C3AED", fontFamily: FONT, fontWeight: 500, lineHeight: 1.4 }}>
          You can skip optional documents now and upload them later from your profile settings.
        </span>
      </div>

      {renderNavButtons()}
    </>
  );

  // ─── STEP 9: Review & Submit ──────────────────────────────────────────────

  const REVIEW_SECTIONS = [
    {
      title: "Personal Information",
      subtitle: "Information",
      bg: "linear-gradient(135deg, #0EA5E9, #06B6D4)",
      icon: <TbUser size={20} color="#fff" />,
      content: () => (
        <div style={{ padding: "16px 0 8px" }}>
          {[
            { key: "Full Name", val: formData.fullName || "Not Provided" },
            { key: "Country", val: formData.country || "Not Provided" },
            { key: "Email", val: formData.contactEmail || formData.email || "Not Provided" },
            { key: "Phone", val: formData.mobileNumber || "Not Provided" },
          ].map((row) => (
            <div key={row.key} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>{row.key}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: FONT, textAlign: "right", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis" }}>{row.val}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Shariah Compliance",
      subtitle: "Secure",
      bg: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
      icon: <TbShield size={20} color="#fff" />,
      content: () => (
        <div style={{ padding: "16px 0 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>Shariah Compliance</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: FONT }}>
              {formData.shariahConfirmed ? "Checked" : "Not Confirmed"}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Investment Preferences",
      subtitle: "Details",
      bg: "linear-gradient(135deg, #A855F7, #EC4899)",
      icon: <BuildingIcon size={20} color="#fff" />,
      content: () => (
        <div style={{ padding: "16px 0 8px" }}>
          {[
            { key: "Founder Name", val: "Not Provided" },
            { key: "Role", val: "Not Provided" },
            { key: "Email", val: "Not Provided" },
            { key: "Linkedin", val: "Not Provided" },
          ].map((row) => (
            <div key={row.key} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>{row.key}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: FONT }}>{row.val}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Sector Investors",
      subtitle: "Details",
      bg: "linear-gradient(135deg, #14B8A6, #10B981)",
      icon: <TbTrendingUp size={20} color="#fff" />,
      content: () => (
        <div style={{ padding: "16px 0 8px" }}>
          <div style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT, marginBottom: 10 }}>
            Selected {formData.sectors.length} sectors
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {formData.sectors.map((s) => (
              <span key={s} style={{
                padding: "4px 12px", borderRadius: 999,
                background: "#E0F2FE", color: "#0284C7",
                fontSize: 12, fontWeight: 600, fontFamily: FONT,
              }}>
                {s.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Documents",
      subtitle: "Step 10",
      bg: "linear-gradient(135deg, #22C55E, #10B981)",
      icon: <TbTrendingUp size={20} color="#fff" />,
      content: () => {
        const docColors: Record<string, { bg: string; icon: string }> = {
          funds: { bg: "#D1FAE5", icon: "#10B981" },
          accreditation: { bg: "#D1FAE5", icon: "#10B981" },
          id: { bg: "#D1FAE5", icon: "#10B981" },
        };
        return (
          <div style={{ padding: "16px 0 8px" }}>
            {documents.length === 0 ? (
              <span style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>No documents uploaded</span>
            ) : (
              documents.map((doc) => {
                const colors = docColors[doc.category] || { bg: "#F3F4F6", icon: GRAY_500 };
                return (
                  <div key={doc.category} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: colors.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <TbFileCheck size={20} color={colors.icon} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", fontFamily: FONT }}>{doc.name}</div>
                      <div style={{ fontSize: 11, color: GRAY_400, fontFamily: FONT }}>{doc.category}</div>
                    </div>
                    <TbCircleCheck size={22} color="#10B981" />
                  </div>
                );
              })
            )}
          </div>
        );
      },
    },
  ];

  const renderStep9 = () => (
    <>
      {renderOnboardingHeader(9)}

      {/* Collapsible sections */}
      {REVIEW_SECTIONS.map((section, idx) => {
        const expanded = expandedSections.has(idx);
        return (
          <div key={idx} style={{ marginBottom: 16, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            {/* Header */}
            <div
              style={{
                background: section.bg,
                padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 10,
                cursor: "pointer",
              }}
              onClick={() => toggleSection(idx)}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {section.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: FONT }}>{section.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: FONT }}>{section.subtitle}</div>
              </div>
              <TbPencil
                size={16} color="rgba(255,255,255,0.8)"
                style={{ cursor: "pointer", marginRight: 6 }}
                onClick={(e) => { e.stopPropagation(); }}
              />
              {expanded
                ? <TbChevronUp size={18} color="rgba(255,255,255,0.8)" />
                : <TbChevronDown size={18} color="rgba(255,255,255,0.8)" />
              }
            </div>
            {/* Content */}
            {expanded && (
              <div style={{ padding: "0 16px", background: "#fff" }}>
                {section.content()}
              </div>
            )}
          </div>
        );
      })}

      {/* Important Confirmation */}
      <div style={{
        display: "flex", gap: 12, padding: 16, borderRadius: 16,
        background: "#FEF3C7", marginTop: 8, marginBottom: 8,
      }}>
        <TbAlertTriangle size={22} color="#D97706" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#92400E", fontFamily: FONT, marginBottom: 4 }}>
            Important Confirmation
          </div>
          <div style={{ fontSize: 12, color: "#92400E", fontFamily: FONT, lineHeight: 1.5 }}>
            By submitting, you confirm that all information provided is accurate and complete. False information may result in account suspension or legal action.
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleContinue}
          style={btnYellow}
          onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Submit Application
        </button>
      </div>

      {/* Already have account */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <span style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT }}>
          Already have an account?{" "}
          <span
            style={{ color: "#111827", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}
            onClick={() => router.push("/investors/login")}
            onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
          >
            Log in
          </span>
        </span>
      </div>
    </>
  );

  // ─── Submitted View ───────────────────────────────────────────────────────

  const renderSubmitted = () =>
    renderPageWrapper(
      <span style={{ cursor: "pointer" }}>English(UK) ▾</span>,
      "Application Submitted!",
      "Your investor profile is being reviewed. We'll notify you once verification is complete.",
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
        }}>
          <TbCircleCheck size={36} color={GREEN} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: FONT, marginBottom: 8 }}>
          Thank You!
        </h2>
        <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, lineHeight: 1.6, marginBottom: 24 }}>
          Your investor application has been submitted successfully. Our team will review your profile and documents. You&apos;ll receive an email notification once your account is verified.
        </p>
        <button
          onClick={() => router.push("/investors/dashboard")}
          style={btnYellow}
          onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Go to Dashboard
        </button>
      </div>
    );

  // ─── Render Step Content ──────────────────────────────────────────────────

  const renderStepContent = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      case 7: return renderStep7();
      case 8: return renderStep8();
      case 9: return renderStep9();
      default: return null;
    }
  };

  // ─── MAIN RETURN ──────────────────────────────────────────────────────────

  if (view === "register") return renderRegistration();
  if (view === "submitted") return renderSubmitted();

  const heroConfig = HERO_CONFIG[step] || { title: "", subtitle: "" };

  return renderPageWrapper(
    <span>Step {step} of {TOTAL_STEPS}</span>,
    heroConfig.title,
    heroConfig.subtitle,
    renderStepContent(),
  );
}
