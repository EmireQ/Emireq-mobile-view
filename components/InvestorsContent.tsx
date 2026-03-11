"use client";

import React, { useState, useRef } from "react";
import { TbSearch, TbFilter, TbTrendingUp, TbMapPin, TbUsers,
         TbBuildingSkyscraper, TbArrowRight, TbTargetArrow, TbBolt } from "react-icons/tb";

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const NAVY = "#152B5A";
const F: React.CSSProperties = { fontFamily: FONT };
const pill = (bg: string, color: string, extra?: React.CSSProperties): React.CSSProperties =>
  ({ background: bg, color, fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "4px 12px", whiteSpace: "nowrap", ...extra });

// ─── Data ─────────────────────────────────────────────────────────────────────

const INVESTORS = [
  { id: 1, name: "Alpha Ventures Capital", location: "Dubai, UAE",      tags: [{ label: "FinTech",     bg: "#e0ecff", color: "#2563eb" }, { label: "Series A/B", bg: "#d1fae5", color: "#059669" }], totalDeals: 42, active: 8,  range: "$2M - $10M",  trending: true  },
  { id: 2, name: "Gulf Horizon Fund",      location: "Abu Dhabi, UAE",  tags: [{ label: "Real Estate", bg: "#fce7f3", color: "#db2777" }, { label: "Seed",       bg: "#fef3c7", color: "#d97706" }], totalDeals: 28, active: 5,  range: "$500K - $5M", trending: false },
  { id: 3, name: "MENA Growth Partners",   location: "Riyadh, KSA",     tags: [{ label: "HealthTech",  bg: "#fee2e2", color: "#dc2626" }, { label: "Series B",   bg: "#d1fae5", color: "#059669" }], totalDeals: 61, active: 12, range: "$5M - $50M",  trending: true  },
];

const EVENTS = [
  { id: 1, attendees: "350+", date: "Feb 18, 2026", title: "Dubai Investor Summit 2025", description: "Meet top VCs, angel networks, and Islamic finance funds.",                   location: "Dubai World Trade Centre"    },
  { id: 2, attendees: "200+", date: "Apr 5, 2026",  title: "MENA Startup Pitch Day",     description: "Pitch your startup to top-tier regional and global investors.",             location: "Riyadh Exhibition Center"    },
  { id: 3, attendees: "180+", date: "Jun 12, 2026", title: "Gulf Fintech Forum 2026",     description: "Connect with fintech founders, funds, and regulators across the Gulf.",     location: "Abu Dhabi Convention Centre" },
];

const STEPS = [
  { id: 1, Icon: TbSearch,      color: "#9810FA", bg: "linear-gradient(135deg,#f3e8ff,#ede9fe)", label: "Search & Filter", sw: 1.33 },
  { id: 2, Icon: TbTargetArrow, color: "#155DFC", bg: "linear-gradient(135deg,#dbeafe,#e0e7ff)", label: "Review Profiles", sw: 1.33 },
  { id: 3, Icon: TbBolt,        color: "#16a34a", bg: "linear-gradient(135deg,#dcfce7,#d1fae5)", label: "Connect & Pitch", sw: 2    },
];

// ─── ScrollSection ────────────────────────────────────────────────────────────

const SIDE = 20, GAP = 12;

function ScrollSection<T extends { id: number }>({ title, subtitle, seeAll, items, renderCard }: {
  title: string; subtitle?: string; seeAll: string; items: T[]; renderCard: (item: T) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const cw = () => (ref.current ? ref.current.clientWidth - SIDE * 2 : 0);
  const scrollTo = (i: number) => { ref.current?.scrollTo({ left: i * (cw() + GAP), behavior: "smooth" }); setActive(i); };
  const onScroll = () => { if (!ref.current) return; setActive(Math.min(Math.max(Math.round(ref.current.scrollLeft / (cw() + GAP)), 0), items.length - 1)); };
  return (
    <section style={{ padding: "24px 0 20px", background: "#fff", ...F, boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: `0 ${SIDE}px`, marginBottom: subtitle ? 4 : 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0, letterSpacing: "-0.02em" }}>{title}</h2>
        <button style={{ fontSize: 14, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "2px" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#111827")} onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}>{seeAll}</button>
      </div>
      {subtitle && <p style={{ padding: `0 ${SIDE}px`, margin: "0 0 14px", fontSize: 15, color: "#9ca3af" }}>{subtitle}</p>}
      <div ref={ref} onScroll={onScroll} style={{ display: "flex", gap: GAP, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingLeft: SIDE, paddingRight: SIDE, scrollPaddingLeft: SIDE, paddingTop: 4, paddingBottom: 8, boxSizing: "border-box", scrollbarWidth: "none" }}>
        {items.map(item => (
          <div key={item.id} style={{ scrollSnapAlign: "start", flexShrink: 0, width: `calc(100% - ${SIDE * 2}px)`, minWidth: `calc(100% - ${SIDE * 2}px)` }}>{renderCard(item)}</div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
        {items.map((_, i) => <button key={i} onClick={() => scrollTo(i)} style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? NAVY : "rgba(193,193,193,0.5)", border: "none", padding: 0, cursor: "pointer", transition: "all 0.25s" }} />)}
      </div>
    </section>
  );
}

// ─── Investor Card ────────────────────────────────────────────────────────────

function InvestorCard({ investor: inv }: { investor: typeof INVESTORS[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: 24, border: "1px solid #e5e7eb", padding: 20, boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(180deg,${NAVY},#1A3570)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(193,193,193,0.5)" }}>
          <TbBuildingSkyscraper size={22} color="white" strokeWidth={1.6} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inv.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
            <TbMapPin size={13} color="#9ca3af" strokeWidth={1.3} />
            <span style={{ fontSize: 13, color: "#9ca3af" }}>{inv.location}</span>
          </div>
        </div>
        {inv.trending && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 20, padding: "4px 10px", flexShrink: 0 }}>
            <TbTrendingUp size={12} color="#f97316" strokeWidth={2} />
            <span style={{ fontSize: 11, color: "#f97316", fontWeight: 600 }}>Trending</span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {inv.tags.map(t => <span key={t.label} style={pill(t.bg, t.color, { fontWeight: 500 })}>{t.label}</span>)}
      </div>

      <div style={{ background: "#f9fafb", borderRadius: 12, display: "flex", marginBottom: 16, overflow: "hidden" }}>
        {([{ val: inv.totalDeals, lbl: "Total Deals", color: "#111827" }, { val: inv.active, lbl: "Active", color: "#10b981" }] as const).map((s, i) => (
          <React.Fragment key={s.lbl}>
            {i > 0 && <div style={{ width: 1, background: "#e5e7eb", margin: "10px 0" }} />}
            <div style={{ flex: 1, padding: "12px 0", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: s.color, letterSpacing: "-0.02em" }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{s.lbl}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 14, color: "#9ca3af", marginBottom: 3 }}>Investment Range</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>{inv.range}</div>
        </div>
        <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{ background: hov ? "#1e3d7d" : NAVY, color: "#fff", fontSize: 13, fontWeight: 600, padding: "11px 20px", borderRadius: 12, border: "none", cursor: "pointer", transition: "background 0.18s", display: "flex", alignItems: "center", gap: 6 }}>
          View Profile <TbArrowRight size={16} color="white" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────

function EventCard({ event: ev }: { event: typeof EVENTS[0] }) {
  const [dH, setDH] = useState(false);
  const [rH, setRH] = useState(false);
  return (
    <div style={{ borderRadius: 24, border: "1px solid #e5e7eb", overflow: "hidden", background: "#fff", boxSizing: "border-box" }}>
      <div style={{ background: "linear-gradient(135deg,#6c63ff,#8b7cf6)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <TbUsers size={18} color="white" strokeWidth={1.8} />
          <span style={{ color: "#fff", fontWeight: 500, fontSize: 15 }}>{ev.attendees} Attendees</span>
        </div>
        <span style={{ color: "#fff", fontSize: 15 }}>{ev.date}</span>
      </div>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "#111827", lineHeight: 1.3, flex: 1 }}>{ev.title}</span>
          <span style={pill("#d1fae5", "#059669")}>Upcoming</span>
        </div>
        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: "0 0 12px" }}>{ev.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <TbMapPin size={13} color="#f97316" strokeWidth={1.8} />
          </div>
          <span style={{ fontSize: 13, color: "#9ca3af" }}>{ev.location}</span>
        </div>
        <div style={{ height: 1, background: "#f3f4f6", marginBottom: 14 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onMouseEnter={() => setDH(true)} onMouseLeave={() => setDH(false)}
            style={{ flex: 1, padding: "11px 0", borderRadius: 50, border: "1.5px solid #e5e7eb", background: dH ? "#f9fafb" : "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "background 0.15s" }}>Details</button>
          <button onMouseEnter={() => setRH(true)} onMouseLeave={() => setRH(false)}
            style={{ flex: 1, padding: "11px 0", borderRadius: 50, border: "none", background: rH ? "#1a1a1a" : "#111827", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}>Register Now</button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [val, setVal] = useState("");
  const [foc, setFoc] = useState(false);
  return (
    <section style={{ background: "#fff", padding: "20px 20px 8px", ...F }}>
      <h1 style={{ fontSize: "clamp(26px,7.5vw,34px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.03em", color: "#111827", margin: "0 0 10px" }}>Connect with the<br />right Investors</h1>
      <p style={{ fontSize: 14, color: "#43536D", lineHeight: 1.6, margin: "0 0 20px", maxWidth: 310 }}>Connect with verified investors—VCs, angels, and private equity in your sector.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div onClick={() => document.getElementById("inv-s")?.focus()}
          style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "#f9fafb", border: `1.5px solid ${foc ? NAVY : "#e5e7eb"}`, borderRadius: 50, padding: "11px 16px", cursor: "text", transition: "border-color 0.2s,box-shadow 0.2s", boxShadow: foc ? "0 0 0 3px rgba(21,43,90,0.08)" : "none" }}>
          <TbSearch size={18} color="#9ca3af" strokeWidth={1.5} />
          <input id="inv-s" type="text" value={val} onChange={e => setVal(e.target.value)} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} placeholder="Search investors..."
            style={{ flex: 1, fontSize: 14, color: "#374151", background: "transparent", border: "none", outline: "none", fontFamily: "inherit" }} />
        </div>
        <button aria-label="Filter"
          style={{ width: 46, height: 46, borderRadius: 12, background: NAVY, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(21,43,90,0.25)", transition: "background 0.18s,transform 0.18s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#1e3d7d")} onMouseLeave={e => (e.currentTarget.style.background = NAVY)}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.93)")} onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}>
          <TbFilter size={20} color="white" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}

// ─── How This Works ───────────────────────────────────────────────────────────

function HowThisWorks() {
  const [gsH, setGs] = useState(false);
  const [dH, setD]   = useState(false);
  return (
    <section style={{ padding: "36px 20px 32px", background: "#fff", ...F, boxSizing: "border-box" }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: "0 0 10px", letterSpacing: "-0.02em" }}>How This Works</h2>
      <p style={{ fontSize: 17, color: "#6b7280", lineHeight: 1.5, margin: "0 0 36px" }}>Connect with the right investors in three simple steps</p>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", marginBottom: 40 }}>
        {STEPS.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: 1 }}>
              <div style={{ width: 68, height: 68, borderRadius: 20, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.18s,box-shadow 0.18s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "scale(1.06)"; el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}>
                <s.Icon size={28} color={s.color} strokeWidth={s.sw} />
              </div>
              <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500, textAlign: "center", whiteSpace: "nowrap" }}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div style={{ width: 40, height: 1.5, background: "linear-gradient(90deg,#d1d5db,#e5e7eb)", flexShrink: 0, marginBottom: 28 }} />}
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(155deg,#1a2f6b,#152B5A 60%,#1a3570)", borderRadius: 24, padding: "36px 24px 32px", textAlign: "center", boxSizing: "border-box" }}>
        <h3 style={{ fontSize: 23, fontWeight: 500, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.2 }}>Ready to Connect with<br />Global Investors?</h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: "0 0 28px" }}>Join thousands who've raised capital on<br />Emireq. Start your journey today.</p>
        <button onMouseEnter={() => setGs(true)} onMouseLeave={() => setGs(false)}
          style={{ width: "100%", padding: "16px 0", borderRadius: 50, border: "none", background: gsH ? "#e6ab00" : "#f5bc00", color: "#111827", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "background 0.18s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          Get Started <TbArrowRight size={14} color="#111827" strokeWidth={1.5} />
        </button>
        <button onMouseEnter={() => setD(true)} onMouseLeave={() => setD(false)}
          style={{ width: "100%", padding: "16px 0", borderRadius: 50, border: "1.5px solid rgba(255,255,255,0.2)", background: dH ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "background 0.18s" }}>
          Schedule a Demo
        </button>
      </div>
    </section>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function InvestorsContent() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <HeroSection />
      <ScrollSection title="Featured Investors" subtitle={`Showing ${INVESTORS.length} results`} seeAll="View More" items={INVESTORS} renderCard={inv => <InvestorCard investor={inv} />} />
      <ScrollSection title="Upcoming Investors" seeAll="See all" items={EVENTS} renderCard={ev => <EventCard event={ev} />} />
      <HowThisWorks />
    </main>
  );
}