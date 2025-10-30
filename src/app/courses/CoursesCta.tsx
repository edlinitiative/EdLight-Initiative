"use client"
import React from 'react';
import { Play } from 'lucide-react';
import styles from '../../styles/Courses.module.css';

export default function CoursesCta() {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.container}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
                    <p className={styles.ctaDescription}>
                        To provide quality education to our students, we have developed a curriculum following the 
                        National Ministry of Education (MENSP)- a program focusing primarily on STEM education 
                        considering the world is moving toward STEM. STEM education creates critical thinkers, 
                        increases science literacy, and enables the next generation of innovators. However, 
                        we also seek to challenge the current STEM program because we believe it is not pragmatic 
                        enough and that it does not prepare the students to serve the country’s needs. 
                        Very often, for certain courses, the approach is too Euro-centric. 
                        Our program adapts to the Ministry of Education’s program but also adds some real-life 
                        applications involving Haiti to serve the country’s needs.
                    </p>
                    <button 
                    onClick={() => window.open("https://www.youtube.com/@edlight-initiative", "_blank", "noopener,noreferrer")} 
                    className={styles.ctaButton}>
                        Browse All Courses
                        <Play size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
