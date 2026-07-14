import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ssignup = () => {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/seller/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, ownerName, email, password, phone, address })
      });
      const data = await response.json();
      if (response.ok) {
        setInfo(data.message || 'Registration successful. Waiting for admin approval.');
        setError('');
      } else {
        setError(data.message || 'Registration failed');
        setInfo('');
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
        maxWidth: '500px',
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
          Merchant Signup
        </h2>
        
        {error && (
          <div style={{ color: '#f87171', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem 1rem', borderRadius: '0px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{error}</div>
        )}
        {info && (
          <div style={{ color: '#34d399', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.75rem 1rem', borderRadius: '0px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{info}</div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Business Name</label>
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.2)', background: '#000000', color: '#fff', outline: 'none', boxSizing: 'border-box', fontSize: '1rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Owner Name</label>
            <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.2)', background: '#000000', color: '#fff', outline: 'none', boxSizing: 'border-box', fontSize: '1rem' }} />
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Contact Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.2)', background: '#000000', color: '#fff', outline: 'none', boxSizing: 'border-box', fontSize: '1rem' }} />
        </div>

        <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Store Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.2)', background: '#000000', color: '#fff', outline: 'none', boxSizing: 'border-box', fontSize: '1rem' }} />
        </div>

        <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Warehouse Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.2)', background: '#000000', color: '#fff', outline: 'none', boxSizing: 'border-box', fontSize: '1rem' }} />
        </div>

        <div style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a3a3a3', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Access Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.2)', background: '#000000', color: '#fff', outline: 'none', boxSizing: 'border-box', fontSize: '1rem' }} />
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
          Submit Registry
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.75rem', marginBottom: 0, color: '#737373', fontSize: '0.85rem' }}>
          Already registered? <span onClick={() => navigate('/seller/login')} style={{ color: '#ffffff', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline' }}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default Ssignup;
