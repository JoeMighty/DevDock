import React, { useState, useEffect } from 'react';
import { GitCompare } from 'lucide-react';
import ReactDiffViewer from 'react-diff-viewer-continued';

export default function TextDiff() {
  const [left, setLeft] = useState(`The quick brown fox jumps over the lazy dog.
DevDock has 35 specialized tools.
Version 1.2.0 is now live.`);
  const [right, setRight] = useState(`The quick brown fox leaps over the lazy dog.
DevDock has 40 specialized tools.
Version 1.3.0 is now live.`);
  const [splitView, setSplitView] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-primary" /> Text Diff
        </h2>
        <div className="flex gap-2 p-1 bg-muted/30 rounded-lg border border-border/50">
          {[{ label: 'Split', val: true }, { label: 'Unified', val: false }].map(({ label, val }) => (
            <button key={label} onClick={() => setSplitView(val)}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${splitView === val ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground/80">
        General-purpose text comparison. Paste any two blocks of text and see exact line-level additions, removals, and changes highlighted in real time.
      </p>

      <div className="grid grid-cols-2 gap-4 h-48">
        {[
          { label: 'Original', value: left, onChange: setLeft },
          { label: 'Modified', value: right, onChange: setRight },
        ].map(({ label, value, onChange }) => (
          <div key={label} className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm focus-within:border-primary/50 transition-colors">
            <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">{label}</div>
            <textarea value={value} onChange={e => onChange(e.target.value)}
              className="flex-1 w-full bg-transparent p-3 resize-none outline-none font-mono text-sm" spellCheck="false" />
          </div>
        ))}
      </div>

      <div className="flex-1 border border-border rounded-xl shadow-sm overflow-hidden bg-card min-h-[200px]">
        <div className="overflow-auto h-full p-2">
          <ReactDiffViewer
            oldValue={left}
            newValue={right}
            splitView={splitView}
            useDarkTheme={isDark}
            styles={{
              variables: {
                dark: {
                  diffViewerBackground: 'transparent',
                  addedBackground: 'rgba(34,197,94,0.1)',
                  wordAddedBackground: 'rgba(34,197,94,0.35)',
                  removedBackground: 'rgba(239,68,68,0.1)',
                  wordRemovedBackground: 'rgba(239,68,68,0.35)',
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
