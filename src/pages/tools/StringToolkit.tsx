import React, { useState } from 'react';
import { CaseSensitive, Copy, Check } from 'lucide-react';

type Conversion = { label: string; fn: (s: string) => string };

const CONVERSIONS: Conversion[] = [
  { label: 'camelCase', fn: s => s.trim().toLowerCase().replace(/[^a-z0-9]+(.)/gi, (_, c) => c.toUpperCase()) },
  { label: 'PascalCase', fn: s => s.trim().toLowerCase().replace(/(?:^|[^a-z0-9]+)(.)/gi, (_, c) => c.toUpperCase()) },
  { label: 'snake_case', fn: s => s.trim().replace(/[^a-zA-Z0-9]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase() },
  { label: 'kebab-case', fn: s => s.trim().replace(/[^a-zA-Z0-9]+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() },
  { label: 'SCREAMING_SNAKE', fn: s => s.trim().replace(/[^a-zA-Z0-9]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase() },
  { label: 'UPPERCASE', fn: s => s.toUpperCase() },
  { label: 'lowercase', fn: s => s.toLowerCase() },
  { label: 'Title Case', fn: s => s.toLowerCase().replace(/(?:^|\s)\S/g, c => c.toUpperCase()) },
  { label: 'Slug', fn: s => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') },
  { label: 'Reverse', fn: s => s.split('').reverse().join('') },
  { label: 'Trim Whitespace', fn: s => s.replace(/\s+/g, ' ').trim() },
  { label: 'Count Words', fn: s => `${s.trim().split(/\s+/).filter(Boolean).length} words, ${s.length} characters` },
];

export default function StringToolkit() {
  const [input, setInput] = useState('Hello World Developer');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><CaseSensitive className="w-6 h-6 text-primary" /> String Toolkit</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Multi-function string conversion suite. Convert naming conventions instantly — from camelCase to SCREAMING_SNAKE — and copy any variant with one click.
      </p>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden focus-within:border-primary/50 transition-colors">
        <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">Input String</div>
        <textarea
          value={input} onChange={e => setInput(e.target.value)}
          className="w-full bg-transparent p-4 resize-none outline-none font-mono text-lg h-20"
          spellCheck="false" placeholder="Type or paste your string here..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 overflow-y-auto pb-2">
        {CONVERSIONS.map(({ label, fn }) => {
          const result = fn(input);
          const isCopied = copied === label;
          return (
            <div key={label} className="bg-card border border-border rounded-xl p-4 flex flex-col gap-2 shadow-sm group hover:border-primary/40 transition-all">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</div>
              <div className="font-mono text-sm text-foreground break-all flex-1 min-h-[1.5rem]">{result}</div>
              <button onClick={() => handleCopy(result, label)}
                className="self-end flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border transition-all font-semibold">
                {isCopied ? <><Check className="w-3 h-3 text-green-500" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
