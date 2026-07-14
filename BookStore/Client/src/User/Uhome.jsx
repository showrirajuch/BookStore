import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Uhome = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Reader';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const categories = [
    { name: 'Fiction', icon: '📚', color: '#38bdf8' },
    { name: 'Science', icon: '🔬', color: '#60a5fa' },
    { name: 'Fantasy', icon: '🧙‍♂️', color: '#818cf8' },
    { name: 'Romance', icon: '💖', color: '#f43f5e' },
    { name: 'History', icon: '🏛️', color: '#fbbf24' }
  ];

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      {/* User Navigation bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: '#0f172a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.05em', cursor: 'pointer' }} onClick={() => navigate('/user/home')}>
          BOOKSTORE
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/user/home" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Home</Link>
          <Link to="/user/products" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Browse</Link>
          <Link to="/user/orders" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>My Orders</Link>
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

      {/* Main Body */}
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          background: 'linear-gradient(to right, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.08))',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '24px',
          padding: '3.5rem 3rem',
          textAlign: 'left',
          marginBottom: '3rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{ margin: 0, fontSize: '2.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Hello, {userName}!
          </h1>
          <p style={{ margin: '1rem 0 0 0', color: '#94a3b8', fontSize: '1.2rem', maxWidth: '700px', lineHeight: 1.6 }}>
            Welcome to your customized reader portal. Browse the book marketplace, manage your favorite reading lists, publish reviews, and monitor your orders.
          </p>
        </div>

        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>Filter Books by Genre</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/user/products?genre=${cat.name}`)}
                style={{
                  flex: '1 1 180px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.boxShadow = `0 10px 20px -5px ${cat.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.icon}</div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uhome;
