import Reveal from "../luxury/Reveal";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const CARDS = [
  { icon: Phone, label: "Telefon", value: "+90 555 123 4567", sub: "Pzt–Cmt, 09:00–19:00", href: "tel:+905551234567" },
  { icon: Mail, label: "E-posta", value: "p.hafsasafdar@gmail.com", sub: "24 saat içinde yanıt", href: "mailto:p.hafsasafdar@gmail.com" },
  { icon: MapPin, label: "Adres", value: "Teşvikiye Cad. No:42", sub: "Nişantaşı, Şişli / İstanbul", href: null },
  { icon: Clock, label: "Çalışma Saatleri", value: "Pzt–Cmt: 09:00–19:00", sub: "Pazar: Randevuya Özel", href: null },
];

export default function ContactCards() {
  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <div
                style={{
                  padding: '32px 28px',
                  border: '1px solid #E8E8E8',
                  height: '100%',
                  transition: 'border-color 0.4s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#C9A36A'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E8E8E8'}
              >
                <div style={{ width: '44px', height: '44px', border: '1px solid #E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <c.icon size={17} strokeWidth={1.5} color="#C9A36A" />
                </div>

                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '10px' }}>
                  {c.label}
                </p>

                {c.href
                  ? <a href={c.href} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 300, color: '#111111', textDecoration: 'none', display: 'block', lineHeight: 1.2, transition: 'color 0.4s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#C9A36A'}
                      onMouseLeave={e => e.currentTarget.style.color = '#111111'}
                    >{c.value}</a>
                  : <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', fontWeight: 300, color: '#111111', lineHeight: 1.2 }}>{c.value}</p>
                }

                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 300, color: '#999999', marginTop: '6px' }}>
                  {c.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}