import React from 'react'
import { Product } from '../App'

export default function ProductCard({
  product,
  onAdd
}: {
  product: Product
  onAdd: () => void
}) {
  return (
    <div className="card">
      <div className="media">🍎</div>
      <div className="meta">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price} / {product.unit}</p>
        <button className="btn" onClick={onAdd}>Add</button>
      </div>
    </div>
  )
}
