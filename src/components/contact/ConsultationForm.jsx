import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const TREATMENTS = [
  "Primer Rinoplasti",
  "Revizyon Rinoplasti",
  "Cerrahi Dışı Rinoplasti",
  "Septoplasti",
  "Etnik Rinoplasti",
  "Burun Ucu Estetiği",
  "Diğer",
];

const BUDGETS = [
  "Belirtmek İstemiyorum",
  "€3.000 – €6.000",
  "€6.000 – €12.000",
  "€12.000 – €20.000",
  "€20.000+",
];

const METHODS = ["Telefon", "E-posta", "WhatsApp"];

export default function ConsultationForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", treatment: "", message: "", budget: "", method: "" });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.functions.invoke('sendContactForm', form);
    } catch (_) {}
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <section style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#F8F6F2' }}>
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ width: '56px', height: '56px', border: '1px solid #C9A36A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
              <CheckCircle2 size={22} strokeWidth={1.5} color="#C9A36A" />
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#111111', lineHeight: 0.96, letterSpacing: '-0.015em', marginBottom: '20px' }}>
              Teşekkür Ederiz
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: '#777777' }}>
              Konsültasyon talebiniz alındı. Ekibimiz 24 saat içinde sizinle iletişime geçecektir.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#F8F6F2' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

          {/* Left — title */}
          <div className="lg:col-span-4">
            <Reveal>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '24px' }}>
                Konsültasyon Talebi
              </p>
            </Reveal>
            <LineReveal
              as="h2"
              lines={["Randevunuzu", "Planlayın."]}
              delay={0.05}
              stagger={0.1}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 300,
                lineHeight: 0.96,
                letterSpacing: '-0.015em',
                color: '#111111',
                marginBottom: '28px',
              }}
            />
            <Reveal delay={0.2}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.75, color: '#777777' }}>
                Formu doldurun; ekibimiz sizi en kısa sürede arayarak özel konsültasyon programınızı oluştursun.
              </p>
              <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #E8E8E8' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '8px' }}>
                  Doğrudan İletişim
                </p>
                <a href="tel:+905551234567" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 300, color: '#111111', textDecoration: 'none', display: 'block', lineHeight: 1.2 }}>
                  +90 555 123 4567
                </a>
                <a href="mailto:p.hafsasafdar@gmail.com" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, color: '#888888', textDecoration: 'none', marginTop: '6px', display: 'block' }}>
                  p.hafsasafdar@gmail.com
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-8">
            <Reveal delay={0.15}>
              <form onSubmit={submit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">

                  <FieldInput label="Ad Soyad" value={form.name} onChange={v => set('name', v)} required />
                  <FieldInput label="E-posta" type="email" value={form.email} onChange={v => set('email', v)} required />
                  <FieldInput label="Telefon" type="tel" value={form.phone} onChange={v => set('phone', v)} required />

                  <FieldSelect
                    label="Operasyon"
                    value={form.treatment}
                    onChange={v => set('treatment', v)}
                    options={TREATMENTS}
                    required
                  />

                  <div className="md:col-span-2">
                    <FieldInput
                      label="Mesajınız"
                      value={form.message}
                      onChange={v => set('message', v)}
                      multiline
                    />
                  </div>

                  <FieldSelect
                    label="Bütçe Aralığı (isteğe bağlı)"
                    value={form.budget}
                    onChange={v => set('budget', v)}
                    options={BUDGETS}
                  />

                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888888', marginBottom: '16px' }}>
                      Tercih Edilen İletişim Yöntemi
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      {METHODS.map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => set('method', m)}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '10px',
                            fontWeight: 400,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            padding: '10px 20px',
                            border: `1px solid ${form.method === m ? '#111111' : '#E8E8E8'}`,
                            backgroundColor: form.method === m ? '#111111' : 'transparent',
                            color: form.method === m ? '#F8F6F2' : '#666666',
                            cursor: 'pointer',
                            transition: 'all 0.4s ease',
                          }}
                        >{m}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '44px', paddingTop: '36px', borderTop: '1px solid #E8E8E8' }}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 400,
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#F8F6F2',
                      backgroundColor: '#111111',
                      padding: '17px 44px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.5s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C9A36A'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#111111'}
                  >
                    {loading ? 'Gönderiliyor...' : 'Talebi Gönder'}
                    {!loading && <ArrowRight size={13} strokeWidth={1.5} />}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldInput({ label, type = "text", value, onChange, required, multiline }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888888', marginBottom: '12px' }}>
        {label} {required && <span style={{ color: '#C9A36A' }}>*</span>}
      </label>
      {multiline
        ? <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={3}
            className="luxury-input"
            style={{ resize: 'none' }}
            placeholder="..."
          />
        : <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            required={required}
            className="luxury-input"
            placeholder="—"
          />
      }
    </div>
  );
}

function FieldSelect({ label, value, onChange, options, required }) {
  return (
    <div style={{ position: 'relative' }}>
      <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888888', marginBottom: '12px' }}>
        {label} {required && <span style={{ color: '#C9A36A' }}>*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="luxury-select"
      >
        <option value="" disabled>Seçiniz</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(20%)', pointerEvents: 'none' }}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}