import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileJson, Clock, GitCommit, Network, Paintbrush, Database, Key, Regex, FileCode2, Palette, FileEdit, Hash, Code2, DatabaseZap, ShieldCheck, ShieldAlert, Shield, ShieldHalf, SplitSquareHorizontal, UploadCloud, Container, LockKeyhole, Fingerprint, ChevronRight, History, Table2, Binary, CalendarClock, Link2, QrCode, ServerCrash, AlignLeft, Dices, CaseSensitive, ArrowLeftRight, GitCompare, GitBranch, Terminal, Ruler, Sparkles, KeyRound, Tag, Settings, Code, Trash2, KeySquare, Wand2, FileCheck2, Bot, Sigma } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { version } from '../../../package.json';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.8 5.6 5.6 0 0 0-.1-3.8s-1.2-.3-3.9 1.5a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.5-3.9-1.5a5.6 5.6 0 0 0-.1 3.8A5.2 5.2 0 0 0 3 11c0 5.2 3 6.4 6 6.76-.8.8-1 2-1 3.24v4" />
    <path d="M4 19c-2-1-2-4-5-4" />
  </svg>
);

export const TOOLS = [
  // Data & Text
  { name: 'JSON to Table', path: '/tools/json-to-table', icon: FileJson, category: 'Data & Text' },
  { name: 'HTML to JSX', path: '/tools/html-to-jsx', icon: FileCode2, category: 'Data & Text' },
  { name: 'Mock Data Gen', path: '/tools/mock-data', icon: DatabaseZap, category: 'Data & Text' },
  { name: 'Markdown Editor', path: '/tools/markdown', icon: FileEdit, category: 'Data & Text' },
  { name: 'Encoder/Decoder', path: '/tools/encoder', icon: Code2, category: 'Data & Text' },
  { name: 'JSON Diff', path: '/tools/json-diff', icon: SplitSquareHorizontal, category: 'Data & Text' },
  { name: 'Base64 Encoder', path: '/tools/base64', icon: UploadCloud, category: 'Data & Text' },
  { name: 'CSV ↔ JSON', path: '/tools/csv-json', icon: Table2, category: 'Data & Text' },
  { name: 'SQL Formatter', path: '/tools/sql', icon: DatabaseZap, category: 'Data & Text' },
  { name: 'String Toolkit', path: '/tools/strings', icon: CaseSensitive, category: 'Data & Text' },
  { name: 'Lorem Ipsum', path: '/tools/lorem', icon: AlignLeft, category: 'Data & Text' },
  { name: 'YAML ↔ JSON', path: '/tools/yaml', icon: ArrowLeftRight, category: 'Data & Text' },
  { name: 'Text Diff', path: '/tools/text-diff', icon: GitCompare, category: 'Data & Text' },
  { name: 'XML Formatter', path: '/tools/xml', icon: Code, category: 'Data & Text' },

  // Web & Network
  { name: 'API Tester', path: '/tools/api-tester', icon: Network, category: 'Web & Network' },
  { name: 'Sitemap Gen', path: '/tools/sitemap', icon: GitCommit, category: 'Web & Network' },
  { name: 'Uptime Monitor', path: '/tools/uptime', icon: Clock, category: 'Web & Network' },
  { name: 'URL Parser', path: '/tools/url-parser', icon: Link2, category: 'Web & Network' },
  { name: 'QR Code Gen', path: '/tools/qr-code', icon: QrCode, category: 'Web & Network' },
  { name: 'HTTP Status Codes', path: '/tools/http-status', icon: ServerCrash, category: 'Web & Network' },

  // Architecture & Ops
  { name: 'Docker Builder', path: '/tools/docker', icon: Container, category: 'Architecture & Ops' },
  { name: 'Chmod Calc', path: '/tools/chmod', icon: LockKeyhole, category: 'Architecture & Ops' },
  { name: 'Cron Gen', path: '/tools/cron', icon: Clock, category: 'Architecture & Ops' },

  // Security
  { name: 'JWT Decoder', path: '/tools/jwt', icon: Key, category: 'Security' },
  { name: 'Hash & UUID', path: '/tools/hash', icon: Hash, category: 'Security' },
  { name: 'Password Analyzer', path: '/tools/password', icon: ShieldCheck, category: 'Security' },
  { name: 'Log Sanitizer', path: '/tools/sanitizer', icon: ShieldAlert, category: 'Security' },
  { name: 'CIDR Calculator', path: '/tools/cidr', icon: Shield, category: 'Security' },
  { name: 'PEM Decoder', path: '/tools/pem', icon: ShieldHalf, category: 'Security' },
  { name: 'Bcrypt Verifier', path: '/tools/bcrypt', icon: Fingerprint, category: 'Security' },
  { name: 'OTP / TOTP Gen', path: '/tools/otp', icon: KeyRound, category: 'Security' },
  { name: 'Password Gen', path: '/tools/password-gen', icon: KeySquare, category: 'Security', isNew: true },
  { name: 'HMAC Calculator', path: '/tools/hmac', icon: Sigma, category: 'Security', isNew: true },

  // Dev Tools
  { name: 'Regex Tester', path: '/tools/regex', icon: Regex, category: 'Dev Tools' },
  { name: 'Changelog Gen', path: '/tools/changelog', icon: GitCommit, category: 'Dev Tools' },
  { name: 'Schema Designer', path: '/tools/schema', icon: Database, category: 'Dev Tools' },
  { name: 'UUID / Nano ID', path: '/tools/uuid', icon: Dices, category: 'Dev Tools' },
  { name: 'Timestamp Conv.', path: '/tools/timestamp', icon: CalendarClock, category: 'Dev Tools' },
  { name: 'Number Base', path: '/tools/number-base', icon: Binary, category: 'Dev Tools' },
  { name: '.gitignore Gen', path: '/tools/gitignore', icon: GitBranch, category: 'Dev Tools' },
  { name: 'curl → Fetch', path: '/tools/curl', icon: Terminal, category: 'Dev Tools' },
  { name: 'Conv. Commits', path: '/tools/commits', icon: GitCommit, category: 'Dev Tools', isNew: true },
  { name: 'Semver Calc', path: '/tools/semver', icon: Tag, category: 'Dev Tools', isNew: true },
  { name: 'ENV Formatter', path: '/tools/env', icon: Settings, category: 'Dev Tools', isNew: true },
  { name: 'robots.txt Gen', path: '/tools/robots', icon: Bot, category: 'Dev Tools', isNew: true },
  { name: 'JSON Schema', path: '/tools/json-schema', icon: FileCheck2, category: 'Dev Tools', isNew: true },

  // Design & CSS
  { name: 'Color Checker', path: '/tools/color', icon: Palette, category: 'Design & CSS' },
  { name: 'CSS Gen', path: '/tools/css-gen', icon: Paintbrush, category: 'Design & CSS' },
  { name: 'CSS Units', path: '/tools/css-units', icon: Ruler, category: 'Design & CSS' },
  { name: 'Color Palette', path: '/tools/palette', icon: Sparkles, category: 'Design & CSS', isNew: true },
  { name: 'Gradient Builder', path: '/tools/gradient', icon: Wand2, category: 'Design & CSS', isNew: true },
];

export function Sidebar() {
  const location = useLocation();
  const categories = Array.from(new Set(TOOLS.map(t => t.category)));

  // State
  const [recents, setRecents] = useState<string[]>(() => {
      try { return JSON.parse(localStorage.getItem('devdock_recents') || '[]'); } 
      catch { return []; }
  });

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Auto-expand category on initial render based on route
  useEffect(() => {
      const activeTool = TOOLS.find(t => t.path === location.pathname);
      if (activeTool) {
          setExpanded(prev => ({ ...prev, [activeTool.category]: true }));
      }
  }, [location.pathname]);

  // Track Recents
  useEffect(() => {
      if (location.pathname === '/') return;
      const validPaths = TOOLS.map(t => t.path);
      if (!validPaths.includes(location.pathname)) return;

      try {
          const stored = JSON.parse(localStorage.getItem('devdock_recents') || '[]');
          const updated = [location.pathname, ...stored.filter((p: string) => p !== location.pathname)].slice(0, 3);
          localStorage.setItem('devdock_recents', JSON.stringify(updated));
          setRecents(updated);
      } catch {
          // ignore parsing error
      }
  }, [location.pathname]);

  const toggleCategory = (cat: string) => {
      setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const clearMemory = () => {
      Object.keys(localStorage)
        .filter(k => k.startsWith('devdock_'))
        .forEach(k => localStorage.removeItem(k));
      setRecents([]);
  };

  const renderToolLink = (tool: typeof TOOLS[0]) => {
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
  };

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
      
      <div className="px-4 flex flex-col gap-2 pb-24">
        
        {/* Recents Block */}
        {recents.length > 0 && (
            <div className="mb-4">
                <div className="text-[10px] font-bold text-muted-foreground/80 mb-2 px-3 uppercase tracking-widest flex items-center gap-2">
                    <History className="w-3.5 h-3.5" /> Recently Used
                </div>
                <nav className="flex flex-col gap-1">
                    {recents.map(path => {
                        const tool = TOOLS.find(t => t.path === path);
                        return tool ? renderToolLink(tool) : null;
                    })}
                </nav>
            </div>
        )}

        {/* Categories Block */}
        <div className="text-[10px] font-bold text-muted-foreground/80 mb-2 px-3 uppercase tracking-widest pt-2 border-t border-border/20">
            Modules
        </div>
        
        {categories.map(cat => {
            const isExpanded = expanded[cat];
            const catTools = TOOLS.filter(t => t.category === cat);
            
            return (
                <div key={cat} className="flex flex-col mb-1">
                    <button 
                        onClick={() => toggleCategory(cat)}
                        className="flex items-center justify-between px-3 py-2 w-full rounded-lg hover:bg-muted/40 transition-colors group text-left"
                    >
                        <span className="text-xs font-bold text-foreground/80 group-hover:text-foreground">{cat}</span>
                        <ChevronRight className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-90")} />
                    </button>
                    
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <nav className="flex flex-col gap-1 pt-1 pb-2">
                                    {catTools.map(renderToolLink)}
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        })}
      </div>

      <div className="mt-auto px-6 pb-6 pt-4 border-t border-border/40 bg-background/50 backdrop-blur-md sticky bottom-0 z-10 w-full">
          <button
            onClick={clearMemory}
            className="flex items-center gap-2 w-full px-3 py-2 mb-2 rounded-lg text-xs font-semibold text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-all group"
          >
            <Trash2 className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-destructive transition-colors" />
            Clear saved memory
          </button>
          <a 
            href="https://github.com/JoeMighty/DevDock" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50 group"
         >
            <GithubIcon className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="font-semibold">GitHub Repo</span>
         </a>
         <div className="flex items-center justify-between px-3 pt-1">
           <span className="text-[10px] font-mono text-muted-foreground/50 tracking-widest">v{version}</span>
           <span className="text-[10px] text-muted-foreground/40 font-semibold">{TOOLS.length} tools</span>
         </div>
      </div>
    </aside>
  );
}
