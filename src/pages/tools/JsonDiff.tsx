import React, { useState, useEffect } from 'react';
import { FileDiff, GitCompare } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';
import ReactDiffViewer from 'react-diff-viewer-continued';

export default function JsonDiff() {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
     setIsDark(document.documentElement.classList.contains('dark'));
     const observer = new MutationObserver((mutations) => {
         mutations.forEach((mutation) => {
             if (mutation.attributeName === 'class') {
                 setIsDark(document.documentElement.classList.contains('dark'));
             }
         });
     });
     observer.observe(document.documentElement, { attributes: true });
     return () => observer.disconnect();
  }, []);

  const [oldJson, setOldJson] = useState('{\n  "status": 200,\n  "role": "user",\n  "flags": ["beta", "active"]\n}');
  const [newJson, setNewJson] = useState('{\n  "status": 200,\n  "role": "admin",\n  "flags": ["active", "premium"]\n}');

  const formatJson = (str: string) => {
      try {
          return JSON.stringify(JSON.parse(str), null, 2);
      } catch {
          return str; // If invalid, diff raw text
      }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><FileDiff className="w-6 h-6 text-primary" /> JSON Payload Differ</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Paste two JSON objects. They will be strictly formatted and compared via a Git-style dual-pane engine to instantly spotlight line mutations.
      </p>
      <CompanionTool to="/tools/text-diff" icon={GitCompare} accent="cyan"
        title="Diffing plain text instead?"
        description="Switch to Text Diff for general line-level comparison of any two text blocks." />

      <div className="grid grid-cols-2 gap-4 h-48 mb-4">
         <div className="flex flex-col h-full bg-card border border-border rounded-xl shadow-sm overflow-hidden p-1 focus-within:border-primary/50 transition-colors">
            <div className="text-xs font-bold text-muted-foreground uppercase px-3 py-1.5 bg-muted/30 border-b border-border">Original JSON Payload</div>
            <textarea 
               value={oldJson} onChange={(e) => setOldJson(e.target.value)}
               className="flex-1 w-full bg-transparent p-3 resize-none outline-none font-mono text-xs leading-relaxed" spellCheck="false"
            />
         </div>
         <div className="flex flex-col h-full bg-card border border-border rounded-xl shadow-sm overflow-hidden p-1 focus-within:border-primary/50 transition-colors">
            <div className="text-xs font-bold text-muted-foreground uppercase px-3 py-1.5 bg-muted/30 border-b border-border">Modified JSON Payload</div>
            <textarea 
               value={newJson} onChange={(e) => setNewJson(e.target.value)}
               className="flex-1 w-full bg-transparent p-3 resize-none outline-none font-mono text-xs leading-relaxed" spellCheck="false"
            />
         </div>
      </div>

      <div className="flex-1 border border-border rounded-xl shadow-sm overflow-hidden bg-card">
          <div className="overflow-auto h-full p-2">
              <ReactDiffViewer 
                 oldValue={formatJson(oldJson)} 
                 newValue={formatJson(newJson)} 
                 splitView={true} 
                 useDarkTheme={isDark}
                 styles={{
                    variables: {
                        dark: {
                            diffViewerBackground: 'transparent',
                            wordAddedBackground: 'rgba(34, 197, 94, 0.4)',
                            addedBackground: 'rgba(34, 197, 94, 0.1)',
                            wordRemovedBackground: 'rgba(239, 68, 68, 0.4)',
                            removedBackground: 'rgba(239, 68, 68, 0.1)'
                        }
                    }
                 }}
              />
          </div>
      </div>
    </div>
  );
}
