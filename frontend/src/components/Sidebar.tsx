import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardCheck, BarChart3, Route, Shield, ChevronLeft, ChevronRight, BookOpen, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const studentLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/assessment/1', icon: ClipboardCheck, label: 'Assessment' },
  { to: '/gap-analysis', icon: BarChart3, label: 'Gap Analysis' },
  { to: '/learning-path', icon: Route, label: 'Learning Path' },
];

const adminLinks = [
  { to: '/admin', icon: Shield, label: 'Admin Panel' },
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const adminLinks = user?.role === 'admin' ? [
    { to: '/admin', icon: Shield, label: 'Admin Panel' },
    { to: '/admin/skills', icon: BookOpen, label: 'Manage Skills' },
    { to: '/admin/assessments', icon: ClipboardCheck, label: 'Manage Assessments' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
  ] : [];

  const allLinks = [...studentLinks, ...adminLinks];

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-16 bottom-0 glass-strong border-r border-border z-40 transition-all duration-300',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      <div className="flex-1 py-4 space-y-1 px-2">
        {allLinks.map((link) => {
          const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'gradient-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </div>
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </aside>
  );
}
