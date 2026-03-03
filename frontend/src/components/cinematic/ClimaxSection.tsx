import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ClimaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1.4]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.35, 0.1]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: '100vh',
        background: '#050508',
      }}
    >
      {/* Pulsing radial glow */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
          scale: glowScale,
          opacity: glowOpacity,
          willChange: 'transform, opacity',
        }}
      />

      {/* Outer glow ring */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '75vw',
          height: '75vw',
          maxWidth: '900px',
          maxHeight: '900px',
          border: '1px solid rgba(139,92,246,0.12)',
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ scale, opacity, willChange: 'transform, opacity' }}
      >
        {/* Eyebrow line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div
            className="h-px"
            style={{ width: lineWidth, background: 'linear-gradient(90deg, transparent, #8B5CF6)' }}
          />
          <span
            className="text-xs font-medium tracking-widest uppercase whitespace-nowrap"
            style={{ color: '#8B5CF6', letterSpacing: '0.22em' }}
          >
            The Moment of Change
          </span>
          <motion.div
            className="h-px"
            style={{ width: lineWidth, background: 'linear-gradient(90deg, #8B5CF6, transparent)' }}
          />
        </div>

        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.8rem, 9vw, 7rem)',
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: '#F8FAFC',
            marginBottom: '1.5rem',
          }}
        >
          The Gap Is{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Closing.
          </span>
        </h2>

        <p
          style={{
            color: '#64748B',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            lineHeight: 1.75,
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          Every day you don't know your gaps is a day you can't close them.
          Start now. The path is clear.
        </p>
      </motion.div>

      {/* Bottom edge fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #050508)',
        }}
      />
    </section>
  );
}
