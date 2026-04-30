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

  const handleWhatsAppOrder = async () => {
    // 1. Log the quote request to the backend
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      await fetch(`${API_URL}/api/quotes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_name: product.name,
          thickness: selectedVariant.thickness
        })
      });
    } catch (error) {
      console.error("Failed to log quote request:", error);
    }

    // 2. Redirect to WhatsApp
    const phoneNumber = '+918590729342';
    const message = `Hi Lumina Art! I'm interested in ordering:\n\n*Product*: ${product.name}\n*Size/Thickness*: ${selectedVariant.thickness}\n\nPlease let me know the details!`;
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
          <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: '500' }}>
            Select Size / Thickness:
          </label>
          <select 
            value={selectedVariantId} 
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="variant-select"
          >
            {product.variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.thickness}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="product-footer">
        <button 
            className="btn btn-small whatsapp-btn" 
            onClick={handleWhatsAppOrder}
        >
          Enquire on WhatsApp
        </button>
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${API_URL}/api/products/`)
      .then(res => res.ok ? res.json() : Promise.reject('Network response was not ok'))
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError("Could not load products. Make sure the backend server is running.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <span>L</span><span>u</span><span>m</span><span>i</span><span>n</span><span>a</span>&nbsp;<span>A</span><span>r</span><span>t</span><span>.</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Our Catalog</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Elevate Your Brand's<br/><span>First Impression.</span></h1>
            <p>Premium custom-crafted Name Boards and Signages. Stand out with precision-cut, high-quality acrylic designs built to last.</p>
            <a href="#products" className="btn">View Our Catalog</a>
          </div>
          <div className="hero-image">
            <img src="/nameboard1.png" alt="Premium Name Board" />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Premium Materials</h3>
              <p>We use high-grade, weather-resistant acrylics ensuring your signage looks vibrant for years.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Precision CNC Cut</h3>
              <p>State-of-the-art laser and CNC technology for perfect edges and flawless details.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>B2B Wholesale</h3>
              <p>Dedicated pricing and priority fulfillment for bulk orders and business partnerships.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="products">
        <div className="container">
          <h2 className="section-title">Our Premium Catalog</h2>
          {loading && <p style={{textAlign: 'center'}}>Loading catalog...</p>}
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

      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                <span>L</span><span>u</span><span>m</span><span>i</span><span>n</span><span>a</span>&nbsp;<span>A</span><span>r</span><span>t</span><span>.</span>
              </div>
              <p>Crafting premium signage solutions for modern homes and businesses.</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Catalog</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <p>WhatsApp: +91 8590 729 342</p>
              <p>Email: luminaart0@gmail.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Lumina Art. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
