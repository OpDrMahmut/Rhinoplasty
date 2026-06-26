import HeroSection from '@/components/leads/HeroSectionLeads';
import LoadingOverlay from '@/components/luxury/LoadingOverlay';
import React, { useCallback, useState } from 'react'

export default function Leads() {
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

