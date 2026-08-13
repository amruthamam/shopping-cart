import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from './api/client';
import Cart from './components/Cart';
import AuthForm from './components/AuthForm';
import ProductCard from './components/ProductCard';
import ProfileSummary from './components/ProfileSummary';
import { addOrder } from './features/orders/ordersSlice';
import { setProducts } from './features/products/productsSlice';
import { seedProducts } from './features/products/seedData';
import { AppDispatch, RootState } from './store/store';
import { saveUserDetails, UserDetails } from './store/userSlice';
import { Category, Product } from './types';

const categories: Category[] = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Staples', 'Bakery', 'Organic'];

const initialProducts: Product[] = seedProducts as Product[];

const getProductId = (product: Product) => product.id ?? product._id ?? '';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart.items);
  const reduxProducts = useSelector((state: RootState) => state.products.items);
  const orders = useSelector((state: RootState) => state.orders);

  const [products, setProductsLocal] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'name'>('popular');
  const [toast, setToast] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [checkoutForm, setCheckoutForm] = useState<UserDetails>({
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    address: user.address,
    city: user.city,
    pincode: user.pincode
  });

  const effectiveProducts = reduxProducts.length ? reduxProducts : products;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get<Product[]>('/products');
        if (response && response.length) {
          dispatch(setProducts(response));
          setProductsLocal(response);
        } else {
          dispatch(setProducts(initialProducts));
        }
      } catch {
        dispatch(setProducts(initialProducts));
      }
    };

    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    setCheckoutForm({
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: user.city,
      pincode: user.pincode
    });
  }, [user]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 1500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const addToCart = (id: string) => {
    dispatch({
      type: 'cart/addToCart',
      payload: id
    });
    setToast('Added to basket');
  };

  const updateQty = (id: string, qty: number) => {
    dispatch({
      type: 'cart/updateCartQty',
      payload: { id, qty }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'cart/clearCart' });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => ({ ...current, [id]: !current[id] }));
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const matches = effectiveProducts.filter((product) => {
      const matchesSearch = !term || product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return [...matches].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
        default:
          return b.rating - a.rating;
      }
    });
  }, [effectiveProducts, searchTerm, selectedCategory, sortBy]);

  const cartItems = effectiveProducts
    .filter((product) => {
      const productId = getProductId(product);
      return Boolean(productId && cart[productId]);
    })
    .map((product) => {
      const productId = getProductId(product);
      return { ...product, id: productId, unit: product.unit ?? 'unit', qty: cart[productId] ?? 0 };
    });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 800 ? 0 : 25;
  const discount = subtotal >= 500 ? Math.min(subtotal * 0.12, 180) : 0;
  const total = Math.max(subtotal + deliveryFee - discount, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const savings = cartItems.reduce((sum, item) => {
    const saved = (item.originalPrice ?? item.price) - item.price;
    return sum + saved * item.qty;
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setToast('Add items to your basket first');
      return;
    }
    setShowCheckout(true);
    setCheckoutError('');
  };

  const handleCheckoutInput = (field: keyof UserDetails, value: string) => {
    setCheckoutForm((current) => ({ ...current, [field]: value }));
  };

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = Object.values(checkoutForm).every((value) => value.trim().length > 0);
    if (!isValid) {
      setCheckoutError('Please fill in your name, phone number, address, city, and pincode.');
      return;
    }

    const orderItems = cartItems.map((item) => ({
      id: getProductId(item),
      name: item.name,
      quantity: item.qty,
      price: item.price,
      unit: item.unit ?? 'unit'
    }));

    dispatch(saveUserDetails(checkoutForm));
    dispatch(addOrder({
      id: `ORD-${Date.now()}`,
      placedAt: new Date().toLocaleString(),
      total,
      customer: checkoutForm,
      items: orderItems
    }));

    setShowCheckout(false);
    clearCart();
    setToast('Order placed successfully');
  };

  if (!authUser) {
    return <AuthForm />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">B</div>
          <div>
            <div className="brand-name">Fresh Basket</div>
            <div className="brand-subtitle">Fresh groceries & more</div>
          </div>
        </div>

        <div className="topbar-user">
          <ProfileSummary />
        </div>

        <div className="search-box">
          <span>🔎</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search fruits, veggies, dairy..."
            aria-label="Search products"
          />
        </div>

        <div className="header-actions">
          <button className="icon-button" type="button">📍 Deliver to Bangalore</button>
          <button className="icon-button cart-badge" type="button">
            🛒 <span>{totalItems}</span>
          </button>
        </div>
      </header>

      <main className="page-shell">
        <section className="promo-banner">
          <div>
            <span className="promo-tag">Mega Savings</span>
            <h1>Weekend basket bonanza</h1>
            <p>Fresh vegetables, fruits, and essentials delivered in under 30 minutes.</p>
          </div>
          <div className="promo-cta">
            <span>Up to 40% off</span>
            <button type="button">Shop now</button>
          </div>
        </section>

        <section className="orders-panel">
          <div className="orders-header">
            <div>
              <p className="eyebrow">Tracking</p>
              <h2>My Orders</h2>
            </div>
            <span>{orders.length} order{orders.length === 1 ? '' : 's'}</span>
          </div>

          {orders.length === 0 ? (
            <div className="empty-order-box">
              <p>No orders yet. Your latest checkout will appear here.</p>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <strong>{order.id}</strong>
                      <div className="muted">{order.placedAt}</div>
                    </div>
                    <span className="order-total">₹{order.total}</span>
                  </div>

                  <div className="order-details">
                    <div>
                      <strong>Customer:</strong> {order.customer.fullName}
                    </div>
                    <div>
                      <strong>Phone:</strong> {order.customer.phoneNumber}
                    </div>
                    <div>
                      <strong>Address:</strong> {order.customer.address}, {order.customer.city} - {order.customer.pincode}
                    </div>
                  </div>

                  <ul className="order-items">
                    {order.items.map((item) => (
                      <li key={`${order.id}-${item.id}`}>
                        <span>{item.name} × {item.quantity}</span>
                        <strong>₹{item.price * item.quantity}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="quick-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'chip active' : 'chip'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <div className="content-grid">
          <section className="product-panel">
            <div className="toolbar">
              <div>
                <h2>Popular picks</h2>
                <span>{filteredProducts.length} items available</span>
              </div>
              <label className="sort-box">
                Sort by
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value as 'popular' | 'price-low' | 'price-high' | 'name')}>
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => {
                const productId = getProductId(product);
                return (
                  <ProductCard
                    key={productId || product.name}
                    product={{ ...product, id: productId, unit: product.unit ?? 'unit' }}
                    qty={cart[productId] ?? 0}
                    isFavorite={Boolean(favorites[productId])}
                    onAdd={() => addToCart(productId)}
                    onToggleFavorite={() => toggleFavorite(productId)}
                  />
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-state">
                <h3>No items match your search</h3>
                <p>Try another keyword or category.</p>
              </div>
            )}
          </section>

          <aside className="cart-panel">
            <Cart
              items={cartItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
              savings={savings}
              onUpdate={updateQty}
              onClear={clearCart}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>
      </main>

      {showCheckout && (
        <div className="checkout-overlay" onClick={() => setShowCheckout(false)}>
          <div className="checkout-modal" onClick={(event) => event.stopPropagation()}>
            <div className="checkout-header">
              <div>
                <p className="eyebrow">Checkout</p>
                <h3>Delivery details</h3>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowCheckout(false)}>✕</button>
            </div>

            <form className="checkout-form" onSubmit={handlePlaceOrder}>
              <label>
                Full name
                <input
                  type="text"
                  value={checkoutForm.fullName}
                  onChange={(event) => handleCheckoutInput('fullName', event.target.value)}
                  placeholder="Enter full name"
                />
              </label>

              <label>
                Phone number
                <input
                  type="tel"
                  value={checkoutForm.phoneNumber}
                  onChange={(event) => handleCheckoutInput('phoneNumber', event.target.value)}
                  placeholder="Enter mobile number"
                />
              </label>

              <label>
                Address
                <textarea
                  value={checkoutForm.address}
                  onChange={(event) => handleCheckoutInput('address', event.target.value)}
                  placeholder="House number, street, landmark"
                />
              </label>

              <div className="checkout-row">
                <label>
                  City
                  <input
                    type="text"
                    value={checkoutForm.city}
                    onChange={(event) => handleCheckoutInput('city', event.target.value)}
                    placeholder="City"
                  />
                </label>

                <label>
                  Pincode
                  <input
                    type="text"
                    value={checkoutForm.pincode}
                    onChange={(event) => handleCheckoutInput('pincode', event.target.value)}
                    placeholder="Pincode"
                  />
                </label>
              </div>

              {checkoutError && <div className="checkout-error">{checkoutError}</div>}

              <div className="checkout-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowCheckout(false)}>Back</button>
                <button type="submit" className="checkout-submit">Place order</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
