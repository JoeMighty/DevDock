import React, { useState } from 'react';
import { Dices, Copy, RefreshCw, Check } from 'lucide-react';

const genV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const genNanoId = (size = 21) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  return Array.from({ length: size }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export default function UuidGenerator() {
  const [type, setType] = useState<'uuidv4' | 'nanoid'>('uuidv4');
  const [count, setCount] = useState(5);
  const [nanoSize, setNanoSize] = useState(21);
  const [ids, setIds] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    setIds(Array.from({ length: count }, () => type === 'uuidv4' ? genV4() : genNanoId(nanoSize)));
  };

  const copy = (id: string, i: number) => {
    navigator.clipboard.writeText(id);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const copyAll = () => navigator.clipboard.writeText(ids.join('\n'));

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Dices className="w-6 h-6 text-primary" /> UUID / Nano ID Generator</h2>
        <button onClick={copyAll} disabled={!ids.length}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40">
          <Copy className="w-4 h-4" /> Copy All
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Generate cryptographically random UUID v4 identifiers or compact Nano IDs with configurable length. Ideal for database primary keys and session tokens.
      </p>

      <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-end">
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Format</label>
          <div className="flex gap-2 p-1 bg-muted/30 rounded-lg border border-border/50">
            {(['uuidv4', 'nanoid'] as const).map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${type === t ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
                {t === 'uuidv4' ? 'UUID v4' : 'Nano ID'}
              </button>
            ))}
          </div>
        </div>

        {type === 'nanoid' && (
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Length</label>
              <span className="text-xs font-mono text-primary">{nanoSize}</span>
            </div>
            <input type="range" min={8} max={64} value={nanoSize} onChange={e => setNanoSize(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        )}

        <div className="flex items-end gap-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Quantity</label>
            <input type="number" min={1} max={50} value={count} onChange={e => setCount(Number(e.target.value))}
              className="w-20 bg-background border border-border px-3 py-2 rounded-lg text-sm font-mono font-bold outline-none focus:border-primary text-center" />
          </div>
          <button onClick={generate} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
            <RefreshCw className="w-4 h-4" /> Generate
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {ids.map((id, i) => (
          <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm group hover:border-primary/40 transition-colors">
            <span className="text-xs font-mono text-muted-foreground w-6 text-right">{i + 1}</span>
            <span className="flex-1 font-mono text-sm">{id}</span>
            <button onClick={() => copy(id, i)}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border transition-all font-semibold opacity-0 group-hover:opacity-100">
              {copiedIdx === i ? <><Check className="w-3 h-3 text-green-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
        ))}
        {ids.length === 0 && (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border/50 rounded-2xl text-muted-foreground text-sm">
            Click Generate to create IDs.
          </div>
        )}
      </div>
    </div>
  );
}
