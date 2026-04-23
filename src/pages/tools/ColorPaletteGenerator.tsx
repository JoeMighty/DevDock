import React, { useState, useCallback } from 'react';
import { Palette, Copy, Check } from 'lucide-react';

// ── Color math ──────────────────────────────────────────────────────────────
function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  const hex = (v: number) => Math.round(Math.max(0, Math.min(255, v * 255))).toString(16).padStart(2, '0');
  return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;
}

function rotateHue(h: number, deg: number): number { return (h + deg + 360) % 360; }

// ── Swatch ───────────────────────────────────────────────────────────────────
function Swatch({ color, label }: { color: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(color); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <button onClick={copy} className="group flex flex-col items-center gap-1.5 hover:scale-105 transition-transform" title={color}>
      <div className="w-12 h-12 rounded-xl shadow-md border border-white/10 flex items-center justify-center" style={{ backgroundColor: color }}>
        {copied && <Check className="w-4 h-4 text-white drop-shadow" />}
      </div>
      <span className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">{label || color}</span>
    </button>
  );
}

// ── Palette Row ───────────────────────────────────────────────────────────────
function PaletteRow({ title, colors, labels }: { title: string; colors: string[]; labels?: string[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">{title}</div>
      <div className="flex flex-wrap gap-3">
        {colors.map((c, i) => <Swatch key={i} color={c} label={labels?.[i]} />)}
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function ColorPaletteGenerator() {
  const [hex, setHex] = useState('#8b5cf6');

  const gen = useCallback(() => {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return null;
    const [h, s, l] = hexToHsl(hex);

    const shadeStops = [97, 93, 86, 75, 62, 50, 38, 27, 18, 11];
    const shadeLabels = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
    const shades = shadeStops.map(stop => hslToHex(h, s, stop));

    return {
      shades,
      shadeLabels,
      complementary: [hex, hslToHex(rotateHue(h, 180), s, l)],
      analogous: [
        hslToHex(rotateHue(h, -30), s, l), hex, hslToHex(rotateHue(h, 30), s, l),
        hslToHex(rotateHue(h, 60), s, l)
      ],
      triadic: [hex, hslToHex(rotateHue(h, 120), s, l), hslToHex(rotateHue(h, 240), s, l)],
      splitComp: [hex, hslToHex(rotateHue(h, 150), s, l), hslToHex(rotateHue(h, 210), s, l)],
      tetradic: [hex, hslToHex(rotateHue(h, 90), s, l), hslToHex(rotateHue(h, 180), s, l), hslToHex(rotateHue(h, 270), s, l)],
    };
  }, [hex]);

  const pal = gen();

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" /> Color Palette Generator
        </h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Input a base colour and generate harmonious palettes — from Tailwind-style shade scales to complementary, triadic, and tetradic harmony sets. Click any swatch to copy.
      </p>

      <div className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-3 border border-border rounded-lg px-3 py-2 bg-background">
          <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
          <span className="font-mono text-sm font-bold">{hex.toUpperCase()}</span>
        </div>
        <input value={hex} onChange={e => setHex(e.target.value)} placeholder="#8b5cf6" maxLength={7}
          className="flex-1 bg-background border border-border px-4 py-3 rounded-xl font-mono text-sm outline-none focus:border-primary transition-all" />
        {pal && (
          <div className="flex gap-2">
            {[hex].concat([hslToHex(rotateHue(hexToHsl(hex)[0], 120), hexToHsl(hex)[1], hexToHsl(hex)[2])]).map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
      </div>

      {pal ? (
        <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
          <PaletteRow title="Shade Scale (Tailwind-style)" colors={pal.shades} labels={pal.shadeLabels} />
          <PaletteRow title="Complementary" colors={pal.complementary} />
          <PaletteRow title="Analogous" colors={pal.analogous} />
          <PaletteRow title="Triadic" colors={pal.triadic} />
          <PaletteRow title="Split-Complementary" colors={pal.splitComp} />
          <PaletteRow title="Tetradic" colors={pal.tetradic} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed border-border/50 rounded-2xl">
          Enter a valid 6-digit hex colour above.
        </div>
      )}
    </div>
  );
}
