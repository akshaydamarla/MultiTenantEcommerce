import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout