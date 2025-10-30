"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, Award, BookOpen, Globe, Clock, CheckCircle, ArrowRight, Heart, Star, GraduationCap, Lightbulb } from "lucide-react";
import styles from "./ESLP.module.css";

export default function ESLPPage() {
    return (
        <div className={styles.eslpPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className="container">
                    <div className="row align-items-center min-vh-100">
                        <div className="col-lg-6">
                            <div className={styles.heroContent}>
                                <h1 className={styles.heroTitle}>EdLight Summer Leadership Program</h1>
                                <p className={styles.heroSubtitle}>The mission of the ESLP is to empower the youth of Haiti with skills and knowledge to make them better leaders and future citizens.</p>
                                <p className={styles.heroDescription}>
                                    In August 2022, EdLight launched the EdLight Summer Leadership Program (ESLP), a summer program for students between 15 and 18 years old to empower their leadership skills and learn from multiple subjects. The idea came from the fact that no proper programs in Haiti bring students in to reflect on some of the global and local issues they are aware of.
                                </p>
                                <div className={styles.heroStats}>
                                    <div className={styles.statItem}>
                                        <Users size={24} />
                                        <span>95+ Participants</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <Award size={24} />
                                        <span>73% Women</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <Calendar size={24} />
                                        <span>4+ Years Experience</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <Star size={24} />
                                        <span>100% Scholarships</span>
                                    </div>
                                </div>
                                <div className={styles.heroCta}>
                                    <Link href="/ESLP/application" className={`btn ${styles.applyBtn}`}>
                                        Apply Now
                                    </Link>
                                    <Link href="#curriculum" className={`btn ${styles.learnBtn}`}>
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.heroImage}>
                                <Image
                                    src="/images/hero_images/eslp_bg.jpg"
                                    alt="ESLP Summer Leadership Program"
                                    width={600}
                                    height={400}
                                    className={styles.heroImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Overview Section */}
            <section className={styles.overviewSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Program Overview</h2>
                        <p className={styles.sectionSubtitle}>
                            A comprehensive leadership development program designed to prepare students for success
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.overviewCard}>
                                <div className={styles.overviewIcon}>
                                    <Lightbulb size={40} />
                                </div>
                                <h3 className={styles.overviewTitle}>Leadership Development</h3>
                                <p className={styles.overviewDescription}>
                                    Cultivate essential leadership skills through interactive workshops and real-world applications.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.overviewCard}>
                                <div className={styles.overviewIcon}>
                                    <BookOpen size={40} />
                                </div>
                                <h3 className={styles.overviewTitle}>Professional Orientation</h3>
                                <p className={styles.overviewDescription}>
                                    Gain insights into various career paths and professional development opportunities.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.overviewCard}>
                                <div className={styles.overviewIcon}>
                                    <Globe size={40} />
                                </div>
                                <h3 className={styles.overviewTitle}>Global Network</h3>
                                <p className={styles.overviewDescription}>
                                    Connect with international speakers and build a network of future leaders worldwide.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curriculum Section */}
            <section id="curriculum" className={styles.curriculumSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Curriculum</h2>
                        <p className={styles.sectionSubtitle}>
                            The ESLP curriculum focuses on five core areas spread across the two-week program
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.curriculumCard}>
                                <div className={styles.curriculumIcon}>
                                    <Lightbulb size={40} />
                                </div>
                                <h3 className={styles.curriculumTitle}>Personal Discovery</h3>
                                <p className={styles.curriculumDescription}>
                                    Week 1: Students explore their strengths, values, and leadership potential through interactive workshops and self-reflection exercises.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.curriculumCard}>
                                <div className={styles.curriculumIcon}>
                                    <BookOpen size={40} />
                                </div>
                                <h3 className={styles.curriculumTitle}>Professional Orientation</h3>
                                <p className={styles.curriculumDescription}>
                                    Week 1: Gain insights into various career paths and professional development opportunities from industry experts.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.curriculumCard}>
                                <div className={styles.curriculumIcon}>
                                    <GraduationCap size={40} />
                                </div>
                                <h3 className={styles.curriculumTitle}>College Admissions & Scholarships</h3>
                                <p className={styles.curriculumDescription}>
                                    Learn about scholarship opportunities to study abroad in various countries (USA, Canada, France, Taiwan, Morocco, etc.).
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.curriculumCard}>
                                <div className={styles.curriculumIcon}>
                                    <Award size={40} />
                                </div>
                                <h3 className={styles.curriculumTitle}>Finance</h3>
                                <p className={styles.curriculumDescription}>
                                    Week 2: Develop essential financial literacy skills including budgeting, saving, and investment basics.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.curriculumCard}>
                                <div className={styles.curriculumIcon}>
                                    <Globe size={40} />
                                </div>
                                <h3 className={styles.curriculumTitle}>Entrepreneurship</h3>
                                <p className={styles.curriculumDescription}>
                                    Week 2: Learn about starting and managing businesses, innovation, and creating solutions for community challenges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Projects Section */}
            <section className={styles.projectsSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Team Projects & Mentorship</h2>
                        <p className={styles.sectionSubtitle}>
                            Students work in teams to develop community-focused projects with expert mentorship
                        </p>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className={styles.projectsContent}>
                                <h3 className={styles.projectsTitle}>Collaborative Community Projects</h3>
                                <p className={styles.projectsDescription}>
                                    Students are grouped into teams of 4 to 5 and challenged to develop a project that addresses a specific need in their community. Each team is paired with an experienced mentor in entrepreneurship and project development, who supports them in preparing a final presentation delivered on the last day of the program.
                                </p>
                                <div className={styles.projectsFeatures}>
                                    <div className={styles.featureItem}>
                                        <CheckCircle size={20} />
                                        <span>4-5 person teams</span>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <CheckCircle size={20} />
                                        <span>Community-focused solutions</span>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <CheckCircle size={20} />
                                        <span>Expert mentorship</span>
                                    </div>
                                    <div className={styles.featureItem}>
                                        <CheckCircle size={20} />
                                        <span>Final presentation showcase</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.projectsImage}>
                                <Image
                                    src="/images/ayiti_souri2.JPG"
                                    alt="Team Projects and Mentorship"
                                    width={500}
                                    height={400}
                                    className={styles.projectsImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Excursion Section */}
            <section className={styles.excursionSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Company Excursions</h2>
                        <p className={styles.sectionSubtitle}>
                            Real-world insights through visits to major companies in Port-au-Prince
                        </p>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className={styles.excursionImage}>
                                <Image
                                    src="/images/metropole_pic.jpg"
                                    alt="Company Excursion"
                                    width={500}
                                    height={400}
                                    className={styles.excursionImg}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.excursionContent}>
                                <h3 className={styles.excursionTitle}>Bridging Theory and Practice</h3>
                                <p className={styles.excursionDescription}>
                                    To bridge theory and practice, the program also includes an excursion to a major company in Port-au-Prince, allowing students to gain real-world insights into workplace dynamics, innovation, and leadership in action.
                                </p>
                                <div className={styles.excursionBenefits}>
                                    <div className={styles.benefitItem}>
                                        <ArrowRight size={20} />
                                        <span>Workplace dynamics</span>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <ArrowRight size={20} />
                                        <span>Innovation in action</span>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <ArrowRight size={20} />
                                        <span>Leadership examples</span>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <ArrowRight size={20} />
                                        <span>Industry insights</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Speakers Section */}
            <section className={styles.speakersSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>ESLP Speakers</h2>
                        <p className={styles.sectionSubtitle}>
                            Learn from prominent speakers from leading organizations and institutions worldwide
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.speakerCard}>
                                <div className={styles.speakerImage}>
                                    <div className={styles.speakerPlaceholder}>
                                        <Users size={40} />
                                    </div>
                                </div>
                                <h3 className={styles.speakerName}>Harvard University</h3>
                                <p className={styles.speakerTitle}>Academic Excellence</p>
                                <p className={styles.speakerDescription}>
                                    Distinguished faculty and researchers sharing insights on leadership, education, and global citizenship.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.speakerCard}>
                                <div className={styles.speakerImage}>
                                    <div className={styles.speakerPlaceholder}>
                                        <Users size={40} />
                                    </div>
                                </div>
                                <h3 className={styles.speakerName}>Microsoft</h3>
                                <p className={styles.speakerTitle}>Technology Innovation</p>
                                <p className={styles.speakerDescription}>
                                    Industry leaders discussing technology, innovation, and the future of work in the digital age.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.speakerCard}>
                                <div className={styles.speakerImage}>
                                    <div className={styles.speakerPlaceholder}>
                                        <Users size={40} />
                                    </div>
                                </div>
                                <h3 className={styles.speakerName}>Deutsche Bank</h3>
                                <p className={styles.speakerTitle}>Financial Leadership</p>
                                <p className={styles.speakerDescription}>
                                    Financial experts sharing knowledge about global markets, economic development, and financial literacy.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.speakerCard}>
                                <div className={styles.speakerImage}>
                                    <div className={styles.speakerPlaceholder}>
                                        <Users size={40} />
                                    </div>
                                </div>
                                <h3 className={styles.speakerName}>MIT</h3>
                                <p className={styles.speakerTitle}>Innovation & Research</p>
                                <p className={styles.speakerDescription}>
                                    Massachusetts Institute of Technology researchers sharing cutting-edge insights on STEM and innovation.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.speakerCard}>
                                <div className={styles.speakerImage}>
                                    <div className={styles.speakerPlaceholder}>
                                        <Users size={40} />
                                    </div>
                                </div>
                                <h3 className={styles.speakerName}>Cornell University</h3>
                                <p className={styles.speakerTitle}>Academic Excellence</p>
                                <p className={styles.speakerDescription}>
                                    Distinguished faculty members sharing expertise in various fields and academic opportunities.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.speakerCard}>
                                <div className={styles.speakerImage}>
                                    <div className={styles.speakerPlaceholder}>
                                        <Users size={40} />
                                    </div>
                                </div>
                                <h3 className={styles.speakerName}>Industry Leaders</h3>
                                <p className={styles.speakerTitle}>Professional Development</p>
                                <p className={styles.speakerDescription}>
                                    Successful entrepreneurs and industry professionals sharing real-world experiences and career insights.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className={styles.partnersSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Our Partners</h2>
                        <p className={styles.sectionSubtitle}>
                            Collaborating with leading organizations to provide exceptional educational experiences
                        </p>
                    </div>
                    <div className="row g-4 align-items-center justify-content-center">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={styles.partnerCard}>
                                <div className={styles.partnerLogo}>
                                    <Image
                                        src="/images/partners/uwc.avif"
                                        alt="UWC Partner"
                                        width={120}
                                        height={80}
                                        className={styles.partnerImg}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={styles.partnerCard}>
                                <div className={styles.partnerLogo}>
                                    <Image
                                        src="/images/partners/lekol.avif"
                                        alt="Lekol Partner"
                                        width={120}
                                        height={80}
                                        className={styles.partnerImg}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={styles.partnerCard}>
                                <div className={styles.partnerLogo}>
                                    <Image
                                        src="/images/partners/fellowsfp.avif"
                                        alt="FellowsFP Partner"
                                        width={120}
                                        height={80}
                                        className={styles.partnerImg}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Requirements Section */}
            <section className={styles.requirementsSection}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h2 className={styles.sectionTitle}>Program Requirements</h2>
                            <p className={styles.sectionSubtitle}>
                                Ensure you have everything needed to participate successfully
                            </p>
                            <div className={styles.requirementsList}>
                                <div className={styles.requirementItem}>
                                    <CheckCircle size={20} />
                                    <span>Laptop/Desktop with webcam</span>
                                </div>
                                <div className={styles.requirementItem}>
                                    <CheckCircle size={20} />
                                    <span>Reliable internet connection</span>
                                </div>
                                <div className={styles.requirementItem}>
                                    <CheckCircle size={20} />
                                    <span>Zoom application installed</span>
                                </div>
                                <div className={styles.requirementItem}>
                                    <CheckCircle size={20} />
                                    <span>Notebook and writing materials</span>
                                </div>
                                <div className={styles.requirementItem}>
                                    <CheckCircle size={20} />
                                    <span>Age 15-18 years old</span>
                                </div>
                                <div className={styles.requirementItem}>
                                    <CheckCircle size={20} />
                                    <span>Commitment to full program</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.requirementsImage}>
                                <Image
                                    src="/images/presentation2.JPG"
                                    alt="ESLP Requirements"
                                    width={500}
                                    height={400}
                                    className={styles.requirementsImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Requirements Section */}
            <section className={styles.applicationRequirementsSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Application Requirements</h2>
                        <p className={styles.sectionSubtitle}>
                            To complete your application, please ensure you submit the following documents
                        </p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6">
                            <div className={styles.requirementCard}>
                                <div className={styles.requirementIcon}>
                                    <BookOpen size={40} />
                                </div>
                                <h3 className={styles.requirementTitle}>Application Form</h3>
                                <p className={styles.requirementDescription}>
                                    Fill out the provided application form with accurate and complete information about your name, address, school name, and address.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className={styles.requirementCard}>
                                <div className={styles.requirementIcon}>
                                    <Award size={40} />
                                </div>
                                <h3 className={styles.requirementTitle}>Essays (2)</h3>
                                <p className={styles.requirementDescription}>
                                    Write two essays: one about your extracurricular activities and another showcasing your interest in the ESLP program.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className={styles.requirementCard}>
                                <div className={styles.requirementIcon}>
                                    <Users size={40} />
                                </div>
                                <h3 className={styles.requirementTitle}>ID Picture</h3>
                                <p className={styles.requirementDescription}>
                                    Provide a recent ID picture taken within the last year for identification purposes.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className={styles.requirementCard}>
                                <div className={styles.requirementIcon}>
                                    <GraduationCap size={40} />
                                </div>
                                <h3 className={styles.requirementTitle}>Transcripts</h3>
                                <p className={styles.requirementDescription}>
                                    Include transcripts of your current academic year to demonstrate your qualifications and academic achievements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Preparation Timeline */}
            <section className={styles.preparationSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Program Preparation</h2>
                        <p className={styles.sectionSubtitle}>
                            Timeline: June 1st – August 10th, 2025
                        </p>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className={styles.preparationContent}>
                                <h3 className={styles.preparationTitle}>What to Expect</h3>
                                <p className={styles.preparationDescription}>
                                    By now, you should know if you are selected to attend the program. We will be communicating with you about the logistics of the events and the different speakers that we will have, and what you need to prepare in advance for the event.
                                </p>
                                <div className={styles.preparationRequirements}>
                                    <h4 className={styles.requirementsTitle}>Required Materials:</h4>
                                    <div className={styles.requirementsList}>
                                        <div className={styles.requirementItem}>
                                            <CheckCircle size={20} />
                                            <span>Laptop/Desktop with webcam</span>
                                        </div>
                                        <div className={styles.requirementItem}>
                                            <CheckCircle size={20} />
                                            <span>Reliable internet connection</span>
                                        </div>
                                        <div className={styles.requirementItem}>
                                            <CheckCircle size={20} />
                                            <span>Zoom application installed</span>
                                        </div>
                                        <div className={styles.requirementItem}>
                                            <CheckCircle size={20} />
                                            <span>Notebook for the event</span>
                                        </div>
                                        <div className={styles.requirementItem}>
                                            <CheckCircle size={20} />
                                            <span>Pencil for the event</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.preparationNote}>
                                    You might also receive a little package from EdLight during that period about treats for the program.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={styles.preparationImage}>
                                <Image
                                    src="/images/internships.jpg"
                                    alt="Program Preparation"
                                    width={500}
                                    height={400}
                                    className={styles.preparationImg}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Section */}
            <section id="application" className={styles.applicationSection}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className={styles.sectionTitle}>Ready to Apply?</h2>
                            <p className={styles.sectionSubtitle}>
                                Join the next generation of leaders and make a positive impact in your community
                            </p>
                            <div className={styles.applicationInfo}>
                                <div className={styles.applicationDeadline}>
                                    <Calendar size={24} />
                                    <span>Application Deadline: May 31st, 2025</span>
                                </div>
                                <div className={styles.applicationResults}>
                                    <Clock size={24} />
                                    <span>Program Dates: August 11-23, 2025</span>
                                </div>
                            </div>
                            <div className={styles.applicationCta}>
                                <Link href="/ESLP/application" className={`btn ${styles.applyBtn}`}>
                                    Apply to ESLP 2025
                                </Link>
                                <Link href="/mission_projects" className={`btn ${styles.learnBtn}`}>
                                    Learn More About Our Mission
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alumni Section */}
            <section className={styles.alumniSection}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={styles.sectionTitle}>Inspiring Alumni</h2>
                        <p className={styles.sectionSubtitle}>
                            Our alumni have utilized their ESLP experiences to make positive impacts in their communities
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className={styles.alumniQuote}>
                                <Star size={40} />
                                <p className={styles.quoteText}>
                                    "ESLP transformed my perspective on leadership and gave me the tools to make a real difference 
                                    in my community. The connections I made and the skills I developed continue to guide me today."
                                </p>
                                <p className={styles.quoteAuthor}>- ESLP Alumni</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
