import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TransitionContext = createContext({ ready: true });

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }) {
  const location = useLocation();
  const [ready, setReady] = useState(true); // first load is always ready
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }

    // Block page render immediately on route change
    setReady(false);

    // Curtain slides in over 0.9s, then reveal the page
    const t = setTimeout(() => setReady(true), 950);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <TransitionContext.Provider value={{ ready }}>
      {children}
    </TransitionContext.Provider>
  );
}