import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileJson, Clock, GitCommit, Network, Paintbrush, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TOOLS = [
  { name: 'JSON to Table', path: '/tools/json-to-table', icon: FileJson },
  { name: 'API Tester', path: '/tools/api-tester', icon: Network },
  { name: 'Changelog Gen', path: '/tools/changelog', icon: GitCommit },
  { name: 'CSS Gen', path: '/tools/css-gen', icon: Paintbrush },
  { name: 'Schema Designer', path: '/tools/schema', icon: Database },
  { name: 'Sitemap Gen', path: '/tools/sitemap', icon: Network },
  { name: 'Uptime Monitor', path: '/tools/uptime', icon: Clock },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-card h-full flex-shrink-0 flex flex-col pt-4 overflow-y-auto">
      <div className="px-4 pb-4 border-b border-border mb-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="bg-primary/10 p-1.5 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-primary" />
          </div>
          DevDock
        </Link>
      </div>
      
      <div className="px-3">
        <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">
          Tools
        </div>
        <nav className="flex flex-col gap-1">
          {TOOLS.map((tool) => {
            const isActive = location.pathname === tool.path;
            const Icon = tool.icon;
            
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                {tool.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
