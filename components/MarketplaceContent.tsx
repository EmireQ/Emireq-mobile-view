"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import cyber from "../public/assets/cyber.png";
import fin from "../public/assets/fin.png";
import health from "../public/assets/health.png";
import { TbSearch, TbAdjustmentsHorizontal, TbMapPin, TbStarFilled, TbCircleCheck, TbTrendingUp, TbX, TbChevronDown, TbArrowRight, TbFileText, TbChartBar, TbClipboard, TbStar, TbUsers } from "react-icons/tb";

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const NAVY = "#152B5A";
const F: React.CSSProperties = { fontFamily: FONT };
const SIDE = 20;
const GAP = 12;

const INVEST_CARDS = [
  { id: 1, category: "Cybersecurity Solutions", trending: "70%", name: "CyberGuard AI", location: "Singapore", description: "AI-powered cybersecurity platform offering threat detection, privacy-first data...", tags: ["EDUCATION", "ARTIFICIAL INTELLIGENCE (AI)"], raised: "RM 450.350", progress: 0.72, valuation: "RM 12.0M", minTarget: "RM 499,994", investors: 23, image: cyber },
  { id: 2, category: "FinTech Solutions", trending: "45%", name: "PayChain Pro", location: "Dubai, UAE", description: "Blockchain-based payment infrastructure for fast cross-border transactions...", tags: ["FINTECH", "BLOCKCHAIN"], raised: "RM 280.000", progress: 0.55, valuation: "RM 8.5M", minTarget: "RM 350,000", investors: 18, image: fin },
  { id: 3, category: "HealthTech", trending: "38%", name: "MediAI Solutions", location: "Kuala Lumpur", description: "AI-driven diagnostic tools revolutionizing healthcare outcomes worldwide...", tags: ["HEALTHCARE", "AI & ML"], raised: "RM 190.500", progress: 0.42, valuation: "RM 6.0M", minTarget: "RM 250,000", investors: 14, image: health },
];
const FEATURED = [
  { id: 1, initials: "MG", name: "MarqGrow", description: "Growth marketing engine for fast-scaling brands", location: "New York, NY", industry: "Marketing" },
  { id: 2, initials: "PG", name: "PayStream Global", description: "Cross-border payment solutions for businesses", location: "London, UK", industry: "FinTech" },
];
const REGIONS = ["UAE", "Singapore", "India", "USA"];
const TOP_STARTUPS = [
  { id: 1, initials: "FP", name: "FinEdge Payments", description: "Payment gateway for global merchants", location: "Dubai, UAE", industry: "FinTech", funding: "$8.5M", verified: true, trending: true },
  { id: 2, initials: "CS", name: "CyberShield AI", description: "AI-powered enterprise security platform", location: "Abu Dhabi, UAE", industry: "Cybersecurity", funding: "$5.2M", verified: true, trending: false },
  { id: 3, initials: "GT", name: "GreenTech UAE", description: "Sustainable energy solutions for the MENA region", location: "Dubai, UAE", industry: "CleanTech", funding: "$3.8M", verified: false, trending: true },
];
const IT_VENDORS = [
  { id: 1, initials: "CF", name: "CloudForge", location: "New York, NY", rating: 4.9, clients: "3,200+" },
  { id: 2, initials: "DX", name: "DataXpert", location: "San Francisco", rating: 4.7, clients: "1,800+" },
  { id: 3, initials: "SN", name: "SyncNet Pro", location: "London, UK", rating: 4.8, clients: "2,500+" },
];
const CATEGORIES = ["All Category", "FinTech", "Cybersecurity", "CleanTech", "HealthTech", "EdTech", "AI & ML"];
const SORT_OPTIONS = ["Recently Added", "Most Funded", "Top Rated", "Trending", "Oldest First"];
const COMPANY_SIZES = ["All size", "1–10", "11–50", "51–200", "201–500", "500+"];
const LICENSE_TYPES = ["SaaS (Cloud)", "On-Premise", "Hybrid", "Open Source", "Subscription"];
const COMPLIANCE_OPTIONS = ["All Standards", "ISO 27001", "SOC 2", "GDPR", "HIPAA", "PCI DSS"];
const DEPARTMENTS = [
  { label: "Enterprise Software", count: 245 }, { label: "Cloud & Infrastructure", count: 189 },
  { label: "AI, ML & Data Platforms", count: 156 }, { label: "Cybersecurity Solutions", count: 98 },
  { label: "FinTech & Banking Tech", count: 134 }, { label: "Marketing Automation", count: 167 },
  { label: "HR, Payroll & Recruitment", count: 123 }, { label: "Procurement Solutions", count: 87 },
  { label: "Healthcare & Pharma Tech", count: 112 }, { label: "Manufacturing & ERP", count: 145 },
  { label: "Custom Integrations & APIs", count: 92 },
];
const TOOLS = [
  { Icon: TbFileText, label: "RFQ/Request for Quotes", badge: "New" },
  { Icon: TbChartBar, label: "Compare Solutions", badge: "" },
  { Icon: TbClipboard, label: "Procurement Dashboard", badge: "" },
  { Icon: TbStar, label: "Vendor Shortlist", badge: "3" },
  { Icon: TbUsers, label: "Team Approvals", badge: "" },
];

// ─── Shared ───────────────────────────────────────────────────────────────────

const Initials = ({ text, size = 48, bg = NAVY }: { text: string; size?: number; bg?: string }) => (
  <div style={{ width: size, height: size, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: Math.round(size * 0.3), fontWeight: 700, letterSpacing: "-0.01em", fontFamily: FONT }}>{text}</div>
);

const VerifiedBadge = () => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#00A63E", background: "#dcfce7", borderRadius: 20, padding: "3px 10px", fontFamily: FONT }}>
    <TbCircleCheck size={14} strokeWidth={1.8} color="#00A63E" /> Verified
  </span>
);

const TrendingBadge = () => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#ea580c", background: "#fff7ed", borderRadius: 20, padding: "3px 10px", fontFamily: FONT }}>
    <TbTrendingUp size={12} strokeWidth={2.5} /> Trending
  </span>
);

const ViewProfileBtn = ({ border = "1.5px solid #3b6ef8", color = "#3b6ef8", bg = "#fff" }: { border?: string; color?: string; bg?: string }) => {
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: "100%", padding: "11px", borderRadius: 10, border, background: hov ? color : bg, color: hov ? "#fff" : color, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: FONT, transition: "all 0.18s" }}>
      View Profile <TbArrowRight size={15} strokeWidth={2.5} />
    </button>
  );
};

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7280", border: "1px solid #e5e7eb", borderRadius: 6, padding: "3px 8px", fontFamily: FONT, letterSpacing: "0.04em" }}>{children}</span>
);

const Pill = ({ children, color = "#3b6ef8" }: { children: React.ReactNode; color?: string }) => (
  <span style={{ fontSize: 12, fontWeight: 500, color, background: "#eff6ff", borderRadius: 20, padding: "4px 12px", display: "inline-flex", alignItems: "center", gap: 4, fontFamily: FONT }}>{children}</span>
);

const SectionHeader = ({ title, linkLabel = "See More" }: { title: string; linkLabel?: string }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
    <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0, letterSpacing: "-0.02em" }}>{title}</h2>
    <button style={{ fontSize: 14, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2, fontFamily: FONT }}
      onMouseEnter={e => (e.currentTarget.style.color = "#111827")} onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}>{linkLabel}</button>
  </div>
);

// ─── DropdownSelect ───────────────────────────────────────────────────────────

const DropdownSelect = ({ value, options, onChange, bg = "#fff", triggerBorder = "1.5px solid #e5e7eb" }: { value: string; options: string[]; onChange: (v: string) => void; bg?: string; triggerBorder?: string }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <div onClick={() => setOpen(o => !o)} style={{ background: bg, borderRadius: 10, padding: "11px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", border: triggerBorder }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "#111827", fontFamily: FONT }}>{value}</span>
        <TbChevronDown size={15} color="#9ca3af" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.18s" }} />
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 10, zIndex: 20, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
          {options.map(opt => (
            <div key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              style={{ padding: "11px 14px", fontSize: 13, fontWeight: value === opt ? 600 : 400, color: value === opt ? "#3b6ef8" : "#374151", background: value === opt ? "#eff6ff" : "#fff", cursor: "pointer", fontFamily: FONT, borderBottom: "1px solid #f3f4f6" }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── InvestCard ───────────────────────────────────────────────────────────────

const InvestCard = ({ c, width }: { c: typeof INVEST_CARDS[0]; width: number }) => (
  <div style={{ width, borderRadius: 18, border: "1px solid #e5e7eb", background: "#fff", overflow: "visible", flexShrink: 0 }}>
    <div style={{ position: "relative", height: 176, borderRadius: "18px 18px 0 0", overflow: "hidden" }}>
      <Image src={c.image} alt={c.name} fill style={{ objectFit: "cover" }} />
      <div style={{ position: "absolute", top: 12, left: 12, background: NAVY, borderRadius: 20, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5, zIndex: 2 }}>
        <TbStarFilled size={12} color="#FFC300" />
        <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", fontFamily: FONT }}>{c.category}</span>
      </div>
      <div style={{ position: "absolute", top: 12, right: 12, background: "#fff", borderRadius: 20, padding: "5px 10px", display: "flex", alignItems: "center", gap: 4, zIndex: 2 }}>
        <TbTrendingUp size={12} color="#16a34a" strokeWidth={2.5} />
        <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", fontFamily: FONT }}>{c.trending}</span>
      </div>
    </div>
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: -42, right: 14, width: 82, height: 82, borderRadius: 20, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.10)", zIndex: 3 }}>
        <span style={{ fontSize: 26, color: "#00ACC1", fontWeight: 400, fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}>logo</span>
      </div>
      <div style={{ padding: "36px 16px 16px", background: "#fff", borderRadius: "0 0 18px 18px" }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "#111827", margin: "0 0 3px", fontFamily: FONT }}>{c.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
          <TbMapPin size={12} color="#9ca3af" /><span style={{ fontSize: 13, color: "#9ca3af", fontFamily: FONT }}>{c.location}</span>
        </div>
        <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, margin: "0 0 12px", fontFamily: FONT }}>{c.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {c.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", fontFamily: FONT }}>RAISED</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#111827", fontFamily: FONT }}>{c.raised}</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "#e5e7eb", overflow: "hidden", marginBottom: 14 }}>
            <div style={{ height: "100%", width: `${c.progress * 100}%`, background: "#FFC300", borderRadius: 4 }} />
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #e5e7eb", paddingTop: 12 }}>
            {[{ label: "VALUATION", value: c.valuation }, { label: "MIN. TARGET", value: c.minTarget, green: true }, { label: "INVESTORS", value: String(c.investors), icon: true }].map((item, i) => (
              <div key={i} style={{ flex: 1, borderLeft: i > 0 ? "1px solid #e5e7eb" : "none", paddingLeft: i > 0 ? 10 : 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", display: "block", marginBottom: 3, fontFamily: FONT }}>{item.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {item.icon && <TbUsers size={13} color="#374151" />}
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.green ? "#16a34a" : "#111827", fontFamily: FONT }}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── InvestSection ────────────────────────────────────────────────────────────

const InvestSection = ({ items, onFilterOpen, search, setSearch, focused, setFoc }: { items: typeof INVEST_CARDS; onFilterOpen: () => void; search: string; setSearch: (v: string) => void; focused: boolean; setFoc: (v: boolean) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState(0);
  const cardWidth = 288;
  const sc = (i: number) => { ref.current?.scrollTo({ left: i * (cardWidth + GAP), behavior: "smooth" }); setDot(i); };
  const onScroll = () => ref.current && setDot(Math.min(Math.round(ref.current.scrollLeft / (cardWidth + GAP)), items.length - 1));
  return (
    <section style={{ background: "#fff", padding: "20px 0", ...F }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${SIDE}px`, marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0, letterSpacing: "-0.02em" }}>Invest in Startups</h2>
        <button style={{ fontSize: 14, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2, fontFamily: FONT }}
          onMouseEnter={e => (e.currentTarget.style.color = "#111827")} onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}>See all</button>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", padding: `0 ${SIDE}px`, marginBottom: 16 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "#f9fafb", borderRadius: 50, padding: "11px 16px", border: focused ? "1.5px solid #3b6ef8" : "1.5px solid #e5e7eb", transition: "border 0.18s" }}>
          <TbSearch size={16} color="#9ca3af" strokeWidth={2} />
          <input value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setFoc(true)} onBlur={() => setFoc(false)} placeholder="Search startups, tokens, or investors..."
            style={{ flex: 1, fontSize: 14, color: "#374151", background: "transparent", border: "none", outline: "none", fontFamily: FONT }} />
          {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}><TbX size={14} color="#9ca3af" /></button>}
        </div>
        <button onClick={onFilterOpen} style={{ width: 48, height: 48, borderRadius: 14, background: "#3b6ef8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 14px rgba(59,110,248,0.3)" }}>
          <TbAdjustmentsHorizontal size={22} color="#fff" strokeWidth={2} />
        </button>
      </div>
      <div ref={ref} onScroll={onScroll} style={{ display: "flex", gap: GAP, overflowX: "auto", padding: `12px 0 16px ${SIDE}px`, scrollbarWidth: "none", scrollSnapType: "x mandatory", msOverflowStyle: "none", scrollPaddingLeft: SIDE }}>
        {items.map(item => <div key={item.id} style={{ scrollSnapAlign: "start", flexShrink: 0 }}><InvestCard c={item} width={cardWidth} /></div>)}
        <div style={{ width: SIDE, flexShrink: 0 }} />
      </div>
      {items.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
          {items.map((_, i) => <div key={i} onClick={() => sc(i)} style={{ width: i === dot ? 24 : 8, height: 8, borderRadius: 4, background: i === dot ? "#FFC300" : "#e5e7eb", cursor: "pointer", transition: "all 0.25s" }} />)}
        </div>
      )}
    </section>
  );
};

// ─── FilterPanel ──────────────────────────────────────────────────────────────

const FilterPanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [dept, setDept] = useState("Enterprise Software");
  const [companySize, setCompanySize] = useState("All size");
  const [licenseType, setLicenseType] = useState("SaaS (Cloud)");
  const [compliance, setCompliance] = useState("All Standards");
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.4)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.22s" }} />
      <div style={{ position: "fixed", top: 0, right: 0, width: "min(320px,88vw)", height: "100%", background: "#fff", zIndex: 50, display: "flex", flexDirection: "column", overflowY: "auto", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)", fontFamily: FONT }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 16px", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", color: "#111827" }}>FILTER</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}><TbX size={22} color="#374151" strokeWidth={2} /></button>
        </div>
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em" }}>DEPARTMENTS</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", background: "#f3f4f6", borderRadius: 10, padding: "2px 8px" }}>11</span>
          </div>
          {DEPARTMENTS.map(d => (
            <div key={d.label} onClick={() => setDept(d.label)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 12px", borderRadius: 10, marginBottom: 2, cursor: "pointer", background: dept === d.label ? "#f3f4f6" : "transparent", transition: "background 0.15s" }}>
              <span style={{ fontSize: 14, color: dept === d.label ? "#111827" : "#6b7280", fontWeight: dept === d.label ? 600 : 400, fontFamily: FONT }}>{d.label}</span>
              {d.count && dept !== d.label && <span style={{ fontSize: 12, color: "#9ca3af", background: "#f3f4f6", borderRadius: 10, padding: "2px 8px", minWidth: 30, textAlign: "center" }}>{d.count}</span>}
            </div>
          ))}
        </div>
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", display: "block", padding: "16px 0 10px" }}>COMPANY TOOLS</span>
          {TOOLS.map(({ Icon, label, badge }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color="#6b7280" strokeWidth={1.8} />
                </div>
                <span style={{ fontSize: 14, color: "#374151", fontFamily: FONT }}>{label}</span>
              </div>
              {badge && <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10, background: badge === "New" ? "#dbeafe" : "#f3f4f6", color: badge === "New" ? "#3b6ef8" : "#6b7280" }}>{badge}</span>}
            </div>
          ))}
        </div>
        <div style={{ padding: "0 20px 32px" }}>
          <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "16px 14px 4px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", display: "block", marginBottom: 14 }}>QUICK FILTERS</span>
            {[{ label: "Company Size", value: companySize, options: COMPANY_SIZES, onChange: setCompanySize }, { label: "License Type", value: licenseType, options: LICENSE_TYPES, onChange: setLicenseType }, { label: "Compliance", value: compliance, options: COMPLIANCE_OPTIONS, onChange: setCompliance }].map(({ label, value, options, onChange }) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 13, color: "#9ca3af", display: "block", marginBottom: 6, fontFamily: FONT }}>{label}</span>
                <DropdownSelect value={value} options={options} onChange={onChange} bg="#f3f4f6" triggerBorder="none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function MarketplaceContent() {
  const [search, setSearch] = useState("");
  const [focused, setFoc] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [region, setRegion] = useState("UAE");
  const [topActive, setTopActive] = useState(0);
  const [category, setCategory] = useState("All Category");
  const [sortBy, setSortBy] = useState("Recently Added");
  const topRef = useRef<HTMLDivElement>(null);

  const slideTop = (i: number) => {
    if (!topRef.current) return;
    topRef.current.scrollTo({ left: i * (topRef.current.clientWidth + GAP), behavior: "smooth" });
    setTopActive(i);
  };

  return (
    <div style={{ background: "#fff", ...F }}>
      <div style={{ padding: "24px 20px 20px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: "#111827", margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.03em", fontFamily: FONT }}>Discover Investment Opportunities</h1>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, margin: 0, fontFamily: FONT }}>Invest in tokenized assets, startups, and real estate—secure and transparent.</p>
      </div>

      <InvestSection items={INVEST_CARDS} onFilterOpen={() => setFilterOpen(true)} search={search} setSearch={setSearch} focused={focused} setFoc={setFoc} />

      {/* Featured Startup */}
      <section style={{ padding: "16px 20px 20px", ...F }}>
        <SectionHeader title="Featured Startup" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FEATURED.map(item => (
            <div key={item.id} style={{ border: "1.5px solid #e5e7eb", borderRadius: 16, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <Initials text={item.initials} /><VerifiedBadge />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: "0 0 4px", fontFamily: FONT }}>{item.name}</h3>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 12px", lineHeight: 1.5, fontFamily: FONT }}>{item.description}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                <Pill><TbMapPin size={12} />{item.location}</Pill>
                <Pill>{item.industry}</Pill>
              </div>
              <ViewProfileBtn />
            </div>
          ))}
        </div>
      </section>

      {/* Top Startups */}
      <section style={{ padding: "16px 20px 20px", ...F }}>
        <SectionHeader title="Top Startups" />
        <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 8px", fontFamily: FONT, fontWeight: 500 }}>Select Region</p>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", marginBottom: 14, paddingBottom: 2 }}>
          {REGIONS.map(r => (
            <button key={r} onClick={() => setRegion(r)} style={{ padding: "8px 18px", borderRadius: 50, fontSize: 14, fontWeight: 500, background: region === r ? "#3b6ef8" : "#f3f4f6", color: region === r ? "#fff" : "#6b7280", border: "none", cursor: "pointer", flexShrink: 0, fontFamily: FONT, transition: "all 0.18s" }}>{r}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <DropdownSelect value={category} options={CATEGORIES} onChange={setCategory} />
          <DropdownSelect value={sortBy} options={SORT_OPTIONS} onChange={setSortBy} />
        </div>
        <div ref={topRef} onScroll={() => { if (!topRef.current) return; setTopActive(Math.round(topRef.current.scrollLeft / topRef.current.clientWidth)); }} style={{ display: "flex", gap: GAP, overflowX: "auto", scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
          {TOP_STARTUPS.map(item => (
            <div key={item.id} style={{ width: "100%", flexShrink: 0, border: "1.5px solid #e5e7eb", borderRadius: 16, padding: 16, scrollSnapAlign: "start", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <Initials text={item.initials} />
                <div style={{ display: "flex", gap: 6 }}>
                  {item.verified && <VerifiedBadge />}{item.trending && <TrendingBadge />}
                </div>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: "0 0 4px", fontFamily: FONT }}>{item.name}</h3>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 12px", lineHeight: 1.5, fontFamily: FONT }}>{item.description}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {[item.location, item.industry, item.funding].map(t => (
                  <span key={t} style={{ fontSize: 12, color: "#6b7280", background: "#f3f4f6", borderRadius: 20, padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: 3, fontFamily: FONT }}>
                    {t === item.location && <TbMapPin size={11} />}{t}
                  </span>
                ))}
              </div>
              <ViewProfileBtn />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
          {TOP_STARTUPS.map((_, i) => <div key={i} onClick={() => slideTop(i)} style={{ width: i === topActive ? 24 : 8, height: 8, borderRadius: 4, background: i === topActive ? "#FFC300" : "#e5e7eb", cursor: "pointer", transition: "all 0.25s" }} />)}
        </div>
      </section>

      {/* Top IT Vendors */}
      <section style={{ padding: "16px 0 32px", ...F }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: "0 0 14px", padding: `0 ${SIDE}px`, letterSpacing: "-0.02em" }}>Top IT Vendors</h2>
        <div style={{ display: "flex", gap: GAP, overflowX: "auto", padding: `0 ${SIDE}px`, scrollbarWidth: "none" }}>
          {IT_VENDORS.map(v => (
            <div key={v.id} style={{ width: 200, flexShrink: 0, border: "1.5px solid #e5e7eb", borderRadius: 16, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
                <Initials text={v.initials} size={52} bg="#3b6ef8" />
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: "0 0 2px", fontFamily: FONT }}>{v.name}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}><TbMapPin size={11} color="#9ca3af" /><span style={{ fontSize: 12, color: "#9ca3af", fontFamily: FONT }}>{v.location}</span></div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                <TbStarFilled size={14} color="#FFC300" />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: FONT }}>{v.rating} rating</span>
              </div>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 12px", fontFamily: FONT }}>{v.clients} clients</p>
              <ViewProfileBtn border="1px solid #e5e7eb" color="#374151" />
            </div>
          ))}
        </div>
      </section>

      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}