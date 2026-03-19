"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TbCoin, TbWallet, TbActivity, TbClock,
  TbMaximize, TbPencil, TbDots, TbTrendingUp,
  TbSearch, TbChevronLeft, TbChevronRight,
  TbDownload, TbRefresh, TbExternalLink, TbSelector,
  TbChevronRight as TbChevRight,
} from "react-icons/tb";
import { FONT, InfoIcon, PageShell, cardBase } from "./shared";

// ─── Chart Data ───────────────────────────────────────────────────────────────

const CHART_DATA: Record<string, { month: string; value: number }[]> = {
  "1W": [
    { month: "Mon", value: 398000 }, { month: "Tue", value: 402000 },
    { month: "Wed", value: 399000 }, { month: "Thu", value: 405000 },
    { month: "Fri", value: 408000 }, { month: "Sat", value: 407000 },
    { month: "Sun", value: 410000 },
  ],
  "1M": [
    { month: "W1", value: 385000 }, { month: "W2", value: 390000 },
    { month: "W3", value: 395000 }, { month: "W4", value: 410000 },
  ],
  "3M": [
    { month: "Jan", value: 370000 }, { month: "Feb", value: 385000 },
    { month: "Mar", value: 410000 },
  ],
  "6M": [
    { month: "Oct", value: 340000 }, { month: "Nov", value: 355000 },
    { month: "Dec", value: 362000 }, { month: "Jan", value: 375000 },
    { month: "Feb", value: 392000 }, { month: "Mar", value: 410000 },
  ],
  "1Y": [
    { month: "Jan", value: 30000 }, { month: "Feb", value: 65000 },
    { month: "Mar", value: 140000 }, { month: "Apr", value: 60000 },
    { month: "May", value: 110000 }, { month: "Jun", value: 115000 },
    { month: "Jul", value: 140000 }, { month: "Aug", value: 105000 },
    { month: "Sep", value: 100000 },
  ],
  "ALL": [
    { month: "2021", value: 180000 }, { month: "2022", value: 240000 },
    { month: "2023", value: 295000 }, { month: "2024", value: 370000 },
    { month: "2025", value: 410000 }, { month: "2026", value: 432000 },
  ],
};

// ─── Stat Cards ───────────────────────────────────────────────────────────────

const STAT_CARDS = [
  {
    Icon: TbCoin,
    iconBg: "#3B82F6",
    label: "Total Tokens Issued",
    value: "2.4M",
    sub: "Across 15 startups",
    blobColor: "rgba(191,204,255,0.35)",
    cardBg: "linear-gradient(145deg, #ffffff 30%, #eff6ff 100%)",
  },
  {
    Icon: TbWallet,
    iconBg: "#10B981",
    label: "Active Tokens",
    value: "3",
    sub: "ERC-20 holdings",
    blobColor: "rgba(167,243,208,0.35)",
    cardBg: "linear-gradient(145deg, #ffffff 30%, #ecfdf5 100%)",
  },
  {
    Icon: TbActivity,
    iconBg: "#7C3AED",
    label: "Recent Activity",
    value: "12",
    sub: "Last 30 days",
    blobColor: "rgba(216,180,254,0.30)",
    cardBg: "linear-gradient(145deg, #ffffff 30%, #f5f3ff 100%)",
  },
  {
    Icon: TbClock,
    iconBg: "#F97316",
    label: "Last Sync",
    value: "2",
    valueSuffix: " mins ago",
    sub: "Up to date",
    blobColor: "rgba(253,186,116,0.30)",
    cardBg: "linear-gradient(145deg, #ffffff 30%, #fff7ed 100%)",
  },
] as const;

// ─── Token Holdings ───────────────────────────────────────────────────────────

const TOKEN_HOLDINGS = [
  { initials: "EQ", name: "EMRQ", sub: "Token Balance", balance: "12,000", value: "$48,000", status: "Active", color: "#3B82F6" },
  { initials: "ZD", name: "ZMED", sub: "Token Balance", balance: "12,000", value: "$48,000", status: "Active", color: "#3B82F6" },
  { initials: "PR", name: "PLXR", sub: "Token Balance", balance: "12,000", value: "$48,000", status: "Active", color: "#3B82F6" },
];

// ─── Donut Distribution ─────────────────────────────────────────────────────

const DISTRIBUTION = [
  { label: "EMRQ", pct: 50, color: "#3B82F6" },
  { label: "ZMED", pct: 35, color: "#10B981" },
  { label: "PLXR", pct: 15, color: "#F59E0B" },
];

// ─── Active Investments ──────────────────────────────────────────────────────

interface Investment {
  date: string;
  type: string;
  entity: string;
  amount: string;
  tokenType: string;
  status: string;
  statusColor: string;
  statusBg: string;
}

const ALL_INVESTMENTS: Investment[] = [
  { date: "2025-11-12", type: "Transfer", entity: "StartupA", amount: "$25,000/TN-2158", tokenType: "SuperToken", status: "Confirmed", statusColor: "#0891b2", statusBg: "#cffafe" },
  { date: "2025-11-12", type: "Transfer", entity: "StartupA", amount: "$25,000/TN-2158", tokenType: "SuperToken", status: "Completed", statusColor: "#16A34A", statusBg: "#dcfce7" },
  { date: "2025-11-12", type: "Transfer", entity: "StartupB", amount: "$25,000/TN-2158", tokenType: "SuperToken", status: "Pending", statusColor: "#ea580c", statusBg: "#fff7ed" },
  { date: "2025-11-12", type: "Transfer", entity: "Emerg Marketplace", amount: "$25,000/TN-2158", tokenType: "SuperToken", status: "Completed", statusColor: "#16A34A", statusBg: "#dcfce7" },
  { date: "2025-11-10", type: "Transfer", entity: "StartupC", amount: "$18,000/TN-2159", tokenType: "SuperToken", status: "Confirmed", statusColor: "#0891b2", statusBg: "#cffafe" },
  { date: "2025-11-10", type: "Transfer", entity: "StartupA", amount: "$30,000/TN-2160", tokenType: "SuperToken", status: "Completed", statusColor: "#16A34A", statusBg: "#dcfce7" },
  { date: "2025-11-09", type: "Transfer", entity: "StartupB", amount: "$22,000/TN-2161", tokenType: "SuperToken", status: "Pending", statusColor: "#ea580c", statusBg: "#fff7ed" },
  { date: "2025-11-09", type: "Transfer", entity: "Emerg Marketplace", amount: "$15,000/TN-2162", tokenType: "SuperToken", status: "Completed", statusColor: "#16A34A", statusBg: "#dcfce7" },
  { date: "2025-11-08", type: "Transfer", entity: "StartupA", amount: "$20,000/TN-2163", tokenType: "SuperToken", status: "Confirmed", statusColor: "#0891b2", statusBg: "#cffafe" },
  { date: "2025-11-07", type: "Transfer", entity: "StartupC", amount: "$28,000/TN-2164", tokenType: "SuperToken", status: "Completed", statusColor: "#16A34A", statusBg: "#dcfce7" },
  { date: "2025-11-06", type: "Transfer", entity: "StartupB", amount: "$12,000/TN-2165", tokenType: "SuperToken", status: "Pending", statusColor: "#ea580c", statusBg: "#fff7ed" },
  { date: "2025-11-05", type: "Transfer", entity: "Emerg Marketplace", amount: "$35,000/TN-2166", tokenType: "SuperToken", status: "Completed", statusColor: "#16A34A", statusBg: "#dcfce7" },
];

const STATUS_OPTIONS = ["All", "Confirmed", "Completed", "Pending"];
const ITEMS_PER_PAGE = 4;

// ─── Donut Chart ─────────────────────────────────────────────────────────────

function DonutChart() {
  function polar(cx: number, cy: number, r: number, deg: number) {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function arc(cx: number, cy: number, oR: number, iR: number, sa: number, ea: number) {
    const p1 = polar(cx, cy, oR, sa + 1.2);
    const p2 = polar(cx, cy, oR, ea - 1.2);
    const p3 = polar(cx, cy, iR, ea - 1.2);
    const p4 = polar(cx, cy, iR, sa + 1.2);
    const f = ea - sa > 180 ? 1 : 0;
    return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${oR} ${oR} 0 ${f} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} A ${iR} ${iR} 0 ${f} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)} Z`;
  }
  let start = 0;
  const paths = DISTRIBUTION.map(s => {
    const span = (s.pct / 100) * 360;
    const d = arc(110, 110, 88, 54, start, start + span);
    start += span;
    return { ...s, d };
  });
  return (
    <svg viewBox="0 0 220 220" style={{ width: "100%", maxWidth: 200, display: "block", margin: "0 auto" }}>
      <circle cx="110" cy="110" r="93" fill="none" stroke="#e8eaf6" strokeWidth="1.5" />
      {paths.map(s => <path key={s.label} d={s.d} fill={s.color} />)}
      {/* Center icon — from Figma */}
      <circle cx="110" cy="110" r="42" fill="#fff" />
      <g transform="translate(91.5, 88) scale(0.52)">
        <path d="M11.6799 20.4402C16.5179 20.4402 20.4399 16.5182 20.4399 11.6802C20.4399 6.84215 16.5179 2.92017 11.6799 2.92017C6.84191 2.92017 2.91992 6.84215 2.91992 11.6802C2.91992 16.5182 6.84191 20.4402 11.6799 20.4402Z" stroke="#90A1B9" strokeWidth="2.92" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M26.4114 15.141C27.7916 15.6555 29.0197 16.5098 29.9822 17.6247C30.9448 18.7397 31.6106 20.0794 31.9182 21.5198C32.2258 22.9603 32.1652 24.4551 31.742 25.8659C31.3188 27.2768 30.5467 28.5581 29.497 29.5915C28.4474 30.6249 27.1542 31.3769 25.7369 31.778C24.3196 32.1791 22.8241 32.2164 21.3886 31.8864C19.9531 31.5564 18.624 30.8697 17.5242 29.8899C16.4244 28.9101 15.5894 27.6688 15.0964 26.2808" stroke="#90A1B9" strokeWidth="2.92" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M10.22 8.76013H11.68V14.6001" stroke="#90A1B9" strokeWidth="2.92" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M24.3967 20.2643L25.4187 21.3009L21.3015 25.4181" stroke="#90A1B9" strokeWidth="2.92" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <text x="110" y="128" textAnchor="middle" fill="#62748E" fontSize="13" fontWeight="500" fontFamily={FONT}>Total</text>
    </svg>
  );
}

// ─── Custom Chart Tooltip ────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  return (
    <div style={{ background: "#1a1a2e", borderRadius: 10, padding: "8px 12px", fontFamily: FONT, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
        ${val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val.toLocaleString()}
        <span style={{ fontSize: 11, color: "#4ade80", marginLeft: 4 }}>+12%</span>
      </div>
    </div>
  );
}

// ─── Token Balance Chart ─────────────────────────────────────────────────────

function TokenBalanceChart({ period }: { period: string }) {
  const data = CHART_DATA[period] ?? CHART_DATA["1Y"];
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: FONT }}
          axisLine={false} tickLine={false} dy={6}
        />
        <YAxis
          tickFormatter={v => `${(v / 1000).toFixed(0)}`}
          tick={{ fontSize: 11, fill: "#9ca3af", fontFamily: FONT }}
          axisLine={false} tickLine={false}
          width={32}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "rgba(0,0,0,0.12)", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── Shared Card Title ───────────────────────────────────────────────────────

function CardTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em" }}>{title}</span>
          <InfoIcon size={17} />
        </div>
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
      </div>
      {subtitle && <p style={{ fontSize: 13, color: "#64748b", margin: "5px 0 0", fontWeight: 400 }}>{subtitle}</p>}
    </div>
  );
}

// ─── Status Dropdown ─────────────────────────────────────────────────────────

function StatusDropdown({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "9px 14px",
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          background: "#fff",
          fontSize: 13,
          fontWeight: 500,
          color: "#374151",
          cursor: "pointer",
          fontFamily: FONT,
          whiteSpace: "nowrap",
          WebkitTapHighlightColor: "transparent",
          transition: "border-color 0.15s",
        }}
      >
        {value === "All" ? "Status" : value}
        <TbSelector size={15} color="#9ca3af" strokeWidth={1.8} />
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 60 }} onClick={() => setOpen(false)} />
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", right: 0,
            minWidth: 140, background: "#fff", borderRadius: 14,
            border: "1px solid #e5e7eb", boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            zIndex: 70, padding: "6px", fontFamily: FONT,
          }}>
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "10px 14px", borderRadius: 10, border: "none",
                  background: value === opt ? "#f3f4f6" : "transparent",
                  fontSize: 13, fontWeight: value === opt ? 600 : 400,
                  color: "#374151", cursor: "pointer", fontFamily: FONT,
                  WebkitTapHighlightColor: "transparent", transition: "background 0.12s",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

const PERIODS = ["1W", "1M", "3M", "6M", "1Y", "ALL"] as const;

export default function TokenContent() {
  const [activePeriod, setActivePeriod] = useState<string>("1Y");
  const [holdingsSearch, setHoldingsSearch] = useState("");
  const [investSearch, setInvestSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredHoldings = useMemo(() => {
    if (!holdingsSearch.trim()) return TOKEN_HOLDINGS;
    const q = holdingsSearch.toLowerCase();
    return TOKEN_HOLDINGS.filter(t =>
      t.name.toLowerCase().includes(q) || t.sub.toLowerCase().includes(q)
    );
  }, [holdingsSearch]);

  const filteredInvestments = useMemo(() => {
    return ALL_INVESTMENTS.filter(inv => {
      if (statusFilter !== "All" && inv.status !== statusFilter) return false;
      if (investSearch.trim()) {
        const q = investSearch.toLowerCase();
        if (
          !inv.entity.toLowerCase().includes(q) &&
          !inv.amount.toLowerCase().includes(q) &&
          !inv.status.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [statusFilter, investSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredInvestments.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filteredInvestments.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const handleExportCSV = () => {
    const headers = ["Date", "Type", "Entity", "Amount", "Token Type", "Status"];
    const rows = filteredInvestments.map(inv => [inv.date, inv.type, inv.entity, inv.amount, inv.tokenType, inv.status]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "token_investments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell title="Token" defaultActive="token">
      <div style={{ padding: "24px 16px 32px", display: "flex", flexDirection: "column", gap: 18 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 2px" }}>
          <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>Dashboard</span>
          <TbChevRight size={14} color="#9ca3af" strokeWidth={2} />
          <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>Token</span>
        </div>

        {/* ── Page Heading ── */}
        <div style={{ padding: "0 2px" }}>
          <h1 style={{
            fontSize: "clamp(26px,7vw,32px)", fontWeight: 600, color: "#0f172a",
            margin: "0 0 8px", letterSpacing: "-0.01em", lineHeight: 1.15,
          }}>
            Tokenization Management
          </h1>
          <p style={{ fontSize: 15, color: "#64748b", margin: 0, lineHeight: 1.55, fontWeight: 400 }}>
            View and Manage token holdings and transactions
          </p>
        </div>

        {/* ── Stat Cards 2×2 ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {STAT_CARDS.map(card => (
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
              {/* Decorative blob */}
              <div style={{
                position: "absolute",
                bottom: -20, right: -20,
                width: 100, height: 100,
                borderRadius: "50%",
                background: card.blobColor,
                pointerEvents: "none",
              }} />

              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: card.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginBottom: 14,
                boxShadow: `0 4px 14px ${card.iconBg}50`,
              }}>
                <card.Icon size={24} color="#fff" strokeWidth={2} />
              </div>

              {/* Label */}
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6, fontWeight: 500, position: "relative", zIndex: 1 }}>
                {card.label}
              </div>

              {/* Value */}
              <div style={{
                fontSize: "clamp(18px,4.5vw,22px)", fontWeight: 600, color: "#111827",
                letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 6,
                position: "relative", zIndex: 1,
                display: "flex", alignItems: "baseline",
              }}>
                {card.value}
                {"valueSuffix" in card && card.valueSuffix && (
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#6b7280", marginLeft: 4 }}>
                    {card.valueSuffix}
                  </span>
                )}
              </div>

              {/* Sub */}
              <div style={{ fontSize: 11, color: "#9ca3af", position: "relative", zIndex: 1 }}>
                {card.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Token Balance Growth ── */}
        <div style={cardBase}>
          <CardTitle title="Token Balance Growth" subtitle="6-month trend of total token value" />

          {/* Value + badge */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: "clamp(28px,7vw,34px)", fontWeight: 600, color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1 }}>$410,000</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#dcfce7", color: "#16a34a", fontSize: 13, fontWeight: 600, borderRadius: 20, padding: "5px 12px", whiteSpace: "nowrap" }}>
                <TbTrendingUp size={13} strokeWidth={2.5} /> +46.4%
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0, fontWeight: 400 }}>Current portfolio value</p>
          </div>

          {/* Period selector */}
          <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 14, padding: "5px", marginBottom: 20 }}>
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                style={{
                  flex: 1, padding: "8px 0", borderRadius: 10, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: activePeriod === p ? 600 : 500,
                  background: activePeriod === p ? "#fff" : "transparent",
                  color: activePeriod === p ? "#0f172a" : "#94a3b8",
                  boxShadow: activePeriod === p ? "0 1px 6px rgba(0,0,0,0.1)" : "none",
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

          <TokenBalanceChart period={activePeriod} />
        </div>

        {/* ── Token Distribution ── */}
        <div style={cardBase}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 17, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em" }}>Token Distribution</span>
            <p style={{ fontSize: 13, color: "#64748b", margin: "5px 0 0", fontWeight: 400 }}>Portfolio allocation</p>
          </div>

          <DonutChart />

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 20 }}>
            {DISTRIBUTION.map(d => (
              <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ERC-20 Holdings ── */}
        <div style={cardBase}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em" }}>ERC-20 Holdings</span>
              <InfoIcon size={17} />
            </div>
            <p style={{ fontSize: 13, color: "#64748b", margin: 0, fontWeight: 400 }}>Your current token balance across chains</p>
          </div>

          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "11px 14px", borderRadius: 14,
            border: "1px solid #e5e7eb", background: "#fff", marginBottom: 18,
          }}>
            <TbSearch size={18} color="#9ca3af" strokeWidth={1.8} style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search"
              value={holdingsSearch}
              onChange={e => setHoldingsSearch(e.target.value)}
              style={{
                border: "none", outline: "none",
                fontSize: 14, color: "#374151",
                fontFamily: FONT, fontWeight: 400,
                width: "100%", background: "transparent",
              }}
            />
          </div>

          {/* Token Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filteredHoldings.map((token, i) => (
              <div
                key={`${token.name}-${i}`}
                style={{
                  borderRadius: 18,
                  border: "1px solid #f1f5f9",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "box-shadow 0.18s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.09)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)")}
              >
                {/* Card Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 16px 14px" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 16,
                    background: token.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.03em" }}>
                      {token.initials}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", letterSpacing: "-0.01em" }}>
                      {token.name}
                    </div>
                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 3, fontWeight: 400 }}>
                      {token.sub}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "#f1f5f9", margin: "0 16px" }} />

                {/* Card Details */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
                  <div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4, fontWeight: 400 }}>Balance</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{token.balance}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4, fontWeight: 400 }}>Value (USD)</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{token.value}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4, fontWeight: 400 }}>Status</div>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: "#16A34A", background: "#dcfce7",
                      borderRadius: 16, padding: "4px 12px",
                    }}>
                      {token.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredHoldings.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#9ca3af", fontSize: 14 }}>
                No tokens found.
              </div>
            )}
          </div>

          {/* View On-Chain */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button
              style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 14, fontWeight: 600, color: "#3B82F6",
                background: "none", border: "none", cursor: "pointer",
                fontFamily: FONT, WebkitTapHighlightColor: "transparent",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <TbExternalLink size={16} strokeWidth={2} />
              View On-Chain
            </button>
          </div>
        </div>

        {/* ── Active Investments ── */}
        <div style={cardBase}>
          <div style={{ marginBottom: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: "#0f172a", letterSpacing: "-0.02em" }}>Active Investments</span>
              <InfoIcon size={17} />
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px", fontWeight: 400 }}>
            Your current investment portfolio
          </p>

          {/* Search + Status filter row */}
          <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, flex: 1,
              padding: "9px 14px", borderRadius: 12,
              border: "1px solid #e5e7eb", background: "#fff",
            }}>
              <TbSearch size={18} color="#9ca3af" strokeWidth={1.8} style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search"
                value={investSearch}
                onChange={e => { setInvestSearch(e.target.value); setCurrentPage(1); }}
                style={{
                  border: "none", outline: "none",
                  fontSize: 14, color: "#374151",
                  fontFamily: FONT, fontWeight: 400,
                  width: "100%", background: "transparent",
                }}
              />
            </div>
            <StatusDropdown
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={v => { setStatusFilter(v); setCurrentPage(1); }}
            />
          </div>

          {/* Investment List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {paginated.map((inv, i) => (
              <div key={`${inv.entity}-${inv.status}-${i}`}>
                {i > 0 && <div style={{ height: 1, background: "#f1f5f9" }} />}
                <div style={{ padding: "16px 0", cursor: "pointer" }}>
                  {/* Date + Status row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{inv.date}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 400, marginTop: 2 }}>{inv.type}</div>
                    </div>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: inv.statusColor,
                      background: inv.statusBg,
                      borderRadius: 16, padding: "5px 14px",
                    }}>
                      {inv.status}
                    </span>
                  </div>

                  {/* Detail rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 400 }}>Entity:</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{inv.entity}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 400 }}>Amount:</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{inv.amount}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 400 }}>Type</span>
                      <span style={{
                        fontSize: 12, fontWeight: 500,
                        color: "#6b7280", background: "#f3f4f6",
                        borderRadius: 8, padding: "4px 12px",
                        border: "1px solid #e5e7eb",
                      }}>
                        {inv.tokenType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {paginated.length === 0 && (
              <div style={{ textAlign: "center", padding: "32px 0", color: "#9ca3af", fontSize: 14 }}>
                No investments found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, marginTop: 24,
          }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              style={{
                width: 40, height: 40, borderRadius: 10,
                border: "none", background: "#f3f4f6",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: safePage <= 1 ? "default" : "pointer",
                opacity: safePage <= 1 ? 0.4 : 1,
                transition: "background 0.15s",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <TbChevronLeft size={18} color="#374151" strokeWidth={2} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  border: "none",
                  background: safePage === p ? "#0f172a" : "#f3f4f6",
                  color: safePage === p ? "#fff" : "#374151",
                  fontSize: 14, fontWeight: 600,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                  WebkitTapHighlightColor: "transparent",
                  fontFamily: FONT,
                }}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              style={{
                width: 40, height: 40, borderRadius: 10,
                border: "none", background: "#f3f4f6",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: safePage >= totalPages ? "default" : "pointer",
                opacity: safePage >= totalPages ? 0.4 : 1,
                transition: "background 0.15s",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <TbChevronRight size={18} color="#374151" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ── Bottom Action Buttons ── */}
        <div style={{
          display: "flex", gap: 12,
          justifyContent: "center",
        }}>
          <button
            onClick={handleExportCSV}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 24px", flex: 1,
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              background: "#fff",
              fontSize: 14, fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
              fontFamily: FONT,
              justifyContent: "center",
              WebkitTapHighlightColor: "transparent",
              transition: "background 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#f9fafb";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <TbDownload size={18} strokeWidth={2} />
            Export CSV
          </button>
          <button
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 24px", flex: 1,
              borderRadius: 14,
              border: "none",
              background: "#0f172a",
              fontSize: 14, fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              fontFamily: FONT,
              justifyContent: "center",
              WebkitTapHighlightColor: "transparent",
              transition: "background 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#1e293b";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.18)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#0f172a";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <TbRefresh size={18} strokeWidth={2} />
            Sync Wallet
          </button>
        </div>

        {/* ── Footer Note ── */}
        <p style={{
          fontSize: 12, color: "#9ca3af", textAlign: "center",
          margin: "4px 0 0", lineHeight: 1.55, fontWeight: 400,
        }}>
          Market data is updated in real-time. Prices are for reference only and may vary across exchanges.
        </p>

      </div>
    </PageShell>
  );
}
