"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
    const { t } = useLanguage();
    return (
        <div className={styles.aboutPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6">
                            <div className={styles.heroContent}>
                                <h1 className={styles.heroTitle}>{t('about.who_are_we')}</h1>
                                <p className={styles.heroDescription}>
                                    {t('about.description')}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.heroVideo}>
                                <video
                                    src="/video/EdLight - Intro Video.mp4"
                                    className={styles.heroVideoPlayer}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="metadata"
                                    poster="/images/hero_images/eslp_bg.jpg"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet our initiators Section */}
            <section className={styles.teamSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>{t('about.meet_initiators')}</h2>
                    </div>

                    <div className="row g-4">
                        {/* CEO - Stevenson Michel */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/team_members/Steevenson Michel.avif?v=1"
                                        alt="Stevenson Michel"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>{t('team.ceo')}</h3>
                                    <h4 className={styles.memberName}>Stevenson Michel</h4>
                                    <p className={styles.memberDescription}>
                                        {t('team.stevenson_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CFO - Ted Jacquet */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/team_members/Ted Jaquet.avif?v=1"
                                        alt="Ted Jacquet"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>{t('team.cfo')}</h3>
                                    <h4 className={styles.memberName}>Ted Jacquet</h4>
                                    <p className={styles.memberDescription}>
                                        {t('team.ted_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Outreach Coordinator - Christopher Michel */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/team_members/Christopher Michel.avif?v=1"
                                        alt="Christopher Michel"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>{t('team.outreach_coordinator')}</h3>
                                    <h4 className={styles.memberName}>Christopher Michel</h4>
                                    <p className={styles.memberDescription}>
                                        {t('team.christopher_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Regional Director - Williamson Michel */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/team_members/Williamson Michel.avif"
                                        alt="Williamson Michel"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>{t('team.regional_director')}</h3>
                                    <h4 className={styles.memberName}>Williamson Michel</h4>
                                    <p className={styles.memberDescription}>
                                        {t('team.williamson_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Chief Logistics Officer - Stéphane Lainé */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/team_members/Stephane Lainee.jpg"
                                        alt="Stéphane Lainé"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>{t('team.chief_logistics_officer')}</h3>
                                    <h4 className={styles.memberName}>Stéphane Lainé</h4>
                                    <p className={styles.memberDescription}>
                                        {t('team.stephane_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ESLP Director - Rony Francillon */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/team_members/Rony Francillon.avif?v=1"
                                        alt="Rony Francillon"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>{t('team.eslp_director')}</h3>
                                    <h4 className={styles.memberName}>Rony Francillon</h4>
                                    <p className={styles.memberDescription}>
                                        {t('team.rony_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Organizers Section */}
            <section className={styles.organizersSection}>
                <div className="container text-center">

                    <Link href="/ESLP/application" className={styles.applyButton}>
                        {t('about.apply_eslp')}
                    </Link>
                </div>
            </section>
        </div>
    );
}
