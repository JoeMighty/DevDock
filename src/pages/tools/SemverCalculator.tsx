import React, { useState } from 'react';
import { Tag, Copy, GitBranch } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function parseSemver(raw: string): { major: number; minor: number; patch: number; pre: string; build: string } | null {
  const m = raw.trim().replace(/^v/, '').match(/^(\d+)\.(\d+)\.(\d+)(?:-([^+]+))?(?:\+(.+))?$/);
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], pre: m[4] || '', build: m[5] || '' };
}

function fmt(v: { major: number; minor: number; patch: number; pre?: string; build?: string }): string {
  return `${v.major}.${v.minor}.${v.patch}${v.pre ? `-${v.pre}` : ''}${v.build ? `+${v.build}` : ''}`;
}

export default function SemverCalculator() {
  const [input, setInput] = useLocalStorage('devdock_semver_input', '1.3.0');
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 1500);
  };

  const parsed = parseSemver(input);

  const bumps = parsed ? [
    { label: 'Major', desc: 'Breaking changes', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30',
      value: fmt({ major: parsed.major + 1, minor: 0, patch: 0 }) },
    { label: 'Minor', desc: 'New features, backwards compatible', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30',
      value: fmt({ major: parsed.major, minor: parsed.minor + 1, patch: 0 }) },
    { label: 'Patch', desc: 'Bug fixes, backwards compatible', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30',
      value: fmt({ major: parsed.major, minor: parsed.minor, patch: parsed.patch + 1 }) },
    { label: 'Pre-release (alpha)', desc: 'Alpha pre-release', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30',
      value: fmt({ major: parsed.major, minor: parsed.minor, patch: parsed.patch + 1, pre: 'alpha.1' }) },
    { label: 'Pre-release (beta)', desc: 'Beta pre-release', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30',
      value: fmt({ major: parsed.major, minor: parsed.minor, patch: parsed.patch + 1, pre: 'beta.1' }) },
    { label: 'Release Candidate', desc: 'Release candidate', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30',
      value: fmt({ major: parsed.major, minor: parsed.minor, patch: parsed.patch + 1, pre: 'rc.1' }) },
  ] : [];

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Tag className="w-6 h-6 text-primary" /> Semver Calculator
        </h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Parse a semantic version string and calculate the next <code className="font-mono text-primary bg-primary/10 px-1 rounded">major</code>, <code className="font-mono text-primary bg-primary/10 px-1 rounded">minor</code>, or <code className="font-mono text-primary bg-primary/10 px-1 rounded">patch</code> bump, including pre-release variants.
      </p>
      <CompanionTool to="/tools/changelog" icon={GitBranch} accent="green"
        title="Then write the Changelog"
        description="Once you've decided the next version, document the release notes in Changelog Generator." />

      <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Current Version</label>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 1.3.0 or 2.1.0-beta.1"
          className="w-full bg-background border border-border px-5 py-4 rounded-xl font-mono text-3xl font-bold outline-none focus:border-primary transition-all" />
        {!parsed && input && (
          <p className="text-destructive text-xs mt-2">Invalid semver format. Expected: <code>MAJOR.MINOR.PATCH[-prerelease][+build]</code></p>
        )}
        {parsed && (
          <div className="flex gap-4 mt-3 text-xs font-mono">
            {[['MAJOR', parsed.major], ['MINOR', parsed.minor], ['PATCH', parsed.patch]].map(([l, v]) => (
              <span key={l} className="text-muted-foreground"><span className="text-foreground font-bold">{v}</span> {l}</span>
            ))}
            {parsed.pre && <span className="text-muted-foreground">PRE: <span className="text-yellow-400 font-bold">{parsed.pre}</span></span>}
          </div>
        )}
      </div>

      {parsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 content-start">
          {bumps.map(({ label, desc, color, bg, value }) => (
            <div key={label} className={`bg-card border rounded-2xl p-5 shadow-sm group hover:scale-[1.02] transition-all cursor-pointer ${bg}`}
              onClick={() => copy(value)}>
              <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${color}`}>{label}</div>
              <div className="font-mono text-2xl font-black mb-1">{value}</div>
              <div className="text-xs text-muted-foreground mb-3">{desc}</div>
              <div className={`flex items-center gap-1.5 text-xs font-semibold ${copied === value ? 'text-green-400' : color}`}>
                <Copy className="w-3 h-3" />
                {copied === value ? 'Copied!' : 'Click to copy'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
