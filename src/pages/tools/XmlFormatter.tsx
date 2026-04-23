import React, { useState } from 'react';
import { Code, Copy, RefreshCw } from 'lucide-react';

function formatXml(xml: string, indent: number): string {
  let result = '';
  let depth = 0;
  const pad = (n: number) => ' '.repeat(indent * n);

  // Tokenize by splitting on tag boundaries while preserving content
  const tokens = xml
    .replace(/>\s+</g, '><')
    .replace(/</g, '\n<')
    .replace(/>/g, '>\n')
    .split('\n')
    .map(t => t.trim())
    .filter(Boolean);

  let prev = '';
  for (const token of tokens) {
    if (token.startsWith('</')) {
      depth = Math.max(0, depth - 1);
      result += pad(depth) + token + '\n';
    } else if (token.startsWith('<') && !token.startsWith('<?') && !token.startsWith('<!') && !token.endsWith('/>') && !token.includes('</')) {
      result += pad(depth) + token + '\n';
      depth++;
    } else if (token.startsWith('<')) {
      result += pad(depth) + token + '\n';
    } else {
      // Text content — attach to previous tag line
      result = result.trimEnd() + token + '\n';
    }
    prev = token;
  }

  return result.trim();
}

function minifyXml(xml: string): string {
  return xml.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
}

function validateXml(xml: string): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const err = doc.querySelector('parsererror');
    return err ? err.textContent || 'Parse error' : '';
  } catch {
    return 'Parse error';
  }
}

export default function XmlFormatter() {
  const [input, setInput] = useState(`<?xml version="1.0" encoding="UTF-8"?><catalog><book id="1"><title>The Pragmatic Programmer</title><author>David Thomas</author><price>45.99</price></book><book id="2"><title>Clean Code</title><author>Robert C. Martin</author><price>39.99</price></book></catalog>`);
  const [mode, setMode] = useState<'format' | 'minify'>('format');
  const [indentSize, setIndentSize] = useState(2);

  const validationError = validateXml(input);
  const output = validationError
    ? ''
    : mode === 'format' ? formatXml(input, indentSize) : minifyXml(input);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Code className="w-6 h-6 text-primary" /> XML Formatter
        </h2>
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40">
          <Copy className="w-4 h-4" /> Copy
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Prettify or minify raw XML. Useful for SOAP APIs, Android manifests, Maven POMs, RSS feeds, and any XML configuration files.
      </p>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex gap-2 p-1 bg-muted/30 rounded-lg border border-border/50">
          {([['format', 'Prettify'], ['minify', 'Minify']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setMode(val)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${mode === val ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
              {label}
            </button>
          ))}
        </div>
        {mode === 'format' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Indent</span>
            {[2, 4].map(n => (
              <button key={n} onClick={() => setIndentSize(n)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-bold border transition-all ${indentSize === n ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                {n}
              </button>
            ))}
          </div>
        )}
        {validationError && (
          <span className="text-xs text-destructive font-semibold bg-destructive/10 border border-destructive/20 px-3 py-1 rounded-lg">
            ⚠ Invalid XML
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[380px]">
        <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm focus-within:border-primary/50 transition-colors">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">XML Input</div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed" spellCheck="false" />
        </div>
        <div className="flex flex-col bg-[#1e1e1e] border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-black/20 border-b border-border/50">
            {mode === 'format' ? 'Formatted Output' : 'Minified Output'}
          </div>
          {validationError ? (
            <div className="p-4 text-sm text-destructive font-mono whitespace-pre-wrap">{validationError}</div>
          ) : (
            <textarea readOnly value={output}
              className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed text-orange-300" spellCheck="false" />
          )}
        </div>
      </div>
    </div>
  );
}
