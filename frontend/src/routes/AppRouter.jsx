import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import VendorRegisterPage from '../pages/VendorRegisterPage'
import VendorDashboardPage from '../pages/VendorDashboardPage'

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/vendor-register"
          element={<VendorRegisterPage />}
        />

        <Route
          path="/vendor"
          element={<VendorDashboardPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  )
}

export default AppRouter