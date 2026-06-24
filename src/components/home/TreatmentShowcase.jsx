import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/i18n/LanguageContext";

const NAV_ITEMS = ["Peeling", "Botulinum Toxin Injections", "Hyaluronic Acid", "Mesotherapy"];
const PANEL_H = 480;

function ImageRevealPanel({ src, alt, delay = 0, height }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <div ref={ref} style={{ overflow: "hidden", height: height || "100%", width: "100%" }}>
      <motion.div initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.08 }} animate={inView ? { clipPath: "inset(0% 0 0 0)", scale: 1 } : {}} transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }} style={{ height: "100%", width: "100%" }}>
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform 1.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }} />
      </motion.div>
    </div>
  );
}

function TextPanel({ title, bg, textColor, delay = 0, height }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const lines = title.split("\n");
  const { t } = useLang();

  return (
    <div ref={ref} style={{ backgroundColor: bg, height: height || "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(36px, 5vw, 64px) clamp(32px, 5vw, 64px)", boxSizing: "border-box" }}>
      <div>
        {lines.map((line, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <motion.h3 initial={{ y: 60, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1.1, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 4.5vw, 80px)", fontWeight: 300, color: textColor, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.05, margin: 0 }}>
              {line}
            </motion.h3>
          </div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: delay + 0.4, ease: [0.16, 1, 0.3, 1] }}>
        <Link to="/contact" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: textColor, textDecoration: "none", display: "inline-block", borderBottom: `1px solid ${textColor}`, paddingBottom: "3px" }}>
          {t("aestheticMed.discover")}
        </Link>
      </motion.div>
    </div>
  );
}

export default function TreatmentShowcase() {
  const { t } = useLang();
  return (
    <section style={{ backgroundColor: "#FFFFFF" }}>
      <div style={{ textAlign: "center", padding: "clamp(64px, 9vw, 110px) 24px clamp(36px, 5vw, 60px)" }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 300, color: "#111111", letterSpacing: "0.2em", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
          {t("aestheticMed.title")}
        </h2>
      </div>
      <div style={{ position: "sticky", top: "79px", zIndex: 40, backgroundColor: "#FFFFFF", borderTop: "1px solid #E0E0E0", borderBottom: "1px solid #E0E0E0", overflow: "hidden" }}>
        <style>{`@keyframes nav-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .nav-ticker-inner { animation: nav-ticker 28s linear infinite; } .nav-ticker-inner:hover { animation-play-state: paused; }`}</style>
        <div className="nav-ticker-inner" style={{ display: "flex", width: "max-content", padding: "15px 0" }}>
          {[...NAV_ITEMS, ...NAV_ITEMS, ...NAV_ITEMS, ...NAV_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 300, letterSpacing: "0.28em", textTransform: "uppercase", color: "#111111", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
              {item}
              <span style={{ display: "inline-block", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#C9A36A", margin: "0 clamp(24px, 3vw, 48px)", flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>
      <div className="showcase-grid-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: `${PANEL_H}px ${PANEL_H}px` }}>
        <TextPanel title={"Hyaluronic\nAcid"} bg="#F5F2EF" textColor="#111111" height={`${PANEL_H}px`} delay={0} />
        <div className="showcase-center-img" style={{ gridColumn: 2, gridRow: "1 / 3", height: `${PANEL_H * 2}px` }}>
          <ImageRevealPanel src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=90&fit=crop&crop=faces,top" alt="Aesthetic medicine portrait" height={`${PANEL_H * 2}px`} delay={0.15} />
        </div>
        <TextPanel title={"Botulinum\nToxin\nInjections"} bg="#111111" textColor="#F5F2EF" height={`${PANEL_H}px`} delay={0.1} />
        <TextPanel title="Mesotherapy" bg="#111111" textColor="#F5F2EF" height={`${PANEL_H}px`} delay={0.05} />
        <TextPanel title="Peeling" bg="#F5F2EF" textColor="#111111" height={`${PANEL_H}px`} delay={0.1} />
      </div>
      <div className="showcase-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: `${PANEL_H}px ${PANEL_H}px` }}>
        <ImageRevealPanel src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=90&fit=crop&crop=faces,top" alt="Skin treatment close-up" height={`${PANEL_H}px`} delay={0} />
        <ImageRevealPanel src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=90&fit=crop&crop=faces,top" alt="Skin texture close-up" height={`${PANEL_H}px`} delay={0.1} />
        <ImageRevealPanel src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=90&fit=crop&crop=faces,top" alt="Natural beauty" height={`${PANEL_H}px`} delay={0} />
        <TextPanel title="Peeling" bg="#F5F2EF" textColor="#111111" height={`${PANEL_H}px`} delay={0.1} />
      </div>
      <style>{`
        @media (max-width: 768px) {
          .showcase-grid-1 { display: flex !important; flex-direction: column !important; }
          .showcase-center-img { order: -1; height: 75vw !important; min-height: 240px !important; width: 100% !important; }
          .showcase-grid-1 > div:not(.showcase-center-img) { height: 200px !important; }
          .showcase-grid-2 { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .showcase-grid-2 > div { height: 240px !important; }
        }
      `}</style>
    </section>
  );
}