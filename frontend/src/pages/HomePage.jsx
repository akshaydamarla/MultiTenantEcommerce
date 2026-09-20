import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import FeaturedProductsSection from '../components/FeaturedProductsSection'
import { useProducts } from '../hooks/useProducts'
import './HomePage.css'

function HomePage() {
  const {
    products,
    loading,
    error,
  } = useProducts()

  return (
    <main className="home-page">
      <HeroSection />

      <CategorySection />

      <FeaturedProductsSection
        products={products}
        loading={loading}
        error={error}
      />
    </main>
  )
}

export default HomePage