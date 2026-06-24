import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const HERO_IMAGE = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/2b1f1835a_DSC07963.jpg";

const item = (delay) => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function HeroSection({ loaded }) {
  const { t } = useLang();
  const state = loaded ? "visible" : "hidden";

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#FFFFFF', minHeight: 'auto' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16 lg:h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center pt-32 pb-20 lg:pt-20 lg:pb-0">

          {/* ─── LEFT CONTENT ─── */}
          <div className="lg:col-span-6 xl:col-span-5 relative z-10">

            {/* Eyebrow */}
            <div className="overflow-hidden mb-8">
              <motion.p
                variants={item(2.4)}
                initial="hidden"
                animate={state}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#C9A36A',
                }}
              >
                {t("hero.eyebrow")}
              </motion.p>
            </div>

            {/* Main headline — trevidic style, huge, light weight */}
            {[
              t("hero.line1"),
              t("hero.line2"),
              t("hero.line3"),
            ].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  variants={item(2.55 + i * 0.1)}
                  initial="hidden"
                  animate={state}
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(52px, 7.5vw, 96px)',
                    fontWeight: 300,
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    color: '#111111',
                    display: 'block',
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}

            {/* Body copy */}
            <div className="overflow-hidden mt-8">
              <motion.p
                variants={item(2.9)}
                initial="hidden"
                animate={state}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: '#666666',
                  maxWidth: '420px',
                }}
              >
                {t("hero.body")}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              variants={item(3.05)}
              initial="hidden"
              animate={state}
              className="flex flex-col sm:flex-row items-start gap-5 mt-10"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 group"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#F8F6F2',
                  backgroundColor: '#111111',
                  padding: '16px 36px',
                  textDecoration: 'none',
                  transition: 'background-color 0.5s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C9A36A'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#111111'}
              >
                {t("hero.bookBtn")}
                <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
              <Link
                to="/treatments"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#111111',
                  textDecoration: 'none',
                  paddingBottom: '3px',
                  borderBottom: '1px solid #111111',
                  transition: 'color 0.4s, border-color 0.4s',
                  alignSelf: 'center',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C9A36A'; e.currentTarget.style.borderColor = '#C9A36A'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#111111'; e.currentTarget.style.borderColor = '#111111'; }}
              >
                {t("hero.treatments")}
              </Link>
            </motion.div>
          </div>

          {/* ─── RIGHT IMAGE — hidden on mobile ─── */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7 relative">
            {/* Small decorative label */}
            <motion.p
              variants={item(3.1)}
              initial="hidden"
              animate={state}
              className="absolute -left-2 top-1/4 hidden xl:block"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                fontWeight: 300,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A36A',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              {t("hero.sideLabel")}
            </motion.p>

            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
              animate={loaded ? { clipPath: "inset(0% 0 0 0)", scale: 1 } : {}}
              transition={{ duration: 1.6, delay: 2.15, ease: [0.76, 0, 0.24, 1] }}
              className="img-hover-container"
              style={{
                height: 'clamp(460px, 72vh, 780px)',
                marginLeft: 'auto',
                maxWidth: '680px',
              }}
            >
              <img
                src={HERO_IMAGE}
                alt="Rhinoplasty result — elegant and natural profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              variants={item(3.2)}
              initial="hidden"
              animate={state}
              style={{
                position: 'absolute',
                bottom: '8%',
                left: '-5%',
                backgroundColor: '#111111',
                padding: '20px 28px',
                minWidth: '200px',
              }}
            >
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '38px', fontWeight: 300, color: '#F8F6F2', lineHeight: 1 }}>
                17<span style={{ color: '#C9A36A' }}>+</span>
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.5)', marginTop: '6px' }}>
                {t("hero.yearsLabel")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}