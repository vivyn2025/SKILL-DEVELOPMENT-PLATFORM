import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Target, BarChart3, Route, ArrowRight, CheckCircle, Search, Sparkles } from 'lucide-react';

const features = [
  { icon: Target, title: 'Skill Assessment', description: 'Take adaptive assessments to measure your proficiency across multiple skill domains.' },
  { icon: BarChart3, title: 'Gap Analysis', description: 'Visualize the gap between your current skills and industry-required targets.' },
  { icon: Route, title: 'Learning Path', description: 'Get AI-curated, prioritized learning roadmaps tailored to your career goals.' },
];

const steps = [
  { icon: CheckCircle, title: 'Assess Your Skills', description: 'Complete targeted assessments to benchmark your current abilities.' },
  { icon: Search, title: 'Identify Gaps', description: 'Our engine analyzes your results against industry standards.' },
  { icon: Sparkles, title: 'Follow Your Path', description: 'Get a personalized learning roadmap and track your progress.' },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>AI-Powered Skill Development</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-['Space_Grotesk'] leading-tight text-balance">
              Assess. Analyze.{' '}
              <span className="gradient-text">Achieve.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Discover your skill gaps, follow personalized learning paths, and track your growth with powerful analytics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="gradient-primary border-0 text-base px-8 h-12 rounded-xl shadow-lg">
                  Get Started Free <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-base px-8 h-12 rounded-xl">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-3">Everything You Need</h2>
            <p className="text-muted-foreground">Comprehensive tools for your skill development journey</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 space-y-4 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold font-['Space_Grotesk']">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] mb-3">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to accelerate your growth</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto shadow-lg">
                  <s.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-sm font-semibold text-primary">Step {i + 1}</div>
                <h3 className="text-lg font-semibold font-['Space_Grotesk']">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
