import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <strong>MarketGrid</strong>
          <span>One Marketplace. Multiple Vendors. Smarter Commerce.</span>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/support">Customer Support</Link>
          <Link to="/vendor-register">Become a Vendor</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 MarketGrid Commerce</span>
      </div>
    </footer>
  )
}

export default Footer