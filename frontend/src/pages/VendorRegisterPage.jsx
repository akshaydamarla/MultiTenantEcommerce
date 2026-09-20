import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '../components/Logo'
import {
  loginUser,
  registerUser,
  saveAuthData,
} from '../services/authService'
import api from '../services/api'
import './VendorRegisterPage.css'

function VendorRegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')

    const validationError =
      validateVendorForm(formData)

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)

      await registerVendorUser(formData)

      const loginResponse = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      })

      saveAuthData(loginResponse)

      await createVendorProfile(formData)

      navigate('/vendor')
    } catch (error) {
      console.error(
        'Vendor registration failed:',
        error,
      )

      setError(
        error.response?.data?.message ||
          error.response?.data ||
          'Unable to create vendor account.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="vendor-register-page">
      <div className="vendor-register-container">
        <VendorRegisterHeader />

        <VendorRegisterForm
          formData={formData}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          loading={loading}
          error={error}
          onChange={handleChange}
          onTogglePassword={() =>
            setShowPassword((current) => !current)
          }
          onToggleConfirmPassword={() =>
            setShowConfirmPassword(
              (current) => !current,
            )
          }
          onSubmit={handleSubmit}
        />

        <VendorLoginLink />
      </div>
    </main>
  )
}

function VendorRegisterHeader() {
  return (
    <div className="vendor-register-header">
      <Logo />

      <p className="vendor-register-eyebrow">
        SELL ON MARKETGRID
      </p>

      <h1>Create your vendor account</h1>

      <p>
        Register your business and start selling
        products on MarketGrid.
      </p>
    </div>
  )
}

function VendorRegisterForm({
  formData,
  showPassword,
  showConfirmPassword,
  loading,
  error,
  onChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
}) {
  return (
    <form
      className="vendor-register-form"
      onSubmit={onSubmit}
    >
      <FormField
        label="Business name"
        name="businessName"
        value={formData.businessName}
        placeholder="Enter your business name"
        onChange={onChange}
      />

      <FormField
        label="Business email"
        name="email"
        type="email"
        value={formData.email}
        placeholder="Enter your business email"
        onChange={onChange}
      />

      <FormField
        label="Contact number"
        name="contactNumber"
        type="tel"
        value={formData.contactNumber}
        placeholder="Enter your contact number"
        onChange={onChange}
      />

      <PasswordField
        label="Password"
        name="password"
        value={formData.password}
        placeholder="Create a password"
        showPassword={showPassword}
        onChange={onChange}
        onTogglePassword={onTogglePassword}
      />

      <PasswordField
        label="Confirm password"
        name="confirmPassword"
        value={formData.confirmPassword}
        placeholder="Confirm your password"
        showPassword={showConfirmPassword}
        onChange={onChange}
        onTogglePassword={onToggleConfirmPassword}
      />

      {error && (
        <p className="vendor-register-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="vendor-register-submit"
        disabled={loading}
      >
        {loading
          ? 'Creating vendor account...'
          : 'Create vendor account'}
      </button>
    </form>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
}) {
  return (
    <label className="vendor-register-field">
      <span>{label}</span>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  )
}

function PasswordField({
  label,
  name,
  value,
  placeholder,
  showPassword,
  onChange,
  onTogglePassword,
}) {
  return (
    <label className="vendor-register-field">
      <span>{label}</span>

      <div className="vendor-password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete="new-password"
        />

        <button
          type="button"
          className="vendor-password-toggle"
          onClick={onTogglePassword}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </label>
  )
}

function VendorLoginLink() {
  return (
    <div className="vendor-login-link">
      Already have an account?{' '}
      <Link to="/login">Sign in</Link>
    </div>
  )
}

function validateVendorForm(formData) {
  if (!formData.businessName.trim()) {
    return 'Please enter your business name.'
  }

  if (!formData.email.trim()) {
    return 'Please enter your business email.'
  }

  if (!formData.contactNumber.trim()) {
    return 'Please enter your contact number.'
  }

  if (formData.password.length < 6) {
    return 'Password must contain at least 6 characters.'
  }

  if (
    formData.password !==
    formData.confirmPassword
  ) {
    return 'Passwords do not match.'
  }

  return ''
}

function registerVendorUser(formData) {
  return registerUser({
    name: formData.businessName.trim(),
    email: formData.email.trim(),
    password: formData.password,
    role: 'VENDOR',
  })
}

function createVendorProfile(formData) {
  return api.post('/vendors', {
    name: formData.businessName.trim(),
    email: formData.email.trim(),
    contactNumber: formData.contactNumber.trim(),
  })
}

export default VendorRegisterPage