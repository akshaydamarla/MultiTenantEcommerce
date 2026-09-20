import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import './ProductsPage.css'

function ProductsPage() {
  const {
    products,
    loading,
    error,
  } = useProducts()

  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [sortOption, setSortOption] = useState('featured')

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(
      products,
      searchTerm,
      priceFilter,
      sortOption,
    )
  }, [
    products,
    searchTerm,
    priceFilter,
    sortOption,
  ])

  return (
    <main className="products-page">
      <ProductsHeader
        productCount={filteredProducts.length}
      />

      <div className="products-layout">
        <ProductFilters
          priceFilter={priceFilter}
          onPriceChange={setPriceFilter}
        />

        <section className="products-main">
          <ProductToolbar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />

          <ProductResults
            products={filteredProducts}
            loading={loading}
            error={error}
          />
        </section>
      </div>
    </main>
  )
}

function ProductsHeader({ productCount }) {
  return (
    <div className="products-header">
      <div>
        <p className="eyebrow">MARKETPLACE</p>

        <h1>All Products</h1>

        <p className="products-subtitle">
          {productCount} products found
        </p>
      </div>
    </div>
  )
}

function ProductFilters({
  priceFilter,
  onPriceChange,
}) {
  return (
    <aside className="product-filters">
      <FilterSection title="CATEGORIES">
        <button
          type="button"
          className="category-filter active"
        >
          All
        </button>

        <button
          type="button"
          className="category-filter"
          disabled
        >
          Electronics
        </button>

        <button
          type="button"
          className="category-filter"
          disabled
        >
          Fashion
        </button>

        <button
          type="button"
          className="category-filter"
          disabled
        >
          Home & Living
        </button>

        <button
          type="button"
          className="category-filter"
          disabled
        >
          Accessories
        </button>

        <button
          type="button"
          className="category-filter"
          disabled
        >
          Sports
        </button>

        <button
          type="button"
          className="category-filter"
          disabled
        >
          Beauty
        </button>

        <p className="filter-note">
          Categories will become available when the
          product service supports them.
        </p>
      </FilterSection>

      <FilterSection title="PRICE RANGE">
        <PriceOption
          value="under50"
          label="Under ₹50"
          selected={priceFilter === 'under50'}
          onChange={onPriceChange}
        />

        <PriceOption
          value="50to100"
          label="₹50 – ₹100"
          selected={priceFilter === '50to100'}
          onChange={onPriceChange}
        />

        <PriceOption
          value="100to200"
          label="₹100 – ₹200"
          selected={priceFilter === '100to200'}
          onChange={onPriceChange}
        />

        <PriceOption
          value="over200"
          label="₹200+"
          selected={priceFilter === 'over200'}
          onChange={onPriceChange}
        />
      </FilterSection>
    </aside>
  )
}

function FilterSection({ title, children }) {
  return (
    <div className="filter-section">
      <h2>{title}</h2>

      <div className="filter-options">
        {children}
      </div>
    </div>
  )
}

function PriceOption({
  value,
  label,
  selected,
  onChange,
}) {
  return (
    <label className="price-option">
      <input
        type="radio"
        name="price"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
      />

      <span>{label}</span>
    </label>
  )
}

function ProductToolbar({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
}) {
  return (
    <div className="products-toolbar">
      <input
        type="search"
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search..."
        className="products-search"
      />

      <select
        value={sortOption}
        onChange={(event) =>
          onSortChange(event.target.value)
        }
        className="products-sort"
      >
        <option value="featured">Featured</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="name">Name</option>
        <option value="stock">Stock</option>
      </select>
    </div>
  )
}

function ProductResults({
  products,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="product-state">
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-state product-error">
        {error}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="product-state">
        No products match your search.
      </div>
    )
  }

  return (
    <div className="products-result-grid">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
        />
      ))}
    </div>
  )
}

function filterAndSortProducts(
  products,
  searchTerm,
  priceFilter,
  sortOption,
) {
  const normalizedSearch = searchTerm
    .trim()
    .toLowerCase()

  const filtered = products.filter((product) => {
    const matchesSearch =
      !normalizedSearch ||
      product.name
        ?.toLowerCase()
        .includes(normalizedSearch)

    const price = Number(product.price)

    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'under50' && price < 50) ||
      (priceFilter === '50to100' &&
        price >= 50 &&
        price < 100) ||
      (priceFilter === '100to200' &&
        price >= 100 &&
        price < 200) ||
      (priceFilter === 'over200' && price >= 200)

    return matchesSearch && matchesPrice
  })

  return sortProducts(filtered, sortOption)
}

function sortProducts(products, sortOption) {
  const sorted = [...products]

  switch (sortOption) {
    case 'priceLow':
      return sorted.sort(
        (a, b) => Number(a.price) - Number(b.price),
      )

    case 'priceHigh':
      return sorted.sort(
        (a, b) => Number(b.price) - Number(a.price),
      )

    case 'name':
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name),
      )

    case 'stock':
      return sorted.sort(
        (a, b) =>
          Number(b.stockQuantity) -
          Number(a.stockQuantity),
      )

    default:
      return sorted
  }
}

export default ProductsPage