"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  TbShieldCheck, TbFileText, TbClockHour4, TbBox,
  TbDownload, TbUpload, TbSearch, TbDots,
  TbCircleCheck, TbX, TbShare, TbEye, TbTrash,
} from "react-icons/tb";
import { FONT, PageShell, cardBase } from "./shared";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = "Verified" | "Pending";
type DocCategory = "Compliance" | "Agreements" | "Tax";

interface Document {
  id: number;
  name: string;
  status: DocStatus;
  type: string;
  category: DocCategory;
  size: string;
  date: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DOCUMENTS: Document[] = [
  { id: 1, name: "KYC Compliance Certificate.pdf", status: "Verified", type: "Agreements", category: "Compliance", size: "2.4 MB", date: "Nov 5, 1015" },
  { id: 2, name: "Investment Agreement – Series A.pdf", status: "Verified", type: "Agreements", category: "Agreements", size: "2.4 MB", date: "Nov 5, 1015" },
  { id: 3, name: "Shareholder Agreement.pdf", status: "Verified", type: "Agreements", category: "Agreements", size: "2.4 MB", date: "Nov 5, 1015" },
  { id: 4, name: "Token Purchase Agreement.pdf", status: "Verified", type: "Agreements", category: "Agreements", size: "2.4 MB", date: "Nov 5, 1015" },
  { id: 5, name: "AML Compliance Report.pdf", status: "Pending", type: "Agreements", category: "Compliance", size: "2.4 MB", date: "Nov 5, 1015" },
  { id: 6, name: "Tax Report Q3 2025.pdf", status: "Verified", type: "Agreements", category: "Tax", size: "2.4 MB", date: "Nov 5, 1015" },
  { id: 7, name: "Annual Tax Statement 2025.pdf", status: "Verified", type: "Agreements", category: "Tax", size: "2.4 MB", date: "Nov 5, 1015" },
  { id: 8, name: "KYC Compliance Certificate.pdf", status: "Verified", type: "Agreements", category: "Compliance", size: "2.4 MB", date: "Nov 5, 1015" },
];

function getStatCards(docs: Document[]) {
  const verified = docs.filter(d => d.status === "Verified").length;
  const pending = docs.filter(d => d.status === "Pending").length;
  const totalSize = docs.reduce((sum, d) => sum + parseFloat(d.size), 0);
  return [
    {
      icon: TbCircleCheck,
      iconBg: "#10B981",
      blobColor: "rgba(16,185,129,0.08)",
      badgeLabel: "Active",
      badgeBg: "#dcfce7",
      badgeColor: "#16a34a",
      label: "Verified",
      value: String(verified),
    },
    {
      icon: TbFileText,
      iconBg: "#3B82F6",
      blobColor: "rgba(59,130,246,0.08)",
      badgeLabel: "All",
      badgeBg: "#dbeafe",
      badgeColor: "#3B82F6",
      label: "Total Documents",
      value: String(docs.length),
    },
    {
      icon: TbClockHour4,
      iconBg: "#F97316",
      blobColor: "rgba(249,115,22,0.08)",
      badgeLabel: "Review",
      badgeBg: "#fef3c7",
      badgeColor: "#d97706",
      label: "Pending",
      value: String(pending),
    },
    {
      icon: TbBox,
      iconBg: "#8B5CF6",
      blobColor: "rgba(139,92,246,0.08)",
      badgeLabel: "Storage",
      badgeBg: "#ede9fe",
      badgeColor: "#7c3aed",
      label: "Total Size",
      value: `${totalSize.toFixed(1)} MB`,
    },
  ];
}

const FILTER_TABS = ["All", "Compliance", "Agreements", "Tax"] as const;

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: DocStatus }) {
  const isVerified = status === "Verified";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        fontWeight: 600,
        color: isVerified ? "#16a34a" : "#d97706",
        background: isVerified ? "#dcfce7" : "#fef3c7",
        borderRadius: 20,
        padding: "3px 10px 3px 6px",
        whiteSpace: "nowrap",
      }}
    >
      {isVerified ? (
        <TbCircleCheck size={14} strokeWidth={2.5} />
      ) : (
        <TbClockHour4 size={14} strokeWidth={2.5} />
      )}
      {status}
    </span>
  );
}

// ─── Document Icon ────────────────────────────────────────────────────────────

function DocIcon({ category }: { category: DocCategory }) {
  const colors: Record<DocCategory, string> = {
    Compliance: "#3B82F6",
    Agreements: "#10B981",
    Tax: "#3B82F6",
  };
  const color = colors[category] || "#3B82F6";
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <TbFileText size={22} color="#fff" strokeWidth={1.8} />
    </div>
  );
}

// ─── Toast Notification ───────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        background: "#111827",
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        fontFamily: FONT,
        padding: "12px 24px",
        borderRadius: 14,
        boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
        whiteSpace: "nowrap",
        animation: "toastIn 0.24s ease-out",
      }}
    >
      {message}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Context Menu ─────────────────────────────────────────────────────────────

function ContextMenu({
  doc,
  anchorRect,
  onView,
  onDownload,
  onShare,
  onDelete,
  onClose,
}: {
  doc: Document;
  anchorRect: { top: number; right: number };
  onView: () => void;
  onDownload: () => void;
  onShare: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const items = [
    { label: "View", Icon: TbEye, action: onView, color: "#374151" },
    { label: "Download", Icon: TbDownload, action: onDownload, color: "#374151" },
    { label: "Share", Icon: TbShare, action: onShare, color: "#374151" },
    { label: "Delete", Icon: TbTrash, action: onDelete, color: "#EF4444" },
  ];
  return (
    <>
      <div
        role="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        style={{ position: "fixed", inset: 0, zIndex: 55, background: "transparent" }}
      />
      <div
        style={{
          position: "fixed",
          top: anchorRect.top,
          right: anchorRect.right,
          zIndex: 56,
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
          border: "1px solid #f1f5f9",
          padding: "6px 0",
          minWidth: 160,
          fontFamily: FONT,
          animation: "fadeScaleIn 0.16s ease-out",
        }}
      >
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => { item.action(); onClose(); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "11px 16px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              color: item.color,
              fontFamily: FONT,
              WebkitTapHighlightColor: "transparent",
              transition: "background 0.12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <item.Icon size={16} strokeWidth={2} />
            {item.label}
          </button>
        ))}
      </div>
      <style>{`
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}

// ─── Document Preview Modal ───────────────────────────────────────────────────

function DocumentPreview({
  doc,
  onClose,
  onShare,
  onDownload,
}: {
  doc: Document;
  onClose: () => void;
  onShare: (doc: Document) => void;
  onDownload: (doc: Document) => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={-1}
        aria-label="Close preview"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      />
      {/* Modal */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          zIndex: 70,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          padding: "24px 20px 28px",
          fontFamily: FONT,
          animation: "slideUp 0.28s ease-out",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>{doc.name}</h3>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0", fontWeight: 400 }}>Document preview and details</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              flexShrink: 0,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <TbX size={22} color="#9ca3af" strokeWidth={2} />
          </button>
        </div>

        {/* Preview area */}
        <div
          style={{
            background: "#f1f5f9",
            borderRadius: 16,
            padding: "36px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <TbFileText size={52} color="#94a3b8" strokeWidth={1.2} />
          <p style={{ fontSize: 14, fontWeight: 600, color: "#64748b", margin: "12px 0 0" }}>Document Preview</p>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0", fontWeight: 400 }}>{doc.name}</p>
        </div>

        {/* Details grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 4px", fontWeight: 500 }}>Category</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>{doc.category}</p>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 4px", fontWeight: 500 }}>File Size</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>{doc.size}</p>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 4px", fontWeight: 500 }}>Upload Date</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>{doc.date}</p>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 4px", fontWeight: 500 }}>Status</p>
            <StatusBadge status={doc.status} />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => onShare(doc)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px 0",
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              background: "#fff",
              fontSize: 14,
              fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
              fontFamily: FONT,
              WebkitTapHighlightColor: "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <TbShare size={18} strokeWidth={2} />
            Share
          </button>
          <button
            onClick={() => onDownload(doc)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px 0",
              borderRadius: 14,
              border: "none",
              background: "#111827",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              fontFamily: FONT,
              WebkitTapHighlightColor: "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1f2937")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111827")}
          >
            <TbDownload size={18} strokeWidth={2} />
            Download
          </button>
        </div>
      </div>

      {/* Slide-up animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(100%); }
          to   { transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function DocumentsContent() {
  const [documents, setDocuments] = useState<Document[]>(DOCUMENTS);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [ctxMenu, setCtxMenu] = useState<{ doc: Document; rect: { top: number; right: number } } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback((msg: string) => setToast(msg), []);

  const statCards = getStatCards(documents);
  const complianceDocs = documents.filter(d => d.category === "Compliance");

  // ── Upload handler ──
  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newDocs: Document[] = Array.from(files).map((file, idx) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      const category: DocCategory =
        ext === "pdf" && /compliance|kyc|aml/i.test(file.name)
          ? "Compliance"
          : ext === "pdf" && /tax/i.test(file.name)
          ? "Tax"
          : "Agreements";
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return {
        id: Date.now() + idx,
        name: file.name,
        status: "Pending" as DocStatus,
        type: "Agreements",
        category,
        size: `${sizeMB} MB`,
        date: dateStr,
      };
    });
    setDocuments((prev) => [...newDocs, ...prev]);
    showToast(`${newDocs.length} document${newDocs.length > 1 ? "s" : ""} uploaded`);
    e.target.value = "";
  }

  // ── Export All handler ──
  function handleExportAll() {
    const header = "Name,Status,Category,Size,Date";
    const rows = documents.map(
      (d) => `"${d.name}",${d.status},${d.category},${d.size},${d.date}`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "documents_export.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Documents exported as CSV");
  }

  // ── Download single doc ──
  function handleDownload(doc: Document) {
    const content = `Document: ${doc.name}\nCategory: ${doc.category}\nStatus: ${doc.status}\nSize: ${doc.size}\nDate: ${doc.date}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.name;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${doc.name}`);
  }

  // ── Share handler ──
  async function handleShare(doc: Document) {
    const shareData = {
      title: doc.name,
      text: `Check out this document: ${doc.name} (${doc.category} - ${doc.status})`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(shareData.text);
      showToast("Document info copied to clipboard");
    }
  }

  // ── Delete handler ──
  function handleDelete(doc: Document) {
    setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    if (previewDoc?.id === doc.id) setPreviewDoc(null);
    showToast(`Deleted ${doc.name}`);
  }

  // ── 3-dot menu handler ──
  function openCtxMenu(e: React.MouseEvent, doc: Document) {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setCtxMenu({ doc, rect: { top: rect.bottom + 4, right: window.innerWidth - rect.right + 4 } });
  }

  const filteredDocs = documents.filter((doc) => {
    const matchesFilter =
      activeFilter === "All" || doc.category === activeFilter;
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageShell title="Token" defaultActive="documents">
      <div
        style={{
          padding: "24px 16px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* ── Breadcrumb ── */}
        <div style={{ padding: "0 2px" }}>
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 500,
            }}
          >
            <span style={{ cursor: "pointer", color: "#3B82F6" }}>Dashboard</span>
            <span style={{ color: "#94a3b8" }}>›</span>
            <span>Documents</span>
          </div>
          <h1
            style={{
              fontSize: "clamp(26px,7vw,32px)",
              fontWeight: 600,
              color: "#0f172a",
              margin: "0 0 8px",
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
            }}
          >
            Document Vault
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#64748b",
              margin: 0,
              lineHeight: 1.55,
              fontWeight: 400,
            }}
          >
            Manage your investment documents and compliance certificates
          </p>
        </div>

        {/* ── Action Buttons ── */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleExportAll}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              background: "#fff",
              fontSize: 14,
              fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
              fontFamily: FONT,
              WebkitTapHighlightColor: "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <TbDownload size={18} strokeWidth={2} />
            Export All
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 12,
              border: "none",
              background: "#111827",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
              fontFamily: FONT,
              WebkitTapHighlightColor: "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1f2937")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111827")}
          >
            <TbUpload size={18} strokeWidth={2} />
            Upload Documents
          </button>
        </div>

        {/* ── Stat Cards 2×2 ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {statCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: "#fff",
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 14px rgba(0,0,0,0.05)";
              }}
            >
              {/* Decorative blob */}
              <div
                style={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: card.blobColor,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: card.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 4px 14px ${card.iconBg}60`,
                  }}
                >
                  <card.icon size={24} color="#fff" strokeWidth={2} />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: card.badgeColor,
                    background: card.badgeBg,
                    borderRadius: 20,
                    padding: "5px 10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.badgeLabel}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6, fontWeight: 500 }}>
                {card.label}
              </div>
              <div
                style={{
                  fontSize: "clamp(22px,5.5vw,28px)",
                  fontWeight: 700,
                  color: "#111827",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Compliance Certificates Card ── */}
        <div
          style={{
            ...cardBase,
            cursor: "pointer",
            transition: "transform 0.18s, box-shadow 0.18s",
            WebkitTapHighlightColor: "transparent",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
          }}
          onClick={() => setActiveFilter("Compliance")}
        >
          {/* Badge top-right */}
          <div style={{ position: "absolute", top: 16, right: 16 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#10B981",
                background: "#dcfce7",
                borderRadius: 20,
                padding: "5px 12px",
              }}
            >
              {complianceDocs.length} Docs
            </span>
          </div>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              boxShadow: "0 4px 14px rgba(16,185,129,0.4)",
            }}
          >
            <TbShieldCheck size={28} color="#fff" strokeWidth={1.8} />
          </div>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#0f172a",
              margin: "0 0 6px",
              letterSpacing: "-0.01em",
            }}
          >
            Compliance Certificates
          </h3>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0, fontWeight: 400, lineHeight: 1.5 }}>
            KYC, AML, And Regulatory Compliance Documents
          </p>
        </div>

        {/* ── Recent Documents ── */}
        <div style={cardBase}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Recent Documents
            </h3>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#64748b",
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
                borderRadius: 20,
                padding: "5px 12px",
              }}
            >
              {documents.length} documents
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#94a3b8",
              margin: "0 0 16px",
              fontWeight: 400,
            }}
          >
            Quickly access your latest uploaded documents and reports.
          </p>

          {/* Filter Tabs */}
          <div
            style={{
              display: "flex",
              gap: 0,
              marginBottom: 14,
              background: "#f8fafc",
              borderRadius: 12,
              padding: 4,
              border: "1px solid #f1f5f9",
            }}
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  style={{
                    flex: 1,
                    padding: "9px 0",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? "#111827" : "transparent",
                    color: isActive ? "#fff" : "#6b7280",
                    transition: "all 0.18s",
                    WebkitTapHighlightColor: "transparent",
                    fontFamily: FONT,
                    letterSpacing: "-0.01em",
                    boxShadow: isActive
                      ? "0 2px 8px rgba(0,0,0,0.15)"
                      : "none",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              background: "#fff",
              marginBottom: 16,
            }}
          >
            <TbSearch size={18} color="#9ca3af" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 14,
                color: "#374151",
                fontFamily: FONT,
                background: "transparent",
              }}
            />
          </div>

          {/* Document List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filteredDocs.map((doc, i) => (
              <div
                key={doc.id + "-" + i}
                onClick={() => setPreviewDoc(doc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setPreviewDoc(doc)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "16px 0",
                  borderBottom:
                    i < filteredDocs.length - 1
                      ? "1px solid #f1f5f9"
                      : "none",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  borderRadius: 8,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <DocIcon category={doc.category} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0f172a",
                          margin: "0 0 5px",
                          lineHeight: 1.35,
                        }}
                      >
                        {doc.name}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <StatusBadge status={doc.status} />
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>•</span>
                        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400 }}>
                          {doc.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => openCtxMenu(e, doc)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 4,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        borderRadius: 6,
                        WebkitTapHighlightColor: "transparent",
                        transition: "background 0.12s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                      aria-label="More options"
                    >
                      <TbDots size={18} color="#9ca3af" strokeWidth={2} />
                    </button>
                  </div>
                  {/* Meta row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginTop: 8,
                      fontSize: 12,
                      color: "#94a3b8",
                      fontWeight: 400,
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M2 6h12M2 6V13a1 1 0 001 1h10a1 1 0 001-1V6M2 6V5a1 1 0 011-1h1m0 0V2m0 2h8m0-2v2m0 0h1a1 1 0 011 1v1" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {doc.type}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#94a3b8" strokeWidth="1.5" />
                        <path d="M5 6h6M5 9h4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {doc.size}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#94a3b8" strokeWidth="1.5" />
                        <path d="M2 6.5h12" stroke="#94a3b8" strokeWidth="1.5" />
                        <path d="M5.5 1.5v3M10.5 1.5v3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {doc.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {filteredDocs.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "32px 0",
                  color: "#94a3b8",
                  fontSize: 14,
                }}
              >
                No documents found
              </div>
            )}
          </div>
        </div>

        {/* ── Footer Note ── */}
        <p
          style={{
            fontSize: 12,
            color: "#94a3b8",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.6,
            fontWeight: 400,
            padding: "0 12px",
          }}
        >
          All documents are encrypted and stored securely. Your data privacy is our top priority.
        </p>
      </div>

      {/* ── Document Preview Modal ── */}
      {previewDoc && (
        <DocumentPreview
          doc={previewDoc}
          onClose={() => setPreviewDoc(null)}
          onShare={handleShare}
          onDownload={handleDownload}
        />
      )}

      {/* ── Context Menu ── */}
      {ctxMenu && (
        <ContextMenu
          doc={ctxMenu.doc}
          anchorRect={ctxMenu.rect}
          onView={() => setPreviewDoc(ctxMenu.doc)}
          onDownload={() => handleDownload(ctxMenu.doc)}
          onShare={() => handleShare(ctxMenu.doc)}
          onDelete={() => handleDelete(ctxMenu.doc)}
          onClose={() => setCtxMenu(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </PageShell>
  );
}
