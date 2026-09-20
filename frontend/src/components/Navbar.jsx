import { LayoutGrid, Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link className="brand" to="/customer" aria-label="MarketGrid home" onClick={closeMenu}>
          <span className="brand-mark"><LayoutGrid size={18} strokeWidth={2.5} /></span>
          <span><strong>MARKETGRID</strong></span>
        </Link>

        <form className="navbar-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <Search size={17} aria-hidden="true" />
          <input className="navbar-search-input" type="search" placeholder="Search Products..." aria-label="Search products" />
        </form>

        <button
          className="navbar-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav id="main-navigation" className={`navbar-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <Link className="navbar-link" to="/customer/orders" onClick={closeMenu}>
            <span>Orders</span>
          </Link>
          <Link className="navbar-link" to="/customer/cart" onClick={closeMenu}>
            <ShoppingCart size={17} aria-hidden="true" />
            <span>Cart</span>
          </Link>
          <Link className="navbar-link navbar-profile" to="/login" onClick={closeMenu}>
            <UserRound size={17} aria-hidden="true" />
            <span>Login / Profile</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar