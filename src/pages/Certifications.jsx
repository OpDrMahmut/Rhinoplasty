import { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "../components/luxury/Navigation";
import Footer from "../components/luxury/Footer";
import { useLang } from "@/lib/i18n/LanguageContext";

const CERTIFICATES = [
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/21e25cf86_image.png", alt: "Temporal Bone Dissection Course on Cadaver Heads — January 30, 2016, Vienna", title: "Temporal Bone Dissection Course on Cadaver Heads", date: "30 Ocak 2016" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/57f04a2d8_image.png", alt: "Video Head Impulse ve VEMP Testlerinin Pratik Yaklaşım Kursu — 12 Mart 2016", title: "Video Head Impulse ve VEMP Testlerinin Pratik Yaklaşım Kursu", date: "12 Mart 2016" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/587086132_image.png", alt: "Rhinoplasty School Katılım Belgesi — 05-06 Mart 2016", title: "Rhinoplasty School", date: "05-06 Mart 2016" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/9b43017a8_image.png", alt: "11. Türk Rinoloji Kongresi Katılım Sertifikası — 16-19 Nisan 2015", title: "11. Türk Rinoloji Kongresi", date: "16-19 Nisan 2015" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/d95c3dd71_image.png", alt: "Rhinoplasty School Live Surgery Programme — April 8-9, 2017", title: "Rhinoplasty School Live Surgery Programme", date: "8-9 Nisan 2017" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/e300f72e3_image.png", alt: "Certificate in Medical Aesthetics Training — Botulinum Toxin A Level 1", title: "Certificate in Medical Aesthetics Training Botulinum Toxin A Level 1", date: "30 Eylül 2018" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/1d7a96169_image.png", alt: "Certificate in Medical Aesthetics Training — Dermal Fillers Level 1", title: "Certificate in Medical Aesthetics Training Dermal Fillers Level 1", date: "30 Eylül 2018" },
  { src: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/1514705e1_image.png", alt: "Certificate in Medical Aesthetics Training — Botulinum Toxin A Level 2", title: "Certificate in Medical Aesthetics Training Botulinum Toxin A Level 2", date: "30 Eylül 2018" },
];

export default function Certifications() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <Navigation loaded={true} darkHero={true} />
      <main style={{ backgroundColor: "#FFFFFF", paddingTop: "120px" }}>
        {/* Header */}
        <section style={{ padding: "clamp(60px, 8vw, 100px) clamp(24px, 6vw, 100px) clamp(40px, 6vw, 72px)" }}>
          <div style={{ maxWidth: "1520px", margin: "0 auto" }}>
            <Link
              to="/about"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#888888",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "32px",
                transition: "color 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#C9A36A"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#888888"; }}
            >
              <ArrowLeft size={12} strokeWidth={1.5} /> {t("certifications.backToAbout")}
            </Link>

            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A36A",
              marginBottom: "16px",
            }}>
              {t("certifications.label")}
            </p>
            <h1 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 300,
              color: "#111111",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              margin: 0,
            }}>
              {t("certifications.headline")}
            </h1>
          </div>
        </section>

        {/* Certificates Grid */}
        <section style={{ padding: "0 clamp(24px, 6vw, 100px) clamp(80px, 10vw, 120px)" }}>
          <div style={{ maxWidth: "1520px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CERTIFICATES.map((cert, i) => (
                <motion.button
                  key={i}
                  onClick={() => setLightbox(i)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: "none",
                    border: "1px solid #E8E8E8",
                    cursor: "pointer",
                    padding: 0,
                    width: "100%",
                    textAlign: "left",
                    backgroundColor: "#FFFFFF",
                    overflow: "hidden",
                    transition: "border-color 0.4s, box-shadow 0.4s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A36A"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ overflow: "hidden", aspectRatio: "4/3" }}>
                    <img
                      src={cert.src}
                      alt={cert.alt}
                      style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center top",
                        display: "block",
                        transition: "transform 0.6s ease",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                    />
                  </div>
                  <div style={{ padding: "16px 18px" }}>
                    <p style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: 400,
                      color: "#111111",
                      lineHeight: 1.5,
                      marginBottom: "6px",
                    }}>
                      {cert.title}
                    </p>
                    <p style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: 300,
                      color: "#999999",
                      letterSpacing: "0.08em",
                    }}>
                      {cert.date}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              backgroundColor: "rgba(0,0,0,0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(24px, 6vw, 80px)",
              cursor: "pointer",
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "none",
                border: "none",
                cursor: "pointer",
                zIndex: 1000,
              }}
            >
              <X size={28} color="#FFFFFF" strokeWidth={1} />
            </button>
            <img
              src={CERTIFICATES[lightbox].src}
              alt={CERTIFICATES[lightbox].alt}
              style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain" }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(p => (p > 0 ? p - 1 : CERTIFICATES.length - 1)); }}
              style={{
                position: "absolute",
                left: 24,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#FFFFFF",
                fontSize: "40px",
                fontWeight: 200,
              }}
            >‹</button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(p => (p < CERTIFICATES.length - 1 ? p + 1 : 0)); }}
              style={{
                position: "absolute",
                right: 24,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#FFFFFF",
                fontSize: "40px",
                fontWeight: 200,
              }}
            >›</button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}