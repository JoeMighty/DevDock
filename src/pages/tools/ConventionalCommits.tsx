import React, { useState } from 'react';
import { GitCommit, Copy, Check } from 'lucide-react';

const TYPES = [
  { value: 'feat', label: 'feat', desc: 'A new feature', color: 'text-green-400' },
  { value: 'fix', label: 'fix', desc: 'A bug fix', color: 'text-red-400' },
  { value: 'docs', label: 'docs', desc: 'Documentation changes', color: 'text-blue-400' },
  { value: 'style', label: 'style', desc: 'Formatting, no logic change', color: 'text-purple-400' },
  { value: 'refactor', label: 'refactor', desc: 'Code restructure, no feature or fix', color: 'text-yellow-400' },
  { value: 'perf', label: 'perf', desc: 'Performance improvement', color: 'text-orange-400' },
  { value: 'test', label: 'test', desc: 'Adding or fixing tests', color: 'text-cyan-400' },
  { value: 'build', label: 'build', desc: 'Build system or external deps', color: 'text-pink-400' },
  { value: 'ci', label: 'ci', desc: 'CI/CD configuration changes', color: 'text-indigo-400' },
  { value: 'chore', label: 'chore', desc: 'Maintenance tasks', color: 'text-muted-foreground' },
  { value: 'revert', label: 'revert', desc: 'Reverts a previous commit', color: 'text-destructive' },
];

export default function ConventionalCommits() {
  const [type, setType] = useState('feat');
  const [scope, setScope] = useState('');
  const [breaking, setBreaking] = useState(false);
  const [desc, setDesc] = useState('');
  const [body, setBody] = useState('');
  const [footer, setFooter] = useState('');
  const [copied, setCopied] = useState(false);

  const header = `${type}${scope ? `(${scope})` : ''}${breaking ? '!' : ''}: ${desc}`;
  const parts = [header, body, footer].filter(Boolean);
  const output = parts.join('\n\n');

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const selectedType = TYPES.find(t => t.value === type);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <GitCommit className="w-6 h-6 text-primary" /> Conventional Commits Builder
        </h2>
        <button onClick={copy} disabled={!desc}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40">
          {copied ? <><Check className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Build perfectly formatted Conventional Commits messages with guided fields. Outputs the spec-compliant commit string for <code className="font-mono text-primary bg-primary/10 px-1 rounded">feat</code>, <code className="font-mono text-primary bg-primary/10 px-1 rounded">fix</code>, breaking changes, and more.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 flex-1 min-h-0">
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Type selector */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-3">Commit Type</label>
            <div className="flex flex-wrap gap-2">
              {TYPES.map(t => (
                <button key={t.value} onClick={() => setType(t.value)}
                  title={t.desc}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${type === t.value ? 'bg-primary text-primary-foreground border-primary' : `border-border hover:border-primary/40 ${t.color}`}`}>
                  {t.label}
                </button>
              ))}
            </div>
            {selectedType && <p className="text-xs text-muted-foreground mt-2">{selectedType.desc}</p>}
          </div>

          <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Scope <span className="normal-case text-muted-foreground/60">(optional)</span></label>
                <input value={scope} onChange={e => setScope(e.target.value)} placeholder="auth, api, ui..."
                  className="w-full bg-background border border-border px-3 py-2 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
              </div>
              <div className="flex flex-col items-start justify-end pb-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-3">Breaking Change</label>
                <button onClick={() => setBreaking(b => !b)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${breaking ? 'bg-destructive/10 border-destructive text-destructive' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                  <div className={`w-3 h-3 rounded border-2 ${breaking ? 'bg-destructive border-destructive' : 'border-muted-foreground'}`} />
                  Breaking (!){breaking ? ' — ON' : ''}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Short Description <span className="normal-case text-muted-foreground/60">(required)</span></label>
              <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="add OAuth login with Google provider"
                className="w-full bg-background border border-border px-3 py-2 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Body <span className="normal-case text-muted-foreground/60">(optional detail)</span></label>
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={3} placeholder="Longer description of what changed and why..."
                className="w-full bg-background border border-border px-3 py-2 rounded-lg font-mono text-sm outline-none focus:border-primary resize-none transition-all" />
            </div>

            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Footer <span className="normal-case text-muted-foreground/60">(refs, breaking, etc.)</span></label>
              <input value={footer} onChange={e => setFooter(e.target.value)} placeholder="Closes #123  |  BREAKING CHANGE: old API removed"
                className="w-full bg-background border border-border px-3 py-2 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="bg-[#1e1e1e] border border-border rounded-2xl overflow-hidden flex flex-col shadow-sm self-start sticky top-0">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2.5 bg-black/20 border-b border-border/50 flex justify-between">
            <span>Commit Message</span>
            <button onClick={copy} disabled={!desc} className="text-primary hover:text-primary/80 transition-colors disabled:opacity-40">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="p-4 font-mono text-sm leading-relaxed min-h-[180px]">
            {desc ? (
              <>
                <span className={selectedType?.color}>{type}</span>
                {scope && <span className="text-muted-foreground">(<span className="text-yellow-300">{scope}</span>)</span>}
                {breaking && <span className="text-destructive">!</span>}
                <span className="text-muted-foreground">: </span>
                <span className="text-white">{desc}</span>
                {body && <><br /><br /><span className="text-muted-foreground/80">{body}</span></>}
                {footer && <><br /><br /><span className="text-yellow-300/80">{footer}</span></>}
              </>
            ) : (
              <span className="text-muted-foreground/40">Fill in the fields to preview your commit message...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
