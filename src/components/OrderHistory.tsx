import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function OrderHistory() {
  const orders = useSelector((state: RootState) => state.orders);

  if (!orders.length) {
    return (
      <div className="orders-box">
        <h3>Order history</h3>
        <p>No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="orders-box">
      <h3>Order history</h3>
      {orders.map((order) => (
        <div key={order.id} className="order-summary-card">
          <div className="order-summary-header">
            <strong>{order.id}</strong>
            <span>{order.placedAt}</span>
          </div>
          <div className="order-summary-details">
            <span>{order.customer.fullName}</span>
            <span>₹{order.total}</span>
          </div>
          <ul>
            {order.items.map((item) => (
              <li key={`${order.id}-${item.id}`}>
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
