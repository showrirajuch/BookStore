import React, { useState } from 'react';
import Snavbar from './Snavbar';

const Addbook = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [genres, setGenres] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('Main Warehouse');
  const [condition, setCondition] = useState('New');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('sellerToken');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('authors', authors);
    formData.append('genres', genres);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('location', location);
    formData.append('condition', condition);
    if (file) {
      formData.append('coverImage', file);
    }

    try {
      const response = await fetch('http://localhost:8000/api/seller/books', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Book successfully catalogued with associated stock parameters.');
        setError('');
        setTitle('');
        setAuthors('');
        setGenres('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setFile(null);
      } else {
        setError(data.message || 'Failed to catalog book. Ensure all fields are filled.');
        setMessage('');
      }
    } catch (err) {
      setError('Connection refused. Ensure Express is listening on port 8000.');
      setMessage('');
    }
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Snavbar />
      <div style={{ padding: '3rem 2rem', maxWidth: '650px', margin: '0 auto' }}>
        <h1 style={{ 
          marginBottom: '2rem', 
          fontSize: '2.5rem', 
          fontWeight: 800,
          background: 'linear-gradient(to right, #818cf8, #38bdf8)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.2',
          padding: '0.15em 0'
        }}>
          Catalog New Book Listing
        </h1>
        
        <form onSubmit={handleSubmit} style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '2.5rem',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          textAlign: 'left'
        }}>
          {error && <div style={{ color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}
          {message && <div style={{ color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{message}</div>}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>Book Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Author(s) (comma-separated)</label>
              <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} required placeholder="Arthur Conan Doyle" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Genre(s) (comma-separated)</label>
              <input type="text" value={genres} onChange={(e) => setGenres(e.target.value)} required placeholder="Mystery, Classic" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Price ($)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Stock Quantity</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Condition</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', boxSizing: 'border-box' }}>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Warehouse Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Book Cover Image</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" style={{ color: '#cbd5e1' }} />
          </div>

          <button type="submit" style={{ 
            width: '100%', 
            padding: '0.85rem', 
            borderRadius: '10px', 
            background: 'linear-gradient(to right, #818cf8, #38bdf8)', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: '700', 
            fontSize: '1rem',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Publish Catalog Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbook;
