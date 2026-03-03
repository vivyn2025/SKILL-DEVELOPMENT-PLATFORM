import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { Brain, Code2, Globe, Database, Layers, Shield } from 'lucide-react';

/* ─── Shared text block ─── */
function SceneText({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="text-center max-w-md mt-10">
      <div
        className="text-xs font-medium tracking-widest uppercase mb-3"
        style={{ color: '#8B5CF6', letterSpacing: '0.2em' }}
      >
        Step {step}
      </div>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 700,
          color: '#F8FAFC',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
        }}
      >
        {title}
      </h2>
      <p style={{ color: '#64748B', lineHeight: 1.75, fontSize: '1rem' }}>{description}</p>
    </div>
  );
}

/* ─── Scene A: Assess ─── */
const assessIcons = [
  { Icon: Brain, label: 'Problem Solving', color: '#8B5CF6', glow: 'rgba(139,92,246,0.35)' },
  { Icon: Code2, label: 'Programming', color: '#22d3ee', glow: 'rgba(34,211,238,0.35)' },
  { Icon: Globe, label: 'System Design', color: '#F59E0B', glow: 'rgba(245,158,11,0.35)' },
  { Icon: Database, label: 'Data Structures', color: '#10B981', glow: 'rgba(16,185,129,0.35)' },
  { Icon: Layers, label: 'Architecture', color: '#F472B6', glow: 'rgba(244,114,182,0.35)' },
  { Icon: Shield, label: 'Security', color: '#60A5FA', glow: 'rgba(96,165,250,0.35)' },
];

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function SceneAssess() {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-5 max-w-xs">
        {assessIcons.map(({ Icon, label, color, glow }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `rgba(${hexToRgb(color)}, 0.1)`,
                border: `1px solid rgba(${hexToRgb(color)}, 0.25)`,
                boxShadow: `0 0 20px ${glow}`,
              }}
            >
              <Icon size={22} color={color} />
            </div>
            <span className="text-xs text-center" style={{ color: '#475569' }}>{label}</span>
          </motion.div>
        ))}
      </div>
      <SceneText
        step="01"
        title="Benchmark Your Skills"
        description="Take precise, adaptive assessments built for the modern tech landscape. Know exactly where you stand."
      />
    </div>
  );
}

/* ─── Scene B: Analyze ─── */
const gapData = [
  { skill: 'System Design', current: 42, target: 85 },
  { skill: 'Algorithms', current: 70, target: 92 },
  { skill: 'Leadership', current: 28, target: 70 },
  { skill: 'Cloud Architecture', current: 55, target: 82 },
];

function SceneAnalyze() {
  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <div className="w-full space-y-4">
        {gapData.map(({ skill, current, target }) => (
          <div key={skill}>
            <div className="flex justify-between mb-1">
              <span className="text-xs" style={{ color: '#64748B' }}>{skill}</span>
              <span className="text-xs font-medium" style={{ color: '#8B5CF6' }}>
                {current}% → {target}%
              </span>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {/* Target ghost bar */}
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ width: `${target}%`, background: 'rgba(139,92,246,0.2)' }}
              />
              {/* Current bar */}
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${current}%`,
                  background: 'linear-gradient(90deg, #8B5CF6, #22d3ee)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <SceneText
        step="02"
        title="See Every Gap"
        description="Our AI maps your current abilities against your dream role with pixel-perfect precision. No guesswork."
      />
    </div>
  );
}

/* ─── Scene C: Grow ─── */
const milestones = [
  { title: 'Foundation', subtitle: '8 modules', done: true },
  { title: 'Core Skills', subtitle: '12 modules', done: true },
  { title: 'Advanced', subtitle: '6 modules', active: true },
  { title: 'Expert', subtitle: '10 modules', done: false },
];

function SceneGrow() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        {milestones.map(({ title, subtitle, done, active }, i) => (
          <div key={title} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-2"
                style={{
                  background: done
                    ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)'
                    : active
                    ? 'rgba(139,92,246,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  border: active ? '2px solid #8B5CF6' : done ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  color: done ? '#fff' : active ? '#A78BFA' : '#334155',
                  boxShadow: done
                    ? '0 0 20px rgba(139,92,246,0.4)'
                    : active
                    ? '0 0 15px rgba(139,92,246,0.25)'
                    : 'none',
                }}
              >
                {done ? '✓' : active ? '▶' : i + 1}
              </div>
              <span className="text-xs font-medium" style={{ color: done || active ? '#CBD5E1' : '#334155' }}>
                {title}
              </span>
              <span className="text-xs" style={{ color: '#475569' }}>{subtitle}</span>
            </div>
            {i < milestones.length - 1 && (
              <div
                className="h-px mb-7"
                style={{
                  width: '48px',
                  background: done
                    ? 'linear-gradient(90deg, #8B5CF6, rgba(139,92,246,0.3))'
                    : 'rgba(255,255,255,0.08)',
                }}
              />
            )}
          </div>
        ))}
      </div>
      <SceneText
        step="03"
        title="Follow Your Path"
        description="A personalized learning roadmap with curated courses, projects, and milestones aligned to your ambition."
      />
    </div>
  );
}

/* ─── Main section ─── */
export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const { scrollY } = useScroll();

  // Manual reliable scroll tracking — avoids framer-motion target offset ambiguity
  useEffect(() => {
    return scrollY.on('change', (y) => {
      const el = containerRef.current;
      if (!el) return;
      const elTop = el.offsetTop;
      const elH = el.offsetHeight;
      const vH = window.innerHeight;
      // progress 0 = top of section at top of viewport
      // progress 1 = bottom of section at bottom of viewport
      const p = (y - elTop) / (elH - vH);
      scrollProgress.set(Math.max(0, Math.min(1, p)));
    });
  }, [scrollY, scrollProgress]);

  // Scene A: prominent hold in 0.05–0.3
  const sceneAOpacity = useTransform(scrollProgress, [0, 0.06, 0.28, 0.36], [0, 1, 1, 0]);
  const sceneAY = useTransform(scrollProgress, [0, 0.06, 0.28, 0.36], [30, 0, 0, -30]);

  // Scene B: 0.32–0.64
  const sceneBOpacity = useTransform(scrollProgress, [0.33, 0.4, 0.6, 0.67], [0, 1, 1, 0]);
  const sceneBY = useTransform(scrollProgress, [0.33, 0.4, 0.6, 0.67], [30, 0, 0, -30]);

  // Scene C: 0.65–1.0 (stays on)
  const sceneCOpacity = useTransform(scrollProgress, [0.65, 0.73, 1, 1], [0, 1, 1, 1]);
  const sceneCY = useTransform(scrollProgress, [0.65, 0.73], [30, 0]);

  const progressWidth = useTransform(scrollProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} style={{ height: '320vh', position: 'relative' }}>
      <div
        className="sticky top-0 overflow-hidden flex items-center justify-center"
        style={{ height: '100vh', background: '#050508' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.07) 0%, transparent 65%)',
          }}
        />

        {/* Progress line */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2"
          style={{ width: '120px', height: '1px', background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="h-full"
            style={{ width: progressWidth, background: 'linear-gradient(90deg, #8B5CF6, #22d3ee)' }}
          />
        </div>

        {/* Scene A */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: sceneAOpacity, y: sceneAY, willChange: 'transform, opacity' }}
        >
          <SceneAssess />
        </motion.div>

        {/* Scene B */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: sceneBOpacity, y: sceneBY, willChange: 'transform, opacity' }}
        >
          <SceneAnalyze />
        </motion.div>

        {/* Scene C */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ opacity: sceneCOpacity, y: sceneCY, willChange: 'transform, opacity' }}
        >
          <SceneGrow />
        </motion.div>
      </div>
    </div>
  );
}
