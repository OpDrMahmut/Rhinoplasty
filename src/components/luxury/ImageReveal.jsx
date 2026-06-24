import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Cinematic image reveal: clip-path wipe from bottom + scale from 1.08
export default function ImageReveal({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  delay = 0,
  duration = 1.4,
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`} style={style}>
      <motion.div
        className="w-full h-full"
        initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.08 }}
        animate={
          inView
            ? { clipPath: "inset(0% 0 0 0)", scale: 1 }
            : { clipPath: "inset(100% 0 0 0)", scale: 1.08 }
        }
        transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}