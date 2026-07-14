import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Universal Minimalist Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 3rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: '#000000',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '1.25rem',
          fontWeight: 900,
          letterSpacing: '0.15em',
          color: '#ffffff',
          textTransform: 'uppercase'
        }}>
          BOOKSTORE
        </h2>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#gateways" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a3a3a3'}>Gateways</a>
          <a href="#" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a3a3a3'}>Catalog</a>
          <a href="#" style={{ color: '#a3a3a3', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = '#a3a3a3'}>About</a>
        </div>
      </nav>

      {/* Main Landing Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5rem 2rem',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: 900,
          marginBottom: '1rem',
          color: '#ffffff',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          lineHeight: '1.05',
          padding: '0.1em 0'
        }}>
          Unified Book System
        </h1>
        <p style={{
          fontSize: '1.15rem',
          color: '#737373',
          maxWidth: '600px',
          marginBottom: '5rem',
          lineHeight: '1.6',
          letterSpacing: '0.02em',
          fontWeight: 400
        }}>
          Explore catalogs, manage stock lists, and run store audits through our stark monochrome interface.
        </p>

        {/* Portal Cards Grid */}
        <div id="gateways" style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '2.5rem',
          width: '100%',
          maxWidth: '1100px',
          paddingBottom: '3rem'
        }}>
          {/* User Card */}
          <div 
            onClick={() => navigate('/user/login')}
            style={{
              flex: '1 1 300px',
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '3rem 2.5rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              color: '#ffffff',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.05)';
              e.currentTarget.querySelector('p').style.color = '#404040';
              e.currentTarget.querySelector('.svg-icon').style.stroke = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
              e.currentTarget.querySelector('p').style.color = '#737373';
              e.currentTarget.querySelector('.svg-icon').style.stroke = '#ffffff';
            }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s' }}>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Reader Space
            </h2>
            <p style={{ color: '#737373', fontSize: '0.85rem', lineHeight: 1.6, transition: 'color 0.4s', textAlign: 'center', margin: 0 }}>
              Browse the book collections, check real-time stock availability, read review reports, and buy books online.
            </p>
          </div>

          {/* Seller Card */}
          <div 
            onClick={() => navigate('/seller/login')}
            style={{
              flex: '1 1 300px',
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '3rem 2.5rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              color: '#ffffff',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.05)';
              e.currentTarget.querySelector('p').style.color = '#404040';
              e.currentTarget.querySelector('.svg-icon').style.stroke = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
              e.currentTarget.querySelector('p').style.color = '#737373';
              e.currentTarget.querySelector('.svg-icon').style.stroke = '#ffffff';
            }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s' }}>
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Merchant Space
            </h2>
            <p style={{ color: '#737373', fontSize: '0.85rem', lineHeight: 1.6, transition: 'color 0.4s', textAlign: 'center', margin: 0 }}>
              Scaffold warehouse product listings, edit inventory records, review store metrics, and coordinate orders.
            </p>
          </div>

          {/* Admin Card */}
          <div 
            onClick={() => navigate('/admin/login')}
            style={{
              flex: '1 1 300px',
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '3rem 2.5rem',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              color: '#ffffff',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.05)';
              e.currentTarget.querySelector('p').style.color = '#404040';
              e.currentTarget.querySelector('.svg-icon').style.stroke = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
              e.currentTarget.querySelector('p').style.color = '#737373';
              e.currentTarget.querySelector('.svg-icon').style.stroke = '#ffffff';
            }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s' }}>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Control Space
            </h2>
            <p style={{ color: '#737373', fontSize: '0.85rem', lineHeight: 1.6, transition: 'color 0.4s', textAlign: 'center', margin: 0 }}>
              Verify merchant requests, audit general user listings, analyze turnover data, and manage account items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
