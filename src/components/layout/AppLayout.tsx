import React from 'react';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="h-14 border-b border-border flex items-center px-4 bg-card/50 backdrop-blur-sm z-10 w-full shrink-0">
          <div className="font-semibold text-sm">DevDock</div>
          <div className="ml-auto flex items-center gap-2">
            {/* Topbar controls */}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-muted/20 relative w-full h-full max-w-full truncate-none">
          <div className="mx-auto max-w-6xl h-full pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
