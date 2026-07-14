import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OrderItem from './OrderItem';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:8000/api/user/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          throw new Error('Orders fetch error');
        }
      } catch (err) {
        console.warn('Failed to load user orders. Fetching mock logs.');
        setOrders([
          {
            _id: 'ORD48911',
            items: [{ book: { title: 'The Great Gatsby' }, quantity: 1, price: 9.99 }],
            totalAmount: 9.99,
            status: 'Pending',
            shippingAddress: '221B Baker Street, London',
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

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
          <Link to="/user/products" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Browse</Link>
          <Link to="/user/orders" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>My Orders</Link>
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

      {/* Orders container */}
      <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ 
          marginBottom: '2rem', 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          textAlign: 'left',
          background: 'linear-gradient(to right, #38bdf8, #818cf8)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          lineHeight: '1.2',
          padding: '0.15em 0'
        }}>
          My Order History
        </h1>
        
        {loading ? (
          <div style={{ color: '#94a3b8', textAlign: 'left' }}>Syncing order logs...</div>
        ) : orders.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '1.1rem', textAlign: 'left' }}>You have not placed any orders yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
