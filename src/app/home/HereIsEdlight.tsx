"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
    ArrowRight,
    BookOpen,
    Globe,
    Lightbulb,
    Users,
    type LucideIcon,
} from "lucide-react";
import styles from "../../styles/Home.module.css";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Initiative } from "@/lib/content";

type HereIsEdlightProps = {
    initiatives: Initiative[];
};

const iconMap: Record<string, LucideIcon> = {
    academy: BookOpen,
    eslp: Users,
    exchange: Globe,
    labs: Lightbulb,
};

const colorPalette = ["blue", "green", "purple"] as const;

export default function HereIsEdlight({ initiatives }: HereIsEdlightProps) {
    const { t } = useLanguage();
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fadeInUp");
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const featuredInitiatives = useMemo(
        () => initiatives.slice(0, 3),
        [initiatives]
    );

    return (
        <section className={styles.hereIsEdlight}>
            <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>{t("home.here_is_edlight_title")}</h2>
                            <p className={styles.sectionSubtitle}>{t("home.here_is_edlight_description")}</p>
                        </div>

                <div className={styles.programsGrid}>
                    {featuredInitiatives.map((initiative, index) => {
                        const color = colorPalette[index % colorPalette.length];
                        const IconComponent = iconMap[initiative.slug] ?? ArrowRight;
                        const action = initiative.actions[0];

                        return (
                            <div
                                key={initiative.slug}
                                ref={(el) => {
                                    cardsRef.current[index] = el;
                                }}
                                className={`${styles.programCard} ${styles[color]}`}
                                style={{ opacity: 0, animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={styles.programIcon}>
                                    <IconComponent size={48} />
                                </div>
                                <h3 className={styles.programTitle}>{initiative.title}</h3>
                                <p className={styles.programDescription}>{initiative.summary}</p>
                                {action ? (
                                    <button
                                        onClick={() => {
                                            if (/^https?:/i.test(action.href)) {
                                                window.open(action.href, "_blank", "noopener,noreferrer");
                                            } else {
                                                window.location.href = action.href;
                                            }
                                        }}
                                        className={`${styles.programCta} ${styles[color]}`}
                                    >
                                        {action.key ? t(action.key) : action.label}
                                        <ArrowRight size={20} />
                                    </button>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
