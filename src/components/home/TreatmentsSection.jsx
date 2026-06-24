import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const TREATMENT_CARDS = [
  {
    num: "01",
    id: "rhinoplasty",
    path: "/treatments/rhinoplasty",
    img: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/099f0e33a_Septoplasty.png",
  },
  {
    num: "02",
    id: "septoplasty",
    path: "/treatments/septoplasty",
    img: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/6ff2c5841_piezo-rhinoplasty.png",
  },
  {
    num: "03",
    id: "tip-rhinoplasty",
    path: "/treatments/tip-rhinoplasty",
    img: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/70066f86a_nasal-tip-surgery.png",
  },
  {
    num: "04",
    id: "facelift",
    path: "/treatments/facelift",
    img: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/f7d09d3a0_facial-surgery.png",
  },
  {
    num: "05",
    id: "botox",
    path: "/treatments/botox",
    img: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/f5d80e404_botox.png",
  },
  {
    num: "06",
    id: "lip-fillers",
    path: "/treatments/lip-fillers",
    img: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/8ecc2dce7_lip-augmentation-procedure-on-adult-woman-s-face-2026-01-07-01-25-44-utc.jpg",
  },
];

function TreatmentCard({ card, i, t }) {
  const [hovered, setHovered] = useState(false);
  const title = t(`homeCards.${card.id}.title`);
  const subtitle = t(`homeCards.${card.id}.subtitle`);
  const desc = t(`homeCards.${card.id}.desc`);

  return (
    <Reveal delay={i * 0.08}>
      <Link to={card.path} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ backgroundColor: '#FFFFFF', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        >
          {/* Image */}
          <div className="overflow-hidden" style={{ aspectRatio: '4/3', position: 'relative' }}>
            <motion.img
              src={card.img}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(17,17,17,0)' }}
              animate={{ backgroundColor: hovered ? 'rgba(17,17,17,0.25)' : 'rgba(17,17,17,0)' }}
              transition={{ duration: 0.5 }}
            />
            <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', fontWeight: 300, color: 'rgba(248,246,242,0.7)', letterSpacing: '0.1em' }}>
              {card.num}
            </div>
            <motion.div
              style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: '#F8F6F2', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={16} strokeWidth={1.5} color="#111111" />
            </motion.div>
          </div>

          {/* Text */}
          <div style={{ padding: '24px 20px 28px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '8px' }}>
              {subtitle}
            </p>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 300, color: '#111111', marginBottom: '12px', lineHeight: 1.1 }}>
              {title}
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#777777' }}>
              {desc}
            </p>
          </div>
        </motion.div>
      </Link>
    </Reveal>
  );
}

export default function TreatmentsSection() {
  const { t } = useLang();
  return (
    <section id="treatments" style={{ paddingTop: 'clamp(64px, 10vw, 120px)', paddingBottom: 'clamp(64px, 10vw, 120px)', backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <Reveal>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '20px' }}>
                {t("treatmentsSection.label")}
              </p>
            </Reveal>
            <LineReveal
              as="h2"
              lines={[t("treatmentsSection.headline1"), t("treatmentsSection.headline2")]}
              delay={0.05}
              stagger={0.1}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 300,
                lineHeight: 0.96,
                letterSpacing: '-0.015em',
                color: '#111111',
              }}
            />
          </div>
          <Reveal delay={0.15}>
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
                paddingBottom: '4px',
                borderBottom: '1px solid #111111',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'color 0.4s, border-color 0.4s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C9A36A'; e.currentTarget.style.borderColor = '#C9A36A'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#111111'; e.currentTarget.style.borderColor = '#111111'; }}
            >
              {t("treatmentsSection.viewAll")}
            </Link>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {TREATMENT_CARDS.map((card, i) => (
            <TreatmentCard key={card.num} card={card} i={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}