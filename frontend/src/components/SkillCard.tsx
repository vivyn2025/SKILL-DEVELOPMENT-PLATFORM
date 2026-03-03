import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, AlertCircle, Lightbulb, GraduationCap } from 'lucide-react';
import type { Prerequisite } from '@/types';

interface SkillCardProps {
  name: string;
  currentLevel: number;
  targetLevel: number;
  gapPercentage: number;
  severity: 'high' | 'medium' | 'low';
  prerequisites?: Prerequisite[];
}

const severityColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-accent/10 text-accent border-accent/20',
};

const severityBarColors = {
  high: 'bg-destructive',
  medium: 'bg-warning',
  low: 'bg-accent',
};

const importanceConfig = {
  essential: {
    label: 'Essential',
    color: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: AlertCircle,
    dotColor: 'bg-destructive',
  },
  recommended: {
    label: 'Recommended',
    color: 'bg-warning/10 text-warning border-warning/20',
    icon: Lightbulb,
    dotColor: 'bg-warning',
  },
  helpful: {
    label: 'Helpful',
    color: 'bg-accent/10 text-accent border-accent/20',
    icon: BookOpen,
    dotColor: 'bg-emerald-500',
  },
};

export function SkillCard({
  name,
  currentLevel,
  targetLevel,
  gapPercentage,
  severity,
  prerequisites = [],
}: SkillCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasPrereqs = prerequisites.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Main card area — clickable */}
      <div
        onClick={() => hasPrereqs && setExpanded((v) => !v)}
        className={cn(
          'p-5 space-y-4 transition-colors',
          hasPrereqs && 'cursor-pointer hover:bg-primary/[0.03]',
        )}
      >
        <div className="flex items-center justify-between">
          <h4 className="font-semibold font-['Space_Grotesk']">{name}</h4>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn('text-xs capitalize', severityColors[severity])}
            >
              {severity} gap
            </Badge>
            {hasPrereqs && (
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-muted-foreground"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Current: </span>
            <span className="font-semibold">{currentLevel}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Target: </span>
            <span className="font-semibold">{targetLevel}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Gap</span>
            <span>{gapPercentage}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${gapPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn('h-full rounded-full', severityBarColors[severity])}
            />
          </div>
        </div>

        {/* Hint text */}
        {hasPrereqs && !expanded && (
          <p className="text-[11px] text-muted-foreground/60 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            Click to see prerequisite knowledge ({prerequisites.length} topics)
          </p>
        )}
      </div>

      {/* Expandable prerequisites panel */}
      <AnimatePresence>
        {expanded && hasPrereqs && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-5 py-4 space-y-3 bg-secondary/20">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold font-['Space_Grotesk']">
                    Prerequisite Knowledge
                  </h5>
                  <p className="text-[11px] text-muted-foreground">
                    You should be familiar with these before diving into {name}
                  </p>
                </div>
              </div>

              {/* Prerequisite items */}
              <div className="space-y-2">
                {prerequisites.map((prereq, i) => {
                  const config = importanceConfig[prereq.importance];
                  const Icon = config.icon;

                  return (
                    <motion.div
                      key={prereq.topic}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="group rounded-xl p-3 border border-border/40 bg-card/50 hover:bg-card/80 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3">
                        {/* Left dot / icon */}
                        <div className={cn(
                          'mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0',
                          prereq.importance === 'essential' && 'bg-destructive/10',
                          prereq.importance === 'recommended' && 'bg-warning/10',
                          prereq.importance === 'helpful' && 'bg-emerald-500/10',
                        )}>
                          <Icon className={cn(
                            'w-3.5 h-3.5',
                            prereq.importance === 'essential' && 'text-destructive',
                            prereq.importance === 'recommended' && 'text-warning',
                            prereq.importance === 'helpful' && 'text-emerald-500',
                          )} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">{prereq.topic}</span>
                            <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', config.color)}>
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {prereq.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 pt-1">
                {Object.entries(importanceConfig).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dotColor)} />
                    {cfg.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
