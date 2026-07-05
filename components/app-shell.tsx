"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Github, Home, Info, Send, UploadCloud } from "lucide-react";
import { campus, localeLabels, locales } from "@/lib/example-data";
import { useLanguage } from "./language-provider";

const navItems = [
  { href: "/", key: "ask", icon: Home },
  { href: "/kb/", key: "kb", icon: BookOpen },
  { href: "/upload/", key: "upload", icon: UploadCloud },
  { href: "/about/", key: "about", icon: Info }
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { copy, locale, setLocale, label } = useLanguage();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="OpenCampusKB example home">
            <span className="brand-mark">
              <Send size={17} />
            </span>
            <span className="brand-text">
              <span>{campus.name}</span>
              <small>{copy.brandSub}</small>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                  <Icon size={15} />
                  {copy.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <a className="github-button" href={campus.repo} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={16} />
            </a>
            <details className="language-menu">
              <summary>{label}</summary>
              <div className="language-options">
                {locales.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={locale === item ? "active" : ""}
                    onClick={() => setLocale(item)}
                  >
                    {localeLabels[item]}
                  </button>
                ))}
              </div>
            </details>
          </div>
        </div>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}
