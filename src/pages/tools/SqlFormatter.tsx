import React, { useState } from 'react';
import { DatabaseZap, Copy, RefreshCw, Database } from 'lucide-react';
import { format } from 'sql-formatter';
import { CompanionTool } from '@/components/CompanionTool';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function SqlFormatter() {
  const [input, setInput] = useState(`SELECT u.id, u.name, o.total FROM users u LEFT JOIN orders o ON u.id=o.user_id WHERE o.total > 100 AND u.active=true ORDER BY o.total DESC LIMIT 50`);
  const [output, setOutput] = useState('');
  const [dialect, setDialect] = useLocalStorage<'sql' | 'postgresql' | 'mysql' | 'sqlite'>('devdock_sql_dialect', 'sql');
  const [error, setError] = useState('');

  const formatSql = () => {
    setError('');
    try {
      const result = format(input, { language: dialect, tabWidth: 2, keywordCase: 'upper' });
      setOutput(result);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><DatabaseZap className="w-6 h-6 text-primary" /> SQL Formatter</h2>
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40">
          <Copy className="w-4 h-4" /> Copy
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Paste raw, minified SQL queries to apply consistent indentation, uppercase keywords, and alignment. Supports PostgreSQL, MySQL, and SQLite dialects.
      </p>
      <CompanionTool to="/tools/schema" icon={Database} accent="blue"
        title="Pair with Schema Designer"
        description="Design your tables visually and generate the CREATE TABLE SQL, then format it here." />

      <div className="flex gap-2 flex-wrap">
        {(['sql', 'postgresql', 'mysql', 'sqlite'] as const).map(d => (
          <button key={d} onClick={() => setDialect(d)}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all border ${dialect === d ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted/40'}`}>
            {d.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[380px]">
        <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm focus-within:border-primary/50 transition-colors">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">Raw SQL Input</div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm" spellCheck="false" />
        </div>
        <div className="flex flex-col bg-[#1e1e1e] border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-black/20 border-b border-border/50">Formatted Output</div>
          {error ? (
            <div className="p-4 text-sm text-destructive font-mono">{error}</div>
          ) : (
            <textarea readOnly value={output} className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm text-green-300 leading-relaxed" spellCheck="false" />
          )}
        </div>
      </div>

      <button onClick={formatSql} className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
        <RefreshCw className="w-4 h-4" /> Format SQL
      </button>
    </div>
  );
}
