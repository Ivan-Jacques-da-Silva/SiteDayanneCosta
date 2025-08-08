import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { buildApiUrl } from '../config/api';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(buildApiUrl('/api/users/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Save user data and token to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect based on user role
      if (data.user.role === 'ADMIN') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('HTTP error! status: 401')) {
        setErrors({ general: 'Invalid email or password' });
      } else if (error.message.includes('HTTP error! status: 500')) {
        setErrors({ general: 'Server error. Please try again later.' });
      } else {
        setErrors({ general: 'Connection error. Please try again.' });
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.loginWrapper}>
            <div className={styles.loginCard}>
              <div className={styles.loginHeader}>
                <h1 className={styles.title}>Welcome Back</h1>
                <p className={styles.subtitle}>Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.loginForm}>
                {errors.general && (
                  <div className={styles.errorMessage}>
                    {errors.general}
                  </div>
                )}
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className={styles.formOptions}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>Remember me</span>
                  </label>
                  
                  <Link to="/forgot-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Sign In
                </button>
              </form>

              {/* Social Login - For future use */}
              {/* 
              <div className={styles.divider}>
                <span className={styles.dividerText}>or</span>
              </div>

              <div className={styles.socialLogin}>
                <button className={styles.socialButton}>
                  <i className="fab fa-google"></i>
                  Continue with Google
                </button>
                <button className={styles.socialButton}>
                  <i className="fab fa-facebook-f"></i>
                  Continue with Facebook
                </button>
              </div>
              */}

              <div className={styles.signupPrompt}>
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className={styles.signupLink}>
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;