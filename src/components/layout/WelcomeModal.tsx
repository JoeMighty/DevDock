import React, { useState, useEffect } from 'react';
import { Sparkles, X, LayoutDashboard, Terminal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('devdock_welcome');
    if (!hasSeen) {
      // Delay slightly for dramatic entrance
      setTimeout(() => setIsOpen(true), 1000);
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-card border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="relative p-6 sm:p-8">
              <button onClick={close} className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-foreground bg-muted/20 hover:bg-muted/50 rounded-full transition"><X className="w-4 h-4"/></button>
              
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Welcome to DevDock</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your brand new, lightning-fast developer toolkit. Stop relying on slow, ad-ridden web apps for your daily workflow. Everything here runs instantly and beautifully in your browser.
              </p>

              <div className="space-y-4 mb-8">
                 <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">7 Essential Tools built-in</div>
                      <div className="text-xs text-muted-foreground">From API testing to generating schema diagrams.</div>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Light & Dark Modes</div>
                      <div className="text-xs text-muted-foreground">Toggle the theme using the icon in the top right.</div>
                    </div>
                 </div>
              </div>

              <button onClick={close} className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                Get Started <LayoutDashboard className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
