import './Logo.css'

function Logo() {
  return (
    <a
      href="/"
      className="logo"
      aria-label="MarketGrid home"
    >
      <span
        className="logo-mark"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
      </span>

      <span className="logo-text">
        MARKETGRID
      </span>
    </a>
  )
}

export default Logo