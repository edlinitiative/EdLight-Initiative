"use client";
import {Facebook, Twitter, Instagram, 
    Linkedin, Mail, Heart, MapPin,
     Phone, Sparkles, Youtube, X} from "lucide-react";
import Link from "next/link";
import styles from "../styles/Footer.module.css";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export default function Footer() {
    const { t } = useLanguage();
    const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [subscriptionMessage, setSubscriptionMessage] = useState('');
    
    useEffect(() => {
        // Add direct event listener to handle the actual subscription
        const button = document.getElementById('newsletter-submit');
        if (button) {
            const handleNativeClick = async (e: Event) => {
                console.log('🟢 NATIVE CLICK EVENT FIRED!', e);
                console.log('🟢 Processing subscription...');
                
                const input = document.getElementById('newsletter-email') as HTMLInputElement | null;
                const email = input?.value.trim() || '';
                console.log('🟢 Email to subscribe:', email);
                
                if (!email) {
                    console.log('🟢 No email provided');
                    alert('Please enter an email address');
                    return;
                }
                
                try {
                    const btn = e.target as HTMLButtonElement;
                    btn.disabled = true;
                    btn.textContent = 'Subscribing...';
                    console.log('🟢 Button disabled and text changed');
                    
                    console.log('🟢 Attempting to import firebaseService...');
                    const { subscribeNewsletter } = await import('@/lib/firebaseService');
                    console.log('🟢 subscribeNewsletter function imported successfully');
                    
                    console.log('🟢 Calling subscribeNewsletter with:', { email, source: 'footer' });
                    const id = await subscribeNewsletter(email, 'footer');
                    console.log('🟢 ✅ Subscribed newsletter id:', id);
                    
                    if (input) input.value = '';
                    setSubscriptionStatus('success');
                    setSubscriptionMessage('Thanks for subscribing!');
                    console.log('🟢 ✅ Success message shown');
                } catch (error: any) {
                    console.error('🟢 ❌ Subscribe error details:', error);
                    setSubscriptionStatus('error');
                    setSubscriptionMessage(error?.message || 'Failed to subscribe. Please try again.');
                } finally {
                    const btn = document.getElementById('newsletter-submit') as HTMLButtonElement | null;
                    if (btn) {
                        btn.textContent = 'Subscribe';
                        const valid = input ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()) : false;
                        btn.disabled = !valid;
                        console.log('🟢 Button reset - disabled:', !valid);
                    }
                }
            };
            button.addEventListener('click', handleNativeClick);
            
            return () => {
                button.removeEventListener('click', handleNativeClick);
            };
        }
    }, []);
    
    return (
        <footer className={`mt-auto ${styles.footer}`}>
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
                                <a className={styles.footer} href="/about-us"> {t('footer.learn_more')}</a>
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
                                        className={`form-control ${styles.emailInput}`}
                                        placeholder="Enter your email"
                                        aria-label="Email address"
                                        onInput={(e) => {
                                            console.log('🔵 Email input changed');
                                            const btn = document.getElementById('newsletter-submit') as HTMLButtonElement | null;
                                            const value = (e.target as HTMLInputElement).value.trim();
                                            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                                            console.log('🔵 Email value:', value);
                                            console.log('🔵 Email valid:', valid);
                                            console.log('🔵 Button found:', btn);
                                            if (btn) {
                                                btn.disabled = !valid;
                                                console.log('🔵 Button disabled:', btn.disabled);
                                            }
                                        }}
                                    />
                                    <button
                                        id="newsletter-submit"
                                        className={`btn ${styles.subscribeBtn}`}
                                        type="button"
                                        disabled
                                        onMouseEnter={() => console.log('🔵 Button mouse enter')}
                                        onMouseLeave={() => console.log('🔵 Button mouse leave')}
                                        onMouseDown={() => console.log('🔵 Button mouse down - click attempt')}
                                        onMouseUp={() => console.log('🔵 Button mouse up')}
                                        onPointerDown={() => console.log('🔵 Button pointer down')}
                                        onPointerUp={() => console.log('🔵 Button pointer up')}
                                        onClick={async (e) => {
                                            console.log('🔴 Subscribe button clicked');
                                            console.log('🔴 Event object:', e);
                                            console.log('🔴 Current target:', e.currentTarget);
                                            
                                            const input = document.getElementById('newsletter-email') as HTMLInputElement | null;
                                            console.log('🔴 Input element found:', input);
                                            console.log('🔴 Input value:', input?.value);
                                            
                                            const email = input?.value.trim() || '';
                                            console.log('🔴 Email to subscribe:', email);
                                            
                                            if (!email) {
                                                console.log('🔴 No email provided');
                                                alert('Please enter an email address');
                                                return;
                                            }
                                            
                                            console.log('🔴 Email validation passed, proceeding...');
                                            
                                            try {
                                                const btn = e.currentTarget as HTMLButtonElement;
                                                console.log('🔴 Button element:', btn);
                                                btn.disabled = true;
                                                btn.textContent = 'Subscribing...';
                                                console.log('🔴 Button disabled and text changed');
                                                
                                                console.log('🔴 Attempting to import firebaseService...');
                                                const firebaseService = await import('@/lib/firebaseService');
                                                console.log('🔴 Firebase service imported:', firebaseService);
                                                console.log('🔴 subscribeNewsletter function:', firebaseService.subscribeNewsletter);
                                                
                                                const { subscribeNewsletter } = firebaseService;
                                                console.log('🔴 subscribeNewsletter function extracted:', subscribeNewsletter);
                                                
                                                console.log('🔴 Calling subscribeNewsletter with:', { email, source: 'footer' });
                                                const id = await subscribeNewsletter(email, 'footer');
                                                console.log('🔴 ✅ Subscribed newsletter id:', id);
                                                
                                                if (input) input.value = '';
                                                alert('Thanks for subscribing!');
                                                console.log('🔴 ✅ Success message shown');
                                            } catch (error: any) {
                                                console.error('🔴 ❌ Subscribe error details:', error);
                                                console.error('🔴 ❌ Error name:', error.name);
                                                console.error('🔴 ❌ Error message:', error.message);
                                                console.error('🔴 ❌ Error stack:', error.stack);
                                                alert(error?.message || 'Failed to subscribe. Please try again.');
                                            } finally {
                                                console.log('🔴 Finally block executing...');
                                                const btn = document.getElementById('newsletter-submit') as HTMLButtonElement | null;
                                                console.log('🔴 Button in finally:', btn);
                                                if (btn) {
                                                    btn.textContent = 'Subscribe';
                                                    const valid = input ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()) : false;
                                                    btn.disabled = !valid;
                                                    console.log('🔴 Button reset - disabled:', !valid);
                                                }
                                            }
                                        }}
                                    >
                                        Subscribe
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
                            <img
                                src="/images/partners/fellowsfp.avif"
                                alt="Partner 1 Logo"
                                className={styles.partnerLogo}
                            />
                        </div>

                        {/* Partner Logo 2 */}
                        <div className={styles.partnerItem}>
                            <img
                                src="/images/partners/uwc.avif"
                                alt="Partner 2 Logo"
                                className={styles.partnerLogo}
                            />
                        </div>

                        {/* Partner Logo 3 */}
                        <div className={styles.partnerItem}>
                            <img
                                src="/images/partners/lekol.avif"
                                alt="Partner 3 Logo"
                                className={styles.partnerLogo}
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
                    </div>
                </div>
            </div>
        </footer>
    );
}