import React, { useState } from 'react';
import { Paintbrush, Copy } from 'lucide-react';

export default function CssGenerator() {
  const [tab, setTab] = useState<'gradient' | 'shadow'>('gradient');
  
  // Gradient state
  const [color1, setColor1] = useState('#aa3bff');
  const [color2, setColor2] = useState('#4f46e5');
  const [angle, setAngle] = useState(45);
  
  // Shadow state
  const [x, setX] = useState(0);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(-3);
  const [shadowColor, setShadowColor] = useState('rgba(0, 0, 0, 0.4)');

  const gradientCSS = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
  const shadowCSS = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${shadowColor};`;

  const copyCSS = () => {
    navigator.clipboard.writeText(tab === 'gradient' ? gradientCSS : shadowCSS);
    alert('Copied CSS to clipboard!');
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Paintbrush className="w-6 h-6 text-primary" /> CSS Generator</h2>
      </div>

      <div className="flex gap-4 border-b border-border">
        <button 
          onClick={() => setTab('gradient')} 
          className={`pb-2 font-medium text-sm transition-colors ${tab === 'gradient' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >Gradient</button>
        <button 
          onClick={() => setTab('shadow')} 
          className={`pb-2 font-medium text-sm transition-colors ${tab === 'shadow' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >Box Shadow</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        {/* Controls */}
        <div className="flex flex-col gap-6 bg-card border border-border rounded-xl shadow-sm p-6 overflow-y-auto">
          {tab === 'gradient' ? (
            <>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase flex justify-between">
                  Angle <span>{angle}°</span>
                </label>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full mt-2" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Color 1</label>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} className="flex-1 bg-muted px-3 py-2 border border-border rounded-md font-mono text-sm outline-none" />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Color 2</label>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                    <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} className="flex-1 bg-muted px-3 py-2 border border-border rounded-md font-mono text-sm outline-none" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase flex justify-between">X Offset <span>{x}px</span></label>
                <input type="range" min="-50" max="50" value={x} onChange={(e) => setX(parseInt(e.target.value))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase flex justify-between">Y Offset <span>{y}px</span></label>
                <input type="range" min="-50" max="50" value={y} onChange={(e) => setY(parseInt(e.target.value))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase flex justify-between">Blur Radius <span>{blur}px</span></label>
                <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase flex justify-between">Spread Radius <span>{spread}px</span></label>
                <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Shadow Color</label>
                <input type="text" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full mt-2 bg-muted px-3 py-2 border border-border rounded-md font-mono text-sm outline-none" />
              </div>
            </>
          )}
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 bg-card border border-border rounded-xl shadow-sm min-h-[300px] flex items-center justify-center p-8 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYNgRwEQLYBg1gGEEGkRHRzP8/PnT4YQJE/A3A05zRg0YMWAE2kEQwQAAtGckfXmB/9AAAAAASUVORK5CYII=')]">
            <div 
              className="w-full h-full max-w-[250px] max-h-[250px] rounded-2xl bg-white transition-all duration-300" 
              style={tab === 'gradient' ? { background: `linear-gradient(${angle}deg, ${color1}, ${color2})` } : { boxShadow: `${x}px ${y}px ${blur}px ${spread}px ${shadowColor}` }}
            />
          </div>
          <div className="bg-[#1e1e1e] p-4 rounded-xl border border-border relative flex items-center">
            <pre className="text-blue-300 font-mono text-sm overflow-x-auto pr-10">{tab === 'gradient' ? gradientCSS : shadowCSS}</pre>
            <button onClick={copyCSS} className="absolute right-4 text-muted-foreground hover:text-primary transition-colors bg-[#1e1e1e] p-1"><Copy className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
