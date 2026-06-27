
import LoadingOverlay from '@/components/luxury/LoadingOverlay';
import React, { useCallback, useState , } from 'react'
import HeroSection from '@/components/leads/LeagsGenHero';

function RhinoplastyLeads() {
   const [loaded, setLoaded] = useState(false);
        const handleComplete = useCallback(() => setLoaded(true), []);
        
    return (
      <>
      <LoadingOverlay onComplete={handleComplete} />
  
       <main>
              <HeroSection loaded={loaded} />
              </main>
      </>
    )
}

export default RhinoplastyLeads