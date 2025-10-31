"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import type { NavLink } from "@/lib/content";

import { useLanguage } from "@/contexts/LanguageContext";
import DonateButton from "./DonateButton";

type NavbarProps = {
    navItems: NavLink[];
    cta?: NavLink;
};

type TranslatedNavItem = NavLink & {
    label: string;
    isActive: boolean;
};

export default function Navbar({ navItems, cta }: NavbarProps) {
    const { language, setLanguage, t } = useLanguage();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isOpen);
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

            const translatedNavItems = useMemo<TranslatedNavItem[]>(
                () =>
                    navItems.map((item) => ({
                        ...item,
                        label: item.key ? t(item.key) : item.label,
                        isActive:
                            item.href === "/"
                                ? pathname === "/"
                                : pathname?.startsWith(item.href) ?? false,
                    })),
            [navItems, pathname, t]
    );

    const desktopLinkClasses =
        "relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

        const donateLabel = cta?.key ? t(cta.key) : cta?.label ?? t("nav.donate");

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "border-b border-slate-900/5 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur"
                    : "border-b border-transparent bg-white/80 backdrop-blur"
            }`}
        >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
                <Link href="/" className="flex items-center gap-3" aria-label="EdLight Initiative home">
                    <span className="relative inline-flex overflow-hidden rounded-2xl bg-gradient-to-tr from-sky-700 via-sky-600 to-cyan-400 p-[1px] shadow-lg shadow-sky-900/20">
                                <span className="flex h-14 w-40 items-center justify-center rounded-[26px] bg-white/95 px-3">
                            <Image
                                src="/images/edl_logo.png"
                                alt="EdLight Initiative logo"
                                width={190}
                                height={60}
                                priority
                            />
                        </span>
                    </span>
                </Link>

                <div className="flex items-center gap-3 md:gap-6">
                    <div className="hidden items-center gap-1 md:flex">
                        {translatedNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${desktopLinkClasses} ${
                                    item.isActive
                                        ? "text-sky-700 after:absolute after:inset-x-3 after:bottom-1 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-sky-600 after:to-cyan-400"
                                        : ""
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <DonateButton label={donateLabel} className="ml-2" />
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
                            <Globe className="h-4 w-4 text-sky-600" aria-hidden />
                            <select
                                value={language}
                                onChange={(event) => setLanguage(event.target.value)}
                                className="bg-transparent text-sm font-semibold uppercase outline-none"
                            >
                                <option value="en">EN</option>
                                <option value="fr">FR</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 md:hidden"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <div
                id="mobile-navigation"
                className={`md:hidden ${
                    isOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            >
            <div className="absolute inset-x-4 top-full z-50 mt-3 origin-top rounded-3xl border border-slate-100 bg-white/95 p-4 shadow-xl shadow-slate-900/10 backdrop-blur transition-all duration-200">
                    <div className="flex flex-col gap-2">
                        {translatedNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-2xl px-4 py-3 text-base font-semibold transition hover:bg-slate-100 ${
                                    item.isActive ? "bg-slate-100 text-sky-700" : "text-slate-700"
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <DonateButton label={donateLabel} className="w-full justify-center" />
                        <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                            <span className="inline-flex items-center gap-2">
                                <Globe className="h-4 w-4 text-sky-600" aria-hidden />
                                {t("nav.language") ?? "Language"}
                            </span>
                            <select
                                value={language}
                                onChange={(event) => setLanguage(event.target.value)}
                                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm uppercase text-slate-700"
                            >
                                <option value="en">EN</option>
                                <option value="fr">FR</option>
                            </select>
                        </div>
                    </div>
                </div>
                        {isOpen ? (
                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
                            />
                        ) : null}
            </div>
        </nav>
    );
}