// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { useLang } from "@/lib/i18n/LanguageContext";

// const HERO_IMAGE = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/2b1f1835a_DSC07963.jpg";

// const item = (delay) => ({
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
//   },
// });

// export default function HeroSection({ loaded }) {
//   const { t } = useLang();
//   const state = loaded ? "visible" : "hidden";

//   return (
//     <section className="relative overflow-hidden" style={{ backgroundColor: '#FFFFFF', minHeight: 'auto' }}>
//       <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16 lg:h-screen flex items-center">
//         <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center pt-32 pb-20 lg:pt-20 lg:pb-0">

//           {/* ─── LEFT CONTENT ─── */}
//           <div className="lg:col-span-6 xl:col-span-5 relative z-10">

//             {/* Eyebrow */}
//             <div className="overflow-hidden mb-8">
//               <motion.p
//                 variants={item(0.9)}
//                 initial="hidden"
//                 animate={state}
//                 style={{
//                   fontFamily: 'Inter, sans-serif',
//                   fontSize: '10px',
//                   fontWeight: 400,
//                   letterSpacing: '0.3em',
//                   textTransform: 'uppercase',
//                   color: '#C9A36A',
//                 }}
//               >
//                 {t("hero.eyebrow")}
//               </motion.p>
//             </div>

//               <div className="overflow-hidden">
//                 <motion.h1
                 
//                   animate={state}
//                   style={{
//                     fontFamily: 'Cormorant Garamond, serif',
//                     fontSize: 'clamp(52px, 7.5vw, 96px)',
//                     fontWeight: 300,
//                     lineHeight: 0.95,
//                     letterSpacing: '-0.02em',
//                     color: '#111111',
//                     display: 'block',
//                   }}
//                 >
//                   Discover If Rhinoplasty Is Right for You.
//                 </motion.h1>
//               </div>
        

//             {/* Body copy */}
//             <div className="overflow-hidden mt-8">
//               <motion.p
//                 variants={item(0.9)}
//                 initial="hidden"
//                 animate={state}
//                 style={{
//                   fontFamily: 'Inter, sans-serif',
//                   fontSize: '16px',
//                   fontWeight: 300,
//                   lineHeight: 1.75,
//                   color: '#666666',
//                   maxWidth: '420px',
//                 }}
//               >Complete our quick consultation form to receive a personalized assessment from our rhinoplasty specialists. Learn about your treatment options, expected results, recovery process, and whether you're a suitable candidate—all with no obligation.
//               </motion.p>
//             </div>

//             {/* CTAs */}
//             <motion.div
//               variants={item(0.05)}
//               initial="hidden"
//               animate={state}
//               className="flex flex-col sm:flex-row items-start gap-5 mt-10"
//             >
//               <Link
//                 to="https://tytzbjby.paperform.co"
//                 className="inline-flex items-center gap-3 group"
//                 style={{
//                   fontFamily: 'Inter, sans-serif',
//                   fontSize: '10px',
//                   fontWeight: 400,
//                   letterSpacing: '0.22em',
//                   textTransform: 'uppercase',
//                   color: '#F8F6F2',
//                   backgroundColor: '#111111',
//                   padding: '16px 36px',
//                   textDecoration: 'none',
//                   transition: 'background-color 0.5s ease',
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C9A36A'}
//                 onMouseLeave={e => e.currentTarget.style.backgroundColor = '#111111'}
//               >
//                 START NOW
//                 <ArrowRight size={13} strokeWidth={1.5} />
//               </Link>
//             </motion.div>
//           </div>

//           {/* ─── RIGHT IMAGE — hidden on mobile ─── */}
//           <div className="hidden lg:block lg:col-span-6 xl:col-span-7 relative">
            

//             <motion.div
//               initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
//               animate={loaded ? { clipPath: "inset(0% 0 0 0)", scale: 1 } : {}}
//               transition={{ duration: 1.6, delay: 0, ease: [0.76, 0, 0.24, 1] }}
//               className="img-hover-container"
//               style={{
//                 height: 'clamp(460px, 72vh, 780px)',
//                 marginLeft: 'auto',
//                 maxWidth: '680px',
//               }}
//             >
//               <img
//                 src={HERO_IMAGE}
//                 alt="Rhinoplasty result — elegant and natural profile"
//                 style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
//               />
//             </motion.div>

//           </div>
//         </div>
//       </div>

//     </section>
//   );
// }


import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const HERO_IMAGE = "https://media.base44.com/images/public/6a43aee908d4309457c883f3/385867d47_generated_dba91a29.png";

const unmask = (delay) => ({
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] },
  },
});

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const lineGrow = (delay) => ({
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] },
  },
});

const lineGrowX = (delay) => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] },
  },
});

export default function HeroSection({ loaded = true }) {
  const state = loaded ? "visible" : "hidden";
  const [imgLoaded, setImgLoaded] = useState(false);
  const heroRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F9F8F6", minHeight: "100vh" }}
    >
      {/* Caliper lines */}
      <CaliperLines state={state} />

      <div className="relative z-10 max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16 min-h-screen lg:h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-center py-32 lg:py-0">

          {/* Left — text column (golden ratio: ~38%) */}
          <div className="lg:col-span-5 relative z-20">
            <TextContent state={state} />
          </div>

          {/* Right — image column (golden ratio: ~62%) */}
          <div className="hidden lg:flex lg:col-span-7 justify-end relative">
            <HeroImage state={state} imgLoaded={imgLoaded} setImgLoaded={setImgLoaded} />
          </div>
        </div>
      </div>

      {/* Floating CTA that follows cursor — desktop only */}
      <FloatingCursor springX={springX} springY={springY} />
    </section>
  );
}

function CaliperLines({ state }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Vertical caliper left */}
      <motion.div
        variants={lineGrow(0.4)}
        initial="hidden"
        animate={state}
        className="absolute origin-top"
        style={{
          left: "38.2%",
          top: 0,
          bottom: 0,
          width: "0.5px",
          backgroundColor: "rgba(15,20,18,0.06)",
        }}
      />
      {/* Vertical caliper right */}
      <motion.div
        variants={lineGrow(0.6)}
        initial="hidden"
        animate={state}
        className="absolute origin-top"
        style={{
          left: "61.8%",
          top: 0,
          bottom: 0,
          width: "0.5px",
          backgroundColor: "rgba(15,20,18,0.06)",
        }}
      />
      {/* Horizontal caliper */}
      <motion.div
        variants={lineGrowX(0.8)}
        initial="hidden"
        animate={state}
        className="absolute origin-left"
        style={{
          top: "61.8%",
          left: 0,
          right: 0,
          height: "0.5px",
          backgroundColor: "rgba(15,20,18,0.06)",
        }}
      />
    </div>
  );
}

function TextContent({ state }) {
  return (
    <div className="relative">
      {/* Eyebrow */}
      <div className="overflow-hidden mb-10">
        <motion.p
          variants={fadeUp(0.6)}
          initial="hidden"
          animate={state}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#9D7E54",
          }}
        >
         Thank You for filling the form
        </motion.p>
      </div>

      {/* Headline — staggered three-line stack */}
      <div className="space-y-0">
        {["You may be", "Eligible for", "Rhinoplasty"].map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              variants={unmask(0.8 + i * 0.15)}
              initial="hidden"
              animate={state}
              className="block"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(48px, 7vw, 96px)",
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#0F1412",
              }}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="overflow-hidden mt-10">
        <motion.p
          variants={fadeUp(0.5)}
          initial="hidden"
          animate={state}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "#666666",
            maxWidth: "400px",
          }}
        >
         Based on your answers, we believe you may be a suitable candidate for rhinoplasty. Our patient coordinators will contact you using the phone number you provided to discuss your case, answer your questions, and guide you through the next steps. Thank you for your interest—we look forward to speaking with you soon.
        </motion.p>
      </div>

      {/* CTA */}
      <motion.div
        variants={fadeUp(0.8)}
        initial="hidden"
        animate={state}
        className="mt-12"
      >
        <a
          href="https://wa.me/+905327457466"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 transition-all duration-500"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#F9F8F6",
            backgroundColor: "#0F1412",
            padding: "18px 40px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#9D7E54";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0F1412";
          }}
        >
          Begin Assessment
          <ArrowRight
            size={13}
            strokeWidth={1.5}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </motion.div>

      {/* Micro stats */}
      <motion.div
        variants={fadeUp(2.1)}
        initial="hidden"
        animate={state}
        className="flex items-center gap-8 mt-14"
      >
        {[
          { value: "2,500+", label: "Procedures" },
          { value: "98%", label: "Satisfaction" },
          { value: "15+", label: "Years" },
        ].map((stat) => (
          <div key={stat.label}>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "24px",
                fontWeight: 400,
                color: "#0F1412",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#9D7E54",
                marginTop: "4px",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function HeroImage({ state, imgLoaded, setImgLoaded }) {
  return (
    <div className="relative" style={{ maxWidth: "560px", width: "100%" }}>
      {/* Image reveal */}
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={state === "visible" ? { clipPath: "inset(0% 0 0 0)" } : {}}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="relative overflow-hidden"
        style={{ height: "clamp(480px, 75vh, 820px)" }}
      >
        {/* Grain overlay for sketch-to-sharp effect */}
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={imgLoaded ? { opacity: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "url('data:image/svg+xml,<svg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.15\"/></svg>')",
            mixBlendMode: "multiply",
          }}
        />

        <motion.img
          src={HERO_IMAGE}
          alt="Elegant profile portrait — serene and natural"
          onLoad={() => setImgLoaded(true)}
          initial={{ scale: 1.15, filter: "blur(8px)" }}
          animate={imgLoaded ? { scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </motion.div>

      {/* Bronze accent line on image edge */}
      <motion.div
        variants={lineGrow(1.4)}
        initial="hidden"
        animate={state}
        className="absolute origin-top"
        style={{
          left: "-20px",
          top: "10%",
          bottom: "10%",
          width: "1px",
          backgroundColor: "#9D7E54",
        }}
      />

    </div>
  );
}

function FloatingCursor({ springX, springY }) {
  return (
    <motion.div
      className="hidden lg:flex fixed pointer-events-none z-50 items-center justify-center"
      style={{
        x: springX,
        y: springY,
        width: 0,
        height: 0,
      }}
    >
      {/* Subtle decorative dot that follows cursor inside hero */}
    </motion.div>
  );
}