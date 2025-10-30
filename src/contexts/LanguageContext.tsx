"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.mission_projects': 'Mission & Projects',
    'nav.courses': 'Courses',
    'nav.eslp': 'ESLP',
    'nav.about_us': 'About Us',
    'nav.admin': 'Admin',
    'nav.donate': 'Donate',
    
    // About Us Page
    'about.who_are_we': 'Who are we?',
    'about.description': 'Established in 2020 by a passionate group of students, EdLight is committed to reshaping the educational landscape in Haiti. Our mission is to empower students by equipping them with the resources and support necessary to navigate their educational journey successfully. We collaborate with local educators, ensuring high-quality teaching that enables students to comprehend concepts fully. Our goal is to prepare students effectively for national exams and university studies.',
    'about.meet_initiators': 'Meet our initiators',
    'about.organizers': 'Organizers',
    'about.apply_eslp': 'Apply to ESLP 2025',
    
    // Team Roles
    'team.ceo': 'Chief Executive Officer',
    'team.cfo': 'Chief Financial Officer',
    'team.outreach_coordinator': 'Outreach coordinator',
    'team.regional_director': 'Regional Director',
    'team.chief_logistics_officer': 'Chief Logistics Officer',
    'team.eslp_director': 'ESLP Director',
    
    // Team Descriptions
    'team.stevenson_desc': 'Stevenson is an architecture student at FDS, Haiti\'s leading institution for engineering. He transferred to Concordia College in Kentucky where he hopes to continue his undergraduate studies in mathematics and computer science. Previously, he worked for the National Television of Haiti as an intern. He hopes to use the skills learned there to ensure smooth display of content.',
    'team.ted_desc': 'Ted is majoring in Economics and Data Science at Earlham College. He is passionate about social entrepreneurship. He currently leads the Net Impact chapter, where students gain experience in entrepreneurship. He is also involved in many other activities on campus such as Student Activities Council, Model UN, Resident Assistant, etc. He really hopes that the EdLight initiative has helped other students at school.',
    'team.christopher_desc': 'Christopher is a physics student at the University of Ottawa. He enjoys teaching and was previously a part-time teacher for some students in the Greater Montreal area. Passionate about documentaries on nature, he likes to tell them to others. His project is very passionate about this project and can\'t wait to see it completed.',
    'team.williamson_desc': 'Williamson Michel serves as the Regional Director of EdLight, overseeing all operations and initiatives across Haiti. With a deep understanding of the local context and a strong commitment to educational equity, Williamson leads with purpose, ensuring that EdLight\'s mission is effectively implemented on the ground. His leadership plays a crucial role in building partnerships, supporting program delivery, and expanding the organization\'s reach and impact.',
    'team.stephane_desc': 'Stephane Laine is the Chief Logistics Officer of the EdLight Summer Leadership Program, where he plays a pivotal role in ensuring the smooth coordination and execution of all program operations. A recent graduate in Computer Science from Université Quisqueya, Stephane combines his technical skills with a strong sense of organization and problem-solving to support the success of EdLight\'s mission.',
    'team.rony_desc': 'Rony Francillon is a passionate educator and visionary leader dedicated to empowering youth through education and civic engagement. As the Program Director of the EdLight Summer Leadership Program, he brings a unique blend of academic expertise and grassroots experience to create transformative learning experiences for students in Haiti. Currently pursuing a Master\'s degree in France, Rony continues to shape the program\'s strategic direction.',
    
    // Footer
    'footer.brand_tagline': 'Empowering Communities',
    'footer.mission_text': 'At EdLight, our mission is to make education free and accessible to all people in Haiti. We provide high school students with digital access to quality education through our online courses in STEM subjects. Additionally, our Summer Leadership Program offers a unique opportunity for students to explore innovation, entrepreneurship, and leadership beyond the classroom. Join us in our quest for educational equity and help us empower the next generation of leaders. Together, we can create a brighter future for all...',
    'footer.learn_more': 'Learn More',
    'footer.quick_links': 'Quick Links',
    'footer.programs': 'Programs',
    'footer.educational_courses': 'Educational Courses',
    'footer.partnerships': 'Partnerships',
    'footer.stay_connected': 'Stay Connected',
    'footer.newsletter_text': 'Subscribe to our newsletter for updates on our latest initiatives and impact stories.',
    'footer.email_placeholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    'footer.follow_us': 'Follow Us',
    'footer.our_partners': 'Our Partners',
    'footer.partnership_subtitle': 'Working together to create lasting impact in communities worldwide',
    'footer.copyright': 'EdLight Initiative. All rights reserved.',
    'footer.made_with_love': 'Made with',
    'footer.for_communities': 'for communities worldwide',
    
    // Home Page
    'home.hero_title': 'Empowering Communities Through Education',
    'home.hero_subtitle': 'Making quality education accessible to all students in Haiti',
    'home.hero_description': 'Join us in our mission to provide free, high-quality STEM education and leadership development programs that empower the next generation of Haitian leaders.',
    'home.get_started': 'Get Started',
    'home.learn_more': 'Learn More',
    'home.welcome_title': 'Welcome to EdLight Initiative',
    'home.welcome_description': 'We are committed to transforming education in Haiti through innovative programs and partnerships that make learning accessible to everyone.',
    'home.opportunity_title': 'Opportunities for All',
    'home.opportunity_description': 'Discover our range of programs designed to support students at every level of their educational journey.',
    'home.video_title': 'See Our Impact',
    'home.video_description': 'Watch how we\'re making a difference in communities across Haiti.',
    'home.here_is_edlight_title': 'Here is EdLight',
    'home.here_is_edlight_description': 'Learn about our mission, values, and the impact we\'re creating in Haitian communities.',
    
    // Mission & Projects Page
    'mission.hero_title': 'Our Mission & Projects',
    'mission.hero_description': 'Discover how we\'re transforming education in Haiti through innovative programs and partnerships.',
    'mission.mission_title': 'Our Mission',
    'mission.mission_description': 'To make education free and accessible to all people in Haiti, empowering students with the knowledge and skills they need to succeed.',
    'mission.projects_title': 'Our Projects',
    'mission.online_courses_title': 'Online Courses',
    'mission.online_courses_description': 'We provide high school students with digital access to quality education through our online courses in STEM subjects, making education free and accessible to all.',
    'mission.eslp_title': 'ESLP',
    'mission.eslp_description': 'Our Summer Leadership Program offers students the opportunity to develop leadership skills and explore innovation beyond the classroom.',
    'mission.eifp_title': 'EIFP',
    'mission.eifp_description': 'The EdLight Internship and Fellowship Program connects students with real-world experience and mentorship opportunities.',
    'mission.partners_title': 'Our Partners',
    'mission.partners_description': 'We work with organizations worldwide to create lasting impact in communities.',
    
    // Courses Page
    'courses.hero_title': 'Educational Courses',
    'courses.hero_description': 'Access high-quality STEM education courses designed specifically for Haitian students.',
    'courses.available_courses': 'Available Courses',
    'courses.enroll_now': 'Enroll Now',
    'courses.free_courses': 'Free Courses',
    'courses.stem_subjects': 'STEM Subjects',
    
    // ESLP Page
    'eslp.hero_title': 'EdLight Summer Leadership Program',
    'eslp.hero_description': 'Join our intensive leadership development program designed to empower the next generation of Haitian leaders.',
    'eslp.overview_title': 'Program Overview',
    'eslp.overview_description': 'ESLP is a comprehensive leadership program that combines academic excellence with practical leadership development.',
    'eslp.structure_title': 'Program Structure',
    'eslp.speakers_title': 'Featured Speakers',
    'eslp.requirements_title': 'Requirements',
    'eslp.application_title': 'Application Process',
    'eslp.alumni_title': 'Alumni Success Stories',
    'eslp.apply_now': 'Apply Now',
    'eslp.learn_more': 'Learn More',
    
    // Donate Page
    'donate.title': 'Donate to EdLight Initiative',
    'donate.description': 'Thank you for your interest in supporting EdLight Initiative. Your contribution helps us empower communities through education.',
    'donate.donate_now': 'Donate Now',
    'donate.impact_title': 'Your Impact',
    'donate.impact_description': 'Every donation helps us provide free education and leadership development opportunities to students in Haiti.',
    
    // Admin Page
    'admin.title': 'Admin Dashboard',
    'admin.description': 'Manage applications and view analytics for the EdLight Initiative.',
    'admin.analytics': 'Analytics',
    'admin.applications': 'Applications',
    'admin.total_applications': 'Total Applications',
    'admin.recent_applications': 'Recent Applications',
    'admin.view_all': 'View All',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.mission_projects': 'Mission et Projets',
    'nav.courses': 'Cours',
    'nav.eslp': 'ESLP',
    'nav.about_us': 'À Propos',
    'nav.admin': 'Administration',
    'nav.donate': 'Faire un Don',
    
    // About Us Page
    'about.who_are_we': 'Qui sommes-nous ?',
    'about.description': 'Établi en 2020 par un groupe passionné d\'étudiants, EdLight s\'engage à remodeler le paysage éducatif en Haïti. Notre mission est d\'autonomiser les étudiants en leur fournissant les ressources et le soutien nécessaires pour naviguer avec succès dans leur parcours éducatif. Nous collaborons avec des éducateurs locaux, assurant un enseignement de haute qualité qui permet aux étudiants de comprendre pleinement les concepts. Notre objectif est de préparer efficacement les étudiants aux examens nationaux et aux études universitaires.',
    'about.meet_initiators': 'Rencontrez nos initiateurs',
    'about.organizers': 'Organisateurs',
    'about.apply_eslp': 'Postuler à ESLP 2025',
    
    // Team Roles
    'team.ceo': 'Directeur Général',
    'team.cfo': 'Directeur Financier',
    'team.outreach_coordinator': 'Coordinateur de sensibilisation',
    'team.regional_director': 'Directeur Régional',
    'team.chief_logistics_officer': 'Directeur Logistique',
    'team.eslp_director': 'Directeur ESLP',
    
    // Team Descriptions
    'team.stevenson_desc': 'Stevenson est étudiant en architecture à la FDS, la principale institution d\'ingénierie d\'Haïti. Il a transféré au Concordia College dans le Kentucky où il espère poursuivre ses études de premier cycle en mathématiques et en informatique. Auparavant, il a travaillé pour la Télévision Nationale d\'Haïti en tant que stagiaire. Il espère utiliser les compétences apprises là-bas pour assurer un affichage fluide du contenu.',
    'team.ted_desc': 'Ted étudie l\'économie et la science des données à Earlham College. Il est passionné par l\'entrepreneuriat social. Il dirige actuellement le chapitre Net Impact, où les étudiants acquièrent de l\'expérience en entrepreneuriat. Il est également impliqué dans de nombreuses autres activités sur le campus telles que le Conseil des activités étudiantes, le Modèle ONU, Assistant résident, etc. Il espère vraiment que l\'initiative EdLight a aidé d\'autres étudiants à l\'école.',
    'team.christopher_desc': 'Christopher est étudiant en physique à l\'Université d\'Ottawa. Il aime enseigner et était auparavant enseignant à temps partiel pour certains étudiants de la région du Grand Montréal. Passionné par les documentaires sur la nature, il aime les raconter aux autres. Son projet est très passionné par ce projet et a hâte de le voir terminé.',
    'team.williamson_desc': 'Williamson Michel sert de Directeur Régional d\'EdLight, supervisant toutes les opérations et initiatives à travers Haïti. Avec une compréhension profonde du contexte local et un engagement fort envers l\'équité éducative, Williamson dirige avec un objectif, s\'assurant que la mission d\'EdLight est efficacement mise en œuvre sur le terrain. Son leadership joue un rôle crucial dans la construction de partenariats, le soutien à la livraison de programmes et l\'expansion de la portée et de l\'impact de l\'organisation.',
    'team.stephane_desc': 'Stéphane Lainé est le Directeur Logistique du Programme de Leadership d\'Été EdLight, où il joue un rôle central dans l\'assurance de la coordination et de l\'exécution fluides de toutes les opérations du programme. Diplômé récent en Informatique de l\'Université Quisqueya, Stéphane combine ses compétences techniques avec un fort sens de l\'organisation et de la résolution de problèmes pour soutenir le succès de la mission d\'EdLight.',
    'team.rony_desc': 'Rony Francillon est un éducateur passionné et un leader visionnaire dédié à l\'autonomisation des jeunes par l\'éducation et l\'engagement civique. En tant que Directeur de Programme du Programme de Leadership d\'Été EdLight, il apporte un mélange unique d\'expertise académique et d\'expérience de terrain pour créer des expériences d\'apprentissage transformatrices pour les étudiants en Haïti. Actuellement en train de poursuivre une maîtrise en France, Rony continue de façonner la direction stratégique du programme.',
    
    // Footer
    'footer.brand_tagline': 'Autonomiser les Communautés',
    'footer.mission_text': 'Chez EdLight, notre mission est de rendre l\'éducation gratuite et accessible à tous les Haïtiens. Nous offrons aux lycéens un accès numérique à une éducation de qualité grâce à nos cours en ligne dans les matières STEM. De plus, notre Programme de Leadership d\'Été offre une opportunité unique aux étudiants d\'explorer l\'innovation, l\'entrepreneuriat et le leadership au-delà de la salle de classe. Rejoignez-nous dans notre quête d\'équité éducative et aidez-nous à autonomiser la prochaine génération de leaders. Ensemble, nous pouvons créer un avenir plus brillant pour tous...',
    'footer.learn_more': 'En Savoir Plus',
    'footer.quick_links': 'Liens Rapides',
    'footer.programs': 'Programmes',
    'footer.educational_courses': 'Cours Éducatifs',
    'footer.partnerships': 'Partenariats',
    'footer.stay_connected': 'Restez Connectés',
    'footer.newsletter_text': 'Abonnez-vous à notre newsletter pour des mises à jour sur nos dernières initiatives et histoires d\'impact.',
    'footer.email_placeholder': 'Entrez votre email',
    'footer.subscribe': 'S\'abonner',
    'footer.follow_us': 'Suivez-nous',
    'footer.our_partners': 'Nos Partenaires',
    'footer.partnership_subtitle': 'Travaillant ensemble pour créer un impact durable dans les communautés du monde entier',
    'footer.copyright': 'Initiative EdLight. Tous droits réservés.',
    'footer.made_with_love': 'Fait avec',
    'footer.for_communities': 'pour les communautés du monde entier',
    
    // Home Page
    'home.hero_title': 'Autonomiser les Communautés par l\'Éducation',
    'home.hero_subtitle': 'Rendre l\'éducation de qualité accessible à tous les étudiants en Haïti',
    'home.hero_description': 'Rejoignez-nous dans notre mission de fournir une éducation STEM gratuite et de haute qualité et des programmes de développement du leadership qui autonomisent la prochaine génération de leaders haïtiens.',
    'home.get_started': 'Commencer',
    'home.learn_more': 'En Savoir Plus',
    'home.welcome_title': 'Bienvenue à l\'Initiative EdLight',
    'home.welcome_description': 'Nous nous engageons à transformer l\'éducation en Haïti grâce à des programmes et partenariats innovants qui rendent l\'apprentissage accessible à tous.',
    'home.opportunity_title': 'Opportunités pour Tous',
    'home.opportunity_description': 'Découvrez notre gamme de programmes conçus pour soutenir les étudiants à chaque niveau de leur parcours éducatif.',
    'home.video_title': 'Voir Notre Impact',
    'home.video_description': 'Regardez comment nous faisons une différence dans les communautés à travers Haïti.',
    'home.here_is_edlight_title': 'Voici EdLight',
    'home.here_is_edlight_description': 'Découvrez notre mission, nos valeurs et l\'impact que nous créons dans les communautés haïtiennes.',
    
    // Mission & Projects Page
    'mission.hero_title': 'Notre Mission et Projets',
    'mission.hero_description': 'Découvrez comment nous transformons l\'éducation en Haïti grâce à des programmes et partenariats innovants.',
    'mission.mission_title': 'Notre Mission',
    'mission.mission_description': 'Rendre l\'éducation gratuite et accessible à tous les Haïtiens, en autonomisant les étudiants avec les connaissances et compétences dont ils ont besoin pour réussir.',
    'mission.projects_title': 'Nos Projets',
    'mission.online_courses_title': 'Cours en Ligne',
    'mission.online_courses_description': 'Nous offrons aux lycéens un accès numérique à une éducation de qualité grâce à nos cours en ligne dans les matières STEM, rendant l\'éducation gratuite et accessible à tous.',
    'mission.eslp_title': 'ESLP',
    'mission.eslp_description': 'Notre Programme de Leadership d\'Été offre aux étudiants l\'opportunité de développer des compétences en leadership et d\'explorer l\'innovation au-delà de la salle de classe.',
    'mission.eifp_title': 'EIFP',
    'mission.eifp_description': 'Le Programme de Stage et de Bourse EdLight connecte les étudiants avec une expérience du monde réel et des opportunités de mentorat.',
    'mission.partners_title': 'Nos Partenaires',
    'mission.partners_description': 'Nous travaillons avec des organisations du monde entier pour créer un impact durable dans les communautés.',
    
    // Courses Page
    'courses.hero_title': 'Cours Éducatifs',
    'courses.hero_description': 'Accédez à des cours d\'éducation STEM de haute qualité conçus spécifiquement pour les étudiants haïtiens.',
    'courses.available_courses': 'Cours Disponibles',
    'courses.enroll_now': 'S\'inscrire Maintenant',
    'courses.free_courses': 'Cours Gratuits',
    'courses.stem_subjects': 'Matières STEM',
    
    // ESLP Page
    'eslp.hero_title': 'Programme de Leadership d\'Été EdLight',
    'eslp.hero_description': 'Rejoignez notre programme intensif de développement du leadership conçu pour autonomiser la prochaine génération de leaders haïtiens.',
    'eslp.overview_title': 'Aperçu du Programme',
    'eslp.overview_description': 'ESLP est un programme de leadership complet qui combine l\'excellence académique avec le développement pratique du leadership.',
    'eslp.structure_title': 'Structure du Programme',
    'eslp.speakers_title': 'Conférenciers Invités',
    'eslp.requirements_title': 'Exigences',
    'eslp.application_title': 'Processus de Candidature',
    'eslp.alumni_title': 'Histoires de Succès des Anciens',
    'eslp.apply_now': 'Postuler Maintenant',
    'eslp.learn_more': 'En Savoir Plus',
    
    // Donate Page
    'donate.title': 'Faire un Don à l\'Initiative EdLight',
    'donate.description': 'Merci de votre intérêt à soutenir l\'Initiative EdLight. Votre contribution nous aide à autonomiser les communautés par l\'éducation.',
    'donate.donate_now': 'Faire un Don Maintenant',
    'donate.impact_title': 'Votre Impact',
    'donate.impact_description': 'Chaque don nous aide à fournir une éducation gratuite et des opportunités de développement du leadership aux étudiants en Haïti.',
    
    // Admin Page
    'admin.title': 'Tableau de Bord Administrateur',
    'admin.description': 'Gérez les candidatures et consultez les analyses pour l\'Initiative EdLight.',
    'admin.analytics': 'Analyses',
    'admin.applications': 'Candidatures',
    'admin.total_applications': 'Total des Candidatures',
    'admin.recent_applications': 'Candidatures Récentes',
    'admin.view_all': 'Voir Tout',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
