import React, { useState } from 'react';
import { Wand2, Copy, Plus, Trash2, Palette, Sparkles } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Stop { id: number; color: string; position: number }

type GradType = 'linear' | 'radial' | 'conic';

const PRESETS = [
  { name: 'Aurora',   stops: [{ id:1, color:'#6366f1', position:0 }, { id:2, color:'#8b5cf6', position:50 }, { id:3, color:'#ec4899', position:100 }], type:'linear' as GradType, angle: 135 },
  { name: 'Sunset',   stops: [{ id:1, color:'#f97316', position:0 }, { id:2, color:'#ef4444', position:50 }, { id:3, color:'#7c3aed', position:100 }], type:'linear' as GradType, angle: 45  },
  { name: 'Ocean',    stops: [{ id:1, color:'#06b6d4', position:0 }, { id:2, color:'#3b82f6', position:100 }], type:'linear' as GradType, angle: 180 },
  { name: 'Emerald',  stops: [{ id:1, color:'#10b981', position:0 }, { id:2, color:'#14b8a6', position:100 }], type:'linear' as GradType, angle: 90  },
  { name: 'Neon',     stops: [{ id:1, color:'#a855f7', position:0 }, { id:2, color:'#06b6d4', position:100 }], type:'linear' as GradType, angle: 315 },
  { name: 'Radial Glow', stops: [{ id:1, color:'#8b5cf6', position:0 }, { id:2, color:'#1e1b4b', position:100 }], type:'radial' as GradType, angle: 0 },
];

let _nextId = 10;

function buildCSS(type: GradType, angle: number, stops: Stop[]): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ');
  if (type === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`;
  if (type === 'radial')  return `radial-gradient(circle, ${stopsStr})`;
  return `conic-gradient(from ${angle}deg, ${stopsStr})`;
}

export default function GradientBuilder() {
  const [type, setType]   = useLocalStorage<GradType>('devdock_grad_type', 'linear');
  const [angle, setAngle] = useLocalStorage<number>('devdock_grad_angle', 135);
  const [stops, setStops] = useLocalStorage<Stop[]>('devdock_grad_stops', [
    { id:1, color:'#8b5cf6', position:0 },
    { id:2, color:'#ec4899', position:100 },
  ]);
  const [copied, setCopied] = useState(false);

  const css = buildCSS(type, angle, stops);

  const copy = () => {
    navigator.clipboard.writeText(`background: ${css};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const addStop = () => {
    const mid = Math.round((Math.min(...stops.map(s => s.position)) + Math.max(...stops.map(s => s.position))) / 2);
    setStops(prev => [...prev, { id: _nextId++, color: '#ffffff', position: mid }]);
  };

  const removeStop = (id: number) => setStops(prev => prev.filter(s => s.id !== id));
  const updateStop = (id: number, key: keyof Stop, val: string | number) =>
    setStops(prev => prev.map(s => s.id === id ? { ...s, [key]: val } : s));

  const loadPreset = (p: typeof PRESETS[0]) => {
    setType(p.type); setAngle(p.angle);
    setStops(p.stops.map((s, i) => ({ ...s, id: i + 1 })));
  };

  const sortedStops = [...stops].sort((a, b) => a.position - b.position);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Wand2 className="w-6 h-6 text-primary" /> Gradient Builder</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Visually build CSS gradients — linear, radial, and conic. Add colour stops, control positions and angles, then copy the ready-to-paste CSS.
      </p>
      <CompanionTool to="/tools/palette" icon={Sparkles} accent="purple"
        title="Pair with Color Palette Generator"
        description="Generate a harmonious palette first, then use those hex values as your gradient stops." />
      <CompanionTool to="/tools/css-gen" icon={Palette} accent="blue"
        title="Pair with CSS Generator"
        description="Combine your gradient background with shadows, borders, and animations in CSS Generator." />

      {/* Live preview */}
      <div className="rounded-2xl border border-border shadow-inner h-36 flex-shrink-0 transition-all duration-300"
        style={{ background: css }} />

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button key={p.name} onClick={() => loadPreset(p)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-border hover:border-primary/50 transition-all flex items-center gap-2">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: buildCSS(p.type, p.angle, p.stops) }} />
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 flex-1 min-h-0">
        {/* Color stops */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-3 overflow-y-auto">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Colour Stops</span>
            <button onClick={addStop} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors border border-primary/20">
              <Plus className="w-3.5 h-3.5" /> Add Stop
            </button>
          </div>
          {sortedStops.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border">
              <span className="text-[10px] font-mono text-muted-foreground w-4">{i + 1}</span>
              <input type="color" value={s.color} onChange={e => updateStop(s.id, 'color', e.target.value)}
                className="w-9 h-9 cursor-pointer rounded-lg border-0 bg-transparent" />
              <code className="text-xs font-mono text-muted-foreground w-20">{s.color.toUpperCase()}</code>
              <div className="flex-1">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>Position</span><span className="font-mono">{s.position}%</span>
                </div>
                <input type="range" min={0} max={100} value={s.position}
                  onChange={e => updateStop(s.id, 'position', Number(e.target.value))}
                  className="w-full accent-primary" />
              </div>
              {stops.length > 2 && (
                <button onClick={() => removeStop(s.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-5">
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Type</label>
            <div className="flex flex-col gap-1.5">
              {(['linear', 'radial', 'conic'] as GradType[]).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all text-left ${type === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {type !== 'radial' && (
            <div>
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                <span>Angle</span><span className="text-primary">{angle}°</span>
              </div>
              <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))}
                className="w-full accent-primary" />
              <div className="grid grid-cols-4 gap-1 mt-2">
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <button key={a} onClick={() => setAngle(a)}
                    className={`text-[10px] font-mono py-1 rounded border transition-all ${angle === a ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                    {a}°
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Output */}
          <div className="mt-auto">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">CSS Output</label>
            <div className="bg-muted/30 border border-border rounded-lg p-3 font-mono text-xs text-foreground break-all leading-relaxed">
              background: {css};
            </div>
            <button onClick={copy}
              className="mt-2 w-full py-2.5 bg-primary text-primary-foreground font-bold rounded-xl text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy CSS</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing Check import
function Check({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12" /></svg>;
}
