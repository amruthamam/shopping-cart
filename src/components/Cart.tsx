import React from 'react';
import { Product } from '../types';

type CartItem = Product & { id: string; qty: number };

export default function Cart({
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
  savings,
  onUpdate,
  onClear,
  onCheckout
}: {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  savings: number
  onUpdate: (id: string, qty: number) => void
  onClear: () => void
  onCheckout: () => void
}) {
  return (
    <div className="cart-box">
      <div className="cart-header">
        <div>
          <p className="eyebrow">Basket</p>
          <h2>Your cart</h2>
        </div>
        {items.length > 0 && (
          <button type="button" className="text-button" onClick={onClear}>
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h3>Your basket is empty</h3>
          <p>Add fresh essentials to get started.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-main">
                  <div className="cart-emoji">{item.emoji}</div>
                  <div>
                    <strong>{item.name}</strong>
                    <div className="muted">₹{item.price} / {item.unit}</div>
                  </div>
                </div>

                <div className="qty-adjuster">
                  <button type="button" onClick={() => onUpdate(item.id, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => onUpdate(item.id, item.qty + 1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-box">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <strong>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</strong>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <strong>-₹{discount.toFixed(0)}</strong>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>
            <div className="summary-row savings-row">
              <span>You saved</span>
              <strong>₹{savings.toFixed(0)}</strong>
            </div>
          </div>

          <button type="button" className="checkout-btn" onClick={onCheckout}>
            Proceed to checkout
          </button>
        </>
      )}
    </div>
  )
}
