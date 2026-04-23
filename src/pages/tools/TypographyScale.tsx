import React, { useState } from 'react';
import { Type, Ruler, Copy, Check, ExternalLink } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

const SCALES = [
  { name: 'Minor Second', value: 1.067 },
  { name: 'Major Second', value: 1.125 },
  { name: 'Minor Third', value: 1.200 },
  { name: 'Major Third', value: 1.250 },
  { name: 'Perfect Fourth', value: 1.333 },
  { name: 'Augmented Fourth', value: 1.414 },
  { name: 'Perfect Fifth', value: 1.500 },
  { name: 'Golden Ratio', value: 1.618 }
];

import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function TypographyScale() {
  const [baseSize, setBaseSize] = useLocalStorage('devdock_typo_base', 16);
  const [scale, setScale] = useLocalStorage('devdock_typo_scale', 1.250); // Major Third
  const [steps, setSteps] = useLocalStorage('devdock_typo_steps', 8);
  const [copied, setCopied] = useState<number | null>(null);

  const generateScale = () => {
    const scaleArr = [];
    // Down
    for (let i = 2; i > 0; i--) {
       scaleArr.push({ step: -i, size: baseSize / Math.pow(scale, i) });
    }
    // Base
    scaleArr.push({ step: 0, size: baseSize });
    // Up
    for (let i = 1; i <= steps; i++) {
       scaleArr.push({ step: i, size: baseSize * Math.pow(scale, i) });
    }
    return scaleArr;
  };

  const scaleData = generateScale();

  const copyCss = (size: number, step: number) => {
    const val = `${size.toFixed(2)}px`;
    navigator.clipboard.writeText(val);
    setCopied(step);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Type className="w-6 h-6 text-primary" /> Typography Scale</h2>
      </div>

      <p className="text-sm text-muted-foreground/80">
        Generate a mathematical typographic scale for harmonious font sizing across your UI. Inspired by <a href="https://type-scale.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">type-scale.com <ExternalLink className="w-3 h-3"/></a>.
      </p>

      <CompanionTool to="/tools/css-units" icon={Ruler} accent="blue" 
        title="Convert to REM" 
        description="Head to CSS Unit Converter to convert these pixel values into responsive REM/EM units." />

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Base Size (px)</label>
          <input 
            type="number"
            value={baseSize}
            onChange={(e) => setBaseSize(Number(e.target.value))}
            className="w-full bg-background border border-border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Scale Ratio</label>
          <select 
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full bg-background border border-border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary transition-all cursor-pointer"
          >
            {SCALES.map(s => (
              <option key={s.name} value={s.value}>{s.name} ({s.value})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Steps (Upper)</label>
          <input 
            type="number"
            value={steps}
            min={1}
            max={12}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="w-full bg-background border border-border px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-card border border-border rounded-xl shadow-inner overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Preview Scale</span>
          <span className="text-xs font-mono text-primary font-bold">1 : {scale}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           {scaleData.sort((a,b) => b.step - a.step).map((step) => (
             <div key={step.step} className="group flex items-end gap-6 pb-6 border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors rounded-lg px-2">
                <div className="w-20 flex-shrink-0">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Step {step.step}</div>
                  <button 
                    onClick={() => copyCss(step.size, step.step)}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 px-2 py-1 rounded transition-all"
                  >
                    {copied === step.step ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {step.size.toFixed(2)}px
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div 
                    style={{ fontSize: `${step.size}px` }} 
                    className="truncate text-foreground leading-tight"
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
