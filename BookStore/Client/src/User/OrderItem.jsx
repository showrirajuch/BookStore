import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div style={{
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
        paddingBottom: '1rem', 
        marginBottom: '1rem' 
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>ID: #{order._id}</h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>
            Purchased on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span style={{
            background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
            color: order.status === 'Delivered' ? '#34d399' : '#38bdf8',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            {order.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        {order.items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
            <span>
              {item.book ? item.book.title : 'Catalog Book'} 
              <strong style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>x{item.quantity}</strong>
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
        paddingTop: '1rem' 
      }}>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
          <strong>Delivery Destination:</strong> {order.shippingAddress}
        </p>
        <p style={{ margin: 0, fontSize: '1.1rem', color: '#cbd5e1' }}>
          Total Paid: <span style={{ color: '#10b981', fontWeight: 800 }}>${order.totalAmount.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
