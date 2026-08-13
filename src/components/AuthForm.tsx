import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '../api/client';
import { setAuth } from '../features/auth/authSlice';
import { AppDispatch } from '../store/store';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email: form.email, password: form.password } : form;
      const response = await api.post<{ token: string; user: { id: string; name: string; email: string; role?: string } }>(endpoint, payload);
      dispatch(setAuth({ user: response.user, token: response.token }));
      setError('');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <div className="brand-pill">Fresh Basket</div>
        <h1>Fresh groceries, delivered with care.</h1>
        <p>
          Shop fruits, vegetables, dairy, staples, and daily essentials from one trusted app.
        </p>

        <div className="benefit-list">
          <div className="benefit-item">
            <span>✔</span>
            <p>Same-day delivery in your city</p>
          </div>
          <div className="benefit-item">
            <span>✔</span>
            <p>Fresh produce with weekly savings</p>
          </div>
          <div className="benefit-item">
            <span>✔</span>
            <p>Simple checkout and tracked orders</p>
          </div>
        </div>
      </div>

      <div className="auth-card">
        <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
        <p className="auth-subtitle">
          {isLogin ? 'Email and password login' : 'Create your account to start shopping'}
        </p>

        <div className="auth-toggle">
          <button type="button" className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button type="button" className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <label>
              Full name
              <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Doe" />
            </label>
          )}

          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="••••••••" />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="primary-btn">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
