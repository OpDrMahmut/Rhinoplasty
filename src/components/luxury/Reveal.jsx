import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Generic scroll-triggered reveal — the core animation primitive
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 70,
  duration = 1.1,
  once = true,
  threshold = "-12% 0px",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}