import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { SkillCard } from '@/components/SkillCard';
import { mockGapSkills } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GapAnalysis = () => {
  const highGap = mockGapSkills.filter((s) => s.severity === 'high');
  const medGap = mockGapSkills.filter((s) => s.severity === 'medium');
  const lowGap = mockGapSkills.filter((s) => s.severity === 'low');

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-['Space_Grotesk']">Skill Gap Analysis</h1>
              <p className="text-sm text-muted-foreground">Identify and bridge your skill gaps</p>
            </div>
            <Link to="/learning-path">
              <Button className="gradient-primary border-0 rounded-xl">
                Generate Learning Path <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>

          {highGap.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-destructive mb-3">🔴 HIGH GAP</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {highGap.map((s) => <SkillCard key={s.id} {...s} />)}
              </div>
            </section>
          )}

          {medGap.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-warning mb-3">🟡 MEDIUM GAP</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {medGap.map((s) => <SkillCard key={s.id} {...s} />)}
              </div>
            </section>
          )}

          {lowGap.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-accent mb-3">🟢 LOW GAP</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowGap.map((s) => <SkillCard key={s.id} {...s} />)}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default GapAnalysis;
