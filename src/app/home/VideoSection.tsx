"use client";

import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import logger from "@/lib/logger";
import styles from "../../styles/Home.module.css";
import type { Testimonial } from "@/lib/content";

type VideoSectionProps = {
    testimonial?: Testimonial;
};

export default function VideoSection({ testimonial }: VideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video
                            .play()
                            .catch((error) => {
                                logger.debug("Autoplay prevented:", error);
                            });
                    } else {
                        video.pause();
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

        const applicationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfUvjVy3OsjMm6IWx3I50aei4pk6RSgrGCfrz_6y0zPJxx5vQ/closedform";

    return (
        <section className={styles.videoSection}>
            <div className={styles.container}>
                <div className={styles.videoContent}>
                    <div className={styles.videoText}>
                        <h2 className={styles.videoTitle}>
                            Experience a captivating narrative of our organization's remarkable achievements and growth during the last two
                            years. Delve into the pages of our journey to uncover the richness of experiences filled with laughter, joy, and a
                            wealth of knowledge.
                        </h2>
                        {testimonial ? (
                            <blockquote className={styles.testimonialQuote}>
                                “{testimonial.quote}”
                                <cite>
                                    {testimonial.name}, {testimonial.role}
                                </cite>
                            </blockquote>
                        ) : null}
                                    <button
                                        onClick={() => window.open(applicationUrl, "_blank", "noopener,noreferrer")}
                                        className={styles.videoCta}
                                    >
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
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
}
