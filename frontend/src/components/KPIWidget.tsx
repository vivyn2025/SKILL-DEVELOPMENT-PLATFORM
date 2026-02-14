import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KPIWidgetProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  className?: string;
}

export function KPIWidget({ label, value, icon: Icon, trend, className }: KPIWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('glass rounded-2xl p-5 space-y-3', className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold font-['Space_Grotesk']">{value}</span>
        {trend !== undefined && (
          <span className={cn('text-sm font-medium pb-1', trend >= 0 ? 'text-accent' : 'text-destructive')}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </motion.div>
  );
}
