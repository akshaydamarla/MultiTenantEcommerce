import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '../components/Logo'
import {
  loginUser,
  saveAuthData,
} from '../services/authService'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
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

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)

      const authResponse = await loginUser(formData)

      saveAuthData(authResponse)

      redirectByRole(authResponse.role, navigate)
    } catch (error) {
      console.error('Login failed:', error)

      setError(
        error.response?.data?.message ||
          'Invalid email or password.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <LoginHeader />

        <LoginForm
          formData={formData}
          showPassword={showPassword}
          loading={loading}
          error={error}
          onChange={handleChange}
          onTogglePassword={() =>
            setShowPassword((current) => !current)
          }
          onSubmit={handleSubmit}
        />

        <RegistrationLinks />
      </div>
    </main>
  )
}

function LoginHeader() {
  return (
    <div className="login-header">
      <Logo />

      <h1>Welcome back</h1>

      <p>
        Sign in to continue to your MarketGrid account.
      </p>
    </div>
  )
}

function LoginForm({
  formData,
  showPassword,
  loading,
  error,
  onChange,
  onTogglePassword,
  onSubmit,
}) {
  return (
    <form
      className="login-form"
      onSubmit={onSubmit}
    >
      <FormField
        label="Email address"
        name="email"
        type="email"
        value={formData.email}
        placeholder="Enter your email"
        onChange={onChange}
      />

      <PasswordField
        value={formData.password}
        showPassword={showPassword}
        onChange={onChange}
        onTogglePassword={onTogglePassword}
      />

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="login-submit"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

function FormField({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
}) {
  return (
    <label className="login-field">
      <span>{label}</span>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="email"
      />
    </label>
  )
}

function PasswordField({
  value,
  showPassword,
  onChange,
  onTogglePassword,
}) {
  return (
    <label className="login-field">
      <span>Password</span>

      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={value}
          placeholder="Enter your password"
          onChange={onChange}
          autoComplete="current-password"
        />

        <button
          type="button"
          className="password-toggle"
          onClick={onTogglePassword}
          aria-label={
            showPassword
              ? 'Hide password'
              : 'Show password'
          }
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

function RegistrationLinks() {
  return (
    <div className="registration-links">
      <p>
        Don't have an account?
      </p>

      <div>
        <Link to="/register">
          Create customer account
        </Link>

        <Link to="/vendor-register">
          Register as a vendor
        </Link>
      </div>
    </div>
  )
}

function redirectByRole(role, navigate) {
  switch (role) {
    case 'CUSTOMER':
      navigate('/customer')
      break

    case 'VENDOR':
      navigate('/vendor')
      break

    case 'ADMIN':
      navigate('/admin')
      break

    default:
      navigate('/')
  }
}

export default LoginPage