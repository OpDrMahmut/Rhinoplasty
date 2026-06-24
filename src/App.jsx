import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Treatments from "@/pages/Treatments";
import About from "@/pages/About";
import TreatmentDetail from "@/pages/TreatmentDetail";
import NoseAesthetics from "@/pages/NoseAesthetics";
import FacialAesthetics from "@/pages/FacialAesthetics";
import FillersBotox from "@/pages/FillersBotox";
import Certifications from "@/pages/Certifications";
import PageTransition from "@/components/luxury/PageTransition";
import { TransitionProvider, useTransition } from "@/lib/TransitionContext";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const { ready } = useTransition();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return null;
  }

  if (authError) {
    if (authError.type === "user_not_registered") return <UserNotRegisteredError />;
    if (authError.type === "auth_required") { navigateToLogin(); return null; }
  }

  return (
    <>
      <PageTransition />
      {ready && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/nose-aesthetics" element={<NoseAesthetics />} />
          <Route path="/facial-aesthetics" element={<FacialAesthetics />} />
          <Route path="/fillers-botox" element={<FillersBotox />} />
          <Route path="/treatments/:id" element={<TreatmentDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <LanguageProvider>
            <TransitionProvider>
              <AuthenticatedApp />
            </TransitionProvider>
          </LanguageProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}