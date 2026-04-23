import React, { useState } from 'react';
import { Settings, Copy, Download, Box } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

interface ParsedLine { key: string; value: string; raw: string; isComment: boolean; isBlank: boolean; error?: string }

function parseEnv(text: string): ParsedLine[] {
  return text.split('\n').map(raw => {
    const trimmed = raw.trim();
    if (!trimmed) return { key: '', value: '', raw, isComment: false, isBlank: true };
    if (trimmed.startsWith('#')) return { key: '', value: '', raw, isComment: true, isBlank: false };
    const eq = trimmed.indexOf('=');
    if (eq === -1) return { key: trimmed, value: '', raw, isComment: false, isBlank: false, error: 'Missing = sign' };
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    const keyErr = /[^A-Z0-9_]/.test(key) ? 'Key should be UPPER_SNAKE_CASE' : undefined;
    return { key, value, raw, isComment: false, isBlank: false, error: keyErr };
  });
}

export default function EnvFormatter() {
  const [input, setInput] = useState(`# Database config
DATABASE_URL=postgres://user:pass@localhost:5432/mydb
DATABASE_POOL=10

API_KEY=sk-abc123xyz
API_SECRET=supersecret

# App settings
NODE_ENV=production
PORT=3000
DEBUG=false
API_KEY=sk-duplicate-this-is-a-dupe`);

  const [sortKeys, setSortKeys] = useState(true);
  const [stripComments, setStripComments] = useState(false);
  const [stripBlanks, setStripBlanks] = useState(false);

  const lines = parseEnv(input);
  const errors = lines.filter(l => l.error);
  const keys = lines.filter(l => !l.isComment && !l.isBlank && l.key);
  const dupes = keys.filter((l, i) => keys.findIndex(x => x.key === l.key) !== i).map(l => l.key);

  let processed = [...lines];
  if (stripComments) processed = processed.filter(l => !l.isComment);
  if (stripBlanks) processed = processed.filter(l => !l.isBlank);
  // Deduplicate — keep last occurrence
  const seen = new Set<string>();
  processed = processed.filter(l => {
    if (!l.key) return true;
    if (seen.has(l.key)) return false;
    seen.add(l.key);
    return true;
  }).reverse().filter(l => { if (!l.key) return true; return seen.delete(l.key); }).reverse();

  if (sortKeys) {
    const comments: ParsedLine[] = [];
    const envLines = processed.filter(l => { if (l.isComment || l.isBlank) { comments.push(l); return false; } return true; });
    envLines.sort((a, b) => a.key.localeCompare(b.key));
    processed = stripComments ? envLines : [...comments, ...envLines];
  }

  const output = processed.map(l => l.isComment ? l.raw : l.isBlank ? '' : `${l.key}=${l.value}`).join('\n');

  const download = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '.env';
    a.click();
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" /> ENV File Formatter
        </h2>
        <div className="flex gap-2">
          <button onClick={() => navigator.clipboard.writeText(output)}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors">
            <Copy className="w-4 h-4" /> Copy
          </button>
          <button onClick={download}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" /> .env
          </button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Paste a <code className="font-mono text-primary bg-primary/10 px-1 rounded">.env</code> file to validate, deduplicate keys, sort alphabetically, and strip comments or blank lines.
      </p>
      <CompanionTool to="/tools/docker" icon={Box} accent="blue"
        title="Pair with Docker Compose Builder"
        description="Once your .env is clean, wire those environment variables into a docker-compose.yml service." />

      {/* Stat badges */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: `${keys.length} keys`, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
          errors.length > 0 && { label: `${errors.length} errors`, color: 'bg-red-500/10 text-red-400 border-red-500/20' },
          dupes.length > 0 && { label: `${dupes.length} duplicates`, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
        ].filter(Boolean).map((b: any) => (
          <span key={b.label} className={`text-xs font-bold px-3 py-1 rounded-full border ${b.color}`}>{b.label}</span>
        ))}
      </div>

      {/* Options */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: 'Sort A–Z', state: sortKeys, toggle: () => setSortKeys(s => !s) },
          { label: 'Strip Comments', state: stripComments, toggle: () => setStripComments(s => !s) },
          { label: 'Strip Blank Lines', state: stripBlanks, toggle: () => setStripBlanks(s => !s) },
        ].map(({ label, state, toggle }) => (
          <button key={label} onClick={toggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${state ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
            <div className={`w-3 h-3 rounded border-2 transition-all ${state ? 'bg-primary border-primary' : 'border-muted-foreground'}`} />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[320px]">
        <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm focus-within:border-primary/50 transition-colors">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">Input .env</div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed" spellCheck="false" />
        </div>
        <div className="flex flex-col bg-[#1e1e1e] border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-black/20 border-b border-border/50">Formatted Output</div>
          <textarea readOnly value={output}
            className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed text-green-300" spellCheck="false" />
        </div>
      </div>
    </div>
  );
}
