import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Download, Type, Palette, QrCode } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

const SIZES = [16, 32, 48, 64, 128, 512];

import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function FaviconGenerator() {
  const [text, setText] = useLocalStorage('devdock_favicon_text', 'DD');
  const [fontSize, setFontSize] = useLocalStorage('devdock_favicon_size', 80);
  const [bgColor, setBgColor] = useLocalStorage('devdock_favicon_bg', '#6366f1');
  const [textColor, setTextColor] = useLocalStorage('devdock_favicon_text_color', '#ffffff');
  const [radius, setRadius] = useLocalStorage('devdock_favicon_radius', 25);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (size: number, hiddenCanvas?: HTMLCanvasElement) => {
    const canvas = hiddenCanvas || canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = bgColor;
    const r = (size * radius) / 100;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(size - r, 0);
    ctx.quadraticCurveTo(size, 0, size, r);
    ctx.lineTo(size, size - r);
    ctx.quadraticCurveTo(size, size, size - r, size);
    ctx.lineTo(r, size);
    ctx.quadraticCurveTo(0, size, 0, size - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    // Text
    ctx.fillStyle = textColor;
    const actualFontSize = (size * fontSize) / 100;
    ctx.font = `bold ${actualFontSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size / 2, size / 2 + size * 0.02);
  };

  useEffect(() => {
    draw(512);
  }, [text, fontSize, bgColor, textColor, radius]);

  const download = (size: number) => {
    const tempCanvas = document.createElement('canvas');
    draw(size, tempCanvas);
    const link = document.createElement('a');
    link.download = `favicon-${size}x${size}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="w-6 h-6 text-primary" /> Favicon Generator</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => download(32)}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-xl font-bold text-sm transition-all"
          >
            Download 32x32
          </button>
          <button 
            onClick={() => download(512)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <Download className="w-4 h-4" /> Download 512x512
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground/80">
        Create professional app icons and favicons in seconds. Perfect for early-stage projects. Choose text, colors, and border radius.
      </p>

      <CompanionTool to="/tools/qr-code" icon={QrCode} accent="purple" 
        title="Use in QR Code" 
        description="Head to QR Code Designer after generating and upload this icon as your central logo." />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl shadow-sm p-8 flex items-center justify-center relative overflow-hidden">
           {/* Grid pattern background */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
           
           <div className="relative">
             <canvas 
               ref={canvasRef} 
               className="max-w-full h-auto rounded-3xl shadow-2xl border border-white/10"
               style={{ width: '256px', height: '256px' }}
             />
             <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                {SIZES.slice(0, 4).map(s => (
                  <div key={s} className="flex flex-col items-center gap-1">
                    <div className="bg-muted w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold text-muted-foreground">{s}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-6 overflow-y-auto">
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Content</label>
            <input 
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={3}
              className="w-full bg-background border border-border px-4 py-3 rounded-xl font-bold text-xl outline-none focus:border-primary transition-all uppercase text-center"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Background</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 border-0 bg-transparent cursor-pointer" />
                <code className="text-[10px] font-mono">{bgColor.toUpperCase()}</code>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Text Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-10 h-10 border-0 bg-transparent cursor-pointer" />
                <code className="text-[10px] font-mono">{textColor.toUpperCase()}</code>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
              <span>Font Size</span><span>{fontSize}%</span>
            </div>
            <input type="range" min={10} max={100} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-primary" />
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
              <span>Border Radius</span><span>{radius}%</span>
            </div>
            <input type="range" min={0} max={50} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-primary" />
          </div>

          <div className="pt-4 border-t border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-3">Download Sizes</span>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map(s => (
                <button 
                  key={s} 
                  onClick={() => download(s)}
                  className="px-2 py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-[10px] font-bold transition-all"
                >
                  {s}x{s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
