
import LoadingOverlay from '@/components/luxury/LoadingOverlay';
import React, { useCallback, useState , } from 'react'
import HeroSection from '@/components/leads/LeagsGenHero';
import Gallery from '@/components/leads/LeadsGallery';

function RhinoplastyLeads() {
   const [loaded, setLoaded] = useState(false);
        const handleComplete = useCallback(() => setLoaded(true), []);
        
    return (
      <>
      <LoadingOverlay onComplete={handleComplete} />
  
       <main>
              <HeroSection loaded={loaded} />
              <Gallery />
              </main>
      </>
    )
}

export default RhinoplastyLeads