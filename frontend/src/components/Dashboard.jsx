import React from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API || 'http://localhost:4000'

export default function Dashboard({ token, user, onLogout }) {
  const [courses, setCourses] = React.useState([])
  const [progress, setProgress] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    fetch(`${API_BASE}/api/courses`).then(r => r.json()).then(d => setCourses(d)).catch(() => setCourses([]))
    fetch(`${API_BASE}/api/progress`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setProgress(d)).catch(() => setProgress([]))
  }, [token])

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif' }}>
      <header className="dashboard-header">
        <h1 className="welcome-text">Welcome back, {user?.email?.split('@')[0]}! 👋</h1>
        <p className="date-text">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </header>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Available Courses</h2>
          <button className="btn-ghost" onClick={() => navigate('/admin')}>+ New Course</button>
        </div>

        <div className="course-grid">
          {courses.map(c => (
            <div key={c.id} className="course-card glass-panel" onClick={() => navigate(`/course/${c.id}`)} style={{ cursor: 'pointer' }}>
              <div className="course-image">
                {['🚀', '💻', '🎨', '📈'][c.id % 4]}
              </div>
              <div className="course-content">
                <h3 className="course-title">{c.title}</h3>
                <p className="course-desc">{c.description || 'Master this skill with our comprehensive course.'}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.modules ? c.modules.length : 0} Modules</span>
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>View Course</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
