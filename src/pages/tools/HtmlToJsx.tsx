import React, { useState } from 'react';
import { ArrowRightLeft, Code2 } from 'lucide-react';

export default function HtmlToJsx() {
  const [html, setHtml] = useState('<div class="container">\n  <label for="email">Email</label>\n  <input type="text" class="input" tabindex="1">\n  <hr>\n</div>');
  const [jsx, setJsx] = useState('');

  const convert = (input: string) => {
      let output = input;
      // Attributes
      output = output.replace(/class=/g, 'className=');
      output = output.replace(/for=/g, 'htmlFor=');
      output = output.replace(/tabindex=/g, 'tabIndex=');
      output = output.replace(/stroke-width=/g, 'strokeWidth=');
      output = output.replace(/stroke-linecap=/g, 'strokeLinecap=');
      output = output.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
      
      // Standalone tags
      output = output.replace(/<hr(.*?)>/g, (m, a) => (a.endsWith('/') ? m : `<hr${a} />`));
      output = output.replace(/<br(.*?)>/g, (m, a) => (a.endsWith('/') ? m : `<br${a} />`));
      output = output.replace(/<input(.*?)>/g, (m, a) => (a.endsWith('/') ? m : `<input${a} />`));
      output = output.replace(/<img(.*?)>/g, (m, a) => (a.endsWith('/') ? m : `<img${a} />`));

      // SVG Camel casing
      output = output.replace(/fill-rule/g, 'fillRule');
      output = output.replace(/clip-rule/g, 'clipRule');

      // Styles
      output = output.replace(/style="([^"]*)"/g, (match, styles) => {
          const rules = styles.split(';').filter((s: string) => s.trim() !== '');
          const reactStyle = rules.map((r: string) => {
              const [k, v] = r.split(':');
              if (!k || !v) return '';
              const camelKey = k.trim().replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
              return `${camelKey}: '${v.trim().replace(/'/g, '"')}'`;
          }).filter(Boolean).join(', ');
          return `style={{ ${reactStyle} }}`;
      });

      return output;
  };

  React.useEffect(() => {
      setJsx(convert(html));
  }, [html]);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Code2 className="w-6 h-6 text-primary" /> HTML to JSX Compiler</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Paste raw HTML or SVG code and instantly convert it to valid React JSX. Automatically maps classes and handles self-closing tags.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[400px]">
         <div className="flex flex-col bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
             <div className="p-3 border-b border-border bg-muted/50 font-semibold text-sm">HTML INPUT</div>
             <textarea 
               value={html}
               onChange={e => setHtml(e.target.value)}
               className="flex-1 w-full bg-transparent p-6 resize-none outline-none font-mono text-sm leading-relaxed text-blue-300" 
               spellCheck="false"
             />
         </div>
         <div className="flex flex-col bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
             <div className="p-3 border-b border-border bg-muted/50 font-semibold text-sm flex items-center justify-between">
                 REACT JSX <ArrowRightLeft className="w-4 h-4 text-muted-foreground"/>
             </div>
             <textarea 
               value={jsx}
               readOnly
               className="flex-1 w-full bg-transparent p-6 resize-none outline-none font-mono text-sm leading-relaxed text-green-300 selection:bg-green-300/30" 
               spellCheck="false"
             />
         </div>
      </div>
    </div>
  );
}
