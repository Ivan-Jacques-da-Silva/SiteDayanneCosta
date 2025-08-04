
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminFormularios.module.css';

const AdminFormularios = () => {
  const [formularios, setFormularios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');
  const [selectedForm, setSelectedForm] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadFormularios();
  }, [currentPage, filter]);

  const loadFormularios = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(filter && { type: filter })
      });

      const response = await fetch(`http://0.0.0.0:5000/api/admin/contacts?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFormularios(data.contacts);
        setTotalPages(data.pagination.pages);
      } else {
        // Mock data for development
        setFormularios([
          {
            id: 1,
            type: 'CONTACT',
            name: 'João Silva',
            email: 'joao@email.com',
            phone: '+1 (305) 123-4567',
            message: 'I am interested in learning more about luxury condos in Brickell. Could you please provide more information about available properties?',
            propertyId: null,
            property: null,
            createdAt: '2024-01-15T10:30:00Z',
            status: 'NEW'
          },
          {
            id: 2,
            type: 'PROPERTY_INQUIRY',
            name: 'Maria Santos',
            email: 'maria@email.com',
            phone: '+1 (305) 987-6543',
            message: 'I would like to schedule a viewing for this property. When would be a good time?',
            propertyId: 1,
            property: {
              title: 'Luxury Condo in Brickell',
              address: '2101 Brickell Ave, Unit 905'
            },
            createdAt: '2024-01-14T16:45:00Z',
            status: 'CONTACTED'
          },
          {
            id: 3,
            type: 'SELL_INQUIRY',
            name: 'Carlos Rodriguez',
            email: 'carlos@email.com',
            phone: '+1 (305) 555-0123',
            message: 'I am looking to sell my property in Coconut Grove. Can you help me with a market analysis?',
            propertyId: null,
            property: null,
            createdAt: '2024-01-13T09:15:00Z',
            status: 'COMPLETED'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading formularios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://0.0.0.0:5000/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      loadFormularios();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this form submission?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`http://0.0.0.0:5000/api/admin/contacts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        loadFormularios();
      } catch (error) {
        console.error('Error deleting form:', error);
      }
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
      case 'NEW': return '#ef4444';
      case 'CONTACTED': return '#f59e0b';
      case 'COMPLETED': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'CONTACT': return 'General Contact';
      case 'PROPERTY_INQUIRY': return 'Property Inquiry';
      case 'SELL_INQUIRY': return 'Sell Inquiry';
      case 'BUY_INQUIRY': return 'Buy Inquiry';
      default: return type;
    }
  };

  const openDetails = (form) => {
    setSelectedForm(form);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading forms...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.formulariosPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Form Submissions</h1>
            <p>View and manage all form submissions and inquiries</p>
          </div>
        </div>

        <div className={styles.filters}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Forms</option>
            <option value="CONTACT">General Contact</option>
            <option value="PROPERTY_INQUIRY">Property Inquiries</option>
            <option value="SELL_INQUIRY">Sell Inquiries</option>
            <option value="BUY_INQUIRY">Buy Inquiries</option>
          </select>
        </div>

        <div className={styles.formulariosTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Contact</div>
            <div className={styles.headerCell}>Type</div>
            <div className={styles.headerCell}>Property</div>
            <div className={styles.headerCell}>Status</div>
            <div className={styles.headerCell}>Date</div>
            <div className={styles.headerCell}>Actions</div>
          </div>

          {formularios.map((form) => (
            <div key={form.id} className={styles.tableRow}>
              <div className={styles.contactInfo}>
                <div className={styles.contactDetails}>
                  <span className={styles.contactName}>{form.name}</span>
                  <span className={styles.contactEmail}>{form.email}</span>
                  <span className={styles.contactPhone}>{form.phone}</span>
                </div>
              </div>

              <div className={styles.typeCell}>
                <span className={styles.typeTag}>
                  {getTypeLabel(form.type)}
                </span>
              </div>

              <div className={styles.propertyCell}>
                {form.property ? (
                  <div>
                    <span className={styles.propertyTitle}>{form.property.title}</span>
                    <span className={styles.propertyAddress}>{form.property.address}</span>
                  </div>
                ) : (
                  <span className={styles.noProperty}>-</span>
                )}
              </div>

              <div className={styles.statusCell}>
                <select
                  value={form.status}
                  onChange={(e) => handleUpdateStatus(form.id, e.target.value)}
                  className={styles.statusSelect}
                  style={{ backgroundColor: getStatusColor(form.status) }}
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              <div className={styles.dateCell}>
                {formatDate(form.createdAt)}
              </div>

              <div className={styles.actionsCell}>
                <button 
                  onClick={() => openDetails(form)}
                  className={styles.viewBtn}
                >
                  <i className="fas fa-eye"></i>
                </button>
                <button 
                  onClick={() => handleDelete(form.id)}
                  className={styles.deleteBtn}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {formularios.length === 0 && (
          <div className={styles.noResults}>
            <h3>No form submissions found</h3>
            <p>No one has submitted any forms yet.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.paginationBtn}
            >
              Previous
            </button>

            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={styles.paginationBtn}
            >
              Next
            </button>
          </div>
        )}

        {/* Details Modal */}
        {showDetails && selectedForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Form Details</h2>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowDetails(false)}
                >
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.detailSection}>
                  <h3>Contact Information</h3>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Name:</span>
                    <span>{selectedForm.name}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Email:</span>
                    <span>{selectedForm.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Phone:</span>
                    <span>{selectedForm.phone}</span>
                  </div>
                </div>

                <div className={styles.detailSection}>
                  <h3>Form Details</h3>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Type:</span>
                    <span>{getTypeLabel(selectedForm.type)}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Date:</span>
                    <span>{formatDate(selectedForm.createdAt)}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Status:</span>
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(selectedForm.status) }}
                    >
                      {selectedForm.status}
                    </span>
                  </div>
                </div>

                {selectedForm.property && (
                  <div className={styles.detailSection}>
                    <h3>Related Property</h3>
                    <div className={styles.detailRow}>
                      <span className={styles.label}>Title:</span>
                      <span>{selectedForm.property.title}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.label}>Address:</span>
                      <span>{selectedForm.property.address}</span>
                    </div>
                  </div>
                )}

                <div className={styles.detailSection}>
                  <h3>Message</h3>
                  <div className={styles.messageContent}>
                    {selectedForm.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminFormularios;
