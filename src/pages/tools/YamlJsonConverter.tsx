import React, { useState } from 'react';
import { ArrowLeftRight, Copy, RefreshCw } from 'lucide-react';
import yaml from 'js-yaml';

type Mode = 'yaml-to-json' | 'json-to-yaml';

export default function YamlJsonConverter() {
  const [mode, setMode] = useState<Mode>('yaml-to-json');
  const [input, setInput] = useState(`name: devdock\nversion: 1.2.0\ntools:\n  - JSON to Table\n  - SQL Formatter\n  - YAML Converter\nenvironment:\n  production: true\n  port: 3000`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    try {
      if (mode === 'yaml-to-json') {
        const parsed = yaml.load(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(input);
        setOutput(yaml.dump(parsed, { indent: 2, lineWidth: -1 }));
      }
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const swap = () => {
    setMode(m => m === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json');
    setInput(output || input);
    setOutput('');
    setError('');
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ArrowLeftRight className="w-6 h-6 text-primary" /> YAML ↔ JSON Converter
        </h2>
        <div className="flex gap-2">
          <button onClick={swap} className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors">
            <ArrowLeftRight className="w-4 h-4" /> Swap
          </button>
          <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40">
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Bidirectional YAML ↔ JSON conversion. Essential for Kubernetes configs, GitHub Actions, Helm charts, and any DevOps pipeline work.
      </p>

      <div className="flex gap-2 p-1 bg-muted/30 rounded-lg w-fit border border-border/50">
        {(['yaml-to-json', 'json-to-yaml'] as Mode[]).map(m => (
          <button key={m} onClick={() => { setMode(m); setOutput(''); setError(''); }}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${mode === m ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
            {m === 'yaml-to-json' ? 'YAML → JSON' : 'JSON → YAML'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[400px]">
        <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm focus-within:border-primary/50 transition-colors">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">
            {mode === 'yaml-to-json' ? 'YAML Input' : 'JSON Input'}
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed" spellCheck="false" />
        </div>
        <div className="flex flex-col bg-[#1e1e1e] border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-black/20 border-b border-border/50">
            {mode === 'yaml-to-json' ? 'JSON Output' : 'YAML Output'}
          </div>
          {error
            ? <div className="p-4 text-sm text-destructive font-mono whitespace-pre-wrap">{error}</div>
            : <textarea readOnly value={output}
                className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed text-yellow-300" spellCheck="false" />
          }
        </div>
      </div>

      <button onClick={convert} className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
        <RefreshCw className="w-4 h-4" /> Convert
      </button>
    </div>
  );
}
