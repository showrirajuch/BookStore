import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Asignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/home');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection refused. Is the server running?');
    }
  };

  return (
    <div style={{
      background: '#000000',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      <form onSubmit={handleSignup} style={{
        background: '#000000',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '3rem 2.5rem',
        borderRadius: '0px',
        width: '100%',
        maxWidth: '420px',
        color: '#ffffff',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ 
          color: '#ffffff', 
          marginBottom: '2rem', 
          textAlign: 'center', 
          fontWeight: 900, 
          fontSize: '1.6rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Admin Register
        </h2>

        {error && (
          <div style={{ 
            color: '#f87171', 
            background: 'rgba(239, 68, 68, 0.08)', 
            border: '1px solid rgba(239, 68, 68, 0.2)',
            padding: '0.75rem 1rem', 
            borderRadius: '0px', 
            marginBottom: '1.5rem', 
            fontSize: '0.85rem',
            textAlign: 'left'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Full Name
          </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: '#000000',
              color: '#ffffff',
              outline: 'none',
              boxSizing: 'border-box',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Admin Email
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: '#000000',
              color: '#ffffff',
              outline: 'none',
              boxSizing: 'border-box',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Password
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: '#000000',
              color: '#ffffff',
              outline: 'none',
              boxSizing: 'border-box',
              fontSize: '1rem'
            }}
          />
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '0.85rem',
          borderRadius: '0px',
          background: '#ffffff',
          color: '#000000',
          border: '1px solid #ffffff',
          cursor: 'pointer',
          fontWeight: '800',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#000000';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.color = '#000000';
        }}
        >
          Create Admin
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.75rem', marginBottom: 0, color: '#737373', fontSize: '0.85rem' }}>
          Already have credentials? <span onClick={() => navigate('/admin/login')} style={{ color: '#ffffff', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline' }}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default Asignup;
