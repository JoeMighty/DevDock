import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('devdock_theme');
    if (saved) return saved === 'dark';
    return true; // default dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('devdock_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('devdock_theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2.5 rounded-full bg-background/50 border border-border/50 hover:bg-muted text-foreground transition-all duration-300 shadow-sm"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
    </button>
  );
}
