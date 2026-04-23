import React, { useState } from 'react';
import { Table2, Copy, RefreshCw, ArrowLeftRight, DatabaseZap } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

export default function CsvJsonConverter() {
  const [mode, setMode] = useState<'csv-to-json' | 'json-to-csv'>('csv-to-json');
  const [input, setInput] = useState(`name,age,city\nAlice,30,London\nBob,25,New York\nCharlie,35,Tokyo`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const csvToJson = (csv: string) => {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) throw new Error('CSV must have at least a header row and one data row.');
    const headers = lines[0].split(',').map(h => h.trim());
    return JSON.stringify(
      lines.slice(1).map(line => {
        const vals = line.split(',').map(v => v.trim());
        return headers.reduce((obj, h, i) => {
          const v = vals[i] ?? '';
          obj[h] = isNaN(Number(v)) || v === '' ? v : Number(v);
          return obj;
        }, {} as Record<string, unknown>);
      }), null, 2
    );
  };

  const jsonToCsv = (json: string) => {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) throw new Error('Input must be a JSON array of objects.');
    const headers = Object.keys(arr[0]);
    return [headers.join(','), ...arr.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))].join('\n');
  };

  const convert = () => {
    setError('');
    try {
      setOutput(mode === 'csv-to-json' ? csvToJson(input) : jsonToCsv(input));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const swap = () => {
    const newMode = mode === 'csv-to-json' ? 'json-to-csv' : 'csv-to-json';
    setMode(newMode);
    setInput(output || input);
    setOutput('');
    setError('');
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Table2 className="w-6 h-6 text-primary" /> CSV ↔ JSON Converter</h2>
        <div className="flex gap-2">
          <button onClick={swap} className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors">
            <ArrowLeftRight className="w-4 h-4" /> Swap
          </button>
          <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output} className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors disabled:opacity-40">
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Convert between CSV spreadsheet exports and JSON arrays instantly. Bidirectional — great for database seeding and data exports.
      </p>
      <CompanionTool to="/tools/mock-data" icon={DatabaseZap} accent="orange"
        title="Need JSON data to convert? Generate it"
        description="Build a typed schema and generate a bulk JSON array, then convert it to CSV here." />

      <div className="flex gap-2 p-1 bg-muted/30 rounded-lg w-fit border border-border/50">
        {(['csv-to-json', 'json-to-csv'] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setOutput(''); setError(''); }}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${mode === m ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:text-foreground'}`}>
            {m === 'csv-to-json' ? 'CSV → JSON' : 'JSON → CSV'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[400px]">
        <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm focus-within:border-primary/50 transition-colors">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">
            {mode === 'csv-to-json' ? 'CSV Input' : 'JSON Input'}
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm" spellCheck="false" />
        </div>
        <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="text-xs font-bold text-muted-foreground uppercase px-4 py-2 bg-muted/30 border-b border-border">
            {mode === 'csv-to-json' ? 'JSON Output' : 'CSV Output'}
          </div>
          {error ? (
            <div className="p-4 text-sm text-destructive font-mono">{error}</div>
          ) : (
            <textarea readOnly value={output} className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm text-blue-300" spellCheck="false" />
          )}
        </div>
      </div>

      <button onClick={convert} className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
        <RefreshCw className="w-4 h-4" /> Convert
      </button>
    </div>
  );
}
