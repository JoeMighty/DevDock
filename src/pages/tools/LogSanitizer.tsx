import React, { useState } from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export default function LogSanitizer() {
  const [logs, setLogs] = useState('Error connecting to remote database [192.168.1.130] on 2023-10-01.\nUser email: admin@corporation.com\nProcessing Transaction: VISA 4321-1234-5678-0000');
  const [sanitized, setSanitized] = useState('');

  const runSanitizer = (text: string) => {
      let safe = text;
      
      // IPv4
      safe = safe.replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, '[REDACTED_IP]');
      
      // Email
      safe = safe.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[REDACTED_EMAIL]');
      
      // Credit Card (Generic 16 digits spacing)
      safe = safe.replace(/\b(?:\d[ -]*?){13,16}\b/g, '[REDACTED_CARD]');
      
      // MAC Address
      safe = safe.replace(/\b([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})\b/g, '[REDACTED_MAC]');

      setSanitized(safe);
  };

  React.useEffect(() => { runSanitizer(logs); }, [logs]);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-primary" /> PII Log Sanitizer</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Instantly scrubs sensitive Personally Identifiable Information (IPs, Emails, MACs, Credit Cards) from bulk raw server logs.
      </p>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-[400px]">
          <div className="flex-1 flex flex-col bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
             <div className="p-3 border-b border-border bg-muted/50 font-semibold text-sm">RAW LOGS</div>
             <textarea 
               value={logs}
               onChange={e => setLogs(e.target.value)}
               className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-[13px] leading-relaxed text-red-300"
               spellCheck="false"
             />
          </div>
          
          <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
          </div>

          <div className="flex-1 flex flex-col bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
             <div className="p-3 border-b border-border bg-muted/50 font-semibold text-sm text-primary flex items-center gap-2">
                 SANITIZED OUTPUT
             </div>
             <textarea 
               value={sanitized}
               readOnly
               className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-[13px] leading-relaxed text-green-300 pointer-events-none"
             />
          </div>
      </div>
    </div>
  );
}
