import React, { useState } from 'react';
import { Database, Plus, Play, DatabaseZap } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

interface Column {
  name: string;
  type: string;
  extra: string;
}

interface Table {
  name: string;
  columns: Column[];
}

export default function SchemaDesigner() {
  const [tables, setTables] = useState<Table[]>([
    { name: 'users', columns: [{ name: 'id', type: 'SERIAL', extra: 'PRIMARY KEY' }, { name: 'email', type: 'VARCHAR(255)', extra: 'UNIQUE NOT NULL' }] }
  ]);
  const [sql, setSql] = useState('');

  const addTable = () => {
    setTables([...tables, { name: `table_${tables.length + 1}`, columns: [{ name: 'id', type: 'SERIAL', extra: 'PRIMARY KEY' }] }]);
  };

  const addColumn = (tableIndex: number) => {
    const newTables = [...tables];
    newTables[tableIndex].columns.push({ name: `col_${newTables[tableIndex].columns.length + 1}`, type: 'VARCHAR(255)', extra: '' });
    setTables(newTables);
  };

  const updateTable = (i: number, name: string) => {
    const newTables = [...tables];
    newTables[i].name = name;
    setTables(newTables);
  };

  const updateColumn = (ti: number, ci: number, field: keyof Column, val: string) => {
    const newTables = [...tables];
    newTables[ti].columns[ci][field] = val;
    setTables(newTables);
  };

  const removeTable = (i: number) => setTables(tables.filter((_, idx) => idx !== i));
  const removeColumn = (ti: number, ci: number) => {
    const newTables = [...tables];
    newTables[ti].columns = newTables[ti].columns.filter((_, idx) => idx !== ci);
    setTables(newTables);
  };

  const generateSQL = () => {
    let result = '';
    tables.forEach(t => {
      result += `CREATE TABLE ${t.name} (\n`;
      t.columns.forEach((c, idx) => {
        result += `  ${c.name} ${c.type} ${c.extra}${idx < t.columns.length - 1 ? ',' : ''}\n`;
      });
      result += `);\n\n`;
    });
    setSql(result);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Database className="w-6 h-6 text-primary" /> Schema Designer</h2>
        <div className="flex gap-2">
            <button onClick={addTable} className="px-4 py-2 bg-muted text-foreground rounded-md shadow-sm hover:bg-muted/80 transition-colors font-medium text-sm flex items-center gap-1"><Plus className="w-4 h-4"/> Add Table</button>
            <button onClick={generateSQL} className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/90 transition-colors font-medium text-sm flex items-center gap-1"><Play className="w-4 h-4" /> Generate SQL</button>
        </div>
      </div>
      <CompanionTool to="/tools/sql" icon={DatabaseZap} accent="green"
        title="Format the generated SQL"
        description="Copy the CREATE TABLE output and paste it into SQL Formatter for consistent indentation and dialect-specific keywords." />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 flex-1 overflow-hidden">
        <div className="lg:col-span-3 flex flex-wrap content-start gap-4 p-2 overflow-y-auto bg-muted/20 border border-border rounded-xl shadow-inner min-h-[400px]">
            {tables.map((table, ti) => (
                <div key={ti} className="bg-card w-full max-w-[320px] border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="bg-primary/10 p-2 border-b border-border flex justify-between items-center">
                        <input value={table.name} onChange={e => updateTable(ti, e.target.value)} className="bg-transparent font-bold text-sm w-[150px] outline-none focus:bg-background/50 px-1 rounded text-primary" />
                        <button onClick={() => removeTable(ti)} className="text-muted-foreground hover:text-destructive text-xs">✕</button>
                    </div>
                    <div className="p-2 flex flex-col gap-2">
                        {table.columns.map((c, ci) => (
                            <div key={ci} className="flex gap-2 group items-center">
                                <input value={c.name} onChange={e => updateColumn(ti, ci, 'name', e.target.value)} className="w-[80px] text-xs font-mono bg-muted border border-border rounded px-1 outline-none focus:border-primary" />
                                <input value={c.type} onChange={e => updateColumn(ti, ci, 'type', e.target.value)} className="w-[80px] text-xs font-mono bg-muted border border-border rounded px-1 outline-none focus:border-primary text-blue-500 font-semibold uppercase" />
                                <input value={c.extra} onChange={e => updateColumn(ti, ci, 'extra', e.target.value)} className="flex-1 text-[10px] font-mono bg-transparent border border-transparent hover:border-border rounded px-1 outline-none focus:border-primary text-muted-foreground uppercase" placeholder="Constraints..." />
                                <button onClick={() => removeColumn(ti, ci)} className="text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive text-xs scale-x-125">✕</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => addColumn(ti)} className="mx-2 mb-2 p-1 bg-muted hover:bg-muted/80 text-muted-foreground text-xs font-semibold rounded transition flex justify-center items-center gap-1"><Plus className="w-3 h-3" /> Add Column</button>
                </div>
            ))}
            {tables.length === 0 && <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium">Click "Add Table" to start designing</div>}
        </div>

        <div className="lg:col-span-2 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[300px]">
            <div className="p-3 border-b border-border bg-muted/50 text-sm font-semibold">SQL OUTPUT</div>
            <div className="flex-1 p-4 bg-[#1e1e1e] overflow-auto">
                {sql ? (
                    <pre className="text-blue-300 font-mono text-sm whitespace-pre-wrap">{sql}</pre>
                ) : (
                    <div className="text-muted-foreground text-center mt-10 text-sm flex flex-col items-center">
                        <Database className="w-10 h-10 mb-2 opacity-50"/>
                        Hit "Generate SQL" to preview.
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
