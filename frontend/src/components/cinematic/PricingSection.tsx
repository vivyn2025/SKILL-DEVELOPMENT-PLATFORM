import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
    {
        name: 'Starter',
        price: 'Free',
        period: '',
        description: 'Perfect for curious learners exploring their skill landscape.',
        color: '#64748B',
        glow: 'rgba(100,116,139,0.2)',
        features: [
            '3 skill assessments / month',
            'Basic gap analysis',
            'Personalized learning path',
            'Community access',
            'Progress dashboard',
        ],
        cta: 'Get Started Free',
        href: '/register',
        highlighted: false,
    },
    {
        name: 'Pro',
        price: '$19',
        period: '/month',
        description: 'For serious professionals accelerating their career growth.',
        color: '#8B5CF6',
        glow: 'rgba(139,92,246,0.3)',
        features: [
            'Unlimited assessments',
            'Advanced AI gap analysis',
            'Adaptive learning paths',
            'Mentor matching',
            'Verified skill badges',
            'Priority support',
            'Interview prep mode',
        ],
        cta: 'Start Pro Trial',
        href: '/register',
        highlighted: true,
    },
    {
        name: 'Team',
        price: '$49',
        period: '/seat/mo',
        description: 'For engineering teams that invest in continuous growth.',
        color: '#22d3ee',
        glow: 'rgba(34,211,238,0.2)',
        features: [
            'Everything in Pro',
            'Team skill dashboard',
            'Manager insights & reports',
            'Bulk assessments',
            'Custom skill domains',
            'SSO & admin controls',
            'Dedicated success manager',
        ],
        cta: 'Contact Sales',
        href: '/register',
        highlighted: false,
    },
];

export function PricingSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-10%' });

    return (
        <section
            ref={ref}
            id="pricing"
            className="relative py-32 px-6 overflow-hidden"
            style={{ background: '#050508' }}
        >
            {/* Ambient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 30%, rgba(139,92,246,0.07) 0%, transparent 65%)',
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
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
                        Simple Pricing
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
                        Invest in yourself.{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #8B5CF6, #22d3ee)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            The ROI is real.
                        </span>
                    </h2>
                    <p
                        className="mt-4"
                        style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.75, maxWidth: '460px', margin: '1rem auto 0' }}
                    >
                        Start free. Upgrade when you're ready. Cancel anytime.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {plans.map(({ name, price, period, description, color, glow, features, cta, href, highlighted }, i) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, y: 36 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            {highlighted && (
                                <div
                                    className="absolute -inset-px rounded-2xl pointer-events-none"
                                    style={{
                                        background: `linear-gradient(135deg, ${color}60, transparent 60%)`,
                                        zIndex: -1,
                                    }}
                                />
                            )}
                            <div
                                className="relative p-7 rounded-2xl h-full flex flex-col"
                                style={{
                                    background: highlighted ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.025)',
                                    border: highlighted ? `1px solid rgba(139,92,246,0.4)` : '1px solid rgba(255,255,255,0.07)',
                                    boxShadow: highlighted ? `0 0 40px ${glow}` : 'none',
                                }}
                            >
                                {highlighted && (
                                    <div
                                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{
                                            background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                                            color: '#fff',
                                            boxShadow: '0 0 16px rgba(139,92,246,0.5)',
                                        }}
                                    >
                                        <Zap size={10} fill="currentColor" /> Most Popular
                                    </div>
                                )}

                                {/* Plan name & price */}
                                <div className="mb-6">
                                    <div style={{ color, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                        {name}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span
                                            style={{
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontSize: '2.8rem',
                                                fontWeight: 700,
                                                color: '#F8FAFC',
                                                lineHeight: 1,
                                            }}
                                        >
                                            {price}
                                        </span>
                                        {period && (
                                            <span style={{ color: '#475569', fontSize: '0.8rem' }}>{period}</span>
                                        )}
                                    </div>
                                    <p style={{ color: '#64748B', fontSize: '0.85rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
                                        {description}
                                    </p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-1">
                                    {features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5">
                                            <div
                                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                                style={{ background: `rgba(${hexToRgb(color)}, 0.15)` }}
                                            >
                                                <Check size={9} style={{ color }} />
                                            </div>
                                            <span style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.5 }}>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link
                                    to={href}
                                    className="block text-center py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                                    style={
                                        highlighted
                                            ? {
                                                background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                                                color: '#fff',
                                                boxShadow: '0 0 24px rgba(139,92,246,0.4)',
                                                letterSpacing: '0.02em',
                                            }
                                            : {
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                color: '#CBD5E1',
                                                letterSpacing: '0.02em',
                                            }
                                    }
                                >
                                    {cta}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Money-back note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-center mt-10"
                    style={{ color: '#334155', fontSize: '0.8rem' }}
                >
                    ✓ No credit card required to start · ✓ 14-day free trial on Pro · ✓ Cancel any time
                </motion.p>
            </div>
        </section>
    );
}

function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
}
