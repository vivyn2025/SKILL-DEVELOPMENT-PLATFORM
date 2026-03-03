import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Star, Globe } from 'lucide-react';

const metrics = [
    { icon: Users, value: '12,500+', label: 'Active Learners', color: '#8B5CF6', glow: 'rgba(139,92,246,0.3)' },
    { icon: Star, value: '350+', label: 'Skill Domains', color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
    { icon: TrendingUp, value: '94%', label: 'Career Improvement', color: '#10B981', glow: 'rgba(16,185,129,0.3)' },
    { icon: Globe, value: '45+', label: 'Countries Worldwide', color: '#22d3ee', glow: 'rgba(34,211,238,0.3)' },
];

const companies = [
    'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple',
    'Netflix', 'Stripe', 'Shopify', 'OpenAI', 'Airbnb',
];

export function MetricsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-10%' });

    return (
        <section
            ref={ref}
            className="relative py-24 px-6 overflow-hidden"
            style={{ background: '#050508' }}
        >
            {/* Top separator */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)' }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Trusted by label */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <p
                        style={{ color: '#334155', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}
                    >
                        Trusted by engineers from
                    </p>
                </motion.div>

                {/* Company names marquee-style */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-20"
                >
                    {companies.map((name, i) => (
                        <motion.span
                            key={name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                color: '#1E293B',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {name}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Divider */}
                <div
                    className="h-px w-full mb-20"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
                />

                {/* Metric cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {metrics.map(({ icon: Icon, value, label, color, glow }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 28 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group"
                        >
                            <div
                                className="p-6 rounded-2xl text-center transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.025)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${color}20`;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4"
                                    style={{
                                        background: `rgba(${hexToRgb(color)}, 0.12)`,
                                        border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
                                        boxShadow: `0 0 16px ${glow}`,
                                    }}
                                >
                                    <Icon size={18} style={{ color }} />
                                </div>

                                {/* Value */}
                                <div
                                    style={{
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: '2rem',
                                        fontWeight: 700,
                                        color: '#F8FAFC',
                                        lineHeight: 1,
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {value}
                                </div>

                                {/* Label */}
                                <div style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.4 }}>
                                    {label}
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
