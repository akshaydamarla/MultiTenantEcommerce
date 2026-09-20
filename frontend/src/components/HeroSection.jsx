import { ArrowRight, ShieldCheck, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero-section">
      <HeroContent />
      <HeroBenefits />
    </section>
  )
}

function HeroContent() {
  return (
    <div className="hero-content">
      <p className="eyebrow">
        YOUR MARKETPLACE, SIMPLIFIED
      </p>

      <h1>
        Discover Products From
        <br />
        Trusted Vendors
      </h1>

      <p className="hero-description">
        Shop from multiple independent vendors in one unified
        marketplace.
      </p>

      <div className="hero-actions">
        <Link
          to="/products"
          className="primary-button"
        >
          Explore Products
          <ArrowRight size={18} />
        </Link>

        <Link
          to="/vendor-register"
          className="secondary-button"
        >
          Become a Vendor
        </Link>
      </div>
    </div>
  )
}

function HeroBenefits() {
  return (
    <div className="hero-benefits">
      <BenefitCard
        variant="green"
        icon={<Store size={21} />}
        title="One cart, many stores"
        description="Discover quality products from independent businesses."
      />

      <BenefitCard
        variant="blue"
        icon={<ShieldCheck size={21} />}
        title="Verified vendors only"
        description="Every seller is vetted so you shop with confidence."
      />
    </div>
  )
}

function BenefitCard({
  variant,
  icon,
  title,
  description,
}) {
  return (
    <div className={`benefit-card benefit-${variant}`}>
      <div className="benefit-icon">
        {icon}
      </div>

      <div className="benefit-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default HeroSection