import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Target, BarChart2, Sparkles, TrendingUp } from 'lucide-react';

const panels = [
  {
    num: '01',
    Icon: Target,
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.3)',
    title: 'Skill Assessment',
    headline: 'Know Your True Level',
    body: 'Take adaptive assessments across 200+ skill domains. Benchmark yourself against industry standards in real time — not just self-reported ratings.',
    visual: <AssessVisual />,
  },
  {
    num: '02',
    Icon: BarChart2,
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.3)',
    title: 'Gap Analysis',
    headline: 'See Every Gap, Clearly',
    body: 'Visualize exactly where you fall short of your target role. AI-driven comparisons across skills, depth, and real-world application.',
    visual: <GapVisual />,
  },
  {
    num: '03',
    Icon: Sparkles,
    color: '#A78BFA',
    glow: 'rgba(167,139,250,0.3)',
    title: 'AI Learning Path',
    headline: 'Your Roadmap to Mastery',
    body: 'Luminary crafts a fully personalized curriculum — the right courses, projects, and mentors, in the right order, for your exact goals.',
    visual: <PathVisual />,
  },
  {
    num: '04',
    Icon: TrendingUp,
    color: '#10B981',
    glow: 'rgba(16,185,129,0.3)',
    title: 'Progress Tracking',
    headline: 'Watch Yourself Grow',
    body: 'Real-time skill growth dashboards, verified credentials, and milestone badges that employers actually trust.',
    visual: <TrackVisual />,
  },
];

/* ─── Panel visuals ─── */
function AssessVisual() {
  const skills = [92, 74, 58, 85, 67];
  return (
    <div className="flex gap-2 items-end h-24">
      {skills.map((v, i) => (
        <motion.div
          key={i}
          className="rounded-t-md flex-1"
          style={{ background: `rgba(139,92,246,${0.3 + i * 0.1})`, height: `${v}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${v}%` }}
          transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

function GapVisual() {
  const rows = [
    { label: 'Current', pct: 55, color: '#8B5CF6' },
    { label: 'Target', pct: 85, color: 'rgba(139,92,246,0.25)' },
  ];
  return (
    <div className="w-full space-y-3">
      {rows.map(({ label, pct, color }) => (
        <div key={label}>
          <div className="flex justify-between text-xs mb-1" style={{ color: '#475569' }}>
            <span>{label}</span><span>{pct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function PathVisual() {
  const steps = ['Foundations', 'Core', 'Advanced', 'Expert'];
  return (
    <div className="flex items-center gap-2 w-full">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1">
          <motion.div
            className="flex-1 flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1"
              style={{
                background: i < 2 ? 'linear-gradient(135deg, #A78BFA, #7C3AED)' : 'rgba(167,139,250,0.15)',
                border: i === 2 ? '1px solid #A78BFA' : 'none',
                color: i < 2 ? '#fff' : '#A78BFA',
              }}
            >
              {i < 2 ? '✓' : i + 1}
            </div>
            <span className="text-xs text-center" style={{ color: '#475569', fontSize: '10px' }}>{s}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <div className="h-px flex-1 mx-1 mb-5" style={{ background: i < 1 ? '#A78BFA' : 'rgba(255,255,255,0.08)' }} />
          )}
        </div>
      ))}
    </div>
  );
}

function TrackVisual() {
  const points = [20, 35, 30, 55, 50, 72, 68, 88];
  const w = 200; const h = 80;
  const max = 100; const min = 0;
  const pts = points
    .map((v, i) => `${(i / (points.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
        </linearGradient>
      </defs>
      <motion.polyline
        points={pts}
        fill="none"
        stroke="url(#tg)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* ─── Panel dot indicator (extracted to avoid hook-in-map violation) ─── */
function PanelDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;
  const mid1 = start + step * 0.25;
  const mid2 = start + step * 0.75;
  const dotOpacity = useTransform(
    scrollYProgress,
    [start, mid1, mid2, end],
    [0.2, 1, 1, 0.2]
  );
  return (
    <motion.div
      className="rounded-full"
      style={{ width: '6px', height: '6px', background: '#8B5CF6', opacity: dotOpacity }}
    />
  );
}

/* ─── Main feature sequence ─── */
export function FeatureSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 4 panels with dwell time at each panel center
  // Each panel dwells for ~17% of scroll, transitions over ~8%
  const x = useTransform(
    scrollYProgress,
    [0,    0.08, 0.25, 0.33, 0.5,   0.58, 0.75, 0.83, 1.0],
    ['0%', '0%', '-25%', '-25%', '-50%', '-50%', '-75%', '-75%', '-75%']
  );

  return (
    <div ref={containerRef} style={{ height: '480vh', position: 'relative' }}>
      {/* Section label (visible briefly before pinning) */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh', background: '#070710' }}
      >
        {/* Ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)',
          }}
        />

        {/* Horizontal strip */}
        <motion.div
          className="flex h-full"
          style={{ x, width: '400vw', willChange: 'transform' }}
        >
          {panels.map(({ num, Icon, color, glow, title, headline, body, visual }) => (
            <div
              key={num}
              className="relative flex items-center justify-center px-8 md:px-20"
              style={{ width: '100vw', height: '100vh', flexShrink: 0 }}
            >
              {/* Ghost number */}
              <div
                className="absolute select-none pointer-events-none font-black"
                style={{
                  fontSize: 'clamp(8rem, 20vw, 18rem)',
                  color: 'rgba(255,255,255,0.02)',
                  right: '5%',
                  bottom: '5%',
                  fontFamily: "'Space Grotesk', sans-serif",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>

              {/* Card */}
              <div className="relative z-10 max-w-lg w-full">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `rgba(${hexToRgb(color)}, 0.12)`,
                    border: `1px solid rgba(${hexToRgb(color)}, 0.25)`,
                    boxShadow: `0 0 24px ${glow}`,
                  }}
                >
                  <Icon size={24} color={color} />
                </div>

                {/* Category */}
                <div
                  className="text-xs font-medium tracking-widest uppercase mb-3"
                  style={{ color, letterSpacing: '0.18em' }}
                >
                  {title}
                </div>

                {/* Headline */}
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    fontWeight: 700,
                    color: '#F8FAFC',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {headline}
                </h2>

                {/* Body */}
                <p className="mb-8" style={{ color: '#64748B', lineHeight: 1.8, fontSize: '1rem' }}>
                  {body}
                </p>

                {/* Visual widget */}
                <div
                  className="p-5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {visual}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Panel dots indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {panels.map((_, i) => (
            <PanelDot key={i} index={i} total={panels.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
