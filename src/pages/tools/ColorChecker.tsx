import React, { useState } from 'react';
import { Palette, AlertTriangle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ColorChecker() {
  const [fg, setFg] = useState('#FFFFFF');
  const [bg, setBg] = useState('#6366F1');

  // Calculates contrast ratio using standard relative luminance formula
  const getLumanies = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const getRatio = () => {
    try {
      const l1 = getLumanies(fg);
      const l2 = getLumanies(bg);
      const lightest = Math.max(l1, l2);
      const darkest = Math.min(l1, l2);
      const ratio = (lightest + 0.05) / (darkest + 0.05);
      return Math.round(ratio * 100) / 100;
    } catch {
      return 1;
    }
  };

  const ratio = getRatio();
  const passAA = ratio >= 4.5;
  const passAAA = ratio >= 7.0;

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Palette className="w-6 h-6 text-primary" /> Color Contrast Checker</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Ensure your designs meet WCAG accessibility guidelines by checking the contrast ratio between text and background colors.
      </p>

      <Link to="/tools/palette"
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all group mb-2">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-purple-500/10 rounded-lg"><Sparkles className="w-4 h-4 text-purple-400" /></div>
          <div>
            <div className="text-xs font-bold text-foreground">Pair with Color Palette Generator</div>
            <div className="text-[11px] text-muted-foreground">Generate a full shade scale and harmony sets, then test contrast here.</div>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </Link>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
         <div className="flex flex-col flex-1 gap-2">
            <label className="text-sm font-semibold text-muted-foreground">Foreground Color</label>
            <div className="flex items-center gap-2 bg-card border border-border p-2 rounded-xl">
               <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer bg-transparent"/>
               <input type="text" value={fg.toUpperCase()} onChange={e => setFg(e.target.value)} className="bg-transparent border-none outline-none font-mono font-medium" />
            </div>
         </div>
         <div className="flex flex-col flex-1 gap-2">
            <label className="text-sm font-semibold text-muted-foreground">Background Color</label>
            <div className="flex items-center gap-2 bg-card border border-border p-2 rounded-xl">
               <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer bg-transparent"/>
               <input type="text" value={bg.toUpperCase()} onChange={e => setBg(e.target.value)} className="bg-transparent border-none outline-none font-mono font-medium" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[300px]">
          <div 
             className="w-full h-full rounded-3xl flex flex-col items-center justify-center p-8 text-center" 
             style={{ backgroundColor: bg, color: fg }}
          >
             <h1 className="text-5xl font-bold mb-4">Aa</h1>
             <p className="text-xl font-medium">The quick brown fox jumps over the lazy dog.</p>
          </div>

          <div className="flex flex-col justify-center gap-6 p-8 bg-card border border-border rounded-3xl shadow-sm">
             <div className="text-center">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Contrast Ratio</div>
                <div className="text-6xl font-black">{ratio}:1</div>
             </div>

             <div className="h-px w-full bg-border" />

             <div className="flex justify-around items-center">
                 <div className="flex flex-col items-center gap-2">
                    <div className="font-semibold text-lg">AA Standard</div>
                    {passAA ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <AlertTriangle className="w-8 h-8 text-destructive" />}
                    <span className="text-xs text-muted-foreground">{passAA ? 'Pass (4.5:1)' : 'Fail'}</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="font-semibold text-lg">AAA Standard</div>
                    {passAAA ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <AlertTriangle className="w-8 h-8 text-destructive" />}
                    <span className="text-xs text-muted-foreground">{passAAA ? 'Pass (7.0:1)' : 'Fail'}</span>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
}
