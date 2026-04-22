import React from 'react';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { WelcomeModal } from './WelcomeModal';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full text-foreground overflow-hidden bg-transparent">
      <WelcomeModal />
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        <header className="h-16 border-b border-border/40 flex items-center px-6 bg-background/40 backdrop-blur-md z-10 w-full shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">DevDock</div>
          <div className="ml-auto flex items-center gap-3">
             <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-transparent relative w-full h-full max-w-full truncate-none">
          <div className="mx-auto max-w-6xl h-full pb-10 flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
