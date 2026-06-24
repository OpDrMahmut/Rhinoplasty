import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => { onComplete?.(); }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: '#111111' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://media.base44.com/images/public/6a271773d45d7fe415b4242b/0dac3e8d9_2.png"
              alt="Dr. Mahmut Uzut"
              style={{ maxWidth: '280px', width: '100%', height: 'auto' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}