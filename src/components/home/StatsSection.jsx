import Reveal from "../luxury/Reveal";
import Counter from "../luxury/Counter";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function StatsSection() {
  const { t } = useLang();

  const STATS = [
    { value: 17, suffix: "+", label: t("stats.yearsLabel"), desc: t("stats.yearsDesc") },
    { value: 20, suffix: "+", label: t("stats.congressLabel"), desc: t("stats.congressDesc") },
    { value: 4,  suffix: "",  label: t("stats.membLabel"),    desc: t("stats.membDesc") },
    { value: 5,  suffix: "+", label: t("stats.hospLabel"),    desc: t("stats.hospDesc") },
  ];

  return (
    <section style={{ paddingTop: 'clamp(48px, 8vw, 96px)', paddingBottom: 'clamp(48px, 8vw, 96px)', borderTop: '1px solid #E8E8E8' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 6vw, 72px)', fontWeight: 300, lineHeight: 1, color: '#111111', letterSpacing: '-0.02em' }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A36A', marginTop: '12px', marginBottom: '8px' }}>
                  {s.label}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.65, color: '#888888' }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}