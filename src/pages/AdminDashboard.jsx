
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
        <div className={styles.loading}>Carregando dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <h1>Dashboard</h1>
          <p>Visão geral do sistema</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{background: '#3b82f6'}}>🏠</div>
              <div className={styles.statValue}>
                <span className={styles.number}>{dashboardData?.totalProperties || 0}</span>
                <span className={styles.label}>Total de Imóveis</span>
              </div>
            </div>
            <div className={styles.statFooter}>
              <span className={styles.active}>{dashboardData?.activeProperties || 0} ativos</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{background: '#10b981'}}>📝</div>
              <div className={styles.statValue}>
                <span className={styles.number}>{dashboardData?.totalContacts || 0}</span>
                <span className={styles.label}>Formulários</span>
              </div>
            </div>
            <div className={styles.statFooter}>
              <span className={styles.new}>{dashboardData?.newContacts || 0} novos</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{background: '#f59e0b'}}>❤️</div>
              <div className={styles.statValue}>
                <span className={styles.number}>{dashboardData?.totalFavorites || 0}</span>
                <span className={styles.label}>Favoritos</span>
              </div>
            </div>
            <div className={styles.statFooter}>
              <span className={styles.growth}>+12% este mês</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{background: '#8b5cf6'}}>👥</div>
              <div className={styles.statValue}>
                <span className={styles.number}>{dashboardData?.totalUsers || 0}</span>
                <span className={styles.label}>Usuários</span>
              </div>
            </div>
            <div className={styles.statFooter}>
              <span className={styles.growth}>+5 esta semana</span>
            </div>
          </div>
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3>Atividade Recente</h3>
              <span className={styles.chartPeriod}>Últimos 7 dias</span>
            </div>
            <div className={styles.chartContent}>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>📝</div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>Novo formulário de contato</span>
                    <span className={styles.activityTime}>2 horas atrás</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>🏠</div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>Imóvel adicionado aos favoritos</span>
                    <span className={styles.activityTime}>5 horas atrás</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <div className={styles.activityIcon}>👤</div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityText}>Novo usuário cadastrado</span>
                    <span className={styles.activityTime}>1 dia atrás</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h3>Imóveis por Status</h3>
              <span className={styles.chartPeriod}>Atual</span>
            </div>
            <div className={styles.chartContent}>
              <div className={styles.statusList}>
                <div className={styles.statusItem}>
                  <div className={styles.statusIndicator} style={{background: '#10b981'}}></div>
                  <span className={styles.statusLabel}>Ativos</span>
                  <span className={styles.statusValue}>{dashboardData?.activeProperties || 0}</span>
                </div>
                <div className={styles.statusItem}>
                  <div className={styles.statusIndicator} style={{background: '#f59e0b'}}></div>
                  <span className={styles.statusLabel}>Pendentes</span>
                  <span className={styles.statusValue}>8</span>
                </div>
                <div className={styles.statusItem}>
                  <div className={styles.statusIndicator} style={{background: '#ef4444'}}></div>
                  <span className={styles.statusLabel}>Inativos</span>
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
