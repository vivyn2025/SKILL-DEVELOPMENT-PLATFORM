import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth'
import Dashboard from './components/Dashboard'
import CourseDetail from './components/CourseDetail'
import CoursePlayer from './components/CoursePlayer'
import Admin from './components/Admin'
import Layout from './components/Layout'
import Onboarding from './components/Onboarding'
import LandingPage from './components/LandingPage'

export default function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'))
  const [user, setUser] = React.useState(null)
  const API_BASE = import.meta.env.VITE_API || 'http://localhost:4000'

  React.useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/api/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(d => { if (!d.error) setUser(d); else { setToken(null); localStorage.removeItem('token'); } })
        .catch(() => { setUser(null); setToken(null); localStorage.removeItem('token'); })
    }
  }, [token])

  function onLogin(token) { setToken(token); localStorage.setItem('token', token); }
  function onLogout() { setToken(null); setUser(null); localStorage.removeItem('token'); }

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Auth onLogin={onLogin} mode="login" />} />
      <Route path="/signup" element={token ? <Navigate to="/dashboard" replace /> : <Auth onLogin={onLogin} mode="register" />} />

      <Route path="/dashboard" element={token ? <Layout><Dashboard token={token} user={user} onLogout={onLogout} /></Layout> : <Navigate to="/login" replace />} />
      <Route path="/course/:id" element={token ? <Layout><CourseDetail token={token} /></Layout> : <Navigate to="/login" replace />} />
      <Route path="/player/:id" element={token ? <Layout><CoursePlayer token={token} /></Layout> : <Navigate to="/login" replace />} />
      <Route path="/onboarding" element={token ? <Layout><Onboarding token={token} /></Layout> : <Navigate to="/login" replace />} />
      <Route path="/admin" element={token ? <Layout><Admin token={token} /></Layout> : <Navigate to="/login" replace />} />
    </Routes>
  )
}
