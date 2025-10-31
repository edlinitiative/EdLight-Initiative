"use client";
import {Facebook, Twitter, Instagram, 
    Linkedin, Mail, Heart, MapPin,
     Phone, Sparkles, Youtube, X} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import logger from '@/lib/logger';
import buildInfo from '@/lib/buildInfo';

export default function Footer() {
    const { t } = useLanguage();
    const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [subscriptionMessage, setSubscriptionMessage] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Simple hydration-safe debug notice
        logger.debug('Footer mounted, newsletter ready');
    }, []);
    
    return (
        <footer className={styles.footer}>
            {/* Main Footer Content */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* Logo & Mission */}
                    <div className="col-lg-4 col-md-6">
                        <div className={styles.footerSection}>
                            <div className={styles.brandContainer}>
                                <div className={styles.logoIcon}>
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h2 className={`h4 mb-2 ${styles.brandTitle}`}>EdLight Initiative</h2>
                                    <p className={`small ${styles.brandTagline}`}>{t('footer.brand_tagline')}</p>
                                </div>
                            </div>
                            <p className={`mt-3 ${styles.missionText}`}>
                                {t('footer.mission_text')}
                                <a className={styles.footerLink} href="/about-us"> {t('footer.learn_more')}</a>
                            </p>

                            {/* Contact Info */}
                            <div className={styles.contactInfo}>
                                <div className={`d-flex align-items-center mb-2 ${styles.contactItem}`}>
                                    <MapPin size={16} className="me-2" />
                                    <a target="_blank" style={{ textDecoration: 'none', color: 'white' }} href="https://www.google.com/maps/place/EdLight+Initiative/@45.501721,-73.567158,15z/data=!4m6!3m5!1s0x4cc91a571e9513b3:0x1135921e02313662!8m2!3d45.501721!4d-73.567158!16s%2Fg%2F1td5v8h9?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"><small>Montréal, QC, Canada</small></a>
                                </div>
                                <div className={`d-flex align-items-center mb-2 ${styles.contactItem}`}>
                                    <Phone size={16} className="me-2" />
                                    <a target="_blank" style={{ textDecoration: 'none', color: 'white' }} href="tel:16316295402"><small>1 (631) 629-5402</small></a>
                                </div>
                                <div className={`d-flex align-items-center ${styles.contactItem}`}>
                                    <Mail size={16} className="me-2" />
                                    <a target="_blank" style={{ textDecoration: 'none', color: 'white' }} href="mailto:info@edlinitiative.org"><small>info@edlinitiative.org</small></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-3 col-sm-6">
                        <div className={styles.footerSection}>
                                <h3 className={`h6 mb-3 ${styles.sectionTitle}`}>{t('footer.quick_links')}</h3>
                            <ul className={`list-unstyled ${styles.linkList}`}>
                                <li className="mb-2">
                                    <Link href="/" className={styles.footerLink}>
                                        {t('nav.home')}
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/mission_projects" className={styles.footerLink}>
                                        {t('nav.mission_projects')}
                                    </Link>
                                </li>

                                <li className="mb-2">
                                    <Link target="_blank" href="https://drive.google.com/file/d/107de2zcR1kgFLDuH3ApfbQ0owwvZazVQ/view" className={styles.footerLink}>
                                        Stage
                                    </Link>
                                </li>
                    <li className="mb-2">
                        <Link href="/about-us" className={styles.footerLink}>
                            {t('nav.about_us')}
                        </Link>
                    </li>
                                <li className="mb-2">
                                    <Link href="/donate" className={styles.footerLink}>
                                        {t('nav.donate')}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Programs */}
                    <div className="col-lg-2 col-md-3 col-sm-6">
                        <div className={styles.footerSection}>
                            <h3 className={`h6 mb-3 ${styles.sectionTitle}`}>Programs</h3>
                            <ul className={`list-unstyled ${styles.linkList}`}>
                                <li className="mb-2">
                                    <Link href="/ESLP" className={styles.footerLink}>
                                        ESLP
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/courses" className={styles.footerLink}>
                                        Educational Courses
                                    </Link>
                                </li>
                                {/*<li className="mb-2">*/}
                                {/*    <Link href="/community" className={styles.footerLink}>*/}
                                {/*        Community Outreach*/}
                                {/*    </Link>*/}
                                {/*</li>*/}
                                <li className="mb-2">
                                    <Link href="#partnerships" className={styles.footerLink}>
                                        Partnerships
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter & Social */}
                    <div className="col-lg-4 col-md-6">
                        <div className={styles.footerSection}>
                            <h3 className={`h6 mb-3 ${styles.sectionTitle}`}>Stay Connected</h3>
                            <p className={`small mb-3 ${styles.newsletterText}`}>
                                Subscribe to our newsletter for updates on our latest initiatives and impact stories.
                            </p>

                            {/* Newsletter Signup */}
                            <div className={`mb-4 ${styles.newsletterForm}`}>
                                <div className="input-group">
                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        aria-label="Email address"
                                        className={`form-control ${styles.emailInput}`}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onInput={() => {
                                            // keep UI responsive; validation done on submit
                                            logger.debug('Newsletter email input updated');
                                        }}
                                    />
                                    <button
                                        id="newsletter-submit"
                                        className={`btn ${styles.subscribeBtn}`}
                                        type="button"
                                        disabled={submitting || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())}
                                        onClick={async () => {
                                            const trimmed = email.trim();
                                            if (!trimmed) {
                                                setSubscriptionStatus('error');
                                                setSubscriptionMessage('Please enter an email address');
                                                return;
                                            }
                                            setSubmitting(true);
                                            setSubscriptionStatus('idle');
                                            try {
                                                const { subscribeNewsletter } = await import('@/lib/firebaseService');
                                                const id = await subscribeNewsletter(trimmed, 'footer');
                                                logger.info('Subscribed newsletter id:', id);
                                                setEmail('');
                                                setSubscriptionStatus('success');
                                                setSubscriptionMessage('Thanks for subscribing!');
                                            } catch (err: any) {
                                                logger.error('Newsletter subscription failed', err);
                                                setSubscriptionStatus('error');
                                                setSubscriptionMessage(err?.message || 'Failed to subscribe. Please try again.');
                                            } finally {
                                                setSubmitting(false);
                                            }
                                        }}
                                    >
                                        {submitting ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                </div>
                                
                                {/* Subscription Status Message */}
                                {subscriptionStatus !== 'idle' && (
                                    <div className={`mt-3 p-3 rounded ${subscriptionStatus === 'success' ? 'bg-success bg-opacity-20' : 'bg-danger bg-opacity-20'}`}>
                                        <div className="d-flex align-items-center">
                                            {subscriptionStatus === 'success' ? (
                                                <Heart size={16} className="me-2 text-white" />
                                            ) : (
                                                <X size={16} className="me-2 text-white" />
                                            )}
                                            <small className="mb-0 text-white">{subscriptionMessage}</small>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Social Media */}
                            <div>
                                <h4 className={`small mb-2 ${styles.socialTitle}`}>Follow Us</h4>
                                <div className={`d-flex gap-3 ${styles.socialIcons}`}>
                                    <Link href="https://www.youtube.com/@edlight-initiative" target="_blank" className={styles.socialIcon}>
                                        <Youtube size={20} />
                                        <span className="visually-hidden">YouTube</span>
                                    </Link>
                                    <Link href="https://www.facebook.com/edlinitiative" target="_blank" className={styles.socialIcon}>
                                        <Facebook size={20} />
                                        <span className="visually-hidden">Facebook</span>
                                    </Link>
                                    <Link href="https://x.com/edlinitiative" target="_blank" className={styles.socialIcon}>
                                        <X size={20} />
                                        <span className="visually-hidden">X (Twitter)</span>
                                    </Link>
                                    <Link href="https://www.instagram.com/edlinitiative?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className={styles.socialIcon}>
                                        <Instagram size={20} />
                                        <span className="visually-hidden">Instagram</span>
                                    </Link>
                                    <Link href="https://www.linkedin.com/company/edlight-initiative/" target="_blank" className={styles.socialIcon}>
                                        <Linkedin size={20} />
                                        <span className="visually-hidden">LinkedIn</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Partnership Section */}
            <div id="partnerships" className={styles.partnershipSection}>
                <div className="container py-4">
                    <div className="text-center mb-4">
                        <h3 className={`h5 mb-3 ${styles.partnershipTitle}`}>Our Partners</h3>
                        <p className={`small ${styles.partnershipSubtitle}`}>
                            Working together to create lasting impact in communities worldwide
                        </p>
                    </div>

                    <div className={styles.partnersGrid}>
                        {/* Partner Logo 1 */}
                        <div className={styles.partnerItem}>
                            <Image
                                src="/images/partners/fellowsfp.avif"
                                alt="Fellows FP"
                                className={styles.partnerLogo}
                                width={180}
                                height={64}
                            />
                        </div>

                        {/* Partner Logo 2 */}
                        <div className={styles.partnerItem}>
                            <Image
                                src="/images/partners/uwc.avif"
                                alt="UWC"
                                className={styles.partnerLogo}
                                width={180}
                                height={64}
                            />
                        </div>

                        {/* Partner Logo 3 */}
                        <div className={styles.partnerItem}>
                            <Image
                                src="/images/partners/lekol.avif"
                                alt="Lekol"
                                className={styles.partnerLogo}
                                width={180}
                                height={64}
                            />
                        </div>

                        {/*/!* Partner Logo 4 *!/*/}
                        {/*<div className={styles.partnerItem}>*/}
                        {/*    <img*/}
                        {/*        src="/images/partners/partner4.png"*/}
                        {/*        alt="Partner 4 Logo"*/}
                        {/*        className={styles.partnerLogo}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/*/!* Partner Logo 5 *!/*/}
                        {/*<div className={styles.partnerItem}>*/}
                        {/*    <img*/}
                        {/*        src="/images/partners/partner5.png"*/}
                        {/*        alt="Partner 5 Logo"*/}
                        {/*        className={styles.partnerLogo}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/*/!* Partner Logo 6 *!/*/}
                        {/*<div className={styles.partnerItem}>*/}
                        {/*    <img*/}
                        {/*        src="/images/partners/partner6.png"*/}
                        {/*        alt="Partner 6 Logo"*/}
                        {/*        className={styles.partnerLogo}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className={styles.footerBottom}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <p className={`mb-0 small ${styles.copyrightText}`}>
                                © {new Date().getFullYear()} EdLight Initiative. All rights reserved.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className={`mb-0 small text-md-end ${styles.loveText}`}>
                                Made with <Heart size={14} className={styles.heartIcon} /> for communities worldwide
                            </p>
                        </div>
                        {/* Hidden build info for troubleshooting deployments */}
                        <div className="col-12 mt-1">
                            <p className="mb-0 small text-center" style={{ opacity: 0.4 }}>
                                build {buildInfo.BUILD_COMMIT} · {buildInfo.BUILD_BRANCH}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}