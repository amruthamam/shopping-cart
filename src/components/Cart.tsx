import React from 'react'
import { Product } from '../App'

export default function Cart({
  products,
  cart,
  onUpdate,
  onClear
}: {
  products: Product[]
  cart: Record<string, number>
  onUpdate: (id: string, qty: number) => void
  onClear: () => void
}) {
  const items = Object.entries(cart)
  const total = items.reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === id)!
    return sum + p.price * qty
  }, 0)

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <ul>
            {items.map(([id, qty]) => {
              const p = products.find((x) => x.id === id)!
              return (
                <li key={id} className="cart-item">
                  <div>
                    <strong>{p.name}</strong>
                    <div className="muted">₹{p.price} / {p.unit}</div>
                  </div>
                  <div className="qty">
                    <button onClick={() => onUpdate(id, qty - 1)}>-</button>
                    <span>{qty}</span>
                    <button onClick={() => onUpdate(id, qty + 1)}>+</button>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="total">Total: ₹{total}</div>
          <div className="cart-actions">
            <button className="btn" onClick={onClear}>Clear</button>
            <button className="btn primary" onClick={() => alert('Checkout placeholder')}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}
