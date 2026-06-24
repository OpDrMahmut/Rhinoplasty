import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function TreatmentContent({ treatment }) {
  const { t } = useLang();
  return (
    <section style={{ backgroundColor: "#F8F6F2", padding: "clamp(64px, 10vw, 120px) clamp(24px, 6vw, 80px)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center", marginBottom: "clamp(48px, 8vw, 100px)" }}>
          <div>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 1.05, marginBottom: "clamp(24px, 4vw, 44px)", fontStyle: "italic" }}>
              {t("treatmentContent.questions")}
            </h2>
            <Link to="/contact" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "#111111", textDecoration: "none", borderBottom: "1px solid #111111", paddingBottom: "3px", display: "inline-flex", alignItems: "center", gap: "8px" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#C9A36A"; e.currentTarget.style.borderBottomColor = "#C9A36A"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#111111"; e.currentTarget.style.borderBottomColor = "#111111"; }}>
              {t("treatmentContent.contactUs")} <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </div>
          <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={treatment.heroImage} alt={treatment.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              className="transition-transform duration-1200" />
          </div>
        </div>
        <div style={{ borderTop: "1px solid #E8E8E8", marginBottom: "clamp(32px, 5vw, 56px)" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A36A", marginBottom: "16px" }}>
            {t("treatmentContent.doctorCredit")}
          </p>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, color: "#444444", lineHeight: 1.5, maxWidth: "560px", margin: "0 auto 32px" }}>
            {t("treatmentContent.beginJourney")}
          </p>
          <Link to="/contact" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F8F6F2", backgroundColor: "#111111", padding: "16px 40px", textDecoration: "none", display: "inline-block" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C9A36A"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#111111"; }}>
            {t("treatmentContent.bookBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}