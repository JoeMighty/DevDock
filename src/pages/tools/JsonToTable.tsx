import React, { useState } from 'react';
import { Download, DatabaseZap } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

export default function JsonToTable() {
  const [jsonInput, setJsonInput] = useState('{\n  "name": "DevDock",\n  "version": "1.0.0"\n}');
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedData(Array.isArray(parsed) ? parsed : [parsed]);
      setError(null);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">JSON to Table</h2>
        <button 
          onClick={handleParse}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          Render Table
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Paste raw JSON into the editor to visualize it as an interactive table. Quickly verify data and export CSVs.
      </p>
      <CompanionTool to="/tools/mock-data" icon={DatabaseZap} accent="orange"
        title="Need test data? Generate it first"
        description="Build a typed schema and generate bulk mock JSON to paste directly into this view." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[400px]">
        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold flex justify-between items-center">
            INPUT JSON
          </div>
          <textarea 
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm text-muted-foreground placeholder:text-muted-foreground/50 transition-colors focus:ring-1 focus:ring-primary focus:bg-accent/5"
            placeholder="Paste your JSON here..."
          />
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[300px]">
          <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold flex justify-between items-center">
            OUTPUT TABLE
            {parsedData && (
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            )}
          </div>
          <div className="flex-1 p-4 overflow-auto">
            {error ? (
              <div className="text-destructive font-medium text-sm flex items-center justify-center h-full">
                {error}
              </div>
            ) : !parsedData ? (
              <div className="text-muted-foreground text-sm flex items-center justify-center h-full">
                Awaiting valid JSON...
              </div>
            ) : (
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-xs uppercase bg-muted text-muted-foreground">
                  <tr>
                    {Object.keys(parsedData[0] || {}).map(key => (
                      <th key={key} className="px-4 py-3 border-b border-border">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsedData.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      {Object.keys(parsedData[0] || {}).map(key => (
                        <td key={key} className="px-4 py-3">
                          {typeof row[key] === 'object' ? JSON.stringify(row[key]) : String(row[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
