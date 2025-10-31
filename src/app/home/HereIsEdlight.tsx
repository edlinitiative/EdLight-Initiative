"use client"
import React, { useEffect, useRef } from 'react';
import { BookOpen, Users, Award, Globe, ArrowRight } from 'lucide-react';
import styles from '../../styles/Home.module.css';

const programs = [
    {
        id: 1,
        title: "Online Courses",
        description: "EdLight provides free educational content that covers the content learned from STEM subjects from NSI through NIV. It is a great way for students to catch up on what they missed in class.",
        icon: BookOpen,
        cta: "Start Learning",
        ctaUrl: "/courses",
        color: "blue"
    },
    {
        id: 2,
        title: "ESLP",
        description: "The EdLight Summer Leadership Program occurs every year throughout the summer. It is a great opportunity for our participants to enhance their leadership skills and grow their knowledge about the world out there.",
        icon: Users,
        cta: "Learn more",
        ctaUrl: "/ESLP",
        color: "green"
    },
    {
        id: 3,
        title: "EIFP",
        description: "The EdLight Summer Leadership Program occurs every year throughout the summer. It is a great opportunity for our participants to enhance their leadership skills and grow their knowledge about the world out there.",
        icon: Award,
        cta: "Coming Soon",
        ctaUrl: "#",
        color: "gray"
    }
];

export default function HereIsEdlight() {
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.hereIsEdlight}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Here is EDLIGHT</h2>
                </div>
                
                <div className={styles.programsGrid}>
                    {programs.map((program, index) => {
                        const IconComponent = program.icon;
                        return (
                            <div 
                                key={program.id} 
                                ref={el => { cardsRef.current[index] = el; }}
                                className={`${styles.programCard} ${styles[program.color]}`}
                                style={{ opacity: 0, animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={styles.programIcon}>
                                    <IconComponent size={48} />
                                </div>
                                <h3 className={styles.programTitle}>{program.title}</h3>
                                <p className={styles.programDescription}>{program.description}</p>
                                <button
                                onClick={() => window.location.href = program.ctaUrl}
                                 className={`${styles.programCta} ${styles[program.color]}`}>
                                    {program.cta}
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
