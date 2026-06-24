import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";

export default function ContactCTA() {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '120px', backgroundColor: '#111111' }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16 text-center">
        <Reveal>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A36A', marginBottom: '28px' }}>
            Hazır Olduğunuzda
          </p>
        </Reveal>

        <LineReveal
          as="h2"
          lines={["Her Büyük Dönüşüm", "Bir Konuşmayla Başlar."]}
          delay={0.08}
          stagger={0.1}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 300,
            lineHeight: 0.96,
            letterSpacing: '-0.02em',
            color: '#F8F6F2',
            marginBottom: '28px',
          }}
        />

        <Reveal delay={0.25}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 300, lineHeight: 1.75, color: 'rgba(248,246,242,0.5)', maxWidth: '440px', margin: '0 auto 52px' }}>
            Ekibimiz sorularınızı yanıtlamaya ve sizi hak ettiğiniz sonuçlara yönlendirmeye hazır.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="tel:+905551234567"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#F8F6F2',
                border: '1px solid rgba(248,246,242,0.2)',
                padding: '16px 36px',
                textDecoration: 'none',
                transition: 'border-color 0.4s, background-color 0.4s, color 0.4s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#F8F6F2'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,246,242,0.2)'; }}
            >
              Hemen Ara
            </a>
            <a
              href="mailto:p.hafsasafdar@gmail.com"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#111111',
                backgroundColor: '#C9A36A',
                padding: '16px 36px',
                textDecoration: 'none',
                transition: 'background-color 0.4s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#b8914a'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#C9A36A'; }}
            >
              E-posta Gönder
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}