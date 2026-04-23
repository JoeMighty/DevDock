import React, { useState, useEffect } from 'react';
import { Sparkles, X, LayoutDashboard, Terminal, CheckCircle2, ShieldCheck, Zap, Code2, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('devdock_welcome');
    if (!hasSeen) {
      setTimeout(() => setIsOpen(true), 1200);
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
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-[550px] bg-card/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_-20px_rgba(139,92,246,0.3)] rounded-2xl overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-primary to-purple-500" />
            
            <div className="relative p-7 sm:p-10">
              <button onClick={close} className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground bg-muted/20 hover:bg-muted/50 rounded-full transition z-10"><X className="w-4 h-4"/></button>
              
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-inner">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              
              <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Welcome to DevDock</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                Your centralized, zero-latency developer toolkit. Stop launching slow, ad-ridden web utilities. Everything here processes instantly—directly inside your browser—with no backend latency.
              </p>

              <div className="space-y-5 mb-8">
                 <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="mt-0.5 p-1.5 bg-green-500/10 rounded-full">
                       <Database className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">25 Specialized Modules</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Featuring advanced payloads like Docker Composers, Markdown Engines, Base64 Encoders, X.509 PEM Extractors, and JSON Diff algorithms.</div>
                    </div>
                 </div>
                 <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="mt-0.5 p-1.5 bg-blue-500/10 rounded-full">
                       <ShieldCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">Cybersecurity Suite</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Leverage Zxcvbn entropy calculators, Bcrypt multi-round hash verifiers, and RegEx-powered PII Log Sanitizers offline.</div>
                    </div>
                 </div>
                 <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="mt-0.5 p-1.5 bg-purple-500/10 rounded-full">
                       <Zap className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">Premium Glassmorphism</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">Built flawlessly on Framer Motion and Tailwind. Toggle native Dark and Light semantic modes in the top right.</div>
                    </div>
                 </div>
              </div>

              <button onClick={close} className="w-full py-3.5 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_0px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                 Launch Console <LayoutDashboard className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
