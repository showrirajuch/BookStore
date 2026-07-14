import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialGenre = queryParams.get('genre') || '';

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState(initialGenre);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8000/api/user/books';
      const params = [];
      if (search) params.push(`search=${search}`);
      if (genre) params.push(`genre=${genre}`);
      if (params.length) url += `?${params.join('&')}`;

      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setBooks(data);
      } else {
        throw new Error('Books fetch error');
      }
    } catch (err) {
      console.warn('Failed to load store books. Displaying static fallback catalog.');
      const allMockBooks = [
        { _id: '1', title: 'The Great Gatsby', authors: ['F. Scott Fitzgerald'], genres: ['Fiction', 'Classic'], price: 9.99, stock: 12, avgRating: 4.8 },
        { _id: '2', title: 'Dune', authors: ['Frank Herbert'], genres: ['Sci-Fi', 'Adventure'], price: 14.95, stock: 6, avgRating: 4.7 },
        { _id: '3', title: 'Sapiens', authors: ['Yuval Noah Harari'], genres: ['History', 'Non-Fiction'], price: 21.00, stock: 20, avgRating: 4.5 },
        { _id: '4', title: 'Classic Novels', authors: ['Various Authors'], genres: ['Fiction', 'Classic'], price: 5.50, stock: 0, avgRating: 0 }
      ];

      const filtered = allMockBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = !genre || book.genres.includes(genre);
        return matchesSearch && matchesGenre;
      });
      setBooks(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, genre]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      {/* User Navbar */}
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
          <Link to="/user/home" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Home</Link>
          <Link to="/user/products" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Browse</Link>
          <Link to="/user/orders" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>My Orders</Link>
          <button onClick={handleLogout} style={{
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

      {/* Catalog Search Panel */}
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 800, textAlign: 'left', letterSpacing: '-0.02em' }}>
          Marketplace Catalog
        </h1>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <input 
            type="text" 
            placeholder="Search by book title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: '2 1 300px',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.02)',
              color: '#fff',
              outline: 'none',
              fontSize: '1rem',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#38bdf8'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{
              flex: '1 1 200px',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: '#090d16',
              color: '#fff',
              outline: 'none',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="History">History</option>
          </select>
        </div>

        {/* Grid Display */}
        {loading ? (
          <div style={{ color: '#94a3b8', textAlign: 'left' }}>Querying catalogs...</div>
        ) : books.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '1.1rem', textAlign: 'left' }}>No books matching your query found.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2.5rem' }}>
            {books.map((book) => {
              const coverUrl = book.coverImage 
                ? `http://localhost:8000/${book.coverImage.replace(/\\/g, '/')}` 
                : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400';
              return (
                <div 
                  key={book._id}
                  onClick={() => navigate(`/user/books/${book._id}`)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = '#38bdf8';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <img src={coverUrl} alt={book.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', background: '#090d16' }} />
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>{book.title}</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>By {book.authors.join(', ')}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 800, fontSize: '1.1rem' }}>${book.price.toFixed(2)}</span>
                    <span style={{
                      background: book.stock > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: book.stock > 0 ? '#34d399' : '#f87171',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      {book.stock > 0 ? `Stock (${book.stock})` : 'OUT OF STOCK'}
                    </span>
                  </div>
                  {book.avgRating > 0 && (
                    <div style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700 }}>
                      ★ {book.avgRating.toFixed(1)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
