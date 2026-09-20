import { ArrowRight, LayoutGrid } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

function validate(values) {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!/^\+?[\d\s()-]+$/.test(values.phone.trim()) || values.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

function RegisterPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }

    setValues(nextValues)
    if (errors[name]) {
      const nextErrors = validate(nextValues)
      setErrors((currentErrors) => ({ ...currentErrors, [name]: nextErrors[name] }))
    }
  }

  function handleBlur(event) {
    const fieldName = event.target.name
    const fieldErrors = validate(values)
    setErrors((currentErrors) => ({ ...currentErrors, [fieldName]: fieldErrors[fieldName] }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setErrors(validate(values))
  }

  return (
    <section className="register-page" aria-labelledby="register-heading">
      <div className="register-card card">
        <div className="register-card-heading">
          <div className="register-brand-mark" aria-hidden="true">
            <LayoutGrid size={22} strokeWidth={2} />
          </div>
          <p className="eyebrow">Join MarketGrid</p>
          <h1 id="register-heading">Create your account</h1>
          <p>Start shopping from multiple vendors in one place.</p>
        </div>

        <form className="register-form" noValidate onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              className={`input${errors.fullName ? ' input-error' : ''}`}
              id="fullName"
              name="fullName"
              type="text"
              value={values.fullName}
              autoComplete="name"
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              aria-invalid={Boolean(errors.fullName)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.fullName && <span className="form-error" id="fullName-error">{errors.fullName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="register-email">Email</label>
            <input
              className={`input${errors.email ? ' input-error' : ''}`}
              id="register-email"
              name="email"
              type="email"
              value={values.email}
              autoComplete="email"
              aria-describedby={errors.email ? 'register-email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error" id="register-email-error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              className={`input${errors.phone ? ' input-error' : ''}`}
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              autoComplete="tel"
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              aria-invalid={Boolean(errors.phone)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.phone && <span className="form-error" id="phone-error">{errors.phone}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="register-password">Password</label>
            <input
              className={`input${errors.password ? ' input-error' : ''}`}
              id="register-password"
              name="password"
              type="password"
              value={values.password}
              autoComplete="new-password"
              aria-describedby={errors.password ? 'register-password-error' : undefined}
              aria-invalid={Boolean(errors.password)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && <span className="form-error" id="register-password-error">{errors.password}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={`input${errors.confirmPassword ? ' input-error' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              autoComplete="new-password"
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              aria-invalid={Boolean(errors.confirmPassword)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="form-error" id="confirmPassword-error">{errors.confirmPassword}</span>}
          </div>

          <button className="button button-primary register-submit" type="submit">Create Account</button>
        </form>

        <div className="register-card-footer">
          <p>Already have an account?</p>
          <Link className="text-link" to="/login">Sign In <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage