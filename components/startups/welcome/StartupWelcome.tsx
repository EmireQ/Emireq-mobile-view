"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo1 from "@/public/assets/logo1.png";
import welcomeImg from "@/public/assets/welcome.png";

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const YELLOW = "#EAB308";
const YELLOW_HOVER = "#CA8A04";
const GRAY_500 = "#6B7280";
const GRAY_300 = "#D1D5DB";
const GRAY_100 = "#F3F4F6";

export default function StartupWelcome() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: FONT,
      background: "#fff",
      width: "100%",
      maxWidth: 430,
      margin: "0 auto",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Top Bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px clamp(16px, 5vw, 24px)",
        flexShrink: 0,
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

      {/* Content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        padding: "0 clamp(20px, 6vw, 28px) 32px",
      }}>
        {/* Welcome Image */}
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 0 28px",
        }}>
          <div style={{
            width: "100%",
            background: "#F9FAFB",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "28px 16px",
          }}>
            <Image
              src={welcomeImg}
              alt="Emireq Tokens"
              width={300}
              height={260}
              style={{
                width: "clamp(200px, 65vw, 300px)",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Welcome heading */}
        <h1 style={{
          fontSize: "clamp(26px, 7vw, 32px)",
          fontWeight: 700,
          color: "#111827",
          fontFamily: FONT,
          marginBottom: 10,
          lineHeight: 1.15,
        }}>
          Welcome to emireq
        </h1>

        {/* Quote block */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          {/* Open quote */}
          <span style={{
            fontSize: 40, color: GRAY_300, fontFamily: "Georgia, serif",
            lineHeight: 1, display: "block", marginBottom: 2, userSelect: "none",
          }}>
            &#x201C;
          </span>
          <p style={{
            fontSize: 15, color: GRAY_500, fontFamily: FONT,
            lineHeight: 1.65, margin: 0,
          }}>
            Join a growing network of founders and investors driving transparent, Shariah-compliant innovation. Connect, raise funds, and grow your business in a platform built for integrity and impact.
          </p>
          {/* Close corner bracket */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 8,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20H8V18H18V8H20V20Z" fill={YELLOW} />
            </svg>
          </div>
        </div>

        {/* Spacer to push buttons down */}
        <div style={{ flex: 1, minHeight: 16 }} />

        {/* Buttons */}
        <button
          onClick={() => router.push("/startups/login")}
          style={{
            width: "100%", padding: "15px", borderRadius: 14,
            border: "none", background: YELLOW, color: "#fff",
            fontSize: 16, fontWeight: 600, fontFamily: FONT,
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

        <button
          onClick={() => router.push("/startups/signup")}
          style={{
            width: "100%", padding: "15px", borderRadius: 14,
            border: "none", background: GRAY_100, color: "#374151",
            fontSize: 16, fontWeight: 600, fontFamily: FONT,
            cursor: "pointer", transition: "background 0.2s, transform 0.1s",
            WebkitTapHighlightColor: "transparent",
            marginTop: 12,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#E5E7EB")}
          onMouseLeave={(e) => (e.currentTarget.style.background = GRAY_100)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
