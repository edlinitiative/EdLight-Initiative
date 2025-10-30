"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Users, FileText, Calendar, TrendingUp, Download, Eye, Filter } from "lucide-react";
import AdminAuth from "@/components/AdminAuth";
import styles from "./Admin.module.css";

interface ApplicationData {
  id: string;
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
  commentEntendu: string;
  commentEntenduOther?: string;
  motivation: string;
  activitesParascolaires: string;
  defiRealise: string;
  futurHaiti: string;
  ordinateur: string;
  ordinateurOther?: string;
  connexionInternet: string;
  connexionInternetOther?: string;
  espaceCalme: string;
  espaceCalmeOther?: string;
  personneReference?: string;
  relationReference?: string;
  releveNotes?: string;
  photoIdentite?: string;
  submittedAt: Date | string;
  status: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterGender, setFilterGender] = useState<string>("all");
  const [subscribers, setSubscribers] = useState<{ id: string; email: string; subscribedAt?: any; source?: string }[]>([]);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      const authStatus = localStorage.getItem("admin_authenticated");
      const loginTime = localStorage.getItem("admin_login_time");
      
      if (authStatus === "true" && loginTime) {
        // Check if login is not older than 24 hours
        const now = Date.now();
        const loginTimestamp = parseInt(loginTime);
        const hoursSinceLogin = (now - loginTimestamp) / (1000 * 60 * 60);
        
        if (hoursSinceLogin < 24) {
          setIsAuthenticated(true);
          fetchApplications();
          fetchSubscribers();
        } else {
          // Clear expired authentication
          localStorage.removeItem("admin_authenticated");
          localStorage.removeItem("admin_login_time");
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchApplications();
    fetchSubscribers();
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    localStorage.removeItem("admin_login_time");
    setIsAuthenticated(false);
    setApplications([]);
    setSelectedApplication(null);
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const applicationsRef = collection(db, "eslp_applications");
      const q = query(applicationsRef, orderBy("submittedAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const applicationsData: ApplicationData[] = [];
      querySnapshot.forEach((doc) => {
        applicationsData.push({
          id: doc.id,
          ...doc.data()
        } as ApplicationData);
      });
      
      setApplications(applicationsData);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const ref = collection(db, 'newsletter_subscribers');
      const q = query(ref, orderBy('subscribedAt', 'desc'));
      const snap = await getDocs(q);
      const data: { id: string; email: string; subscribedAt?: any; source?: string }[] = [];
      snap.forEach(doc => data.push({ id: doc.id, ...(doc.data() as any) }));
      setSubscribers(data);
    } catch (e) {
      console.error('Error fetching subscribers', e);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getAnalytics = () => {
    const totalApplications = applications.length;
    const genderStats = applications.reduce((acc, app) => {
      acc[app.sexe] = (acc[app.sexe] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const ageGroups = applications.reduce((acc, app) => {
      const age = calculateAge(app.dateNaissance);
      if (age >= 15 && age <= 16) acc["15-16"] = (acc["15-16"] || 0) + 1;
      else if (age >= 17 && age <= 18) acc["17-18"] = (acc["17-18"] || 0) + 1;
      else if (age >= 19) acc["19+"] = (acc["19+"] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const classStats = applications.reduce((acc, app) => {
      acc[app.classe] = (acc[app.classe] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sourceStats = applications.reduce((acc, app) => {
      acc[app.commentEntendu] = (acc[app.commentEntendu] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentApplications = applications.filter(app => {
      const submissionDate = app.submittedAt instanceof Date ? app.submittedAt : new Date(app.submittedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return submissionDate && submissionDate > weekAgo;
    }).length;

    return {
      totalApplications,
      genderStats,
      ageGroups,
      classStats,
      sourceStats,
      recentApplications
    };
  };

  const filteredApplications = applications.filter(app => {
    const statusMatch = filterStatus === "all" || app.status === filterStatus;
    const genderMatch = filterGender === "all" || app.sexe === filterGender;
    return statusMatch && genderMatch;
  });

  const analytics = getAnalytics();

  // Show authentication form if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className={styles.adminPage}>
        <div className="container">
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading applications...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.adminPage}>
        <div className="container">
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={fetchApplications} className={styles.retryBtn}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>ESLP Applications Admin</h1>
              <p className={styles.subtitle}>Manage and analyze ESLP 2025 applications</p>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className={styles.analyticsSection}>
          <h2 className={styles.sectionTitle}>Analytics Overview</h2>
          
          <div className="row g-4 mb-4">
            <div className="col-lg-3 col-md-6">
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Users size={24} />
                </div>
                <div className={styles.statContent}>
                  <h3>{analytics.totalApplications}</h3>
                  <p>Total Applications</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <TrendingUp size={24} />
                </div>
                <div className={styles.statContent}>
                  <h3>{analytics.recentApplications}</h3>
                  <p>This Week</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FileText size={24} />
                </div>
                <div className={styles.statContent}>
                  <h3>{analytics.genderStats.feminin || 0}</h3>
                  <p>Female Applicants</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-6">
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Calendar size={24} />
                </div>
                <div className={styles.statContent}>
                  <h3>{analytics.genderStats.masculin || 0}</h3>
                  <p>Male Applicants</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="row g-4">
            <div className="col-lg-6">
              <div className={styles.analyticsCard}>
                <h3>Age Distribution</h3>
                <div className={styles.chartContainer}>
                  {Object.entries(analytics.ageGroups).map(([age, count]) => (
                    <div key={age} className={styles.chartBar}>
                      <div className={styles.barLabel}>{age} years</div>
                      <div className={styles.bar}>
                        <div 
                          className={styles.barFill} 
                          style={{ width: `${(count / analytics.totalApplications) * 100}%` }}
                        ></div>
                      </div>
                      <div className={styles.barValue}>{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className={styles.analyticsCard}>
                <h3>Class Distribution</h3>
                <div className={styles.chartContainer}>
                  {Object.entries(analytics.classStats).map(([classe, count]) => (
                    <div key={classe} className={styles.chartBar}>
                      <div className={styles.barLabel}>{classe.toUpperCase()}</div>
                      <div className={styles.bar}>
                        <div 
                          className={styles.barFill} 
                          style={{ width: `${(count / analytics.totalApplications) * 100}%` }}
                        ></div>
                      </div>
                      <div className={styles.barValue}>{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className={styles.applicationsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Applications</h2>
            <div className={styles.filters}>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <select 
                value={filterGender} 
                onChange={(e) => setFilterGender(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Genders</option>
                <option value="feminin">Female</option>
                <option value="masculin">Male</option>
              </select>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Class</th>
                  <th>School</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.prenom} {app.nom}</td>
                    <td>{app.email}</td>
                    <td>{calculateAge(app.dateNaissance)}</td>
                    <td>{app.sexe === 'feminin' ? 'Female' : 'Male'}</td>
                    <td>{app.classe.toUpperCase()}</td>
                    <td>{app.etablissement}</td>
                    <td>{app.submittedAt?.toDate().toLocaleDateString()}</td>
                    <td>
                      <span className={`${styles.status} ${styles[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => setSelectedApplication(app)}
                        className={styles.viewBtn}
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Newsletter Subscribers */}
        <div className={styles.applicationsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Newsletter Subscribers</h2>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(s => (
                  <tr key={s.id}>
                    <td>{s.email}</td>
                    <td>{s.source || '-'}</td>
                    <td>{s.subscribedAt?.toDate ? s.subscribedAt.toDate().toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Application Details</h2>
                <button 
                  onClick={() => setSelectedApplication(null)}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <h4>Personal Information</h4>
                    <p><strong>Name:</strong> {selectedApplication.prenom} {selectedApplication.nom}</p>
                    <p><strong>Email:</strong> {selectedApplication.email}</p>
                    <p><strong>Phone:</strong> {selectedApplication.telephone}</p>
                    <p><strong>Age:</strong> {calculateAge(selectedApplication.dateNaissance)} years</p>
                    <p><strong>Gender:</strong> {selectedApplication.sexe === 'feminin' ? 'Female' : 'Male'}</p>
                    <p><strong>Address:</strong> {selectedApplication.adresse}</p>
                  </div>
                  
                  <div className="col-md-6">
                    <h4>Academic Information</h4>
                    <p><strong>School:</strong> {selectedApplication.etablissement}</p>
                    <p><strong>Class:</strong> {selectedApplication.classe.toUpperCase()}</p>
                    <p><strong>How they heard about us:</strong> {selectedApplication.commentEntendu}</p>
                    <p><strong>Submitted:</strong> {selectedApplication.submittedAt?.toDate().toLocaleString()}</p>
                  </div>
                  
                  <div className="col-12">
                    <h4>Essay Responses</h4>
                    <div className={styles.essaySection}>
                      <h5>Motivation (100 words max)</h5>
                      <p>{selectedApplication.motivation}</p>
                    </div>
                    
                    <div className={styles.essaySection}>
                      <h5>Extracurricular Activities (200 words max)</h5>
                      <p>{selectedApplication.activitesParascolaires}</p>
                    </div>
                    
                    <div className={styles.essaySection}>
                      <h5>Achievement/Challenge (100 words max)</h5>
                      <p>{selectedApplication.defiRealise}</p>
                    </div>
                    
                    <div className={styles.essaySection}>
                      <h5>Vision for Haiti (200 words max)</h5>
                      <p>{selectedApplication.futurHaiti}</p>
                    </div>
                  </div>
                  
                  <div className="col-12">
                    <h4>Technical Requirements</h4>
                    <p><strong>Computer:</strong> {selectedApplication.ordinateur}</p>
                    <p><strong>Internet:</strong> {selectedApplication.connexionInternet}</p>
                    <p><strong>Quiet Space:</strong> {selectedApplication.espaceCalme}</p>
                  </div>
                  
                  {selectedApplication.personneReference && (
                    <div className="col-12">
                      <h4>Reference</h4>
                      <p><strong>Name:</strong> {selectedApplication.personneReference}</p>
                      <p><strong>Relationship:</strong> {selectedApplication.relationReference}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
