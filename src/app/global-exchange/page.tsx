import Link from "next/link";
import { ArrowRightCircle, Globe2, GraduationCap, Handshake, MapPin, Plane, Sparkles, Users } from "lucide-react";
import styles from "./GlobalExchange.module.css";

export const metadata = {
    title: "EdLight Global Exchange Program",
    description: "Experience immersive cultural learning with the EdLight Global Exchange Program—bridging Haitian youth with global communities through education, travel, and collaboration.",
};

const highlights = [
    {
        icon: Plane,
        title: "International Immersion",
        description: "Two-week curated residencies with partner schools and youth hubs across North America and Europe.",
    },
    {
        icon: Handshake,
        title: "Collaborative Projects",
        description: "Students co-create community solutions with their peers abroad, guided by industry mentors.",
    },
    {
        icon: GraduationCap,
        title: "Leadership Masterclasses",
        description: "Deep-dive seminars on diplomacy, social entrepreneurship, and global citizenship.",
    },
    {
        icon: Users,
        title: "Global Alumni Network",
        description: "Lifetime access to our exchange alumni circle, micro-grants, and co-learning labs.",
    },
];

const journey = [
    {
        phase: "Discover",
        details: "Virtual orientation, language labs, and design sprints prepare fellows for cultural immersion.",
    },
    {
        phase: "Immerse",
        details: "On-site exchange in one of our partner cities—students live, learn, and collaborate with host peers.",
    },
    {
        phase: "Co-Create",
        details: "Participants design a capstone solution tackling education access, technology, or sustainability challenges.",
    },
    {
        phase: "Reignite",
        details: "Back in Haiti, fellows pilot their projects with micro-seed funding and mentorship from global advisors.",
    },
];

const support = [
    {
        title: "Holistic Preparation",
        description: "Personalized coaching, visa support, wellness briefings, and family onboarding ensure a smooth journey.",
    },
    {
        title: "Immersive Housing",
        description: "Safe host families and residence partners vetted by our travel and safeguarding team.",
    },
    {
        title: "Future Pathways",
        description: "Scholarship advisement, internship pipelines, and college application masterclasses post-program.",
    },
];

export default function GlobalExchangePage() {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <section className={`${styles.hero} fadeInUp`}>
                    <div className={styles.heroContent}>
                        <span className={styles.heroBadge}>
                            <Globe2 size={20} />
                            Global Exchange 2026 Cohort
                        </span>
                        <h1 className={styles.heroTitle}>
                            EdLight Global Exchange Program
                        </h1>
                        <p className={styles.heroSubtitle}>
                            A transformative cultural exchange pairing Haitian changemakers with global learning environments to co-create solutions for their communities.
                        </p>
                        <p className={styles.heroDescription}>
                            Designed for emerging leaders (ages 16–20), the Global Exchange Program blends immersive travel, applied learning, and collaborative innovation. Fellows gain exposure to new pedagogies, cultivate international networks, and return ready to launch high-impact local projects.
                        </p>
                        <div className={styles.heroMeta}>
                            <span className={styles.heroBadge}>
                                <Sparkles size={18} /> 4 Countries · 6 Partner Institutions
                            </span>
                            <span className={styles.heroBadge}>
                                <MapPin size={18} /> Montréal · Boston · Paris · Accra
                            </span>
                        </div>
                        <div className={styles.ctaRow}>
                            <Link href="/ESLP/application" className={`${styles.primaryCta} btn`}>
                                Apply for Updates
                                <ArrowRightCircle size={20} />
                            </Link>
                            <Link href="/contact" className={`${styles.secondaryCta} btn`}>
                                Talk to our team
                            </Link>
                        </div>
                    </div>
                </section>

                <section className={styles.valuesSection}>
                    <div className={`${styles.sectionHeader} fadeIn`}>
                        <h2 className={styles.sectionTitle}>What Makes the Exchange Powerful</h2>
                        <p className={styles.sectionDescription}>
                            We combine travel with purpose: every activity strengthens leadership, empathy, and entrepreneurial drive so fellows can uplift communities at home.
                        </p>
                    </div>
                    <div className={`${styles.valuesGrid}`}>
                        {highlights.map((highlight) => (
                            <article key={highlight.title} className={`${styles.valueCard} fadeInUp`}>
                                <div className={styles.valueIcon}>
                                    <highlight.icon size={26} />
                                </div>
                                <h3 className={styles.valueTitle}>{highlight.title}</h3>
                                <p className={styles.valueDescription}>{highlight.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={`${styles.timeline} fadeIn`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Your Journey with EdLight</h2>
                        <p className={styles.sectionDescription}>
                            A guided four-phase experience takes fellows from discovery to local reintegration—with mentors by your side at every step.
                        </p>
                    </div>
                    <div className={styles.timelineTrack}>
                        {journey.map((stage) => (
                            <div key={stage.phase} className={`${styles.timelineItem} fadeInUp`}>
                                <span className={styles.timelineDot} />
                                <h3 className={styles.timelineTitle}>{stage.phase}</h3>
                                <p className={styles.timelineDetails}>{stage.details}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={`${styles.supportSection} fadeIn`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Support that Travels with You</h2>
                        <p className={styles.sectionDescription}>
                            From pre-departure to alumni coaching, EdLight surrounds fellows with the wraparound support they deserve.
                        </p>
                    </div>
                    <div className={styles.supportList}>
                        {support.map((item) => (
                            <div key={item.title} className={`${styles.supportItem} fadeInUp`}>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
