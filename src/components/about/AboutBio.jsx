import Reveal from "../luxury/Reveal";
import LineReveal from "../luxury/LineReveal";
import ImageReveal from "../luxury/ImageReveal";
import { useLang } from "@/lib/i18n/LanguageContext";

const DOC_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/4c8e9ec9c_image.png";

export default function AboutBio() {
  const { t } = useLang();
  return (
    <section style={{ backgroundColor: "#FFFFFF", padding: "clamp(80px, 12vw, 160px) 0" }}>
      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          <div className="lg:col-span-5">
            <ImageReveal src={DOC_IMG} alt="Op. Dr. Mahmut Uzut" wrapperClassName="w-full img-hover-container" style={{ aspectRatio: "3/4" }} delay={0} />
          </div>
          <div className="lg:col-span-7 lg:pt-8">
            <Reveal>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A36A", marginBottom: "32px" }}>
                {t("aboutBio.label")}
              </p>
            </Reveal>
            <LineReveal as="h2" lines={[t("aboutBio.headline1"), t("aboutBio.headline2")]} delay={0.05} stagger={0.1}
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(38px, 5vw, 66px)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.015em", color: "#111111", marginBottom: "44px" }} />
            <Reveal delay={0.2}>
              {[t("aboutBio.p1"), t("aboutBio.p2"), t("aboutBio.p3"), t("aboutBio.p4")].map((p, i) => (
                <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 300, lineHeight: 1.85, color: "#555555", marginBottom: i < 3 ? "24px" : 0 }}>
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}