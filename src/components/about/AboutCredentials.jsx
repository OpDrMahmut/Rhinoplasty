import Reveal from "../luxury/Reveal";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function AboutCredentials() {
  const { t } = useLang();

  // Credential items are proper nouns (institutions, names) — kept in original language
  const CREDENTIALS = [
    {
      category: t("aboutCredentials.education"),
      items: [
        "Dokuz Eylul University Faculty of Medicine — MD (2007)",
        "Bakırköy Dr. Sadi Konuk Education & Research Hospital, Istanbul — ENT Specialty",
      ],
    },
    {
      category: t("aboutCredentials.memberships"),
      items: [
        "Turkish Medical Association (TTB)",
        "Turkish Otolaryngology Foundation",
        "Association of Otorhinolaryngology–Head and Neck Surgery Specialists",
        "Turkish Facial Plastic Surgery Society",
      ],
    },
    {
      category: t("aboutCredentials.specialisations"),
      items: [
        "Rhinoplasty (Nose Aesthetics)",
        "Otoplasty (Ear Aesthetics)",
        "Blepharoplasty (Eyelid Aesthetics)",
        "Face/Neck Lifting (Facelift/Neck Lift)",
        "Lip Lifting",
        "Genioplasty (Chin Aesthetics)",
      ],
    },
    {
      category: t("aboutCredentials.professionalExperience"),
      items: [
        "BHT Clinic Istanbul Tema Hospital, Istanbul",
        "İstinye University Liv Hospital, Istanbul",
        "Beykent University Hospital, Istanbul",
        "Ordu State Hospital, Ordu",
      ],
    },
  ];

  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(72px, 10vw, 120px) 0" }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <Reveal>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A36A", marginBottom: "56px" }}>
            {t("aboutCredentials.label")}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {CREDENTIALS.map((col, i) => (
            <Reveal key={col.category} delay={i * 0.1}>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 400, letterSpacing: "0.28em", textTransform: "uppercase", color: "#888888", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #E8E8E8" }}>
                  {col.category}
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {col.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{ display: "inline-block", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#C9A36A", flexShrink: 0, marginTop: "7px" }} />
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.65, color: "#444444", margin: 0 }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div style={{ marginTop: "clamp(56px, 8vw, 100px)", borderTop: "1px solid #E8E8E8", paddingTop: "clamp(40px, 6vw, 72px)", textAlign: "center", maxWidth: "760px", margin: "clamp(56px, 8vw, 100px) auto 0" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.5, color: "#111111", marginBottom: "24px" }}>
              "{t("aboutCredentials.quote")}"
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A36A" }}>
              Op. Dr. Mahmut Uzut
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}