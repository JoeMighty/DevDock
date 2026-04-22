import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileJson, Clock, GitCommit, Network, Paintbrush, Database, Key, Regex, FileCode2, Palette, FileEdit, Hash, Code2, DatabaseZap, ShieldCheck, ShieldAlert, Shield, ShieldHalf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const TOOLS = [
  // Data & Text
  { name: 'JSON to Table', path: '/tools/json-to-table', icon: FileJson, category: 'Data & Text' },
  { name: 'HTML to JSX', path: '/tools/html-to-jsx', icon: Code2, category: 'Data & Text' },
  { name: 'Mock Data Gen', path: '/tools/mock-data', icon: DatabaseZap, category: 'Data & Text' },
  { name: 'Markdown Editor', path: '/tools/markdown', icon: FileEdit, category: 'Data & Text' },
  { name: 'Encoder/Decoder', path: '/tools/encoder', icon: FileCode2, category: 'Data & Text' },
  // Web & Network
  { name: 'API Tester', path: '/tools/api-tester', icon: Network, category: 'Web & Network' },
  { name: 'Sitemap Gen', path: '/tools/sitemap', icon: Network, category: 'Web & Network' },
  { name: 'Uptime Monitor', path: '/tools/uptime', icon: Clock, category: 'Web & Network' },
  { name: 'Cron Gen', path: '/tools/cron', icon: Clock, category: 'Web & Network' },
  // Dev Tools
  { name: 'Regex Tester', path: '/tools/regex', icon: Regex, category: 'Dev Tools' },
  { name: 'Changelog Gen', path: '/tools/changelog', icon: GitCommit, category: 'Dev Tools' },
  { name: 'Schema Designer', path: '/tools/schema', icon: Database, category: 'Dev Tools' },
  // Security
  { name: 'JWT Decoder', path: '/tools/jwt', icon: Key, category: 'Security' },
  { name: 'Hash & UUID', path: '/tools/hash', icon: Hash, category: 'Security' },
  { name: 'Password Analyzer', path: '/tools/password', icon: ShieldCheck, category: 'Security' },
  { name: 'Log Sanitizer', path: '/tools/sanitizer', icon: ShieldAlert, category: 'Security' },
  { name: 'CIDR Calculator', path: '/tools/cidr', icon: Shield, category: 'Security' },
  { name: 'PEM Decoder', path: '/tools/pem', icon: ShieldHalf, category: 'Security' },
  // Design & CSS
  { name: 'Color Checker', path: '/tools/color', icon: Palette, category: 'Design & CSS' },
  { name: 'CSS Gen', path: '/tools/css-gen', icon: Paintbrush, category: 'Design & CSS' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border/40 bg-background/30 backdrop-blur-xl h-full flex-shrink-0 flex flex-col pt-6 overflow-y-auto shadow-2xl z-20">
      <div className="px-6 pb-6 border-b border-border/40 mb-6">
        <Link to="/" className="flex items-center gap-3 font-extrabold text-2xl text-foreground tracking-tight hover:opacity-80 transition-opacity">
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
                
                <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary flex-shrink-0" : "text-muted-foreground group-hover:text-foreground flex-shrink-0")} />
                <span className={cn("transition-colors truncate", isActive ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground")}>{tool.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
