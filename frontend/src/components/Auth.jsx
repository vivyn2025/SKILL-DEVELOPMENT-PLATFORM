import React from 'react'

const API_BASE = import.meta.env.VITE_API || 'http://localhost:4000'

export default function Auth({ onLogin, mode: initialMode = 'login' }) {
  const [mode, setMode] = React.useState(initialMode)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const d = await res.json()
      if (res.ok && d.token) {
        onLogin(d.token)
      } else {
        setError(d.error || 'Authentication failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="circle-bg" style={{ top: '10%', left: '10%' }}></div>
      <div className="circle-bg" style={{ bottom: '10%', right: '10%', background: 'linear-gradient(45deg, #ec4899, #8b5cf6)' }}></div>

      <div className="auth-card glass-panel">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>{mode === 'login' ? 'Welcome Back' : 'Join Us'}</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {mode === 'login' ? 'Enter your credentials to access your account' : 'Start your learning journey today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div style={{ padding: 12, background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: 8, fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: 8 }} disabled={loading}>
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(null); }}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  )
}
