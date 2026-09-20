import { ArrowRight, Check, MapPin, ShoppingBag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { categories, featuredProducts, featuredVendors } from '../data/marketplaceData'

function CustomerHomePage() {
  const [cartItems, setCartItems] = useState([])

  function addToCart(productId) {
    setCartItems((currentItems) => [...currentItems, productId])
  }

  return (
    <div className="customer-home">
      <section className="customer-hero" aria-labelledby="customer-home-heading">
        <div>
          <p className="eyebrow">Your marketplace, simplified</p>
          <h1 id="customer-home-heading">Discover Products From Trusted Vendors</h1>
          <p className="customer-hero-copy">Shop from multiple independent vendors in one unified marketplace.</p>
          <div className="customer-hero-actions">
            <Link className="button button-primary" to="/customer/products">Explore Products <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link className="button button-secondary" to="/vendor-register">Become a Vendor</Link>
          </div>
        </div>
        <div className="customer-hero-summary" aria-label="Marketplace highlights">
          <div className="customer-hero-summary-icon"><ShoppingBag size={22} aria-hidden="true" /></div>
          <strong>One cart, many stores</strong>
          <span>Discover quality products from independent businesses.</span>
        </div>
      </section>

      <section className="customer-section" aria-labelledby="categories-heading">
        <div className="customer-section-heading">
          <div>
            <p className="eyebrow">Browse by interest</p>
            <h2 id="categories-heading">Shop by Category</h2>
          </div>
        </div>
        <div className="category-list">
          {categories.map(({ name, icon: Icon }) => (
            <Link className="category-item" to="/customer/products" key={name}>
              <span className="category-icon"><Icon size={20} aria-hidden="true" /></span>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="customer-section" id="featured-products" aria-labelledby="products-heading">
        <div className="customer-section-heading">
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2 id="products-heading">Featured Products</h2>
          </div>
          <Link className="text-link" to="/customer/products">View all <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img className="product-image" src={product.image} alt={product.name} />
              </div>
              <div className="product-card-body">
                <p className="product-vendor">{product.vendor}</p>
                <h3>{product.name}</h3>
                <div className="product-meta">
                  <strong>{product.price}</strong>
                  <span className="product-rating"><Star size={14} fill="currentColor" aria-hidden="true" /> {product.rating}</span>
                </div>
                <div className="product-stock"><Check size={14} aria-hidden="true" /> {product.stock}</div>
                <button className="button button-primary product-cart-button" type="button" onClick={() => addToCart(product.id)}>
                  {cartItems.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="customer-section vendors-section" aria-labelledby="vendors-heading">
        <div className="customer-section-heading">
          <div>
            <p className="eyebrow">Meet the marketplace</p>
            <h2 id="vendors-heading">Featured Vendors</h2>
          </div>
        </div>
        <div className="vendor-grid">
          {featuredVendors.map((vendor) => (
            <article className="customer-vendor-card" key={vendor.name}>
              <div className="customer-vendor-icon"><MapPin size={19} aria-hidden="true" /></div>
              <div>
                <h3>{vendor.name}</h3>
                <p>{vendor.category}</p>
              </div>
              <Link className="text-link" to="/customer/products">View Store <ArrowRight size={15} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CustomerHomePage