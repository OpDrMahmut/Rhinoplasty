import { motion } from "framer-motion";
import { useState } from "react";

const PHOTOS = [
  
  {
    src: "/images/BA-02.png",
    title: "Rhinoplasty Enhancement",
    category: "Female · Tip Refinement",
  },
  {
    src: "/images/BA-01.png",
    title: "Rhinoplasty Refinement",
    category: "Male · Dorsal Reduction",
  },
  {
    src: "/images/BA3-01.png",
    title: "Rhinoplasty Transformation",
    category: "Female · Closed Technique",
  },
  {
    src: "/images/BA4-01.png",
    title: "Rhinoplasty Refinement",
    category: "Male · Functional + Aesthetic",
  },
];

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function GallerySection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: "#F9F8F6" }}
    >
      {/* Top divider caliper line */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "0.5px", backgroundColor: "rgba(15,20,18,0.08)" }}
      />

      <div className="max-w-[1520px] mx-auto px-6 md:px-10 xl:px-16">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-20">
          <div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={fadeUp(0)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#9D7E54",
              }}
            >Doğal Sonuçlar, Uzman Bakım
            </motion.p>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp(0.15)}
              className="mt-6"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#0F1412",
                maxWidth: "620px",
              }}
            >
            Hasta Vakası
            </motion.h2>
          </div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp(0.3)}
            className="mt-6 lg:mt-0 lg:max-w-xs"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.75,
              color: "#666666",
            }}
          >
         Her işlem, doğal yüz hatlarınızı denge ve uyumu koruyarak en iyi şekilde vurgulamak için özenle planlanır.
          </motion.p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp(0.1 * i)}
              className="group cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3 / 4" }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-all duration-[1.2s] ease-out"
                  style={{
                    objectPosition: "center top",
                    filter:
                      hovered === i ? "none" : "grayscale(0.15) brightness(0.97)",
                    transform: hovered === i ? "scale(1.03)" : "scale(1)",
                  }}
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,20,18,0.6) 0%, rgba(15,20,18,0) 50%)",
                    opacity: hovered === i ? 1 : 0,
                  }}
                />
                {/* Title overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-700"
                  style={{
                    transform:
                      hovered === i ? "translateY(0)" : "translateY(20px)",
                    opacity: hovered === i ? 1 : 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "20px",
                      fontWeight: 400,
                      color: "#F9F8F6",
                      lineHeight: 1.2,
                    }}
                  >
                    {photo.title}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "9px",
                      fontWeight: 400,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C9A36A",
                    }}
                  >
                    {photo.category}
                  </p>
                </div>
              </div>

              {/* Caption below image — always visible */}
              <div className="mt-4 flex items-baseline justify-between">
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#0F1412",
                  }}
                >
                  {photo.title}
                </p>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9px",
                    color: "#9D7E54",
                  }}
                >
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}