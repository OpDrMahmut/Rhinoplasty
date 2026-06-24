import AnimatedSection from "../luxury/AnimatedSection";
import Counter from "../luxury/Counter";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function TrustSection() {
  const { t } = useLang();
  const stats = [
    { value: 17, suffix: "+", label: t("stats.yearsLabel"), description: t("stats.yearsDesc") },
    { value: 20, suffix: "+", label: t("stats.congressLabel"), description: t("stats.congressDesc") },
    { value: 4,  suffix: "",  label: t("stats.membLabel"),    description: t("stats.membDesc") },
    { value: 5,  suffix: "+", label: t("stats.hospLabel"),    description: t("stats.hospDesc") },
  ];
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <AnimatedSection>
          <div className="border-t border-border pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-10">
              {stats.map((stat, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="text-center lg:text-left">
                    <span className="font-display text-section font-light text-foreground"><Counter end={stat.value} suffix={stat.suffix} /></span>
                    <h3 className="text-caption uppercase text-accent mt-4 tracking-widest">{stat.label}</h3>
                    <p className="text-body text-muted-foreground mt-3 leading-relaxed">{stat.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}