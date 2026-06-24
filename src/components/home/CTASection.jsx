import { Link } from "react-router-dom";
import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import { ArrowRight } from "lucide-react";
import ImageReveal from "../luxury/ImageReveal";
import { useLang } from "@/lib/i18n/LanguageContext";

const BG_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/d0bb42e92_woman-posing-with-hand-near-face-2026-01-07-00-56-26-utc.jpg";

export default function CTASection() {
  const { t } = useLang();
  return (
    <section style={{ backgroundColor: '#111111', paddingTop: 'clamp(72px, 12vw, 140px)', paddingBottom: 'clamp(72px, 12vw, 140px)', position: 'relative', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.28 }}>
        <ImageReveal
          src={BG_IMG}
          alt=""
          wrapperClassName="w-full h-full"
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%' }}
          delay={0}
          duration={1.8}
        />
      </div>

      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16 relative z-10 text-center">
        <Reveal>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '32px' }}>
            {t("ctaSection.tag")}
          </p>
        </Reveal>

        <LineReveal
          as="h2"
          lines={[t("ctaSection.headline1"), t("ctaSection.headline2")]}

          delay={0.1}
          stagger={0.1}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#F8F6F2',
            marginBottom: '36px',
          }}
        />

        <Reveal delay={0.3}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: 'rgba(248,246,242,0.55)', maxWidth: '460px', margin: '0 auto 52px' }}>
            {t("ctaSection.body")}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#111111',
              backgroundColor: '#F8F6F2',
              padding: '18px 44px',
              textDecoration: 'none',
              transition: 'background-color 0.5s, color 0.5s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C9A36A'; e.currentTarget.style.color = '#F8F6F2'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F8F6F2'; e.currentTarget.style.color = '#111111'; }}
          >
            {t("ctaSection.btn")}
            <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}