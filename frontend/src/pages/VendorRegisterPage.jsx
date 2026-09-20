import { ArrowRight, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const initialValues = {
  vendorName: '',
  email: '',
  contactNumber: '',
  businessAddress: '',
  password: '',
  confirmPassword: '',
}

function validate(values) {
  const errors = {}

  if (!values.vendorName.trim()) {
    errors.vendorName = 'Vendor name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required.'
  } else if (!/^\+?[\d\s()-]+$/.test(values.contactNumber.trim()) || values.contactNumber.replace(/\D/g, '').length < 7) {
    errors.contactNumber = 'Enter a valid contact number.'
  }

  if (!values.businessAddress.trim()) {
    errors.businessAddress = 'Business address is required.'
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

function VendorRegisterPage() {
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
    <section className="vendor-register-page" aria-labelledby="vendor-register-heading">
      <div className="vendor-register-card card">
        <div className="vendor-register-heading">
          <div className="vendor-register-mark" aria-hidden="true">
            <Store size={23} strokeWidth={2} />
          </div>
          <p className="eyebrow">Vendor partnership</p>
          <h1 id="vendor-register-heading">Register your business</h1>
          <p>Bring your products to more customers with MarketGrid.</p>
        </div>

        <form className="vendor-register-form" noValidate onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="vendorName">Vendor Name</label>
            <input
              className={`input${errors.vendorName ? ' input-error' : ''}`}
              id="vendorName"
              name="vendorName"
              type="text"
              value={values.vendorName}
              autoComplete="organization"
              aria-describedby={errors.vendorName ? 'vendorName-error' : undefined}
              aria-invalid={Boolean(errors.vendorName)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.vendorName && <span className="form-error" id="vendorName-error">{errors.vendorName}</span>}
          </div>

          <div className="vendor-register-fields">
            <div className="form-field">
              <label htmlFor="vendor-email">Email</label>
              <input
                className={`input${errors.email ? ' input-error' : ''}`}
                id="vendor-email"
                name="email"
                type="email"
                value={values.email}
                autoComplete="email"
                aria-describedby={errors.email ? 'vendor-email-error' : undefined}
                aria-invalid={Boolean(errors.email)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && <span className="form-error" id="vendor-email-error">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                className={`input${errors.contactNumber ? ' input-error' : ''}`}
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={values.contactNumber}
                autoComplete="tel"
                aria-describedby={errors.contactNumber ? 'contactNumber-error' : undefined}
                aria-invalid={Boolean(errors.contactNumber)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.contactNumber && <span className="form-error" id="contactNumber-error">{errors.contactNumber}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="businessAddress">Business Address</label>
            <textarea
              className={`textarea${errors.businessAddress ? ' input-error' : ''}`}
              id="businessAddress"
              name="businessAddress"
              value={values.businessAddress}
              autoComplete="street-address"
              aria-describedby={errors.businessAddress ? 'businessAddress-error' : undefined}
              aria-invalid={Boolean(errors.businessAddress)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.businessAddress && <span className="form-error" id="businessAddress-error">{errors.businessAddress}</span>}
          </div>

          <div className="vendor-register-fields">
            <div className="form-field">
              <label htmlFor="vendor-password">Password</label>
              <input
                className={`input${errors.password ? ' input-error' : ''}`}
                id="vendor-password"
                name="password"
                type="password"
                value={values.password}
                autoComplete="new-password"
                aria-describedby={errors.password ? 'vendor-password-error' : undefined}
                aria-invalid={Boolean(errors.password)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.password && <span className="form-error" id="vendor-password-error">{errors.password}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="vendor-confirm-password">Confirm Password</label>
              <input
                className={`input${errors.confirmPassword ? ' input-error' : ''}`}
                id="vendor-confirm-password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                autoComplete="new-password"
                aria-describedby={errors.confirmPassword ? 'vendor-confirm-password-error' : undefined}
                aria-invalid={Boolean(errors.confirmPassword)}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className="form-error" id="vendor-confirm-password-error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button className="button button-primary vendor-register-submit" type="submit">Register as Vendor</button>
        </form>

        <div className="vendor-register-footer">
          <p>Already have an account?</p>
          <Link className="text-link" to="/login">Sign In <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}

export default VendorRegisterPage