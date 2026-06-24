import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Navigation from "../luxury/Navigation";
import Footer from "../luxury/Footer";
import { ALL_TREATMENTS } from "../../lib/treatmentData";
import { useLang } from "@/lib/i18n/LanguageContext";
import { translations } from "../../lib/i18n/translations";

// ── Scroll reveal wrapper ──────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 60 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── FAQ Accordion ──────────────────────────────────────────────────────────
function FAQItem({ section, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: "1px solid #E8E8E8" }}>
      <button
        onClick={onToggle}
        style={{
          background: "none", border: "none", cursor: "pointer",
          width: "100%", display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "26px 0", textAlign: "left",
        }}
      >
        <span style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(18px, 2.2vw, 26px)",
          fontWeight: 300, color: "#111111",
          letterSpacing: "0.01em", fontStyle: "italic",
        }}>
          {section.title}
        </span>
        <span style={{ flexShrink: 0, marginLeft: "20px" }}>
          {isOpen
            ? <Minus size={13} strokeWidth={1} color="#C9A36A" />
            : <Plus size={13} strokeWidth={1} color="#999999" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: "14px",
              fontWeight: 300, lineHeight: 1.95, color: "#666666",
              paddingBottom: "32px", maxWidth: "720px", margin: 0,
            }}>
              {section.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Intl Journey Step ─────────────────────────────────────────────────────
function IntlStep({ num, label, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase", color: "#C9A36A", marginBottom: "16px" }}>
        {num}
      </p>
      <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 300, color: "#F8F6F2", letterSpacing: "0.01em", fontStyle: "italic", margin: "0 0 14px", lineHeight: 1.1 }}>
        {label}
      </h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.85, color: "rgba(248,246,242,0.55)", margin: 0 }}>
        {desc}
      </p>
    </Reveal>
  );
}

// ── Per-treatment image focal point map ───────────────────────────────────
// Values control objectPosition for hero bg + portrait panel.
// Format: "X% Y%" — Y closer to 0% = show top (face), Y closer to 100% = show bottom.
const FOCAL = {
  "rhinoplasty":       { pos: "50% 15%", contain: false },
  "septoplasty":       { pos: "50% 20%", contain: false },
  "tip-rhinoplasty":   { pos: "50% 12%", contain: true  }, // tall portrait
  "barbie-nose":       { pos: "50% 30%", contain: false }, // wide landscape
  "piezo-rhinoplasty": { pos: "50% 10%", contain: true  }, // tall portrait
  "facelift":          { pos: "50% 15%", contain: false },
  "neck-lift":         { pos: "50% 20%", contain: false },
  "bichectomy":        { pos: "50% 15%", contain: false },
  "brow-lift":         { pos: "50% 18%", contain: false },
  "blepharoplasty":    { pos: "50% 18%", contain: false },
  "otoplasty":         { pos: "50% 12%", contain: false },
  "genioplasty":       { pos: "50% 15%", contain: false },
  "canthoplasty":      { pos: "50% 18%", contain: false },
  "lipofilling":       { pos: "50% 10%", contain: true  }, // same tall portrait as septoplasty
  "forehead-reduction":{ pos: "50% 12%", contain: true  }, // same tall portrait
  "lip-lift":          { pos: "50% 20%", contain: false },
  "lip-fillers":       { pos: "50% 20%", contain: false },
  "jawline-filler":    { pos: "50% 15%", contain: false },
  "nasolabial-filler": { pos: "50% 20%", contain: false },
  "cheek-filler":      { pos: "50% 20%", contain: false },
  "botox":             { pos: "50% 15%", contain: false },
  "mesotherapy":       { pos: "50% 15%", contain: false },
};

// ── Main template ──────────────────────────────────────────────────────────
export default function TreatmentPageTemplate({ treatment }) {
  const { t, lang } = useLang();
  const focal = FOCAL[treatment.id] || { pos: "50% 15%", contain: false };
  const [expanded, setExpanded] = useState(null);
  const toggle = (title) => setExpanded((p) => (p === title ? null : title));

  // Translation helper for treatment-specific content
  // First checks flat treatmentContent.<id>.<key> (title, intro, etc.)
  // Then checks deep content: treatmentContent.deep.<id>.<lang>.<key>
  const tc = (key) => {
    const val = t(`treatmentContent.${treatment.id}.${key}`);
    if (val && val !== `treatmentContent.${treatment.id}.${key}`) return val;
    // Navigate deep content tree for current language
    const deepTree = translations?.treatmentContent?.deep?.[treatment.id]?.[lang];
    if (!deepTree) return null;
    const parts = key.split('.');
    let node = deepTree;
    for (const p of parts) {
      if (node == null) break;
      node = node[p];
    }
    return node || null;
  };
  const translatedTitle = tc('title') || treatment.title;
  const translatedCategoryLabel = tc('categoryLabel') || treatment.categoryLabel;

  // Related treatments (exclude self, max 3)
  const related = ALL_TREATMENTS.filter((t) => t.id !== treatment.id).slice(0, 3);

  // Journey steps
  const JOURNEY = [
    { num: "01", title: t("treatment.journeySteps.consultation"), desc: t("treatment.journeyDescs.consultation") },
    { num: "02", title: t("treatment.journeySteps.treatmentPlan"), desc: t("treatment.journeyDescs.treatmentPlan") },
    { num: "03", title: t("treatment.journeySteps.procedure"), desc: t("treatment.journeyDescs.procedure") },
    { num: "04", title: t("treatment.journeySteps.recoveryStep"), desc: t("treatment.journeyDescs.recovery") },
    { num: "05", title: t("treatment.journeySteps.followUp"), desc: t("treatment.journeyDescs.followUp") },
  ];

  // Key details for hero second half — use per-treatment fields
  const KEY_DETAILS = [
    { label: t("treatment.duration"), value: treatment.duration || "–" },
    { label: t("treatment.anaesthesia"), value: treatment.anaesthesia || "–" },
    { label: t("treatment.recovery"), value: treatment.recovery || "–" },
    { label: t("treatment.results"), value: treatment.results || "–" },
  ];

  return (
    <>
      <Navigation loaded={true} darkHero={true} />
      <main style={{ backgroundColor: "#FFFFFF" }}>

        {/* ═══════════════════════════════════════════════════════
            SECTION 01 — TREVIDIC HERO  200vh  (two halves)
        ═══════════════════════════════════════════════════════ */}
        <section className="hero-200vh" style={{ position: "relative", height: "200vh" }}>

          {/* Full-bleed background image spanning all 200vh */}
          <motion.div
            className="hero-sticky-bg"
            initial={{ scale: 1.08, filter: "blur(5px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "sticky",
              top: 0,
              width: "100%",
              height: "100vh",
              overflow: "hidden",
              zIndex: 0,
            }}
          >
            <img
              src={treatment.heroImage}
              alt={treatment.title}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: focal.pos,
                display: "block",
              }}
            />
            {/* Dark overlay for readability */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.45) 100%)",
            }} />
          </motion.div>

          {/* ── FIRST HALF: title + paragraph centred over background ── */}
          <div className="hero-first-half" style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 clamp(24px, 8vw, 160px)",
            zIndex: 1,
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(52px, 9vw, 120px)",
                fontWeight: 300, color: "#F8F6F2",
                letterSpacing: "0.1em", textTransform: "uppercase",
                lineHeight: 0.9, margin: "0 0 clamp(28px, 4vw, 48px)",
              }}
            >
              {translatedTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(13px, 1.4vw, 17px)",
                fontWeight: 300, lineHeight: 1.85,
                color: "rgba(248,246,242,0.82)",
                maxWidth: "620px",
                margin: 0,
              }}
            >
              {tc('intro0') || treatment.intro[0]}
            </motion.p>
          </div>

          {/* ── SECOND HALF: portrait left + presentation right ── */}
          <div style={{
            position: "absolute",
            top: "100vh", left: 0, right: 0,
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            zIndex: 1,
            padding: "clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
            boxSizing: "border-box",
          }}
            className="hero-second-half"
          >
            {/* LEFT — framed portrait */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                border: "12px solid rgba(248,246,242,0.92)",
                overflow: "hidden",
                aspectRatio: "3/4",
                maxHeight: "72vh",
              }}
            >
              <img
                src={treatment.heroImage}
                alt={treatment.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: focal.contain ? "contain" : "cover",
                  objectPosition: focal.contain ? "center center" : focal.pos,
                  backgroundColor: focal.contain ? "#0a0a0a" : "transparent",
                  display: "block",
                  transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </motion.div>

            {/* RIGHT — PRESENTATION */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(42px, 7vw, 90px)",
                fontWeight: 300, color: "#F8F6F2",
                letterSpacing: "0.12em", textTransform: "uppercase",
                lineHeight: 0.9, margin: "0 0 clamp(24px, 4vw, 44px)",
              }}>
                {t("treatment.presentation")}
              </h2>

              {/* Drop-cap first letter style paragraph */}
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(13px, 1.2vw, 16px)",
                fontWeight: 300, lineHeight: 1.9,
                color: "rgba(248,246,242,0.78)",
                margin: "0 0 20px",
                maxWidth: "520px",
              }}>
                <span style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(52px, 6vw, 80px)",
                  fontWeight: 300, lineHeight: 0.75,
                  color: "#F8F6F2",
                  float: "left",
                  marginRight: "10px",
                  marginTop: "6px",
                }}>
                  {((tc('intro1') || treatment.intro[1] || treatment.intro[0])).charAt(0)}
                </span>
                {((tc('intro1') || treatment.intro[1] || treatment.intro[0])).slice(1)}
              </p>

              {(tc('intro2') || treatment.intro[2]) && (
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(13px, 1.2vw, 16px)",
                  fontWeight: 300, lineHeight: 1.9,
                  color: "rgba(248,246,242,0.78)",
                  margin: "0 0 20px", maxWidth: "520px",
                }}>
                  {tc('intro2') || treatment.intro[2]}
                </p>
              )}

              {/* Key detail bullets */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px 24px",
                margin: "24px 0 28px",
                maxWidth: "520px",
              }}>
                {KEY_DETAILS.map(({ label, value }) => (
                  <div key={label} style={{ borderBottom: "1px solid rgba(248,246,242,0.15)", paddingBottom: "10px" }}>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 400,
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      color: "#C9A36A", margin: "0 0 4px",
                    }}>{label}</p>
                    <p style={{
                      fontFamily: "Cormorant Garamond, serif", fontSize: "18px",
                      fontWeight: 300, color: "#F8F6F2", margin: 0,
                    }}>{value}</p>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: "clamp(28px, 4vw, 44px)" }}
              >
                <Link
                  to="/contact"
                  style={{
                    fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                    letterSpacing: "0.24em", textTransform: "uppercase",
                    color: "#111111", backgroundColor: "rgba(248,246,242,0.92)",
                    padding: "15px 40px", textDecoration: "none",
                    display: "inline-block",
                    transition: "background-color 0.4s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C9A36A"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(248,246,242,0.92)"; }}
                >
                  {t("treatment.bookBtn")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>



        {/* ═══════════════════════════════════════════════════════
            SECTION 03 — TREATMENT OVERVIEW  (2-col, large type)
        ═══════════════════════════════════════════════════════ */}
        <section style={{
          backgroundColor: "#F8F6F2",
          padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)",
        }}>
          <div style={{
            maxWidth: "1360px", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 8vw, 120px)",
            alignItems: "start",
          }}
            className="overview-grid"
          >
            <Reveal>
              <h2 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 300, color: "#111111",
                letterSpacing: "-0.01em", lineHeight: 1.05,
                margin: 0,
                position: "sticky", top: "100px",
              }}>
                {t("treatment.whatIs")}<br />{translatedTitle}?
              </h2>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {treatment.sections.map((s, i) => {
                const sTitle = tc(`sections.${i}.t`) || s.title;
                const sContent = tc(`sections.${i}.c`) || s.content;
                return (
                <Reveal key={s.title} delay={i * 0.1}>
                  <div style={{ paddingBottom: "28px", borderBottom: "1px solid #E0DDD9" }}>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 400,
                      letterSpacing: "0.28em", textTransform: "uppercase",
                      color: "#C9A36A", marginBottom: "12px",
                    }}>
                      {sTitle}
                    </p>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "14px",
                      fontWeight: 300, lineHeight: 1.9, color: "#555555", margin: 0,
                    }}>
                      {sContent}
                    </p>
                  </div>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 04 — PROCEDURE DETAILS  (editorial rows)
        ═══════════════════════════════════════════════════════ */}
        <section style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)",
        }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            {/* Section label */}
            <Reveal>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.36em", textTransform: "uppercase",
                color: "#C9A36A", marginBottom: "clamp(40px, 6vw, 72px)",
              }}>
                {t("treatment.procedureDetails")}
              </p>
            </Reveal>

            {/* Rows */}
            {(treatment.procedure || treatment.sections).map((s, i) => {
              const pTitle = tc(`procedure.${i}.t`) || s.title;
              const pContent = tc(`procedure.${i}.c`) || s.content;
              return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 2fr",
                  gap: "clamp(24px, 4vw, 60px)",
                  alignItems: "start",
                  padding: "clamp(28px, 4vw, 48px) 0",
                  borderTop: "1px solid #E8E8E8",
                  borderBottom: i === (treatment.procedure || treatment.sections).length - 1 ? "1px solid #E8E8E8" : "none",
                }}
                  className="details-row"
                >
                  {/* Index */}
                  <span style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(36px, 4vw, 56px)",
                    fontWeight: 300, color: "#E0DDD9",
                    lineHeight: 1, letterSpacing: "-0.02em",
                    paddingTop: "4px",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(20px, 2.2vw, 30px)",
                    fontWeight: 300, color: "#111111",
                    fontStyle: "italic", letterSpacing: "0.01em",
                    lineHeight: 1.15, margin: 0,
                    paddingTop: "6px",
                  }}>
                    {pTitle}
                  </h3>

                  {/* Body */}
                  <p style={{
                    fontFamily: "Inter, sans-serif", fontSize: "14px",
                    fontWeight: 300, lineHeight: 1.9, color: "#666666",
                    margin: 0,
                  }}>
                    {pContent}
                  </p>
                </div>
              </Reveal>
              );
            })}
          </div>
        </section>



        {/* ═══════════════════════════════════════════════════════
            SECTION 06 — THE TREATMENT JOURNEY  (timeline)
        ═══════════════════════════════════════════════════════ */}
        <section style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)",
        }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <Reveal>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.36em", textTransform: "uppercase",
                color: "#C9A36A", marginBottom: "12px",
              }}>
                {t("treatment.theJourney")}
              </p>
              <h2 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(34px, 5vw, 64px)",
                fontWeight: 300, color: "#111111",
                letterSpacing: "-0.01em", lineHeight: 1,
                margin: "0 0 clamp(48px, 8vw, 96px)",
              }}>
                {t("treatment.yourJourney")}
              </h2>
            </Reveal>

            {/* Desktop horizontal timeline */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0",
              position: "relative",
            }}
              className="journey-grid"
            >
              {/* Horizontal connecting line */}
              <div style={{
                position: "absolute",
                top: "20px",
                left: "10%",
                right: "10%",
                height: "1px",
                backgroundColor: "#E8E8E8",
                zIndex: 0,
              }}
                className="journey-line"
              />

              {JOURNEY.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.1}>
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    textAlign: "center", padding: "0 16px", position: "relative", zIndex: 1,
                  }}>
                    {/* Circle */}
                    <div style={{
                      width: "40px", height: "40px",
                      border: "1px solid #E8E8E8",
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "28px",
                      flexShrink: 0,
                    }}>
                      <span style={{
                        fontFamily: "Inter, sans-serif", fontSize: "9px",
                        fontWeight: 400, letterSpacing: "0.1em",
                        color: "#C9A36A",
                      }}>
                        {step.num}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(17px, 2vw, 22px)",
                      fontWeight: 300, color: "#111111",
                      margin: "0 0 12px", fontStyle: "italic",
                    }}>
                      {step.title}
                    </p>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "12px",
                      fontWeight: 300, lineHeight: 1.7,
                      color: "#888888", margin: 0,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>



        {/* ═══════════════════════════════════════════════════════
            SECTION 08 — FAQ  (luxury accordion)
        ═══════════════════════════════════════════════════════ */}
        <section style={{
          backgroundColor: "#FFFFFF",
          padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)",
        }}>
          <div style={{
            maxWidth: "1360px", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: "clamp(48px, 8vw, 120px)",
            alignItems: "start",
          }}
            className="faq-grid"
          >
            <Reveal>
              <div style={{ position: "sticky", top: "100px" }}>
                <p style={{
                  fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                  letterSpacing: "0.36em", textTransform: "uppercase",
                  color: "#C9A36A", marginBottom: "16px",
                }}>
                  {t("treatment.faqLabel")}
                </p>
                <h2 style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(34px, 4.5vw, 60px)",
                  fontWeight: 300, color: "#111111",
                  letterSpacing: "-0.01em", lineHeight: 1.05,
                  margin: 0,
                }}>
                  {t("treatment.goodToKnow").split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                </h2>
              </div>
            </Reveal>
            <div>
              <div style={{ borderTop: "1px solid #E8E8E8" }}>
                {(treatment.faq || []).map((item, i) => {
                  const fQ = tc(`faq.${i}.q`) || item.q;
                  const fA = tc(`faq.${i}.a`) || item.a;
                  return (
                  <FAQItem
                    key={item.q}
                    section={{ title: fQ, content: fA }}
                    isOpen={expanded === fQ}
                    onToggle={() => toggle(fQ)}
                  />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 09 — RELATED TREATMENTS  (editorial panels)
        ═══════════════════════════════════════════════════════ */}
        <section style={{ backgroundColor: "#FFFFFF", paddingBottom: "clamp(60px, 8vw, 100px)" }}>
          <div style={{
            padding: "clamp(48px, 8vw, 80px) clamp(24px, 6vw, 100px) clamp(24px, 4vw, 48px)",
            maxWidth: "1360px", margin: "0 auto",
          }}>
            <Reveal>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.36em", textTransform: "uppercase",
                color: "#C9A36A", marginBottom: "12px",
              }}>
                {t("treatment.explore")}
              </p>
              <h2 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(34px, 5vw, 64px)",
                fontWeight: 300, color: "#111111",
                letterSpacing: "-0.01em", lineHeight: 1,
                margin: 0,
              }}>
                {t("treatment.relatedTreatments")}
              </h2>
            </Reveal>
          </div>

          {/* 3-panel editorial grid — slider on mobile, grid on tablet+ */}
          <div className="related-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            height: "clamp(320px, 36vw, 460px)",
          }}>
            {related.map((rt) => {
              const relTitle = t(`treatmentContent.${rt.id}.title`) !== `treatmentContent.${rt.id}.title` ? t(`treatmentContent.${rt.id}.title`) : rt.title;
              const relCat = t(`treatmentContent.${rt.id}.categoryLabel`) !== `treatmentContent.${rt.id}.categoryLabel` ? t(`treatmentContent.${rt.id}.categoryLabel`) : rt.categoryLabel;
              return (
              <Link
                key={rt.id}
                to={`/treatments/${rt.id}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <div style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  backgroundColor: "#111111",
                }}>
                  <motion.img
                    src={rt.heroImage}
                    alt={relTitle}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "50% 20%",
                      display: "block",
                      filter: "brightness(0.75)",
                    }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Text overlay */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "clamp(24px, 4vw, 48px)",
                    background: "linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 100%)",
                  }}>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 400,
                      letterSpacing: "0.28em", textTransform: "uppercase",
                      color: "#C9A36A", marginBottom: "8px",
                    }}>
                      {relCat}
                    </p>
                    <h3 style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(22px, 2.8vw, 36px)",
                      fontWeight: 300, color: "#F8F6F2",
                      letterSpacing: "0.04em", textTransform: "uppercase",
                      lineHeight: 1.1, margin: "0 0 16px",
                    }}>
                      {relTitle}
                    </h3>
                    <span style={{
                      fontFamily: "Inter, sans-serif", fontSize: "9px",
                      fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "rgba(248,246,242,0.6)",
                      display: "inline-flex", alignItems: "center", gap: "8px",
                    }}>
                      {t("treatment.discover")} <ArrowRight size={10} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            )})}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 10 — INTERNATIONAL PATIENT JOURNEY
        ═══════════════════════════════════════════════════════ */}
        <section style={{
          backgroundColor: "#111111",
          padding: "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)",
        }}>
          <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
            <Reveal>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.36em", textTransform: "uppercase",
                color: "rgba(201,163,106,0.85)", marginBottom: "12px",
              }}>
                {t("intlPatient.label")}
              </p>
              <h2 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(34px, 5vw, 64px)",
                fontWeight: 300, color: "#F8F6F2",
                letterSpacing: "-0.01em", lineHeight: 1,
                margin: "0 0 clamp(48px, 8vw, 80px)",
              }}>
                {t("intlPatient.headline")}
              </h2>
            </Reveal>

            {/* 2x2 grid + center image */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "auto auto",
              gap: "1px",
              backgroundColor: "rgba(248,246,242,0.08)",
            }}
              className="journey-intl-grid"
            >
              {/* Row 1 Col 1 */}
              <div style={{ padding: "clamp(36px, 5vw, 60px)", backgroundColor: "#111111" }}>
                <IntlStep num="01" label={t("intlPatient.step1Title")} desc={t("intlPatient.step1Desc")} delay={0} />
              </div>

              {/* Center video spans both rows */}
              <div className="intl-center-col" style={{ gridColumn: 2, gridRow: "1 / 3", overflow: "hidden", minHeight: "400px" }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                >
                  <source src="https://media.base44.com/videos/public/6a271773d45d7fe415b4242b/d6ea1bc9c_istanbul-cityscape-and-bridge-turkey-2026-01-20-15-07-24-utc.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Row 1 Col 3 */}
              <div style={{ padding: "clamp(36px, 5vw, 60px)", backgroundColor: "#111111" }}>
                <IntlStep num="02" label={t("intlPatient.step2Title")} desc={t("intlPatient.step2Desc")} delay={0.1} />
              </div>

              {/* Row 2 Col 1 */}
              <div style={{ padding: "clamp(36px, 5vw, 60px)", backgroundColor: "#111111" }}>
                <IntlStep num="03" label={t("intlPatient.step3Title")} desc={t("intlPatient.step3Desc")} delay={0.15} />
              </div>

              {/* Row 2 Col 3 */}
              <div style={{ padding: "clamp(36px, 5vw, 60px)", backgroundColor: "#111111" }}>
                <IntlStep num="04" label={t("intlPatient.step4Title")} desc={t("intlPatient.step4Desc")} delay={0.2} />
              </div>
            </div>

            {/* Consultation CTA */}
            <Reveal delay={0.35} y={40}>
              <div style={{ textAlign: "center", paddingTop: "clamp(60px, 10vw, 100px)", paddingBottom: "clamp(40px, 6vw, 80px)" }}>
                <Link
                  to="/contact"
                  style={{
                    fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                    letterSpacing: "0.28em", textTransform: "uppercase",
                    color: "#111111", backgroundColor: "#C9A36A",
                    padding: "16px 56px", textDecoration: "none",
                    display: "inline-block",
                    transition: "background-color 0.5s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#111111"; e.currentTarget.style.color = "#C9A36A"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#C9A36A"; e.currentTarget.style.color = "#111111"; }}
                >
                  {t("intlPatient.scheduleBtn")}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SECTION 11 — FINAL CONSULTATION CTA
        ═══════════════════════════════════════════════════════ */}
        <section style={{
          backgroundColor: "#F8F6F2",
          padding: "clamp(100px, 18vw, 220px) clamp(24px, 8vw, 140px)",
          textAlign: "center",
        }}>
          <Reveal>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
              letterSpacing: "0.36em", textTransform: "uppercase",
              color: "#C9A36A", marginBottom: "clamp(24px, 4vw, 40px)",
            }}>
              {t("treatment.drCredit")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(44px, 8vw, 110px)",
              fontWeight: 300, color: "#111111",
              letterSpacing: "-0.02em", lineHeight: 0.93,
              fontStyle: "italic",
              margin: "0 auto clamp(40px, 6vw, 80px)",
              maxWidth: "900px",
            }}>
              {t("treatment.beginTransform").split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "#F8F6F2", backgroundColor: "#111111",
                padding: "18px 56px", textDecoration: "none",
                display: "inline-block",
                transition: "background-color 0.5s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C9A36A"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#111111"; }}
            >
              {t("treatment.scheduleBtn")}
            </Link>
          </Reveal>
        </section>

      </main>
      <Footer />

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          /* Hero 200vh — collapse second half into normal flow on mobile */
          .hero-200vh { height: auto !important; }
          .hero-sticky-bg { position: relative !important; height: 100vw !important; min-height: 260px !important; }
          .hero-first-half { position: relative !important; height: auto !important; padding: 100px 24px 60px !important; background-color: #111111; }
          .hero-first-half h1 { color: #F8F6F2 !important; }
          .hero-first-half p { color: rgba(248,246,242,0.82) !important; }
          .hero-second-half {
            position: relative !important;
            top: auto !important; left: auto !important; right: auto !important;
            height: auto !important;
            grid-template-columns: 1fr !important;
            padding: 48px 24px !important;
            gap: 32px !important;
            background-color: #111111;
          }
          .hero-second-half > div:first-child { max-height: 60vw !important; aspect-ratio: 3/4 !important; }
          .treatment-hero-grid { grid-template-columns: 1fr !important; }
          .treatment-hero-grid > div:last-child { min-height: 60vw !important; order: -1; }
          .overview-grid { grid-template-columns: 1fr !important; }
          .details-row { grid-template-columns: 40px 1fr !important; grid-template-rows: auto auto; }
          .details-row span { grid-column: 1; grid-row: 1; }
          .details-row h3 { grid-column: 2; grid-row: 1; }
          .details-row p { grid-column: 1 / -1; grid-row: 2; }
          .key-results-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .journey-grid { grid-template-columns: 1fr !important; gap: 40px; }
          .journey-line { display: none; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          .related-grid {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            height: auto !important;
            gap: 0 !important;
            padding-left: 24px !important;
          }
          .related-grid::-webkit-scrollbar { display: none; }
          .related-grid a {
            flex: 0 0 82vw !important;
            max-width: 340px !important;
            height: 380px !important;
            scroll-snap-align: start !important;
            margin-right: 12px !important;
          }
          .related-grid a:last-child { margin-right: 24px !important; }
          .journey-intl-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .intl-center-col { grid-column: 1 !important; grid-row: auto !important; min-height: 280px !important; }
        }
      `}</style>
    </>
  );
}