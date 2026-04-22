import React, { useState, useEffect } from 'react';
import { Clock, Copy } from 'lucide-react';

export default function CronGenerator() {
  const [min, setMin] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');

  const cronString = `${min} ${hour} ${day} ${month} ${weekday}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronString);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Clock className="w-6 h-6 text-primary" /> Cron Generator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Visually build complex cron schedule expressions without memorizing the syntax. 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-card border border-border p-5 rounded-2xl shadow-sm mb-4">
          <div className="flex flex-col gap-2">
             <label className="text-xs font-semibold text-muted-foreground uppercase">Minute (0-59)</label>
             <input type="text" value={min} onChange={e => setMin(e.target.value)} className="bg-muted px-4 py-2 border border-border rounded-md font-mono focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
             <label className="text-xs font-semibold text-muted-foreground uppercase">Hour (0-23)</label>
             <input type="text" value={hour} onChange={e => setHour(e.target.value)} className="bg-muted px-4 py-2 border border-border rounded-md font-mono focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
             <label className="text-xs font-semibold text-muted-foreground uppercase">Day (1-31)</label>
             <input type="text" value={day} onChange={e => setDay(e.target.value)} className="bg-muted px-4 py-2 border border-border rounded-md font-mono focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
             <label className="text-xs font-semibold text-muted-foreground uppercase">Month (1-12)</label>
             <input type="text" value={month} onChange={e => setMonth(e.target.value)} className="bg-muted px-4 py-2 border border-border rounded-md font-mono focus:border-primary outline-none" />
          </div>
          <div className="flex flex-col gap-2">
             <label className="text-xs font-semibold text-muted-foreground uppercase">Weekday (0-6)</label>
             <input type="text" value={weekday} onChange={e => setWeekday(e.target.value)} className="bg-muted px-4 py-2 border border-border rounded-md font-mono focus:border-primary outline-none" />
          </div>
      </div>

      <div className="relative group p-10 bg-primary/5 border border-primary/20 rounded-2xl flex items-center justify-center min-h-[200px]">
          <div className="text-5xl md:text-7xl font-mono font-bold text-primary tracking-widest drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
             {cronString}
          </div>
          <button 
             onClick={copyToClipboard}
             className="absolute top-4 right-4 p-2 bg-primary/20 text-primary rounded-md opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white flex items-center gap-2"
          >
             <Copy className="w-4 h-4" /> Copy Raw
          </button>
      </div>
      
      <div className="mt-4 p-5 bg-muted/40 border border-border rounded-2xl">
         <h4 className="font-semibold mb-3">Syntax Cheat Sheet</h4>
         <code className="text-sm text-foreground bg-background px-3 py-2 rounded-md font-mono border border-border overflow-auto block leading-relaxed shadow-inner">
            * any value<br/>
            , value list separator<br/>
            - range of values<br/>
            / step values
         </code>
      </div>
    </div>
  );
}
