"use client"
import React, { useRef, useEffect } from 'react';
import { Play, BookOpen, Users, Award } from 'lucide-react';
import styles from '../../styles/Home.module.css';

export default function VideoSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch((error) => {
                            console.log('Autoplay prevented:', error);
                        });
                    } else {
                        video.pause();
                    }
                });
            },
            {
                threshold: 0.5, // Play when 50% of video is visible
                rootMargin: '0px 0px -10% 0px' // Start playing slightly before fully in view
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className={styles.videoSection}>
            <div className={styles.container}>
                <div className={styles.videoContent}>
                    <div className={styles.videoText}>
                    <h2
  className={styles.videoTitle}
  style={{
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.65)',
    lineHeight: '1.6',
    letterSpacing: '0.3px',
  }}
>
  Experience a captivating narrative of our organization's remarkable achievements and growth during the last two years. 
  Delve into the pages of our journey to uncover the richness of experiences filled with laughter, joy, and a wealth of knowledge
</h2>

                        <button
                        onClick={() => window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfUvjVy3OsjMm6IWx3I50aei4pk6RSgrGCfrz_6y0zPJxx5vQ/closedform"}
                        className={styles.videoCta}>
                            Apply to ESLP 2025
                            <Play size={20} />
                        </button>
                    </div>
                    <div className={styles.videoContainer}>
                        <video
                            ref={videoRef}
                            src="/video/Video-473.mp4"
                            className={styles.videoPlayer}
                            controls
                            controlsList="nodownload"
                            preload="metadata"
                            poster="/images/hero_images/eslp_bg.jpg"
                            muted
                            loop
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
}
