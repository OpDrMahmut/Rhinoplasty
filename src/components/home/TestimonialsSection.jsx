import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function TestimonialsSection() {
  const { t } = useLang();
  const TESTIMONIALS = [
    { quote: t("testimonials.item0quote"), name: t("testimonials.item0name"), city: t("testimonials.item0city"), op: t("testimonials.item0op") },
    { quote: t("testimonials.item1quote"), name: t("testimonials.item1name"), city: t("testimonials.item1city"), op: t("testimonials.item1op") },
    { quote: t("testimonials.item2quote"), name: t("testimonials.item2name"), city: t("testimonials.item2city"), op: t("testimonials.item2op") },
    { quote: t("testimonials.item3quote"), name: t("testimonials.item3name"), city: t("testimonials.item3city"), op: t("testimonials.item3op") },
  ];

  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const next = useCallback(() => { setDir(1); setCur(p => (p + 1) % TESTIMONIALS.length); }, [TESTIMONIALS.length]);
  const prev = useCallback(() => { setDir(-1); setCur(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }, [TESTIMONIALS.length]);

  useEffect(() => { const t = setInterval(next, 6500); return () => clearInterval(t); }, [next]);

  const tm = TESTIMONIALS[cur];

  return (
    <section id="testimonials" style={{ paddingTop: '120px', paddingBottom: '120px', backgroundColor: '#F8F6F2' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Reveal>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '20px' }}>
                {t("testimonials.label")}
              </p>
            </Reveal>
            <LineReveal as="h2" lines={[t("testimonials.headline1"), t("testimonials.headline2")]} delay={0.05} stagger={0.1}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, lineHeight: 0.96, letterSpacing: '-0.015em', color: '#111111' }} />
            <Reveal delay={0.2}>
              <div className="flex gap-3 mt-12">
                <button onClick={prev} style={{ width: '48px', height: '48px', border: '1px solid #E8E8E8', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111111'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8E8'; }}>
                  <ChevronLeft size={18} strokeWidth={1.5} color="#111111" />
                </button>
                <button onClick={next} style={{ width: '48px', height: '48px', border: '1px solid #E8E8E8', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#111111'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8E8'; }}>
                  <ChevronRight size={18} strokeWidth={1.5} color="#111111" />
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex items-center gap-2 mt-6">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => { setDir(i > cur ? 1 : -1); setCur(i); }}
                    style={{ height: '1px', width: i === cur ? '36px' : '14px', backgroundColor: i === cur ? '#111111' : '#CCCCCC', border: 'none', cursor: 'pointer', transition: 'all 0.5s ease', padding: 0 }} />
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <div style={{ position: 'relative', minHeight: '280px' }}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={cur} custom={dir} initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '80px', fontWeight: 300, color: '#E8E8E8', lineHeight: 0.7, marginBottom: '24px', letterSpacing: '-0.02em' }}>"</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.45, color: '#111111', marginBottom: '36px', letterSpacing: '-0.005em' }}>{tm.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '1px', backgroundColor: '#C9A36A' }} />
                    <div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111111' }}>{tm.name}</p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 300, color: '#888888', marginTop: '3px' }}>{tm.city} · {tm.op}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}