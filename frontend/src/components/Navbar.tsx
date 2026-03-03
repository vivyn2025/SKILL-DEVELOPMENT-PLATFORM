import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLanding = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold font-['Space_Grotesk']">Luminary</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
                <Link to="/assessment/1" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Assessments</Link>
                <Link to="/gap-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Gap Analysis</Link>
                <Link to="/learning-path" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Learning Path</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
                )}
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                {isLanding && (
                  <>
                    <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
                    <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
                  </>
                )}
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
                <Link to="/register"><Button size="sm" className="gradient-primary border-0">Get Started</Button></Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Dashboard</Link>
                  <Link to="/assessment/1" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Assessments</Link>
                  <Link to="/gap-analysis" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Gap Analysis</Link>
                  <Link to="/learning-path" onClick={() => setMobileOpen(false)} className="block py-2 text-sm">Learning Path</Link>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => { logout(); setMobileOpen(false); }}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}><Button size="sm" className="w-full gradient-primary border-0">Get Started</Button></Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
