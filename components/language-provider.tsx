"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, Locale, localeLabels, locales } from "@/lib/example-data";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: (typeof dictionaries)[Locale];
  label: string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("open-campus-kb-locale") as Locale | null;
    if (stored && locales.includes(stored)) setLocaleState(stored);
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("open-campus-kb-locale", nextLocale);
  };

  const value = useMemo(
    () => ({ locale, setLocale, copy: dictionaries[locale], label: localeLabels[locale] }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
