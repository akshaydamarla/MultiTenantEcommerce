import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '../components/Logo'
import { registerUser } from '../services/authService'
import './RegisterPage.css'

function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    setSuccess('')

    const validationError =
      validateRegistrationForm(formData)

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)

      const userData = createCustomerPayload(formData)

      await registerUser(userData)

      setSuccess(
        'Account created successfully. Redirecting to login...',
      )

      setTimeout(() => {
        navigate('/login')
      }, 1200)
    } catch (error) {
      console.error(
        'Registration failed:',
        error,
      )

      setError(
        error.response?.data?.message ||
          error.response?.data ||
          'Unable to create your account. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="register-page">
      <div className="register-container">
        <RegisterHeader />

        <RegisterForm
          formData={formData}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          loading={loading}
          error={error}
          success={success}
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

        <LoginLink />
      </div>
    </main>
  )
}

function RegisterHeader() {
  return (
    <div className="register-header">
      <Logo />

      <h1>Create your account</h1>

      <p>
        Join MarketGrid and start shopping from
        multiple vendors.
      </p>
    </div>
  )
}

function RegisterForm({
  formData,
  showPassword,
  showConfirmPassword,
  loading,
  error,
  success,
  onChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
}) {
  return (
    <form
      className="register-form"
      onSubmit={onSubmit}
    >
      <div className="register-name-row">
        <FormField
          label="First name"
          name="firstName"
          value={formData.firstName}
          placeholder="First name"
          onChange={onChange}
        />

        <FormField
          label="Last name"
          name="lastName"
          value={formData.lastName}
          placeholder="Last name"
          onChange={onChange}
        />
      </div>

      <FormField
        label="Email address"
        name="email"
        type="email"
        value={formData.email}
        placeholder="Enter your email"
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
        <p className="register-message register-error">
          {error}
        </p>
      )}

      {success && (
        <p className="register-message register-success">
          {success}
        </p>
      )}

      <button
        type="submit"
        className="register-submit"
        disabled={loading}
      >
        {loading
          ? 'Creating account...'
          : 'Create account'}
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
    <label className="register-field">
      <span>{label}</span>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={
          name === 'email'
            ? 'email'
            : 'off'
        }
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
    <label className="register-field">
      <span>{label}</span>

      <div className="register-password-wrapper">
        <input
          type={
            showPassword
              ? 'text'
              : 'password'
          }
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={
            name === 'password'
              ? 'new-password'
              : 'new-password'
          }
        />

        <button
          type="button"
          className="register-password-toggle"
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

function LoginLink() {
  return (
    <div className="register-login-link">
      <span>Already have an account?</span>{' '}
      <Link to="/login">Sign in</Link>
    </div>
  )
}

function validateRegistrationForm(formData) {
  if (
    !formData.firstName.trim() ||
    !formData.lastName.trim()
  ) {
    return 'Please enter your first and last name.'
  }

  if (!formData.email.trim()) {
    return 'Please enter your email address.'
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

function createCustomerPayload(formData) {
  return {
    name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
    email: formData.email.trim(),
    password: formData.password,
    role: 'CUSTOMER',
  }
}

export default RegisterPage