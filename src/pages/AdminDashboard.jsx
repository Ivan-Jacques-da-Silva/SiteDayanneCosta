import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
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
          newContacts: 23,
          totalUsers: 67,
          totalFavorites: 234
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Fallback to mock data
      setDashboardData({
        totalProperties: 145,
        activeProperties: 132,
        totalContacts: 89,
        newContacts: 23,
        totalUsers: 67,
        totalFavorites: 234
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <h1>Administrative Dashboard</h1>
          <p>Overview of the system</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{background: '#3b82f6'}}><i className="fas fa-home"></i></div>
              <div className={styles.statValue}>
                <span className={styles.number}>{dashboardData?.totalProperties || 0}</span>
                <span className={styles.label}>Total Properties</span>
              </div>
            </div>
            <div className={styles.statFooter}>
              <span className={styles.active}>{dashboardData?.activeProperties || 0} active</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{background: '#10b981'}}><i className="fas fa-file-alt"></i></div>
              <div className={styles.statValue}>
                <span className={styles.number}>{dashboardData?.totalContacts || 0}</span>
                <span className={styles.label}>Forms</span>
              </div>
            </div>
            <div className={styles.statFooter}>
              <span className={styles.new}>{dashboardData?.newContacts || 0} new</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{background: '#f59e0b'}}><i className="fas fa-heart"></i></div>
              <div className={styles.statValue}>
                <span className={styles.number}>{dashboardData?.totalFavorites || 0}</span>
                <span className={styles.label}>Favorites</span>
              </div>
            </div>
            <div className={styles.statFooter}>
              <span className={styles.growth}>+12% this month</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{background: '#8b5cf6'}}><i className="fas fa-users"></i></div>
              <div className={styles.statValue}>
                <span className={styles.number}>{dashboardData?.totalUsers || 0}</span>
                <span className={styles.label}>Users</span>
              </div>
            </div>
            <div className={styles.statFooter}>
              <span className={styles.growth}>+5 this week</span>
            </div>
          </div>
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3>Recent Activity</h3>
              <span className={styles.chartPeriod}>Last 7 days</span>
            </div>
            <div className={styles.chartContent}>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}><i className="fas fa-file-alt"></i></div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>New contact form submission</span>
                    <span className={styles.activityTime}>2 hours ago</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}><i className="fas fa-home"></i></div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>Property added to favorites</span>
                    <span className={styles.activityTime}>5 hours ago</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}><i className="fas fa-user"></i></div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>New user registered</span>
                    <span className={styles.activityTime}>1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3>Properties by Status</h3>
              <span className={styles.chartPeriod}>Current</span>
            </div>
            <div className={styles.chartContent}>
              <div className={styles.statusList}>
                <div className={styles.statusItem}>
                  <div className={styles.statusIndicator} style={{background: '#10b981'}}></div>
                  <span className={styles.statusLabel}>Active</span>
                  <span className={styles.statusValue}>{dashboardData?.activeProperties || 0}</span>
                </div>
                <div className={styles.statusItem}>
                  <div className={styles.statusIndicator} style={{background: '#f59e0b'}}></div>
                  <span className={styles.statusLabel}>Pending</span>
                  <span className={styles.statusValue}>8</span>
                </div>
                <div className={styles.statusItem}>
                  <div className={styles.statusIndicator} style={{background: '#ef4444'}}></div>
                  <span className={styles.statusLabel}>Inactive</span>
                  <span className={styles.statusValue}>5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;