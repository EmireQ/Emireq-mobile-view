"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import p1 from "../public/assets/p1.jpg";
import p2 from "../public/assets/p2.png";
import p3 from "../public/assets/p3.png";
import p4 from "../public/assets/p4.png";
import {
  TbSearch, TbX, TbTrendingUp, TbShieldCheck,
  TbCube, TbBuildingSkyscraper, TbHeart, TbHeartFilled,
  TbBrain, TbShoppingCart, TbMapPin, TbStarFilled,
} from "react-icons/tb";

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const F: React.CSSProperties = { fontFamily: FONT };

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 1, label: "Technology",  Icon: TbCube,              color: "#6366F1", bg: "rgba(99,102,241,0.13)",  ring: "rgba(99,102,241,0.3)"  },
  { id: 2, label: "Real Estate", Icon: TbBuildingSkyscraper, color: "#14B8A6", bg: "rgba(20,184,166,0.13)",  ring: "rgba(20,184,166,0.3)"  },
  { id: 3, label: "Healthcare",  Icon: TbHeart,              color: "#EF4444", bg: "rgba(239,68,68,0.12)",   ring: "rgba(239,68,68,0.3)"   },
  { id: 4, label: "AI & ML",     Icon: TbBrain,              color: "#8B5CF6", bg: "rgba(139,92,246,0.13)",  ring: "rgba(139,92,246,0.3)"  },
  { id: 5, label: "Commerce",    Icon: TbShoppingCart,       color: "#008894", bg: "rgba(0,136,148,0.13)",   ring: "rgba(0,136,148,0.3)"   },
];

const CARDS = [
  { id: 1, title: "Scale Operations", category: "Growth",   raised: "$2.5M", image: p1 },
  { id: 2, title: "Tripled Revenue",  category: "Scaling",  raised: "$2.5M", image: p2 },
  { id: 3, title: "Build MVP",        category: "Pre-Seed", raised: "$2.5M", image: p3 },
  { id: 4, title: "Launch Product",   category: "Growth",   raised: "$3.1M", image: p4 },
];

const BUSINESSES = [
  { id: 1, name: "TechVenture AI", location: "San Francisco", investors: 247, funding: "$5M", minEntry: "$10,000", verified: true, tags: ["AI","SaaS","B2B"], image: p1 },
  { id: 2, name: "InnovateTech",   location: "New York",      investors: 247, funding: "$5M", minEntry: "$10,000", verified: true, tags: ["AI","ML"],        image: p2 },
];

const SECTORS        = ["All Sectors","AI & SaaS","FinTech","HealthTech","EdTech"];
const FUNDING_STAGES = ["All Stages","Pre-Seed","Seed","Series A – B","Series C+"];

// ─── Icons ────────────────────────────────────────────────────────────────────

function AurivoxIcon() {
  return (
    <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: "linear-gradient(135deg,#fff8db,#fffcf2)", border: "1px solid rgba(254,230,133,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="20" height="31" viewBox="0 0 20 31" fill="none">
        <path d="M1.98767 19.5557L9.93804 29.3333L13.9132 24.4445L17.8884 19.5557" stroke="#FF8C00" strokeWidth="1.89442" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.876 19.5557H0L1.9873 15.6445H17.8887L16.5635 13.0371H3.3125L9.93848 0L19.876 19.5557Z" fill="url(#avx)"/>
        <defs><linearGradient id="avx" x1="0" y1="9.78" x2="19.88" y2="9.78" gradientUnits="userSpaceOnUse"><stop offset="0.5" stopColor="#FFB800"/><stop offset="0.5" stopColor="#845418"/></linearGradient></defs>
      </svg>
    </div>
  );
}

function XenaraIcon() {
  return (
    <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: "#f1fbff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="31" height="30" viewBox="0 0 31 30" fill="none">
        <path d="M0.378424 24.0673C1.16241 22.2375 8.82963 17.6078 8.75148 15.1919C8.67334 12.7759 2.10183 9.09196 0.71328 6.56756C-0.207846 4.89294 -0.124044 3.13457 1.46692 1.54369C3.05789 -0.0471922 4.60129 0.0128976 5.98833 0.706391C7.37537 1.39988 13.4406 8.82832 14.8639 8.82832C16.2873 8.82832 20.3955 1.97466 24.0742 0.622682C27.753 -0.729292 28.4229 0.442943 29.0927 1.11279C29.7626 1.78263 31.06 3.62472 29.433 6.0652C27.256 9.33072 26.0838 10.3135 24.3256 11.424C22.5673 12.5344 20.619 12.5453 18.7993 12.0101C16.9795 11.4748 16.7005 10.3232 14.8639 9.06723C13.0273 7.81127 10.5881 8.56485 9.33767 9.98828C8.0872 11.4117 8.58402 13.9359 9.33767 15.1919C10.0913 16.4478 13.0218 20.8855 11.8496 23.3137C10.6774 25.7419 7.15501 29.2078 5.65351 29.761C4.15201 30.3142 2.78135 29.7831 1.55069 28.6725C0.0493173 27.3177 -0.405559 25.8972 0.378424 24.0673Z" fill="url(#xnr)"/>
        <circle cx="22.3105" cy="22.548" r="7.45206" fill="#3CEE90"/>
        <defs><linearGradient id="xnr" x1="14.9" y1="0.36" x2="9.48" y2="24.88" gradientUnits="userSpaceOnUse"><stop stopColor="#4EBCF1"/><stop offset="1" stopColor="#3CEE90"/></linearGradient></defs>
      </svg>
    </div>
  );
}

function EminarIcon() {
  return (
    <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#f0eeff,#ddd6ff)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <polygon points="13,2 24,20 2,20" fill="#7c5cfc" opacity="0.9"/>
        <polygon points="13,8 20,20 6,20" fill="#5b3de8" opacity="0.9"/>
      </svg>
    </div>
  );
}

// ─── Sparklines ───────────────────────────────────────────────────────────────

function GreenSparkline() {
  return (
    <svg width="100%" height="90" viewBox="35 30 120 62" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="gg" x="0" y="0" width="191.667" height="128.005" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="20"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.690196 0 0 0 0 0.192157 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="e1"/><feBlend in="SourceGraphic" in2="e1" result="shape"/>
        </filter>
        <filter id="gd" x="136.667" y="31" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur"/>
        </filter>
      </defs>
      <g filter="url(#gg)">
        <path d="M41.0002 60.4504L42.0884 61.0438C43.1767 61.6371 45.3531 62.8238 47.5296 65.0896C49.7061 67.3554 51.8825 70.7004 54.059 73.4319C56.2355 76.1634 58.4119 78.2814 60.5884 74.8063C62.7649 71.3313 64.9414 62.263 67.1178 63.1531C69.2943 64.0432 71.4708 74.8916 73.6472 79.6635C75.8237 84.4353 78.0002 83.1305 80.1767 81.6235C82.3531 80.1164 84.5296 78.4071 86.7061 73.7249C88.8825 69.0428 91.059 61.3878 93.2355 58.319C95.412 55.2501 98.9902 61.0107 101.167 58.319C103.343 55.6273 101.99 49.8021 104.167 47.1403C106.343 44.4785 109.99 43.268 112.167 47.1403C114.343 51.0125 116.49 63.3614 118.667 63.1531C120.843 62.9448 123.706 47.6479 125.883 47.1403C128.059 46.6326 130.235 52.2013 132.412 57.5266C134.588 62.8518 136.765 67.9336 138.941 64.1812C141.118 60.4289 142.167 40 147.167 40" stroke="#00B031" strokeWidth="2" strokeLinecap="round"/>
        <g filter="url(#gd)"><path d="M151.667 41C151.667 43.7614 149.428 46 146.667 46C143.905 46 141.667 43.7614 141.667 41C141.667 38.2386 143.905 36 146.667 36C149.428 36 151.667 38.2386 151.667 41Z" fill="#00B031"/></g>
      </g>
    </svg>
  );
}

function RedSparkline() {
  return (
    <svg width="100%" height="90" viewBox="0 0 121 50" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="rd" x="101" y="30.5" width="20" height="19.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur"/>
        </filter>
      </defs>
      <path d="M4 4.14151L7.298 2.49251C9.0447 1.61916 11.1631 2.06873 12.4046 3.57621L22.0105 15.2405C23.5825 17.1493 26.4572 17.2881 28.2057 15.5396L29.1518 14.5935C30.8487 12.8966 33.6216 12.9695 35.227 14.7533L39.405 19.3955C40.7389 20.8776 42.9326 21.2139 44.6493 20.1995L59.9029 11.1861C62.3144 9.76106 65.418 11.0588 66.0974 13.7763L67.808 20.6188C68.4069 23.0142 70.9373 24.3745 73.2657 23.5527L84.4158 19.6174C85.8431 19.1137 87.4311 19.4191 88.5697 20.4163L111.5 40.5" stroke="#E2473F" strokeWidth="2.09434"/>
      <g filter="url(#rd)"><path d="M116 40.1996C116 42.7953 113.761 44.8996 111 44.8996C108.239 44.8996 106 42.7953 106 40.1996C106 37.6038 108.239 35.4996 111 35.4996C113.761 35.4996 116 37.6038 116 40.1996Z" fill="#E2473F"/></g>
    </svg>
  );
}

// PurpleSparkline reuses GreenSparkline path with purple color
function PurpleSparkline() {
  return (
    <svg width="100%" height="90" viewBox="35 30 120 62" fill="none" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <filter id="pg" x="0" y="0" width="191.667" height="128.005" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="20"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0.486 0 0 0 0 0.361 0 0 0 0 0.988 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="e1"/><feBlend in="SourceGraphic" in2="e1" result="shape"/>
        </filter>
        <filter id="pd" x="136.667" y="31" width="20" height="20" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur"/>
        </filter>
      </defs>
      <g filter="url(#pg)">
        <path d="M41.0002 60.4504L42.0884 61.0438C43.1767 61.6371 45.3531 62.8238 47.5296 65.0896C49.7061 67.3554 51.8825 70.7004 54.059 73.4319C56.2355 76.1634 58.4119 78.2814 60.5884 74.8063C62.7649 71.3313 64.9414 62.263 67.1178 63.1531C69.2943 64.0432 71.4708 74.8916 73.6472 79.6635C75.8237 84.4353 78.0002 83.1305 80.1767 81.6235C82.3531 80.1164 84.5296 78.4071 86.7061 73.7249C88.8825 69.0428 91.059 61.3878 93.2355 58.319C95.412 55.2501 98.9902 61.0107 101.167 58.319C103.343 55.6273 101.99 49.8021 104.167 47.1403C106.343 44.4785 109.99 43.268 112.167 47.1403C114.343 51.0125 116.49 63.3614 118.667 63.1531C120.843 62.9448 123.706 47.6479 125.883 47.1403C128.059 46.6326 130.235 52.2013 132.412 57.5266C134.588 62.8518 136.765 67.9336 138.941 64.1812C141.118 60.4289 142.167 40 147.167 40" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round"/>
        <g filter="url(#pd)"><circle cx="146.667" cy="41" r="5" fill="#7c5cfc"/></g>
      </g>
    </svg>
  );
}

// ─── Shared hook for hover/press ─────────────────────────────────────────────

function usePress() {
  const [hov, setHov] = useState(false);
  const [pr,  setPr]  = useState(false);
  return { hov, pr, bind: { onMouseEnter: () => setHov(true), onMouseLeave: () => { setHov(false); setPr(false); }, onMouseDown: () => setPr(true), onMouseUp: () => setPr(false) } };
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function BadgePill({ icon, iconBg, label, tailSide }: { icon: React.ReactNode; iconBg: string; label: string; tailSide: "left" | "right" }) {
  const { hov, pr, bind } = usePress();
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ position: "absolute", top: -7, ...(tailSide === "left" ? { left: 20 } : { right: 20 }), width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "7px solid #fff", filter: "drop-shadow(0 -1px 2px rgba(0,0,0,0.08))" }} />
      <div {...bind} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", borderRadius: 100, padding: "6px 12px 6px 8px", boxShadow: pr ? "0 2px 8px rgba(0,0,0,0.07)" : hov ? "0 8px 24px rgba(0,0,0,0.13)" : "0 4px 14px rgba(0,0,0,0.09)", border: hov ? "1px solid rgba(59,110,248,0.2)" : "1px solid rgba(0,0,0,0.06)", cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)", transform: pr ? "translateY(1px) scale(0.97)" : hov ? "translateY(-2px)" : "none", whiteSpace: "nowrap" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.2s", transform: hov ? "rotate(6deg) scale(1.1)" : "none" }}>{icon}</div>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#0a0e28", letterSpacing: "-0.01em" }}>{label}</span>
      </div>
    </div>
  );
}

function HeroSection() {
  const [val, setVal]     = useState("");
  const [focused, setFoc] = useState(false);
  return (
    <section style={{ background: "#fff", ...F, userSelect: "none" }}>
      <div style={{ padding: "12px 20px 28px" }}>
        <h1 style={{ fontSize: "clamp(30px,8vw,40px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.035em", color: "#121212", margin: "0 0 12px" }}>
          Tokenize real-world<br />oportunities
        </h1>
        <p style={{ fontSize: 14, color: "#43536D", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 320 }}>
          Emireq turns ventures into tokens to unlock global investment.
        </p>
        <div onClick={() => document.getElementById("hs")?.focus()}
          style={{ position: "relative", borderRadius: 14, padding: 2, background: focused ? "linear-gradient(135deg,#3b6ef8,#5b8aff)" : "linear-gradient(135deg,rgba(203,219,252,1),rgba(203,219,252,0.6))", boxShadow: focused ? "0 0 0 4px rgba(59,110,248,0.15),0 4px 20px rgba(0,0,0,0.06)" : "0 4px 16px rgba(0,0,0,0.06)", transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)", cursor: "text" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 12, padding: "12px 16px" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(21,40,154,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <TbSearch size={14} color="#15289A" strokeWidth={1.5} />
            </div>
            <input id="hs" type="text" value={val} onChange={e => setVal(e.target.value)} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} placeholder="Search startups, tokens, or investors..."
              style={{ flex: 1, fontSize: 14, color: "#0a0e28", background: "transparent", border: "none", outline: "none", fontFamily: "inherit", letterSpacing: "-0.01em" }} />
            {val
              ? <button onClick={e => { e.stopPropagation(); setVal(""); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.08)", border: "none", cursor: "pointer", flexShrink: 0 }}><TbX size={11} color="#555" strokeWidth={2} /></button>
              : !focused && <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>{[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(0,0,0,0.18)" }} />)}</div>
            }
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: 10, gap: 10 }}>
          <BadgePill icon={<TbTrendingUp size={11} color="#3b6ef8" strokeWidth={2.5} />}  iconBg="rgba(59,110,248,0.1)"  label="500+ Active Investors" tailSide="left" />
          <BadgePill icon={<TbShieldCheck size={11} color="#00a86b" strokeWidth={2.2} />} iconBg="rgba(0,168,107,0.1)"   label="Shariah Certified"     tailSide="right" />
        </div>
      </div>
    </section>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────

function CategoriesSection() {
  const [active, setActive] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const onWheel = (e: React.WheelEvent) => { if (!scrollRef.current) return; if (e.shiftKey || Math.abs(e.deltaX) > 0) { e.preventDefault(); scrollRef.current.scrollLeft += e.deltaY || e.deltaX; } };

  return (
    <section style={{ background: "#fff", padding: "20px 0 16px", ...F }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, padding: "0 20px" }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0a0e28", margin: 0, letterSpacing: "-0.02em" }}>Categories</h2>
        <button style={{ fontSize: 15, fontWeight: 500, color: "#717182", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = "#070707")} onMouseLeave={e => (e.currentTarget.style.color = "#717182")}>See all</button>
      </div>
      <div ref={scrollRef} onWheel={onWheel} style={{ display: "flex", gap: 18, overflowX: "auto", padding: "10px 20px 16px 12px", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" as any }}>
        {CATEGORIES.map(cat => {
          const on = active === cat.id;
          const { hov, pr, bind } = usePress();
          return (
            <button key={cat.id} onClick={() => setActive(on ? null : cat.id)} {...bind}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flexShrink: 0, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
              <div style={{ width: 68, height: 68, borderRadius: "50%", background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center", outline: on ? `2.5px solid ${cat.ring}` : "none", outlineOffset: 2, transform: pr ? "scale(0.93)" : hov ? "scale(1.06)" : "scale(1)", transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1),outline 0.15s,box-shadow 0.18s", boxShadow: on ? `0 4px 18px ${cat.ring}` : hov ? `0 4px 14px ${cat.bg}` : "none" }}>
                <cat.Icon size={27} color={cat.color} strokeWidth={1.67} />
              </div>
              <span style={{ fontSize: 12, fontWeight: on ? 600 : 400, color: on ? cat.color : "#0a0e28", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ─── Crypto Landscapes ────────────────────────────────────────────────────────

function CryptoCard({ name, ticker, change, isPositive, volume, Icon, Sparkline }: {
  name: string; ticker: string; change: string; isPositive: boolean; volume: string;
  Icon: () => React.JSX.Element; Sparkline: () => React.JSX.Element;
}) {
  const { hov, pr, bind } = usePress();
  return (
    <div {...bind} style={{ flexShrink: 0, width: "calc(50% - 10px)", minWidth: 200, background: "#fff", borderRadius: 20, padding: "18px 16px 16px", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "none", cursor: "pointer", transform: pr ? "scale(0.97)" : hov ? "translateY(-2px)" : "none", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)", display: "flex", flexDirection: "column", scrollSnapAlign: "start", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#000", letterSpacing: "-0.03em", lineHeight: 1.15 }}>{name}</div>
          <div style={{ fontSize: 13, color: "#626d7d", fontWeight: 500, marginTop: 2 }}>{ticker}</div>
        </div>
        <Icon />
      </div>
      <div style={{ marginTop: 12 }}>
        <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 600, background: isPositive ? "rgba(0,176,49,0.1)" : "rgba(226,71,63,0.1)", color: isPositive ? "#00b031" : "#e2473f" }}>{change}</span>
      </div>
      <div style={{ marginTop: 12, marginBottom: 2, lineHeight: 0, minHeight: 70 }}><Sparkline /></div>
      <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "10px 0 8px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
        <span style={{ fontSize: 13, color: "#8d8d99" }}>24H Vol.</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#4940ff", textDecoration: "underline", textUnderlineOffset: 2, cursor: "pointer" }}>${volume}</span>
      </div>
    </div>
  );
}

function CryptoLandscapesSection() {
  const [insightOn, setInsightOn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const onWheel = (e: React.WheelEvent) => { if (e.shiftKey && scrollRef.current) { e.preventDefault(); scrollRef.current.scrollLeft += e.deltaY; } };

  return (
    <section style={{ background: "#fff", padding: "20px 20px 28px", ...F }}>
      <style>{`.cs::-webkit-scrollbar{display:none}.cs{-ms-overflow-style:none;scrollbar-width:none}`}</style>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#121212", letterSpacing: "-0.03em" }}>Crypto Landscapes</h2>
        <button onClick={() => setInsightOn(v => !v)} style={{ background: insightOn ? "#dff0fc" : "rgba(0,0,0,0.06)", border: "none", borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: insightOn ? "#1c79ff" : "#8d8d99", cursor: "pointer", transition: "all 0.2s" }}>
          Crypto Insights
        </button>
      </div>
      <div ref={scrollRef} className="cs" onWheel={onWheel} style={{ display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingTop: 4, paddingBottom: 8, marginTop: -4 }}>
        <CryptoCard name="Aurivox" ticker="AVX" change="+14.67%" isPositive  volume="23,738" Icon={AurivoxIcon}  Sparkline={GreenSparkline}  />
        <CryptoCard name="Xenara"  ticker="XNR" change="-14.67%" isPositive={false} volume="23,738" Icon={XenaraIcon}   Sparkline={RedSparkline}    />
        <CryptoCard name="Eminar"  ticker="EMN" change="+8.21%"  isPositive  volume="19,450" Icon={EminarIcon}   Sparkline={PurpleSparkline} />
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

function PortfolioSection() {
  const [filter, setFilter] = useState("All");
  const [pr, setPr]         = useState<number | null>(null);
  const filters             = ["All","Growth","Scaling","Pre-Seed"];
  const shown               = filter === "All" ? CARDS : CARDS.filter(c => c.category === filter);
  return (
    <section style={{ background: "#fff", ...F }}>
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.02em" }}>Portfolio</h2>
          <button style={{ fontSize: 15, fontWeight: 500, color: "#717182", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = "#070707")} onMouseLeave={e => (e.currentTarget.style.color = "#717182")}>Learn More</button>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16, scrollbarWidth: "none" }}>
          {filters.map(f => <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: "pointer", border: "none", background: filter === f ? "#1a1a1a" : "#f5f5f5", color: filter === f ? "#fff" : "#5a5a6a", transition: "all 0.18s" }}>{f}</button>)}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "4px 20px 24px", scrollbarWidth: "none" }}>
        {shown.map(card => (
          <div key={card.id} onMouseDown={() => setPr(card.id)} onMouseUp={() => setPr(null)} onMouseLeave={() => setPr(null)}
            style={{ flexShrink: 0, width: 160, borderRadius: 20, overflow: "hidden", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", cursor: "pointer", transform: pr === card.id ? "scale(0.97)" : "none", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ width: "100%", height: 200, overflow: "hidden" }}>
              <img src={(card.image as unknown as { src: string }).src ?? String(card.image)} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "12px 12px 14px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>{card.title}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
                <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: "#2563eb", color: "#fff" }}>{card.category}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}><span style={{ fontWeight: 600, color: "#16a34a", fontSize: 13 }}>{card.raised}</span>/raised</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Business Acquisition ─────────────────────────────────────────────────────

function DropdownFilter({ label, value, options, open, onToggle, onSelect }: { label: string; value: string; options: string[]; open: boolean; onToggle: () => void; onSelect: (s: string) => void }) {
  return (
    <div style={{ position: "relative", flex: 1 }}>
      <button onClick={onToggle} style={{ width: "100%", textAlign: "left", padding: "10px 14px", background: "#f3f4f6", border: "none", borderRadius: 14, cursor: "pointer" }}>
        <div style={{ color: "#9ca3af", fontSize: 10, marginBottom: 2 }}>{label}</div>
        <span style={{ color: "#111827", fontSize: 13, fontWeight: 600 }}>{value}</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, width: "100%", borderRadius: 12, marginTop: 4, zIndex: 20, overflow: "hidden", background: "#1f2937", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
          {options.map(s => (
            <button key={s} onClick={() => onSelect(s)} style={{ width: "100%", textAlign: "left", padding: "10px 14px", fontSize: 13, color: value === s ? "#60a5fa" : "#d1d5db", cursor: "pointer", background: "transparent", border: "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#374151")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>{s}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function BusinessAcquisitionSection() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("AI & SaaS");
  const [fund, setFund]     = useState("Series A – B");
  const [liked, setLiked]   = useState<Record<number,boolean>>({});
  const [hovC, setHovC]     = useState<number | null>(null);
  const [prC, setPrC]       = useState<number | null>(null);
  const [so, setSo]         = useState(false);
  const [fo, setFo]         = useState(false);
  const shown = BUSINESSES.filter(b => !query || b.name.toLowerCase().includes(query.toLowerCase()) || b.location.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ ...F, position: "relative" }}>
      <div style={{ padding: "28px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <h2 style={{ color: "#000", fontSize: 22, fontWeight: 600, margin: 0, flex: 1, lineHeight: 1.25, letterSpacing: "-0.3px" }}>Businesses Ready for Acquisition</h2>
          <span style={{ background: "#dff0fc", color: "#1c79ff", fontSize: 13, padding: "6px 16px", borderRadius: 999, whiteSpace: "nowrap", fontWeight: 600, flexShrink: 0, marginTop: 2, cursor: "pointer" }}>Portfolio</span>
        </div>
      </div>
      <div style={{ padding: "0 20px 12px", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", border: "1.5px solid #2d2d2d", height: 50, borderRadius: 14 }}>
          <input type="text" placeholder="Search Business" value={query} onChange={e => setQuery(e.target.value)} style={{ background: "transparent", outline: "none", border: "none", width: "100%", color: "#9ca3af", fontSize: 13, fontFamily: "inherit" }} />
        </div>
        <button style={{ background: "#2563eb", width: 50, height: 50, cursor: "pointer", border: "none", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <TbSearch size={20} color="white" strokeWidth={2} />
        </button>
      </div>
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 10 }}>
        <DropdownFilter label="Choose sector" value={sector} options={SECTORS}        open={so} onToggle={() => { setSo(!so); setFo(false); }} onSelect={s => { setSector(s); setSo(false); }} />
        <DropdownFilter label="Funding Stage" value={fund}   options={FUNDING_STAGES} open={fo} onToggle={() => { setFo(!fo); setSo(false); }} onSelect={s => { setFund(s);   setFo(false); }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 20px 10px" }}>
        <span style={{ color: "#6b7280", fontSize: 12 }}>Showing {shown.length} results</span>
        <button style={{ cursor: "pointer", background: "transparent", border: "none", color: "#6b7280", fontSize: 12, textDecoration: "underline", textUnderlineOffset: 3 }}
          onMouseEnter={e => (e.currentTarget.style.color = "#2563eb")} onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}>View More</button>
      </div>
      <div style={{ padding: "4px 16px 40px", display: "flex", flexDirection: "column", gap: 18 }}>
        {shown.map(biz => (
          <div key={biz.id} onMouseEnter={() => setHovC(biz.id)} onMouseLeave={() => { setHovC(null); setPrC(null); }} onMouseDown={() => setPrC(biz.id)} onMouseUp={() => setPrC(null)}
            style={{ background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: hovC === biz.id ? "0 12px 36px rgba(0,0,0,0.16)" : "0 4px 24px rgba(0,0,0,0.10)", border: hovC === biz.id ? "1px solid rgba(37,99,235,0.18)" : "1px solid #f0f0f0", cursor: "pointer", transform: prC === biz.id ? "scale(0.98)" : hovC === biz.id ? "translateY(-3px)" : "none", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)" }}>
            <div style={{ position: "relative", height: 220 }}>
              <Image src={biz.image} alt={biz.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 430px) 100vw, 430px" />
              <div style={{ position: "absolute", top: 14, left: 14, background: "#2563eb", borderRadius: 999, padding: "6px 12px", display: "flex", alignItems: "center", gap: 5 }}>
                <TbStarFilled size={12} color="white" /><span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>Best Choice</span>
              </div>
              <button onClick={() => setLiked(p => ({ ...p, [biz.id]: !p[biz.id] }))}
                style={{ position: "absolute", top: 12, right: 12, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
                {liked[biz.id] ? <TbHeartFilled size={17} color="#ef4444" /> : <TbHeart size={17} color="#9ca3af" strokeWidth={1.8} />}
              </button>
            </div>
            <div style={{ padding: "16px 16px 18px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                <h3 style={{ color: "#111827", fontSize: 16, fontWeight: 600, margin: 0, lineHeight: 1.2 }}>{biz.name}</h3>
                <div style={{ textAlign: "right", marginLeft: 8, flexShrink: 0 }}>
                  <div style={{ color: "#1e3a5f", fontSize: 20, fontWeight: 600, lineHeight: 1.1 }}>{biz.funding}</div>
                  <div style={{ color: "#9ca3af", fontSize: 10, marginTop: 1 }}>/funding</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
                <TbMapPin size={14} color="#22c55e" strokeWidth={2} />
                <span style={{ color: "#6b7280", fontSize: 12 }}>{biz.location}</span>
                <span style={{ color: "#d1d5db", fontSize: 12 }}>•</span>
                <span style={{ color: "#2563eb", fontSize: 12, fontWeight: 600 }}>{biz.investors} Investors</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {biz.tags.map(t => <span key={t} style={{ border: "1.5px solid #e5e7eb", borderRadius: 999, padding: "3px 10px", fontSize: 11, color: "#374151", fontWeight: 500 }}>{t}</span>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <TbTrendingUp size={15} color="#22c55e" strokeWidth={2} />
                  <span style={{ color: "#374151", fontSize: 12, fontWeight: 500 }}>Min. Entry: {biz.minEntry}</span>
                </div>
                {biz.verified && <span style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 8, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>Verified</span>}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ flex: 1, padding: "13px 0", borderRadius: 16, border: "1.5px solid #e5e7eb", background: "transparent", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>View Details</button>
                <button style={{ flex: 1, padding: "13px 0", borderRadius: 16, background: "#1e3a5f", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#2563eb")} onMouseLeave={e => (e.currentTarget.style.background = "#1e3a5f")}>
                  Contact <span style={{ fontSize: 16 }}>→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {(so || fo) && <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => { setSo(false); setFo(false); }} />}
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function MainContent() {
  return (
    <main style={{ display: "flex", flexDirection: "column", background: "#fff" }}>
      <HeroSection />
      <CategoriesSection />
      <CryptoLandscapesSection />
      <PortfolioSection />
      <BusinessAcquisitionSection />
    </main>
  );
}