import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/LanguageContext";

const BG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/b24a25d1f_woman-posing-with-hand-near-face-2026-01-07-00-56-26-utc.jpg";

const item = (delay) => ({
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function ContactHero() {
  const { t } = useLang();
  return (
    <section style={{ position: 'relative', minHeight: '80vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
      {/* BG */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <img src={BG} alt="Klinik" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.4) 50%, rgba(17,17,17,0.15) 100%)' }} />
      </motion.div>

      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16 w-full relative z-10 pb-20 pt-40">
        <motion.p
          variants={item(0.4)}
          initial="hidden"
          animate="visible"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '24px' }}
        >
          {t("contactHero.tag")}
        </motion.p>

        {[t("contactHero.line1"), t("contactHero.line2")].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h1
              variants={item(0.55 + i * 0.1)}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: '#F8F6F2',
              }}
            >
              {line}
            </motion.h1>
          </div>
        ))}

        <motion.p
          variants={item(0.8)}
          initial="hidden"
          animate="visible"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 300, lineHeight: 1.75, color: 'rgba(248,246,242,0.65)', maxWidth: '460px', marginTop: '28px' }}
        >
          {t("contactHero.body")}
        </motion.p>
      </div>
    </section>
  );
}