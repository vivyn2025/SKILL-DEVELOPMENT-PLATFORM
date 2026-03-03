import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Star { x: number; y: number; opacity: number }

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 2000,
    y: Math.random() * 2000,
    opacity: Math.random() * 0.6 + 0.25,
  }));
}

function makeBoxShadow(stars: Star[], size: number): string {
  return stars
    .map(s => `${s.x}px ${s.y}px 0 ${size * 0.5}px rgba(255,255,255,${s.opacity})`)
    .join(', ');
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  const { small, medium, large } = useMemo(
    () => ({ small: generateStars(140), medium: generateStars(45), large: generateStars(18) }),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden cin-vignette"
      style={{ background: '#050508' }}
    >
      {/* Starfield */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: starsY, willChange: 'transform' }}
      >
        {/* Layer 1 – tiny */}
        <div
          className="absolute"
          style={{
            top: '-500px', left: '-500px',
            width: '1px', height: '1px',
            background: 'transparent',
            borderRadius: '50%',
            boxShadow: makeBoxShadow(small, 1),
          }}
        />
        {/* Layer 2 – medium */}
        <div
          className="absolute"
          style={{
            top: '-500px', left: '-500px',
            width: '2px', height: '2px',
            background: 'transparent',
            borderRadius: '50%',
            boxShadow: makeBoxShadow(medium, 2),
          }}
        />
        {/* Layer 3 – large */}
        <div
          className="absolute"
          style={{
            top: '-500px', left: '-500px',
            width: '3px', height: '3px',
            background: 'transparent',
            borderRadius: '50%',
            boxShadow: makeBoxShadow(large, 3),
          }}
        />
      </motion.div>

      {/* Center violet glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '55vh',
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, rgba(34,211,238,0.04) 50%, transparent 75%)',
        }}
      />

      {/* Main content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ y: titleY, opacity: titleOpacity, willChange: 'transform, opacity' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.28)',
            color: '#A78BFA',
            letterSpacing: '0.12em',
          }}
        >
          <Zap size={11} />
          AI-Powered Skill Intelligence
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 6.5rem)',
            fontWeight: 700,
            lineHeight: 1.04,
            color: '#F8FAFC',
            letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
          }}
        >
          Discover
          <span
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #8B5CF6 10%, #22d3ee 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Where You Stand.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: '#94A3B8',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.75,
            maxWidth: '480px',
            marginBottom: '2.75rem',
          }}
        >
          Assess your skills, uncover gaps, and follow a personalized path
          to mastery — powered by AI.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/register"
            className="px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              color: '#fff',
              boxShadow: '0 0 28px rgba(139,92,246,0.38)',
              letterSpacing: '0.02em',
            }}
          >
            Start for Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/10"
            style={{
              background: 'rgba(255,255,255,0.055)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#CBD5E1',
              letterSpacing: '0.02em',
            }}
          >
            Sign In
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ opacity: scrollHintOpacity }}
      >
        <span
          className="uppercase text-xs tracking-widest"
          style={{ color: '#334155', letterSpacing: '0.18em' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} color="#334155" />
        </motion.div>
      </motion.div>
    </section>
  );
}
