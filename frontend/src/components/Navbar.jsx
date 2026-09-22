import { LogOut, Search, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import {
  getRole,
  getUserName,
  logoutUser,
} from '../services/authService'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const userName = getUserName()
  const role = getRole()

  function handleLogout() {
    logoutUser()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Logo />

        <SearchBar />

        <NavigationLinks
          userName={userName}
          role={role}
          onLogout={handleLogout}
        />
      </div>
    </header>
  )
}

function SearchBar() {
  return (
    <div className="navbar-search">
      <Search size={18} />

      <input
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
      />
    </div>
  )
}

function NavigationLinks({
  userName,
  role,
  onLogout,
}) {
  return (
    <nav className="navbar-links">
      {role === 'VENDOR' && (
        <Link to="/vendor">
          Dashboard
        </Link>
      )}

      {role === 'CUSTOMER' && (
        <Link to="/orders">
          Orders
        </Link>
      )}

      <Link to="/products">
        Products
      </Link>

      <Link to="/cart">
        <ShoppingCart size={18} />
        <span>Cart</span>
      </Link>

      {userName ? (
        <LoggedInUser
          userName={userName}
          onLogout={onLogout}
        />
      ) : (
        <Link to="/login">
          Login
        </Link>
      )}
    </nav>
  )
}


function LoggedInUser({
  userName,
  onLogout,
}) {
  return (
    <div className="navbar-user">
      <span className="navbar-user-name">
        Hi, {userName}
      </span>

      <button
        type="button"
        className="navbar-logout"
        onClick={onLogout}
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  )
}

export default Navbar