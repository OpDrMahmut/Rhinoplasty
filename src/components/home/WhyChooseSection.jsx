import ImageReveal from "../luxury/ImageReveal";
import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import { ShieldCheck, ScanFace, Globe, Gem } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const WHY_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/99540ced0_generated_image.png";

export default function WhyChooseSection() {
  const { t } = useLang();
  const ITEMS = [
    { icon: ShieldCheck, title: t("whyChoose.item1Title"), body: t("whyChoose.item1Body") },
    { icon: ScanFace,   title: t("whyChoose.item2Title"), body: t("whyChoose.item2Body") },
    { icon: Globe,      title: t("whyChoose.item3Title"), body: t("whyChoose.item3Body") },
    { icon: Gem,        title: t("whyChoose.item4Title"), body: t("whyChoose.item4Body") },
  ];

  return (
    <section style={{ paddingTop: '120px', paddingBottom: '120px', backgroundColor: '#F8F6F2' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          <div className="lg:col-span-6">
            <Reveal>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '28px' }}>
                {t("whyChoose.label")}
              </p>
            </Reveal>
            <LineReveal as="h2" lines={[t("whyChoose.headline1"), t("whyChoose.headline2"), t("whyChoose.headline3")]} delay={0.05} stagger={0.1}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 300, lineHeight: 0.96, letterSpacing: '-0.015em', color: '#111111', marginBottom: '52px', }} />
            <div className="space-y-10">
              {ITEMS.map((item, i) => (
                <Reveal key={item.title} delay={0.1 + i * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div style={{ width: '48px', height: '48px', border: '1px solid #E8E8E8', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <item.icon size={18} strokeWidth={1.5} color="#C9A36A" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 400, color: '#111111', marginBottom: '6px', lineHeight: 1.2 }}>{item.title}</h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.75, color: '#777777' }}>{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <ImageReveal src={WHY_IMG} alt="Kliniğimiz — Premium Ortam" wrapperClassName="w-full" style={{ aspectRatio: '4/5' }} delay={0.2} />
            <Reveal delay={0.35}>
              <div style={{ marginTop: '24px', padding: '28px 32px', backgroundColor: '#111111' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontStyle: 'italic', fontWeight: 300, color: '#F8F6F2', lineHeight: 1.4, marginBottom: '16px' }}>
                  "{t("whyChoose.quote")}"
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A36A' }}>
                  Op. Dr. Mahmut Uzut
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}