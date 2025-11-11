import React from 'react';

/**
 * Composant Footer affiché en bas de toutes les pages.
 * Affiche les informations de copyright et les crédits du projet.
 */
const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: '#ffffff',
      padding: '2rem 1rem',
      marginTop: 'auto',
      width: '100%',
      textAlign: 'center',
      borderTop: '3px solid #34495e',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
    }}>
      <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>
        © 2025 – Site réalisé par Pablo Revéret et Paolo Bracq dans le cadre d'un projet à Polytech Paris-Saclay
      </p>
    </footer>
  );
};

export default Footer;

