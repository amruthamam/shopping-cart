import React from 'react';
import { Product } from '../types';

export default function ProductCard({
  product,
  qty,
  isFavorite,
  onAdd,
  onToggleFavorite
}: {
  product: Product & { id: string }
  qty: number
  isFavorite: boolean
  onAdd: () => void
  onToggleFavorite: () => void
}) {
  return (
    <article className="product-card">
      <div className="product-card-top">
        <span className={product.isOrganic ? 'badge badge-green' : 'badge'}>{product.isOrganic ? 'Organic' : product.category}</span>
        <button type="button" className={isFavorite ? 'favorite-btn active' : 'favorite-btn'} onClick={onToggleFavorite} aria-label="Toggle favorite">
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-emoji" aria-hidden="true">{product.emoji}</div>

      <div className="product-copy">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="rating-row">
          <span>⭐ {product.rating}</span>
          <span>{product.stock}</span>
        </div>
      </div>

      <div className="price-row">
        <div>
          <div className="price">₹{product.price}</div>
          {product.originalPrice && <div className="original-price">₹{product.originalPrice}</div>}
          <div className="unit">/ {product.unit}</div>
        </div>
        <button type="button" className="add-btn" onClick={onAdd}>
          {qty > 0 ? `Add more` : 'Add'}
        </button>
      </div>

      {qty > 0 && <div className="cart-count">In basket: {qty}</div>}
    </article>
  )
}
