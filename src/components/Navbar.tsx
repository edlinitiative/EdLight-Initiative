"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { NavLink } from "@/lib/content";

type NavbarProps = {
  navItems: NavLink[];
  cta?: NavLink;
};

export default function Navbar({ navItems, cta }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-2xl font-bold text-white">E</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                EdLight
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 -mt-1">
                Initiative
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const label = item.key ? t(item.key) : item.label;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    active
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-500 to-brand-600 transition-all ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-slate-700" />
              ) : (
                <Sun className="w-5 h-5 text-slate-300" />
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {language.toUpperCase()}
              </span>
            </button>

            {cta && (
              <button
                type="button"
                className="hidden lg:inline-flex btn btn-primary"
                zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
                aria-label={cta.key ? t(cta.key) : cta.label}
              >
                {cta.key ? t(cta.key) : cta.label}
              </button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-xl animate-slide-down">
            <div className="container-custom py-6">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const label = item.key ? t(item.key) : item.label;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-base font-medium py-2 px-4 rounded-xl transition-colors ${
                        active
                          ? "bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
                {cta && (
                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
                    aria-label={cta.key ? t(cta.key) : cta.label}
                    onClick={() => setMobileOpen(false)}
                  >
                    {cta.key ? t(cta.key) : cta.label}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
