import React, { useState, useEffect } from 'react';
import { X, LayoutDashboard, ShieldCheck, Zap, Link2, Brain, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { version } from '../../../package.json';

const STATS = [
  { value: '61', label: 'Tools' },
  { value: '100%', label: 'Offline' },
  { value: '0ms', label: 'Latency' },
  { value: '6', label: 'Categories' },
];

const FEATURES = [
  {
    icon: LayoutDashboard,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20',
    iconColor: 'text-blue-400',
    title: '46 Specialized Modules',
    desc: 'SQL, Docker, JSON, QR, JWT, Regex, YAML, CSV, Markdown, ENV, Conventional Commits — all client-side.',
  },
  {
    icon: ShieldCheck,
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/20',
    iconColor: 'text-purple-400',
    title: 'Full Security Suite',
    desc: 'Bcrypt verifier, JWT decoder, PEM parser, CIDR calc, log sanitizer, password entropy — all fully offline.',
  },
  {
    icon: Link2,
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/20',
    iconColor: 'text-green-400',
    title: 'Companion Tool Network',
    desc: 'Tools suggest related utilities contextually — curl → API Tester, Semver → Changelog, Hash → Bcrypt and more.',
  },
  {
    icon: Brain,
    color: 'from-orange-500/20 to-amber-500/20 border-orange-500/20',
    iconColor: 'text-orange-400',
    title: 'Remembers Your Preferences',
    desc: 'Colors, regex patterns, QR styles, OTP secrets — all saved locally. Clear anytime with the sidebar button.',
  },
];

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('devdock_welcome');
    if (!hasSeen) {
      setTimeout(() => setIsOpen(true), 900);
    }
  }, []);

  const close = () => {
    setIsOpen(false);
    localStorage.setItem('devdock_welcome', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.93, x: '-50%', y: '-44%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.93, x: '-50%', y: '-44%' }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[560px] bg-card/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_-20px_rgba(139,92,246,0.4)] rounded-2xl overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500 via-primary to-purple-500" />

            {/* Glowing orb behind icon */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative p-7 sm:p-9">
              <button onClick={close} className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground bg-muted/20 hover:bg-muted/50 rounded-full transition z-10">
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-extrabold tracking-tight">DevDock</h2>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">v{version}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">Your zero-latency, offline developer toolkit.</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {STATS.map(s => (
                  <div key={s.label} className="bg-muted/30 border border-border/50 rounded-xl p-3 text-center">
                    <div className="text-xl font-black text-foreground">{s.value}</div>
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Feature list */}
              <div className="flex flex-col gap-2.5 mb-6">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className={`flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r border ${f.color} hover:brightness-110 transition-all`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <Icon className={`w-4 h-4 ${f.iconColor}`} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{f.title}</div>
                        <div className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">{f.desc}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Clear memory note */}
              <div className="flex items-center gap-2 px-3 py-2 mb-5 rounded-lg bg-muted/20 border border-border/30 text-[11px] text-muted-foreground">
                <Trash2 className="w-3 h-3 flex-shrink-0" />
                Preferences are saved locally. Use <span className="font-bold text-foreground mx-0.5">Clear saved memory</span> in the sidebar to reset anytime.
              </div>

              {/* CTA */}
              <button
                onClick={close}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_45px_0px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
              >
                Launch Console <LayoutDashboard className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
