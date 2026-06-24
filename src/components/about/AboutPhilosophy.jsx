import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import ImageReveal from "../luxury/ImageReveal";
import { useLang } from "@/lib/i18n/LanguageContext";


const PHILOSOPHY_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/db33eb2c1_unnamed2.webp";

const PILLARS = ["01", "02", "03", "04"];

export default function AboutPhilosophy() {
  const { t } = useLang();
  const pillars = [
    { number: "01", title: t("aboutPhilosophy.pillar1Title"), desc: t("aboutPhilosophy.pillar1Desc") },
    { number: "02", title: t("aboutPhilosophy.pillar2Title"), desc: t("aboutPhilosophy.pillar2Desc") },
    { number: "03", title: t("aboutPhilosophy.pillar3Title"), desc: t("aboutPhilosophy.pillar3Desc") },
    { number: "04", title: t("aboutPhilosophy.pillar4Title"), desc: t("aboutPhilosophy.pillar4Desc") },
  ];
  return (
    <section style={{ backgroundColor: "#F8F6F2", padding: "clamp(80px, 12vw, 160px) 0" }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
          <div>
            <Reveal>
              <p style={{
                fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A36A",
                marginBottom: "28px",
              }}>
                {t("aboutPhilosophy.tag")}
              </p>
            </Reveal>
            <LineReveal
              as="h2"
              lines={[t("aboutPhilosophy.headline1"), t("aboutPhilosophy.headline2")]}
              delay={0.05}
              stagger={0.1}
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(38px, 5vw, 66px)",
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "-0.015em",
                color: "#111111",
              }}
            />
          </div>
          <Reveal delay={0.2}>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 300,
              lineHeight: 1.85, color: "#666666",
            }}>
              {t("aboutPhilosophy.body")}
            </p>
          </Reveal>
        </div>

        {/* Two-column layout: pillars + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* Pillars */}
          <div className="space-y-0">
            {pillars.map((p, i) => (
              <Reveal key={p.number} delay={i * 0.1}>
                <div style={{
                  borderTop: "1px solid #E8E8E8",
                  padding: "28px 0",
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: "24px",
                  alignItems: "start",
                }}>
                  <p style={{
                    fontFamily: "Cormorant Garamond, serif", fontSize: "13px", fontWeight: 300,
                    color: "#C9A36A", letterSpacing: "0.1em", paddingTop: "4px",
                  }}>
                    {p.number}
                  </p>
                  <div>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 400,
                      letterSpacing: "0.18em", textTransform: "uppercase", color: "#111111",
                      marginBottom: "10px",
                    }}>
                      {p.title}
                    </p>
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 300,
                      lineHeight: 1.75, color: "#777777",
                    }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid #E8E8E8" }} />
          </div>

          {/* Image */}
          <div className="lg:pt-4">
            <ImageReveal
              src={PHILOSOPHY_IMG}
              alt="Surgical philosophy"
              wrapperClassName="w-full img-hover-container"
              style={{ aspectRatio: "3/4" }}
              delay={0.1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}