"use client"
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Clock, Users, Star, Play, Download, ExternalLink, Youtube, ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../styles/Courses.module.css';

const coursesByClass = {
    "NS1": [
        {
            id: 1,
            title: "Mathematics - NS1",
            description: "Foundation mathematics course covering basic algebra, geometry, and arithmetic for NS1 level students.",
            instructor: "EdLight Initiative",
            duration: "12 weeks",
            students: 1250,
            rating: 4.8,
            level: "NS1",
            subjects: ["Basic Algebra", "Geometry", "Arithmetic", "Problem Solving"],
            playlistId: "PLD8IqnfQOT4UNEefpidb0lHrY2f2ZaAEa",
            price: "Free"
        },
        {
            id: 2,
            title: "Physics - NS1",
            description: "Introduction to physics covering basic concepts, measurements, and fundamental principles for NS1 students.",
            instructor: "EdLight Initiative",
            duration: "10 weeks",
            students: 980,
            rating: 4.7,
            level: "NS1",
            subjects: ["Measurements", "Motion", "Forces", "Energy"],
            playlistId: "PLD8IqnfQOT4W3GybnsqTpdoYnWlMDvci7",
            price: "Free"
        },
        {
            id: 3,
            title: "Chemistry - NS1",
            description: "Basic chemistry course introducing atomic structure, chemical bonding, and simple reactions for NS1 level.",
            instructor: "EdLight Initiative",
            duration: "10 weeks",
            students: 1100,
            rating: 4.6,
            level: "NS1",
            subjects: ["Atomic Structure", "Chemical Bonding", "Basic Reactions", "Laboratory Safety"],
            playlistId: "PLD8IqnfQOT4UxfSqYrYjVK6ROjRi5_S61",
            price: "Free"
        }
    ],
    "NS2": [
        {
            id: 4,
            title: "Mathematics - NS2",
            description: "Intermediate mathematics course covering advanced algebra, trigonometry, and geometry for NS2 level students.",
            instructor: "EdLight Initiative",
            duration: "14 weeks",
            students: 1150,
            rating: 4.8,
            level: "NS2",
            subjects: ["Advanced Algebra", "Trigonometry", "Analytic Geometry", "Functions"],
            playlistId: "PLD8IqnfQOT4UNEefpidb0lHrY2f2ZaAEa",
            price: "Free"
        },
        {
            id: 5,
            title: "Physics - NS2",
            description: "Intermediate physics covering mechanics, thermodynamics, and wave motion for NS2 level students.",
            instructor: "EdLight Initiative",
            duration: "12 weeks",
            students: 920,
            rating: 4.7,
            level: "NS2",
            subjects: ["Mechanics", "Thermodynamics", "Waves", "Electricity"],
            playlistId: "PLD8IqnfQOT4W3GybnsqTpdoYnWlMDvci7",
            price: "Free"
        },
        {
            id: 6,
            title: "Chemistry - NS2",
            description: "Intermediate chemistry covering organic and inorganic chemistry basics for NS2 level students.",
            instructor: "EdLight Initiative",
            duration: "12 weeks",
            students: 1050,
            rating: 4.6,
            level: "NS2",
            subjects: ["Organic Chemistry", "Inorganic Chemistry", "Acids & Bases", "Chemical Equilibrium"],
            playlistId: "PLD8IqnfQOT4UxfSqYrYjVK6ROjRi5_S61",
            price: "Free"
        }
    ],
    "NS3": [
        {
            id: 7,
            title: "Mathematics - NS3",
            description: "Advanced mathematics course covering calculus, statistics, and complex numbers for NS3 level students.",
            instructor: "EdLight Initiative",
            duration: "16 weeks",
            students: 1080,
            rating: 4.9,
            level: "NS3",
            subjects: ["Calculus", "Statistics", "Complex Numbers", "Probability"],
            playlistId: "PLD8IqnfQOT4UNEefpidb0lHrY2f2ZaAEa",
            price: "Free"
        },
        {
            id: 8,
            title: "Physics - NS3",
            description: "Advanced physics covering electromagnetism, modern physics, and optics for NS3 level students.",
            instructor: "EdLight Initiative",
            duration: "14 weeks",
            students: 890,
            rating: 4.8,
            level: "NS3",
            subjects: ["Electromagnetism", "Optics", "Modern Physics", "Nuclear Physics"],
            playlistId: "PLD8IqnfQOT4W3GybnsqTpdoYnWlMDvci7",
            price: "Free"
        },
        {
            id: 9,
            title: "Chemistry - NS3",
            description: "Advanced chemistry covering physical chemistry, analytical chemistry, and biochemistry for NS3 level students.",
            instructor: "EdLight Initiative",
            duration: "14 weeks",
            students: 980,
            rating: 4.7,
            level: "NS3",
            subjects: ["Physical Chemistry", "Analytical Chemistry", "Biochemistry", "Environmental Chemistry"],
            playlistId: "PLD8IqnfQOT4UxfSqYrYjVK6ROjRi5_S61",
            price: "Free"
        }
    ],
    "NS4": [
        {
            id: 10,
            title: "Mathematics - NS4",
            description: "Pre-university mathematics covering advanced calculus, linear algebra, and differential equations for NS4 level students.",
            instructor: "EdLight Initiative",
            duration: "18 weeks",
            students: 950,
            rating: 4.9,
            level: "NS4",
            subjects: ["Advanced Calculus", "Linear Algebra", "Differential Equations", "Mathematical Analysis"],
            playlistId: "PLD8IqnfQOT4UNEefpidb0lHrY2f2ZaAEa",
            price: "Free"
        },
        {
            id: 11,
            title: "Physics - NS4",
            description: "Pre-university physics covering quantum mechanics, relativity, and advanced topics for NS4 level students.",
            instructor: "EdLight Initiative",
            duration: "16 weeks",
            students: 820,
            rating: 4.8,
            level: "NS4",
            subjects: ["Quantum Mechanics", "Relativity", "Particle Physics", "Astrophysics"],
            playlistId: "PLD8IqnfQOT4W3GybnsqTpdoYnWlMDvci7",
            price: "Free"
        },
        {
            id: 12,
            title: "Chemistry - NS4",
            description: "Pre-university chemistry covering advanced topics, research methods, and laboratory techniques for NS4 level students.",
            instructor: "EdLight Initiative",
            duration: "16 weeks",
            students: 900,
            rating: 4.8,
            level: "NS4",
            subjects: ["Advanced Organic Chemistry", "Research Methods", "Laboratory Techniques", "Chemical Engineering"],
            playlistId: "PLD8IqnfQOT4UxfSqYrYjVK6ROjRi5_S61",
            price: "Free"
        },
        {
            id: 13,
            title: "Economics - NS4",
            description: "Pre-university economics covering microeconomics, macroeconomics, and economic analysis for NS4 level students.",
            instructor: "EdLight Initiative",
            duration: "14 weeks",
            students: 750,
            rating: 4.6,
            level: "NS4",
            subjects: ["Microeconomics", "Macroeconomics", "Economic Analysis", "International Economics"],
            playlistId: "PLD8IqnfQOT4UxfSqYrYjVK6ROjRi5_S61",
            price: "Free"
        }
    ]
};

export default function CoursesList() {
    const [expandedClass, setExpandedClass] = useState<string | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scaleIn');
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [expandedClass]);

    const toggleClass = (classLevel: string) => {
        setExpandedClass(expandedClass === classLevel ? null : classLevel);
    };

    const renderCourseCard = (course: any, index: number) => (
        <div 
            key={course.id} 
            ref={el => { cardsRef.current[index] = el; }}
            className={styles.courseCard}
            style={{ opacity: 0 }}
        >
            {/* YouTube Playlist Iframe */}
            <div className={styles.courseVideo}>
                <div className={styles.youtubeContainer}>
                    <iframe
                        src={`https://www.youtube.com/embed/videoseries?list=${course.playlistId}&autoplay=0&mute=0&controls=1&showinfo=1&rel=0&modestbranding=1`}
                        title={`${course.title} - YouTube Playlist`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className={styles.youtubeIframe}
                    ></iframe>
                </div>
                <div className={styles.courseLevel}>{course.level}</div>
            </div>
            
            <div className={styles.courseContent}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>{course.description}</p>
                
                <div className={styles.courseInstructor}>
                    <span>Instructor: {course.instructor}</span>
                </div>
                
                <div className={styles.courseSubjects}>
                    {course.subjects.map((subject: string, index: number) => (
                        <span key={index} className={styles.subjectTag}>
                            {subject}
                        </span>
                    ))}
                </div>
                
                <div className={styles.courseActions}>
                    <a 
                        href={`https://www.youtube.com/playlist?list=${course.playlistId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.watchBtn}
                    >
                        <Youtube size={16} />
                        View Full Playlist
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <section className={styles.coursesSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Available Courses</h2>
                    <p className={styles.sectionDescription}>
                        Choose from our comprehensive collection of STEM and Economics courses organized by class level (NS1-NS4)
                    </p>
                </div>

                <div className={styles.classDropdowns}>
                    {Object.entries(coursesByClass).map(([classLevel, courses]) => (
                        <div key={classLevel} className={styles.classDropdown}>
                            <button 
                                className={styles.classDropdownButton}
                                onClick={() => toggleClass(classLevel)}
                            >
                                <span className={styles.classLevelTitle}>
                                    {classLevel} - {courses.length} courses
                                </span>
                                {expandedClass === classLevel ? (
                                    <ChevronUp size={20} />
                                ) : (
                                    <ChevronDown size={20} />
                                )}
                            </button>
                            
                            {expandedClass === classLevel && (
                                <div className={styles.classCourses}>
                                    <div className={styles.coursesGrid}>
                                        {courses.map((course, index) => renderCourseCard(course, index))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
