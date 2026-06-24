import { useNavigate } from "react-router-dom";
import Navigation from "../components/luxury/Navigation";
import Footer from "../components/luxury/Footer";
import TreatmentHero from "../components/treatments/TreatmentHero";
import { RHINOPLASTY_TREATMENTS } from "../lib/treatmentData";
import { useLang } from "@/lib/i18n/LanguageContext";

export default function NoseAesthetics() {
  const navigate = useNavigate();
  const { t } = useLang();
  const current = RHINOPLASTY_TREATMENTS[0];

  const handleSelect = (id) => { navigate(`/treatments/${id}`); };

  return (
    <>
      <Navigation loaded={true} darkHero={true} />
      <main>
        <TreatmentHero treatments={RHINOPLASTY_TREATMENTS} active={current.id} onSelect={handleSelect} current={current}
          categoryTag={t("categories.noseAesthetics")} categoryTitle={t("categories.rhinoplasty")} />
      </main>
      <Footer />
    </>
  );
}