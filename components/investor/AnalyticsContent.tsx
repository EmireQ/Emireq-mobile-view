"use client";

import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import {
  TbTrendingUp, TbClock, TbMaximize, TbPencil, TbDots,
  TbArrowUpRight, TbDownload, TbChartBar,
  TbChartLine, TbCopy, TbCircleCheck,
} from "react-icons/tb";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { FONT, InfoIcon, PageShell, cardBase } from "./shared";

// ─── Time Period Options ────────────────────────────────────────────────────

const PERIODS = ["1M", "3M", "6M", "12M", "YTD", "All"] as const;

// ─── Stat Cards ──────────────────────────────────────────────────────────────

const STAT_CARDS = [
  {
    icon: "roi",
    iconBg: "#10B981",
    label: "Overall ROI Growth",
    value: "$442,000",
    badge: "+28%",
    badgeBg: "rgba(16,185,129,0.1)",
    badgeColor: "#10B981",
    sub: "+$98,000 vs last year",
    showArrow: true,
    blobColor: "rgba(167,243,208,0.30)",
    cardBg: "linear-gradient(145deg, #ffffff 30%, #ecfdf5 100%)",
  },
  {
    icon: "sector",
    iconBg: "#3B82F6",
    label: "Top Sector",
    value: "HealthTech",
    badge: "+48%",
    badgeBg: "rgba(59,130,246,0.1)",
    badgeColor: "#3B82F6",
    sub: "$128,000 invested",
    showArrow: false,
    blobColor: "rgba(191,219,254,0.35)",
    cardBg: "linear-gradient(145deg, #ffffff 30%, #eff6ff 100%)",
  },
  {
    icon: "clock",
    iconBg: "#7C3AED",
    label: "Avg Holding Duration",
    value: "18 months",
    badgeText: "Optimal",
    badgeBg: "rgba(16,185,129,0.1)",
    badgeColor: "#10B981",
    sub: "Across 12 startups",
    showArrow: false,
    blobColor: "rgba(216,180,254,0.25)",
    cardBg: "linear-gradient(145deg, #ffffff 30%, #f5f3ff 100%)",
  },
  {
    icon: "projected",
    iconBg: "#F97316",
    label: "Projected Q4 Gain",
    value: "$156,880+",
    badgeText: "Projected",
    badgeBg: "rgba(234,179,8,0.12)",
    badgeColor: "#CA8A04",
    sub: "+13% expected ROI",
    showArrow: true,
    blobColor: "rgba(253,186,116,0.25)",
    cardBg: "linear-gradient(145deg, #ffffff 30%, #fff7ed 100%)",
  },
];

// ─── Token Balance Growth Data ──────────────────────────────────────────────

const TOKEN_BALANCE_DATA = [
  { quarter: "Q1", bar1: 8000, bar2: 48000 },
  { quarter: "Q2", bar1: 14000, bar2: 46000 },
  { quarter: "Q3", bar1: 22000, bar2: 50000 },
  { quarter: "Q4", bar1: 28000, bar2: 44000 },
];

// ─── Portfolio Performance Data ─────────────────────────────────────────────

const PORTFOLIO_PERFORMANCE_DATA = [
  { month: "Jan", portfolio: 140000, benchmark: 130000 },
  { month: "Feb", portfolio: 155000, benchmark: 140000 },
  { month: "Mar", portfolio: 170000, benchmark: 148000 },
  { month: "Apr", portfolio: 195000, benchmark: 155000 },
  { month: "May", portfolio: 220000, benchmark: 165000 },
  { month: "Jun", portfolio: 250000, benchmark: 175000 },
  { month: "Jul", portfolio: 270000, benchmark: 182000 },
  { month: "Aug", portfolio: 300000, benchmark: 190000 },
  { month: "Sep", portfolio: 330000, benchmark: 200000 },
  { month: "Oct", portfolio: 360000, benchmark: 210000 },
  { month: "Nov", portfolio: 400000, benchmark: 225000 },
  { month: "Dec", portfolio: 440000, benchmark: 240000 },
];

// ─── Sector Performance Data ────────────────────────────────────────────────

const SECTOR_DATA = [
  { label: "HealthTech", pct: 48, amount: "$128k", color: "#10B981" },
  { label: "FinTech", pct: 32, amount: "$96k", color: "#3B82F6" },
  { label: "AI/ML", pct: 28, amount: "$84k", color: "#6366F1" },
  { label: "CleanTech", pct: 22, amount: "$66k", color: "#F59E0B" },
  { label: "EdTech", pct: 18, amount: "34k", color: "#EC4899" },
];

// ─── Risk Distribution Data ─────────────────────────────────────────────────

const RISK_DATA = [
  { label: "Immunology", pct: 35, color: "#10B981" },
  { label: "Medium Risk", pct: 45, color: "#F59E0B" },
  { label: "High Risk", pct: 20, color: "#EF4444" },
];

// ─── KPI Data ───────────────────────────────────────────────────────────────

const KPI_DATA = [
  { label: "Best Performer", value: "HealthTech", sub: "+48% ROI", subColor: "#10B981", icon: "trend" },
  { label: "Active Startups", value: "12 Companies", sub: "Across 5 sectors", subColor: "#64748b", icon: "copy" },
  { label: "Risk-Adjusted Return (Sharpe Ratio)", value: "2.8", sub: "Strong risk-adjusted performance", subColor: "#64748b", icon: "clock" },
];

// ─── Stat Card Icon ─────────────────────────────────────────────────────────

function StatCardIcon({ type, color }: { type: string; color: string }) {
  const size = 26;
  const iconColor = "#fff";
  switch (type) {
    case "roi":
      return <TbTrendingUp size={size} color={iconColor} strokeWidth={2} />;
    case "sector":
      return <TbChartBar size={size} color={iconColor} strokeWidth={2} />;
    case "clock":
      return <TbClock size={size} color={iconColor} strokeWidth={2} />;
    case "projected":
      return <HiOutlineLightningBolt size={size} color={iconColor} />;
    default:
      return <TbTrendingUp size={size} color={iconColor} strokeWidth={2} />;
  }
}

// ─── Sector Donut Chart ─────────────────────────────────────────────────────

function SectorDonut() {
  const total = SECTOR_DATA.reduce((s, d) => s + d.pct, 0);
  function polar(cx: number, cy: number, r: number, deg: number) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function arc(cx: number, cy: number, oR: number, iR: number, sa: number, ea: number) {
    const p1 = polar(cx, cy, oR, sa + 1);
    const p2 = polar(cx, cy, oR, ea - 1);
    const p3 = polar(cx, cy, iR, ea - 1);
    const p4 = polar(cx, cy, iR, sa + 1);
    const f = ea - sa > 180 ? 1 : 0;
    return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${oR} ${oR} 0 ${f} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} A ${iR} ${iR} 0 ${f} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)} Z`;
  }
  let start = 0;
  const paths = SECTOR_DATA.map(s => {
    const span = (s.pct / total) * 360;
    const d = arc(110, 110, 90, 58, start, start + span);
    start += span;
    return { ...s, d };
  });
  return (
    <svg viewBox="0 0 220 220" style={{ width: "100%", maxWidth: 200, display: "block", margin: "0 auto" }}>
      {paths.map(s => <path key={s.label} d={s.d} fill={s.color} />)}
    </svg>
  );
}

// ─── Risk Distribution Donut ────────────────────────────────────────────────

function RiskDonut() {
  const total = RISK_DATA.reduce((s, d) => s + d.pct, 0);
  function polar(cx: number, cy: number, r: number, deg: number) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function arcPath(cx: number, cy: number, oR: number, iR: number, sa: number, ea: number) {
    const p1 = polar(cx, cy, oR, sa + 2);
    const p2 = polar(cx, cy, oR, ea - 2);
    const p3 = polar(cx, cy, iR, ea - 2);
    const p4 = polar(cx, cy, iR, sa + 2);
    const f = ea - sa > 180 ? 1 : 0;
    return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${oR} ${oR} 0 ${f} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} A ${iR} ${iR} 0 ${f} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)} Z`;
  }

  let start = 0;
  const paths = RISK_DATA.map(s => {
    const span = (s.pct / total) * 360;
    const d = arcPath(110, 110, 92, 68, start, start + span);
    start += span;
    return { ...s, d };
  });

  // Position the "20%" label near the High Risk segment
  // High Risk starts at 35% + 45% = 80% of circle, which is at ~288 degrees
  const highRiskMidAngle = ((0.35 + 0.45 + 0.10) * 360) - 90; // approximately at the end
  const labelAngle = (0.35 + 0.45 + 0.10) * 360 - 90;
  const labelR = 80;

  return (
    <svg viewBox="0 0 240 240" style={{ width: "100%", maxWidth: 210, display: "block", margin: "0 auto" }}>
      {paths.map(s => <path key={s.label} d={s.d} fill={s.color} strokeLinecap="round" />)}
      {/* 20% label bubble */}
      <circle cx="192" cy="180" r="22" fill="#fff" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.1))" }} />
      <text x="192" y="184" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600" fontFamily={FONT}>20%</text>
    </svg>
  );
}

// ─── Card Title Row ─────────────────────────────────────────────────────────

function CardTitle({ title, subtitle, icon, iconBg, showActions = true }: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  showActions?: boolean;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {icon && (
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: iconBg || "#EFF6FF",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {icon}
            </div>
          )}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em" }}>{title}</span>
              <InfoIcon size={17} />
            </div>
            {subtitle && <p style={{ fontSize: 13, color: "#64748b", margin: "3px 0 0", fontWeight: 400 }}>{subtitle}</p>}
          </div>
        </div>
        {showActions && (
          <div style={{ display: "flex", alignItems: "center", gap: 2, border: "1px solid #e5e7eb", borderRadius: 11, padding: "5px 8px", background: "#fff" }}>
            {[TbMaximize, TbPencil, TbDots].map((Icon, i) => (
              <button key={i} style={{ background: "none", border: "none", borderRadius: 7, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.15s", WebkitTapHighlightColor: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f3f4f6")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                <Icon size={13} color="#6b7280" strokeWidth={1.8} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Card Title with only dots menu ─────────────────────────────────────────

function CardTitleDots({ title, subtitle, icon, iconBg }: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {icon && (
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: iconBg || "#EFF6FF",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {icon}
            </div>
          )}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em" }}>{title}</span>
              <InfoIcon size={17} />
            </div>
            {subtitle && <p style={{ fontSize: 13, color: "#64748b", margin: "3px 0 0", fontWeight: 400 }}>{subtitle}</p>}
          </div>
        </div>
        <button style={{ background: "none", border: "none", borderRadius: 7, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.15s", WebkitTapHighlightColor: "transparent" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f3f4f6")}
          onMouseLeave={e => (e.currentTarget.style.background = "none")}
        >
          <TbDots size={16} color="#6b7280" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

// ─── Custom Tooltips ────────────────────────────────────────────────────────

function BarTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + p.value, 0);
  return (
    <div style={{ background: "#1e293b", borderRadius: 10, padding: "8px 12px", fontFamily: FONT, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>ROI: ${total.toLocaleString()}</div>
    </div>
  );
}

function AreaTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1e293b", borderRadius: 10, padding: "8px 12px", fontFamily: FONT, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
          {p.dataKey === "portfolio" ? "Portfolio" : "Benchmark"}: ${(p.value / 1000).toFixed(0)}k
        </div>
      ))}
    </div>
  );
}

// ─── KPI Icon ───────────────────────────────────────────────────────────────

function KPIIcon({ type }: { type: string }) {
  switch (type) {
    case "trend":
      return <TbArrowUpRight size={20} color="#6b7280" strokeWidth={1.7} />;
    case "copy":
      return <TbCopy size={20} color="#6b7280" strokeWidth={1.7} />;
    case "clock":
      return <TbClock size={20} color="#6b7280" strokeWidth={1.7} />;
    default:
      return <TbArrowUpRight size={20} color="#6b7280" strokeWidth={1.7} />;
  }
}

// ─── Main Export ────────────────────────────────────────────────────────────

export default function AnalyticsContent() {
  const [activePeriod, setActivePeriod] = useState<string>("12M");

  return (
    <PageShell title="Token" defaultActive="analytics">
      <div style={{ padding: "24px 16px 32px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ padding: "0 2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: "#3B82F6", fontWeight: 500, cursor: "pointer" }}>Dashboard</span>
            <span style={{ fontSize: 14, color: "#9ca3af" }}>›</span>
            <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>Analytics</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px,7vw,32px)", fontWeight: 600, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.01em", lineHeight: 1.15 }}>
            Analytics Dashboard
          </h1>
          <p style={{ fontSize: 15, color: "#64748b", margin: 0, lineHeight: 1.55, fontWeight: 400 }}>
            Comprehensive performance insights and portfolio analytics
          </p>
        </div>

        {/* ── Period Selector ── */}
        <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 14, padding: "5px" }}>
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              style={{
                flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: activePeriod === p ? 600 : 500,
                background: activePeriod === p ? "#1e293b" : "transparent",
                color: activePeriod === p ? "#fff" : "#94a3b8",
                boxShadow: activePeriod === p ? "0 1px 6px rgba(0,0,0,0.15)" : "none",
                transition: "all 0.18s",
                WebkitTapHighlightColor: "transparent",
                letterSpacing: "-0.01em",
                fontFamily: FONT,
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* ── Stat Cards 2×2 ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {STAT_CARDS.map((card) => (
            <div
              key={card.label}
              style={{
                background: card.cardBg,
                borderRadius: 20,
                padding: "18px 14px 16px",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "transform 0.18s, box-shadow 0.18s",
                WebkitTapHighlightColor: "transparent",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 14px rgba(0,0,0,0.05)";
              }}
            >
              {/* Background blob */}
              <div style={{
                position: "absolute", top: -20, right: -20, width: 80, height: 80,
                borderRadius: "50%", background: card.blobColor, filter: "blur(20px)",
              }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 16,
                    background: card.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 4px 14px ${card.iconBg}60`,
                  }}>
                    <StatCardIcon type={card.icon} color={card.iconBg} />
                  </div>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 3,
                    fontSize: 11, fontWeight: 600,
                    color: card.badgeColor,
                    background: card.badgeBg,
                    borderRadius: 20, padding: "5px 9px",
                    whiteSpace: "nowrap",
                  }}>
                    {card.badge || card.badgeText}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>{card.label}</div>
                <div style={{ fontSize: "clamp(18px,4.5vw,22px)", fontWeight: 600, color: "#111827", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 6 }}>{card.value}</div>
                <div style={{ fontSize: 11, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4 }}>
                  {card.showArrow && <TbArrowUpRight size={12} color="#10B981" strokeWidth={2.5} />}
                  <span style={{ color: card.showArrow ? "#10B981" : "#9ca3af" }}>{card.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Token Balance Growth ── */}
        <div style={cardBase}>
          <CardTitle
            title="Token Balance Growth"
            subtitle="6-month trend of total token value"
            icon={<TbTrendingUp size={22} color="#3B82F6" strokeWidth={2} />}
            iconBg="#EFF6FF"
          />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={TOKEN_BALANCE_DATA} margin={{ top: 10, right: 8, left: 8, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: FONT }}
                axisLine={false} tickLine={false} dy={6}
              />
              <YAxis
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: FONT }}
                axisLine={false} tickLine={false}
                domain={[0, 60000]}
                ticks={[0, 15000, 30000, 45000, 60000]}
                width={42}
              />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
              <defs>
                <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#BFDBFE" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <Bar dataKey="bar1" fill="url(#barGrad1)" radius={[6, 6, 0, 0]} barSize={20} />
              <Bar dataKey="bar2" fill="url(#barGrad2)" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Portfolio Performance ── */}
        <div style={cardBase}>
          <CardTitle
            title="Portfolio Performance"
            subtitle="vs Market Benchmark"
            icon={<TbChartLine size={22} color="#10B981" strokeWidth={2} />}
            iconBg="#ECFDF5"
          />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={PORTFOLIO_PERFORMANCE_DATA} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="benchmarkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: FONT }}
                axisLine={false} tickLine={false} dy={6}
              />
              <YAxis
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: FONT }}
                axisLine={false} tickLine={false}
                domain={[0, 600000]}
                ticks={[0, 150000, 300000, 450000, 600000]}
                width={48}
              />
              <Tooltip content={<AreaTooltip />} cursor={{ stroke: "rgba(0,0,0,0.12)", strokeWidth: 1, strokeDasharray: "4 4" }} />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="#94a3b8"
                strokeWidth={1.5}
                strokeDasharray="6 4"
                fill="url(#benchmarkGrad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="portfolio"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#portfolioGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#94a3b8" }} />
              <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>Market Benchmark</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontSize: 13, color: "#10B981", fontWeight: 600 }}>Your Portfolio</span>
            </div>
          </div>
        </div>

        {/* ── Sector Performance ── */}
        <div style={cardBase}>
          <CardTitle
            title="Sector Performance"
            subtitle="ROI by industry sector"
            icon={<TbClock size={22} color="#F59E0B" strokeWidth={2} />}
            iconBg="#FFF7ED"
          />
          <SectorDonut />
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
            {SECTOR_DATA.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#374151", fontWeight: 500, flex: 1 }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#10B981", minWidth: 42, textAlign: "right" }}>+{s.pct}%</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#374151", minWidth: 50, textAlign: "right" }}>{s.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Risk Distribution ── */}
        <div style={cardBase}>
          <CardTitleDots
            title="Risk Distribution"
            subtitle="Portfolio allocation"
            icon={<TbCircleCheck size={22} color="#EF4444" strokeWidth={2} />}
            iconBg="#FEE2E2"
          />
          <RiskDonut />
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 20 }}>
            {RISK_DATA.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#374151", fontWeight: 500, flex: 1 }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#374151", minWidth: 38, textAlign: "right" }}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Key Performance Indicators ── */}
        <div style={cardBase}>
          <CardTitleDots
            title="Key performance Indicators"
            subtitle="Detailed overview of performance"
            icon={<TbChartBar size={22} color="#7C3AED" strokeWidth={2} />}
            iconBg="#F3E8FF"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {KPI_DATA.map((kpi, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 18px",
                  background: "#f8fafc",
                  borderRadius: 16,
                  border: "1px solid #f1f5f9",
                  cursor: "pointer",
                  transition: "box-shadow 0.18s",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.07)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{kpi.label}</span>
                  <KPIIcon type={kpi.icon} />
                </div>
                <div style={{ fontSize: "clamp(18px,4.5vw,22px)", fontWeight: 700, color: "#111827", letterSpacing: "-0.03em", marginBottom: 4 }}>{kpi.value}</div>
                <div style={{ fontSize: 13, color: kpi.subColor, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                  {kpi.subColor === "#10B981" && <TbArrowUpRight size={14} color="#10B981" strokeWidth={2.5} />}
                  {kpi.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Export CSV Button ── */}
        <button
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%", padding: "16px 0",
            background: "#fff",
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            cursor: "pointer",
            fontSize: 16, fontWeight: 600, color: "#111827",
            fontFamily: FONT,
            WebkitTapHighlightColor: "transparent",
            transition: "box-shadow 0.18s, border-color 0.18s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.09)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
          }}
        >
          <TbDownload size={20} color="#374151" strokeWidth={2} />
          Export CSV
        </button>

      </div>
    </PageShell>
  );
}
