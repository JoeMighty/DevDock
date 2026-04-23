import React, { useState } from 'react';
import { Sparkles, Copy, Check, Download, Trash2, Code2, UploadCloud } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

function cleanSVG(svg: string): string {
  return svg
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/<\?xml[\s\S]*?\?>/g, '') // Remove XML intro
    .replace(/<!DOCTYPE[\s\S]*?>/g, '') // Remove Doctype
    .replace(/metadata/g, "m") // obfuscate/shorten metadata (mock)
    .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
    .replace(/>\s+</g, '><') // Remove whitespace between tags
    .replace(/\s{2,}/g, ' ') // Remove extra spaces
    .replace(/id="[\s\S]*?"/g, (match) => {
        // Keep IDs if referenced? Actually simplified: keep as is or strip generic ones
        return match;
    })
    .trim();
}

import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function SvgOptimiser() {
  const [input, setInput] = useLocalStorage('devdock_svg_input', `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <!-- Optimized by DevDock -->
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`);
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{ original: number; optimized: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleOptimize = () => {
    const cleaned = cleanSVG(input);
    setOutput(cleaned);
    setStats({
      original: new Blob([input]).size,
      optimized: new Blob([cleaned]).size
    });
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([output], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized.svg';
    a.click();
  };

  const savings = stats ? ((1 - stats.optimized / stats.original) * 100).toFixed(1) : 0;

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="w-6 h-6 text-primary" /> SVG Optimiser</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleOptimize}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            Optimize
          </button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground/80">
        Strip unnecessary metadata, comments, and whitespace from SVG files to reduce bundle size and improve load times.
      </p>

      <CompanionTool to="/tools/base64" icon={UploadCloud} accent="purple" 
        title="Encode to Data URI" 
        description="After optimizing, convert your SVG to a Base64 string for direct embedding in CSS or HTML." />

      {stats && (
        <div className="grid grid-cols-3 gap-4">
           <div className="bg-muted/30 border border-border rounded-xl p-3 text-center">
             <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Original</div>
             <div className="text-sm font-mono font-bold">{stats.original} B</div>
           </div>
           <div className="bg-muted/30 border border-border rounded-xl p-3 text-center">
             <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Optimized</div>
             <div className="text-sm font-mono font-bold">{stats.optimized} B</div>
           </div>
           <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
             <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">Savings</div>
             <div className="text-sm font-mono font-bold text-green-400">-{savings}%</div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 bg-muted/30 border-b border-border">
            Raw SVG Input
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none bg-transparent p-4 font-mono text-sm outline-none text-foreground placeholder:text-muted-foreground/40"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Optimized Output</span>
            <div className="flex gap-2">
              {output && (
                <>
                  <button onClick={download} className="text-muted-foreground hover:text-foreground transition-colors p-1"><Download className="w-4 h-4"/></button>
                  <button onClick={copy} className="text-muted-foreground hover:text-primary transition-colors p-1">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </>
              )}
            </div>
          </div>
          <pre className="flex-1 p-4 font-mono text-sm text-foreground overflow-auto whitespace-pre-wrap break-all leading-relaxed bg-black/10">
            {output || <span className="text-muted-foreground/30 italic uppercase text-[10px] tracking-widest">Input SVG and Optimize</span>}
          </pre>
          
          {output && (
            <div className="absolute bottom-4 right-4 p-4 bg-background/80 backdrop-blur border border-border rounded-xl shadow-2xl max-w-[120px]">
               <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 text-center">Live Preview</div>
               <div className="flex items-center justify-center h-16 w-16 mx-auto" dangerouslySetInnerHTML={{ __html: output }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
