"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    Heart,
    MapPin,
    Phone,
    Sparkles,
    Youtube,
    X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import styles from "../styles/Footer.module.css";
import logger from "@/lib/logger";
import buildInfo from "@/lib/buildInfo";
import type { NavLink, RoutesContent, Partner } from "@/lib/content";

type FooterProps = {
    footerSections: RoutesContent["footer"];
    cta?: NavLink;
    partners?: Partner[];
};

type SocialLink = {
    href: string;
    label: string;
    Icon: LucideIcon;
};

const SOCIAL_LINKS: SocialLink[] = [
    { href: "https://www.youtube.com/@edlight-initiative", label: "YouTube", Icon: Youtube },
    { href: "https://www.facebook.com/edlinitiative", label: "Facebook", Icon: Facebook },
    { href: "https://x.com/edlinitiative", label: "X", Icon: X },
    {
        href: "https://www.instagram.com/edlinitiative?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        label: "Instagram",
        Icon: Instagram,
    },
    { href: "https://www.linkedin.com/company/edlight-initiative/", label: "LinkedIn", Icon: Linkedin },
];

export default function Footer({ footerSections, cta, partners = [] }: FooterProps) {
    const { t } = useLanguage();
    const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle");
    const [subscriptionMessage, setSubscriptionMessage] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        logger.debug("Footer mounted, newsletter ready");
    }, []);

        const donateLabel = cta?.key ? t(cta.key) : cta?.label ?? t("nav.donate");
    const resolvedSections = useMemo(() => footerSections ?? [], [footerSections]);

    const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = email.trim();
        if (!trimmed) {
            setSubscriptionStatus("error");
            setSubscriptionMessage("Please enter an email address");
            return;
        }
        setSubmitting(true);
        setSubscriptionStatus("idle");
        try {
            const { subscribeNewsletter } = await import("@/lib/firebaseService");
            const id = await subscribeNewsletter(trimmed, "footer");
            logger.info("Subscribed newsletter id:", id);
            setEmail("");
            setSubscriptionStatus("success");
            setSubscriptionMessage("Thanks for subscribing!");
        } catch (error: unknown) {
            logger.error("Newsletter subscription failed", error);
            setSubscriptionStatus("error");
            setSubscriptionMessage(
                error instanceof Error ? error.message : "Failed to subscribe. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const renderFooterLink = (link: NavLink) => {
        const label = link.key ? t(link.key) : link.label;
        const isExternal = /^https?:/i.test(link.href);
            if (isExternal) {
                return (
                    <a href={link.href} target="_blank" rel="noreferrer" className={`${styles.footerLink} text-sm`}>
                        {label}
                    </a>
                );
            }
            if (link.href.startsWith("#")) {
                return (
                    <a href={link.href} className={`${styles.footerLink} text-sm`}>
                        {label}
                    </a>
                );
            }
            return (
                <Link href={link.href} className={`${styles.footerLink} text-sm`}>
                    {label}
                </Link>
            );
    };

    const featuredPartners = useMemo(() => partners.slice(0, 6), [partners]);

    return (
        <footer className={`${styles.footer} relative`}> 
            <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1.85fr)_repeat(2,minmax(0,1fr))_minmax(0,1.4fr)]">
                    <div className={`${styles.footerSection} flex flex-col gap-4`}>
                        <div className={`${styles.brandContainer}`}>
                            <div className={styles.logoIcon}>
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h2 className={`text-xl font-semibold ${styles.brandTitle}`}>EdLight Initiative</h2>
                                <p className={`text-sm ${styles.brandTagline}`}>{t("footer.brand_tagline")}</p>
                            </div>
                        </div>
                        <p className={`${styles.missionText} text-sm leading-relaxed`}>
                            {t("footer.mission_text")}
                            <Link href="/about-us" className={`${styles.footerLink} ml-1 text-sm`}>
                                {t("footer.learn_more")}
                            </Link>
                        </p>
                        <div className={`${styles.contactInfo} flex flex-col gap-2 text-sm`}>
                            <a
                                className={`${styles.contactItem} inline-flex items-center gap-2`}
                                href="https://www.google.com/maps/place/EdLight+Initiative/@45.501721,-73.567158,15z/data=!4m6!3m5!1s0x4cc91a571e9513b3:0x1135921e02313662!8m2!3d45.501721!4d-73.567158!16s%2Fg%2F1td5v8h9?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MapPin size={16} />
                                Montréal, QC, Canada
                            </a>
                            <a
                                className={`${styles.contactItem} inline-flex items-center gap-2`}
                                href="tel:16316295402"
                            >
                                <Phone size={16} />
                                1 (631) 629-5402
                            </a>
                            <a
                                className={`${styles.contactItem} inline-flex items-center gap-2`}
                                href="mailto:info@edlinitiative.org"
                            >
                                <Mail size={16} />
                                info@edlinitiative.org
                            </a>
                        </div>
                    </div>

                    {resolvedSections.map((section) => {
                        const title = section.titleKey ? t(section.titleKey) : section.title;
                        return (
                            <div key={section.title} className={`${styles.footerSection} flex flex-col gap-4`}>
                                <h3 className={`${styles.sectionTitle} text-sm uppercase`}>{title}</h3>
                                <div className={`${styles.linkList} flex flex-col gap-2`}>
                                                        {section.links.map((link) => (
                                                            <div key={`${section.title}-${link.href}`}>{renderFooterLink(link)}</div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    <div className={`${styles.footerSection} flex flex-col gap-4`}>
                        <h3 className={`${styles.sectionTitle} text-sm uppercase`}>{t("footer.stay_connected")}</h3>
                        <p className={`${styles.newsletterText} text-sm`}>{t("footer.newsletter_text")}</p>
                        <form className={`${styles.newsletterForm} flex flex-col gap-3`} onSubmit={handleSubscribe}>
                            <div className="flex flex-wrap gap-2 rounded-2xl bg-white/10 p-2 backdrop-blur">
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    autoComplete="email"
                                    className={`${styles.emailInput} w-full flex-1 rounded-xl border-none bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-200/70 focus:outline-none`}
                                    placeholder={t("footer.email_placeholder")}
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <button
                                    id="newsletter-submit"
                                    type="submit"
                                    className={`${styles.subscribeBtn} rounded-xl px-4 py-2 text-sm font-semibold`}
                                    disabled={
                                        submitting || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
                                    }
                                >
                                    {submitting ? "Subscribing..." : t("footer.subscribe")}
                                </button>
                            </div>
                            {subscriptionStatus !== "idle" ? (
                                <div
                                    className={`rounded-xl px-4 py-3 text-sm ${
                                        subscriptionStatus === "success"
                                            ? "bg-emerald-500/20 text-white"
                                            : "bg-rose-500/20 text-white"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {subscriptionStatus === "success" ? <Heart size={16} /> : <X size={16} />}
                                        <span>{subscriptionMessage}</span>
                                    </div>
                                </div>
                            ) : null}
                        </form>
                                    {cta ? (
                                        <Link
                                            href={cta.href}
                                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-edlight-primary via-edlight-primary to-edlight-darkAccent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-900/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-edlight-darkAccent"
                                        >
                                            {donateLabel}
                                        </Link>
                                    ) : null}
                        <div className="flex flex-col gap-3">
                            <h4 className={`${styles.socialTitle} text-sm font-semibold`}>{t("footer.follow_us")}</h4>
                            <div className={`${styles.socialIcons}`}>
                                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                                    <Link key={href} href={href} target="_blank" className={styles.socialIcon} aria-label={label}>
                                        <Icon size={20} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="partnerships" className={styles.partnershipSection}>
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h3 className={`${styles.partnershipTitle} text-lg`}>{t("footer.our_partners")}</h3>
                        <p className={`${styles.partnershipSubtitle} mt-4 text-sm`}>{t("footer.partnership_subtitle")}</p>
                    </div>
                    <div className={`${styles.partnersGrid} mt-10`}>
                        {featuredPartners.map((partner) => (
                            <a key={partner.name} href={partner.href} target="_blank" rel="noreferrer" className={styles.partnerItem} aria-label={partner.name}>
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    className={styles.partnerLogo}
                                    width={180}
                                    height={64}
                                    loading="lazy"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-white sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p className={`${styles.copyrightText}`}>
                        © {new Date().getFullYear()} EdLight Initiative. {t("footer.copyright")}
                    </p>
                    <p className={`${styles.loveText} text-sm`}> 
                        {t("footer.made_with_love")} <Heart size={14} className={styles.heartIcon} /> {t("footer.for_communities")}
                    </p>
                    <p className="text-xs opacity-60">
                        build {buildInfo.BUILD_COMMIT} · {buildInfo.BUILD_BRANCH}
                    </p>
                </div>
            </div>
        </footer>
    );
}