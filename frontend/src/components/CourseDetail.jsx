import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API || 'http://localhost:4000';

export default function CourseDetail({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/courses/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) navigate('/dashboard');
        else setCourse(d);
        setLoading(false);
      })
      .catch(() => {
        navigate('/dashboard');
      });
  }, [id, navigate]);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  if (!course) return null;

  const totalLessons = course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 0;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <button onClick={() => navigate('/dashboard')} className="btn-ghost" style={{ marginBottom: 24 }}>
        &larr; Back to Dashboard
      </button>

      <div className="glass-panel" style={{ padding: 40, borderRadius: 24, marginBottom: 40, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(15, 23, 42, 0.6))' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 16px 0', fontWeight: 800, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{course.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '80%', lineHeight: 1.6 }}>{course.description}</p>

        <div style={{ marginTop: 32, display: 'flex', gap: 24, alignItems: 'center' }}>
          <button
            className="btn-primary"
            onClick={() => navigate(`/player/${id}`)}
            style={{ padding: '14px 32px', fontSize: '1.1rem' }}
          >
            Start Learning
          </button>
          <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)' }}>
            <span>📚 {course.modules?.length || 0} Modules</span>
            <span>📝 {totalLessons} Lessons</span>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: 24, fontWeight: 600 }}>Course Content</h2>

      <div className="module-list">
        {course.modules?.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No content yet.</p>}

        {course.modules?.map((mod, idx) => (
          <div key={mod.id} className="module-item glass-panel">
            <div className="module-header">
              <span style={{ color: 'var(--accent)', marginRight: 8 }}>0{idx + 1}</span>
              {mod.title}
            </div>
            <div>
              {mod.lessons.map((lesson, lIdx) => (
                <div key={lesson.id} className="lesson-item">
                  <span className="lesson-icon">{lesson.type === 'video' ? '📺' : '📄'}</span>
                  <span>{lesson.title}</span>
                  {lesson.duration && <span style={{ marginLeft: 'auto', fontSize: '0.85rem' }}>{Math.floor(lesson.duration / 60)}m</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
