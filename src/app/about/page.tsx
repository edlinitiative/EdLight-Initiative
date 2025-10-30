"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";

export default function AboutPage() {
    return (
        <div className={styles.aboutPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6">
                            <div className={styles.heroContent}>
                                <h1 className={styles.heroTitle}>Who are we?</h1>
                                <p className={styles.heroDescription}>
                                    Established in 2020 by a passionate group of students, EdLight is committed to reshaping the educational landscape in Haiti. Our mission is to empower students by equipping them with the resources and support necessary to navigate their educational journey successfully. We collaborate with local educators, ensuring high-quality teaching that enables students to comprehend concepts fully. Our goal is to prepare students effectively for national exams and university studies.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.heroImage}>
                                <Image
                                    src="/images/hero_images/eslp_bg.jpg"
                                    alt="EdLight Initiative"
                                    width={600}
                                    height={400}
                                    className={styles.heroImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet our initiators Section */}
            <section className={styles.teamSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Meet our initiators</h2>
                    </div>

                    <div className="row g-4">
                        {/* CEO - Stevenson Michel */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/edl_logo.png"
                                        alt="Stevenson Michel"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>Chief Executive Officer</h3>
                                    <h4 className={styles.memberName}>Stevenson Michel</h4>
                                    <p className={styles.memberDescription}>
                                        Stevenson is an architecture student at FDS, Haiti's leading institution for engineering. He transferred to Concordia College in Kentucky where he hopes to continue his undergraduate studies in mathematics and computer science. Previously, he worked for the National Television of Haiti as an intern. He hopes to use the skills learned there to ensure smooth display of content.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CFO - Ted Jacquet */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/hero_images/eslp_bg.jpg"
                                        alt="Ted Jacquet"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>Chief Financial Officer</h3>
                                    <h4 className={styles.memberName}>Ted Jacquet</h4>
                                    <p className={styles.memberDescription}>
                                        Ted is majoring in Economics and Data Science at Earlham College. He is passionate about social entrepreneurship. He currently leads the Net Impact chapter, where students gain experience in entrepreneurship. He is also involved in many other activities on campus such as Student Activities Council, Model UN, Resident Assistant, etc. He really hopes that the EdLight initiative has helped other students at school.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Outreach Coordinator - Christopher Michel */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/internships.jpg"
                                        alt="Christopher Michel"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>Outreach coordinator</h3>
                                    <h4 className={styles.memberName}>Christopher Michel</h4>
                                    <p className={styles.memberDescription}>
                                        Christopher is a physics student at the University of Ottawa. He enjoys teaching and was previously a part-time teacher for some students in the Greater Montreal area. Passionate about documentaries on nature, he likes to tell them to others. His project is very passionate about this project and can't wait to see it completed.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Regional Director - Williamson Michel */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/internships.avif"
                                        alt="Williamson Michel"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>Regional Director</h3>
                                    <h4 className={styles.memberName}>Williamson Michel</h4>
                                    <p className={styles.memberDescription}>
                                        Williamson Michel serves as the Regional Director of EdLight, overseeing all operations and initiatives across Haiti. With a deep understanding of the local context and a strong commitment to educational equity, Williamson leads with purpose, ensuring that EdLight's mission is effectively implemented on the ground. His leadership plays a crucial role in building partnerships, supporting program delivery, and expanding the organization's reach and impact.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Chief Logistics Officer - Stéphane Lainé */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/partners/fellowsfp.avif"
                                        alt="Stéphane Lainé"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>Chief Logistics Officer</h3>
                                    <h4 className={styles.memberName}>Stéphane Lainé</h4>
                                    <p className={styles.memberDescription}>
                                        Stephane Laine is the Chief Logistics Officer of the EdLight Summer Leadership Program, where he plays a pivotal role in ensuring the smooth coordination and execution of all program operations. A recent graduate in Computer Science from Université Quisqueya, Stephane combines his technical skills with a strong sense of organization and problem-solving to support the success of EdLight's mission.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ESLP Director - Rony Francillon */}
                        <div className="col-lg-6 col-md-6">
                            <div className={styles.teamCard}>
                                <div className={styles.teamImage}>
                                    <Image
                                        src="/images/partners/lekol.avif"
                                        alt="Rony Francillon"
                                        width={200}
                                        height={200}
                                        className={styles.memberPhoto}
                                    />
                                </div>
                                <div className={styles.teamContent}>
                                    <h3 className={styles.memberTitle}>ESLP Director</h3>
                                    <h4 className={styles.memberName}>Rony Francillon</h4>
                                    <p className={styles.memberDescription}>
                                        Rony Francillon is a passionate educator and visionary leader dedicated to empowering youth through education and civic engagement. As the Program Director of the EdLight Summer Leadership Program, he brings a unique blend of academic expertise and grassroots experience to create transformative learning experiences for students in Haiti. Currently pursuing a Master's degree in France, Rony continues to shape the program's strategic direction.
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
                    <h2 className={styles.sectionTitle}>Organizers</h2>
                    <Link href="/ESLP/application" className={styles.applyButton}>
                        Apply to ESLP 2025
                    </Link>
                </div>
            </section>
        </div>
    );
}
