"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import event1    from "../public/assets/event1.png";
import music     from "../public/assets/music.png";
import food      from "../public/assets/food.png";
import tech      from "../public/assets/tech.png";
import burj      from "../public/assets/burj.png";
import paris     from "../public/assets/paris.png";
import bengalore from "../public/assets/bengalore.png";
import burj1     from "../public/assets/burj1.png";
import burj2     from "../public/assets/burj2.png";
import eve1      from "../public/assets/eve1.png";
import eve2      from "../public/assets/eve2.png";
import eve3      from "../public/assets/eve3.png";
import { TbMapPin, TbChevronDown, TbSearch, TbCalendar,
         TbAdjustmentsHorizontal, TbArrowUpRight, TbArrowRight,
         TbPhone, TbTicket } from "react-icons/tb";
import { RiMapPin2Line }     from "react-icons/ri";
import { FaStar }            from "react-icons/fa";

const FONT = "'URWGeometric', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// ─── Data ─────────────────────────────────────────────────────────────────────

const LOCATIONS         = ["New York, USA", "Los Angeles, USA", "London, UK", "Dubai, UAE", "Singapore"];
const CATEGORIES_FILTER = ["All Categories", "Music", "Tech", "Food", "Jewelry", "Startup", "Governance"];
const EVENT_CATEGORIES  = ["ALL", "MUSIC", "TECH", "FOOD", "JEWELRY", "STARTUP", "GOVERNANCE"];

const TOP_LISTING_EVENTS = [
  { id: 1, image: music,    tag: "Music", title: "Music & Live Shows",  description: "Concerts, festivals, DJ nights, and cultural performances." },
  { id: 2, image: food,     tag: "Food",  title: "Food Event",           description: "Culinary experiences and tastings." },
  { id: 3, image: tech,     tag: "Tech",  title: "Tech Summit",          description: "Innovation and startup showcase." },
];
const FEATURED_VISITED = [
  { id: 1, image: burj,      ticketRange: "Ticket: $25 – $35", title: "Explore on-going and Upcoming Events", venue: "Luxury hotel in the heart of Bloomsbury" },
  { id: 2, image: paris,     ticketRange: "Ticket: $50 – $80", title: "Exclusive Tech Showcase 2025",          venue: "Convention Center, Downtown" },
  { id: 3, image: bengalore, ticketRange: "Ticket: $15 – $30", title: "Global Music Festival",                  venue: "Open Air Venue, Central Park" },
];
const TRENDING_EVENTS = [
  { id: 1, image: burj1, tag: "Music", city: "London", description: "Concerts, festivals, DJ nights, and cultural performances." },
  { id: 2, image: burj2, tag: "Music", city: "London", description: "Concerts, festivals, DJ nights, and cultural performances." },
  { id: 3, image: burj,  tag: "Race",  city: "UAE",    description: "Formula racing and motorsport events." },
];
const FEATURED_EVENTS = [
  { id: 1, image: eve1, title: "Weekend Acoustic Night",  rating: 4.5, category: "Music Event Card" },
  { id: 2, image: eve2, title: "Global Startup Summit",   rating: 4.8, category: "Tech Event Card"  },
  { id: 3, image: eve3, title: "Food & Culture Fest",     rating: 4.3, category: "Food Event Card"  },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function DropItem({ label, active, onSelect }: { label: string; active: boolean; onSelect: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onSelect}
      style={{ padding: "11px 18px", fontSize: 14, fontFamily: FONT, cursor: "pointer", transition: "background 0.12s", fontWeight: active ? 600 : 400, color: active || hov ? "#2563eb" : "#111827", background: active ? "#eff6ff" : hov ? "#f8faff" : "#fff" }}>
      {label}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1,2,3,4,5].map(i => <FaStar key={i} size={14} color="#FFC300" style={{ opacity: i <= Math.floor(rating) ? 1 : 0.25 }} />)}
    </div>
  );
}

const dropdownStyle: React.CSSProperties = {
  position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
  background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", zIndex: 100, overflow: "hidden",
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

function EventsHeroSection() {
  const [search, setSearch]   = useState("");
  const [eventName, setEvent] = useState("");
  const [loc, setLoc]         = useState("Select location");
  const [date, setDate]       = useState("");
  const [cat, setCat]         = useState("All Categories");
  const [heroLoc, setHeroLoc] = useState("New York, USA");
  const [open, setOpen]       = useState<string | null>(null);
  const [btnHov, setBtnHov]   = useState(false);

  const toggle = (key: string) => setOpen(o => o === key ? null : key);
  const labelS: React.CSSProperties = { fontSize: 12, color: "#9ca3af", margin: "0 0 3px", fontWeight: 400, fontFamily: FONT };
  const valS:   React.CSSProperties = { fontSize: 16, color: "#111827", margin: 0, fontWeight: 500, fontFamily: FONT };
  const rowS = (last?: boolean): React.CSSProperties => ({ display: "flex", alignItems: "center", gap: 16, padding: last ? "16px 0 0" : "16px 0", borderBottom: last ? "none" : "1px solid #f0f0f0", cursor: "pointer" });
  const iconW: React.CSSProperties = { flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 22 };

  return (
    <section style={{ position: "relative", fontFamily: FONT, overflow: "hidden", paddingBottom: 32 }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image src={event1} alt="bg" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0.48) 0%,rgba(0,0,0,0.62) 40%,rgba(0,0,0,0.82) 75%,rgba(0,0,0,0.96) 100%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "36px 20px 0" }}>
        {/* Location pill */}
        <div style={{ marginBottom: 18, position: "relative" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: "0 0 6px", letterSpacing: "0.02em", fontFamily: FONT }}>Location</p>
          <button onClick={() => toggle("heroLoc")} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: FONT }}>
            <TbMapPin size={18} color="#FFC300" />
            <span style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>{heroLoc}</span>
            <TbChevronDown size={18} color="#fff" />
          </button>
          {open === "heroLoc" && (
            <div style={{ ...dropdownStyle, top: "calc(100% + 8px)", width: 200 }}>
              {LOCATIONS.map(l => <DropItem key={l} label={l} active={heroLoc === l} onSelect={() => { setHeroLoc(l); setOpen(null); }} />)}
            </div>
          )}
        </div>

        <h1 style={{ fontSize: "clamp(30px,8.5vw,38px)", fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 14px", fontFamily: FONT }}>
          The Future of <span style={{ color: "#FFC300" }}>Events</span>
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.6, margin: "0 0 26px", fontFamily: FONT }}>
          Where innovation meets experience—join 50,000+ shaping tomorrow.
        </p>

        {/* Search pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 50, padding: "10px 18px", marginBottom: 16, boxShadow: "0 2px 14px rgba(0,0,0,0.12)" }}>
          <div style={{ width: 34, height: 34, borderRadius: 50, background: "rgba(37,99,235,0.09)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <TbSearch size={15} color="#2563eb" strokeWidth={2.2} />
          </div>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search startups, tokens, or investors..."
            style={{ flex: 1, fontSize: 13, color: "#111827", background: "transparent", border: "none", outline: "none", fontFamily: FONT }} />
        </div>

        {/* Advanced card */}
        <div style={{ background: "#fff", borderRadius: 22, padding: "8px 20px 20px", boxShadow: "0 10px 40px rgba(0,0,0,0.22)" }}>
          {/* Row: event name */}
          <div style={rowS()} onClick={() => document.getElementById("hero-ev")?.focus()}>
            <span style={iconW}><TbSearch size={20} color="#9ca3af" strokeWidth={1.8} /></span>
            <div style={{ flex: 1 }}>
              <p style={labelS}>I am looking for</p>
              <input id="hero-ev" type="text" value={eventName} onChange={e => setEvent(e.target.value)} placeholder="Event name"
                style={{ ...valS, background: "transparent", border: "none", outline: "none", width: "100%", padding: 0, cursor: "text" }} />
            </div>
          </div>

          {/* Row: location */}
          <div style={{ position: "relative" }}>
            <div style={rowS()} onClick={() => { toggle("filterLoc"); }}>
              <span style={iconW}><TbMapPin size={20} color="#9ca3af" /></span>
              <div style={{ flex: 1 }}>
                <p style={labelS}>Location</p>
                <p style={{ ...valS, color: loc === "Select location" ? "#9ca3af" : "#111827" }}>{loc}</p>
              </div>
              <TbChevronDown size={16} color="#9ca3af" />
            </div>
            {open === "filterLoc" && (
              <div style={dropdownStyle}>
                {["Select location", ...LOCATIONS].map(l => <DropItem key={l} label={l} active={loc === l} onSelect={() => { setLoc(l); setOpen(null); }} />)}
              </div>
            )}
          </div>

          {/* Row: date */}
          <div style={{ position: "relative" }}>
            <div style={rowS()} onClick={() => toggle("date")}>
              <span style={iconW}><TbCalendar size={20} color="#9ca3af" /></span>
              <div style={{ flex: 1 }}>
                <p style={labelS}>Date</p>
                <p style={{ ...valS, color: date ? "#111827" : "#9ca3af" }}>{date || "dd-mm-yy"}</p>
              </div>
              <TbChevronDown size={16} color="#9ca3af" />
            </div>
            {open === "date" && (
              <div style={{ ...dropdownStyle, padding: "12px 16px" }}>
                <input type="date" value={date} onChange={e => { setDate(e.target.value); setOpen(null); }} autoFocus
                  style={{ width: "100%", fontSize: 14, color: "#111827", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px", fontFamily: FONT, outline: "none" }} />
              </div>
            )}
          </div>

          {/* Row: category */}
          <div style={{ position: "relative" }}>
            <div style={rowS(true)} onClick={() => toggle("cat")}>
              <span style={iconW}><TbAdjustmentsHorizontal size={20} color="#9ca3af" /></span>
              <div style={{ flex: 1 }}>
                <p style={labelS}>Category</p>
                <p style={valS}>{cat}</p>
              </div>
              <TbChevronDown size={16} color="#9ca3af" />
            </div>
            {open === "cat" && (
              <div style={{ ...dropdownStyle, bottom: "calc(100% + 4px)", top: "auto" }}>
                {CATEGORIES_FILTER.map(c => <DropItem key={c} label={c} active={cat === c} onSelect={() => { setCat(c); setOpen(null); }} />)}
              </div>
            )}
          </div>

          <button onMouseEnter={() => setBtnHov(true)} onMouseLeave={() => setBtnHov(false)}
            style={{ marginTop: 18, width: "100%", padding: "17px 0", borderRadius: 50, background: btnHov ? "#e6ae00" : "#FFC300", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: FONT, transition: "background 0.18s", boxShadow: btnHov ? "0 4px 16px rgba(255,195,0,0.45)" : "none" }}>
            <TbSearch size={19} color="#000" strokeWidth={2.5} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#000", letterSpacing: "0.08em", fontFamily: FONT }}>SEARCH NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────

function EventCategoriesSection() {
  const [active, setActive] = useState("ALL");
  const [hov, setHov]       = useState<string | null>(null);
  return (
    <section style={{ background: "#fff", padding: "28px 20px", fontFamily: FONT }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, color: "#121212", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Categories</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {EVENT_CATEGORIES.map(cat => {
          const on = active === cat, ov = hov === cat && !on;
          return (
            <button key={cat} onClick={() => setActive(cat)} onMouseEnter={() => setHov(cat)} onMouseLeave={() => setHov(null)}
              style={{ padding: "0 28px", height: 34, borderRadius: 999, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", fontFamily: FONT, border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", userSelect: "none", transition: "all 0.16s", background: on ? "#155DFC" : ov ? "#e8e8ec" : "#F9F9F9", color: on ? "#fff" : "#717182", boxShadow: on ? "0 4px 6px rgba(21,93,252,0.04),0 7px 15px rgba(21,93,252,0.10)" : "none", transform: ov ? "translateY(-1px)" : "none" }}>
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ─── Top Listing Events ───────────────────────────────────────────────────────

function TopListingEventsSection() {
  return (
    <section style={{ background: "#fff", padding: "24px 0", fontFamily: FONT, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#111827" }}>Top Listing Events</h2>
        <button style={{ padding: "8px 18px", borderRadius: 16, background: "#F3F4F6", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151", marginRight: 110, fontFamily: FONT }}>EXPLORE</button>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, overflowX: "auto", padding: "0 20px 20px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {TOP_LISTING_EVENTS.map(ev => {
          const large = ev.id === 2;
          return (
            <div key={ev.id} style={{ flexShrink: 0, width: large ? 280 : 240, cursor: "pointer" }}>
              <div style={{ position: "relative", width: "100%", height: large ? 320 : 280, borderRadius: 28, overflow: "hidden", marginBottom: 16 }}>
                <Image src={ev.image} alt={ev.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ padding: "6px 16px", borderRadius: 12, background: "#2563eb", color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: FONT }}>{ev.tag}</span>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E5E7EB" }}>
                  <TbArrowUpRight size={18} color="#374151" strokeWidth={2.5} />
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 4px", fontFamily: FONT }}>{ev.title}</h3>
              <p  style={{ fontSize: 14, color: "#6B7280", margin: 0, lineHeight: 1.4, fontFamily: FONT }}>{ev.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Top Visited Featured ─────────────────────────────────────────────────────

function TopVisitedFeaturedSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <section style={{ background: "#fff", padding: "24px 0 32px", fontFamily: FONT, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#1f2937", letterSpacing: "-0.02em" }}>Top Visited Featured Events</h2>
        <button style={{ padding: "8px 18px", borderRadius: 20, background: "#1e3a8a", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#fff", marginRight: 10, fontFamily: FONT }}>EXPLORE</button>
      </div>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", padding: "0 20px 10px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        {FEATURED_VISITED.map((item, idx) => (
          <div key={item.id} onClick={() => setActiveIdx(idx)}
            style={{ flexShrink: 0, width: 310, background: "#fff", borderRadius: 28, overflow: "hidden", cursor: "pointer", border: "1px solid #f3f4f6", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", transition: "transform 0.2s" }}>
            <div style={{ position: "relative", height: 240, margin: 10, borderRadius: 22, overflow: "hidden" }}>
              <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 10, left: 10, width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <RiMapPin2Line size={22} color="#FFC300" />
              </div>
            </div>
            <div style={{ padding: "0 20px 20px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fffbeb", borderRadius: 10, padding: "6px 14px", marginBottom: 12 }}>
                <TbTicket size={15} color="#FFC300" />
                <span style={{ fontSize: 13, fontWeight: 500, color: "#92400e", fontFamily: FONT }}>{item.ticketRange}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: "0 0 8px", lineHeight: 1.3, fontFamily: FONT }}>{item.title}</h3>
              <p  style={{ fontSize: 14, color: "#6b7280", margin: "0 0 16px", fontFamily: FONT }}>{item.venue}</p>
              <div style={{ display: "flex", gap: 16 }}>
                {[TbMapPin, TbPhone].map((Icon, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon size={14} color="#eab308" />
                    <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: FONT }}>Select location</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
        {FEATURED_VISITED.map((_, i) => (
          <div key={i} style={{ width: i === activeIdx ? 32 : 8, height: 8, borderRadius: 4, background: i === activeIdx ? "#374151" : "#e5e7eb", transition: "all 0.3s" }} />
        ))}
      </div>
    </section>
  );
}

// ─── Trending Category ────────────────────────────────────────────────────────

function TrendingCategorySection() {
  const [activeIdx, setActiveIdx] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const c = ref.current, mid = c.children[1] as HTMLElement;
    if (mid) c.scrollTo({ left: mid.offsetLeft - c.offsetWidth / 2 + mid.offsetWidth / 2, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleScroll = () => {
    if (!ref.current) return;
    const c = ref.current, center = c.scrollLeft + c.offsetWidth / 2;
    let best = 0, min = Infinity;
    (Array.from(c.children) as HTMLElement[]).forEach((el, i) => {
      const d = Math.abs(center - (el.offsetLeft + el.offsetWidth / 2));
      if (d < min) { min = d; best = i; }
    });
    if (best !== activeIdx) setActiveIdx(best);
  };

  const scrollTo = (i: number) => {
    if (!ref.current) return;
    const el = ref.current.children[i] as HTMLElement;
    ref.current.scrollTo({ left: el.offsetLeft - ref.current.offsetWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
    setActiveIdx(i);
  };

  return (
    <section style={{ background: "#fff", padding: "24px 0 32px", fontFamily: FONT, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 20px", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#000", letterSpacing: "-0.02em" }}>Trending Category</h2>
        <button style={{ padding: "8px 18px", borderRadius: 15, background: "#f3f4f6", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151", fontFamily: FONT }}>FEATURED</button>
      </div>
      <div ref={ref} onScroll={handleScroll}
        style={{ display: "flex", gap: 16, overflowX: "auto", padding: "0 20px 10px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", alignItems: "flex-end", scrollSnapType: "x mandatory" }}>
        {TRENDING_EVENTS.map((ev, idx) => {
          const on = idx === activeIdx;
          return (
            <div key={ev.id} onClick={() => scrollTo(idx)} style={{ flexShrink: 0, width: on ? 220 : 260, cursor: "pointer", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)", scrollSnapAlign: "center" }}>
              <div style={{ position: "relative", width: "100%", height: on ? 280 : 320, borderRadius: 32, overflow: "hidden", marginBottom: 14, transition: "height 0.4s" }}>
                <Image src={ev.image} alt={ev.city} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ padding: "6px 16px", borderRadius: 20, background: "#2563eb", color: "#fff", fontSize: 12, fontWeight: 600, fontFamily: FONT }}>{ev.tag}</span>
              </div>
              <div style={{ position: "relative", paddingRight: 44 }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#000", margin: "0 0 4px", fontFamily: FONT }}>{ev.city}</p>
                <p style={{ fontSize: 14, color: "#6b7280", margin: 0, lineHeight: 1.5, opacity: on ? 1 : 0.5, fontFamily: FONT }}>{ev.description}</p>
                <div style={{ position: "absolute", top: 4, right: 0, width: 38, height: 38, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb" }}>
                  <TbArrowUpRight size={18} color="#374151" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {TRENDING_EVENTS.map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)}
            style={{ width: i === activeIdx ? 40 : 10, height: 10, borderRadius: 5, background: i === activeIdx ? "#FFC300" : "#e5e7eb", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
        ))}
      </div>
    </section>
  );
}

// ─── Featured Events ──────────────────────────────────────────────────────────

function FeaturedEventsSection() {
  const [activeIdx, setActiveIdx] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { if (ref.current) ref.current.scrollLeft = 310 - 20; }, []);

  const handleScroll = () => {
    if (!ref.current) return;
    const i = Math.round(ref.current.scrollLeft / 294);
    if (i !== activeIdx && i >= 0 && i < FEATURED_EVENTS.length) setActiveIdx(i);
  };

  const scrollTo = (i: number) => ref.current?.scrollTo({ left: i * 294, behavior: "smooth" });

  return (
    <section style={{ background: "#fff", padding: "32px 0 40px", fontFamily: FONT, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 20px", marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "#000", letterSpacing: "-0.01em" }}>Featured Events</h2>
        <button style={{ padding: "8px 18px", borderRadius: 20, background: "#fff", border: "1px solid #d1d5db", cursor: "pointer", fontSize: 11, fontWeight: 600, color: "#4b5563", letterSpacing: "0.02em", fontFamily: FONT }}>SPEAKER & VISIONERIES</button>
      </div>
      <div ref={ref} onScroll={handleScroll}
        style={{ display: "flex", gap: 18, overflowX: "auto", padding: "0 30px", scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
        {FEATURED_EVENTS.map((ev, idx) => {
          const on = idx === activeIdx;
          return (
            <div key={ev.id} onClick={() => scrollTo(idx)}
              style={{ flexShrink: 0, width: 280, borderRadius: 24, overflow: "hidden", position: "relative", background: "#1a1a1a", height: 450, cursor: "pointer", transition: "transform 0.3s" }}>
              <Image src={ev.image} alt={ev.title} fill style={{ objectFit: "cover", opacity: on ? 0.9 : 0.4, transition: "opacity 0.3s" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#FFC300", zIndex: 10 }} />
              <div style={{ position: "absolute", inset: 0, background: on ? "linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.2) 60%)" : "rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20 }}>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: "#fff", margin: "0 0 12px", lineHeight: 1.1, fontFamily: FONT }}>{ev.title}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ background: "#22c55e", color: "#fff", fontSize: 12, fontWeight: 700, padding: "2px 10px", borderRadius: 12 }}>{ev.rating}</div>
                  <StarRating rating={ev.rating} />
                </div>
                <p style={{ fontSize: 14, color: "#d1d5db", margin: "0 0 20px", opacity: 0.8, fontFamily: FONT }}>{ev.category}</p>
                <div style={{ position: "absolute", bottom: on ? 80 : 20, right: 20, width: 60, height: 60, borderRadius: 20, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", transition: "bottom 0.3s" }}>
                  <RiMapPin2Line size={28} color="#FFC300" />
                </div>
                <button style={{ width: "100%", height: 54, borderRadius: 12, background: "#FFC300", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "all 0.3s", pointerEvents: on ? "auto" : "none" }}>
                  <span style={{ fontSize: 18, fontWeight: 600, color: "#000", fontFamily: FONT }}>Discover Now</span>
                  <TbArrowRight size={22} color="#000" strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {FEATURED_EVENTS.map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)}
            style={{ width: i === activeIdx ? 40 : 10, height: 10, borderRadius: 5, background: i === activeIdx ? "#FFC300" : "#e5e7eb", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
        ))}
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function EventsContent() {
  return (
    <main style={{ display: "flex", flexDirection: "column", background: "#000" }}>
      <EventsHeroSection />
      <EventCategoriesSection />
      <TopListingEventsSection />
      <TopVisitedFeaturedSection />
      <TrendingCategorySection />
      <FeaturedEventsSection />
    </main>
  );
}