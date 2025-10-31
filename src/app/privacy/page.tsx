import styles from "./Privacy.module.css";

export const metadata = {
    title: "Privacy Policy | EdLight Initiative",
    description:
        "Learn how EdLight Initiative collects, uses, and protects your personal information across our educational programs and digital platforms.",
};

const lastUpdated = "October 31, 2025";

export default function PrivacyPage() {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <section className={`${styles.hero} fadeInUp`}>
                    <h1 className={styles.heroTitle}>Privacy Policy</h1>
                    <p>
                        Your trust matters to us. This policy explains how EdLight Initiative collects, uses, and safeguards the
                        information you share through our websites, applications, and programs.
                    </p>
                    <div className={styles.heroMeta}>
                        <span>Organization: EdLight Initiative</span>
                        <span>Effective Date: {lastUpdated}</span>
                        <span>Contact: privacy@edlinitiative.org</span>
                    </div>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information that helps us deliver our programs effectively, keep participants safe, and improve
                        our services. This includes:
                    </p>
                    <ul>
                        <li>Identity data such as name, age, and academic level submitted during program applications.</li>
                        <li>Contact details like email address, phone number, and preferred communication language.</li>
                        <li>
                            Usage data from our digital platforms, including course engagement metrics, survey responses, and
                            website analytics.
                        </li>
                        <li>
                            Media and consent records—photos, videos, or testimonials—only when you explicitly provide consent.
                        </li>
                    </ul>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>2. How We Use Your Information</h2>
                    <p>We use personal data to ensure programs run smoothly and to extend the impact of our mission:</p>
                    <ul>
                        <li>Processing applications, awarding scholarships, and managing participant logistics.</li>
                        <li>Communicating program updates, opportunities, and community impact stories.</li>
                        <li>Improving our curriculum, leadership training, and digital platforms through analytics.</li>
                        <li>Complying with legal obligations and safeguarding participant wellbeing.</li>
                    </ul>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>3. Sharing & Disclosure</h2>
                    <p>
                        We only share personal information when necessary to deliver EdLight experiences or when required by law.
                        We may share data with:
                    </p>
                    <ul>
                        <li>Trusted program partners, host institutions, and travel providers who support the Global Exchange.</li>
                        <li>Technology vendors who power our learning platforms, under strict confidentiality agreements.</li>
                        <li>Government agencies or legal authorities when compliance or participant safety requires it.</li>
                    </ul>
                    <p>
                        We never sell or rent personal data. We ensure that third parties follow rigorous security and privacy
                        standards.
                    </p>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>4. Your Rights & Choices</h2>
                    <p>
                        You remain in control of your information. At any time, you may request to access, update, or delete your
                        data. You can also withdraw media consent or unsubscribe from communications.
                    </p>
                    <p>
                        To exercise your rights, email <strong>privacy@edlinitiative.org</strong>. We respond within 14 days and
                        take all reasonable steps to fulfill your request.
                    </p>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>5. Data Security & Retention</h2>
                    <p>
                        We protect data using encrypted storage, role-based access controls, and regular security audits. We retain
                        personal information only for as long as it serves the program or legal purpose for which it was collected.
                        Application data is archived securely once cohorts conclude.
                    </p>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>6. Updates to this Policy</h2>
                    <p>
                        We review this policy annually to reflect new programs, technologies, or regulations. Significant updates
                        will be communicated via email or through highlighted notices on our website.
                    </p>
                    <p>
                        If you have questions about our privacy practices or would like additional documentation, please reach out
                        to privacy@edlinitiative.org.
                    </p>
                </section>
            </div>
        </main>
    );
}
