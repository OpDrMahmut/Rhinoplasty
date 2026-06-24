import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n/LanguageContext";
import { translations } from "../../lib/i18n/translations";

// Per-treatment focal points to prevent face cropping in background images
const FOCAL_BG = {
  "rhinoplasty":       "center 15%",
  "septoplasty":       "center 10%",
  "tip-rhinoplasty":   "center 12%",
  "barbie-nose":       "center 35%",
  "piezo-rhinoplasty": "center 10%",
  "facelift":          "center 18%",
  "neck-lift":         "center 20%",
  "bichectomy":        "center 15%",
  "brow-lift":         "center 18%",
  "blepharoplasty":    "center 18%",
  "otoplasty":         "center 12%",
  "genioplasty":       "center 15%",
  "canthoplasty":      "center 18%",
  "lipofilling":       "center 10%",
  "forehead-reduction":"center 12%",
  "lip-lift":          "center 20%",
  "lip-fillers":       "center 20%",
  "jawline-filler":    "center 15%",
  "nasolabial-filler": "center 20%",
  "cheek-filler":      "center 20%",
  "botox":             "center 15%",
  "mesotherapy":       "center 15%",
};

export default function TreatmentHero({ treatments, active, onSelect, current, categoryTag = "Treatments", categoryTitle = "Rhinoplasty" }) {
  const { t, lang } = useLang();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (title) => {
    setExpandedSection(prev => prev === title ? null : title);
  };

  // ── Localised treatment label helper ──────────────────────────
  const getLabel = (item) => {
    const key = `treatmentContent.${item.id}.label`;
    const val = t(key);
    return val && val !== key ? val : item.label;
  };

  // ── Deep content lookup (sections / procedure / faq) ──────────
  const getDeep = (key) => {
    const flatKey = `treatmentContent.${current.id}.${key}`;
    const flatVal = t(flatKey);
    if (flatVal && flatVal !== flatKey) return flatVal;
    const tree = translations?.treatmentContent?.deep?.[current.id]?.[lang];
    if (!tree) return null;
    const parts = key.split('.');
    let node = tree;
    for (const p of parts) { if (node == null) break; node = node[p]; }
    return node || null;
  };

  // ── Localised intro paragraphs ───────────────────────────────
  const introParagraphs = useMemo(() => {
    return current.intro.map((_, i) => {
      const k = `intro${i}`;
      const val = t(`treatmentContent.${current.id}.${k}`);
      if (val && val !== `treatmentContent.${current.id}.${k}`) return val;
      const deepVal = getDeep(k);
      return deepVal || current.intro[i];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, lang]);

  // Localised title
  const localisedTitle = useMemo(() => {
    const val = t(`treatmentContent.${current.id}.title`);
    return val && val !== `treatmentContent.${current.id}.title` ? val : current.title;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, lang]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#111111",
        overflow: "hidden",
      }}
    >
      {/* Background image — cross-fades on treatment change */}
      <AnimatePresence>
        <motion.div
          key={current.id + "-bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${current.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: FOCAL_BG[current.id] || "center 15%",
            zIndex: 0,
          }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.2) 100%)",
        zIndex: 1,
      }} />

      {/* Page title — top center */}
      <div className="treatment-hero-page-title" style={{
        position: "absolute",
        top: "clamp(100px, 14vh, 140px)",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        textAlign: "center",
        pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          fontWeight: 400,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(201,163,106,0.9)",
          marginBottom: "10px",
        }}>
          {categoryTag}
        </p>
        <h1 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(44px, 7vw, 90px)",
          fontWeight: 300,
          color: "#F8F6F2",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: 1,
          margin: 0,
        }}>
          {categoryTitle}
        </h1>
      </div>

      {/* Main content row */}
      <div
        className="treatment-hero-layout"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "0",
          minHeight: "120vh",
          paddingTop: "clamp(280px, 38vh, 360px)",
          paddingBottom: "clamp(80px, 12vh, 140px)",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "clamp(24px, 5vw, 60px)",
          paddingRight: "clamp(24px, 5vw, 60px)",
        }}>

        {/* LEFT — vertical nav */}
        <nav className="treatment-hero-nav" style={{ paddingTop: "4px" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            {treatments.map((t) => {
              const isActive = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => { onSelect(t.id); setExpandedSection(null); }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    {/* Active indicator line */}
                    <span style={{
                      display: "inline-block",
                      width: "28px",
                      height: "1px",
                      backgroundColor: isActive ? "#C9A36A" : "rgba(248,246,242,0.4)",
                      flexShrink: 0,
                      transition: "background-color 0.4s, width 0.4s",
                    }} />
                    <span style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: isActive ? 400 : 300,
                      letterSpacing: "0.1em",
                      color: isActive ? "#F8F6F2" : "rgba(248,246,242,0.7)",
                      transition: "color 0.4s",
                      whiteSpace: "nowrap",
                    }}>
                      {getLabel(t)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* RIGHT — treatment detail */}
        <div className="treatment-hero-detail" style={{ paddingLeft: "clamp(32px, 5vw, 72px)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Treatment title */}
              <h2 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 300,
                color: "#F8F6F2",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.1,
                marginBottom: "clamp(20px, 3vw, 36px)",
              }}>
                {localisedTitle}
              </h2>

              {/* Two-column intro text */}
              <div className="treatment-intro-grid" style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(20px, 4vw, 48px)",
                marginBottom: "clamp(28px, 4vw, 48px)",
              }}>
                {introParagraphs.map((para, i) => (
                  <p key={i} style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "rgba(248,246,242,0.75)",
                    margin: 0,
                  }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Accordion sections */}
              <div style={{ borderTop: "1px solid rgba(248,246,242,0.15)" }}>
                {current.sections.map((section, idx) => {
                  const sTitle = getDeep(`sections.${idx}.t`) || section.title;
                  const sContent = getDeep(`sections.${idx}.c`) || section.content;
                  const isOpen = expandedSection === sTitle;
                  return (
                    <div key={`${current.id}-sec-${idx}`} style={{ borderBottom: "1px solid rgba(248,246,242,0.15)" }}>
                      <button
                        onClick={() => toggleSection(sTitle)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "18px 0",
                          textAlign: "left",
                        }}
                      >
                        <span style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "clamp(16px, 2vw, 22px)",
                          fontWeight: 300,
                          color: "rgba(248,246,242,0.85)",
                          letterSpacing: "0.03em",
                          fontStyle: "italic",
                        }}>
                          {sTitle}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            display: "inline-block",
                            width: "18px",
                            height: "18px",
                            position: "relative",
                            flexShrink: 0,
                          }}
                        >
                          {/* Plus/X icon */}
                          <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", backgroundColor: "rgba(248,246,242,0.6)", transform: "translateY(-50%)" }} />
                          <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", backgroundColor: "rgba(248,246,242,0.6)", transform: "translateX(-50%)" }} />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            style={{ overflow: "hidden" }}
                          >
                            <p style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              fontWeight: 300,
                              lineHeight: 1.85,
                              color: "rgba(248,246,242,0.65)",
                              paddingBottom: "20px",
                              maxWidth: "680px",
                              margin: 0,
                            }}>
                              {sContent}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          /* Page title — move into flow, reduce prominence */
          .treatment-hero-page-title {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            padding: 100px 24px 20px !important;
            text-align: center !important;
            pointer-events: auto !important;
          }
          .treatment-hero-page-title p { font-size: 9px !important; margin-bottom: 6px !important; }
          .treatment-hero-page-title h1 { font-size: clamp(28px, 8vw, 48px) !important; line-height: 1.05 !important; }

          .treatment-hero-layout {
            grid-template-columns: 1fr !important;
            padding-top: 0 !important;
            min-height: unset !important;
            padding-bottom: clamp(48px, 8vw, 80px) !important;
          }
          .treatment-hero-nav {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 4px 8px !important;
            padding-bottom: 24px !important;
            border-bottom: 1px solid rgba(248,246,242,0.15) !important;
          }
          .treatment-hero-nav ul {
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }
          .treatment-hero-detail {
            padding-left: 0 !important;
            padding-top: 24px !important;
          }
          .treatment-intro-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1023px) {
          /* Tablet — stack layout to prevent nav/detail overlap */
          .treatment-hero-page-title {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            padding: 100px 24px 20px !important;
            text-align: center !important;
            pointer-events: auto !important;
          }
          .treatment-hero-page-title p { font-size: 9px !important; margin-bottom: 6px !important; }
          .treatment-hero-page-title h1 { font-size: clamp(36px, 6vw, 64px) !important; line-height: 1.05 !important; }

          .treatment-hero-layout {
            grid-template-columns: 1fr !important;
            padding-top: 0 !important;
            min-height: unset !important;
            padding-bottom: clamp(48px, 8vw, 80px) !important;
          }
          .treatment-hero-nav {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 4px 8px !important;
            padding-bottom: 24px !important;
            border-bottom: 1px solid rgba(248,246,242,0.15) !important;
          }
          .treatment-hero-nav ul {
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }
          .treatment-hero-detail {
            padding-left: 0 !important;
            padding-top: 24px !important;
          }
          .treatment-intro-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}