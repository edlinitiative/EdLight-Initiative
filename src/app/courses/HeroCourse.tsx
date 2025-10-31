"use client"
import React from 'react';
import { Play, BookOpen, Award, Users } from 'lucide-react';
import styles from '../../styles/Courses.module.css';

export default function HeroCourse() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                <div className={styles.heroGlass}>
                    <div className={styles.heroContent}>
                        <div className={styles.heroBadge}>
                            <BookOpen size={20} />
                            <span>Free STEM Education</span>
                        </div>
                        <h1 className={styles.heroTitle}>Online Courses</h1>
                        <p className={styles.heroDescription}>
                            EdLight provides comprehensive, free courses for high school students (NS1 to NS4). Learn at your own pace, catch up on missed classes, and excel in STEM subjects—accessible anywhere, anytime.
                        </p>
                        <div className={styles.heroStats}>
                            <div className={styles.heroStat}>
                                <Award size={24} />
                                <div>
                                    <div className={styles.statValue}>12+</div>
                                    <div className={styles.statLabel}>Courses</div>
                                </div>
                            </div>
                            <div className={styles.heroStat}>
                                <Users size={24} />
                                <div>
                                    <div className={styles.statValue}>8,000+</div>
                                    <div className={styles.statLabel}>Students</div>
                                </div>
                            </div>
                            <div className={styles.heroStat}>
                                <BookOpen size={24} />
                                <div>
                                    <div className={styles.statValue}>100%</div>
                                    <div className={styles.statLabel}>Free</div>
                                </div>
                            </div>
                        </div>
                        <button 
                        onClick={() => window.open("https://www.youtube.com/@edlight-initiative", "_blank", "noopener,noreferrer")} 
                            className={styles.heroCta}>
                            Start Learning Today
                            <Play size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
