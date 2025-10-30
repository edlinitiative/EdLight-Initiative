"use client";
import { useState } from "react";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import styles from "./AdminAuth.module.css";

interface AdminAuthProps {
  onLogin: () => void;
}

export default function AdminAuth({ onLogin }: AdminAuthProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials
  const ADMIN_USERNAME = "edlight";
  const ADMIN_PASSWORD = "%Edlight2025!%";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Store authentication state in localStorage
      localStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("admin_login_time", Date.now().toString());
      onLogin();
    } else {
      setError("Invalid username or password");
    }
    
    setIsLoading(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={styles.logoContainer}>
            <Lock size={32} className={styles.logoIcon} />
          </div>
          <h1 className={styles.authTitle}>Admin Access</h1>
          <p className={styles.authSubtitle}>Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>
              Username
            </label>
            <div className={styles.inputContainer}>
              <User size={20} className={styles.inputIcon} />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                placeholder="Enter username"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <div className={styles.inputContainer}>
              <Lock size={20} className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePassword}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading || !username || !password}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p className={styles.footerText}>
            EdLight Initiative Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}
