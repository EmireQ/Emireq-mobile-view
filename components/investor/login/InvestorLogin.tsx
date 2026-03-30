"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  TbEye, TbEyeOff, TbAlertCircle, TbCircleCheck, TbX,
} from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";

import logologin from "@/public/assets/logologin.png";
import backgroundlogin from "@/public/assets/backgroundlogin.png";

// ─── Constants ────────────────────────────────────────────────────────────────

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const YELLOW = "#FFC300";
const YELLOW_HOVER = "#E6B000";
const NAVY = "#1E2A4A";
const GRAY_700 = "#374151";
const GRAY_500 = "#6B7280";
const GRAY_400 = "#9CA3AF";
const GRAY_300 = "#D1D5DB";
const GRAY_200 = "#E5E7EB";
const GRAY_100 = "#F3F4F6";
const BLUE = "#3B82F6";
const RED = "#EF4444";

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_login_sparkle)">
      <path d="M5.79663 9.04116C5.74455 8.83929 5.63933 8.65506 5.49191 8.50763C5.34449 8.36021 5.16025 8.25499 4.95838 8.20291L1.37963 7.28008C1.31857 7.26275 1.26483 7.22597 1.22657 7.17534C1.18831 7.1247 1.1676 7.06296 1.1676 6.99949C1.1676 6.93603 1.18831 6.87429 1.22657 6.82365C1.26483 6.77301 1.31857 6.73624 1.37963 6.71891L4.95838 5.79549C5.16018 5.74346 5.34437 5.63833 5.49178 5.49102C5.6392 5.34371 5.74446 5.1596 5.79663 4.95783L6.71946 1.37908C6.73662 1.31778 6.77335 1.26378 6.82407 1.22531C6.87478 1.18684 6.93668 1.16602 7.00034 1.16602C7.06399 1.16602 7.1259 1.18684 7.17661 1.22531C7.22732 1.26378 7.26406 1.31778 7.28121 1.37908L8.20346 4.95783C8.25554 5.1597 8.36077 5.34393 8.50819 5.49135C8.65561 5.63878 8.83984 5.744 9.04171 5.79608L12.6205 6.71833C12.682 6.7353 12.7363 6.772 12.775 6.82279C12.8136 6.87358 12.8346 6.93566 12.8346 6.99949C12.8346 7.06333 12.8136 7.12541 12.775 7.1762C12.7363 7.22699 12.682 7.26369 12.6205 7.28066L9.04171 8.20291C8.83984 8.25499 8.65561 8.36021 8.50819 8.50763C8.36077 8.65506 8.25554 8.83929 8.20346 9.04116L7.28063 12.6199C7.26347 12.6812 7.22674 12.7352 7.17603 12.7737C7.12531 12.8122 7.06341 12.833 6.99975 12.833C6.9361 12.833 6.8742 12.8122 6.82348 12.7737C6.77277 12.7352 6.73603 12.6812 6.71888 12.6199L5.79663 9.04116Z" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.6667 1.75V4.08333" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.8333 2.91699H10.5" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.33331 9.91699V11.0837" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.91667 10.5H1.75" stroke="#FFC300" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_login_sparkle">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

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

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  border: `1px solid ${RED}`,
};

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: GRAY_700,
  marginBottom: 6,
  display: "block",
  fontFamily: FONT,
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InvestorLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // Demo: "demo" / "demo123" succeeds, otherwise error
      if (username === "demo" && password === "demo123") {
        setShowSuccess(true);
      } else {
        setErrors({ general: "Invalid username or password. Please try again." });
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: FONT,
      position: "relative",
      background: "#F3F4F6",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "46%",
        backgroundImage: `url(${backgroundlogin.src})`,
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

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%",
        maxWidth: 430,
        margin: "0 auto",
        padding: "20px clamp(14px, 4.5vw, 18px) 40px",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Image src={logologin} alt="emireq" width={44} height={38} style={{ objectFit: "contain" }} />
          <div style={{
            color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, fontFamily: FONT,
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)", borderRadius: 999,
            padding: "6px 14px", cursor: "pointer",
          }}>
            English(UK) ▾
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
          {"Get Access to Your Investor Profile\nand Unlock Exclusive Deals."}
        </h1>

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 22, marginTop: 24,
          padding: "28px clamp(16px, 5vw, 22px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: FONT }}>
            Welcome to emireq
          </h2>
          <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, marginTop: 6, marginBottom: 24 }}>
            Log in to continue your funding journey.
          </p>

          {/* General error banner */}
          {errors.general && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 16px", borderRadius: 10,
              background: "#FEE2E2", border: "1px solid #FECACA",
              marginBottom: 20,
            }}>
              <TbAlertCircle size={20} color={RED} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: RED, fontFamily: FONT, fontWeight: 500 }}>
                {errors.general}
              </span>
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Username</label>
            <input
              placeholder="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors((prev) => ({ ...prev, username: undefined, general: undefined })); }}
              onKeyDown={handleKeyDown}
              style={errors.username ? inputErrorStyle : inputStyle}
              onFocus={(e) => { if (!errors.username) e.target.style.borderColor = BLUE; }}
              onBlur={(e) => { if (!errors.username) e.target.style.borderColor = GRAY_300; }}
            />
            {errors.username && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <TbAlertCircle size={14} color={RED} />
                <span style={{ fontSize: 12, color: RED, fontFamily: FONT }}>{errors.username}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined, general: undefined })); }}
                onKeyDown={handleKeyDown}
                style={{ ...(errors.password ? inputErrorStyle : inputStyle), paddingRight: 42 }}
                onFocus={(e) => { if (!errors.password) e.target.style.borderColor = BLUE; }}
                onBlur={(e) => { if (!errors.password) e.target.style.borderColor = GRAY_300; }}
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
            {errors.password && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <TbAlertCircle size={14} color={RED} />
                <span style={{ fontSize: 12, color: RED, fontFamily: FONT }}>{errors.password}</span>
              </div>
            )}
          </div>

          {/* Log In button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "none",
              background: YELLOW,
              color: NAVY,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background 0.2s, transform 0.1s",
              WebkitTapHighlightColor: "transparent",
              opacity: isLoading ? 0.7 : 1,
              marginTop: 8,
            }}
            onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.background = YELLOW_HOVER; }}
            onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.background = YELLOW; }}
            onMouseDown={(e) => { if (!isLoading) e.currentTarget.style.transform = "scale(0.98)"; }}
            onMouseUp={(e) => { if (!isLoading) e.currentTarget.style.transform = "scale(1)"; }}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          {/* Keep signed in + Forget Password */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 16,
          }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              onClick={() => setKeepSignedIn(!keepSignedIn)}
            >
              <div style={{
                width: 18, height: 18, borderRadius: 4,
                border: `1.5px solid ${keepSignedIn ? GRAY_700 : GRAY_300}`,
                background: keepSignedIn ? GRAY_700 : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }}>
                {keepSignedIn && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>Keep me signed in</span>
            </div>
            <span
              style={{
                fontSize: 13, color: GRAY_500, fontFamily: FONT,
                textDecoration: "underline", cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = GRAY_500)}
            >
              Forget Password
            </span>
          </div>

          {/* Or divider */}
          <div style={{ display: "flex", alignItems: "center", margin: "20px 0", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: GRAY_200 }} />
            <span style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT }}>Or</span>
            <div style={{ flex: 1, height: 1, background: GRAY_200 }} />
          </div>

          {/* Social login buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <button
              style={{
                width: 44, height: 44, borderRadius: "50%",
                border: `1px solid ${GRAY_200}`, background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "background 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <FcGoogle size={20} />
            </button>
            <button
              style={{
                width: 44, height: 44, borderRadius: "50%",
                border: `1px solid ${GRAY_200}`, background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "background 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <FaLinkedinIn size={18} color="#0A66C2" />
            </button>
          </div>

          {/* Don't have an account? Register */}
          <div style={{ display: "flex", alignItems: "center", margin: "20px 0 0", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: GRAY_200 }} />
            <span style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, whiteSpace: "nowrap" }}>
              Don&apos;t have an account?{" "}
              <span
                style={{ color: "#111827", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}
                onClick={() => router.push("/investors/signup")}
                onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#111827")}
              >
                Register
              </span>
            </span>
            <div style={{ flex: 1, height: 1, background: GRAY_200 }} />
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setShowSuccess(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: 22,
              padding: "36px 28px 24px",
              maxWidth: 380, width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Green check icon */}
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#D1FAE5",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <TbCircleCheck size={36} color="#10B981" />
            </div>

            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", fontFamily: FONT, marginBottom: 8 }}>
              Login Successful!
            </h3>
            <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, lineHeight: 1.5, marginBottom: 24 }}>
              Welcome back! You&apos;re being redirected to your investor dashboard.
            </p>

            <button
              onClick={() => router.push("/investors/dashboard")}
              style={{
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
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Continue to Dashboard
            </button>

            {/* Close button */}
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                position: "absolute", top: 16, right: 16,
                background: "none", border: "none", cursor: "pointer",
                color: GRAY_400, padding: 4,
                display: "flex", alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = GRAY_700)}
              onMouseLeave={(e) => (e.currentTarget.style.color = GRAY_400)}
            >
              <TbX size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
