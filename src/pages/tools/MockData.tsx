import React, { useState } from 'react';
import { DatabaseZap, Plus, Trash2, Download, FileJson, Table2 } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

type FieldType = 'UUID' | 'Name' | 'Email' | 'Integer' | 'Date' | 'Boolean';
interface Field { id: string, name: string, type: FieldType }

export default function MockData() {
  const [fields, setFields] = useState<Field[]>([
      { id: '1', name: 'id', type: 'UUID' },
      { id: '2', name: 'fullName', type: 'Name' },
      { id: '3', name: 'email', type: 'Email' },
      { id: '4', name: 'isActive', type: 'Boolean' }
  ]);
  const [rows, setRows] = useState(10);
  const [generated, setGenerated] = useState('');

  const generateData = () => {
      const data = [];
      const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

      for (let i = 0; i < rows; i++) {
          const obj: any = {};
          const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
          
          fields.forEach(f => {
              if (f.type === 'UUID') obj[f.name] = crypto.randomUUID();
              else if (f.type === 'Name') obj[f.name] = `${fName} ${lName}`;
              else if (f.type === 'Email') obj[f.name] = `${fName}.${lName}${Math.floor(Math.random()*100)}@example.com`.toLowerCase();
              else if (f.type === 'Integer') obj[f.name] = Math.floor(Math.random() * 1000);
              else if (f.type === 'Boolean') obj[f.name] = Math.random() > 0.5;
              else if (f.type === 'Date') {
                  const d = new Date();
                  d.setDate(d.getDate() - Math.floor(Math.random() * 365));
                  obj[f.name] = d.toISOString();
              }
          });
          data.push(obj);
      }
      setGenerated(JSON.stringify(data, null, 2));
  };

  React.useEffect(() => { generateData(); }, [fields, rows]);

  const addField = () => setFields([...fields, { id: crypto.randomUUID(), name: 'newField', type: 'Name' }]);
  const removeField = (id: string) => setFields(fields.filter(f => f.id !== id));
  const updateField = (id: string, key: 'name'|'type', val: string) => {
      setFields(fields.map(f => f.id === id ? { ...f, [key]: val } : f));
  };

  const copy = () => navigator.clipboard.writeText(generated);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><DatabaseZap className="w-6 h-6 text-primary" /> Mock Data Generator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Define schema variable names and data types to instantly generate bulk JSON structures for database seeding or testing.
      </p>
      <CompanionTool to="/tools/json-to-table" icon={FileJson} accent="blue"
        title="Visualise with JSON to Table"
        description="Paste the generated JSON to render it as an interactive sortable table." />
      <CompanionTool to="/tools/csv-json" icon={Table2} accent="green"
        title="Export with CSV ↔ JSON"
        description="Convert the generated JSON array into a CSV spreadsheet in one click." />

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[400px]">
          <div className="flex flex-col gap-4 w-full lg:w-[400px] bg-card border border-border p-5 rounded-2xl shadow-sm h-fit">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                  <h3 className="font-bold">Schema Definition</h3>
                  <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Rows:</span>
                      <input type="number" min={1} max={1000} value={rows} onChange={e => setRows(parseInt(e.target.value))} className="w-16 px-2 py-1 text-sm bg-muted rounded border-none outline-none"/>
                  </div>
              </div>

              {fields.map(f => (
                  <div key={f.id} className="flex gap-2 items-center">
                      <input 
                         value={f.name} onChange={e => updateField(f.id, 'name', e.target.value)}
                         className="flex-1 bg-background border border-border rounded px-3 py-1.5 text-sm outline-none focus:border-primary font-mono"
                      />
                      <select 
                         value={f.type} onChange={e => updateField(f.id, 'type', e.target.value)}
                         className="w-28 bg-muted border border-border rounded px-2 py-1.5 text-sm outline-none focus:border-primary"
                      >
                          <option>UUID</option><option>Name</option><option>Email</option><option>Integer</option><option>Date</option><option>Boolean</option>
                      </select>
                      <button onClick={() => removeField(f.id)} className="p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded transition"><Trash2 className="w-4 h-4" /></button>
                  </div>
              ))}

              <button onClick={addField} className="w-full py-2 bg-muted hover:bg-muted/80 border border-dashed border-border flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition mt-2"><Plus className="w-4 h-4"/> Add Field</button>
          </div>

          <div className="flex flex-col flex-1 bg-card border border-border shadow-sm rounded-2xl overflow-hidden min-h-[300px]">
             <div className="p-3 border-b border-border bg-muted/50 font-semibold text-sm flex justify-between items-center">
                 GENERATED JSON
                 <button onClick={copy} className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80"><Download className="w-3 h-3"/> Copy Clipboard</button>
             </div>
             <pre className="flex-1 w-full bg-[#1e1e1e] p-6 overflow-auto outline-none font-mono text-sm leading-none text-blue-300/90">
                 {generated}
             </pre>
          </div>
      </div>
    </div>
  );
}
