import React from 'react';

const Book = ({ book, onDelete }) => {
  // Resolve covers
  const coverUrl = book.coverImage 
    ? `http://localhost:8000/${book.coverImage.replace(/\\/g, '/')}` 
    : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400';

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '20px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      backdropFilter: 'blur(10px)',
      boxSizing: 'border-box',
      textAlign: 'left'
    }}>
      <img 
        src={coverUrl} 
        alt={book.title} 
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover', 
          borderRadius: '12px',
          background: '#090d16'
        }} 
      />
      <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>
        {book.title}
      </h3>
      <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>
        By {book.authors.join(', ')}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0' }}>
        <span style={{ color: '#10b981', fontWeight: 800, fontSize: '1.1rem' }}>
          ${book.price.toFixed(2)}
        </span>
        <span style={{
          background: 'rgba(129, 140, 248, 0.1)',
          color: '#818cf8',
          padding: '0.25rem 0.65rem',
          borderRadius: '8px',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          Stock: {book.inventory ? book.inventory.quantity : 0}
        </span>
      </div>

      <button 
        onClick={() => onDelete(book._id)}
        style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#f87171',
          padding: '0.5rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '0.9rem',
          marginTop: 'auto',
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
        Delete Book
      </button>
    </div>
  );
};

export default Book;
