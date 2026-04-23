import React, { useState } from 'react';
import { Binary, Copy } from 'lucide-react';

type Base = { label: string; prefix: string; radix: number };
const BASES: Base[] = [
  { label: 'Decimal', prefix: '', radix: 10 },
  { label: 'Binary', prefix: '0b', radix: 2 },
  { label: 'Octal', prefix: '0o', radix: 8 },
  { label: 'Hexadecimal', prefix: '0x', radix: 16 },
];

export default function NumberBaseConverter() {
  const [values, setValues] = useState<Record<string, string>>({ '10': '255', '2': '11111111', '8': '377', '16': 'ff' });
  const [error, setError] = useState('');

  const handleChange = (radix: number, val: string) => {
    setError('');
    const cleaned = val.trim().toLowerCase();
    if (!cleaned) { setValues({ '10': '', '2': '', '8': '', '16': '' }); return; }
    try {
      const decimal = parseInt(cleaned, radix);
      if (isNaN(decimal) || decimal < 0) throw new Error();
      setValues({
        '10': String(decimal),
        '2': decimal.toString(2),
        '8': decimal.toString(8),
        '16': decimal.toString(16),
      });
    } catch {
      setError(`Invalid ${BASES.find(b => b.radix === radix)?.label} value.`);
      setValues(prev => ({ ...prev, [String(radix)]: cleaned }));
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Binary className="w-6 h-6 text-primary" /> Number Base Converter</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Convert numbers between Decimal, Binary, Octal, and Hexadecimal. Essential for bitmasking, low-level operations, and reading memory addresses.
      </p>

      {error && <div className="text-sm text-destructive px-4 py-2 bg-destructive/10 border border-destructive/20 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 content-start">
        {BASES.map(({ label, prefix, radix }) => (
          <div key={radix} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/40 transition-colors group">
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</label>
              <span className="text-xs font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">Base {radix}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-muted-foreground text-sm">{prefix}</span>
              <input
                value={values[String(radix)] ?? ''}
                onChange={e => handleChange(radix, e.target.value)}
                className={`w-full bg-background border border-border rounded-lg px-3 py-3 font-mono text-lg font-bold outline-none focus:border-primary transition-all ${prefix ? 'pl-8' : ''}`}
                spellCheck="false"
              />
            </div>
            <button onClick={() => navigator.clipboard.writeText(values[String(radix)] ?? '')}
              className="mt-3 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border transition-all font-semibold">
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
