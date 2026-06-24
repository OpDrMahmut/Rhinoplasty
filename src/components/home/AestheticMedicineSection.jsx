import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/LanguageContext";

function Ticker() {
  const { t } = useLang();
  const TICKER_ITEMS = [t("aestheticMed.hyaluronic"), t("aestheticMed.mesotherapy"), t("aestheticMed.fillingBotox"), t("aestheticMed.botulinumToxin")];
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ borderTop: "1px solid #D8D8D8", borderBottom: "1px solid #D8D8D8", overflow: "hidden", backgroundColor: "#FFFFFF", padding: "14px 0", userSelect: "none" }}>
      <motion.div style={{ display: "flex", width: "max-content" }} animate={{ x: [0, "-25%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "#111111", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
            {item}
            <span style={{ display: "inline-block", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#C9A36A", margin: "0 36px", flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function TextPanel({ title, bg, textColor, href }) {
  const { t } = useLang();
  return (
    <Link to={href || "/treatments"} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div style={{ backgroundColor: bg, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(32px, 4vw, 64px) clamp(28px, 4.5vw, 64px)", boxSizing: "border-box", height: "100%", cursor: "pointer" }}>
        <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(26px, 3.5vw, 52px)", fontWeight: 300, color: textColor, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.1, margin: 0, whiteSpace: "pre-line" }}>
          {title}
        </h3>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: textColor, textDecoration: "none", display: "inline-block", borderBottom: `1px solid ${textColor}`, paddingBottom: "3px", alignSelf: "flex-start" }}>
          {t("aestheticMed.discover")}
        </span>
      </div>
    </Link>
  );
}

function ImgPanel({ src, alt }) {
  return (
    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top", display: "block", transition: "transform 1.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }} />
    </div>
  );
}

export default function AestheticMedicineSection() {
  const { t } = useLang();
  const ROW_H = "clamp(260px, 28vw, 400px)";
  const DOUBLE_H = `calc(${ROW_H} * 2)`;

  return (
    <section style={{ backgroundColor: "#FFFFFF" }}>
      <div style={{ textAlign: "center", padding: "clamp(56px, 8vw, 100px) 24px clamp(36px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(28px, 4.5vw, 58px)", fontWeight: 300, color: "#111111", letterSpacing: "0.2em", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
          {t("aestheticMed.title")}
        </h2>
      </div>
      <Ticker />
      <div className="aesthetic-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: `${ROW_H} ${ROW_H}`, width: "100%" }}>
        <div className="aes-cell" style={{ gridColumn: 1, gridRow: 1 }}><TextPanel title={t("aestheticMed.hyaluronic")} bg="#F2EDE6" textColor="#111111" href="/treatments/cheek-filler" /></div>
        <div className="aes-center-img" style={{ gridColumn: 2, gridRow: "1 / 3", height: DOUBLE_H }}>
          <ImgPanel src="https://media.base44.com/images/public/6a271773d45d7fe415b4242b/4819a8d40_side-profile-of-serene-woman-with-closed-eyes-2026-01-08-05-27-32-utc.jpg" alt="Aesthetic medicine" />
        </div>
        <div className="aes-cell" style={{ gridColumn: 3, gridRow: 1 }}><TextPanel title={t("aestheticMed.botulinumToxin")} bg="#111111" textColor="#F8F6F2" href="/treatments/botox" /></div>
        <div className="aes-cell" style={{ gridColumn: 1, gridRow: 2 }}><TextPanel title={t("aestheticMed.mesotherapy")} bg="#111111" textColor="#F8F6F2" href="/treatments/mesotherapy" /></div>
        <div className="aes-cell" style={{ gridColumn: 3, gridRow: 2 }}><TextPanel title={t("aestheticMed.fillingBotox")} bg="#F2EDE6" textColor="#111111" href="/fillers-botox" /></div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .aesthetic-grid { display: flex !important; flex-direction: column !important; }
          .aes-center-img { width: 100% !important; height: 80vw !important; order: -1; }
          .aes-cell { height: 160px !important; min-height: unset !important; }
          .aes-cell > a > div { height: 160px !important; }
        }
      `}</style>
    </section>
  );
}