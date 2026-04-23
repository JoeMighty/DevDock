import React, { useState, useEffect } from 'react';
import { Palette, Copy, Check, FileCode2, Sparkles } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function SvgToReact() {
  const [svg, setSvg] = useLocalStorage('devdock_svg_react_input', `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="2" />
</svg>`);
  const [componentName, setComponentName] = useState('Icon');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cleanSvg = svg.trim();
    // Replace attributes for React
    cleanSvg = cleanSvg
      .replace(/(\s)class=/g, '$1className=')
      .replace(/(\s)stroke-width=/g, '$1strokeWidth=')
      .replace(/(\s)stroke-linecap=/g, '$1strokeLinecap=')
      .replace(/(\s)stroke-linejoin=/g, '$1strokeLinejoin=')
      .replace(/(\s)fill-rule=/g, '$1fillRule=')
      .replace(/(\s)clip-rule=/g, '$1clipRule=')
      .replace(/(\s)stop-color=/g, '$1stopColor=')
      .replace(/(\s)stop-opacity=/g, '$1stopOpacity=')
      .replace(/(\s)xmlns:xlink=/g, '$1xmlnsXlink=')
      .replace(/(\s)xlink:href=/g, '$1xlinkHref=')
      .replace(/style="([^"]*)"/g, (match, p1) => {
        const styles = p1.split(';').reduce((acc: any, style: string) => {
          const [key, value] = style.split(':').map(s => s.trim());
          if (key && value) {
            const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            acc[camelKey] = value;
          }
          return acc;
        }, {});
        return `style={${JSON.stringify(styles)}}`;
      });

    const comp = `import React from 'react';

export default function ${componentName}(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${cleanSvg.replace('<svg', '<svg {...props}')}
  );
}`;
    setOutput(comp);
  }, [svg, componentName]);

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Palette className="w-6 h-6 text-primary" /> SVG to React</h2>
        <div className="flex gap-4">
          <input 
            value={componentName}
            onChange={(e) => setComponentName(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
            className="bg-transparent text-sm font-bold border-b border-primary/20 outline-none hover:border-primary transition-colors text-right"
            placeholder="ComponentName"
          />
          <button 
           onClick={copy}
           className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy Component
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 bg-muted/30 border-b border-border">
            SVG Source
          </div>
          <textarea
            value={svg}
            onChange={(e) => setSvg(e.target.value)}
            className="flex-1 resize-none bg-transparent p-4 font-mono text-sm outline-none text-foreground placeholder:text-muted-foreground/40"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Functional Component</span>
          </div>
          <pre className="flex-1 p-4 font-mono text-xs text-foreground overflow-auto bg-black/10 leading-relaxed">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
