import Navigation from "../components/luxury/Navigation";
import Footer from "../components/luxury/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutBio from "../components/about/AboutBio";
import AboutStats from "../components/about/AboutStats";
import AboutPhilosophy from "../components/about/AboutPhilosophy";
import AboutCredentials from "../components/about/AboutCredentials";
import AboutCongresses from "../components/about/AboutCongresses";
import AboutCertificates from "../components/about/AboutCertificates";
import AboutCTA from "../components/about/AboutCTA";

export default function About() {
  return (
    <>
      <Navigation loaded={true} darkHero={true} />
      <main>
        <AboutHero />
        <AboutBio />
        <AboutStats />
        <AboutPhilosophy />
        <AboutCredentials />
        <AboutCongresses />
        <AboutCertificates />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}