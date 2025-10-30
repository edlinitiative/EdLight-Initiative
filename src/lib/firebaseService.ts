import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface ESLPApplicationData {
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
  classeOther?: string;
  
  // How did you hear about us
  commentEntendu: string;
  commentEntenduOther?: string;
  
  // Documents (file names/paths)
  releveNotes?: string;
  photoIdentite?: string;
  
  // Essay Questions
  motivation: string;
  activitesParascolaires: string;
  defiRealise: string;
  futurHaiti: string;
  
  // Technical Requirements
  ordinateur: string;
  ordinateurOther?: string;
  connexionInternet: string;
  connexionInternetOther?: string;
  espaceCalme: string;
  espaceCalmeOther?: string;
  
  // Reference (Optional)
  personneReference?: string;
  relationReference?: string;
  
  // Metadata
  submittedAt: Date | string; // Firestore timestamp
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  applicationId?: string;
}

export const submitESLPApplication = async (formData: Omit<ESLPApplicationData, 'submittedAt' | 'status'>): Promise<string> => {
  try {
    // Add metadata
    const applicationData: ESLPApplicationData = {
      ...formData,
      submittedAt: serverTimestamp(),
      status: 'pending'
    };

    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'eslp_applications'), applicationData);
    
    console.log('Application submitted successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw new Error('Failed to submit application. Please try again.');
  }
};

export const uploadFile = async (file: File, applicationId: string, fieldName: string): Promise<string> => {
  // Simple filename storage - no actual file upload
  const timestamp = Date.now();
  const fileName = `${applicationId}_${fieldName}_${timestamp}_${file.name}`;
  return fileName;
};

// Newsletter subscription
export interface NewsletterSubscriber {
  email: string;
  subscribedAt: Date | string;
  source?: string;
}

export const subscribeNewsletter = async (email: string, source?: string): Promise<string> => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('A valid email is required');
  }
  const subscriber: NewsletterSubscriber = {
    email: email.toLowerCase().trim(),
    subscribedAt: serverTimestamp(),
    source,
  };
  const docRef = await addDoc(collection(db, 'newsletter_subscribers'), subscriber);
  return docRef.id;
};
