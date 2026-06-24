import { useParams, Navigate } from "react-router-dom";
import { findTreatment } from "../lib/treatmentData";
import TreatmentPageTemplate from "../components/treatments/TreatmentPageTemplate";

export default function TreatmentDetail() {
  const { id } = useParams();
  const treatment = findTreatment(id);

  if (!treatment) return <Navigate to="/treatments" replace />;

  return <TreatmentPageTemplate treatment={treatment} />;
}