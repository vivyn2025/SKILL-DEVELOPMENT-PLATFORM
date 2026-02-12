import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }) {
  const navigate = useNavigate()

  return (
    <div className="app-shell">
      <aside className="sidebar glass-panel">
        <div className="brand">SkillPlatform</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button className="nav-item" onClick={() => navigate('/dashboard')}>
            <span>📊</span> Dashboard
          </button>
          <button className="nav-item" onClick={() => navigate('/admin')}>
            <span>✨</span> Create Course
          </button>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--glass-border)' }}>
          <button className="nav-item" onClick={() => navigate('/')}>
            <span>🏠</span> Home
          </button>
        </div>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
