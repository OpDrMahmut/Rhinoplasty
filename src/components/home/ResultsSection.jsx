import Reveal from "../luxury/Reveal";
import ImageReveal from "../luxury/ImageReveal";
import LineReveal from "../luxury/LineReveal";
import { useLang } from "@/lib/i18n/LanguageContext";

const IMGS = [
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/1ff144da9_unnamed1.webp", alt: "Patient result — natural rhinoplasty", ratio: "3/4" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/db33eb2c1_unnamed2.webp", alt: "Patient result — profile view", ratio: "1/1" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/7100ca265_unnamed3.webp", alt: "Patient result — refined profile", ratio: "4/5" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/c868e179c_unnamed5.webp", alt: "Patient result — elegant transformation", ratio: "1/1" },
];

export default function ResultsSection() {
  const { t } = useLang();
  return (
    <section id="results" style={{ paddingTop: '120px', paddingBottom: '120px', backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="flex flex-col md:flex-row md:items-end gap-8 mb-20">
          <div className="flex-1">
            <Reveal>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '20px' }}>
                {t("results.label")}
              </p>
            </Reveal>
            <LineReveal as="h2" lines={[t("results.headline1"), t("results.headline2")]} delay={0.05} stagger={0.1}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 300, lineHeight: 0.96, letterSpacing: '-0.015em', color: '#111111' }} />
          </div>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: '#777777', maxWidth: '340px' }}>
              {t("results.body")}
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-6">
          <div className="space-y-5">
            <ImageReveal src={IMGS[0].src} alt={IMGS[0].alt} wrapperClassName="w-full img-hover-container" style={{ aspectRatio: '3/4' }} delay={0} />
            <ImageReveal src={IMGS[1].src} alt={IMGS[1].alt} wrapperClassName="w-full img-hover-container" style={{ aspectRatio: '1/1' }} delay={0.15} />
          </div>
          <div className="space-y-5 md:mt-20">
            <ImageReveal src={IMGS[2].src} alt={IMGS[2].alt} wrapperClassName="w-full img-hover-container" style={{ aspectRatio: '4/5' }} delay={0.1} />
            <Reveal delay={0.25}>
              <div style={{ backgroundColor: '#F8F6F2', padding: '36px 32px' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '52px', fontWeight: 300, color: '#111111', lineHeight: 1 }}>
                  98<span style={{ color: '#C9A36A' }}>%</span>
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginTop: '10px', marginBottom: '8px' }}>
                  {t("results.satisfactionLabel")}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.65, color: '#888888' }}>
                  {t("results.satisfactionDesc")}
                </p>
              </div>
            </Reveal>
          </div>
          <div className="space-y-5">
            <Reveal delay={0.05}>
              <div style={{ backgroundColor: '#111111', padding: '44px 36px', marginBottom: '0' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontStyle: 'italic', fontWeight: 300, color: '#F8F6F2', lineHeight: 1.45, marginBottom: '20px' }}>
                  "{t("results.testimonial")}"
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A36A' }}>
                  {t("results.testimonialName")}
                </p>
              </div>
            </Reveal>
            <ImageReveal src={IMGS[3].src} alt={IMGS[3].alt} wrapperClassName="w-full img-hover-container" style={{ aspectRatio: '4/5' }} delay={0.18} />
          </div>
        </div>
      </div>
    </section>
  );
}