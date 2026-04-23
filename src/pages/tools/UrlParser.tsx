import React, { useState } from 'react';
import { Link2, Copy, Plus, X, ExternalLink, QrCode, Play } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

export default function UrlParser() {
  const [rawUrl, setRawUrl] = useState('https://api.example.com/v2/users/search?name=Alice&role=admin&page=1#results');
  const [params, setParams] = useState<{ k: string; v: string }[]>([{ k: 'name', v: 'Alice' }, { k: 'role', v: 'admin' }]);
  const [baseUrl, setBaseUrl] = useState('https://api.example.com/v2/users/search');

  const parse = (url: string) => {
    try {
      const u = new URL(url);
      setBaseUrl(`${u.protocol}//${u.host}${u.pathname}`);
      const qp: { k: string; v: string }[] = [];
      u.searchParams.forEach((v, k) => qp.push({ k, v }));
      setParams(qp);
    } catch { /* leave as is */ }
  };

  const rebuild = (b: string, p: { k: string; v: string }[]) => {
    const valid = p.filter(x => x.k);
    if (!valid.length) return b;
    const qs = valid.map(x => `${encodeURIComponent(x.k)}=${encodeURIComponent(x.v)}`).join('&');
    return `${b}?${qs}`;
  };

  const addParam = () => setParams([...params, { k: '', v: '' }]);
  const removeParam = (i: number) => setParams(params.filter((_, idx) => idx !== i));
  const updateParam = (i: number, field: 'k' | 'v', val: string) => {
    setParams(params.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  };

  const builtUrl = rebuild(baseUrl, params);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Link2 className="w-6 h-6 text-primary" /> URL Parser & Builder</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Decompose any URL into its components and visually edit query parameters. Great for debugging OAuth callbacks, redirect URIs, and API endpoints.
      </p>
      <CompanionTool to="/tools/qr-code" icon={QrCode} accent="purple"
        title="Turn it into a QR Code"
        description="Copy the built URL and generate a custom branded QR code in the QR Code Designer." />
      <CompanionTool to="/tools/api-tester" icon={Play} accent="blue"
        title="Test the endpoint in API Tester"
        description="Fire a direct HTTP request to the built URL and inspect the live response." />

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm focus-within:border-primary/50 transition-colors">
        <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">Parse a URL</div>
        <div className="flex">
          <input value={rawUrl} onChange={e => setRawUrl(e.target.value)} placeholder="https://..."
            className="flex-1 bg-transparent px-4 py-3 font-mono text-sm outline-none" spellCheck="false" />
          <button onClick={() => parse(rawUrl)} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold m-1.5 rounded-lg hover:bg-primary/90 transition-all">Parse</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Base URL</label>
            <input value={baseUrl} onChange={e => setBaseUrl(e.target.value)}
              className="w-full bg-background border border-border px-3 py-2 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
          </div>

          <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex-1">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Query Parameters</label>
              <button onClick={addParam} className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {params.map((p, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={p.k} onChange={e => updateParam(i, 'k', e.target.value)} placeholder="key"
                    className="flex-1 bg-background border border-border px-3 py-2 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
                  <span className="text-muted-foreground font-mono">=</span>
                  <input value={p.v} onChange={e => updateParam(i, 'v', e.target.value)} placeholder="value"
                    className="flex-1 bg-background border border-border px-3 py-2 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
                  <button onClick={() => removeParam(i)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Built URL</div>
          <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm break-all flex-1 min-h-[80px] text-blue-300">{builtUrl}</div>
          <div className="flex gap-2">
            <button onClick={() => navigator.clipboard.writeText(builtUrl)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-sm font-bold transition-colors">
              <Copy className="w-4 h-4" /> Copy URL
            </button>
            <a href={builtUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg text-sm font-bold text-primary transition-colors">
              <ExternalLink className="w-4 h-4" /> Open
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
