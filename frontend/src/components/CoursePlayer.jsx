import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API || 'http://localhost:4000';

export default function CoursePlayer({ token }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [progressMap, setProgressMap] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        fetchCourseDetails();
        fetchProgress();
    }, [id, token]);

    const fetchCourseDetails = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setCourse(data);
            if (data.modules?.length > 0 && data.modules[0].lessons?.length > 0) {
                setActiveLesson(data.modules[0].lessons[0]);
            }
        } catch (err) {
            console.error(err);
            navigate('/dashboard');
        }
    };

    const fetchProgress = async () => {
        try {
            const res = await fetch(`${API_BASE}/api/progress/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            const map = {};
            data.forEach(p => map[p.lesson_id] = p.completed_at);
            setProgressMap(map);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleComplete = async (lessonId) => {
        const isCompleted = !!progressMap[lessonId];
        try {
            await fetch(`${API_BASE}/api/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    lessonId,
                    completed: !isCompleted
                })
            });

            setProgressMap(prev => {
                const next = { ...prev };
                if (isCompleted) delete next[lessonId];
                else next[lessonId] = new Date().toISOString();
                return next;
            });
        } catch (err) {
            console.error('Failed to update progress', err);
        }
    };

    if (!course) return <div style={{ padding: 40, textAlign: 'center' }}>Loading Course...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
            {/* Player Header */}
            <div className="glass-panel" style={{ padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button onClick={() => navigate(`/course/${id}`)} className="btn-ghost" style={{ padding: '8px 12px' }}>&larr; Exit</button>
                    <span style={{ fontWeight: 600 }}>{course.title}</span>
                </div>
                <button className="btn-ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                </button>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Main Content (Video) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: '#000' }}>
                    {activeLesson ? (
                        <>
                            {activeLesson.type === 'video' && activeLesson.contentUrl ? (
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', minHeight: 400 }}>
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={activeLesson.contentUrl.replace('watch?v=', 'embed/')}
                                        title={activeLesson.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ maxWidth: '100%', maxHeight: '100%', aspectRatio: '16/9' }}
                                    ></iframe>
                                </div>
                            ) : (
                                <div style={{ padding: 40, flex: 1, overflowY: 'auto' }}>
                                    <div className="glass-panel" style={{ padding: 32, borderRadius: 16 }}>
                                        <h1>{activeLesson.title}</h1>
                                        {activeLesson.contentText && (
                                            <div style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', color: 'var(--text-muted)' }}>
                                                {activeLesson.contentText}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Lesson Controls (below video) */}
                            <div className="glass-panel" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 0, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', background: 'var(--bg-dark)' }}>
                                <h3 style={{ margin: 0 }}>{activeLesson.title}</h3>
                                <button
                                    onClick={() => toggleComplete(activeLesson.id)}
                                    className={progressMap[activeLesson.id] ? "btn-ghost" : "btn-primary"}
                                    style={progressMap[activeLesson.id] ? { color: '#4ade80', borderColor: '#4ade80' } : {}}
                                >
                                    {progressMap[activeLesson.id] ? '✓ Completed' : 'Mark Complete'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>
                            Select a lesson to start.
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{
                    width: sidebarOpen ? 320 : 0,
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                    background: 'var(--bg-darker)',
                    borderLeft: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ padding: 20, borderBottom: '1px solid var(--glass-border)', fontWeight: 600 }}>
                        Course Content
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {course.modules.map((module, idx) => (
                            <div key={module.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.02)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                                    MODULE {idx + 1}: {module.title.toUpperCase()}
                                </div>
                                <div>
                                    {module.lessons.map(lesson => (
                                        <div
                                            key={lesson.id}
                                            onClick={() => setActiveLesson(lesson)}
                                            style={{
                                                padding: '12px 20px',
                                                cursor: 'pointer',
                                                borderLeft: activeLesson?.id === lesson.id ? '3px solid var(--accent)' : '3px solid transparent',
                                                background: activeLesson?.id === lesson.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 10,
                                                fontSize: '0.9rem'
                                            }}
                                            className="player-lesson-item"
                                        >
                                            <span style={{ opacity: 0.7 }}>{lesson.type === 'video' ? '📺' : '📄'}</span>
                                            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lesson.title}</span>
                                            {progressMap[lesson.id] && <span style={{ color: '#4ade80' }}>✓</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
