import { useRef, useState } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { useLang } from "@/lib/i18n/LanguageContext";

const PROFILE_IMG = "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/fe99b8066_mahmut.webp";

const POSTS = [
  { id: 1, image: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/1ff144da9_unnamed1.webp", caption: "Natural results through precision rhinoplasty. ✨", likes: "1,204" },
  { id: 2, image: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/db33eb2c1_unnamed2.webp", caption: "Every face tells a story. We help it shine. 🌿", likes: "2,381" },
  { id: 3, image: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/7100ca265_unnamed3.webp", caption: "Post-op check-up — beautiful healing. 🩺", likes: "983" },
  { id: 4, image: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/3473b6a3f_unnamed4.webp", caption: "Consultation day at our Istanbul clinic. 🏙️", likes: "1,756" },
  { id: 5, image: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/c868e179c_unnamed5.webp", caption: "The art of rhinoplasty — harmony and balance. 💛", likes: "3,021" },
  { id: 6, image: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/999590674_unnamed6.webp", caption: "Dr. Mahmut Uzut — dedicated to your transformation. 🎯", likes: "876" },
  { id: 7, image: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/3bb476516_unnamed.webp", caption: "Precision consultation — your transformation begins here. 🏛️", likes: "1,432" },
  { id: 8, image: "https://media.base44.com/images/public/6a271773d45d7fe415b4242b/977198677_image.png", caption: "Confidence is our goal. Results speak for themselves. ✨", likes: "2,105" },
];

function InstagramCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div style={{ minWidth: "260px", maxWidth: "260px", backgroundColor: "#FFFFFF", overflow: "hidden", border: "1px solid #EFEFEF", flexShrink: 0, userSelect: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 12px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", padding: "2px", flexShrink: 0 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", backgroundColor: "#fff" }}>
            <img src={PROFILE_IMG} alt="Dr. Mahmut Uzut" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#111111", lineHeight: 1.3, margin: 0 }}>drmahmutuzut</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 300, color: "#888888", lineHeight: 1.2, margin: 0 }}>Istanbul, Turkey</p>
        </div>
        <a href="https://www.instagram.com/drmahmutuzut" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 600, color: "#0095F6", textDecoration: "none", whiteSpace: "nowrap" }}>Follow</a>
      </div>
      <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
        <img src={post.image} alt="post" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ padding: "10px 12px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <button onClick={() => setLiked(l => !l)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><Heart size={20} color={liked ? "#ED4956" : "#111111"} fill={liked ? "#ED4956" : "none"} strokeWidth={1.5} /></button>
            <MessageCircle size={20} color="#111111" strokeWidth={1.5} style={{ cursor: "pointer" }} />
            <Send size={20} color="#111111" strokeWidth={1.5} style={{ cursor: "pointer" }} />
          </div>
          <button onClick={() => setSaved(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><Bookmark size={20} color="#111111" fill={saved ? "#111111" : "none"} strokeWidth={1.5} /></button>
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#111111", margin: "0 0 4px" }}>{post.likes} likes</p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 300, color: "#444444", margin: 0, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          <span style={{ fontWeight: 600, marginRight: "4px" }}>drmahmutuzut</span>{post.caption}
        </p>
      </div>
    </div>
  );
}

const DOUBLED = [...POSTS, ...POSTS];

export default function InstagramSlider() {
  const { t } = useLang();
  return (
    <section style={{ backgroundColor: "#F8F6F2", padding: "clamp(64px, 10vw, 120px) 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
        <a href="https://www.instagram.com/drmahmutuzut" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A36A", textDecoration: "none", display: "block", marginBottom: "12px" }}>
          @drmahmutuzut
        </a>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#111111", letterSpacing: "-0.01em", lineHeight: 1.1, margin: 0 }}>
          {t("instagram.headline")}
        </h2>
      </div>
      <style>{`
        @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee-scroll 40s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", zIndex: 2, background: "linear-gradient(to right, #F8F6F2, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", zIndex: 2, background: "linear-gradient(to left, #F8F6F2, transparent)", pointerEvents: "none" }} />
        <div className="marquee-track" style={{ display: "flex", gap: "20px", width: "max-content", padding: "16px 10px 32px" }}>
          {DOUBLED.map((post, i) => (<InstagramCard key={i} post={post} />))}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <a href="https://www.instagram.com/drmahmutuzut" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", color: "#111111", textDecoration: "none", borderBottom: "1px solid #111111", paddingBottom: "3px", transition: "color 0.35s, border-color 0.35s", display: "inline-block" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#C9A36A"; e.currentTarget.style.borderBottomColor = "#C9A36A"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#111111"; e.currentTarget.style.borderBottomColor = "#111111"; }}>
          {t("instagram.viewLink")}
        </a>
      </div>
    </section>
  );
}