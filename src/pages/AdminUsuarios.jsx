import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { buildApiUrl } from '../config/api';
import styles from './AdminUsuarios.module.css';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CLIENT'
  });

  useEffect(() => {
    loadUsuarios();
  }, [currentPage, filter]);

  const loadUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(filter && { role: filter })
      });

      const response = await fetch(buildApiUrl(`/api/admin/users?${params}`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsuarios(data.users);
        setTotalPages(data.pagination.pages);
      } else {
        console.error('Failed to load users:', response.status, response.statusText);
        setUsuarios([]);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      if (editingUser) {
        // Update existing user
        const response = await fetch(buildApiUrl(`/api/admin/users/${editingUser.id}`), {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        // Create new user
        const response = await fetch(buildApiUrl('/api/users/register'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }

      setShowForm(false);
      setEditingUser(null);
      resetForm();
      loadUsuarios();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'CLIENT'
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    });
    setShowForm(true);
  };

  const [deleteUserId, setDeleteUserId] = useState(null);

  const handleDelete = async (id) => {
    setDeleteUserId(id);
  };

  const confirmDeleteUser = async () => {
    const id = deleteUserId;
    setDeleteUserId(null);
    
    try {
      const token = localStorage.getItem('token');
      await fetch(buildApiUrl(`/api/admin/users/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      loadUsuarios();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return '#ef4444';
      case 'AGENT': return '#3b82f6';
      case 'CLIENT': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'ADMIN': return 'Administrator';
      case 'AGENT': return 'Broker';
      case 'CLIENT': return 'Client';
      default: return role;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading users...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.usuariosPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Manage Users</h1>
            <p>View and manage all system users</p>
          </div>
          <button 
            className={styles.addBtn}
            onClick={() => {
              resetForm();
              setEditingUser(null);
              setShowForm(true);
            }}
          >
            <span>+</span> Add New User
          </button>
        </div>

        <div className={styles.filters}>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">All Users</option>
            <option value="CLIENT">Clients</option>
            <option value="AGENT">Brokers</option>
            <option value="ADMIN">Administrators</option>
          </select>
        </div>

        {showForm && (
          <div className={styles.formModal}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2>{editingUser ? 'Edit User' : 'New User'}</h2>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Password {editingUser && '(leave blank to keep current)'}</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required={!editingUser}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="CLIENT">Client</option>
                    <option value="AGENT">Broker</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={() => setShowForm(false)} className={styles.cancelBtn}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    {editingUser ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.usuariosTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>User</div>
            <div className={styles.headerCell}>Role</div>
            <div className={styles.headerCell}>Statistics</div>
            <div className={styles.headerCell}>Registration Date</div>
            <div className={styles.headerCell}>Actions</div>
          </div>

          {usuarios.map((usuario) => (
            <div key={usuario.id} className={styles.tableRow}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {usuario.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.userName}>{usuario.name}</span>
                  <span className={styles.userEmail}>{usuario.email}</span>
                </div>
              </div>

              <div className={styles.roleCell}>
                <span 
                  className={styles.roleTag}
                  style={{ backgroundColor: getRoleColor(usuario.role) }}
                >
                  {getRoleLabel(usuario.role)}
                </span>
              </div>

              <div className={styles.statsCell}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{usuario._count?.properties || 0}</span>
                  <span className={styles.statLabel}>Properties</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{usuario._count?.favorites || 0}</span>
                  <span className={styles.statLabel}>Favorites</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{usuario._count?.contacts || 0}</span>
                  <span className={styles.statLabel}>Contacts</span>
                </div>
              </div>

              <div className={styles.dateCell}>
                {formatDate(usuario.createdAt)}
              </div>

              <div className={styles.actionsCell}>
                <button onClick={() => handleEdit(usuario)} className={styles.editBtn}>
                  <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => handleDelete(usuario.id)} className={styles.deleteBtn}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

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

        {/* Delete User Confirmation Modal */}
        {deleteUserId && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <h5 className="modal-title">
                    <i className="fas fa-exclamation-triangle text-danger me-2"></i>
                    Confirmar Exclusão
                  </h5>
                </div>
                <div className="modal-body">
                  <p className="mb-0">Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.</p>
                </div>
                <div className="modal-footer border-0">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setDeleteUserId(null)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={confirmDeleteUser}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsuarios;