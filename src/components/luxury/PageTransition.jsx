import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState("in");
  const isFirst = useRef(true);
  const timers = useRef([]);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }

    timers.current.forEach(clearTimeout);
    timers.current = [];

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    setPhase("in");
    setShow(true);

    // Hold curtain open longer so text is readable
    const t1 = setTimeout(() => setPhase("out"), 1400);
    // Unmount after out animation completes
    const t2 = setTimeout(() => setShow(false), 2200);

    timers.current = [t1, t2];
    return () => timers.current.forEach(clearTimeout);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center"
          style={{ backgroundColor: '#111111' }}
          animate={phase === "in"
            ? { y: "0%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }
            : { y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }
          }
          initial={{ y: "-100%" }}
        >
          <motion.div
            className="text-center"
            animate={phase === "in"
              ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.55, ease: "easeOut" } }
              : { opacity: 0, y: -8, transition: { duration: 0.4, ease: "easeIn" } }
            }
            initial={{ opacity: 0, y: 16 }}
          >
            <img
              src="https://media.base44.com/images/public/6a271773d45d7fe415b4242b/0dac3e8d9_2.png"
              alt="Dr. Mahmut Uzut"
              style={{ maxWidth: '180px', width: '100%', height: 'auto', margin: '0 auto' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}