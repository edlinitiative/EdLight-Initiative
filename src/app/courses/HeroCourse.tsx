"use client"
import React from 'react';
import { Play } from 'lucide-react';
import styles from '../../styles/Courses.module.css';

export default function HeroCourse() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Online Courses</h1>
                    <p className={styles.heroDescription}>
                        EdLight provides courses for high school students (NSI to NSIV) so they can learn and catch up any missing classes wherever they are
                    </p>
                    <button 
                    onClick={() => window.open("https://www.youtube.com/@edlight-initiative", "_blank", "noopener,noreferrer")} 
                        className={styles.heroCta}>
                        Start Learning Today
                        <Play size={20} />
                        
                    </button>
                </div>
            </div>
        </section>
    );
}
