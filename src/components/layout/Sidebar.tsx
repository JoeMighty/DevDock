import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileJson, Clock, GitCommit, Network, Paintbrush, Database, Key, Regex, FileCode2, Palette, FileEdit, Hash, Code2, DatabaseZap, ShieldCheck, ShieldAlert, Shield, ShieldHalf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.8 5.6 5.6 0 0 0-.1-3.8s-1.2-.3-3.9 1.5a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.5-3.9-1.5a5.6 5.6 0 0 0-.1 3.8A5.2 5.2 0 0 0 3 11c0 5.2 3 6.4 6 6.76-.8.8-1 2-1 3.24v4" />
    <path d="M4 19c-2-1-2-4-5-4" />
  </svg>
);

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
        <nav className="flex flex-col gap-1.5 pb-20">
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

      <div className="mt-auto px-6 pb-6 pt-4 border-t border-border/40 bg-background/50 backdrop-blur-md sticky bottom-0 z-10 w-full">
         <a 
            href="https://github.com/JoeMighty/DevDock" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50 group"
         >
            <GithubIcon className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="font-semibold">GitHub Repo</span>
         </a>
      </div>
    </aside>
  );
}
