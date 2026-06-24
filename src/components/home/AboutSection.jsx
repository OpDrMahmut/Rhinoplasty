import ImageReveal from "../luxury/ImageReveal";
import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const DOC_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/f69ec074d_image.png";
const CLINIC_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/2a5c6470f_image.png";

export default function AboutSection() {
  const { t } = useLang();
  return (
    <section id="about" style={{ paddingTop: 'clamp(64px, 10vw, 120px)', paddingBottom: 'clamp(64px, 10vw, 120px)', backgroundColor: '#F8F6F2' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">

        {/* Eyebrow */}
        <Reveal>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '64px' }}>
            {t("aboutSection.label")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">

          {/* LEFT — images stacked */}
          <div className="lg:col-span-5 space-y-5">
            <ImageReveal
              src={DOC_IMG}
              alt="Op. Dr. Mahmut Uzut"
              wrapperClassName="w-full"
              style={{ aspectRatio: '4/5' }}
              delay={0}
            />
            
          </div>

          {/* RIGHT — text */}
          <div className="lg:col-span-7">

            <LineReveal
              as="h2"
              lines={[t("aboutSection.headline1") + ",", t("aboutSection.headline2") + ","]}
              delay={0}
              stagger={0.1}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(38px, 5vw, 64px)',
                fontWeight: 300,
                lineHeight: 0.96,
                letterSpacing: '-0.015em',
                color: '#111111',
                marginBottom: '40px',
              }}
            />

            <Reveal delay={0.2}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: '#555555', marginBottom: '28px' }}>
                 {t("aboutSection.bio")}
               </p>
               <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: 1.8, color: '#555555' }}>
                 {t("aboutSection.bio2")}
               </p>
            </Reveal>

            {/* Credentials grid */}
            <Reveal delay={0.35}>
              <div className="grid grid-cols-2 gap-8 mt-12 pt-10" style={{ borderTop: '1px solid #E8E8E8' }}>
                {[
                  [t("aboutSection.specialisations"), 'Rhinoplasty · Otoplasty · Blepharoplasty · Facelift · Lip Lifting · Genioplasty'],
                  [t("aboutSection.memberships"), 'Turkish Medical Association · Turkish Otolaryngology Foundation · Association of Otorhinolaryngology–Head and Neck Surgery Specialists · Turkish Facial Plastic Surgery Society'],
                  [t("aboutSection.education"), 'Dokuz Eylul University (2007) · Bakırköy Dr. Sadi Konuk Education & Research Hospital'],
                  [t("aboutSection.languages"), 'Turkish · English'],
                ].map(([title, value]) => (
                  <div key={title}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '8px' }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: '#444444' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.45}>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 group mt-12"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#111111',
                  textDecoration: 'none',
                  paddingBottom: '4px',
                  borderBottom: '1px solid #111111',
                  transition: 'color 0.4s, border-color 0.4s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C9A36A'; e.currentTarget.style.borderColor = '#C9A36A'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#111111'; e.currentTarget.style.borderColor = '#111111'; }}
              >
                {t("aboutSection.learnMore")}
                <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}