import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TextReveal({ children, className = "", delay = 0, as: Tag = "div", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const El = Tag;

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <El className={className} style={style}>{children}</El>
      </motion.div>
    </div>
  );
}