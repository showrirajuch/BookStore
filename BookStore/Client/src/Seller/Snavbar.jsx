import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Snavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('sellerToken');
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#0f172a',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#f8fafc'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#818cf8', fontWeight: 800, letterSpacing: '0.05em' }}>
        BOOKSTORE SELLER
      </h2>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/seller/home" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Dashboard</Link>
        <Link to="/seller/products" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>My Books</Link>
        <Link to="/seller/add-book" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Add Book</Link>
        <Link to="/seller/orders" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Orders</Link>
        <button 
          onClick={handleLogout}
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            padding: '0.5rem 1.2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
            e.currentTarget.style.color = '#f87171';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Snavbar;
