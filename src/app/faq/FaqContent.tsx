"use client";

import { useState } from "react";
import { ChevronDown, Compass, GraduationCap, Users } from "lucide-react";
import styles from "./Faq.module.css";

const categories = [
    {
        title: "Programs & Eligibility",
        icon: Compass,
        faqs: [
            {
                question: "Who can apply to EdLight programs?",
                answer:
                    "Our programs are designed for Haitian students ages 14–22 who are passionate about STEM, leadership, and community impact. Some offerings, like the Global Exchange, may require English or French proficiency and referral letters.",
            },
            {
                question: "Do I need to live in Haiti to participate?",
                answer:
                    "Most initiatives prioritize students currently studying in Haiti, but virtual learning experiences and the alumni community are open to members worldwide.",
            },
            {
                question: "How do I stay informed about new cohorts?",
                answer:
                    "Subscribe to our newsletter or follow EdLight on social media. Application timelines, info sessions, and scholarship details are announced there first.",
            },
        ],
    },
    {
        title: "Scholarships & Funding",
        icon: GraduationCap,
        faqs: [
            {
                question: "Is there a cost to join the Global Exchange Program?",
                answer:
                    "The program is largely scholarship-backed. Fellows receive travel, housing, and meal support thanks to our partners. Limited personal contributions may be requested for travel documents.",
            },
            {
                question: "Can I fundraise for my participation?",
                answer:
                    "Absolutely. Our team can provide letters of support, guidance on crowdfunding, and connect you with alumni who have successfully fundraised.",
            },
        ],
    },
    {
        title: "Support & Experience",
        icon: Users,
        faqs: [
            {
                question: "What support do fellows receive while abroad?",
                answer:
                    "Each cohort travels with trained EdLight staff and partners. Fellows receive wellness check-ins, mentorship circles, emergency coverage, and access to on-site counselors.",
            },
            {
                question: "How does EdLight keep participants safe?",
                answer:
                    "We follow a detailed safeguarding policy that covers host vetting, background checks, insurance, and crisis protocols. Parents receive a full briefing before departure.",
            },
            {
                question: "Is there post-program support?",
                answer:
                    "Yes. Alumni receive micro-grants, project coaching, and invitations to ongoing leadership labs so that learning continues long after the exchange.",
            },
        ],
    },
];

export default function FaqContent() {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const toggleItem = (question: string) => {
        setOpenItem((current) => (current === question ? null : question));
    };

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <section className={`${styles.hero} fadeInUp`}>
                    <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
                    <p className={styles.heroDescription}>
                        Everything you need to know about applying, traveling, and thriving with EdLight. If you cannot find your
                        answer here, our team is one message away.
                    </p>
                </section>

                {categories.map((category) => (
                    <section key={category.title} className={`${styles.category} fadeIn`}>
                        <div className={styles.categoryTitle}>{category.title}</div>
                        {category.faqs.map((faq) => {
                            const isOpen = openItem === faq.question;
                            return (
                                <article
                                    key={faq.question}
                                    className={`${styles.accordionItem} ${isOpen ? styles.openItem : ""}`}
                                >
                                    <button
                                        type="button"
                                        className={styles.accordionHeader}
                                        onClick={() => toggleItem(faq.question)}
                                        aria-expanded={isOpen}
                                    >
                                        <div className={styles.iconWrap}>
                                            <category.icon size={18} />
                                        </div>
                                        <span>{faq.question}</span>
                                        <ChevronDown
                                            size={20}
                                            style={{
                                                transform: `rotate(${isOpen ? 180 : 0}deg)`,
                                                transition: "transform 0.3s ease"
                                            }}
                                        />
                                    </button>
                                    <div
                                        className={`${styles.accordionContent} ${isOpen ? "open" : ""}`}
                                        style={{ maxHeight: isOpen ? "400px" : "0" }}
                                    >
                                        <p>{faq.answer}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                ))}
            </div>
        </main>
    );
}
