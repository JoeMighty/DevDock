import React, { useState, useEffect } from 'react';
import { CalendarClock, Copy, RefreshCw } from 'lucide-react';

export default function TimestampConverter() {
  const [unix, setUnix] = useState(String(Math.floor(Date.now() / 1000)));
  const [human, setHuman] = useState('');
  const [utc, setUtc] = useState('');
  const [ms, setMs] = useState(false);

  useEffect(() => {
    try {
      const num = Number(unix);
      const date = new Date(ms ? num : num * 1000);
      if (isNaN(date.getTime())) { setHuman('Invalid timestamp'); setUtc(''); return; }
      setHuman(date.toLocaleString());
      setUtc(date.toUTCString());
    } catch { setHuman('Invalid'); }
  }, [unix, ms]);

  const fromHuman = (val: string) => {
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      setUnix(ms ? String(d.getTime()) : String(Math.floor(d.getTime() / 1000)));
    }
  };

  const now = () => setUnix(ms ? String(Date.now()) : String(Math.floor(Date.now() / 1000)));

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><CalendarClock className="w-6 h-6 text-primary" /> Unix Timestamp Converter</h2>
        <button onClick={now} className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors">
          <RefreshCw className="w-4 h-4" /> Now
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Bidirectional Unix epoch converter. Input a timestamp to get a human-readable date, or enter a date string to extract the numeric epoch.
      </p>

      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => setMs(false)} className={`px-4 py-1.5 rounded-md text-sm font-bold border transition-all ${!ms ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>Seconds (s)</button>
        <button onClick={() => setMs(true)} className={`px-4 py-1.5 rounded-md text-sm font-bold border transition-all ${ms ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>Milliseconds (ms)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-3">Unix Timestamp</label>
            <input value={unix} onChange={e => setUnix(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 rounded-lg font-mono text-2xl font-bold outline-none focus:border-primary transition-all" />
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-3">Date String Input</label>
            <input onChange={e => fromHuman(e.target.value)} placeholder="e.g. 2024-01-15 09:30:00"
              className="w-full bg-background border border-border px-4 py-3 rounded-lg font-mono text-sm outline-none focus:border-primary transition-all" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[{ label: 'Local Time', value: human }, { label: 'UTC / GMT', value: utc }].map(({ label, value }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-6 shadow-sm flex-1 flex flex-col justify-between">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-3">{label}</label>
              <div className="font-semibold text-lg break-all">{value}</div>
              <button onClick={() => navigator.clipboard.writeText(value)} className="self-end mt-4 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border transition-all font-semibold">
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
