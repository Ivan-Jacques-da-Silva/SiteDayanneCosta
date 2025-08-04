
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './AdminContacts.module.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // Check if user is admin
    const userData = localStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'ADMIN') {
      window.location.href = '/';
      return;
    }

    fetchContacts();
  }, [currentPage, statusFilter]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/api/admin/contacts?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/contacts/${contactId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh contacts list
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'NEW': return '#e74c3c';
      case 'CONTACTED': return '#f39c12';
      case 'SCHEDULED': return '#3498db';
      case 'COMPLETED': return '#27ae60';
      case 'CLOSED': return '#95a5a6';
      default: return '#333';
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading contacts...</div>;
  }

  return (
    <div className={styles.adminPage}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <h1>Contact Management</h1>
            <Link to="/admin" className={styles.backBtn}>
              ← Back to Dashboard
            </Link>
          </div>

          <div className={styles.filters}>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className={styles.contactsTable}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className={styles.contactName}>
                      {contact.name}
                      {contact.message && (
                        <div className={styles.messagePreview}>
                          {contact.message.substring(0, 50)}...
                        </div>
                      )}
                    </td>
                    <td>{contact.email}</td>
                    <td>{contact.phone || 'N/A'}</td>
                    <td>
                      <span className={styles.typeTag}>
                        {contact.type}
                      </span>
                    </td>
                    <td>
                      <span 
                        className={styles.statusTag}
                        style={{ backgroundColor: getStatusColor(contact.status) }}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td>{formatDate(contact.createdAt)}</td>
                    <td>
                      <select
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        className={styles.statusSelect}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={styles.paginationBtn}
              >
                Previous
              </button>
              
              <span className={styles.pageInfo}>
                Page {currentPage} of {pagination.pages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                disabled={currentPage === pagination.pages}
                className={styles.paginationBtn}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminContacts;
