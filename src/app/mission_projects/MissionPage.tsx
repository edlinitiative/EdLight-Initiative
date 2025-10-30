"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, Lightbulb } from "lucide-react";
import styles from "./MissionPage.module.css";
import DonateButton from "@/components/DonateButton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MissionPage() {
    const { t } = useLanguage();
    
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
                        {/* Online Courses Project */}
                        <div className="col-lg-4 col-md-6">
                            <div className={`${styles.projectCard} ${styles.blueCard} ${styles.onlineCoursesCard}`}>
                                <div className={styles.projectBackground}>
                                    <Image
                                        src="/images/berlensky.jpg"
                                        alt="Online Courses Background"
                                        fill
                                        className={styles.backgroundImage}
                                    />
                                    <div className={styles.backgroundOverlay}></div>
                                </div>
                                <div className={styles.projectContent}>
                                    <div className={styles.projectIcon}>
                                        <BookOpen size={40} />
                                    </div>
                                    <h3 className={styles.projectTitle}>{t('mission.online_courses_title')}</h3>
                                    <p className={styles.projectDescription}>
                                        {t('mission.online_courses_description')}
                                    </p>
                                    <Link href="/courses" className={styles.projectLink}>
                                        {t('home.learn_more')} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ESLP Project */}
                        <div className="col-lg-4 col-md-6">
                            <div className={`${styles.projectCard} ${styles.greenCard} ${styles.eslpCard}`}>
                                <div className={styles.projectBackground}>
                                    <Image
                                        src="/images/hero_images/eslp_bg.jpg"
                                        alt="ESLP Background"
                                        fill
                                        className={styles.backgroundImage}
                                    />
                                    <div className={styles.backgroundOverlay}></div>
                                </div>
                                <div className={styles.projectContent}>
                                    <div className={styles.projectIcon}>
                                        <Users size={40} />
                                    </div>
                                    <h3 className={styles.projectTitle}>{t('mission.eslp_title')}</h3>
                                    <p className={styles.projectDescription}>
                                        {t('mission.eslp_description')}
                                    </p>
                                    <Link href="/ESLP" className={styles.projectLink}>
                                        {t('home.learn_more')} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* EIFP Project */}
                        <div className="col-lg-4 col-md-6">
                            <div className={`${styles.projectCard} ${styles.purpleCard} ${styles.eifpCard}`}>
                                <div className={styles.projectBackground}>
                                    <Image
                                        src="/images/internships.avif"
                                        alt="EIFP Background"
                                        fill
                                        className={styles.backgroundImage}
                                    />
                                    <div className={styles.backgroundOverlay}></div>
                                </div>
                                <div className={styles.projectContent}>
                                    <div className={styles.projectIcon}>
                                        <Lightbulb size={40} />
                                    </div>
                                    <h3 className={styles.projectTitle}>{t('mission.eifp_title')}</h3>
                                    <p className={styles.projectDescription}>
                                        {t('mission.eifp_description')}
                                    </p>
                                    <span className={styles.projectLink}>
                                        Coming soon
                                    </span>
                                </div>
                            </div>
                        </div>
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
                        <div className={styles.partnerItem}>
                            <Image
                                src="/images/partners/fellowsfp.avif"
                                alt="Fellows FP Partner"
                                width={200}
                                height={100}
                                className={styles.partnerLogo}
                            />
                        </div>
                        <div className={styles.partnerItem}>
                            <Image
                                src="/images/partners/uwc.avif"
                                alt="UWC Partner"
                                width={200}
                                height={100}
                                className={styles.partnerLogo}
                            />
                        </div>
                        <div className={styles.partnerItem}>
                            <Image
                                src="/images/partners/lekol.avif"
                                alt="Lekol Partner"
                                width={200}
                                height={100}
                                className={styles.partnerLogo}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
