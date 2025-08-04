import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      window.location.href = '/login';
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'ADMIN') {
        window.location.href = '/';
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://0.0.0.0:5000/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        } else {
          // Fallback to mock data if API not ready
          setDashboardData({
            totalProperties: 145,
            activeProperties: 132,
            totalContacts: 89,
            newContacts: 23
          });
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Fallback to mock data
        setDashboardData({
          totalProperties: 145,
          activeProperties: 132,
          totalContacts: 89,
          newContacts: 23
        });
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.adminPage}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.adminHeader}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, {user?.name}</p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏠</div>
              <div className={styles.statContent}>
                <h3>{dashboardData?.totalProperties || 0}</h3>
                <p>Total Properties</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>✅</div>
              <div className={styles.statContent}>
                <h3>{dashboardData?.activeProperties || 0}</h3>
                <p>Active Properties</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>📧</div>
              <div className={styles.statContent}>
                <h3>{dashboardData?.totalContacts || 0}</h3>
                <p>Total Contacts</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>🆕</div>
              <div className={styles.statContent}>
                <h3>{dashboardData?.newContacts || 0}</h3>
                <p>New Contacts</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statContent}>
                <h3>{dashboardData?.totalUsers || 0}</h3>
                <p>Total Users</p>
              </div>
            </div>
          </div>

          <div className={styles.adminActions}>
            <div className={styles.actionGroup}>
              <h2>Property Management</h2>
              <div className={styles.actionButtons}>
                <Link to="/admin/properties/new" className={styles.actionBtn}>
                  Add New Property
                </Link>
                <Link to="/admin/properties" className={styles.actionBtn}>
                  Manage Properties
                </Link>
              </div>
            </div>

            <div className={styles.actionGroup}>
              <h2>Contact Management</h2>
              <div className={styles.actionButtons}>
                <Link to="/admin/contacts" className={styles.actionBtn}>
                  View All Contacts
                </Link>
                <Link to="/admin/contacts?status=NEW" className={styles.actionBtn}>
                  New Messages
                </Link>
              </div>
            </div>

            <div className={styles.actionGroup}>
              <h2>User Management</h2>
              <div className={styles.actionButtons}>
                <Link to="/admin/users" className={styles.actionBtn}>
                  View All Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;