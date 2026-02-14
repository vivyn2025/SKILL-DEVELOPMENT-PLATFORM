import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { mockLearningSteps } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, Clock, Loader2 } from 'lucide-react';
import { LearningStep } from '@/types';

const priorityColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-accent/10 text-accent border-accent/20',
};

const statusIcons = {
  pending: Clock,
  'in-progress': Loader2,
  completed: Check,
};

const statusCycle: Record<string, LearningStep['status']> = {
  pending: 'in-progress',
  'in-progress': 'completed',
  completed: 'pending',
};

const LearningPath = () => {
  const [steps, setSteps] = useState(mockLearningSteps);
  const completed = steps.filter((s) => s.status === 'completed').length;
  const progressPct = Math.round((completed / steps.length) * 100);

  const toggleStatus = (id: string) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: statusCycle[s.status] } : s
      )
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="pt-20 pb-10 px-4 lg:pl-60 lg:pr-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="text-2xl font-bold font-['Space_Grotesk']">Your Learning Path</h1>
            <p className="text-sm text-muted-foreground">Follow your personalized roadmap to close skill gaps</p>
            <div className="glass rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-bold gradient-text text-lg">{progressPct}%</span>
              </div>
              <Progress value={progressPct} className="h-3 rounded-full" />
              <div className="text-xs text-muted-foreground">{completed} of {steps.length} steps completed</div>
            </div>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-4">
              <AnimatePresence>
                {steps.map((step, i) => {
                  const StatusIcon = statusIcons[step.status];
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative pl-14"
                    >
                      {/* Step indicator */}
                      <button
                        onClick={() => toggleStatus(step.id)}
                        className={cn(
                          'absolute left-3 top-5 w-7 h-7 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300',
                          step.status === 'completed'
                            ? 'bg-accent border-accent text-accent-foreground'
                            : step.status === 'in-progress'
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-card border-border text-muted-foreground'
                        )}
                      >
                        <StatusIcon className={cn('w-3.5 h-3.5', step.status === 'in-progress' && 'animate-spin')} />
                      </button>

                      <div className={cn(
                        'glass rounded-2xl p-5 space-y-3 transition-all duration-300',
                        step.status === 'completed' && 'opacity-70'
                      )}>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className={cn(
                            'font-semibold font-["Space_Grotesk"]',
                            step.status === 'completed' && 'line-through'
                          )}>
                            {step.skillName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={cn('text-xs capitalize', priorityColors[step.priority])}>
                              {step.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs capitalize">
                              {step.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.resources.map((r) => (
                            <span key={r} className="text-xs px-2.5 py-1 rounded-lg bg-secondary text-muted-foreground">{r}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Completion effect */}
          <AnimatePresence>
            {progressPct === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold font-['Space_Grotesk'] gradient-text">All Steps Complete!</h2>
                <p className="text-muted-foreground mt-2">Congratulations on completing your learning path!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default LearningPath;
