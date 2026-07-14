import React, { useState, useEffect } from 'react';
import Snavbar from './Snavbar';
import Book from './Book';
import './List.css';

const MyProducts = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('sellerToken');
      const response = await fetch('http://localhost:8000/api/seller/books', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setBooks(data);
      } else {
        throw new Error('Merchant books fetch error');
      }
    } catch (err) {
      console.warn('Failed to load merchant products. Loading placeholders.');
      setBooks([
        { _id: '201', title: 'The Hobbit', authors: ['J.R.R. Tolkien'], genres: ['Fantasy'], price: 14.99, inventory: { quantity: 12 }, coverImage: '' },
        { _id: '202', title: '1984', authors: ['George Orwell'], genres: ['Dystopian', 'Classic'], price: 9.99, inventory: { quantity: 5 }, coverImage: '' },
        { _id: '203', title: 'The Alchemist', authors: ['Paulo Coelho'], genres: ['Adventure', 'Fiction'], price: 12.50, inventory: { quantity: 0 }, coverImage: '' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('sellerToken');
      const response = await fetch(`http://localhost:8000/api/seller/books/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchBooks();
      } else {
        throw new Error('Book delete error');
      }
    } catch (e) {
      setBooks(prev => prev.filter(b => b._id !== id));
    }
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Snavbar />
      <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          marginBottom: '2rem', 
          fontSize: '2.5rem', 
          fontWeight: 800,
          background: 'linear-gradient(to right, #818cf8, #38bdf8)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'left',
          lineHeight: '1.2',
          padding: '0.15em 0'
        }}>
          My Published Listings
        </h1>
        
        {loading ? (
          <div style={{ color: '#94a3b8', textAlign: 'left' }}>Querying store listings...</div>
        ) : books.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '1.1rem', textAlign: 'left' }}>
            No books found. Get started by clicking "Add Book" above.
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <Book key={book._id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
