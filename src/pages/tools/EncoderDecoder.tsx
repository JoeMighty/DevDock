import React, { useState } from 'react';
import { FileCode2, ArrowRightLeft } from 'lucide-react';

export default function EncoderDecoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'base64'|'url'>('base64');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const encode = () => {
    try {
        setError('');
        if (mode === 'base64') setOutput(btoa(input));
        else setOutput(encodeURIComponent(input));
    } catch {
        setError('Failed to encode string');
    }
  };

  const decode = () => {
    try {
        setError('');
        if (mode === 'base64') setOutput(atob(input));
        else setOutput(decodeURIComponent(input));
    } catch {
        setError('Invalid input string for decoding');
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><FileCode2 className="w-6 h-6 text-primary" /> Encoder / Decoder</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Instantly transform strings or raw code to browser-safe URL formats or obscure them via Base64.
      </p>

      <div className="flex gap-2">
         <button onClick={() => setMode('base64')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${mode === 'base64' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>Base64</button>
         <button onClick={() => setMode('url')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${mode === 'url' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>URL Encode</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[400px]">
         <div className="flex flex-col bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
             <div className="p-3 border-b border-border bg-muted/50 font-semibold text-sm">INPUT</div>
             <textarea 
               value={input}
               onChange={e => setInput(e.target.value)}
               className="flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm focus:bg-accent/5" 
               placeholder="Enter string here..."
             />
             <div className="p-3 border-t border-border flex justify-between bg-muted/20">
                <button onClick={encode} className="px-4 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary font-semibold rounded-lg text-sm transition-colors">Encode ➜</button>
                <button onClick={decode} className="px-4 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-lg text-sm transition-colors">Decode ➜</button>
             </div>
         </div>
         <div className="flex flex-col bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
             <div className="p-3 border-b border-border bg-muted/50 font-semibold text-sm flex justify-between items-center">
                 OUTPUT <ArrowRightLeft className="w-4 h-4 text-muted-foreground"/>
             </div>
             <textarea 
               value={output}
               readOnly
               className={`flex-1 w-full bg-transparent p-4 resize-none outline-none font-mono text-sm ${error ? 'text-destructive' : 'text-foreground'}`} 
               placeholder="Result appears here..."
             />
             {error && <div className="p-2 bg-destructive/10 text-destructive text-xs text-center border-t border-border">{error}</div>}
         </div>
      </div>
    </div>
  );
}
