import { useNavigate } from "react-router-dom";
import Navigation from "../components/luxury/Navigation";
import Footer from "../components/luxury/Footer";
import TreatmentHero from "../components/treatments/TreatmentHero";
import { FILLERS_BOTOX_TREATMENTS } from "../lib/treatmentData";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function FillersBotox() {
  const navigate = useNavigate();
  const { t } = useLang();
  const current = FILLERS_BOTOX_TREATMENTS[0];

  const handleSelect = (id) => { navigate(`/treatments/${id}`); };

  return (
    <>
      <Navigation loaded={true} darkHero={true} />
      <main>
        <TreatmentHero treatments={FILLERS_BOTOX_TREATMENTS} active={current.id} onSelect={handleSelect} current={current}
          categoryTag={t("categories.nonSurgical")} categoryTitle={t("categories.fillersBotox")} />
      </main>
      <Footer />
    </>
  );
}