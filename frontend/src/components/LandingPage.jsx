import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="brand">SkillPlatform</div>
                <div className="nav-links">
                    <button className="ghost" onClick={() => navigate('/login')}>Login</button>
                    <button className="primary" onClick={() => navigate('/signup')}>Get Started</button>
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Master New Skills <br /> <span className="highlight">at Your Own Pace</span></h1>
                    <p className="hero-subtitle">
                        Unlock your potential with our expert-led courses.
                        Learn anytime, anywhere, and advance your career today.
                    </p>
                    <div className="hero-cta">
                        <button className="primary large" onClick={() => navigate('/signup')}>Start Learning Now</button>
                        <button className="ghost large" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
                            Explore Features
                        </button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <div className="icon">🚀</div>
                        <div>
                            <div className="label">Growth</div>
                            <div className="value">+120%</div>
                        </div>
                    </div>
                    <div className="floating-card card-2">
                        <div className="icon">🎓</div>
                        <div>
                            <div className="label">Certified</div>
                            <div className="value">Pro</div>
                        </div>
                    </div>
                    <div className="circle-bg"></div>
                </div>
            </header>

            <section id="features" className="features-section">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast Learning</h3>
                        <p>Bite-sized lessons designed for maximum retention in minimum time.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌍</div>
                        <h3>Global Community</h3>
                        <p>Connect with learners from around the world and share your progress.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🏆</div>
                        <h3>Earn Certificates</h3>
                        <p>Showcase your achievements with verifiable certificates upon completion.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <h2 className="section-title">What Learners Say</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <p>"This platform changed my career path. The courses are practical and easy to follow."</p>
                        <div className="user-info">
                            <div className="avatar">JD</div>
                            <div>
                                <div className="name">John Doe</div>
                                <div className="role">Software Engineer</div>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p>"I love the flexibility. I can learn whenever I have free time on my phone."</p>
                        <div className="user-info">
                            <div className="avatar">AS</div>
                            <div>
                                <div className="name">Alice Smith</div>
                                <div className="role">Product Designer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <div className="footer-content">
                    <div>
                        <div className="brand">SkillPlatform</div>
                        <p>© 2024 SkillPlatform. All rights reserved.</p>
                    </div>
                    <div className="footer-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
