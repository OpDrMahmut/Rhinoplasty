import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LuxuryButton({ to, children, variant = "primary", className = "", onClick }) {
  const base = "inline-flex items-center gap-3 font-body text-caption uppercase tracking-widest transition-all duration-500 group";
  
  const variants = {
    primary: "bg-foreground text-background px-10 py-5 hover:bg-accent",
    secondary: "border border-foreground text-foreground px-10 py-5 hover:bg-foreground hover:text-background",
    ghost: "text-foreground border-b border-foreground pb-2 hover:border-accent hover:text-accent",
  };

  const content = (
    <>
      <span>{children}</span>
      <motion.span
        className="inline-block"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
      </motion.span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
}