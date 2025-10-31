"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import styles from "../styles/Navbar.module.css";
import { useLanguage } from "@/contexts/LanguageContext";
import DonateButton from "./DonateButton";

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggle = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 300);
        } else {
            setIsOpen(true);
            setIsClosing(false);
        }
    };

    const handleLinkClick = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 300);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleToggle();
        }
    };

    // Donate handling handled by DonateButton + ZeffyInit

    return (
            <nav 
                className={`navbar navbar-expand-lg fixed-top ${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isOpen ? 'show-backdrop' : ''}`}
                onClick={handleBackdropClick}
            >
                <div className="container">
                    {/* Logo */}
                    <Link href="/" className={`navbar-brand ${styles.brand}`}>
                        <div className="">
                            <div className="">
                                <Image
                                    src="/images/edl_logo.png"
                                    alt="EdLight Logo"
                                    width={200}
                                    height={70}

                                />
                            </div>
                        </div>
                    </Link>

                    {/* Mobile Toggle Button */}
                    <button
                        className={`navbar-toggler ${styles.toggler}`}
                        type="button"
                        onClick={handleToggle}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Navigation Links */}
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''} ${isClosing ? 'closing' : ''}`}>
                        <ul className={`navbar-nav ms-auto ${styles.navLinks}`}>
                            <li onClick={handleLinkClick} className="nav-item">
                                <Link href="/" className={`nav-link ${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}>
                                    {t('nav.home')}
                                </Link>
                            </li>
                            <li onClick={handleLinkClick} className="nav-item">
                                <Link href="/mission_projects" className={`nav-link ${styles.navLink} ${pathname?.startsWith('/mission_projects') ? styles.navLinkActive : ''}`}>
                                    {t('nav.mission_projects')}
                                </Link>
                            </li>
                            <li onClick={handleLinkClick} className="nav-item">
                                <Link href="/courses" className={`nav-link ${styles.navLink} ${pathname?.startsWith('/courses') ? styles.navLinkActive : ''}`}>
                                    {t('nav.courses')}
                                </Link>
                            </li>
                            <li onClick={handleLinkClick} className="nav-item">
                                <Link href="/ESLP" className={`nav-link ${styles.navLink} ${pathname?.startsWith('/ESLP') ? styles.navLinkActive : ''}`}>
                                    {t('nav.eslp')}
                                </Link>
                            </li>
                    <li onClick={handleLinkClick} className="nav-item">
                        <Link href="/about-us" className={`nav-link ${styles.navLink} ${pathname?.startsWith('/about') ? styles.navLinkActive : ''}`}>
                            {t('nav.about_us')}
                        </Link>
                    </li>

                            {/* Donate Button (Zeffy modal trigger) */}
                            <li onClick={handleLinkClick} className="nav-item">
                                <DonateButton label={t('nav.donate')} />
                            </li>

                            {/* Language Switcher */}
                            <li className={`nav-item ${styles.languageItem}`}>
                                <div className={styles.languageContainer}>
                                    <Globe size={18} className={styles.globeIcon} />
                                    <select
                                        className={styles.languageSelect}
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        onChangeCapture={handleLinkClick}
                                    >
                                        <option value="en">EN</option>
                                        <option value="fr">FR</option>
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    );
}