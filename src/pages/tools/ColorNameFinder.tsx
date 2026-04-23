import React, { useState, useEffect } from 'react';
import { Search, Palette, Copy, Check, Info } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const COLORS = [
  { name: 'Red', hex: '#FF0000' }, { name: 'Green', hex: '#00FF00' }, { name: 'Blue', hex: '#0000FF' },
  { name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#000000' }, { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Cyan', hex: '#00FFFF' }, { name: 'Magenta', hex: '#FF00FF' }, { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Gray', hex: '#808080' }, { name: 'Maroon', hex: '#800000' }, { name: 'Olive', hex: '#808000' },
  { name: 'Green', hex: '#008000' }, { name: 'Purple', hex: '#800080' }, { name: 'Teal', hex: '#008080' },
  { name: 'Navy', hex: '#000080' }, { name: 'Orange', hex: '#FFA500' }, { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Gold', hex: '#FFD700' }, { name: 'Sky Blue', hex: '#87CEEB' }, { name: 'Indigo', hex: '#4B0082' },
  { name: 'Violet', hex: '#EE82EE' }, { name: 'Beige', hex: '#F5F5DC' }, { name: 'Crimson', hex: '#DC143C' },
  { name: 'Dark Slate Gray', hex: '#2F4F4F' }, { name: 'Forest Green', hex: '#228B22' },
  { name: 'Hot Pink', hex: '#FF69B4' }, { name: 'Lime', hex: '#00FF00' }, { name: 'Navajo White', hex: '#FFDEAD' },
  { name: 'Royal Blue', hex: '#4169E1' }, { name: 'Salmon', hex: '#FA8072' }, { name: 'Sea Green', hex: '#2E8B57' },
  { name: 'Tomato', hex: '#FF6347' }, { name: 'Turquoise', hex: '#40E0D0' }, { name: 'Slate Blue', hex: '#6A5ACD' },
  { name: 'Dark Orange', hex: '#FF8C00' }, { name: 'Slate Gray', hex: '#708090' }, { name: 'Burly Wood', hex: '#DEB887' }
  // Simplified for brevity, in a real app this would be 1000+
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function colorDistance(rgb1: any, rgb2: any) {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

export default function ColorNameFinder() {
  const [hex, setHex] = useLocalStorage('devdock_color_name_input', '#6366f1');
  const [match, setMatch] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
    
    const inputRgb = hexToRgb(hex);
    let minDistance = Infinity;
    let closest = null;

    for (const color of COLORS) {
      const distance = colorDistance(inputRgb, hexToRgb(color.hex));
      if (distance < minDistance) {
        minDistance = distance;
        closest = color;
      }
    }
    setMatch(closest);
  }, [hex]);

  const copy = () => {
    if (!match) return;
    navigator.clipboard.writeText(match.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Palette className="w-6 h-6 text-primary" /> Color Name Finder</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0 items-start">
        <div className="space-y-6 bg-card border border-border rounded-xl p-8 shadow-sm">
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Select or Enter Color</label>
            <div className="flex gap-4">
              <input 
                type="color" 
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-24 h-24 rounded-2xl border-0 p-0 overflow-hidden cursor-pointer bg-transparent"
              />
              <div className="flex-1 flex flex-col justify-center gap-2">
                 <input 
                  value={hex}
                  onChange={(e) => setHex(e.target.value.toUpperCase())}
                  className="w-full bg-background border border-border px-4 py-3 rounded-xl font-mono text-xl font-bold outline-none focus:border-primary transition-all"
                  maxLength={7}
                 />
                 <p className="text-[10px] text-muted-foreground ml-1">Hexadecimal representation</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-border space-y-4">
             <p className="text-xs text-muted-foreground leading-relaxed">
               Pick any color to find its closest official name. We compare your hex code against a library of curated colors to find the best match.
             </p>
             <div className="flex gap-2">
               {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map(c => (
                 <button key={c} onClick={() => setHex(c)} className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: c }} />
               ))}
             </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-lg p-10 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
          {match ? (
            <>
              <div className="w-48 h-48 rounded-full shadow-2xl border-8 border-background relative animate-in fade-in zoom-in duration-500" style={{ backgroundColor: hex }}>
                 <div className="absolute inset-0 rounded-full bg-black/10 flex items-center justify-center">
                    <Palette className="w-12 h-12 text-white/50" />
                 </div>
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-foreground mb-2">{match.name}</h3>
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{match.hex}</p>
              </div>
              <button 
                onClick={copy}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy Name
              </button>
            </>
          ) : (
            <div className="text-muted-foreground/30 flex flex-col items-center gap-4">
               <Search className="w-16 h-16" />
               <p className="uppercase font-bold tracking-[0.2em] text-xs">Awaiting Input</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
