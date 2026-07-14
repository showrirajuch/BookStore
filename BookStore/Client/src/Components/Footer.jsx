import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#000000',
      color: '#a3a3a3',
      padding: '4rem 2rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
      boxSizing: 'border-box',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ 
          color: '#ffffff', 
          marginBottom: '0.75rem', 
          fontWeight: 800, 
          fontSize: '1.4rem', 
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          BOOKSTORE
        </h3>
        <p style={{ 
          fontSize: '0.9rem', 
          color: '#737373', 
          marginBottom: '2rem', 
          maxWidth: '550px', 
          margin: '0 auto 2rem auto',
          lineHeight: '1.5'
        }}>
          A clean, high-contrast digital sanctuary connecting bookstore operators, catalog maintainers, and readers.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <a href="#" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'opacity 0.2s' }}>About Us</a>
          <a href="#" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'opacity 0.2s' }}>Security</a>
          <a href="#" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'opacity 0.2s' }}>Terms</a>
          <a href="#" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'opacity 0.2s' }}>Support</a>
        </div>
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
          paddingTop: '2rem', 
          fontSize: '0.8rem', 
          color: '#404040',
          letterSpacing: '0.05em'
        }}>
          &copy; {new Date().getFullYear()} BOOKSTORE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
