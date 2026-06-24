import Reveal from "../luxury/Reveal";
import { useLang } from "@/lib/i18n/LanguageContext";

const CONGRESSES = [
  "7th International Conference on Acoustic Neuroma (April 12-15, 2015)",
  "Bakırköy Medical Days \"New Techniques and Technologies\" Congress (April 23-24, 2010)",
  "III. National Otology and Neurotology Congress (May 1-4, 2014)",
  "Istanbul ENT-BBC Specialists Association 3rd Congress & Expo (April 8-9, 2011)",
  "34th Turkish National ENT and Head and Neck Surgery Congress (October 10-14, 2012)",
  "18th Istanbul Masterclass Symposium (December 15-18, 2011)",
  "Rhinoplasty School (March 5-6, 2016)",
  "Practical Approach to Vertigo-2 (December 10, 2011)",
  "10th Turkish Rhinology Congress (May 22-25, 2014)",
  "21st Istanbul Masterclass Symposium (December 13-14, 2012)",
  "36th Turkish National ENT and Head and Neck Surgery Congress (November 5-9, 2014)",
  "41st Turkish National ENT and Head and Neck Surgery Congress (November 13-17, 2019)",
  "Rhinoplasty School Live Surgery Programme (April 8-9, 2017)",
  "6th National Rhinology Congress Allergy Course (May 19-23, 2010)",
  "11th Turkish Rhinology Congress (April 16-19, 2015)",
  "Rhinoplasty Course (November 26, 2011)",
  "Vertigo Seminar IV Meeting (March 17, 2012)",
  "Treatment of Vertigo Meeting (March 24, 2012)",
  "1st National Otology and Neurotology Congress (May 12-16, 2010)",
  "Istanbul ENT-BBC Specialists Association 2nd Congress SKYBD Workshop (June 4-6, 2010)",
];

export default function AboutCongresses() {
  const { t } = useLang();
  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(72px, 10vw, 120px) 0" }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <Reveal>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A36A", marginBottom: "16px" }}>
            {t("aboutCongresses.label")}
          </p>
          <h2 style={{
            fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(34px, 4.5vw, 60px)",
            fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 1, margin: "0 0 clamp(48px, 6vw, 72px)",
          }}>
            {t("aboutCongresses.headline")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
          {CONGRESSES.map((item, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div style={{
                display: "flex", alignItems: "flex-start", gap: "16px",
                padding: "14px 0", borderBottom: "1px solid #F0EEEA",
              }}>
                <span style={{
                  fontFamily: "Cormorant Garamond, serif", fontSize: "14px", fontWeight: 300,
                  color: "#C9A36A", minWidth: "28px", paddingTop: "1px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{
                  fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 300,
                  lineHeight: 1.6, color: "#444444", margin: 0,
                }}>
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}