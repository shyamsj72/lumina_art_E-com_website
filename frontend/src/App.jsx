import React, { useState, useEffect } from 'react';
import './index.css';

function ProductCard({ product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0].id : null
  );

  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  const selectedVariant = product.variants.find(v => v.id === parseInt(selectedVariantId)) || product.variants[0];

  const handleWhatsAppOrder = () => {
    const phoneNumber = '+918590729342';
    const message = `Hi Lumina Art! I would like to order the following item:\n\n*Product*: ${product.name}\n*Thickness*: ${selectedVariant.thickness}\n*Price*: ₹${selectedVariant.price}\n\nPlease let me know the next steps for payment and delivery!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
            Select Thickness:
          </label>
          <select 
            value={selectedVariantId} 
            onChange={(e) => setSelectedVariantId(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              borderRadius: '6px', 
              border: '1px solid var(--border-color)',
              fontFamily: 'inherit'
            }}
          >
            {product.variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.thickness} - ₹{variant.price}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="product-footer">
        <span className="price">₹{selectedVariant.price}</span>
        <button 
            className="btn btn-small" 
            onClick={handleWhatsAppOrder}
            style={{ backgroundColor: '#25D366', borderColor: '#25D366', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Order on WhatsApp
        </button>
      </div>
    </div>
  );
}

function AuthModal({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const url = isLogin ? `${API_URL}/api/token/` : `${API_URL}/api/users/register/`;
    const payload = isLogin ? { username, password } : { username, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.detail || Object.values(data)[0] || 'Authentication failed');
      }

      if (isLogin) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        onLoginSuccess();
      } else {
        const loginRes = await fetch(`${API_URL}/api/token/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const loginData = await loginRes.json();
        localStorage.setItem('access_token', loginData.access);
        localStorage.setItem('refresh_token', loginData.refresh);
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <div className="tabs">
          <div className={`tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</div>
          <div className={`tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Register</div>
        </div>
        
        {error && <p style={{color: 'var(--google-red)', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          )}
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{width: '100%', marginTop: '1rem'}}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${API_URL}/api/products/`)
      .then(res => res.ok ? res.json() : Promise.reject('Network response was not ok'))
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError("Could not load products. Make sure the Django server is running.");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <span>L</span><span>u</span><span>m</span><span>i</span><span>n</span><span>a</span>&nbsp;<span>A</span><span>r</span><span>t</span><span>.</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Shop</a></li>
            <li>
              {isAuthenticated ? (
                <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
              ) : (
                <a href="#login" onClick={(e) => { e.preventDefault(); setIsAuthOpen(true); }}>Login</a>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)} 
          onLoginSuccess={() => { setIsAuthOpen(false); setIsAuthenticated(true); }} 
        />
      )}

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Precision Cut.<br/><span>Vibrant Colors.</span></h1>
            <p>We craft premium CNC and laser-cut acrylic products. Elevate your space with our clear and colorful designs.</p>
            <a href="#products" className="btn">Shop Collection</a>
          </div>
          <div className="hero-image">
            <img src="/nameboard1.png" alt="Hero Product" />
          </div>
        </div>
      </section>

      <section id="products" className="products">
        <div className="container">
          <h2 className="section-title">Latest Creations</h2>
          {loading && <p style={{textAlign: 'center'}}>Loading products...</p>}
          {error && <p style={{textAlign: 'center', color: 'var(--google-red)'}}>{error}</p>}
          {!loading && !error && (
            <div className="product-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
