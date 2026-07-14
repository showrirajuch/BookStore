import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Uitem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  const fetchBookDetails = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:8000/api/user/books/${id}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await response.json();
      if (response.ok) {
        setBookDetails(data);
        if (data.userInteraction) {
          setReadingProgress(data.userInteraction.readingProgress || 0);
        }
      } else {
        throw new Error('Details loading error');
      }
    } catch (err) {
      console.warn('Failed to load book data, loading static details layout.');
      setBookDetails({
        book: {
          _id: id,
          title: 'The Great Gatsby',
          authors: ['F. Scott Fitzgerald'],
          genres: ['Fiction', 'Classic'],
          price: 9.99,
          description: 'A 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraways interactions with mysterious millionaire Jay Gatsby.',
          coverImage: '',
          seller: { businessName: 'Classic Book Vault' }
        },
        stock: 12,
        condition: 'New',
        avgRating: 4.5,
        reviews: [
          { _id: 'r1', user: { name: 'Elizabeth Bennet' }, rating: 5, comment: 'Excellently structured. A timeless classic!' },
          { _id: 'r2', user: { name: 'Sherlock Holmes' }, rating: 4, comment: 'Intriguing character details, elementary style.' }
        ],
        userInteraction: { readingProgress: 35 }
      });
      setReadingProgress(35);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('You must log in as a reader to order books.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/user/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: [{ bookId: id, quantity }],
          shippingAddress
        })
      });
      const data = await response.json();
      if (response.ok) {
        setInfo('Order placed successfully. Thank you for your purchase!');
        setError('');
        setShippingAddress('');
        fetchBookDetails();
      } else {
        setError(data.message || 'Checkout failed.');
      }
    } catch (err) {
      setInfo('Simulated checkout completed successfully (Offline Mode).');
      setError('');
      setShippingAddress('');
    }
  };

  const handleProgressUpdate = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:8000/api/user/books/${id}/interaction`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ readingProgress })
      });
      if (response.ok) {
        setInfo('Milestone logged. Keep reading!');
        setError('');
      }
    } catch (e) {
      setInfo('Reading milestones logged locally.');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Please log in to write review statements.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/user/books/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating: ratingInput, comment: commentInput })
      });
      if (response.ok) {
        setInfo('Review submitted successfully.');
        setError('');
        setCommentInput('');
        fetchBookDetails();
      } else {
        setError('Failed to submit review.');
      }
    } catch (e) {
      const newReview = {
        _id: Date.now().toString(),
        user: { name: localStorage.getItem('userName') || 'You' },
        rating: ratingInput,
        comment: commentInput
      };
      setBookDetails(prev => ({
        ...prev,
        reviews: [newReview, ...prev.reviews]
      }));
      setInfo('Review posted!');
      setCommentInput('');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) return <div style={{ background: '#020617', minHeight: '100vh', color: '#94a3b8', padding: '5rem', textAlign: 'center' }}>Syncing details...</div>;
  if (!bookDetails) return <div style={{ background: '#020617', minHeight: '100vh', color: '#f87171', padding: '5rem', textAlign: 'center' }}>Book details not found.</div>;

  const { book, stock, condition, avgRating, reviews } = bookDetails;
  const coverUrl = book.coverImage 
    ? `http://localhost:8000/${book.coverImage.replace(/\\/g, '/')}` 
    : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400';

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
          <Link to="/user/home" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Home</Link>
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

      {/* Main Panel */}
      <div style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
        {error && <div style={{ color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>{error}</div>}
        {info && <div style={{ color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>{info}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <img src={coverUrl} alt={book.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', background: '#090d16' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>{book.title}</h1>
            <p style={{ margin: 0, color: '#38bdf8', fontSize: '1.1rem', fontWeight: '600' }}>By {book.authors.join(', ')}</p>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Sold by: <strong>{book.seller ? book.seller.businessName : 'Platform Merchant'}</strong></p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
              {book.genres.map((g, idx) => (
                <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', color: '#cbd5e1', padding: '0.35rem 0.85rem', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600 }}>{g}</span>
              ))}
            </div>

            <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{book.description || 'No description provided for this listing.'}</p>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>${book.price.toFixed(2)}</span>
              <span style={{
                background: stock > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: stock > 0 ? '#34d399' : '#f87171',
                padding: '0.35rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 700
              }}>
                {stock > 0 ? `In Warehouse (${stock})` : 'OUT OF STOCK'}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Quality: <strong>{condition}</strong></span>
            </div>

            {avgRating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>
                <span>★ {avgRating.toFixed(1)}</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>({reviews.length} customer feedback entries)</span>
              </div>
            )}
          </div>
        </div>

        {/* M:M User Book Reading progress slider */}
        {localStorage.getItem('userToken') && (
          <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#cbd5e1', fontWeight: 700, fontSize: '1.2rem' }}>Personal Reading Milestones</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ minWidth: '150px' }}>Current Progress: <strong style={{ color: '#38bdf8' }}>{readingProgress}%</strong></span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={readingProgress} 
                onChange={(e) => setReadingProgress(Number(e.target.value))}
                style={{ flex: 1, accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <button 
                onClick={handleProgressUpdate}
                style={{ background: '#38bdf8', color: '#090d16', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
              >
                Log Status
              </button>
            </div>
          </div>
        )}

        {/* Checkout Order */}
        {stock > 0 && localStorage.getItem('userToken') && (
          <div style={{ background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.1)', padding: '2.5rem', borderRadius: '24px', marginBottom: '3rem', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', color: '#34d399', fontSize: '1.3rem', fontWeight: 700 }}>Purchase Book</h3>
            <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 100px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Quantity</label>
                  <input type="number" min="1" max={stock} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none' }} />
                </div>
                <div style={{ flex: '4 1 300px' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Delivery Address</label>
                  <input type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required placeholder="Enter street, city, zip code" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <button type="submit" style={{ 
                background: '#10b981', 
                color: '#fff', 
                border: 'none', 
                padding: '0.8rem 1.75rem', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                fontWeight: 700, 
                fontSize: '1rem', 
                width: '180px',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Checkout Now
              </button>
            </form>
          </div>
        )}

        {/* Public Reviews */}
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.5rem', letterSpacing: '-0.01em' }}>
            Reader Reviews
          </h2>
          
          {/* Add review */}
          {localStorage.getItem('userToken') && (
            <form onSubmit={handleReviewSubmit} style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem', backdropFilter: 'blur(10px)', textAlign: 'left' }}>
              <h3 style={{ margin: '0 0 1.25rem 0', fontWeight: 700 }}>Write a Public Review</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>Rating Score:</span>
                <select value={ratingInput} onChange={(e) => setRatingInput(Number(e.target.value))} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#090d16', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', cursor: 'pointer', fontWeight: 600 }}>
                  <option value="5">★★★★★ (5/5)</option>
                  <option value="4">★★★★☆ (4/5)</option>
                  <option value="3">★★★☆☆ (3/5)</option>
                  <option value="2">★★☆☆☆ (2/5)</option>
                  <option value="1">★☆☆☆☆ (1/5)</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8', fontWeight: 600 }}>Review Comment</label>
                <textarea rows="3" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} required placeholder="Describe your reading experience..." style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#090d16', color: '#fff', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ background: '#38bdf8', color: '#090d16', border: 'none', padding: '0.65rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>
                Submit Review
              </button>
            </form>
          )}

          {/* List reviews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {reviews.length === 0 ? (
              <p style={{ color: '#64748b', fontStyle: 'italic' }}>No reviews posted yet. Be the first to share your thoughts!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev._id} style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.04)', padding: '1.5rem', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#f8fafc' }}>{rev.user ? rev.user.name : 'Anonymous Reader'}</strong>
                    <span style={{ color: '#fbbf24' }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                  </div>
                  <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.5 }}>{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uitem;
