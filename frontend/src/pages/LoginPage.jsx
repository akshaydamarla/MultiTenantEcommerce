import { ArrowRight, Check, LayoutGrid, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const initialValues = {
  email: '',
  password: '',
  remember: false,
}

function validate(values) {
  const errors = {}

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  }

  return errors
}

function LoginPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, type, value, checked } = event.target
    const nextValues = { ...values, [name]: type === 'checkbox' ? checked : value }

    setValues(nextValues)
    if (errors[name]) {
      setErrors({ ...errors, ...validate(nextValues), [name]: validate(nextValues)[name] })
    }
  }

  function handleBlur(event) {
    const fieldErrors = validate(values)
    const fieldName = event.target.name
    setErrors((currentErrors) => ({ ...currentErrors, [fieldName]: fieldErrors[fieldName] }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
  }

  return (
    <section className="login-page" aria-labelledby="login-heading">
      <div className="login-intro">
        <div className="login-brand-mark" aria-hidden="true">
          <LayoutGrid size={28} strokeWidth={2} />
        </div>
        <p className="eyebrow">Welcome to</p>
        <h1>MARKETGRID</h1>
        <p className="login-tagline">One Marketplace. Multiple Vendors. Smarter Commerce.</p>

        <div className="marketplace-visual" aria-hidden="true">
          <div className="marketplace-grid">
            {Array.from({ length: 9 }, (_, index) => (
              <span className={`marketplace-tile tile-${index + 1}`} key={index}>
                {index === 4 && <Store size={20} strokeWidth={2} />}
              </span>
            ))}
          </div>
          <span className="visual-line visual-line-one" />
          <span className="visual-line visual-line-two" />
        </div>
      </div>

      <div className="login-card card">
        <div className="login-card-heading">
          <p className="eyebrow">Account access</p>
          <h2 id="login-heading">Sign in to MarketGrid</h2>
          <p>Manage your marketplace activity from one place.</p>
        </div>

        <form className="login-form" noValidate onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              className={`input${errors.email ? ' input-error' : ''}`}
              id="email"
              name="email"
              type="email"
              value={values.email}
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error" id="email-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              className={`input${errors.password ? ' input-error' : ''}`}
              id="password"
              name="password"
              type="password"
              value={values.password}
              autoComplete="current-password"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={Boolean(errors.password)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && <span className="form-error" id="password-error">{errors.password}</span>}
          </div>

          <div className="login-options">
            <label className="remember-option">
              <input name="remember" type="checkbox" checked={values.remember} onChange={handleChange} />
              <span className="checkbox-icon" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
              <span>Remember me</span>
            </label>
            <Link className="text-link" to="/forgot-password">Forgot Password?</Link>
          </div>

          <button className="button button-primary login-submit" type="submit">Sign In</button>
        </form>

        <div className="login-card-footer">
          <p>Don't have an account?</p>
          <Link className="text-link" to="/register">Create Account <ArrowRight size={15} aria-hidden="true" /></Link>
          <Link className="vendor-link" to="/vendor-register"><Store size={16} aria-hidden="true" /> Register as Vendor</Link>
        </div>
      </div>
    </section>
  )
}

export default LoginPage