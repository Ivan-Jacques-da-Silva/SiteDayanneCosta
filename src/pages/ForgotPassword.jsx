import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Aqui você implementaria a lógica de recuperação de senha
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
    setError('');
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className={styles.forgotPasswordPage}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.forgotPasswordWrapper}>
            <div className={styles.forgotPasswordCard}>
              {!isSubmitted ? (
                <>
                  <div className={styles.header}>
                    <h1 className={styles.title}>Forgot Password?</h1>
                    <p className={styles.subtitle}>
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        className={`${styles.input} ${error ? styles.inputError : ''}`}
                        placeholder="Enter your email"
                      />
                      {error && <span className={styles.errorText}>{error}</span>}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                      Send Reset Link
                    </button>
                  </form>

                  <div className={styles.backToLogin}>
                    <Link to="/login" className={styles.backLink}>
                      <i className="fas fa-arrow-left"></i>
                      Back to Sign In
                    </Link>
                  </div>
                </>
              ) : (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h1 className={styles.successTitle}>Check Your Email</h1>
                  <p className={styles.successText}>
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className={styles.successSubtext}>
                    Didn't receive the email? Check your spam folder or{' '}
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className={styles.resendLink}
                    >
                      try again
                    </button>
                  </p>
                  <Link to="/login" className={styles.backToLoginButton}>
                    Back to Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;