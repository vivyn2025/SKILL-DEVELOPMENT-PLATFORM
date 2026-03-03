import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, Eye, EyeOff, CheckCircle2, XCircle, ShieldCheck, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const passwordRules = [
  { label: 'At least 6 characters', test: (p: string) => p.length >= 6 },
  { label: 'One uppercase letter (A-Z)', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One special character (!@#$...)', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const ruleResults = useMemo(
    () => passwordRules.map((r) => ({ ...r, pass: r.test(password) })),
    [password],
  );
  const allPassed = ruleResults.every((r) => r.pass);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (!allPassed) {
      toast({ title: 'Password does not meet requirements', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast({ title: 'Account created successfully!' });
      navigate('/dashboard');
    } catch {
      toast({ title: 'Registration failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md glass rounded-2xl p-8 space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-['Space_Grotesk']">Create your account</h1>
            <p className="text-sm text-muted-foreground">Start your skill development journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="register-name">Full Name</Label>
              <Input
                id="register-name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Password with toggle */}
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!passwordTouched) setPasswordTouched(true);
                  }}
                  className="rounded-xl pr-11"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <AnimatePresence>
              {passwordTouched && password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="rounded-xl p-3 space-y-2"
                    style={{
                      background: allPassed
                        ? 'rgba(34,197,94,0.08)'
                        : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${allPassed ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {allPassed ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span className="text-xs font-medium text-muted-foreground">
                        Password Requirements
                      </span>
                    </div>
                    {ruleResults.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -6, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-center gap-2"
                      >
                        {r.pass ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        )}
                        <span
                          className={`text-xs transition-colors ${r.pass ? 'text-green-400' : 'text-muted-foreground'
                            }`}
                        >
                          {r.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full gradient-primary border-0 rounded-xl h-11"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
