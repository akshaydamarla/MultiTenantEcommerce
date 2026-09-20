import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import CustomerHomePage from '../pages/CustomerHomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import RoutePlaceholderPage from '../pages/RoutePlaceholderPage'
import VendorRegisterPage from '../pages/VendorRegisterPage'

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate replace to="/customer" />} />
        <Route path="/customer" element={<CustomerHomePage />} />
        <Route path="/customer/products" element={<RoutePlaceholderPage title="Products" description="The full product catalog will be available here soon." />} />
        <Route path="/customer/cart" element={<RoutePlaceholderPage title="Your Cart" description="Your selected products will appear here." />} />
        <Route path="/customer/orders" element={<RoutePlaceholderPage title="Your Orders" description="Your marketplace orders will appear here." />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/vendor-register" element={<VendorRegisterPage />} />
        <Route path="*" element={<RoutePlaceholderPage title="Page not found" description="The page you requested is not available." />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
