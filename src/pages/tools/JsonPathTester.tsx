import React, { useState, useEffect } from 'react';
import { Search, FileJson, Copy, Check, DatabaseZap } from 'lucide-react';
import { JSONPath } from 'jsonpath-plus';
import { CompanionTool } from '@/components/CompanionTool';

const DEFAULT_JSON = {
  users: [
    { id: 1, name: "Alice", email: "alice@example.com", roles: ["admin", "editor"] },
    { id: 2, name: "Bob", email: "bob@example.com", roles: ["viewer"] },
    { id: 3, name: "Charlie", email: "charlie@example.com", roles: ["editor"] }
  ],
  config: { version: "1.0", debug: true }
};

import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function JsonPathTester() {
  const [json, setJson] = useLocalStorage('devdock_jsonpath_source', JSON.stringify(DEFAULT_JSON, null, 2));
  const [path, setPath] = useLocalStorage('devdock_jsonpath_expr', '$.users[?(@.roles.includes("editor"))].name');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      setError(null);
      const parsed = JSON.parse(json);
      if (path.trim()) {
        const found = JSONPath({ path, json: parsed });
        setResult(found);
      } else {
        setResult(parsed);
      }
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  }, [json, path]);

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Search className="w-6 h-6 text-primary" /> JSON Path Tester</h2>
      </div>

      <p className="text-sm text-muted-foreground/80">
        Test <code className="font-mono text-primary bg-primary/10 px-1 rounded">JSONPath</code> expressions against complex JSON objects. Perfect for debugging API response traversals or data transformations.
      </p>

      <CompanionTool to="/tools/json-to-table" icon={FileJson} accent="orange" 
        title="Visualize result as Table" 
        description="If your result is an array of objects, use JSON to Table to get a flattened view." />
        
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">JSONPath Expression</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-primary font-mono text-lg font-bold group-hover:scale-110 transition-transform">$</span>
            </div>
            <input 
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="e.users[*].name"
              className="w-full bg-background border border-border pl-8 pr-4 py-3 rounded-xl font-mono text-sm outline-none focus:border-primary transition-all shadow-inner"
            />
          </div>
          <div className="flex gap-2 mt-2">
             <span className="text-[10px] font-mono text-muted-foreground/60">Try: <button onClick={() => setPath('$.users[*].id')} className="underline hover:text-foreground">$.users[*].id</button></span>
             <span className="text-[10px] font-mono text-muted-foreground/60">| <button onClick={() => setPath('$.users[?(@.id > 1)]')} className="underline hover:text-foreground">$.users[?(@.id > 1)]</button></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 bg-muted/30 border-b border-border">
            Source JSON
          </div>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className="flex-1 resize-none bg-transparent p-4 font-mono text-sm outline-none text-foreground placeholder:text-muted-foreground/40"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Query Result</span>
            {result !== null && (
              <button 
                onClick={copy}
                className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy Result</>}
              </button>
            )}
          </div>
          <div className="flex-1 p-4 font-mono text-sm text-foreground overflow-auto bg-black/10">
            {error ? (
              <div className="text-destructive bg-destructive/10 p-4 rounded-lg border border-destructive/20 whitespace-normal">
                {error}
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-all leading-relaxed">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
