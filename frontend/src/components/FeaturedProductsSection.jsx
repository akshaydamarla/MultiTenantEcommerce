import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import './FeaturedProductsSection.css'

function FeaturedProductsSection({
  products,
  loading,
  error,
}) {
  return (
    <section className="featured-section">
      <FeaturedHeader />

      <ProductContent
        products={products}
        loading={loading}
        error={error}
      />
    </section>
  )
}

function FeaturedHeader() {
  return (
    <div className="featured-heading">
      <div>
        <p className="eyebrow">
          HANDPICKED FOR YOU
        </p>

        <h2>Featured Products</h2>
      </div>

      <Link to="/products" className="view-all-button">
        View All
        <ArrowRight size={17} />
      </Link>
    </div>
  )
}

function ProductContent({
  products,
  loading,
  error,
}) {
  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (products.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="product-grid">
      {products.slice(0, 4).map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
        />
      ))}
    </div>
  )
}

function LoadingState() {
  return (
    <div className="product-state">
      Loading products...
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div className="product-state product-error">
      {message}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="product-state">
      No products are available yet.
    </div>
  )
}

export default FeaturedProductsSection