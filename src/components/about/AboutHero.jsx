import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n/LanguageContext";

const HERO_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/3bb476516_unnamed.webp";

export default function AboutHero() {
  const { t } = useLang();
  return (
    <section className="about-hero-section" style={{ position: "relative", height: "100vh", overflow: "hidden", backgroundColor: "#111111" }}>
      {/* Background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.88) 100%)",
      }} />

      {/* Content */}
      <div className="about-hero-content" style={{
        position: "relative", zIndex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(24px, 6vw, 96px) clamp(56px, 10vh, 100px)",
        maxWidth: "1520px",
        margin: "0 auto",
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#C9A36A",
            marginBottom: "20px",
          }}
        >
          {t("aboutHero.tag")}
        </motion.p>

        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(52px, 8vw, 110px)",
              fontWeight: 300,
              color: "#F8F6F2",
              lineHeight: 0.93,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Op. Dr.
          </motion.h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(52px, 8vw, 110px)",
              fontWeight: 300,
              color: "#F8F6F2",
              lineHeight: 0.93,
              letterSpacing: "-0.02em",
              margin: "0 0 32px",
            }}
          >
            Mahmut Uzut
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <div style={{ width: "40px", height: "1px", backgroundColor: "#C9A36A" }} />
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(248,246,242,0.6)",
          }}>
            {t("aboutHero.subtitle")}
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-hero-section {
            height: 100vh !important;
            min-height: unset !important;
          }
          .about-hero-content {
            justify-content: flex-end !important;
            padding-top: 80px !important;
            padding-bottom: clamp(40px, 6vh, 72px) !important;
          }
        }
      `}</style>
    </section>
  );
}