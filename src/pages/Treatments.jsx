import { useState } from "react";
import Navigation from "../components/luxury/Navigation";
import Footer from "../components/luxury/Footer";
import TreatmentHero from "../components/treatments/TreatmentHero";
import TreatmentContent from "../components/treatments/TreatmentContent";
import { RHINOPLASTY_TREATMENTS } from "../lib/treatmentData";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function Treatments() {
  const [active, setActive] = useState(RHINOPLASTY_TREATMENTS[0].id);
  const current = RHINOPLASTY_TREATMENTS.find(t => t.id === active);
  const { t } = useLang();

  return (
    <>
      <Navigation loaded={true} darkHero={true} />
      <main>
        <TreatmentHero
          treatments={RHINOPLASTY_TREATMENTS}
          active={active}
          onSelect={setActive}
          current={current}
          categoryTag={t("categories.noseAesthetics")}
          categoryTitle={t("categories.rhinoplasty")}
        />
        <TreatmentContent treatment={current} />
      </main>
      <Footer />
    </>
  );
}