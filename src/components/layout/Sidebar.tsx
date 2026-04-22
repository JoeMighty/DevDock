import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileJson, Clock, GitCommit, Network, Paintbrush, Database, Key, Regex, FileCode2, Palette, FileEdit, Hash, Code2, DatabaseZap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const TOOLS = [
  { name: 'JSON to Table', path: '/tools/json-to-table', icon: FileJson },
  { name: 'API Tester', path: '/tools/api-tester', icon: Network },
  { name: 'HTML to JSX', path: '/tools/html-to-jsx', icon: Code2 },
  { name: 'Mock Data Gen', path: '/tools/mock-data', icon: DatabaseZap },
  { name: 'Markdown Editor', path: '/tools/markdown', icon: FileEdit },
  { name: 'Hash & UUID', path: '/tools/hash', icon: Hash },
  { name: 'JWT Decoder', path: '/tools/jwt', icon: Key },
  { name: 'Regex Tester', path: '/tools/regex', icon: Regex },
  { name: 'Cron Gen', path: '/tools/cron', icon: Clock },
  { name: 'Encoder/Decoder', path: '/tools/encoder', icon: FileCode2 },
  { name: 'Color Checker', path: '/tools/color', icon: Palette },
  { name: 'Changelog Gen', path: '/tools/changelog', icon: GitCommit },
  { name: 'CSS Gen', path: '/tools/css-gen', icon: Paintbrush },
  { name: 'Schema Designer', path: '/tools/schema', icon: Database },
  { name: 'Sitemap Gen', path: '/tools/sitemap', icon: Network },
  { name: 'Uptime Monitor', path: '/tools/uptime', icon: Clock },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border/40 bg-background/30 backdrop-blur-xl h-full flex-shrink-0 flex flex-col pt-6 overflow-y-auto shadow-2xl z-20">
      <div className="px-6 pb-6 border-b border-border/40 mb-6">
        <Link to="/" className="flex items-center gap-3 font-extrabold text-2xl text-white tracking-tight hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-br from-primary to-purple-600 p-2 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          DevDock
        </Link>
      </div>
      
      <div className="px-4">
        <div className="text-xs font-bold text-muted-foreground/80 mb-3 px-3 uppercase tracking-widest">
          Toolkit
        </div>
        <nav className="flex flex-col gap-1.5">
          {TOOLS.map((tool) => {
            const isActive = location.pathname === tool.path;
            const Icon = tool.icon;
            
            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group overflow-hidden"
              >
                {isActive && (
                    <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg -z-10" />
                )}
                {!isActive && (
                    <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/30 transition-colors rounded-lg -z-10" />
                )}
                
                <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                <span className={cn("transition-colors", isActive ? "text-white font-semibold" : "text-muted-foreground group-hover:text-white")}>{tool.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
