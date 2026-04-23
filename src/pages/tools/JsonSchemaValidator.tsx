import React, { useState } from 'react';
import Ajv from 'ajv';
import { FileCheck2, CheckCircle2, XCircle, DatabaseZap, SplitSquareHorizontal } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';

const ajv = new Ajv({ allErrors: true, verbose: false });

const DEFAULT_JSON = `{
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com",
  "roles": ["admin", "editor"]
}`;

const DEFAULT_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["name", "age", "email"],
  "properties": {
    "name":  { "type": "string", "minLength": 1 },
    "age":   { "type": "integer", "minimum": 0, "maximum": 120 },
    "email": { "type": "string", "format": "email" },
    "roles": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "additionalProperties": false
}`;

export default function JsonSchemaValidator() {
  const [json, setJson]     = useState(DEFAULT_JSON);
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [result, setResult] = useState<{ valid: boolean; errors: string[] } | null>(null);

  const validate = () => {
    let parsedJson: unknown, parsedSchema: unknown;
    const errors: string[] = [];

    try { parsedJson = JSON.parse(json); }
    catch (e: any) { setResult({ valid: false, errors: [`JSON parse error: ${e.message}`] }); return; }

    try { parsedSchema = JSON.parse(schema); }
    catch (e: any) { setResult({ valid: false, errors: [`Schema parse error: ${e.message}`] }); return; }

    try {
      const validate = ajv.compile(parsedSchema as object);
      const valid = validate(parsedJson);
      if (valid) {
        setResult({ valid: true, errors: [] });
      } else {
        const errs = (validate.errors || []).map(e => {
          const path = e.instancePath || '(root)';
          return `${path}: ${e.message}`;
        });
        setResult({ valid: false, errors: errs });
      }
    } catch (e: any) {
      errors.push(`Validation error: ${e.message}`);
      setResult({ valid: false, errors });
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><FileCheck2 className="w-6 h-6 text-primary" /> JSON Schema Validator</h2>
        <button onClick={validate}
          className="px-5 py-2 bg-primary text-primary-foreground font-bold rounded-xl text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
          Validate
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Validate any JSON document against a <code className="font-mono text-primary bg-primary/10 px-1 rounded">JSON Schema Draft-07</code> definition using Ajv. Path-level errors highlight exactly which fields fail.
      </p>
      <CompanionTool to="/tools/mock-data" icon={DatabaseZap} accent="orange"
        title="Need test JSON? Generate it"
        description="Use Mock Data Generator to create a typed JSON payload, then validate its structure here." />
      <CompanionTool to="/tools/json-diff" icon={SplitSquareHorizontal} accent="cyan"
        title="Compare two JSON payloads"
        description="Check structural differences between two JSON objects in JSON Diff after validation." />

      {/* Result banner */}
      {result && (
        <div className={`flex items-start gap-3 p-4 rounded-xl border text-sm font-semibold ${result.valid ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
          {result.valid
            ? <><CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" /><span>Valid — JSON matches the schema perfectly.</span></>
            : <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2"><XCircle className="w-5 h-5 flex-shrink-0" /> Invalid — {result.errors.length} error{result.errors.length !== 1 ? 's' : ''} found</div>
                <ul className="flex flex-col gap-1 mt-1">
                  {result.errors.map((e, i) => (
                    <li key={i} className="text-xs font-mono bg-muted/30 px-3 py-1.5 rounded-lg text-red-300">{e}</li>
                  ))}
                </ul>
              </div>
          }
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[300px]">
        {[
          { label: 'JSON Document', value: json, set: setJson, placeholder: 'Paste your JSON here…' },
          { label: 'JSON Schema', value: schema, set: setSchema, placeholder: 'Paste your JSON Schema here…' },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label} className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 bg-muted/30 border-b border-border">
              {label}
            </div>
            <textarea
              value={value}
              onChange={e => set(e.target.value)}
              placeholder={placeholder}
              className="flex-1 resize-none bg-transparent p-4 font-mono text-sm outline-none text-foreground placeholder:text-muted-foreground/40 min-h-[200px]"
              spellCheck={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
