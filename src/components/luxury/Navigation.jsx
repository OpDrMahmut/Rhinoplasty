import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

// ── Data ───────────────────────────────────────────────────────────────────

const NOSE_IDS = ["rhinoplasty", "septoplasty", "tip-rhinoplasty", "barbie-nose", "piezo-rhinoplasty"];
const FACIAL_IDS = ["facelift", "neck-lift", "bichectomy", "brow-lift", "blepharoplasty", "otoplasty", "genioplasty", "canthoplasty", "lipofilling", "forehead-reduction", "lip-lift"];
const DERMAL_IDS = ["lip-fillers", "jawline-filler", "nasolabial-filler", "cheek-filler"];
const BOTOX_ID = "botox";
const MESO_ID = "mesotherapy";

const LANGUAGES = [
  { code: "en", label: "EN", flag: "🇬🇧", full: "English" },
  { code: "tr", label: "TR", flag: "🇹🇷", full: "Türkçe" },
  { code: "fr", label: "FR", flag: "🇫🇷", full: "Français" },
  { code: "it", label: "IT", flag: "🇮🇹", full: "Italiano" },
];

// Nav text keys resolved at render time via useLang()
// (NOSE_ITEMS / FACIAL_ITEMS / FILLERS_CATEGORIES labels kept in English as treatment names are proper nouns)

// ── Panel Item ─────────────────────────────────────────────────────────────

function PanelItem({ item, onClose, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? "none" : "1px solid rgba(201,163,106,0.2)" }}>
      <Link
        to={item.path}
        onClick={onClose}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 0",
          paddingLeft: hovered ? "14px" : "0",
          textDecoration: "none",
          backgroundColor: hovered ? "rgba(201,163,106,0.04)" : "transparent",
          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <span style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(16px, 1.4vw, 20px)",
          fontWeight: 300,
          fontStyle: "italic",
          color: hovered ? "#C9A36A" : "#111111",
          letterSpacing: "0.01em",
          transition: "color 0.3s",
          lineHeight: 1.1,
        }}>
          {item.label}
        </span>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0, marginLeft: "12px" }}
        >
          <ArrowRight size={12} color="#C9A36A" strokeWidth={1.5} />
        </motion.span>
      </Link>
    </div>
  );
}

// ── Left Info Column (shared) ──────────────────────────────────────────────

function PanelInfo({ tag, line1, line2, desc }) {
  return (
    <div style={{
      padding: "clamp(32px,4vw,52px) clamp(24px,3vw,44px)",
      borderRight: "1px solid rgba(201,163,106,0.18)",
      backgroundColor: "#FDFCFB",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minWidth: "220px",
    }}>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "9px", fontWeight: 400,
        letterSpacing: "0.32em", textTransform: "uppercase",
        color: "#C9A36A", margin: "0 0 14px",
      }}>
        {tag}
      </p>
      <h3 style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "clamp(32px, 3vw, 50px)",
        fontWeight: 300, color: "#111111",
        lineHeight: 0.93, letterSpacing: "-0.01em",
        margin: "0 0 18px", fontStyle: "italic",
        whiteSpace: "nowrap",
      }}>
        {line1}<br />{line2}
      </h3>
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "12px", fontWeight: 300,
        lineHeight: 1.75, color: "#AAAAAA",
        margin: 0, maxWidth: "180px",
      }}>
        {desc}
      </p>
    </div>
  );
}

// ── Nose Panel ─────────────────────────────────────────────────────────────

function NosePanel({ onClose }) {
  const { t } = useLang();
  const items = NOSE_IDS.map(id => {
    const label = t(`treatmentContent.${id}.label`);
    return { label: label && !label.startsWith("treatmentContent.") ? label : id, path: `/treatments/${id}` };
  });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <PanelInfo
        tag={t("nav.surgical")}
        line1="Nose"
        line2="Aesthetics"
        desc={t("nav.noseDesc")}
      />
      <div style={{ padding: "clamp(32px,4vw,52px) clamp(32px,4vw,60px)" }}>
        {items.map((item, i) => (
          <PanelItem key={item.path} item={item} onClose={onClose} isLast={i === items.length - 1} />
        ))}
      </div>
    </div>
  );
}

// ── Facial Panel ───────────────────────────────────────────────────────────

function FacialPanel({ onClose }) {
  const { t } = useLang();
  const items = FACIAL_IDS.map(id => {
    const label = t(`treatmentContent.${id}.label`);
    return { label: label && !label.startsWith("treatmentContent.") ? label : id, path: `/treatments/${id}` };
  });
  const half = Math.ceil(items.length / 2);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 1fr" }}>
      <PanelInfo
        tag={t("nav.surgical")}
        line1="Facial"
        line2="Aesthetics"
        desc={t("nav.facialDesc")}
      />
      <div style={{
        padding: "clamp(32px,4vw,52px) clamp(24px,3vw,48px)",
        borderRight: "1px solid rgba(201,163,106,0.12)",
      }}>
        {items.slice(0, half).map((item, i) => (
          <PanelItem key={item.path} item={item} onClose={onClose} isLast={i === half - 1} />
        ))}
      </div>
      <div style={{ padding: "clamp(32px,4vw,52px) clamp(24px,3vw,48px)" }}>
        {items.slice(half).map((item, i, arr) => (
          <PanelItem key={item.path} item={item} onClose={onClose} isLast={i === arr.length - 1} />
        ))}
      </div>
    </div>
  );
}

// ── Fillers Panel ──────────────────────────────────────────────────────────

function FillersPanel({ onClose }) {
  const { t } = useLang();
  const dermalItems = DERMAL_IDS.map(id => {
    const label = t(`treatmentContent.${id}.label`);
    return { label: label && !label.startsWith("treatmentContent.") ? label : id, path: `/treatments/${id}` };
  });
  const botoxLabel = t(`treatmentContent.${BOTOX_ID}.label`);
  const botoxDisplay = botoxLabel && !botoxLabel.startsWith("treatmentContent.") ? botoxLabel : "Botox";
  const mesoLabel = t(`treatmentContent.${MESO_ID}.label`);
  const mesoDisplay = mesoLabel && !mesoLabel.startsWith("treatmentContent.") ? mesoLabel : "Youth Vaccine (Mesotherapy)";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr" }}>
      <PanelInfo
        tag={t("nav.nonSurgical")}
        line1="Fillers"
        line2="& Botox"
        desc={t("nav.fillersDesc")}
      />

      {/* Items */}
      <div style={{ padding: "clamp(32px,4vw,52px) clamp(24px,3vw,48px)" }}>
        {/* Dermal Fillers with sub-items */}
        <div style={{ marginBottom: "24px" }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9px", fontWeight: 400,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "#C9A36A", margin: "0 0 16px",
          }}>
            {t("nav.dermalFillers")}
          </p>
          {dermalItems.map((item, i) => (
            <PanelItem key={item.path} item={item} onClose={onClose} isLast={i === dermalItems.length - 1} />
          ))}
        </div>

        {/* Botox - direct link */}
        <div style={{ borderBottom: "1px solid rgba(201,163,106,0.2)", paddingBottom: "16px", marginBottom: "16px" }}>
          <Link
            to="/treatments/botox"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.paddingLeft = "14px";
              e.currentTarget.querySelector('span:first-child').style.color = "#C9A36A";
              e.currentTarget.querySelector('span:last-child').style.opacity = "1";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.paddingLeft = "0";
              e.currentTarget.querySelector('span:first-child').style.color = "#111111";
              e.currentTarget.querySelector('span:last-child').style.opacity = "0";
            }}
          >
            <span style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(16px, 1.4vw, 20px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#111111",
              transition: "color 0.3s",
              lineHeight: 1.1,
            }}>
              {botoxDisplay}
            </span>
            <span style={{ opacity: 0, transition: "opacity 0.2s" }}>
              <ArrowRight size={12} color="#C9A36A" strokeWidth={1.5} />
            </span>
          </Link>
        </div>

        {/* Youth Vaccine - direct link */}
        <Link
          to="/treatments/mesotherapy"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textDecoration: "none",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.paddingLeft = "14px";
            e.currentTarget.querySelector('span:first-child').style.color = "#C9A36A";
            e.currentTarget.querySelector('span:last-child').style.opacity = "1";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.paddingLeft = "0";
            e.currentTarget.querySelector('span:first-child').style.color = "#111111";
            e.currentTarget.querySelector('span:last-child').style.opacity = "0";
          }}
        >
          <span style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(16px, 1.4vw, 20px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#111111",
            transition: "color 0.3s",
            lineHeight: 1.1,
          }}>
            {mesoDisplay}
          </span>
          <span style={{ opacity: 0, transition: "opacity 0.2s" }}>
            <ArrowRight size={12} color="#C9A36A" strokeWidth={1.5} />
          </span>
        </Link>
      </div>
    </div>
  );
}

// ── Mobile expandable section ──────────────────────────────────────────────

function MobileSection({ label, items, isExpanded, onToggle, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ borderBottom: "1px solid rgba(248,246,242,0.1)" }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "none", border: "none",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 0", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(24px, 5vw, 34px)",
          fontWeight: 300, color: "#F8F6F2",
        }}>
          {label}
        </span>
        <ChevronDown
          size={15} color="#C9A36A"
          style={{ transition: "transform 0.3s", transform: isExpanded ? "rotate(180deg)" : "none", flexShrink: 0 }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            {items.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 300,
                  color: "rgba(248,246,242,0.6)",
                  textDecoration: "none",
                  borderBottom: i < items.length - 1 ? "1px solid rgba(248,246,242,0.06)" : "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#C9A36A"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(248,246,242,0.6)"; }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ height: "14px" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Navigation ────────────────────────────────────────────────────────

export default function Navigation({ loaded, darkHero = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Nav text is light when: transparent bg (not scrolled) AND no mega panel AND not mobile open AND hero is dark
  const isLight = darkHero && !scrolled && !activeMenu && !mobileOpen;
  const textColor = isLight ? "rgba(248,246,242,0.92)" : "#111111";

  const triggerStyle = (name) => ({
    background: "none", border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", gap: "5px",
    fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 400,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: activeMenu === name ? "#C9A36A" : textColor,
    transition: "color 0.35s",
    padding: "4px 0", whiteSpace: "nowrap",
  });

  const linkStyle = {
    fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 400,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: textColor, textDecoration: "none",
    transition: "color 0.35s", whiteSpace: "nowrap",
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveMenu(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 44,
              backgroundColor: "rgba(0,0,0,0.2)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onMouseLeave={() => setActiveMenu(null)}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: (scrolled || activeMenu) ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: (scrolled || activeMenu) ? "blur(12px)" : "none",
          borderBottom: scrolled && !activeMenu ? "1px solid #E8E8E8" : "1px solid transparent",
          transition: "background-color 0.5s ease, border-color 0.5s ease",
        }}
      >
        {/* ── Nav bar ── */}
        <div style={{
          maxWidth: "1520px", margin: "0 auto",
          padding: "0 clamp(20px, 3vw, 48px)",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", height: "80px", gap: "20px",
        }}>

          {/* Logo */}
          <Link to="/" style={{ flexShrink: 0 }}>
            <img
              src={isLight
                ? "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/0dac3e8d9_2.png"
                : "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/6e75ccb34_1.png"}
              alt="Dr. Mahmut Uzut"
              style={{ height: "84px", width: "auto" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex" style={{ alignItems: "center", gap: "clamp(12px,1.8vw,30px)", flex: 1, justifyContent: "center" }}>

            <Link
              to="/nose-aesthetics"
              style={{ ...triggerStyle("nose"), textDecoration: "none" }}
              onMouseEnter={() => setActiveMenu("nose")}
            >
              {t("nav.noseAesthetics")}
              <ChevronDown size={10} style={{ transition: "transform 0.3s", transform: activeMenu === "nose" ? "rotate(180deg)" : "none" }} />
            </Link>

            <Link
              to="/facial-aesthetics"
              style={{ ...triggerStyle("facial"), textDecoration: "none" }}
              onMouseEnter={() => setActiveMenu("facial")}
            >
              {t("nav.facialAesthetics")}
              <ChevronDown size={10} style={{ transition: "transform 0.3s", transform: activeMenu === "facial" ? "rotate(180deg)" : "none" }} />
            </Link>

            <Link
              to="/fillers-botox"
              style={{ ...triggerStyle("fillers"), textDecoration: "none" }}
              onMouseEnter={() => setActiveMenu("fillers")}
            >
              {t("nav.fillersBotox")}
              <ChevronDown size={10} style={{ transition: "transform 0.3s", transform: activeMenu === "fillers" ? "rotate(180deg)" : "none" }} />
            </Link>

            <Link
              to="/about"
              style={linkStyle}
              onMouseEnter={e => { setActiveMenu(null); e.currentTarget.style.color = "#C9A36A"; }}
              onMouseLeave={e => { e.currentTarget.style.color = textColor; }}
            >
              {t("nav.about")}
            </Link>

            <Link
              to="/contact"
              style={linkStyle}
              onMouseEnter={e => { setActiveMenu(null); e.currentTarget.style.color = "#C9A36A"; }}
              onMouseLeave={e => { e.currentTarget.style.color = textColor; }}
            >
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Right: Language + CTA + Burger */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>

            {/* Language switcher */}
            <div
              className="hidden xl:block"
              style={{ position: "relative" }}
              onMouseEnter={() => { setLangOpen(true); setActiveMenu(null); }}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button style={{
                ...linkStyle,
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "5px",
              }}>
                <span style={{ fontSize: "14px" }}>{currentLang.flag}</span>
                <span>{currentLang.label}</span>
                <ChevronDown size={10} style={{ transition: "transform 0.3s", transform: langOpen ? "rotate(180deg)" : "none" }} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: "absolute", top: "calc(100% + 16px)", right: 0,
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0 20px 48px rgba(0,0,0,0.12)",
                      minWidth: "150px", zIndex: 60,
                      borderTop: "2px solid #C9A36A",
                    }}
                  >
                    {LANGUAGES.map((lang, i) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLang(lang.code); setLangOpen(false); }}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          width: "100%", padding: "12px 16px",
                          background: "none", border: "none", cursor: "pointer",
                          fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 300,
                          color: currentLang.code === lang.code ? "#C9A36A" : "#111111",
                          borderBottom: i < LANGUAGES.length - 1 ? "1px solid #F0EEEA" : "none",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: "15px" }}>{lang.flag}</span>
                        <span>{lang.full}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="hidden xl:inline-block"
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#F8F6F2", backgroundColor: "#111111",
                padding: "12px 22px", textDecoration: "none",
                transition: "background-color 0.5s ease", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C9A36A"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#111111"; }}
            >
              {t("nav.consultation")}
            </Link>

            {/* Burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
              aria-label="Menu"
            >
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                {mobileOpen
                  ? <X size={22} color="#F8F6F2" strokeWidth={1.5} />
                  : <Menu size={22} color={isLight ? "#F8F6F2" : "#111111"} strokeWidth={1.5} />
                }
              </motion.div>
            </button>
          </div>
        </div>

        {/* ══ MEGA PANEL ═══════════════════════════════════════════════════ */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top: "100%", left: 0, right: 0,
                backgroundColor: "#FFFFFF",
                borderTop: "2px solid #C9A36A",
                boxShadow: "0 28px 80px rgba(0,0,0,0.13)",
              }}
            >
              <div style={{ maxWidth: "1520px", margin: "0 auto", padding: "0 clamp(20px,3vw,48px)" }}>
                {activeMenu === "nose" && <NosePanel onClose={() => setActiveMenu(null)} />}
                {activeMenu === "facial" && <FacialPanel onClose={() => setActiveMenu(null)} />}
                {activeMenu === "fillers" && <FillersPanel onClose={() => setActiveMenu(null)} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ══ MOBILE MENU ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              backgroundColor: "#111111",
              overflowY: "auto",
              paddingTop: "96px",
              paddingBottom: "48px",
            }}
          >
            <div style={{ padding: "0 clamp(24px, 8vw, 60px)" }}>

              <MobileSection label={t("nav.noseAesthetics")} items={NOSE_IDS.map(id => ({ label: t(`treatmentContent.${id}.label`), path: `/treatments/${id}` })).map(it => ({ label: it.label && !it.label.startsWith("treatmentContent.") ? it.label : it.path.split("/").pop(), path: it.path }))} delay={0.05}
                isExpanded={mobileExpanded === "nose"}
                onToggle={() => setMobileExpanded(p => p === "nose" ? null : "nose")}
              />
              <MobileSection label={t("nav.facialAesthetics")} items={FACIAL_IDS.map(id => ({ label: t(`treatmentContent.${id}.label`), path: `/treatments/${id}` })).map(it => ({ label: it.label && !it.label.startsWith("treatmentContent.") ? it.label : it.path.split("/").pop(), path: it.path }))} delay={0.1}
                isExpanded={mobileExpanded === "facial"}
                onToggle={() => setMobileExpanded(p => p === "facial" ? null : "facial")}
              />
              <MobileSection label={t("nav.fillersBotox")} items={[...DERMAL_IDS, BOTOX_ID, MESO_ID].map(id => ({ label: t(`treatmentContent.${id}.label`), path: `/treatments/${id}` })).map(it => ({ label: it.label && !it.label.startsWith("treatmentContent.") ? it.label : it.path.split("/").pop(), path: it.path }))} delay={0.15}
                isExpanded={mobileExpanded === "fillers"}
                onToggle={() => setMobileExpanded(p => p === "fillers" ? null : "fillers")}
              />

              {[{ label: t("nav.about"), path: "/about" }, { label: t("nav.contact"), path: "/contact" }].map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  style={{ borderBottom: "1px solid rgba(248,246,242,0.1)" }}
                >
                  <Link
                    to={l.path}
                    style={{
                      display: "block", padding: "18px 0",
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(24px,5vw,34px)",
                      fontWeight: 300, color: "#F8F6F2", textDecoration: "none",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              {/* Language (mobile) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: "28px", display: "flex", gap: "8px", flexWrap: "wrap" }}
              >
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    style={{
                      background: "none",
                      border: `1px solid ${currentLang.code === l.code ? "#C9A36A" : "rgba(248,246,242,0.18)"}`,
                      cursor: "pointer", padding: "8px 14px",
                      display: "flex", alignItems: "center", gap: "6px",
                      fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 300,
                      color: currentLang.code === l.code ? "#C9A36A" : "rgba(248,246,242,0.5)",
                    }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.full}</span>
                  </button>
                ))}
              </motion.div>

              <motion.a
                href="tel:+905327457466"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{
                  display: "block", marginTop: "24px",
                  fontFamily: "Inter, sans-serif", fontSize: "14px",
                  fontWeight: 300, color: "rgba(248,246,242,0.45)",
                  textDecoration: "none",
                }}
              >
                +90 532 745 74 66
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}