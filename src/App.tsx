import React, { useState } from 'react'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'

export type Product = {
  id: string
  name: string
  price: number
  unit: string
  image?: string
}

const initialProducts: Product[] = [
  { id: 'p1', name: 'Tomatoes', price: 40, unit: 'kg' },
  { id: 'p2', name: 'Potatoes', price: 25, unit: 'kg' },
  { id: 'p3', name: 'Bananas', price: 60, unit: 'dozen' },
  { id: 'p4', name: 'Spinach', price: 20, unit: 'bunch' },
  { id: 'p5', name: 'Apples', price: 120, unit: 'kg' }
]

function App() {
  const [products] = useState<Product[]>(initialProducts)
  const [cart, setCart] = useState<Record<string, number>>({})

  const addToCart = (id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
  }

  const updateQty = (id: string, qty: number) => {
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }

  const clearCart = () => setCart({})

  return (
    <div className="app">
      <header className="header">
        <h1>GreenBasket — Veg & Fruit Store</h1>
      </header>
      <main className="container">
        <section className="products">
          <h2>Products</h2>
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={() => addToCart(p.id)} />
            ))}
          </div>
        </section>

        <aside className="cart">
          <Cart products={products} cart={cart} onUpdate={updateQty} onClear={clearCart} />
        </aside>
      </main>
    </div>
  )
}

export default App
