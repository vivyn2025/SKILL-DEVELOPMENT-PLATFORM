import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left"
      style={{
        scaleX,
        height: '2px',
        background: 'linear-gradient(90deg, #8B5CF6, #22d3ee)',
        zIndex: 9999,
        transformOrigin: '0%',
      }}
    />
  );
}
