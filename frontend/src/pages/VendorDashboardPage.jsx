import { Plus, Package, Boxes, IndianRupee } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getUserName } from '../services/authService'
import { useVendorProducts } from '../hooks/useVendorProducts'
import './VendorDashboardPage.css'

function VendorDashboardPage() {
  const userName = getUserName()

  const {
    products,
    loading,
    error,
  } = useVendorProducts()

  const statistics =
    calculateVendorStatistics(products)

  return (
    <main className="vendor-dashboard">
      <DashboardHeader
        userName={userName}
      />

      <DashboardStatistics
        statistics={statistics}
      />

      <ProductsSection
        products={products}
        loading={loading}
        error={error}
      />
    </main>
  )
}

function DashboardHeader({ userName }) {
  return (
    <section className="vendor-dashboard-header">
      <div>
        <p className="vendor-dashboard-eyebrow">
          VENDOR DASHBOARD
        </p>

        <h1>
          Welcome, {userName || 'Vendor'}
        </h1>

        <p>
          Manage your products and inventory
          from one place.
        </p>
      </div>

      <Link
        to="/vendor/products/new"
        className="add-product-button"
      >
        <Plus size={18} />
        <span>Add Product</span>
      </Link>
    </section>
  )
}

function DashboardStatistics({
  statistics,
}) {
  return (
    <section className="vendor-statistics">
      <StatisticCard
        icon={<Package size={20} />}
        label="My Products"
        value={statistics.productCount}
      />

      <StatisticCard
        icon={<Boxes size={20} />}
        label="Total Stock"
        value={statistics.totalStock}
      />

      <StatisticCard
        icon={<IndianRupee size={20} />}
        label="Inventory Value"
        value={`₹${statistics.inventoryValue.toFixed(2)}`}
      />
    </section>
  )
}

function StatisticCard({
  icon,
  label,
  value,
}) {
  return (
    <article className="vendor-stat-card">
      <div className="vendor-stat-icon">
        {icon}
      </div>

      <div>
        <p>{label}</p>

        <strong>{value}</strong>
      </div>
    </article>
  )
}

function ProductsSection({
  products,
  loading,
  error,
}) {
  return (
    <section className="vendor-products-section">
      <div className="vendor-products-heading">
        <div>
          <h2>My Products</h2>

          <p>
            Products belonging to your vendor account.
          </p>
        </div>

        <Link
          to="/vendor/products/new"
          className="secondary-add-button"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <ProductResults
        products={products}
        loading={loading}
        error={error}
      />
    </section>
  )
}

function ProductResults({
  products,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="vendor-product-state">
        Loading your products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="vendor-product-state vendor-product-error">
        {error}
      </div>
    )
  }

  if (products.length === 0) {
    return <EmptyProductsState />
  }

  return (
    <div className="vendor-product-table">
      <ProductTableHeader />

      {products.map((product) => (
        <VendorProductRow
          key={product.productId}
          product={product}
        />
      ))}
    </div>
  )
}

function ProductTableHeader() {
  return (
    <div className="vendor-product-row vendor-product-header">
      <span>Product</span>
      <span>Category</span>
      <span>Price</span>
      <span>Stock</span>
      <span>Status</span>
    </div>
  )
}

function VendorProductRow({ product }) {
  const stockStatus =
    getStockStatus(product.stockQuantity)

  return (
    <div className="vendor-product-row">
      <div className="vendor-product-name">
        <ProductThumbnail
          imageUrl={product.imageUrl}
        />

        <div>
          <strong>{product.name}</strong>

          <span>
            Product #{product.productId}
          </span>
        </div>
      </div>

      <span className="vendor-product-category">
        {product.category || 'Uncategorized'}
      </span>

      <strong className="vendor-product-price">
        ₹{Number(product.price).toFixed(2)}
      </strong>

      <span>
        {product.stockQuantity}
      </span>

      <span
        className={`stock-status ${stockStatus.className}`}
      >
        {stockStatus.label}
      </span>
    </div>
  )
}

function ProductThumbnail({ imageUrl }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className="vendor-product-thumbnail"
      />
    )
  }

  return (
    <div className="vendor-product-thumbnail vendor-product-placeholder">
      <Package size={20} />
    </div>
  )
}

function EmptyProductsState() {
  return (
    <div className="vendor-empty-products">
      <div className="vendor-empty-icon">
        <Package size={28} />
      </div>

      <h3>No products yet</h3>

      <p>
        Add your first product to start building
        your marketplace inventory.
      </p>

      <Link
        to="/vendor/products/new"
        className="add-product-button"
      >
        <Plus size={17} />
        Add Your First Product
      </Link>
    </div>
  )
}

function calculateVendorStatistics(products) {
  const productCount = products.length

  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stockQuantity || 0),
    0,
  )

  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) *
        Number(product.stockQuantity || 0),
    0,
  )

  return {
    productCount,
    totalStock,
    inventoryValue,
  }
}

function getStockStatus(stockQuantity) {
  const stock = Number(stockQuantity)

  if (stock === 0) {
    return {
      label: 'Out of stock',
      className: 'stock-out',
    }
  }

  if (stock <= 5) {
    return {
      label: 'Low stock',
      className: 'stock-low',
    }
  }

  return {
    label: 'In stock',
    className: 'stock-good',
  }
}

export default VendorDashboardPage