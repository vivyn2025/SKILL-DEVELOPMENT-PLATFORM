import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

export function EndSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: '#050508' }}
    >
      {/* Top gradient separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }}
      />

      {/* CTA block */}
      <div className="relative px-6 py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(139,92,246,0.1) 0%, transparent 65%)',
          }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.25)',
              color: '#A78BFA',
              letterSpacing: '0.15em',
            }}
          >
            Begin Your Journey
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.4rem, 7vw, 5rem)',
              fontWeight: 700,
              color: '#F8FAFC',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
              maxWidth: '700px',
            }}
          >
            Your Skills.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your Future.
            </span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            variants={itemVariants}
            style={{
              color: '#64748B',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              maxWidth: '420px',
              marginBottom: '2.5rem',
            }}
          >
            Join thousands of professionals who've used Luminary to level up, land better roles, and build lasting confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-24">
            <Link
              to="/register"
              className="flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 group"
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                color: '#fff',
                boxShadow: '0 0 32px rgba(139,92,246,0.4)',
                letterSpacing: '0.02em',
              }}
            >
              Create Free Account
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="px-9 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/10"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94A3B8',
              }}
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Full footer */}
      <div
        className="border-t px-6 py-16"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            {/* Brand column */}
            <div>
              <div
                className="font-bold text-xl mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
              >
                Luminary
              </div>
              <p style={{ color: '#334155', fontSize: '0.82rem', lineHeight: 1.7, maxWidth: '220px' }}>
                AI-powered skill intelligence platform for the modern tech professional.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-4 mt-5">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="transition-colors duration-200 hover:text-slate-300"
                    style={{ color: '#334155' }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map(({ title, links }) => (
              <div key={title}>
                <div
                  style={{
                    color: '#F8FAFC',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  {title}
                </div>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-xs transition-colors duration-200 hover:text-slate-400"
                        style={{ color: '#334155' }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.05)' }}
          >
            <p style={{ color: '#1E293B', fontSize: '0.75rem' }}>
              © {new Date().getFullYear()} Luminary. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.6)' }}
              />
              <span style={{ color: '#1E293B', fontSize: '0.72rem' }}>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
