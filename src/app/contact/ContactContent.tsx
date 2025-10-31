"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, SendHorizontal, Sparkles, Users } from "lucide-react";
import styles from "./Contact.module.css";

const contactHighlights = [
    {
        icon: Sparkles,
        title: "Program Support",
        value: "Admissions, scholarships, and exchange inquiries.",
    },
    {
        icon: Users,
        title: "Partnerships",
        value: "Collaborate with EdLight on community impact.",
    },
    {
        icon: Clock,
        title: "Response Time",
        value: "We respond within 2 business days.",
    },
];

const contactChannels = [
    {
        icon: Mail,
        title: "Email",
        value: "info@edlinitiative.org",
        href: "mailto:info@edlinitiative.org",
    },
    {
        icon: Phone,
        title: "Phone",
        value: "+1 (631) 629-5402",
        href: "tel:16316295402",
    },
    {
        icon: MapPin,
        title: "HQ",
        value: "Montréal, QC, Canada",
        href: "https://www.google.com/maps/place/EdLight+Initiative",
    },
];

export default function ContactContent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization: "",
        interest: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus("error");
            return;
        }

        setSubmitting(true);
        setStatus("idle");

        await new Promise((resolve) => setTimeout(resolve, 1200));

        setSubmitting(false);
        setStatus("success");
        setFormData({ name: "", email: "", organization: "", interest: "", message: "" });
    };

    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <section className={`${styles.hero} fadeInUp`}>
                    <h1 className={styles.heroTitle}>Let’s build the future of education together</h1>
                    <p className={styles.heroSubtitle}>
                        Whether you are a parent, student, educator, or partner, we would love to hear how we can collaborate.
                        Reach out with ideas, requests, or questions and our team will connect with you shortly.
                    </p>
                    <div className={styles.contactHighlights}>
                        {contactHighlights.map((item) => (
                            <div key={item.title} className={`${styles.highlightCard} fadeIn`}>
                                <div className={styles.highlightIcon}>
                                    <item.icon size={22} />
                                </div>
                                <h3 className={styles.highlightTitle}>{item.title}</h3>
                                <p className={styles.highlightValue}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.bodyGrid}>
                    <aside className={`${styles.leftColumn} fadeIn`}>
                        <div className={styles.infoCard}>
                            <h2 className={styles.infoTitle}>Connect with our team</h2>
                            <p>We are available Monday through Friday to support your journey with EdLight.</p>
                            <div className={styles.infoItem}>
                                <Sparkles size={18} />
                                <span>
                                    Explore the <Link href="/global-exchange">Global Exchange Program</Link> or ask about upcoming cohorts.
                                </span>
                            </div>
                            {contactChannels.map((channel) => (
                                <a key={channel.title} href={channel.href} className={styles.infoItem} target="_blank" rel="noreferrer">
                                    <channel.icon size={18} />
                                    <span>
                                        <strong>{channel.title}</strong>
                                        <br />
                                        {channel.value}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </aside>

                    <div className={`${styles.rightColumn} fadeInUp`}>
                        <form className={styles.formCard} onSubmit={handleSubmit}>
                            <div className={styles.formHeader}>
                                <h2>Send us a message</h2>
                                <p>Share a few details and we will follow up with the right next steps.</p>
                            </div>
                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel} htmlFor="contact-name">
                                        Full Name *
                                    </label>
                                    <input
                                        id="contact-name"
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange("name")}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel} htmlFor="contact-email">
                                        Email *
                                    </label>
                                    <input
                                        id="contact-email"
                                        className={styles.inputField}
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange("email")}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel} htmlFor="contact-organization">
                                        Organization
                                    </label>
                                    <input
                                        id="contact-organization"
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="School or organization (optional)"
                                        value={formData.organization}
                                        onChange={handleChange("organization")}
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.inputLabel} htmlFor="contact-interest">
                                        Area of Interest
                                    </label>
                                    <input
                                        id="contact-interest"
                                        className={styles.inputField}
                                        type="text"
                                        placeholder="Programs, media, partnership, etc."
                                        value={formData.interest}
                                        onChange={handleChange("interest")}
                                    />
                                </div>
                                <div className={styles.inputGroup} style={{ gridColumn: "1 / -1" }}>
                                    <label className={styles.inputLabel} htmlFor="contact-message">
                                        How can we help? *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        className={styles.inputField}
                                        placeholder="Share your questions or ideas"
                                        value={formData.message}
                                        onChange={handleChange("message")}
                                        required
                                    />
                                </div>
                            </div>

                            {status !== "idle" && (
                                <div
                                    className={`${styles.statusMessage} ${status === "success" ? styles.statusSuccess : styles.statusError}`}
                                >
                                    {status === "success"
                                        ? "Thanks! We received your message and will reply soon."
                                        : "Please complete all required fields."}
                                </div>
                            )}

                            <div className={styles.submitRow}>
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${submitting ? "loading" : ""}`}
                                    disabled={submitting}
                                >
                                    {submitting ? "Sending" : "Send Message"}
                                    {!submitting && <SendHorizontal size={18} style={{ marginLeft: "0.5rem" }} />}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}
