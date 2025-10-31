"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import styles from "../../styles/HomeHero.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

// Hero data with different subjects - will be updated with translations

export default function HeroHome() {
        const { t } = useLanguage();
        const [currentIndex, setCurrentIndex] = useState(0);
        const [isAnimating, setIsAnimating] = useState(false);
        const [mounted, setMounted] = useState(false);

        const heroData = useMemo(() => (
            [
                {
                    id: 1,
                    title: t("nav.eslp"),
                    description: t("eslp.hero_description"),
                    backgroundImage:
                        "https://static.wixstatic.com/media/fb71c2_8e62ff414cfb4936b80e9be8a9f88532~mv2.jpg/v1/fill/w_1470,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fb71c2_8e62ff414cfb4936b80e9be8a9f88532~mv2.jpg",
                    primaryCTA: t("home.learn_more"),
                    primaryCTAUrl: "/ESLP",
                    secondaryCTA: "See what the application looks like",
                    secondaryCTAUrl: "/ESLP/application",
                },
                {
                    id: 2,
                    title: t("mission.online_courses_title"),
                    description: t("mission.online_courses_description"),
                    backgroundImage:
                        "https://static.wixstatic.com/media/fb71c2_254f5acc27404c8abedc12a761fd1b2d~mv2.jpg/v1/fill/w_1470,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fb71c2_254f5acc27404c8abedc12a761fd1b2d~mv2.jpg",
                    primaryCTA: t("courses.enroll_now"),
                    primaryCTAUrl: "https://www.youtube.com/@edlight-initiative",
                    secondaryCTA: null,
                    secondaryCTAUrl: undefined,
                },
            ]
        ), [t]);

    useEffect(() => {
        setMounted(true);
    }, []);

        const nextSlide = useCallback(() => {
            if (isAnimating) return;
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev + 1) % heroData.length);
            setTimeout(() => setIsAnimating(false), 800);
        }, [heroData.length, isAnimating]);

        const prevSlide = useCallback(() => {
            if (isAnimating) return;
            setIsAnimating(true);
            setCurrentIndex((prev) => (prev - 1 + heroData.length) % heroData.length);
            setTimeout(() => setIsAnimating(false), 800);
        }, [heroData.length, isAnimating]);

        const goToSlide = useCallback(
            (index: number) => {
                if (isAnimating || index === currentIndex) return;
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 800);
            },
            [currentIndex, isAnimating]
        );

        useEffect(() => {
            const interval = window.setInterval(() => {
                nextSlide();
            }, 15000);

            return () => window.clearInterval(interval);
        }, [nextSlide]);

    const currentHero = heroData[currentIndex];
    // const IconComponent = currentHero.icon;

    if (!mounted) {
        return (
            <section className="hero-section loading">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="loading-placeholder"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.heroSection}>
            {/* Background Images */}
            <div className={styles.heroBackgrounds}>
                {heroData.map((hero, index) => (
                    <div
                        key={hero.id}
                        className={`${styles.heroBackground} ${index === currentIndex ? styles.active : ''}`}
                        style={{
                            backgroundImage: `url(${hero.backgroundImage})`,
                        }}
                    />
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className={styles.heroOverlay} />


            <div className={styles.heroContainer}>
                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    disabled={isAnimating}
                    className={`${styles.heroNavButton} ${styles.prev}`}
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={nextSlide}
                    disabled={isAnimating}
                    className={`${styles.heroNavButton} ${styles.next}`}
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Main Content */}
                <div className={styles.heroContent}>
                    {/* Glass Panel */}
                    <div className={styles.heroGlass}>
                    {/* Icon */}
                    {/*<div className={`${styles.heroIcon} ${isAnimating ? styles.animating : ''}`}>*/}
                    {/*    <IconComponent size={48} />*/}
                    {/*</div>*/}

                    {/* Text Content */}
                    <div className={`${styles.heroText} ${isAnimating ? styles.animating : ''}`}>
                        {/*<div className={styles.heroSubtitle}>{currentHero.subtitle}</div>*/}
                        <h1 className={styles.heroTitle}>{currentHero.title}</h1>
                        <p className={styles.heroDescription}>{currentHero.description}</p>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`${styles.heroActions} ${isAnimating ? styles.animating : ''}`}>
                        <button 
                        onClick={() => {
                            const url = currentHero.primaryCTAUrl;
                            if (/^https?:\/\//.test(url)) {
                                window.open(url, '_blank', 'noopener,noreferrer');
                            } else {
                                window.location.href = url;
                            }
                        }} 
                        className={`${styles.heroCta} ${styles.primary}`}>
                            {currentHero.primaryCTA}
                            <ArrowRight size={20} />
                        </button>

                        {currentHero.secondaryCTA && (
                            <button 
                            onClick={() => {
                                const url = currentHero.secondaryCTAUrl;
                                if (typeof url === 'string' && /^https?:\/\//.test(url)) {
                                    window.open(url, '_blank', 'noopener,noreferrer');
                                } else if (typeof url === 'string') {
                                    window.location.href = url;
                                }
                            }} 
                             className={`${styles.heroCta} ${styles.secondary}`}>
                                <Eye size={18} />
                                {currentHero.secondaryCTA}
                            </button>
                        )}
                    </div>
                    </div>

                    {/*/!* Stats *!/*/}
                    {/*<div className={`${styles.heroStats} ${isAnimating ? styles.animating : ''}`}>*/}
                    {/*    {currentHero.stats.map((stat, index) => (*/}
                    {/*        <div key={index} className={styles.statItem}>*/}
                    {/*            <div className={styles.statValue}>{stat.value}</div>*/}
                    {/*            <div className={styles.statLabel}>{stat.label}</div>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>

                {/* Slide Indicators */}
                <div className={styles.heroIndicators}>
                    {heroData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
}