"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { FaLinkedinIn, FaGoogle } from "react-icons/fa";
import { TbAlertCircle } from "react-icons/tb";
import logologin from "@/public/assets/logologin.png";
import loginbg from "@/public/assets/loginbg.png";

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const YELLOW = "#EAB308";
const YELLOW_HOVER = "#CA8A04";
const GRAY_700 = "#374151";
const GRAY_500 = "#6B7280";
const GRAY_400 = "#9CA3AF";
const GRAY_300 = "#D1D5DB";
const GRAY_200 = "#E5E7EB";
const GRAY_100 = "#F3F4F6";
const BLUE = "#3B82F6";
const RED = "#DC2626";
const NAVY = "#1E2A4A";

export default function StartupLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ username?: boolean; password?: boolean }>({});

  const validate = () => {
    const errs: { username?: string; password?: string } = {};
    if (!username.trim()) errs.username = "Username is required";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleLogin = () => {
    const errs = validate();
    setErrors(errs);
    setTouched({ username: true, password: true });
    if (Object.keys(errs).length === 0) {
      router.push("/startups");
    }
  };

  const handleBlur = (field: "username" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 14px",
    border: `1px solid ${hasError ? RED : GRAY_300}`,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: FONT,
    color: "#111827",
    outline: "none",
    background: "#fff",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    color: GRAY_700,
    marginBottom: 6,
    display: "block",
    fontFamily: FONT,
  };

  const usernameError = touched.username ? errors.username : undefined;
  const passwordError = touched.password ? errors.password : undefined;

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: FONT,
      position: "relative",
      background: "#F3F4F6",
    }}>
      {/* Background image — top half */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
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
          <span
            style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, fontFamily: FONT, cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            English(UK) ▾
          </span>
        </div>

        {/* Hero Text */}
        <h1 style={{
          color: "#fff", fontSize: 28, fontWeight: 700, lineHeight: 1.2,
          marginTop: 28, fontFamily: FONT, whiteSpace: "pre-line",
        }}>
          {"Empowering Ethical\nStartups Worldwide"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 10, fontFamily: FONT, lineHeight: 1.5 }}>
          Sign in to manage your account
        </p>
        <div style={{ width: 60, height: 3, background: YELLOW, borderRadius: 2, marginTop: 14 }} />

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 22, marginTop: 28,
          padding: "28px clamp(16px, 5vw, 22px)", boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", fontFamily: FONT }}>
            Welcome back
          </h2>
          <p style={{ fontSize: 14, color: GRAY_500, fontFamily: FONT, marginTop: 6, marginBottom: 24 }}>
            Log in to continue your funding journey.
          </p>

          {/* Username */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Username</label>
            <input
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              style={inputStyle(!!usernameError)}
              onFocus={(e) => { if (!usernameError) e.target.style.borderColor = BLUE; }}
            />
            {usernameError && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <TbAlertCircle size={16} color={RED} />
                <span style={{ fontSize: 13, color: RED, fontFamily: FONT }}>{usernameError}</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                style={{ ...inputStyle(!!passwordError), paddingRight: 42 }}
                onFocus={(e) => { if (!passwordError) e.target.style.borderColor = BLUE; }}
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
            {passwordError && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                <TbAlertCircle size={16} color={RED} />
                <span style={{ fontSize: 13, color: RED, fontFamily: FONT }}>{passwordError}</span>
              </div>
            )}
          </div>

          {/* Log In button */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%", padding: "14px", borderRadius: 12,
              border: "none", background: YELLOW, color: "#fff",
              fontSize: 15, fontWeight: 600, fontFamily: FONT,
              cursor: "pointer", transition: "background 0.2s, transform 0.1s",
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Log In
          </button>

          {/* Forget Password */}
          <p style={{ textAlign: "right", marginTop: 14, marginBottom: 0 }}>
            <span
              style={{
                fontSize: 14, color: NAVY, fontWeight: 500, fontFamily: FONT,
                textDecoration: "underline", cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = NAVY)}
            >
              Forget Password
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
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <FaLinkedinIn size={20} color="#0A66C2" />
            </button>
          </div>

          {/* Register */}
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: GRAY_500, fontFamily: FONT }}>
            Don&apos;t have an account?{" "}
            <span
              style={{ color: NAVY, fontWeight: 600, textDecoration: "underline", cursor: "pointer", transition: "color 0.2s" }}
              onClick={() => router.push("/startups/signup")}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = NAVY)}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
