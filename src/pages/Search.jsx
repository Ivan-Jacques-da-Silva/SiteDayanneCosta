
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Search.module.css';

const Search = () => {
  return (
    <div className="ip ip-theme-compass">
      <Header />
      
      <main className={styles.mainContainer}>
        <section className={styles.maintenanceSection}>
          <div className={styles.contentWrapper}>
            <div className={styles.maintenanceContent}>
              <div className={styles.iconContainer}>
                <div className={styles.maintenanceIcon}>🔧</div>
              </div>
              
              <h1 className={styles.maintenanceTitle}>
                Em Manutenção
              </h1>
              
              <p className={styles.maintenanceText}>
                Nossa funcionalidade de busca está temporariamente em manutenção. 
                Estamos trabalhando para melhorar sua experiência.
              </p>
              
              <p className={styles.maintenanceSubtext}>
                Por favor, tente novamente em breve ou entre em contato conosco 
                para assistência imediata.
              </p>
              
              <div className={styles.contactInfo}>
                <p>
                  <strong>Telefone:</strong> 
                  <a href="tel:+16465983588" className={styles.contactLink}>
                    +1 (646) 598-3588
                  </a>
                </p>
                <p>
                  <strong>Email:</strong> 
                  <a href="mailto:dayannecosta@compass.com" className={styles.contactLink}>
                    dayannecosta@compass.com
                  </a>
                </p>
              </div>
              
              <div className={styles.buttonContainer}>
                <a href="/" className={styles.backButton}>
                  Voltar ao Início
                </a>
                <a href="/contact" className={styles.contactButton}>
                  Entre em Contato
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
