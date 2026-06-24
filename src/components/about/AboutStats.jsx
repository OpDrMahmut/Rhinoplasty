import Reveal from "../luxury/Reveal";
import Counter from "../luxury/Counter";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function AboutStats() {
  const { t } = useLang();
  const STATS = [
    { value: 17, suffix: "+", label: t("aboutStats.yearsLabel"), desc: t("aboutStats.yearsDesc") },
    { value: 20, suffix: "+", label: t("aboutStats.congLabel"), desc: t("aboutStats.congDesc") },
    { value: 4,  suffix: "",  label: t("aboutStats.membLabel"), desc: t("aboutStats.membDesc") },
    { value: 5,  suffix: "+", label: t("aboutStats.hospLabel"), desc: t("aboutStats.hospDesc") },
  ];
  return (
    <section style={{ backgroundColor: "#111111", padding: "clamp(72px, 10vw, 120px) 0" }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ borderTop: "1px solid rgba(248,246,242,0.12)", paddingTop: "28px" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(52px, 6vw, 76px)", fontWeight: 300, lineHeight: 1, color: "#F8F6F2", letterSpacing: "-0.02em" }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A36A", marginTop: "14px", marginBottom: "10px" }}>{s.label}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.65, color: "rgba(248,246,242,0.4)" }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}