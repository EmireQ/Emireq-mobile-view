"use client";

import { useState, useRef, useEffect } from "react";
import { TbMapPin, TbEye, TbArrowsUpDown, TbChevronDown, TbInfoCircle,
         TbBuildingSkyscraper, TbCube, TbLeaf, TbArrowUpRight, TbLayoutGrid,
         TbCreditCard, TbBuildingBank, TbCurrencyBitcoin,
         TbUpload, TbSearch, TbClock, TbChartBar, TbArrowRight } from "react-icons/tb";

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const NAVY = "#152B5A";
const F: React.CSSProperties = { fontFamily: FONT };
const inputS: React.CSSProperties = { width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "13px 16px", fontSize: 15, fontWeight: 500, color: "#0a0e1a", background: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

// ─── Logos (branded, no icon equivalent) ─────────────────────────────────────

const XenaraLogo = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <path d="M0.550435 35.007C1.69077 32.3454 12.8431 25.6113 12.7294 22.0972C12.6158 18.5831 3.05721 13.2247 1.0375 9.55281C-0.302322 7.117 -0.180428 4.55938 2.13371 2.24537C4.44784 -0.0686432 6.69278 0.0187601 8.7103 1.02748C10.7278 2.03619 19.55 12.8412 21.6203 12.8412C23.6905 12.8412 29.6662 2.87223 35.0171 0.905719C40.368 -1.06079 41.3423 0.644281 42.3167 1.6186C43.291 2.59292 45.1782 5.27231 42.8117 8.82211C39.6451 13.572 37.9401 15.0015 35.3826 16.6167C32.8252 18.2318 29.9913 18.2477 27.3444 17.4692C24.6975 16.6907 24.2917 15.0156 21.6203 13.1887C18.9489 11.3618 15.4009 12.458 13.5821 14.5284C11.7632 16.5988 12.4858 20.2704 13.5821 22.0972C14.6783 23.9241 18.9407 30.379 17.2358 33.9109C15.5308 37.4428 10.4073 42.4841 8.22328 43.2888C6.03929 44.0934 4.0456 43.3209 2.25555 41.7055C0.0717343 39.7348 -0.589904 37.6686 0.550435 35.007Z" fill="url(#xg)"/>
    <circle cx="32.4514" cy="32.7969" r="10.8394" fill="#3CEE90"/>
    <defs><linearGradient id="xg" x1="21.68" y1="0.52" x2="13.8" y2="36.19" gradientUnits="userSpaceOnUse"><stop stopColor="#4EBCF1"/><stop offset="1" stopColor="#3CEE90"/></linearGradient></defs>
  </svg>
);
const AurivoxLogo = () => (
  <svg width="28" height="38" viewBox="0 0 20 31" fill="none">
    <path d="M1.98764 19.5557L9.93801 29.3333L13.9132 24.4445L17.8884 19.5557" stroke="#FF8C00" strokeWidth="1.89442" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.876 19.5557H0L1.9873 15.6445H17.8887L16.5635 13.0371H3.3125L9.93848 0L19.876 19.5557Z" fill="url(#ag)"/>
    <defs><linearGradient id="ag" x1="0" y1="9.78" x2="19.88" y2="9.78" gradientUnits="userSpaceOnUse"><stop offset="0.5" stopColor="#FFB800"/><stop offset="0.5" stopColor="#845418"/></linearGradient></defs>
  </svg>
);
const EminarLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="url(#eg)"/>
    <path d="M10 12h16M10 18h10M10 24h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <defs><linearGradient id="eg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stopColor="#7C3AED"/><stop offset="1" stopColor="#4F46E5"/></linearGradient></defs>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const CW = 360, GAP = 14, STEP = CW + GAP;

const TOKENS = [
  { id: "aurivox", name: "Aurivox", ticker: "$AVX", badge: "AVXERC", supply: "500,000,000",   primaryUse: "DeFi governance & staking",  logo: <AurivoxLogo/>, logoBg: "linear-gradient(135deg,#fff8e6,#fff0cc)" },
  { id: "xenara",  name: "Xenara",  ticker: "$XNR", badge: "XNRERC", supply: "200,000,000",   primaryUse: "NFT minting & purchases",     logo: <XenaraLogo/>,  logoBg: "linear-gradient(135deg,#e0f3ff,#d0eaff)" },
  { id: "eminar",  name: "Eminar",  ticker: "$EMN", badge: "EMNERC", supply: "1,000,000,000", primaryUse: "Platform rewards & fees",     logo: <EminarLogo/>,  logoBg: "linear-gradient(135deg,#f0eaff,#e5d9ff)" },
];

const ASSETS = [
  { id: 1, name: "Real Estate – Dubai Marina", category: "Real Estate",      location: "Dubai, UAE",        status: "Live"    as const, iconBg: "#e8f8f0", iconColor: "#22c55e", iconType: "building" as const },
  { id: 2, name: "Startup – FinTech (KSA)",    category: "Technology",       location: "Riyadh, KSA",       status: "Raising" as const, iconBg: "#ede9fe", iconColor: "#7c3aed", iconType: "tech"     as const },
  { id: 3, name: "Sukuk Green Project",         category: "Green Investment", location: "Jakarta, Indonesia", status: "Raising" as const, iconBg: "#e8f5e9", iconColor: "#16a34a", iconType: "leaf"     as const },
];

const ICON_MAP = { building: TbBuildingSkyscraper, tech: TbCube, leaf: TbLeaf };

const STEPS = [
  { label: "Submit Asset",  bg: "#eff3ff", Icon: TbUpload,   iconColor: "#155DFC" },
  { label: "Due Diligence", bg: "#f5f3ff", Icon: TbSearch,   iconColor: "#9810FA" },
  { label: "Tokenize",      bg: "#ecfdf5", Icon: TbClock,    iconColor: "#00A63E" },
  { label: "Go Live",       bg: "#fffbeb", Icon: TbChartBar, iconColor: "#F54900" },
];

const BUY_TOKENS  = ["Emirq (EMR)", "Xenara (XNR)", "Eminar (EMN)", "USDT", "Bitcoin (BTC)"];
const SELL_TOKENS = ["Eminar (EMR)", "Xenara (XNR)", "USDT", "Bitcoin (BTC)"];
const RECEIVES    = ["USD (Bank Transfer)", "Crypto (USDT)", "Crypto (BTC)", "EUR (SEPA)"];
const METHODS     = [{ key: "Card", Icon: TbCreditCard }, { key: "Bank", Icon: TbBuildingBank }, { key: "Crypto", Icon: TbCurrencyBitcoin }];

const BS_PEEK = 32, BS_GAP = 12, BS_SIDE = 20;

// ─── Shared: SelectDropdown ───────────────────────────────────────────────────

function SelectDropdown({ label, value, open, onToggle, options, onSelect }: { label: string; value: string; open: boolean; onToggle: () => void; options: string[]; onSelect: (v: string) => void }) {
  return (
    <div style={{ marginBottom: 16, position: "relative" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#4361ee", marginBottom: 8 }}>{label}</div>
      <div onClick={onToggle} style={{ border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", userSelect: "none" }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: "#0a0e1a" }}>{value}</span>
        <TbChevronDown size={18} color="#9ca3af" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: 4, background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, zIndex: 30, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}>
          {options.map(o => (
            <div key={o} onClick={() => onSelect(o)} style={{ padding: "12px 16px", cursor: "pointer", fontSize: 14, color: o === value ? "#2563eb" : "#0a0e1a", fontWeight: o === value ? 600 : 400, background: o === value ? "#eff6ff" : "#fff" }}
              onMouseEnter={e => { if (o !== value) (e.currentTarget as HTMLDivElement).style.background = "#f9fafb"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = o === value ? "#eff6ff" : "#fff"; }}>
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Shared: InfoBanner ───────────────────────────────────────────────────────

function InfoBanner({ bg, border, iconColor, children }: { bg: string; border: string; iconColor: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 }}>
      <TbInfoCircle size={17} color={iconColor} style={{ flexShrink: 0, marginTop: 1 }} />
      <p style={{ fontSize: 13, margin: 0, lineHeight: 1.5 }}>{children}</p>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section style={{ padding: "24px 20px 28px", background: "#fff", ...F, userSelect: "none" }}>
      <h1 style={{ fontSize: "clamp(28px,8vw,36px)", fontWeight: 520, lineHeight: 1.15, letterSpacing: "-0.03em", color: "#0a0e1a", margin: "0 0 12px" }}>Shariah-compliant token markets</h1>
      <p style={{ fontSize: 15, color: "#43536D", lineHeight: 1.6, margin: 0, maxWidth: 340 }}>Emireq connects real assets to ethical digital finance with transparent, asset-backed tokens.</p>
    </section>
  );
}

// ─── Token Card + Section ─────────────────────────────────────────────────────

function TokenCard({ token, active }: { token: typeof TOKENS[0]; active: boolean }) {
  const [buyHov, setBuyHov] = useState(false);
  const [detHov, setDetHov] = useState(false);
  return (
    <div style={{ width: CW, background: "#fff", border: "1px solid #e8eaef", borderRadius: 24, padding: 20, flexShrink: 0, transition: "transform 0.3s", transform: active ? "scale(1.02)" : "scale(0.97)", userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: token.logoBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>{token.logo}</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#0a0e1a", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{token.name}</div>
            <div style={{ display: "inline-block", background: "#eff3ff", color: "#4361ee", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999, marginTop: 5 }}>{token.ticker}</div>
          </div>
        </div>
        <div style={{ background: "#f3f4f6", color: "#6b7280", fontSize: 11, fontWeight: 600, padding: "6px 12px", borderRadius: 10, whiteSpace: "nowrap" }}>{token.badge}</div>
      </div>
      <div style={{ background: "#f7f9fc", borderRadius: 14, padding: "14px 16px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <TbInfoCircle size={14} color="#43536D" strokeWidth={1.17} />
          <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>Total {token.ticker.replace("$", "")} Supply</span>
        </div>
        <div style={{ fontSize: 30, fontWeight: 600, color: "#0a0e1a", letterSpacing: "-0.04em", lineHeight: 1 }}>{token.supply}</div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500, marginBottom: 4 }}>Primary Use</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#0a0e1a" }}>{token.primaryUse}</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onMouseEnter={() => setBuyHov(true)} onMouseLeave={() => setBuyHov(false)}
          style={{ flex: 1, padding: "14px 0", borderRadius: 14, border: "1.5px solid #e5e7eb", background: buyHov ? "#f9fafb" : "#fff", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.18s" }}>
          Buy / Mint
        </button>
        <button onMouseEnter={() => setDetHov(true)} onMouseLeave={() => setDetHov(false)}
          style={{ flex: 1.6, padding: "14px 0", borderRadius: 14, border: "none", background: detHov ? "#1a1a1a" : "#0a0e1a", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.18s" }}>
          View Details <TbArrowUpRight size={14} color="white" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

function EmireqTokenSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  useEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => { if (ref.current) ref.current.scrollLeft = STEP; })); }, []);
  const onScroll = () => { if (!ref.current) return; setActive(Math.min(Math.max(Math.round(ref.current.scrollLeft / STEP), 0), TOKENS.length - 1)); };
  const scrollTo = (i: number) => { ref.current?.scrollTo({ left: STEP * i, behavior: "smooth" }); setActive(i); };
  return (
    <>
      <style>{`.et::-webkit-scrollbar{display:none}`}</style>
      <section style={{ padding: "0 0 28px", ...F, background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, padding: "0 20px" }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: "#0a0e1a", letterSpacing: "-0.02em" }}>Emireq Token</span>
          <span style={{ background: "#D4F1FC", color: "#1c79ff", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 999 }}>Token Ecosystem</span>
        </div>
        <div ref={ref} className="et" onScroll={onScroll} onWheel={e => { if (e.shiftKey) { e.preventDefault(); if (ref.current) ref.current.scrollLeft += e.deltaY; } }}
          style={{ display: "flex", alignItems: "center", gap: GAP, overflowX: "auto", scrollSnapType: "x mandatory", padding: "6px 20px 10px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", boxSizing: "border-box" }}>
          {TOKENS.map((t, i) => (
            <div key={t.id} style={{ scrollSnapAlign: "center", flexShrink: 0, cursor: "pointer" }} onClick={() => scrollTo(i)}>
              <TokenCard token={t} active={active === i} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── Token Assets ─────────────────────────────────────────────────────────────

function AssetCard({ asset }: { asset: typeof ASSETS[0] }) {
  const [hov, setHov] = useState(false);
  const Icon = ICON_MAP[asset.iconType];
  const liveStyle = asset.status === "Live" ? { background: "#e8faf0", color: "#16a34a", border: "1px solid #bbf7d0" } : { background: "#fff4e6", color: "#d97706", border: "1px solid #fed7aa" };
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#fff", border: "1px solid #e8eaef", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "box-shadow 0.18s,transform 0.18s", boxShadow: hov ? "0 6px 20px rgba(0,0,0,0.08)" : "0 1px 6px rgba(0,0,0,0.04)", transform: hov ? "translateY(-1px)" : "none" }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: asset.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={22} color={asset.iconColor} strokeWidth={1.5} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0e1a", letterSpacing: "-0.01em", marginBottom: 4 }}>{asset.name}</div>
        <div style={{ display: "inline-block", background: "#f3f4f6", color: "#6b7280", fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 6, marginBottom: 6 }}>{asset.category}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <TbMapPin size={11} color="#9ca3af" strokeWidth={2} />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{asset.location}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 8, ...liveStyle }}>{asset.status}</span>
        <div style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TbEye size={15} color="#9ca3af" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

function TokenAssetsSection() {
  return (
    <section style={{ padding: "0 20px 28px", ...F, userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: "#0a0e1a", letterSpacing: "-0.02em" }}>Token Assets</span>
          <span style={{ background: "#e0f0ff", color: "#1c79ff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 999 }}>Live Opportunity</span>
        </div>
        <button style={{ fontSize: 15, fontWeight: 500, color: "#717182", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = "#070707")} onMouseLeave={e => (e.currentTarget.style.color = "#717182")}>See all</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ASSETS.map(a => <AssetCard key={a.id} asset={a} />)}
      </div>
    </section>
  );
}

// ─── Buy Card ─────────────────────────────────────────────────────────────────

function BuyTokensCard() {
  const [token, setToken] = useState("Emirq (EMR)");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [tOpen, setTOpen] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: "#fff", border: "1px solid #e8eaef", borderRadius: 20, padding: "22px 20px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "#22c55e", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TbLayoutGrid size={26} color="white" strokeWidth={1.5} />
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#0a0e1a" }}>Buy Tokens</div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 3, lineHeight: 1.5 }}>Select an Emirq token and purchase using supported payment methods.</div>
        </div>
      </div>
      <SelectDropdown label="Select Token" value={token} open={tOpen} onToggle={() => setTOpen(o => !o)} options={BUY_TOKENS} onSelect={v => { setToken(v); setTOpen(false); }} />
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#4361ee", marginBottom: 8 }}>Amount to Buy</div>
        <input type="number" value={amount} placeholder="0.00" onChange={e => setAmount(e.target.value)} style={inputS}
          onFocus={e => (e.currentTarget.style.borderColor = "#2563eb")} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#4361ee", marginBottom: 8 }}>Payment Method</div>
        <div style={{ display: "flex", gap: 10 }}>
          {METHODS.map(({ key, Icon }) => (
            <button key={key} onClick={() => setMethod(key)} style={{ flex: 1, padding: "11px 6px", borderRadius: 14, border: method === key ? "2px solid #2563eb" : "1.5px solid #e5e7eb", background: method === key ? "#eff6ff" : "#fff", color: method === key ? "#2563eb" : "#6b7280", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "all 0.18s" }}>
              <Icon size={15} strokeWidth={1.8} />{key}
            </button>
          ))}
        </div>
      </div>
      <InfoBanner bg="#eff6ff" border="#bfdbfe" iconColor="#2563eb">
        <strong style={{ color: "#1d4ed8" }}>Instant settlement:</strong>{" "}
        <span style={{ color: "#1e40af" }}>Tokens will be transferred to your wallet immediately after payment confirmation.</span>
      </InfoBanner>
      <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none", background: hov ? "#1a2c5a" : NAVY, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "background 0.18s" }}>
        Buy Now
      </button>
    </div>
  );
}

// ─── Sell Card ────────────────────────────────────────────────────────────────

function SellTokensCard() {
  const [token, setToken]     = useState("Eminar (EMR)");
  const [amount, setAmount]   = useState("0.00");
  const [receive, setReceive] = useState("USD (Bank Transfer)");
  const [hov, setHov]         = useState(false);
  const [tOpen, setTOpen]     = useState(false);
  const [rOpen, setROpen]     = useState(false);
  return (
    <div style={{ background: "#fff", border: "1px solid #e8eaef", borderRadius: 20, padding: "22px 20px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 22 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "#2563eb", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TbArrowsUpDown size={22} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#0a0e1a" }}>Sell Tokens</div>
          <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 3, lineHeight: 1.5 }}>Convert your tokens back to fiat or crypto instantly.</div>
        </div>
      </div>
      <SelectDropdown label="Select Token" value={token} open={tOpen} onToggle={() => { setTOpen(o => !o); setROpen(false); }} options={SELL_TOKENS} onSelect={v => { setToken(v); setTOpen(false); }} />
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#4361ee", marginBottom: 8 }}>Amount to Sell</div>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={inputS}
          onFocus={e => (e.currentTarget.style.borderColor = "#2563eb")} onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")} />
      </div>
      <SelectDropdown label="Receive In" value={receive} open={rOpen} onToggle={() => { setROpen(o => !o); setTOpen(false); }} options={RECEIVES} onSelect={v => { setReceive(v); setROpen(false); }} />
      <div style={{ background: "#f7f9fc", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
        {([["Estimated Value", "#0a0e1a", "$0.00", 16, 700], ["Network Fee", "#6b7280", "~$2.50", 13, 500]] as const).map(([lbl, lc, val, fs, fw]) => (
          <div key={lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: lbl === "Estimated Value" ? 6 : 0 }}>
            <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>{lbl}</span>
            <span style={{ fontSize: fs, fontWeight: fw, color: lc }}>{val}</span>
          </div>
        ))}
      </div>
      <InfoBanner bg="#fff7ed" border="#fed7aa" iconColor="#f97316">
        <strong style={{ color: "#c2410c" }}>Processing Time:</strong>{" "}
        <span style={{ color: "#92400e" }}>Bank transfers take 2–3 business days. Crypto transfers are instant.</span>
      </InfoBanner>
      <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none", background: hov ? "#1a2c5a" : NAVY, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "background 0.18s" }}>
        Sell Now
      </button>
    </div>
  );
}

// ─── Buy & Sell Section ───────────────────────────────────────────────────────

function BuySellSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(1);
  const cw = () => (ref.current ? ref.current.clientWidth - 2 * BS_SIDE - BS_PEEK - BS_GAP : 0);
  const scrollTo = (i: number) => { ref.current?.scrollTo({ left: i * (cw() + BS_GAP), behavior: "smooth" }); setIdx(i); };
  const onScroll = () => { if (!ref.current) return; setIdx(Math.min(Math.max(Math.round(ref.current.scrollLeft / (cw() + BS_GAP)), 0), 1)); };
  useEffect(() => { requestAnimationFrame(() => requestAnimationFrame(() => { if (ref.current) ref.current.scrollLeft = cw() + BS_GAP; })); }, []);
  return (
    <>
      <style>{`.bs::-webkit-scrollbar{display:none}.bs{-ms-overflow-style:none;scrollbar-width:none}`}</style>
      <section style={{ padding: "0 0 28px", ...F, background: "#fff", boxSizing: "border-box" }}>
        <div style={{ padding: "0 20px", marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0a0e1a", letterSpacing: "-0.02em", margin: 0 }}>Buy &amp; Sell Tokens Instantly</h2>
        </div>
        <div ref={ref} className="bs" onScroll={onScroll}
          style={{ display: "flex", gap: BS_GAP, overflowX: "auto", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingLeft: BS_SIDE, paddingRight: BS_SIDE, scrollPaddingLeft: BS_SIDE, paddingTop: 4, paddingBottom: 8, boxSizing: "border-box" }}>
          {[<BuyTokensCard />, <SellTokensCard />].map((card, i) => (
            <div key={i} style={{ scrollSnapAlign: "start", flexShrink: 0, width: `calc(100% - ${2 * BS_SIDE + BS_PEEK + BS_GAP}px)`, minWidth: `calc(100% - ${2 * BS_SIDE + BS_PEEK + BS_GAP}px)` }}>{card}</div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
          {[0, 1].map(i => <button key={i} onClick={() => scrollTo(i)} style={{ width: idx === i ? 24 : 8, height: 8, borderRadius: 4, background: idx === i ? "#0a0e1a" : "#d1d5db", border: "none", padding: 0, cursor: "pointer", transition: "all 0.25s" }} />)}
        </div>
      </section>
    </>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  const [gsHov, setGs] = useState(false);
  const [dmHov, setDm] = useState(false);
  return (
    <section style={{ padding: "0 20px 28px", ...F, userSelect: "none" }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: "#0a0e1a", letterSpacing: "-0.02em", marginBottom: 6 }}>How Tokenization Works</h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, lineHeight: 1.5 }}>Four simple steps to transform your real-world assets into digital tokens</p>
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 32 }}>
        {STEPS.map((s, i) => (
          <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, margin: "0 auto", cursor: "pointer" }}>
                <s.Icon size={16} color={s.iconColor} strokeWidth={1.33} />
              </div>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1.5, background: "#e5e7eb", alignSelf: "center", marginLeft: -10, marginRight: -10 }} />}
            </div>
            <span style={{ fontSize: 11, fontWeight: 500, color: "#6b7280", marginTop: 8, textAlign: "center" }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={{ background: NAVY, borderRadius: 20, padding: "32px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(22px,6vw,28px)", fontWeight: 600, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 14px", lineHeight: 1.2 }}>Ready to Tokenize<br />Your Assets?</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 0 28px" }}>Join hundreds of asset owners leveraging blockchain for transparent, Shariah-compliant investments</p>
        <button onMouseEnter={() => setGs(true)} onMouseLeave={() => setGs(false)}
          style={{ width: "100%", padding: "16px 0", borderRadius: 14, border: "none", background: gsHov ? "#f0b800" : "#FFC300", color: "#1a1a1a", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, transition: "background 0.18s" }}>
          Get Started <TbArrowRight size={20} color="#121212" strokeWidth={1.67} />
        </button>
        <button onMouseEnter={() => setDm(true)} onMouseLeave={() => setDm(false)}
          style={{ width: "100%", padding: "16px 0", borderRadius: 14, border: "1px solid rgba(255,255,255,0.2)", background: dmHov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "background 0.18s" }}>
          Schedule a Demo
        </button>
      </div>
    </section>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function TokenizeContent() {
  return (
    <main style={{ display: "flex", flexDirection: "column", background: "#fff", fontFamily: FONT }}>
      <HeroSection />
      <EmireqTokenSection />
      <TokenAssetsSection />
      <BuySellSection />
      <HowItWorksSection />
      <div style={{ height: 32 }} />
    </main>
  );
}