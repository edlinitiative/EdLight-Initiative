import styles from "./Terms.module.css";

export const metadata = {
    title: "Terms of Use | EdLight Initiative",
    description:
        "Review the terms of use that govern participation in EdLight Initiative programs and use of our digital platforms.",
};

const lastUpdated = "October 31, 2025";

export default function TermsPage() {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <section className={`${styles.hero} fadeInUp`}>
                    <h1 className={styles.heroTitle}>Terms of Use</h1>
                    <p className={styles.heroDescription}>
                        These terms outline how you may access and engage with EdLight Initiative programs, digital platforms, and
                        resources. By using our services, you agree to the responsibilities and community guidelines below.
                    </p>
                    <p className={styles.heroDescription}>Last updated: {lastUpdated}</p>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        Accessing EdLight services—including online courses, the Global Exchange Program, or leadership cohorts—
                        signifies your agreement with these Terms of Use. If you do not agree, please discontinue use of our
                        services.
                    </p>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>2. Program Eligibility</h2>
                    <ul>
                        <li>You must provide accurate information during applications and communications.</li>
                        <li>
                            Participants under 18 require parental or guardian consent for travel, housing, or exchange
                            involvement.
                        </li>
                        <li>
                            EdLight reserves the right to approve, decline, or remove participants who do not align with program
                            requirements or community values.
                        </li>
                    </ul>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>3. Community Conduct</h2>
                    <p>We are committed to respectful, inclusive learning spaces. Participants agree to:</p>
                    <ul>
                        <li>Treat fellow participants, facilitators, and partners with respect and empathy.</li>
                        <li>Avoid harassment, discrimination, or disruptive behavior in any EdLight setting.</li>
                        <li>Respect intellectual property, privacy, and confidentiality agreements.</li>
                    </ul>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>4. Digital Platforms & Content</h2>
                    <p>
                        EdLight content (videos, curriculum, branding) is protected intellectual property. You may not copy, share,
                        or monetize our materials without written permission. Platform access may be suspended for misuse or
                        security concerns.
                    </p>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>5. Travel & Safety</h2>
                    <p>
                        For international programs, participants must follow all travel guidelines, host institution policies, and
                        local laws. EdLight provides safeguarding protocols, but participants are responsible for adhering to
                        safety instructions and informing staff of concerns immediately.
                    </p>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>6. Limitation of Liability</h2>
                    <p>
                        While we strive for exceptional programming, EdLight is not liable for indirect, incidental, or
                        consequential damages resulting from program participation or platform use, except where prohibited by law.
                    </p>
                </section>

                <section className={`${styles.section} fadeIn`}>
                    <h2>7. Updates & Contact</h2>
                    <p>
                        We may update these terms as programs evolve. Continued use of our services after changes means you accept
                        the revised terms.
                    </p>
                    <p>
                        Questions? Email <strong>hello@edlinitiative.org</strong> and our team will be glad to help.
                    </p>
                </section>
            </div>
        </main>
    );
}
