import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, children, className }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('glass rounded-2xl p-6', className)}
    >
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}
