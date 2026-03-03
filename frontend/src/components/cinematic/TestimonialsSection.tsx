import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Senior Software Engineer',
        company: 'Google',
        avatar: 'SC',
        color: '#8B5CF6',
        stars: 5,
        text: 'Luminary identified gaps in my system design knowledge that I never knew existed. Within 3 months I aced my FAANG interview.',
    },
    {
        name: 'Marcus Williams',
        role: 'Tech Lead',
        company: 'Stripe',
        avatar: 'MW',
        color: '#22d3ee',
        stars: 5,
        text: 'The AI-generated learning path was eerily accurate. It knew exactly which concepts I needed to master before my promotion review.',
    },
    {
        name: 'Priya Patel',
        role: 'Full-Stack Developer',
        company: 'Shopify',
        avatar: 'PP',
        color: '#10B981',
        stars: 5,
        text: 'I went from a mid-level dev to a staff engineer in 9 months. The gap analysis was the turning point — pure signal, zero noise.',
    },
    {
        name: 'Alex Kim',
        role: 'Data Scientist',
        company: 'OpenAI',
        avatar: 'AK',
        color: '#F59E0B',
        stars: 5,
        text: 'Every platform claims to personalize learning. Luminary actually does it. The assessments are rigorous and the path feels hand-crafted.',
    },
    {
        name: 'Jordan Lee',
        role: 'Cloud Architect',
        company: 'AWS',
        avatar: 'JL',
        color: '#F472B6',
        stars: 5,
        text: "I spotted three critical blind spots in my cloud knowledge. Fixed them in 6 weeks and landed a 40% salary increase. Worth every minute.",
    },
    {
        name: 'Raj Mehta',
        role: 'Engineering Manager',
        company: 'Meta',
        avatar: 'RM',
        color: '#60A5FA',
        stars: 5,
        text: "I now use Luminary to benchmark my entire team. It's transformed how we run quarterly skill reviews — data-driven, not just guesswork.",
    },
];

export function TestimonialsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-10%' });

    return (
        <section
            ref={ref}
            className="relative py-32 px-6 overflow-hidden"
            style={{ background: '#070710' }}
        >
            {/* Top separator */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }}
            />

            {/* Ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div
                        className="inline-block text-xs font-medium tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
                        style={{
                            background: 'rgba(139,92,246,0.1)',
                            border: '1px solid rgba(139,92,246,0.25)',
                            color: '#A78BFA',
                            letterSpacing: '0.18em',
                        }}
                    >
                        Trusted by Professionals
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            color: '#F8FAFC',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Real people.{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #8B5CF6, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Real results.
                        </span>
                    </h2>
                    <p
                        className="mt-4"
                        style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.75, maxWidth: '480px', margin: '1rem auto 0' }}
                    >
                        Join over 12,000 engineers and tech professionals who've already transformed their careers.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map(({ name, role, company, avatar, color, stars, text }, i) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, y: 32 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group"
                        >
                            <div
                                className="h-full p-6 rounded-2xl transition-all duration-300 group-hover:border-opacity-50"
                                style={{
                                    background: 'rgba(255,255,255,0.025)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    backdropFilter: 'blur(10px)',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color}15`;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                            >
                                {/* Quote icon */}
                                <Quote size={20} style={{ color, opacity: 0.5, marginBottom: '1rem' }} />

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: stars }).map((_, si) => (
                                        <Star key={si} size={12} fill={color} style={{ color }} />
                                    ))}
                                </div>

                                {/* Text */}
                                <p style={{ color: '#94A3B8', lineHeight: 1.75, fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                                    "{text}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                        style={{
                                            background: `rgba(${hexToRgb(color)}, 0.15)`,
                                            border: `1px solid rgba(${hexToRgb(color)}, 0.3)`,
                                            color,
                                        }}
                                    >
                                        {avatar}
                                    </div>
                                    <div>
                                        <div style={{ color: '#F8FAFC', fontWeight: 600, fontSize: '0.88rem' }}>{name}</div>
                                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>
                                            {role} · {company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom separator */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)' }}
            />
        </section>
    );
}

function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
}
