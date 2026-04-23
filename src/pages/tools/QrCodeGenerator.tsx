import React, { useState, useEffect } from 'react';
import { QrCode, Download, Copy } from 'lucide-react';
import QRCodeLib from 'qrcode';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://joemighty.github.io/DevDock/');
  const [dataUrl, setDataUrl] = useState('');
  const [size, setSize] = useState(256);
  const [color, setColor] = useState('#8b5cf6');
  const [bg, setBg] = useState('#ffffff');

  useEffect(() => {
    if (!text) { setDataUrl(''); return; }
    QRCodeLib.toDataURL(text, { width: size, color: { dark: color, light: bg }, margin: 2 })
      .then(setDataUrl).catch(() => setDataUrl(''));
  }, [text, size, color, bg]);

  const download = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><QrCode className="w-6 h-6 text-primary" /> QR Code Generator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Instantly generate downloadable QR codes from URLs, text, or any string. Customize colors and size — great for sharing staging environment links.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Content</label>
            <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-mono outline-none focus:border-primary resize-none transition-all" />
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-5">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Size</label>
                <span className="text-xs font-mono text-primary">{size}px</span>
              </div>
              <input type="range" min={128} max={512} step={8} value={size} onChange={e => setSize(Number(e.target.value))} className="w-full accent-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">QR Color</label>
                <div className="flex items-center gap-2 border border-border rounded-lg p-2 bg-background">
                  <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                  <span className="font-mono text-sm">{color}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Background</label>
                <div className="flex items-center gap-2 border border-border rounded-lg p-2 bg-background">
                  <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent" />
                  <span className="font-mono text-sm">{bg}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center gap-4">
          {dataUrl ? (
            <>
              <img src={dataUrl} alt="QR Code" className="rounded-xl shadow-md" style={{ width: Math.min(size, 280), height: Math.min(size, 280) }} />
              <div className="flex gap-3 w-full mt-2">
                <button onClick={download} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
                  <Download className="w-4 h-4" /> Download PNG
                </button>
                <button onClick={() => navigator.clipboard.writeText(dataUrl)} className="flex items-center gap-2 px-4 py-2.5 bg-muted hover:bg-muted/80 border border-border rounded-xl text-sm font-bold transition-colors">
                  <Copy className="w-4 h-4" /> Copy URI
                </button>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground text-sm">Enter content to generate a QR code.</div>
          )}
        </div>
      </div>
    </div>
  );
}
