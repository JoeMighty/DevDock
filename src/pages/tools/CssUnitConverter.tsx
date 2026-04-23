import React, { useState } from 'react';
import { Ruler, Copy } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const UNITS = ['px', 'rem', 'em', 'pt', 'vw', 'vh'] as const;
type Unit = typeof UNITS[number];

function convert(value: number, from: Unit, rootPx: number, viewportW: number, viewportH: number): Record<Unit, string> {
  // Convert everything to px first
  let px: number;
  switch (from) {
    case 'px': px = value; break;
    case 'rem': px = value * rootPx; break;
    case 'em': px = value * rootPx; break;
    case 'pt': px = value * (96 / 72); break;
    case 'vw': px = (value / 100) * viewportW; break;
    case 'vh': px = (value / 100) * viewportH; break;
  }

  const fmt = (n: number) => parseFloat(n.toFixed(4)).toString();
  return {
    px: fmt(px),
    rem: fmt(px / rootPx),
    em: fmt(px / rootPx),
    pt: fmt(px * (72 / 96)),
    vw: fmt((px / viewportW) * 100),
    vh: fmt((px / viewportH) * 100),
  };
}

export default function CssUnitConverter() {
  const [value, setValue] = useState('16');
  const [activeUnit, setActiveUnit] = useLocalStorage<Unit>('devdock_cssunit_unit', 'px');
  const [rootPx, setRootPx] = useLocalStorage<number>('devdock_cssunit_root', 16);
  const [viewportW, setViewportW] = useLocalStorage<number>('devdock_cssunit_vpw', 1440);
  const [viewportH, setViewportH] = useLocalStorage<number>('devdock_cssunit_vph', 900);

  const numVal = parseFloat(value) || 0;
  const conversions = convert(numVal, activeUnit, rootPx, viewportW, viewportH);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Ruler className="w-6 h-6 text-primary" /> CSS Unit Converter
        </h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Instant conversion between <code className="font-mono text-primary bg-primary/10 px-1 rounded">px</code>, <code className="font-mono text-primary bg-primary/10 px-1 rounded">rem</code>, <code className="font-mono text-primary bg-primary/10 px-1 rounded">em</code>, <code className="font-mono text-primary bg-primary/10 px-1 rounded">pt</code>, <code className="font-mono text-primary bg-primary/10 px-1 rounded">vw</code>, and <code className="font-mono text-primary bg-primary/10 px-1 rounded">vh</code>. Configure root font size and viewport dimensions for accurate results.
      </p>

      {/* Config row */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-wrap gap-6">
        {[
          { label: 'Root Font Size (px)', value: rootPx, min: 8, max: 32, onChange: setRootPx },
          { label: 'Viewport Width (px)', value: viewportW, min: 320, max: 3840, onChange: setViewportW },
          { label: 'Viewport Height (px)', value: viewportH, min: 320, max: 2160, onChange: setViewportH },
        ].map(({ label, value: v, min, max, onChange }) => (
          <div key={label} className="flex-1 min-w-[140px]">
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
              <span>{label}</span><span className="text-primary">{v}</span>
            </div>
            <input type="range" min={min} max={max} step={label.includes('Root') ? 1 : 10} value={v}
              onChange={e => onChange(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex gap-4 items-center">
        <input type="number" value={value} onChange={e => setValue(e.target.value)}
          className="flex-1 bg-background border border-border px-5 py-4 rounded-xl text-3xl font-bold font-mono outline-none focus:border-primary transition-all" />
        <div className="flex flex-wrap gap-2">
          {UNITS.map(u => (
            <button key={u} onClick={() => setActiveUnit(u)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold font-mono transition-all border ${activeUnit === u ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'}`}>
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 content-start">
        {UNITS.map(u => {
          const result = conversions[u];
          const isActive = u === activeUnit;
          return (
            <div key={u} className={`bg-card rounded-2xl p-5 border shadow-sm flex flex-col gap-2 transition-all ${isActive ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/30'}`}>
              <div className="flex justify-between items-start">
                <span className={`text-xs font-bold font-mono uppercase tracking-widest ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{u}</span>
                <button onClick={() => navigator.clipboard.writeText(`${result}${u}`)}
                  className="p-1 rounded text-muted-foreground hover:text-primary transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="font-mono font-bold text-2xl tracking-tight">{result}</div>
              <div className="text-xs text-muted-foreground font-mono">{result}{u}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
