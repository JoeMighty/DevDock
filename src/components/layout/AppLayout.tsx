import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from './ThemeToggle';
import { WelcomeModal } from './WelcomeModal';
import { Menu, X } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen w-full text-foreground overflow-hidden bg-transparent relative">
      <WelcomeModal />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        <header className="h-16 border-b border-border/40 flex items-center px-4 md:px-6 bg-background/40 backdrop-blur-md z-[40] w-full shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 mr-2 text-muted-foreground hover:text-foreground lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link to="/" className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 hover:opacity-80 transition-opacity">
            DevDock
          </Link>
          <div className="ml-auto flex items-center gap-3">
             <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-transparent relative w-full h-full max-w-full">
          <div className="mx-auto max-w-6xl h-full pb-10 flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
