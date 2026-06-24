import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import { useLang } from "@/lib/i18n/LanguageContext";

const DAYS_EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function LocationSection() {
  const { t } = useLang();
  return (
    <section style={{ paddingTop: '100px', paddingBottom: '100px', backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* Map */}
          <div className="lg:col-span-7">
            <Reveal>
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.345!2d28.8697!3d40.9823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f3a9e1e4c5d%3A0x0!2sAtak%C3%B6y%207-8-9-10%20Mah.%2C%20A%20Sk%20No%3A1%2C%2034203%20Bak%C4%B1rk%C3%B6y%2F%C4%B0stanbul!5e0!3m2!1sen!2str!4v1700000000001"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) contrast(1.05) brightness(1.0)', display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Klinik Konumu"
                />
              </div>
            </Reveal>
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            <Reveal>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '20px' }}>
                {t("location.label")}
              </p>
            </Reveal>

            <LineReveal
              as="h2"
              lines={[t("location.headline1"), t("location.headline2")]}
              delay={0.05}
              stagger={0.1}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 300,
                lineHeight: 0.96,
                letterSpacing: '-0.015em',
                color: '#111111',
                marginBottom: '40px',
              }}
            />

            <Reveal delay={0.2}>
              <div className="space-y-8">
                {/* Address */}
                <div style={{ paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '10px' }}>
                    {t("location.address")}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.65, color: '#555555' }}>Ataköy 7-8-9-10 Mh. No: 26, A Sk No:1</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.65, color: '#555555' }}>A Blok 2. Kat Daire 33</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.65, color: '#555555' }}>34203 Bakırköy — Istanbul, Turkey</p>
                </div>

                {/* Phone */}
                <div style={{ paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '10px' }}>
                    {t("location.phone")}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.65, color: '#555555' }}>+90 532 745 74 66</p>
                </div>

                {/* Opening Hours */}
                <div style={{ paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '10px' }}>
                    {t("location.openingHours")}
                  </p>
                  {DAYS_EN.map((day, i) => {
                    const isSunday = i === 6;
                    return (
                      <div key={day} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, color: '#888888' }}>{t(`contact.${day.toLowerCase()}`)}</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, color: '#333333' }}>{isSunday ? t("location.closed") : t("location.hours9to6")}</span>
                      </div>
                    );
                  })}
                </div>

                {/* International Patients */}
                <div style={{ paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '10px' }}>
                    {t("location.intlPatients")}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 300, lineHeight: 1.65, color: '#555555' }}>{t("location.intlDesc")}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}