import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  currentLevel: number;
  targetLevel: number;
  gapPercentage: number;
  severity: 'high' | 'medium' | 'low';
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

export function SkillCard({ name, currentLevel, targetLevel, gapPercentage, severity }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="glass rounded-2xl p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-semibold font-['Space_Grotesk']">{name}</h4>
        <Badge variant="outline" className={cn('text-xs capitalize', severityColors[severity])}>
          {severity} gap
        </Badge>
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
    </motion.div>
  );
}
