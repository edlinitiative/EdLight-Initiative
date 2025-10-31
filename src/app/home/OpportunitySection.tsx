"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { ArrowRight, Briefcase, Calendar, MapPin } from "lucide-react";
import styles from "../../styles/Home.module.css";
import type { Initiative } from "@/lib/content";

type OpportunitySectionProps = {
    initiative?: Initiative;
};

export default function OpportunitySection({ initiative }: OpportunitySectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fadeIn");
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

        const detailEntries = useMemo(() => {
            if (initiative?.stats?.length) {
                const [first, second] = initiative.stats;
                return [first, second]
                    .filter(Boolean)
                    .map((stat, index) => ({
                        Icon: index === 0 ? Calendar : MapPin,
                        text: stat ? `${stat.value} ${stat.label}`.trim() : "",
                    }))
                    .filter((entry) => entry.text);
            }

            return [
                { Icon: Calendar, text: "Summer 2025" },
                { Icon: MapPin, text: "Haiti" },
            ];
        }, [initiative]);

    const cta = useMemo(() => {
        if (!initiative?.actions?.length) {
            return {
                label: "Apply now",
                href: "https://docs.google.com/forms/d/e/1FAIpQLSfbUfwc5m39mcCeXqNk68vJjJ4q9BQM7ZjYtw6oian0X6tqKA/viewform",
            };
        }
        return (
            initiative.actions.find((action) => /apply/i.test(action.label)) ?? initiative.actions[0]
        );
    }, [initiative]);

    return (
        <section className={styles.opportunitySection}>
            <div className={styles.container}>
                <div ref={sectionRef} className={styles.opportunityContent} style={{ opacity: 0 }}>
                    <div className={styles.opportunityImage}>
                        <div className={styles.imageOverlay}>
                            <Briefcase size={64} />
                            <p>{initiative?.title ?? "Internship Opportunity"}</p>
                        </div>
                    </div>
                    <div className={styles.opportunityText}>
                        <h2 className={styles.opportunityTitle}>{initiative?.title ?? "Opportunité de stage"}</h2>
                        <p className={styles.opportunitySubtitle}>
                            {initiative?.summary ?? "Appliquez pour devenir un stagiaire à l'ESLP 2025"}
                        </p>
                                    <div className={styles.opportunityDetails}>
                                        {detailEntries.map(({ Icon, text }, index) => (
                                            <div key={index} className={styles.detailItem}>
                                                <Icon size={20} />
                                                <span>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                        <button
                            onClick={() => {
                                if (/^https?:/i.test(cta.href)) {
                                    window.open(cta.href, "_blank", "noopener,noreferrer");
                                } else {
                                    window.location.href = cta.href;
                                }
                            }}
                            className={styles.opportunityCta}
                        >
                            {cta.label}
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
