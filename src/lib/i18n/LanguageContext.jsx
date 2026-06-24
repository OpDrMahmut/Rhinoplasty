import { createContext, useContext, useState, useCallback } from "react";
import { translations } from "./translations";

const SUPPORTED = ["en", "tr", "fr", "it"];
const DEFAULT_LANG = "en";
const STORAGE_KEY = "druzut_lang";

const LanguageContext = createContext(null);

function getInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch (_) {}
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((code) => {
    if (!SUPPORTED.includes(code)) return;
    setLangState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch (_) {}
    // Update <html lang> for SEO/accessibility
    document.documentElement.lang = code;
    // RTL: Arabic would need dir="rtl" but we only have LTR languages here
    document.documentElement.dir = "ltr";
  }, []);

  // t("nav.about") → looks up translations.nav.about[lang], falls back to "en"
  const t = useCallback((key) => {
    const parts = key.split(".");
    let node = translations;
    for (const p of parts) {
      if (node == null) break;
      node = node[p];
    }
    if (node == null) return key;
    if (typeof node === "object" && (node.en !== undefined)) {
      return node[lang] ?? node[DEFAULT_LANG] ?? key;
    }
    return key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}