"use client"
import React from 'react';
import styles from '../../styles/Home.module.css';

export default function WelcomeHome() {
    return (
        <section className={styles.welcomeSection}>
            <div className={styles.welcomeContainer}>
                <div className={styles.welcomeContent}>
                    <p>
                        At EdLight, we are working tirelessly every day to ensure you can have access to high-quality education.
                    </p>
                </div>
            </div>
        </section>
    );
}
