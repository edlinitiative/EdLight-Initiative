"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from 'react';
import logger from '@/lib/logger';

type ZeffyAPI = { init?: () => void };
type ZeffyWindow = Window & { Zeffy?: ZeffyAPI };

export default function DonatePage() {
    const { t } = useLanguage();

    // Run client-side diagnostics and attempt late init only after mount
    useEffect(() => {
        const w = window as ZeffyWindow;
        const zeffyAvailable = typeof w.Zeffy !== 'undefined';
        const scriptPresent = !!document.querySelector('script[src="https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js"]');
        logger.debug('[Zeffy] Donate page render:', { zeffyAvailable, scriptPresent });
        if (!zeffyAvailable && scriptPresent) {
            // Sometimes the script loads after hydration; attempt a late init
            const timer = setTimeout(() => {
                if (w.Zeffy?.init) {
                    w.Zeffy.init();
                    logger.debug('[Zeffy] late init() invoked');
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center mb-5">
                    <h1>{t('donate.title')}</h1>
                    <p>{t('donate.description')}</p>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div
                        zeffy-form-link="https://www.zeffy.com/embed/donation-form/help-us-make-education-more-accessible-to-the-youth-of-haiti?modal=true"
                        className="zeffy-donation-form"
                        style={{ minHeight: '600px' }}
                    >
                        <div className="text-center p-5">
                            <p>Loading donation form...</p>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}