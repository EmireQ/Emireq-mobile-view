"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo1 from "@/public/assets/logo1.png";
import investorwelcome from "@/public/assets/investorwelcome.png";

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const YELLOW = "#FFC300";
const YELLOW_HOVER = "#E6B000";
const NAVY = "#1E2A4A";
const GRAY_500 = "#6B7280";
const GRAY_200 = "#E5E7EB";
const GRAY_100 = "#F3F4F6";
const BLUE = "#3B82F6";

export default function InvestorWelcome() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: FONT,
      background: "#fff",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px clamp(16px, 5vw, 24px)",
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

      {/* Illustration */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: "32px 16px 24px",
        flex: "0 0 auto",
      }}>
        <Image
          src={investorwelcome}
          alt="Investment dashboard preview"
          width={380}
          height={280}
          style={{
            width: "100%",
            maxWidth: 380,
            height: "auto",
            objectFit: "contain",
          }}
          priority
        />
      </div>

      {/* Content */}
      <div style={{
        padding: "0 clamp(20px, 6vw, 28px)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}>
        <h1 style={{
          fontSize: 28, fontWeight: 700, color: "#111827",
          fontFamily: FONT, lineHeight: 1.2, marginBottom: 16,
        }}>
          Welcome to emireq
        </h1>

        <p style={{
          fontSize: 15, color: GRAY_500, fontFamily: FONT,
          lineHeight: 1.6, marginBottom: 36,
        }}>
          Log in to your account to continue your Funding Journey.
        </p>

        {/* Log In button */}
        <button
          onClick={() => router.push("/investors/login")}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 14,
            border: "none",
            background: YELLOW,
            color: NAVY,
            fontSize: 16,
            fontWeight: 600,
            fontFamily: FONT,
            cursor: "pointer",
            transition: "background 0.2s, transform 0.1s",
            WebkitTapHighlightColor: "transparent",
            marginBottom: 14,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = YELLOW_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.background = YELLOW)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Log In
        </button>

        {/* Sign Up button */}
        <button
          onClick={() => router.push("/investors/signup")}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 14,
            border: "none",
            background: GRAY_100,
            color: NAVY,
            fontSize: 16,
            fontWeight: 600,
            fontFamily: FONT,
            cursor: "pointer",
            transition: "background 0.2s, transform 0.1s",
            WebkitTapHighlightColor: "transparent",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = GRAY_200)}
          onMouseLeave={(e) => (e.currentTarget.style.background = GRAY_100)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Sign Up
        </button>

        {/* Support footer */}
        <div style={{
          textAlign: "center",
          marginTop: "auto",
          paddingTop: 28,
          paddingBottom: 32,
        }}>
          <p style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT, marginBottom: 4 }}>
            Experiencing issues?
          </p>
          <p style={{ fontSize: 13, color: GRAY_500, fontFamily: FONT }}>
            Get assistance via{" "}
            <a
              href="mailto:support@emireq.com"
              style={{ color: BLUE, textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}
            >
              support@emireq.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
