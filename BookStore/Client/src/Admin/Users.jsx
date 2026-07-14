import React, { useState, useEffect } from 'react';
import Anavbar from './Anavbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('http://localhost:8000/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          throw new Error('Users fetch error');
        }
      } catch (err) {
        console.warn('Failed to load platform users. Injecting demo data.');
        setUsers([
          { _id: '1', name: 'Sherlock Holmes', email: 'sherlock@bakerstreet.com', preferences: { favoriteGenres: ['Mystery', 'Crime'] } },
          { _id: '2', name: 'Elizabeth Bennet', email: 'elizabeth@pemberley.org', preferences: { favoriteGenres: ['Fiction', 'Romance'] } },
          { _id: '3', name: 'Bilbo Baggins', email: 'bilbo@shire.me', preferences: { favoriteGenres: ['Fantasy', 'Adventure'] } }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
          Registered Platform Readers
        </h1>
        
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Syncing user registries...</div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.01)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>READER NAME</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>EMAIL ADDRESS</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>FAVORITE GENRES</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>{user.name}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#38bdf8' }}>{user.email}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#94a3b8' }}>
                      {user.preferences && user.preferences.favoriteGenres && user.preferences.favoriteGenres.length > 0 ? (
                        user.preferences.favoriteGenres.map((genre, index) => (
                          <span key={index} style={{
                            background: 'rgba(56, 189, 248, 0.1)',
                            color: '#38bdf8',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            marginRight: '0.5rem'
                          }}>
                            {genre}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: '#475569', fontStyle: 'italic' }}>None specified</span>
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

export default Users;
