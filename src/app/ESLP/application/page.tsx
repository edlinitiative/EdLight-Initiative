"use client";
import { useState } from "react";
import logger from '@/lib/logger';
import Link from "next/link";
import { ArrowLeft, Calendar, User, Phone, FileText, Upload, CheckCircle, Users, Clock } from "lucide-react";
import styles from "./Application.module.css";
import { submitESLPApplication, uploadFile } from "@/lib/firebaseService";

type ApplicationFormData = {
    // Personal Information
    email: string;
    prenom: string;
    nom: string;
    dateNaissance: string;
    sexe: string;
    telephone: string;
    etablissement: string;
    adresse: string;
    classe: string;
    classeOther: string;
    // How did you hear about us
    commentEntendu: string;
    commentEntenduOther: string;
    // Documents (UI-only)
    releveNotes: File | null;
    photoIdentite: File | null;
    // Essay Questions
    motivation: string;
    activitesParascolaires: string;
    defiRealise: string;
    futurHaiti: string;
    // Technical Requirements
    ordinateur: string;
    ordinateurOther: string;
    connexionInternet: string;
    connexionInternetOther: string;
    espaceCalme: string;
    espaceCalmeOther: string;
    // Reference (Optional)
    personneReference: string;
    relationReference: string;
};

type SubmissionData = Omit<ApplicationFormData, 'releveNotes' | 'photoIdentite'> & {
    releveNotes?: string;
    photoIdentite?: string;
};

export default function ESLPApplicationPage() {
    const [formData, setFormData] = useState<ApplicationFormData>({
        // Personal Information
        email: '',
        prenom: '',
        nom: '',
        dateNaissance: '',
        sexe: '',
        telephone: '',
        etablissement: '',
        adresse: '',
        classe: '',
        classeOther: '',
        
        // How did you hear about us
        commentEntendu: '',
        commentEntenduOther: '',
        
        // Documents
        releveNotes: null,
        photoIdentite: null,
        
        // Essay Questions
        motivation: '',
        activitesParascolaires: '',
        defiRealise: '',
        futurHaiti: '',
        
        // Technical Requirements
        ordinateur: '',
        ordinateurOther: '',
        connexionInternet: '',
        connexionInternetOther: '',
        espaceCalme: '',
        espaceCalmeOther: '',
        
        // Reference (Optional)
        personneReference: '',
        relationReference: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [, setApplicationId] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        const name = (target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).name as keyof ApplicationFormData;
        if (target instanceof HTMLInputElement && target.type === 'file') {
            const file = target.files && target.files[0] ? target.files[0] : null;
            setFormData(prev => ({ ...prev, [name]: file } as ApplicationFormData));
        } else {
            const value = (target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
            setFormData(prev => ({ ...prev, [name]: value } as ApplicationFormData));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            // Prepare form data for submission
            const submissionData: SubmissionData = {
                email: formData.email,
                prenom: formData.prenom,
                nom: formData.nom,
                dateNaissance: formData.dateNaissance,
                sexe: formData.sexe,
                telephone: formData.telephone,
                etablissement: formData.etablissement,
                adresse: formData.adresse,
                classe: formData.classe,
                classeOther: formData.classeOther,
                commentEntendu: formData.commentEntendu,
                commentEntenduOther: formData.commentEntenduOther,
                motivation: formData.motivation,
                activitesParascolaires: formData.activitesParascolaires,
                defiRealise: formData.defiRealise,
                futurHaiti: formData.futurHaiti,
                ordinateur: formData.ordinateur,
                ordinateurOther: formData.ordinateurOther,
                connexionInternet: formData.connexionInternet,
                connexionInternetOther: formData.connexionInternetOther,
                espaceCalme: formData.espaceCalme,
                espaceCalmeOther: formData.espaceCalmeOther,
                personneReference: formData.personneReference,
                relationReference: formData.relationReference,
            };

            // Handle file uploads if files are selected
            if (formData.releveNotes) {
                submissionData.releveNotes = await uploadFile(formData.releveNotes, 'temp', 'releveNotes');
            }
            if (formData.photoIdentite) {
                submissionData.photoIdentite = await uploadFile(formData.photoIdentite, 'temp', 'photoIdentite');
            }

            // Submit to Firebase
            const id = await submitESLPApplication(submissionData);
            setApplicationId(id);
            setIsSubmitted(true);
        } catch (error) {
            logger.error('Submission error:', error);
            setSubmitError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={styles.applicationPage}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className={styles.successMessage}>
                                <CheckCircle size={80} />
                                <h1 className={styles.successTitle}>Candidature soumise avec succès!</h1>
                                <p className={styles.successDescription}>
                                    Merci de votre intérêt pour le Programme de Leadership d'Été EdLight (ESLP). 
                                    Nous avons reçu votre candidature et l'examinerons attentivement.
                                </p>
                                <p className={styles.successNote}>
                                    Les résultats seront annoncés dans la première semaine après la date limite de candidature (20 mai 2025).
                                </p>
                                <div className={styles.successActions}>
                                    <Link href="/ESLP" className={`btn ${styles.backBtn}`}>
                                        <ArrowLeft size={20} />
                                        Retour à ESLP
                                    </Link>
                                    <Link href="/" className={`btn ${styles.homeBtn}`}>
                                        Aller à l'accueil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.applicationPage}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {/* Header */}
                        <div className={styles.header}>
                            <Link href="/ESLP" className={styles.backLink}>
                                <ArrowLeft size={20} />
                                Retour à ESLP
                            </Link>
                            <h1 className={styles.title}>EdLight Summer Leadership Program (ESLP) 2025</h1>
                            <p className={styles.subtitle}>
                                EdLight annonce le lancement de son programme d'été annuel: The EdLight Summer
                                Leadership Program (ESLP). L'objectif du programme est d'améliorer les compétences 
                                en leadership des participants et de leur fournir les outils et les connaissances 
                                nécessaires afin de former de meilleurs leaders et de nouveaux citoyens.
                            </p>
                            <div className={styles.programInfo}>
                                <div className={styles.infoItem}>
                                    <Users size={20} />
                                    <span>25 étudiants sélectionnés</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <Calendar size={20} />
                                    <span>Du 5 au 16 août 2025</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <Clock size={20} />
                                    <span>9h à 15h, Lundi-Vendredi</span>
                                </div>
                            </div>
                            <div className={styles.deadline}>
                                <Calendar size={20} />
                                <span>Date limite: 20 mai 2025 à 23h59 EST</span>
                            </div>
                        </div>

                        {/* Error Message */}
                        {submitError && (
                            <div className={styles.errorMessage}>
                                <p>{submitError}</p>
                            </div>
                        )}

                        {/* Application Form */}
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* Personal Information Section */}
                            <section className={styles.formSection}>
                                <h2 className={styles.sectionTitle}>
                                    <User size={24} />
                                    Informations Personnelles
                                </h2>
                                
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className={styles.label}>1. Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className={styles.label}>2. Prénom *</label>
                                        <input
                                            type="text"
                                            name="prenom"
                                            value={formData.prenom}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className={styles.label}>3. Nom de famille *</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className={styles.label}>4. Date de naissance *</label>
                                        <input
                                            type="date"
                                            name="dateNaissance"
                                            value={formData.dateNaissance}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className={styles.label}>5. Sexe *</label>
                                        <div className={styles.radioGroup}>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="sexe"
                                                    value="masculin"
                                                    checked={formData.sexe === 'masculin'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Masculin</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="sexe"
                                                    value="feminin"
                                                    checked={formData.sexe === 'feminin'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Féminin</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className={styles.label}>6. Numéro de téléphone *</label>
                                        <input
                                            type="tel"
                                            name="telephone"
                                            value={formData.telephone}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className={styles.label}>7. Établissement scolaire *</label>
                                        <input
                                            type="text"
                                            name="etablissement"
                                            value={formData.etablissement}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            placeholder="Nom de l'établissement scolaire fréquenté"
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className={styles.label}>8. Adresse de résidence *</label>
                                        <input
                                            type="text"
                                            name="adresse"
                                            value={formData.adresse}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className={styles.label}>9. Dans quelle classe serez-vous pour la prochaine année académique (2025-2026) *</label>
                                        <div className={styles.radioGroup}>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="classe"
                                                    value="nsi"
                                                    checked={formData.classe === 'nsi'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>NSI</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="classe"
                                                    value="nsii"
                                                    checked={formData.classe === 'nsii'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>NSII</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="classe"
                                                    value="nsiii"
                                                    checked={formData.classe === 'nsiii'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>NSIII</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="classe"
                                                    value="nsiv"
                                                    checked={formData.classe === 'nsiv'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>NSIV</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="classe"
                                                    value="universite"
                                                    checked={formData.classe === 'universite'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Université</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="classe"
                                                    value="other"
                                                    checked={formData.classe === 'other'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Autre:</span>
                                            </label>
                                        </div>
                                        {formData.classe === 'other' && (
                                            <input
                                                type="text"
                                                name="classeOther"
                                                value={formData.classeOther}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Précisez"
                                                style={{ marginTop: '0.5rem' }}
                                            />
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <label className={styles.label}>10. Comment avez-vous entendu parler de nous? *</label>
                                        <div className={styles.radioGroup}>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="commentEntendu"
                                                    value="instagram"
                                                    checked={formData.commentEntendu === 'instagram'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Instagram</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="commentEntendu"
                                                    value="whatsapp"
                                                    checked={formData.commentEntendu === 'whatsapp'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>WhatsApp</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="commentEntendu"
                                                    value="facebook"
                                                    checked={formData.commentEntendu === 'facebook'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Facebook</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="commentEntendu"
                                                    value="amis-famille"
                                                    checked={formData.commentEntendu === 'amis-famille'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Amis/Famille</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="commentEntendu"
                                                    value="other"
                                                    checked={formData.commentEntendu === 'other'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Autre:</span>
                                            </label>
                                        </div>
                                        {formData.commentEntendu === 'other' && (
                                            <input
                                                type="text"
                                                name="commentEntenduOther"
                                                value={formData.commentEntenduOther}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Précisez"
                                                style={{ marginTop: '0.5rem' }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Documents Section */}
                            <section className={styles.formSection}>
                                <h2 className={styles.sectionTitle}>
                                    <Upload size={24} />
                                    Documents
                                </h2>
                                
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className={styles.label}>11. Relevé de notes (des deux dernières années) *</label>
                                        <p className={styles.fileDescription}>(Il peut s'agir d'une photo de vos carnets, ou pdf)</p>
                                        <input
                                            type="file"
                                            name="releveNotes"
                                            onChange={handleInputChange}
                                            className={styles.fileInput}
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className={styles.label}>12. Photos d'identité *</label>
                                        <p className={styles.fileDescription}>Veuillez soumettre une pièce d'identité (ex: Badge, Carte d'identification nationale etc.)</p>
                                        <input
                                            type="file"
                                            name="photoIdentite"
                                            onChange={handleInputChange}
                                            className={styles.fileInput}
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            required
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Essay Questions Section */}
                            <section className={styles.formSection}>
                                <h2 className={styles.sectionTitle}>
                                    <FileText size={24} />
                                    Essai
                                </h2>
                                
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className={styles.label}>
                                            13. Parlez nous un peu de vous et de votre motivation à participer à ESLP 2025 (100 mots maximum) *
                                        </label>
                                        <textarea
                                            name="motivation"
                                            value={formData.motivation}
                                            onChange={handleInputChange}
                                            className={styles.textarea}
                                            rows={4}
                                            required
                                            placeholder="Décrivez votre motivation, votre parcours et vos réalisations..."
                                            maxLength={500}
                                        />
                                        <div className={styles.wordCount}>
                                            {formData.motivation.length}/500 caractères
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className={styles.label}>
                                            14. En 200 mots, veuillez décrire les différentes activités parascolaire, périscolaires et extrascolaires que vous avez réalisées ou participé. Quel est (était) votre rôle dans celles-ci? *
                                        </label>
                                        <textarea
                                            name="activitesParascolaires"
                                            value={formData.activitesParascolaires}
                                            onChange={handleInputChange}
                                            className={styles.textarea}
                                            rows={6}
                                            required
                                            placeholder="Décrivez vos activités et votre rôle..."
                                            maxLength={1000}
                                        />
                                        <div className={styles.wordCount}>
                                            {formData.activitesParascolaires.length}/1000 caractères
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className={styles.label}>
                                            15. Veuillez décrire une activité que vous avez réalisée ou un défi que vous avez surmonté dont vous êtes fier(e). (100 mots maximum) *
                                        </label>
                                        <textarea
                                            name="defiRealise"
                                            value={formData.defiRealise}
                                            onChange={handleInputChange}
                                            className={styles.textarea}
                                            rows={4}
                                            required
                                            placeholder="Décrivez votre accomplissement ou défi surmonté..."
                                            maxLength={500}
                                        />
                                        <div className={styles.wordCount}>
                                            {formData.defiRealise.length}/500 caractères
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className={styles.label}>
                                            16. Veuillez décrire à quoi ressemble votre futur Haïti et comment vous comptez l'aider à en arriver là ? (En 200 mots maximum) *
                                        </label>
                                        <textarea
                                            name="futurHaiti"
                                            value={formData.futurHaiti}
                                            onChange={handleInputChange}
                                            className={styles.textarea}
                                            rows={6}
                                            required
                                            placeholder="Décrivez votre vision pour l'avenir d'Haïti..."
                                            maxLength={1000}
                                        />
                                        <div className={styles.wordCount}>
                                            {formData.futurHaiti.length}/1000 caractères
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Technical Requirements Section */}
                            <section className={styles.formSection}>
                                <h2 className={styles.sectionTitle}>
                                    <Phone size={24} />
                                    Outils techniques
                                </h2>
                                <p className={styles.sectionDescription}>
                                    ESLP 2025 sera majoritairement virtuel. Actuellement, nous ne sommes pas en mesure de fournir une assistance technique à nos membres, ce qui nous oblige à demander à tous nos participants d'avoir un ordinateur portable/de bureau avec une connexion Internet fiable et une caméra et une accessibilité audio.
                                </p>
                                
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className={styles.label}>17. Avez-vous un ordinateur portable ou un ordinateur de bureau avec caméra et microphone ? *</label>
                                        <div className={styles.radioGroup}>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="ordinateur"
                                                    value="oui"
                                                    checked={formData.ordinateur === 'oui'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Oui</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="ordinateur"
                                                    value="non"
                                                    checked={formData.ordinateur === 'non'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Non</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="ordinateur"
                                                    value="other"
                                                    checked={formData.ordinateur === 'other'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Autre:</span>
                                            </label>
                                        </div>
                                        {formData.ordinateur === 'other' && (
                                            <input
                                                type="text"
                                                name="ordinateurOther"
                                                value={formData.ordinateurOther}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Précisez"
                                                style={{ marginTop: '0.5rem' }}
                                            />
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <label className={styles.label}>18. Avez-vous une connexion internet fiable ? *</label>
                                        <div className={styles.radioGroup}>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="connexionInternet"
                                                    value="oui"
                                                    checked={formData.connexionInternet === 'oui'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Oui</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="connexionInternet"
                                                    value="non"
                                                    checked={formData.connexionInternet === 'non'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Non</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="connexionInternet"
                                                    value="other"
                                                    checked={formData.connexionInternet === 'other'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Autre:</span>
                                            </label>
                                        </div>
                                        {formData.connexionInternet === 'other' && (
                                            <input
                                                type="text"
                                                name="connexionInternetOther"
                                                value={formData.connexionInternetOther}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Précisez"
                                                style={{ marginTop: '0.5rem' }}
                                            />
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <label className={styles.label}>19. Auriez-vous accès à une espace calme afin de participer à ESLP? *</label>
                                        <div className={styles.radioGroup}>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="espaceCalme"
                                                    value="oui"
                                                    checked={formData.espaceCalme === 'oui'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Oui</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="espaceCalme"
                                                    value="non"
                                                    checked={formData.espaceCalme === 'non'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Non</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="espaceCalme"
                                                    value="other"
                                                    checked={formData.espaceCalme === 'other'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                    required
                                                />
                                                <span>Autre:</span>
                                            </label>
                                        </div>
                                        {formData.espaceCalme === 'other' && (
                                            <input
                                                type="text"
                                                name="espaceCalmeOther"
                                                value={formData.espaceCalmeOther}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                placeholder="Précisez"
                                                style={{ marginTop: '0.5rem' }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Reference Section */}
                            <section className={styles.formSection}>
                                <h2 className={styles.sectionTitle}>
                                    <FileText size={24} />
                                    Référence (Facultative)
                                </h2>
                                
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className={styles.label}>20. Ajoutez une personne de référence</label>
                                        <p className={styles.fileDescription}>
                                            (Elle peut être un ancien de ESLP, un professeur ou une personne dont vous avez une relation professionnelle)
                                        </p>
                                        <input
                                            type="text"
                                            name="personneReference"
                                            value={formData.personneReference}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            placeholder="Nom de la personne de référence"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className={styles.label}>21. Relation avec la personne de référence</label>
                                        <div className={styles.radioGroup}>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="relationReference"
                                                    value="eslp-alumni"
                                                    checked={formData.relationReference === 'eslp-alumni'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                />
                                                <span>ESLP Alumni</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="relationReference"
                                                    value="responsable-academique"
                                                    checked={formData.relationReference === 'responsable-academique'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                />
                                                <span>Responsable académique</span>
                                            </label>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    type="radio"
                                                    name="relationReference"
                                                    value="relation-professionnelle"
                                                    checked={formData.relationReference === 'relation-professionnelle'}
                                                    onChange={handleInputChange}
                                                    className={styles.radio}
                                                />
                                                <span>Relation professionnelle</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Terms and Conditions */}
                            <section className={styles.formSection}>
                                <div className={styles.termsSection}>
                                    <h3 className={styles.termsTitle}>Conditions et Termes</h3>
                                    <div className={styles.termsContent}>
                                        <p>En soumettant cette candidature, je reconnais que :</p>
                                        <ul>
                                            <li>Toutes les informations fournies sont exactes et complètes</li>
                                            <li>Je respecte les exigences d'âge (15-18 ans)</li>
                                            <li>Je peux m'engager dans le programme complet de 2 semaines (5-16 août 2025)</li>
                                            <li>J'ai l'équipement nécessaire (ordinateur, internet, caméra, microphone)</li>
                                            <li>Je comprends que seulement 25 étudiants seront sélectionnés</li>
                                            <li>Je vais compléter et présenter un projet communautaire pour recevoir le certificat</li>
                                            <li>Les candidatures féminines sont vivement encouragées</li>
                                        </ul>
                                    </div>
                                    <div className={styles.checkboxContainer}>
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            name="terms"
                                            required
                                            className={styles.checkbox}
                                        />
                                        <label htmlFor="terms" className={styles.checkboxLabel}>
                                            J'accepte les conditions et termes *
                                        </label>
                                    </div>
                                </div>
                            </section>

                            {/* Submit Button */}
                            <div className={styles.submitSection}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`btn ${styles.submitBtn}`}
                                >
                                    {isSubmitting ? 'Soumission en cours...' : 'Soumettre la candidature'}
                                </button>
                                <p className={styles.submitNote}>
                                    * Les champs obligatoires doivent être complétés. Les candidatures sont dues le 20 mai 2025 à 23h59 EST.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
