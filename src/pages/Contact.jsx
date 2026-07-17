import { useState } from "react";
import Navigation from "../components/luxury/Navigation";
import Footer from "../components/luxury/Footer";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const DOCTOR_IMAGE = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/8009d87c1_woman-receiving-facial-aesthetic-treatment-in-clin-2026-03-10-04-49-50-utc.jpg";
const HERO_IMAGE = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/b24a25d1f_woman-posing-with-hand-near-face-2026-01-07-00-56-26-utc.jpg";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // const submit = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);
  //   await base44.functions.invoke('sendContactForm', { ...form });
  //   setSubmitting(false);
  //   setDone(true);
  // };

  const submit = async (e) => {
  e.preventDefault();

  console.log("1. Submit clicked");

  try {
    setSubmitting(true);

    console.log("2. Calling function");

    const response = await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Failed to send email.");
}

    setDone(true);
    setForm({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});
  } catch (err) {
  console.error(err);

  alert(
    err instanceof Error
      ? err.message
      : "Something went wrong. Please try again."
  );
}finally {
    console.log("5. Finally");
    setSubmitting(false);
  }
};

  return (
    <>
      <Navigation loaded={true} darkHero={true} />
      <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <div style={{ position: 'relative', height: 'clamp(260px, 38vw, 420px)', overflow: 'hidden' }}>
          <img
            src={HERO_IMAGE}
            alt="Contact"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.35)' }}
          />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(48px, 9vw, 110px)',
              fontWeight: 300,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#F8F6F2',
              lineHeight: 1,
            }}>
              {t("contact.heroTitle")}
            </h1>
          </div>
        </div>

        {/* ── WHITE CARD ── */}
        <div style={{ maxWidth: '960px', margin: '0 auto', backgroundColor: '#FFFFFF', position: 'relative', zIndex: 1, boxShadow: '0 2px 40px rgba(0,0,0,0.06)', marginTop: '-40px', marginLeft: 'clamp(16px,4vw,auto)', marginRight: 'clamp(16px,4vw,auto)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: '520px' }}>

            {/* LEFT — Coordinates */}
            <div style={{ padding: 'clamp(32px, 5vw, 56px)', borderRight: '1px solid #E8E8E8' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#111111', marginBottom: '28px' }}>
                {t("contact.coordinates")}
              </h2>

              {/* Doctor photo */}
              <div style={{ width: '110px', height: '130px', overflow: 'hidden', marginBottom: '24px' }}>
                <img src={DOCTOR_IMAGE} alt="Op. Dr. Mahmut Uzut" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(1)' }} />
              </div>

              {/* Address */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', alignItems: 'flex-start' }}>
                <svg width="13" height="17" viewBox="0 0 13 17" fill="none" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <path d="M6.5 0C2.91 0 0 2.91 0 6.5c0 4.875 6.5 10.5 6.5 10.5S13 11.375 13 6.5C13 2.91 10.09 0 6.5 0zm0 8.833A2.333 2.333 0 1 1 6.5 4.167a2.333 2.333 0 0 1 0 4.666z" fill="#888"/>
                </svg>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, color: '#444444', lineHeight: 1.7 }}>
                    Op. Dr. Mahmut Uzut<br />
                    Rhinoplasty &amp; Aesthetic Surgery<br />
                    Ataköy 7-8-9-10 Mh. No: 26, A Sk No:1<br />
                    A Blok 2. Kat Daire 33<br />
                    34203 Bakırköy — Istanbul, Turkey
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M13 9.667l-2.333-.267a1 1 0 0 0-.967.567l-1 2a10.4 10.4 0 0 1-5.267-5.267l2-1a1 1 0 0 0 .567-.967L5.733 2.4A1 1 0 0 0 4.74 1.5H2.667A1.167 1.167 0 0 0 1.5 2.667C1.5 8.673 6.327 13.5 12.333 13.5A1.167 1.167 0 0 0 13.5 12.333V10.66a1 1 0 0 0-.5-.993z" fill="#888"/>
                </svg>
                <a href="tel:+905327457466" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, color: '#444444', textDecoration: 'none' }}>
                  +90 532 745 74 66
                </a>
              </div>

              {/* Hours note */}
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 300, color: '#777777', lineHeight: 1.75, marginBottom: '16px' }}>
                {t("contact.apptNote")}
              </p>

              {[
                [t("contact.monday"), '9 am – 6 pm'],
                [t("contact.tuesday"), '9 am – 6 pm'],
                [t("contact.wednesday"), '9 am – 6 pm'],
                [t("contact.thursday"), '9 am – 6 pm'],
                [t("contact.friday"), '9 am – 6 pm'],
                [t("contact.saturday"), '9 am – 6 pm'],
                [t("contact.sunday"), t("contact.closed")],
              ].map(([day, hrs]) => (
                <div key={day} style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 300, color: '#555' }}>{day}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: hrs === t("contact.closed") ? 400 : 300, color: hrs === t("contact.closed") ? '#999' : '#111' }}>{hrs}</span>
                </div>
              ))}
            </div>

            {/* RIGHT — Form */}
            <div style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#111111', lineHeight: 1.2, marginBottom: '28px' }}>
                {t("contact.sendMessage")}<br />{t("contact.aMessage")}
              </h2>

              {done ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <CheckCircle2 size={32} strokeWidth={1.5} color="#C9A36A" style={{ marginBottom: '16px' }} />
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300, color: '#111111', marginBottom: '10px' }}>{t("contact.thankYou")}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, color: '#777777', lineHeight: 1.75 }}>
                    {t("contact.successMsg")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit}>
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0" style={{ marginBottom: '0' }}>
                    <FormField placeholder={t("contact.firstName")} type="text" required value={form.firstName} onChange={e => set('firstName', e.target.value)} />
                    <FormField placeholder={t("contact.lastName")} type="text" required value={form.lastName} onChange={e => set('lastName', e.target.value)} />
                  </div>
                  <FormField placeholder={t("contact.email")} type="email" required value={form.email} onChange={e => set('email', e.target.value)} />
                  <FormField placeholder={t("contact.phone")} type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} />
                  <FormField placeholder={t("contact.subject")} type="text" required value={form.subject} onChange={e => set('subject', e.target.value)} />
                  
                  {/* Message textarea */}
                  <div style={{ marginTop: '16px', marginBottom: '0' }}>
                    <textarea
                      placeholder={t("contact.message")}
                      rows={4}
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      style={{
                        width: '100%', resize: 'none', background: 'transparent',
                        border: '1px solid #D8D8D8', padding: '12px', outline: 'none',
                        fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300,
                        color: '#111111', lineHeight: 1.6, transition: 'border-color 0.4s',
                        borderRadius: 0,
                      }}
                      onFocus={e => e.target.style.borderColor = '#C9A36A'}
                      onBlur={e => e.target.style.borderColor = '#D8D8D8'}
                    />
                  </div>

                  {/* Privacy */}
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '14px', marginBottom: '20px' }}>
                    <input
                      type="checkbox" required id="privacy" checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                      style={{ marginTop: '3px', accentColor: '#C9A36A', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <label htmlFor="privacy" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 300, color: '#888888', lineHeight: 1.6, cursor: 'pointer' }}>
                      {t("contact.privacy")}<br />
                      <span style={{ color: '#BBBBBB' }}>{t("contact.required")}</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400,
                      letterSpacing: '0.28em', textTransform: 'uppercase',
                      color: submitting ? '#BBBBBB' : '#111111',
                      background: 'none', border: 'none', cursor: submitting ? 'default' : 'pointer', padding: 0,
                      transition: 'color 0.4s',
                    }}
                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.color = '#C9A36A'; }}
                    onMouseLeave={e => { if (!submitting) e.currentTarget.style.color = '#111111'; }}
                  >
                    {submitting ? t("contact.sending") : t("contact.send")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── MAP ── */}
        <div style={{ height: 'clamp(280px, 35vw, 440px)', marginTop: '0' }}>
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.5!2d28.8330417!3d40.9915352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b559c2e9ff15e9%3A0x55a1096642552e4a!2sOp.+Dr.+Mahmut+Uzut+(Rhinoplasty+%2F+Burun+Estetigi)!5e0!3m2!1sen!2str!4v1718000000010"
            width="100%" height="100%"
            style={{ border: 'none', display: 'block' }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </main>
      <Footer />
    </>
  );
}

function FormField({ placeholder, type = "text", required, value, onChange }) {
  return (
    <div style={{ borderBottom: '1px solid #D8D8D8', marginBottom: '0', transition: 'border-color 0.4s' }}>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          background: 'transparent', border: 'none', outline: 'none',
          width: '100%', padding: '13px 0',
          fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300,
          color: '#111111', borderRadius: 0,
        }}
        onFocus={e => { e.target.parentElement.style.borderBottomColor = '#C9A36A'; }}
        onBlur={e => { e.target.parentElement.style.borderBottomColor = '#D8D8D8'; }}
      />
    </div>
  );
}