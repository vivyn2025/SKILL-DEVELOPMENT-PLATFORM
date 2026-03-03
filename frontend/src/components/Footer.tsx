import { Zap, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  Platform: [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Assessments', to: '/assessment/1' },
    { label: 'Gap Analysis', to: '/gap-analysis' },
    { label: 'Learning Path', to: '/learning-path' },
  ],
  Resources: [
    { label: 'Documentation', to: '#' },
    { label: 'API Reference', to: '#' },
    { label: 'Support Center', to: '#' },
    { label: 'Community', to: '#' },
  ],
  Company: [
    { label: 'About Us', to: '#' },
    { label: 'Blog', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Contact', to: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Cookie Policy', to: '#' },
  ],
};

const socials = [
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-['Space_Grotesk']">Luminary</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Assess. Analyze. Achieve. Your AI‑powered platform for personalized skill development and career growth.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-md transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 font-['Space_Grotesk']">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Luminary. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for learners worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
