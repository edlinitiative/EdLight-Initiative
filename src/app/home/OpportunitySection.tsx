"use client"
import React from 'react';
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import styles from '../../styles/Home.module.css';
import Image from "next/image";

export default function OpportunitySection() {
    return (
        <section className={styles.opportunitySection}>
            <div className={styles.container}>
                <div className={styles.opportunityContent}>
                    <div className={styles.opportunityImage}>
                        <div className={styles.imageOverlay}>
                            <Briefcase size={64} />
                            <p>Internship Opportunity</p>
                        </div>
                    </div>
                    <div className={styles.opportunityText}>
                        <h2 className={styles.opportunityTitle}>
                            Opportunité de stage
                        </h2>
                        <p className={styles.opportunitySubtitle}>
                            Appliquez pour devenir un stagiaire à l'ESLP 2025
                        </p>
                        <div className={styles.opportunityDetails}>
                            <div className={styles.detailItem}>
                                <Calendar size={20} />
                                <span>Summer 2025</span>
                            </div>
                            <div className={styles.detailItem}>
                                <MapPin size={20} />
                                <span>Haiti</span>
                            </div>
                        </div>
                        <button 
                        onClick={() => window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfbUfwc5m39mcCeXqNk68vJjJ4q9BQM7ZjYtw6oian0X6tqKA/viewform"}
                        className={styles.opportunityCta}>
                            Apply now
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
