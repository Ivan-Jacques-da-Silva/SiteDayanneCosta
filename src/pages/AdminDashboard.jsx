
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminDashboard.module.css';
import { buildApiUrl } from '../config/api';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    loadRecentActivity();
  }, []); 

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/dashboard'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        console.error('Failed to load dashboard data:', response.status, response.statusText);
        setDashboardData(null);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl('/api/admin/recent-activity?limit=5'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRecentActivity(data.activities || []);
      } else {
        console.error('Failed to load recent activity:', response.status);
        setRecentActivity([]);
      }
    } catch (error) {
      console.error('Error loading recent activity:', error);
      setRecentActivity([]);
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
              <span className={styles.growth}>Total saved</span>
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
              <span className={styles.growth}>Registered users</span>
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
                {recentActivity.length > 0 ? (
                  recentActivity.map(activity => (
                    <div key={activity.id} className={styles.activityItem}>
                      <div className={styles.activityIcon}><i className={activity.icon}></i></div>
                      <div className={styles.activityContent}>
                        <span className={styles.activityText}>{activity.text}</span>
                        <span className={styles.activityTime}>
                          {new Date(activity.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.activityItem}>
                    <div className={styles.activityIcon}><i className="fas fa-info-circle"></i></div>
                    <div className={styles.activityContent}>
                      <span className={styles.activityText}>No recent activity</span>
                      <span className={styles.activityTime}>Start using the system to see activities here</span>
                    </div>
                  </div>
                )}
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
                  <span className={styles.statusLabel}>Others</span>
                  <span className={styles.statusValue}>{(dashboardData?.totalProperties || 0) - (dashboardData?.activeProperties || 0)}</span>
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
