import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from './context/AuthContext'

import { Login, Navbar, Register } from './components'

import { Home, Dashboard } from './pages'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-900 text-gray-100">
          <Navbar />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </div>
        <ToastContainer />
      </AuthProvider>
    </Router>
  )
}

export default App