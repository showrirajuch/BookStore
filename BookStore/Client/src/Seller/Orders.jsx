import React, { useState, useEffect } from 'react';
import Snavbar from './Snavbar';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('sellerToken');
      const response = await fetch('http://localhost:8000/api/seller/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      } else {
        throw new Error('Merchant orders loading error');
      }
    } catch (err) {
      console.warn('Failed to load merchant orders. Fetching mock data.');
      setOrders([
        {
          _id: 'ORD71940',
          user: { name: 'Frodo Baggins', email: 'frodo@bagend.me' },
          items: [{ book: { title: 'The Hobbit' }, quantity: 1, price: 14.99 }],
          totalAmount: 14.99,
          status: 'Pending',
          shippingAddress: 'Bag End, Hobbiton, The Shire',
          createdAt: new Date().toISOString()
        },
        {
          _id: 'ORD90812',
          user: { name: 'Samwise Gamgee', email: 'sam@shire.org' },
          items: [{ book: { title: '1984' }, quantity: 2, price: 9.99 }],
          totalAmount: 19.98,
          status: 'Processing',
          shippingAddress: '#3 Bagshot Row, Hobbiton, The Shire',
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('sellerToken');
      const response = await fetch(`http://localhost:8000/api/seller/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        fetchOrders();
      } else {
        throw new Error();
      }
    } catch (e) {
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    }
  };

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Snavbar />
      <div style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
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
          Incoming Product Orders
        </h1>
        
        {loading ? (
          <div style={{ color: '#94a3b8', textAlign: 'left' }}>Retrieving order logs...</div>
        ) : orders.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '1.1rem', textAlign: 'left' }}>No customer orders placed yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.map((order) => (
              <div key={order._id} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'left',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap', 
                  gap: '1rem', 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)', 
                  paddingBottom: '1.25rem', 
                  marginBottom: '1.25rem' 
                }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#f8fafc', fontWeight: 700, fontSize: '1.3rem' }}>
                      ID: #{order._id}
                    </h3>
                    <p style={{ margin: '0.35rem 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
                      Buyer: <strong style={{ color: '#f8fafc' }}>{order.user.name}</strong> ({order.user.email})
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.9rem' }}>Status Control:</span>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '10px',
                        background: '#090d16',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        outline: 'none',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', color: '#94a3b8', fontSize: '0.95rem', letterSpacing: '0.05em' }}>ORDER ITEMS</h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#cbd5e1' }}>
                      <span>
                        {item.book ? item.book.title : 'Catalog Item'} 
                        <strong style={{ color: '#818cf8', marginLeft: '0.5rem' }}>x{item.quantity}</strong>
                      </span>
                      <span style={{ fontWeight: 700, color: '#f8fafc' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap', 
                  gap: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
                  paddingTop: '1.25rem' 
                }}>
                  <div>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
                      <strong>Delivery Point:</strong> {order.shippingAddress}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '1.15rem', color: '#cbd5e1' }}>
                      Total Amount: <span style={{ color: '#10b981', fontWeight: 800 }}>${order.totalAmount.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
