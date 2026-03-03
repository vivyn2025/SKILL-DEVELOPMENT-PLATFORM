import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GrainOverlay } from '@/components/cinematic/GrainOverlay';
import { ScrollProgress } from '@/components/cinematic/ScrollProgress';
import { HeroSection } from '@/components/cinematic/HeroSection';
import { StorySection } from '@/components/cinematic/StorySection';
import { FeatureSequence } from '@/components/cinematic/FeatureSequence';
import { ClimaxSection } from '@/components/cinematic/ClimaxSection';
import { MetricsSection } from '@/components/cinematic/MetricsSection';
import { TestimonialsSection } from '@/components/cinematic/TestimonialsSection';
import { PricingSection } from '@/components/cinematic/PricingSection';
import { FAQSection } from '@/components/cinematic/FAQSection';
import { EndSection } from '@/components/cinematic/EndSection';

/* ─── Minimal transparent nav ─── */
function CinematicNav() {
  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(5,5,8,0)', 'rgba(5,5,8,0.88)']
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between"
      style={{
        background: navBg,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0)',
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-bold text-xl tracking-tight select-none"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}
      >
        Luminary
      </motion.div>

      {/* Nav links (center) */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex items-center gap-8"
      >
        {[
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: '#64748B' }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#94A3B8')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = '#64748B')}
          >
            {label}
          </a>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-4"
      >
        <Link
          to="/login"
          className="text-sm font-medium transition-colors duration-200 hidden sm:block"
          style={{ color: '#64748B' }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = '#94A3B8')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = '#64748B')}
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(139,92,246,0.15)',
            border: '1px solid rgba(139,92,246,0.35)',
            color: '#A78BFA',
          }}
        >
          Get Started
        </Link>
      </motion.div>
    </motion.nav>
  );
}

/* ─── Page ─── */
export default function Index() {
  // Force dark cinematic background on the document while this page is mounted
  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevOverflow = document.documentElement.style.overflowX;
    document.body.style.background = '#050508';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.background = prevBg;
      document.documentElement.style.overflowX = prevOverflow;
    };
  }, []);

  return (
    <div
      className="cinematic-page"
      style={{ background: '#050508', minHeight: '100vh', overflowX: 'hidden' }}
    >
      {/* Global overlays */}
      <GrainOverlay />
      <ScrollProgress />

      {/* Nav */}
      <CinematicNav />

      {/* Sections */}
      <HeroSection />
      <MetricsSection />
      <div id="features">
        <StorySection />
        <FeatureSequence />
      </div>
      <ClimaxSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <EndSection />
    </div>
  );
}
