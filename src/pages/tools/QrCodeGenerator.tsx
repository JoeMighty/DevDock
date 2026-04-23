import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { DotType, CornerSquareType, CornerDotType } from 'qr-code-styling';
import { QrCode, Download, Upload, X, Link2 } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// ─── Types ────────────────────────────────────────────────────────────────────
type DotStyle = DotType;
type OuterEyeStyle = CornerSquareType;
type InnerEyeStyle = CornerDotType;

type ColorMode = 'unified' | 'custom';

interface QrOptions {
  text: string;
  size: number;
  colorMode: ColorMode;
  dotColor: string;
  outerEyeColor: string;
  innerEyeColor: string;
  bgColor: string;
  dotStyle: DotStyle;
  outerEyeStyle: OuterEyeStyle;
  innerEyeStyle: InnerEyeStyle;
  logo: string;
  logoSize: number;
}

// ─── Option Sets ──────────────────────────────────────────────────────────────
const DOT_STYLES: { value: DotStyle; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rd.' },
  { value: 'extra-rounded', label: 'Extra Rd.' },
];

const OUTER_EYE_STYLES: { value: OuterEyeStyle; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Rounded' },
  { value: 'dot', label: 'Dot' },
];

const INNER_EYE_STYLES: { value: InnerEyeStyle; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

// ─── Colour Swatch ────────────────────────────────────────────────────────────
function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1.5">{label}</label>
      <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 py-1.5">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent flex-shrink-0" />
        <span className="font-mono text-xs text-foreground">{value.toUpperCase()}</span>
      </div>
    </div>
  );
}

// ─── Pill Selector ────────────────────────────────────────────────────────────
function PillSelect<T extends string>({ label, options, value, onChange }: { label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1.5">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map(o => (
          <button key={o.value} onClick={() => onChange(o.value)}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all border ${value === o.value ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function QrCodeGenerator() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── QR Code options (persisted, logo excluded to avoid quota issues)
  const [opts, setOpts] = useLocalStorage<Omit<QrOptions, 'logo'> & { logoSize: number }>('devdock_qr_opts', {
    text: 'https://joemighty.github.io/DevDock/',
    size: 300,
    colorMode: 'unified',
    dotColor: '#8b5cf6',
    outerEyeColor: '#8b5cf6',
    innerEyeColor: '#8b5cf6',
    bgColor: '#ffffff',
    dotStyle: 'rounded',
    outerEyeStyle: 'extra-rounded',
    innerEyeStyle: 'dot',
    logoSize: 0.25,
  });
  // logo is session-only (base64 blobs can be multiple MB)
  const [logo, setLogo] = useState('');

  const set = <K extends keyof QrOptions>(key: K, val: QrOptions[K]) => {
    if (key === 'logo') { setLogo(val as string); return; }
    setOpts(prev => ({ ...prev, [key]: val }));
  };

  const buildQrConfig = (o: typeof opts, logoUrl: string) => ({
    width: o.size,
    height: o.size,
    data: o.text || ' ',
    image: logoUrl || undefined,
    margin: 12,
    imageOptions: { crossOrigin: 'anonymous' as const, margin: 6, imageSize: o.logoSize, hideBackgroundDots: true },
    dotsOptions: { color: o.dotColor, type: o.dotStyle },
    cornersSquareOptions: { color: o.colorMode === 'custom' ? o.outerEyeColor : o.dotColor, type: o.outerEyeStyle },
    cornersDotOptions: { color: o.colorMode === 'custom' ? o.innerEyeColor : o.dotColor, type: o.innerEyeStyle },
    backgroundOptions: { color: o.bgColor },
  });

  // Mount once
  useEffect(() => {
    if (!canvasRef.current) return;
    qrRef.current = new QRCodeStyling(buildQrConfig(opts, logo));
    qrRef.current.append(canvasRef.current);
  }, []);

  // Update on option/logo change
  useEffect(() => {
    qrRef.current?.update(buildQrConfig(opts, logo));
  }, [opts, logo]);

  const download = () => qrRef.current?.download({ name: 'devdock-qr', extension: 'png' });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set('logo', ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <QrCode className="w-6 h-6 text-primary" /> QR Code Designer
        </h2>
        <button onClick={download}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all text-sm">
          <Download className="w-4 h-4" /> Download PNG
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Design fully custom QR codes. Adjust eye shapes, data dot styles, per-element colour overrides, and embed a logo directly in the centre.
      </p>
      <CompanionTool to="/tools/url-parser" icon={Link2} accent="blue"
        title="Build the URL first"
        description="Use URL Parser & Builder to compose and clean your URL before generating a QR code." />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 flex-1 min-h-0 overflow-y-auto">

        {/* ── Left: Options ── */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">

          {/* Content */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Content / URL</label>
            <textarea value={opts.text} onChange={e => set('text', e.target.value)} rows={2}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm font-mono outline-none focus:border-primary resize-none transition-all" />
          </div>

          {/* Size */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Canvas Size</label>
              <span className="text-xs font-mono text-primary">{opts.size}px</span>
            </div>
            <input type="range" min={150} max={500} step={10} value={opts.size} onChange={e => set('size', Number(e.target.value))}
              className="w-full accent-primary" />
          </div>

          {/* Dot Style */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <PillSelect label="Data Dot Style" options={DOT_STYLES} value={opts.dotStyle} onChange={v => set('dotStyle', v)} />
          </div>

          {/* Eye Styles */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-4">
            <PillSelect label="Outer Eye Shape" options={OUTER_EYE_STYLES} value={opts.outerEyeStyle} onChange={v => set('outerEyeStyle', v)} />
            <PillSelect label="Inner Eye Shape" options={INNER_EYE_STYLES} value={opts.innerEyeStyle} onChange={v => set('innerEyeStyle', v)} />
          </div>

          {/* Colours */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Colour Mode</label>
              <div className="flex gap-1.5 p-1 bg-muted/30 rounded-lg border border-border/50">
                {(['unified', 'custom'] as const).map(m => (
                  <button key={m} onClick={() => set('colorMode', m)}
                    className={`px-3 py-1 rounded-md text-xs font-bold capitalize transition-all ${opts.colorMode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {m === 'unified' ? 'All One Colour' : 'Per Element'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <ColorPicker label="Dot Colour" value={opts.dotColor} onChange={v => set('dotColor', v)} />
              <ColorPicker label="Background" value={opts.bgColor} onChange={v => set('bgColor', v)} />
              {opts.colorMode === 'custom' && (
                <>
                  <ColorPicker label="Outer Eye" value={opts.outerEyeColor} onChange={v => set('outerEyeColor', v)} />
                  <ColorPicker label="Inner Eye" value={opts.innerEyeColor} onChange={v => set('innerEyeColor', v)} />
                </>
              )}
            </div>
          </div>

          {/* Logo */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-3">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Centre Logo (Optional)</label>
            <input type="file" accept="image/*" ref={fileRef} onChange={handleLogoUpload} className="hidden" />
            <div className="flex gap-2 items-center">
              <button onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-sm font-bold transition-colors">
                <Upload className="w-4 h-4" /> Upload Logo
              </button>
              {logo && (
                <button onClick={() => setLogo('')}
                  className="flex items-center gap-1.5 px-3 py-2 text-destructive bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 rounded-lg text-sm font-bold transition-colors">
                  <X className="w-4 h-4" /> Remove
                </button>
              )}
            </div>
            {logo && (
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Logo Size</label>
                  <span className="text-xs font-mono text-primary">{Math.round(opts.logoSize * 100)}%</span>
                </div>
                <input type="range" min={0.1} max={0.4} step={0.01} value={opts.logoSize} onChange={e => set('logoSize', Number(e.target.value))}
                  className="w-full accent-primary" />
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Preview ── */}
        <div className="flex flex-col items-center justify-center bg-card border border-border rounded-2xl shadow-sm p-5 gap-4 self-start sticky top-0">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest self-start">Live Preview</div>
          <div ref={canvasRef} className="rounded-xl overflow-hidden shadow-md" />
          <button onClick={download}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all text-sm">
            <Download className="w-4 h-4" /> Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}
