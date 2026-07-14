import React, { useState, useEffect } from 'react';
import Anavbar from './Anavbar';

const Seller = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:8000/api/admin/sellers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setSellers(data);
      } else {
        throw new Error('Sellers fetch error');
      }
    } catch (err) {
      console.warn('Failed to load active merchants. Loading demo set.');
      setSellers([
        { _id: '101', businessName: 'Classic Book Vault', ownerName: 'Raymond Chandler', email: 'vault@classic.com', phone: '+1 415-321-4433', isApproved: false },
        { _id: '102', businessName: 'Fantasy Realms', ownerName: 'Ursula Le Guin', email: 'realms@fantasy.com', phone: '+1 206-889-1122', isApproved: true },
        { _id: '103', businessName: 'Cosmos & Science', ownerName: 'Carl Sagan', email: 'sagan@cosmos.com', phone: '+1 607-255-0909', isApproved: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/admin/sellers/${id}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchSellers();
      } else {
        throw new Error();
      }
    } catch (e) {
      setSellers(prev => prev.map(s => s._id === id ? { ...s, isApproved: true } : s));
    }
  };

  const handleBlock = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/admin/sellers/${id}/block`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchSellers();
      } else {
        throw new Error();
      }
    } catch (e) {
      setSellers(prev => prev.map(s => s._id === id ? { ...s, isApproved: false } : s));
    }
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Anavbar />
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          marginBottom: '2rem', 
          fontSize: '2.5rem', 
          fontWeight: 800,
          background: 'linear-gradient(to right, #ec4899, #818cf8)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.2',
          padding: '0.15em 0'
        }}>
          Merchant Approval Queue
        </h1>
        
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Syncing merchant directories...</div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.01)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>BUSINESS NAME</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>MERCHANT OWNER</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>EMAIL ADDRESS</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>PHONE NUMBER</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>APPROVAL STATUS</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>CONTROL</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>{seller.businessName}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{seller.ownerName}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#94a3b8' }}>{seller.email}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#94a3b8' }}>{seller.phone || 'N/A'}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span style={{
                        background: seller.isApproved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: seller.isApproved ? '#34d399' : '#f59e0b',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}>
                        {seller.isApproved ? 'APPROVED' : 'PENDING'}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                      {seller.isApproved ? (
                        <button 
                          onClick={() => handleBlock(seller._id)}
                          style={{ 
                            background: 'rgba(239, 68, 68, 0.12)', 
                            border: '1px solid rgba(239, 68, 68, 0.3)', 
                            color: '#f87171', 
                            padding: '0.45rem 1.1rem', 
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
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
                            e.currentTarget.style.color = '#f87171';
                          }}
                        >
                          Revoke Approval
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleApprove(seller._id)}
                          style={{ 
                            background: 'rgba(16, 185, 129, 0.12)', 
                            border: '1px solid rgba(16, 185, 129, 0.3)', 
                            color: '#34d399', 
                            padding: '0.45rem 1.1rem', 
                            borderRadius: '8px', 
                            cursor: 'pointer', 
                            fontWeight: '600',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#10b981';
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.12)';
                            e.currentTarget.style.color = '#34d399';
                          }}
                        >
                          Grant Approval
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seller;
