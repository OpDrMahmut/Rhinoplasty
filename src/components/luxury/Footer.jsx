import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n/LanguageContext";
import { useMemo } from "react";

const COL_IDS = [
  ["rhinoplasty", "septoplasty", "tip-rhinoplasty", "barbie-nose", "piezo-rhinoplasty"],
  ["facelift", "neck-lift", "brow-lift", "blepharoplasty", "otoplasty"],
  ["lip-fillers", "jawline-filler", "cheek-filler", "botox", "mesotherapy"],
];

export default function Footer() {
  const { t } = useLang();
  const colLinks = useMemo(() => COL_IDS.map(col =>
    col.map(id => {
      const label = t(`treatmentContent.${id}.label`);
      const display = label && !label.startsWith("treatmentContent.") ? label : id;
      return { label: display, path: `/treatments/${id}` };
    })
  ), [t]);
  return (
    <footer style={{ backgroundColor: '#FFFFFF', color: '#111111', borderTop: '1px solid #E8E8E8' }}>

      {/* Doctor logo — huge */}
      <div style={{ textAlign: 'center', padding: 'clamp(48px, 8vw, 96px) 24px 0' }}>
        <img
          src="https://media.base44.com/images/public/6a271773d45d7fe415b4242b/6e75ccb34_1.png"
          alt="Dr. Mahmut Uzut"
          style={{ maxWidth: '300px', width: '100%', height: 'auto', margin: '0 auto' }}
        />
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '960px', margin: '0 auto', borderTop: '1px solid #E8E8E8', marginTop: 'clamp(32px, 5vw, 56px)' }} />

      {/* Address row */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '28px 24px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#111111',
            textAlign: 'center',
            margin: 0,
          }}
            className="sm:text-left"
          >
            Ataköy 7-8-9-10. mahallesi çobançeşme E-5 
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#111111',
            textAlign: 'center',
            margin: 0,
          }}>
            yan yol caddesi no:16/1 daire 121 Bakırköy/İSTANBUL
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#111111',
            textAlign: 'center',
            margin: 0,
          }}
            className="sm:text-right"
          >
            +90 532 745 74 66
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '960px', margin: '0 auto', borderTop: '1px solid #E8E8E8' }} />

      {/* Link columns */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 24px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {[t("footer.noseAesthetics"), t("footer.facialAesthetics"), t("footer.fillersBotox")].map((title, ci) => (
            <div key={title}>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400,
                letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888888',
                marginBottom: '18px',
              }}>
                {title}
              </p>
              <ul className="space-y-3">
                {colLinks[ci].map(l => (
                  <li key={l.label}>
                    <Link
                      to={l.path}
                      style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300,
                        color: '#444444', textDecoration: 'none', transition: 'color 0.3s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#C9A36A'}
                      onMouseLeave={e => e.currentTarget.style.color = '#444444'}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #E8E8E8' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '18px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.08em', color: '#AAAAAA' }}>
            © {new Date().getFullYear()} Op. Dr. Mahmut Uzut
          </p>
          <div className="flex items-center gap-6">
            {[t("footer.privacy"), t("footer.cookies"), t("footer.instagram")].map(item => (
              <a key={item} href="#"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#AAAAAA', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                onMouseLeave={e => e.currentTarget.style.color = '#AAAAAA'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}