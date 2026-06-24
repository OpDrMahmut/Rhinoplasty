import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Reveals text line by line — trevidic.com signature effect
export default function LineReveal({
  lines = [],
  className = "",
  delay = 0,
  stagger = 0.1,
  duration = 1,
  as: Tag = "h2",
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const El = Tag;

  return (
    <El ref={ref} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </El>
  );
}