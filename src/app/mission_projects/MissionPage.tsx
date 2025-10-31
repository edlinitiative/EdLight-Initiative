"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Globe, Lightbulb, Users } from "lucide-react";
import styles from "./MissionPage.module.css";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Initiative, Partner } from "@/lib/content";

type MissionPageProps = {
    initiatives: Initiative[];
    partners: Partner[];
};

const cardConfig: Record<
    string,
    {
        modifier?: string;
        accent?: string;
        gradient?: string;
        Icon: typeof BookOpen;
    }
> = {
    default: {
        accent: styles.blueCard,
        gradient: "linear-gradient(135deg, rgba(0, 100, 148, 0.82), rgba(2, 132, 199, 0.7))",
        Icon: BookOpen,
    },
    academy: {
        modifier: styles.onlineCoursesCard,
        accent: styles.blueCard,
        gradient: "linear-gradient(135deg, rgba(0, 100, 148, 0.8), rgba(2, 132, 199, 0.72))",
        Icon: BookOpen,
    },
    eslp: {
        modifier: styles.eslpCard,
        accent: styles.greenCard,
        gradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.72))",
        Icon: Users,
    },
    exchange: {
        accent: styles.purpleCard,
        gradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.85), rgba(124, 58, 237, 0.7))",
        Icon: Globe,
    },
    labs: {
        accent: styles.blueCard,
        gradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.8), rgba(14, 165, 233, 0.65))",
        Icon: Lightbulb,
    },
};

export default function MissionPage({ initiatives, partners }: MissionPageProps) {
    const { t } = useLanguage();

    const spotlightInitiatives = useMemo(() => {
        const preferredOrder = ["academy", "eslp", "exchange"];
        const prioritized = preferredOrder
            .map((slug) => initiatives.find((initiative) => initiative.slug === slug))
            .filter((initiative): initiative is Initiative => Boolean(initiative));

        if (prioritized.length < 3) {
            const remaining = initiatives.filter(
                (initiative) => !preferredOrder.includes(initiative.slug)
            );
            prioritized.push(...remaining.slice(0, 3 - prioritized.length));
        }

        return prioritized.slice(0, 3);
    }, [initiatives]);

    const featuredPartners = useMemo(() => partners.slice(0, 6), [partners]);
    
    // Trigger the navbar donate button when MissionPage donate buttons are clicked
    const handleDonateClick = () => {
        // Find the navbar donate button and trigger its click
        const navbarDonateButton = document.querySelector('button[zeffy-form-link]') as HTMLButtonElement;
        if (navbarDonateButton) {
            navbarDonateButton.click();
        }
    };
    return (
        <div className={styles.missionPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6">
                            <div className={styles.heroContent}>
                                <h1 className={styles.heroTitle}>{t('mission.mission_title')}</h1>
                                <p className={styles.heroDescription}>
                                    {t('mission.mission_description')}
                                </p>
                                <div className={styles.heroCta}>
                                    <button
                                        type="button"
                                        className={styles.donateBtn}
                                        onClick={handleDonateClick}
                                    >
                                        {t('donate.donate_now')}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.heroImage}>
                                <Image
                                    src="/images/hero_images/eslp_bg.jpg"
                                    alt="EdLight Mission"
                                    width={600}
                                    height={400}
                                    className={styles.heroImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Projects Section */}
            <section className={styles.projectsSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>{t('mission.projects_title')}</h2>
                        <p className={styles.sectionSubtitle}>
                            {t('mission.hero_description')}
                        </p>
                    </div>

                    <div className="row g-4">
                        {spotlightInitiatives.map((initiative) => {
                            const config = cardConfig[initiative.slug] ?? cardConfig.default;
                            const { Icon, gradient, accent } = config;
                            const cardClasses = [styles.projectCard, config.modifier, accent]
                                .filter(Boolean)
                                .join(' ');
                            const heroImage = initiative.heroImage ?? '/images/hero_images/eslp_bg.jpg';
                            const primaryAction = initiative.actions?.[0];
                            const ctaLabel = primaryAction?.label ?? t('home.learn_more');

                            const isExternal = primaryAction?.href?.startsWith('http');

                            return (
                                <div key={initiative.slug} className="col-lg-4 col-md-6">
                                    <div className={cardClasses}>
                                        <div className={styles.projectBackground}>
                                            <Image
                                                src={heroImage}
                                                alt={initiative.title}
                                                fill
                                                className={styles.backgroundImage}
                                            />
                                            <div
                                                className={styles.backgroundOverlay}
                                                style={gradient ? { background: gradient } : undefined}
                                            ></div>
                                        </div>
                                        <div className={styles.projectContent}>
                                            <div className={styles.projectIcon}>
                                                <Icon size={40} />
                                            </div>
                                            <h3 className={styles.projectTitle}>{initiative.title}</h3>
                                            <p className={styles.projectDescription}>
                                                {initiative.summary}
                                            </p>
                                            {primaryAction ? (
                                                isExternal ? (
                                                    <a
                                                        href={primaryAction.href ?? '#'}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={styles.projectLink}
                                                    >
                                                        {ctaLabel} <ArrowRight size={16} />
                                                    </a>
                                                ) : (
                                                    <Link href={primaryAction.href ?? '#'} className={styles.projectLink}>
                                                        {ctaLabel} <ArrowRight size={16} />
                                                    </Link>
                                                )
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className={styles.ctaTitle}>Join Our Mission</h2>
                            <p className={styles.ctaDescription}>
                                Together, we can create a brighter future for all. Join us in our quest for 
                                educational equity and help us empower the next generation of leaders.
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link href="/ESLP" className={`btn ${styles.primaryBtn}`}>
                                    Apply to ESLP 2025
                                </Link>
                                <button
                                    type="button"
                                    className={styles.donateBtn}
                                    onClick={handleDonateClick}
                                >
                                    {t('donate.donate_now')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className={styles.partnersSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Our Partners</h2>
                        <p className={styles.sectionSubtitle}>
                            Working together to create lasting impact in communities worldwide
                        </p>
                    </div>

                    <div className={styles.partnersGrid}>
                        {featuredPartners.map((partner) => {
                            const logo = partner.logo ?? '/images/partners/fellowsfp.avif';
                            const partnerLogo = (
                                <Image
                                    src={logo}
                                    alt={partner.name}
                                    width={200}
                                    height={100}
                                    className={styles.partnerLogo}
                                />
                            );

                            return (
                                <div key={partner.name} className={styles.partnerItem}>
                                    {partner.href ? (
                                        <a href={partner.href} target="_blank" rel="noreferrer">
                                            {partnerLogo}
                                        </a>
                                    ) : (
                                        partnerLogo
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
