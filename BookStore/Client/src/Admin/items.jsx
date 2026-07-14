import React, { useState, useEffect } from 'react';
import Anavbar from './Anavbar';

const Items = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/books');
        const data = await response.json();
        if (response.ok) {
          setBooks(data);
        } else {
          throw new Error('Books fetch error');
        }
      } catch (err) {
        console.warn('Failed to load database catalog. Loading mock records.');
        setBooks([
          { _id: '1', title: 'The Great Gatsby', authors: ['F. Scott Fitzgerald'], genres: ['Fiction', 'Classic'], price: 9.99, stock: 12 },
          { _id: '2', title: 'Dune', authors: ['Frank Herbert'], genres: ['Sci-Fi', 'Adventure'], price: 14.95, stock: 6 },
          { _id: '3', title: 'Sapiens', authors: ['Yuval Noah Harari'], genres: ['History', 'Non-Fiction'], price: 21.00, stock: 20 }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
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
          Global Book Catalog Audit
        </h1>
        
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Polling active catalogs...</div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(255, 255, 255, 0.01)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>BOOK TITLE</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>AUTHOR(S)</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>GENRE(S)</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>LIST PRICE</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>INVENTORY STOCK</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700 }}>{book.title}</td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>{book.authors.join(', ')}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#94a3b8' }}>{book.genres.join(', ')}</td>
                    <td style={{ padding: '1.25rem 1.5rem', color: '#10b981', fontWeight: 700 }}>${book.price.toFixed(2)}</td>
                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center' }}>
                      <span style={{
                        background: book.stock > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: book.stock > 0 ? '#34d399' : '#f87171',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}>
                        {book.stock > 0 ? `${book.stock} Units` : 'OUT OF STOCK'}
                      </span>
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

export default Items;
