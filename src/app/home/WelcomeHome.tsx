"use client"
import React, { useEffect, useRef } from 'react';
import styles from '../../styles/Home.module.css';

export default function WelcomeHome() {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fadeInUp');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.welcomeSection}>
            <div className={styles.welcomeContainer}>
                <div ref={contentRef} className={styles.welcomeContent} style={{ opacity: 0 }}>
                    <p>
                        At EdLight, we are working tirelessly every day to ensure you can have access to high-quality education.
                    </p>
                </div>
            </div>
        </section>
    );
}
