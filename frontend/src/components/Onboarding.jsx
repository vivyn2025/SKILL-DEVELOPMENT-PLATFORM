import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API || 'http://localhost:4000';

export default function Onboarding({ token }) {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: [selectedTags] }
    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/api/onboarding/questions`)
            .then(r => r.json())
            .then(d => { setQuestions(d); setLoading(false); })
            .catch(e => { console.error(e); setLoading(false); });
    }, []);

    const handleAnswer = (qid, tags) => {
        setAnswers({ ...answers, [qid]: tags });
    };

    const nextStep = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            submit();
        }
    };

    const submit = async () => {
        // Collect all tags
        const allTags = new Set();
        Object.values(answers).forEach(tags => tags.forEach(t => allTags.add(t)));

        try {
            const res = await fetch(`${API_BASE}/api/onboarding/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ tags: Array.from(allTags) })
            });
            const data = await res.json();
            setRecommendations(data.recommended || []);
        } catch (e) {
            console.error(e);
            navigate('/dashboard');
        }
    };

    const finish = () => navigate('/dashboard');

    if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Loading Assessment...</div>;
    if (!questions || !questions.length) {
        if (!recommendations) return <div style={{ padding: 40 }}>No questions found. <button onClick={finish}>Go to Dashboard</button></div>;
    }

    // Recommendations View
    if (recommendations) {
        return (
            <div style={{ minHeight: '100vh', padding: 40, fontFamily: 'sans-serif', backgroundColor: '#f5f7fa' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: 20, color: '#333', textAlign: 'center' }}>Your Recommended Learning Path</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: 40, textAlign: 'center' }}>Based on your interests, we think you'll love these courses:</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 30 }}>
                        {recommendations.map(c => (
                            <div key={c.id} style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}>
                                <div style={{ height: 140, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
                                <div style={{ padding: 24 }}>
                                    <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold', color: '#667eea', marginBottom: 8 }}>{c.category}</div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 10px 0', color: '#2d3748' }}>{c.title}</h3>
                                    <p style={{ color: '#718096', fontSize: '1rem', lineHeight: 1.5, marginBottom: 20 }}>{c.description}</p>
                                    <button onClick={() => navigate(`/course/${c.id}`)} style={{ width: '100%', padding: '12px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>
                                        View Course
                                    </button>
                                </div>
                            </div>
                        ))}
                        {recommendations.length === 0 && <p style={{ textAlign: 'center', width: '100%' }}>No specific recommendations, but feel free to browse our library!</p>}
                    </div>

                    <div style={{ marginTop: 50, textAlign: 'center' }}>
                        <button onClick={finish} style={{ padding: '12px 24px', backgroundColor: 'transparent', border: '2px solid #cbd5e0', borderRadius: 6, color: '#4a5568', fontWeight: 'bold', cursor: 'pointer' }}>
                            Skip to full Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Question View
    const q = questions[currentStep];
    const selectedForCurrent = answers[q.id];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8', fontFamily: 'sans-serif' }}>
            <div style={{ backgroundColor: 'white', padding: 50, borderRadius: 20, boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: 600 }}>
                <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between', color: '#cbd5e0', fontWeight: 'bold' }}>
                    <span>Question {currentStep + 1} of {questions.length}</span>
                    <span>{Math.round(((currentStep) / questions.length) * 100)}% completed</span>
                </div>

                <h2 style={{ fontSize: '2rem', marginBottom: 40, color: '#2d3748', lineHeight: 1.3 }}>{q.text}</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginBottom: 40 }}>
                    {q.options.map((opt, i) => {
                        const isSelected = selectedForCurrent === opt.tags;

                        return (
                            <button
                                key={i}
                                onClick={() => handleAnswer(q.id, opt.tags)}
                                style={{
                                    padding: '20px 25px',
                                    textAlign: 'left',
                                    border: isSelected ? '2px solid #667eea' : '2px solid #e2e8f0',
                                    backgroundColor: isSelected ? '#ebf4ff' : 'white',
                                    borderRadius: 10,
                                    fontSize: '1.2rem',
                                    fontWeight: '500',
                                    color: isSelected ? '#5a67d8' : '#4a5568',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {opt.text}
                            </button>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {currentStep > 0 && (
                        <button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            style={{ padding: '16px 24px', backgroundColor: 'transparent', color: '#718096', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
                        >
                            Back
                        </button>
                    )}
                    <button
                        disabled={!answers[q.id]}
                        onClick={nextStep}
                        style={{
                            flex: 1,
                            marginLeft: currentStep > 0 ? 20 : 0,
                            padding: '16px',
                            backgroundColor: !answers[q.id] ? '#cbd5e0' : '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: 10,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: !answers[q.id] ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {currentStep === questions.length - 1 ? 'Find My Path' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
}
