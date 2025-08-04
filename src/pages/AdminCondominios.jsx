
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminCondominios.module.css';

const AdminCondominios = () => {
  const [condominios, setCondominios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCondominio, setEditingCondominio] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    estado: '',
    descricao: '',
    amenidades: '',
    status: 'ATIVO'
  });

  useEffect(() => {
    loadCondominios();
  }, []);

  const loadCondominios = async () => {
    try {
      // Mock data for now - replace with API call
      setCondominios([
        {
          id: 1,
          nome: 'Residencial Sunset',
          endereco: 'Rua das Flores, 123',
          cidade: 'Miami',
          estado: 'FL',
          descricao: 'Condomínio de luxo com vista para o mar',
          amenidades: 'Piscina, Academia, Salão de festas',
          status: 'ATIVO',
          totalUnidades: 45,
          unidadesDisponiveis: 12
        },
        {
          id: 2,
          nome: 'Torre Brickell',
          endereco: 'Brickell Avenue, 456',
          cidade: 'Miami',
          estado: 'FL',
          descricao: 'Apartamentos modernos no coração de Brickell',
          amenidades: 'Rooftop, Spa, Concierge',
          status: 'ATIVO',
          totalUnidades: 120,
          unidadesDisponiveis: 8
        }
      ]);
    } catch (error) {
      console.error('Error loading condominios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCondominio) {
        // Update existing
        console.log('Updating condominio:', formData);
      } else {
        // Create new
        console.log('Creating condominio:', formData);
      }
      
      setShowForm(false);
      setEditingCondominio(null);
      resetForm();
      loadCondominios();
    } catch (error) {
      console.error('Error saving condominio:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      endereco: '',
      cidade: '',
      estado: '',
      descricao: '',
      amenidades: '',
      status: 'ATIVO'
    });
  };

  const handleEdit = (condominio) => {
    setEditingCondominio(condominio);
    setFormData(condominio);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este condomínio?')) {
      try {
        console.log('Deleting condominio:', id);
        loadCondominios();
      } catch (error) {
        console.error('Error deleting condominio:', error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Carregando condomínios...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.condominiosPage}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Gerenciar Condomínios</h1>
            <p>Cadastre e gerencie os condomínios disponíveis</p>
          </div>
          <button 
            className={styles.addBtn}
            onClick={() => {
              resetForm();
              setEditingCondominio(null);
              setShowForm(true);
            }}
          >
            <span>+</span> Novo Condomínio
          </button>
        </div>

        {showForm && (
          <div className={styles.formModal}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2>{editingCondominio ? 'Editar Condomínio' : 'Novo Condomínio'}</h2>
                <button 
                  className={styles.closeBtn}
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Nome do Condomínio</label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Endereço</label>
                    <input
                      type="text"
                      value={formData.endereco}
                      onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Cidade</label>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Estado</label>
                    <input
                      type="text"
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="ATIVO">Ativo</option>
                      <option value="INATIVO">Inativo</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Descrição</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Amenidades</label>
                  <textarea
                    value={formData.amenidades}
                    onChange={(e) => setFormData({...formData, amenidades: e.target.value})}
                    rows="2"
                    placeholder="Piscina, Academia, Salão de festas..."
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={() => setShowForm(false)} className={styles.cancelBtn}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    {editingCondominio ? 'Atualizar' : 'Cadastrar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.condominiosList}>
          {condominios.map((condominio) => (
            <div key={condominio.id} className={styles.condominioCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3>{condominio.nome}</h3>
                  <p className={styles.endereco}>{condominio.endereco}, {condominio.cidade} - {condominio.estado}</p>
                </div>
                <div className={styles.cardActions}>
                  <span className={`${styles.status} ${styles[condominio.status.toLowerCase()]}`}>
                    {condominio.status}
                  </span>
                  <button onClick={() => handleEdit(condominio)} className={styles.editBtn}>
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(condominio.id)} className={styles.deleteBtn}>
                    🗑️
                  </button>
                </div>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.descricao}>{condominio.descricao}</p>
                <div className={styles.amenidades}>
                  <strong>Amenidades:</strong> {condominio.amenidades}
                </div>
                <div className={styles.unidades}>
                  <span className={styles.unidadeInfo}>
                    <strong>{condominio.unidadesDisponiveis}</strong> disponíveis de <strong>{condominio.totalUnidades}</strong> unidades
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCondominios;
