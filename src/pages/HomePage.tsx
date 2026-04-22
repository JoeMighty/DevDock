import React from 'react';
import { TOOLS } from '@/components/layout/Sidebar';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to DevDock</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Your centralized, fast-loading toolkit for daily development tasks. 
          Everything runs instantly right here in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link 
              key={tool.path} 
              to={tool.path}
              className="group flex flex-col p-5 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
              <div className="mt-auto pt-4 flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                Open Tool <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
