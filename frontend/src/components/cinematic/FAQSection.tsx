import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: 'How does the skill assessment work?',
        a: 'Our adaptive assessments use AI to dynamically adjust question difficulty based on your responses. Each assessment covers real-world scenarios, not just theory. You get a precise skill level score (not just "beginner/intermediate/expert") with a detailed breakdown by sub-topic.',
    },
    {
        q: 'How accurate is the gap analysis?',
        a: "Extremely accurate. Our AI compares your skill profile against role requirements from thousands of real job listings across top tech companies. It identifies not just what's missing, but the exact depth and application level needed — so you're never over-preparing or under-preparing.",
    },
    {
        q: 'How is the learning path personalized?',
        a: "Your learning path is generated uniquely for you based on your current skill levels, target role, time availability, and preferred learning style. It adapts as you progress — if you master a topic faster than expected, your path rebalances automatically.",
    },
    {
        q: 'Can I use Luminary to prepare for FAANG interviews?',
        a: 'Absolutely. Many of our users have used Luminary to successfully land roles at Google, Meta, Amazon, Apple, Netflix, and other top companies. The platform covers system design, algorithms, behavioral skills, and domain-specific knowledge.',
    },
    {
        q: 'Is my data private and secure?',
        a: 'Yes. Your skill data, assessments, and progress are private by default. We never share your individual data with employers or third parties without your explicit consent. We use industry-standard encryption for all data at rest and in transit.',
    },
    {
        q: 'Can teams use Luminary together?',
        a: "Yes! Our Team plan gives managers a centralized dashboard to view aggregate team skill health, identify knowledge gaps across the organization, and plan targeted training. You can also benchmark your team against industry standards.",
    },
    {
        q: 'How long does it take to see real results?',
        a: "Most users report meaningful improvement in their weak areas within 4–8 weeks of following their personalized path. The key is consistency — even 30 minutes per day following your Luminary roadmap compounds quickly.",
    },
];

function FAQItem({ q, a, index, inView }: { q: string; a: string; index: number; inView: boolean }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left p-5 rounded-xl flex items-start justify-between gap-4 transition-all duration-200"
                style={{
                    background: open ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.025)',
                    border: open ? '1px solid rgba(139,92,246,0.25)' : '1px solid rgba(255,255,255,0.07)',
                }}
            >
                <span
                    style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        color: open ? '#F8FAFC' : '#CBD5E1',
                        fontSize: '0.95rem',
                        lineHeight: 1.5,
                        flex: 1,
                    }}
                >
                    {q}
                </span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 mt-1"
                >
                    <ChevronDown size={16} style={{ color: open ? '#8B5CF6' : '#475569' }} />
                </motion.div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div
                            className="px-5 pt-3 pb-5"
                            style={{
                                color: '#64748B',
                                fontSize: '0.88rem',
                                lineHeight: 1.8,
                            }}
                        >
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-10%' });

    return (
        <section
            ref={ref}
            id="faq"
            className="relative py-32 px-6 overflow-hidden"
            style={{ background: '#070710' }}
        >
            {/* Top separator */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)' }}
            />

            <div className="relative z-10 max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
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
                        FAQ
                    </div>
                    <h2
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 700,
                            color: '#F8FAFC',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Everything you need to know
                    </h2>
                    <p
                        className="mt-4"
                        style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.75 }}
                    >
                        Still have questions? Reach out to our team — we respond within 2 hours.
                    </p>
                </motion.div>

                {/* FAQ list */}
                <div className="space-y-3">
                    {faqs.map(({ q, a }, i) => (
                        <FAQItem key={q} q={q} a={a} index={i} inView={inView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
