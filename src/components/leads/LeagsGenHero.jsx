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
                variants={item(1.9)}
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

              <div className="overflow-hidden">
                <motion.h1
                 
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
                  Discover If Rhinoplasty Is Right for You.
                </motion.h1>
              </div>
        

            {/* Body copy */}
            <div className="overflow-hidden mt-8">
              <motion.p
                variants={item(1.9)}
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
              >Complete our quick consultation form to receive a personalized assessment from our rhinoplasty specialists. Learn about your treatment options, expected results, recovery process, and whether you're a suitable candidate—all with no obligation.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              variants={item(1.05)}
              initial="hidden"
              animate={state}
              className="flex flex-col sm:flex-row items-start gap-5 mt-10"
            >
              <Link
                to="https://form.typeform.com/to/BzSfGnzm"
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
                START SERVEY
                <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>

          {/* ─── RIGHT IMAGE — hidden on mobile ─── */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7 relative">
            

            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
              animate={loaded ? { clipPath: "inset(0% 0 0 0)", scale: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
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

          </div>
        </div>
      </div>

    </section>
  );
}