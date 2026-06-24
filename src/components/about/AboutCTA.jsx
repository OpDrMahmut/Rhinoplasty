import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import ImageReveal from "../luxury/ImageReveal";
import { useLang } from "@/lib/i18n/LanguageContext";

const CTA_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/977198677_image.png";

export default function AboutCTA() {
  const { t } = useLang();
  return (
    <section style={{ backgroundColor: "#111111", padding: "clamp(80px, 12vw, 140px) 0", overflow: "hidden" }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* LEFT — text */}
          <div>
            <Reveal>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A36A",
                marginBottom: "28px",
              }}>
                {t("aboutCta.tag")}
              </p>
            </Reveal>

            <LineReveal
              as="h2"
              lines={[t("aboutCta.headline1"), t("aboutCta.headline2")]}
              delay={0.05}
              stagger={0.1}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 5vw, 62px)",
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "-0.015em",
                color: "#F8F6F2",
                marginBottom: "36px",
              }}
            />

            <Reveal delay={0.25}>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 300,
                lineHeight: 1.85, color: "rgba(248,246,242,0.55)",
                maxWidth: "440px", marginBottom: "44px",
              }}>
                {t("aboutCta.body")}
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
                <Link
                  to="/contact"
                  style={{
                    fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "#111111", backgroundColor: "#F8F6F2",
                    padding: "16px 36px", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    transition: "background-color 0.5s ease, color 0.5s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C9A36A"; e.currentTarget.style.color = "#F8F6F2"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#F8F6F2"; e.currentTarget.style.color = "#111111"; }}
                >
                  {t("aboutCta.bookBtn")}
                  <ArrowRight size={12} strokeWidth={1.5} />
                </Link>
                <Link
                  to="/treatments"
                  style={{
                    fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "rgba(248,246,242,0.6)", textDecoration: "none",
                    borderBottom: "1px solid rgba(248,246,242,0.3)", paddingBottom: "3px",
                    transition: "color 0.4s, border-color 0.4s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#C9A36A"; e.currentTarget.style.borderColor = "#C9A36A"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(248,246,242,0.6)"; e.currentTarget.style.borderColor = "rgba(248,246,242,0.3)"; }}
                >
                  {t("aboutCta.viewTreatments")}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — image */}
          <div>
            <ImageReveal
              src={CTA_IMG}
              alt="Patient result"
              wrapperClassName="w-full img-hover-container"
              style={{ aspectRatio: "4/5" }}
              delay={0.15}
            />
          </div>
        </div>
      </div>
    </section>
  );
}