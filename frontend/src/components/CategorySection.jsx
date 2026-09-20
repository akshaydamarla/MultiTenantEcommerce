import {
  Dumbbell,
  Globe,
  House,
  Monitor,
  Shirt,
  Sparkles,
} from 'lucide-react'
import './CategorySection.css'

const categories = [
  {
    name: 'Electronics',
    icon: Monitor,
  },
  {
    name: 'Fashion',
    icon: Shirt,
  },
  {
    name: 'Home & Living',
    icon: House,
  },
  {
    name: 'Accessories',
    icon: Sparkles,
  },
  {
    name: 'Sports',
    icon: Dumbbell,
  },
  {
    name: 'Beauty',
    icon: Globe,
  },
]

function CategorySection() {
  return (
    <section className="category-section">
      <CategoryHeading />

      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
          />
        ))}
      </div>
    </section>
  )
}

function CategoryHeading() {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        BROWSE BY INTEREST
      </p>

      <h2>Shop by Category</h2>
    </div>
  )
}

function CategoryCard({ category }) {
  const Icon = category.icon

  return (
    <button
      type="button"
      className="category-card"
    >
      <Icon size={28} strokeWidth={1.8} />

      <span>{category.name}</span>
    </button>
  )
}

export default CategorySection