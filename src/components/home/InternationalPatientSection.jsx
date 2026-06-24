import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "../luxury/Reveal";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function InternationalPatientSection() {
  const { t } = useLang();
  const STEPS = [
    { label: t("intlPatient.step1Title"), desc: t("intlPatient.step1Desc") },
    { label: t("intlPatient.step2Title"), desc: t("intlPatient.step2Desc") },
    { label: t("intlPatient.step3Title"), desc: t("intlPatient.step3Desc") },
    { label: t("intlPatient.step4Title"), desc: t("intlPatient.step4Desc") },
  ];
  return (
    <section style={{
      backgroundColor: "#111111",
      padding: "clamp(100px, 14vw, 160px) clamp(24px, 6vw, 100px) clamp(80px, 12vw, 140px)",
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

        {/* Desktop: 3-col grid with center image. Mobile: single column */}
        <div className="intl-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "1px",
          backgroundColor: "rgba(248,246,242,0.08)",
        }}>
          {/* Row 1, Col 1 */}
          <div style={{ padding: "clamp(36px, 5vw, 60px)", backgroundColor: "#111111" }}>
            <StepCard step={STEPS[0]} num="01" delay={0} />
          </div>

          {/* Center video — spans both rows */}
          <div className="intl-center-img" style={{
            gridColumn: 2,
            gridRow: "1 / 3",
            overflow: "hidden",
            minHeight: "400px",
          }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
                display: "block",
              }}
            >
              <source src="https://media.base44.com/videos/public/6a271773d45d7fe415b4242b/d6ea1bc9c_istanbul-cityscape-and-bridge-turkey-2026-01-20-15-07-24-utc.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Row 1, Col 3 */}
          <div style={{ padding: "clamp(36px, 5vw, 60px)", backgroundColor: "#111111" }}>
            <StepCard step={STEPS[1]} num="02" delay={0.1} />
          </div>

          {/* Row 2, Col 1 */}
          <div style={{ padding: "clamp(36px, 5vw, 60px)", backgroundColor: "#111111" }}>
            <StepCard step={STEPS[2]} num="03" delay={0.15} />
          </div>

          {/* Row 2, Col 3 */}
          <div style={{ padding: "clamp(36px, 5vw, 60px)", backgroundColor: "#111111" }}>
            <StepCard step={STEPS[3]} num="04" delay={0.2} />
          </div>
        </div>

        {/* Consultation CTA */}
        <Reveal delay={0.35} y={40}>
          <div style={{ textAlign: "center", paddingTop: "clamp(60px, 10vw, 100px)" }}>
            <Link
              to="/contact"
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: "#111111", backgroundColor: "#C9A36A",
                padding: "16px 56px", textDecoration: "none",
                display: "inline-block",
                transition: "background-color 0.5s ease, color 0.5s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#F8F6F2"; e.currentTarget.style.color = "#111111"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#C9A36A"; e.currentTarget.style.color = "#111111"; }}
            >
              {t("intlPatient.scheduleBtn")}
            </Link>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .intl-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .intl-center-img {
            grid-column: 1 !important;
            grid-row: auto !important;
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}

function StepCard({ step, num, delay }) {
  return (
    <Reveal delay={delay}>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 400,
        letterSpacing: "0.28em", textTransform: "uppercase",
        color: "#C9A36A", marginBottom: "16px",
      }}>
        {num}
      </p>
      <h3 style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "clamp(20px, 2.5vw, 30px)",
        fontWeight: 300, color: "#F8F6F2",
        letterSpacing: "0.01em", fontStyle: "italic",
        margin: "0 0 14px", lineHeight: 1.1,
      }}>
        {step.label}
      </h3>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: "13px",
        fontWeight: 300, lineHeight: 1.85,
        color: "rgba(248,246,242,0.55)", margin: 0,
      }}>
        {step.desc}
      </p>
    </Reveal>
  );
}