import React, { useState } from 'react';
import { Hash, Copy, RefreshCw } from 'lucide-react';
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs';

export default function HashGenerator() {
  const [stringInput, setStringInput] = useState('DevDock');
  const [md5, setMd5] = useState('');
  const [sha256, setSha256] = useState('');
  const [bcryptHash, setBcryptHash] = useState('');
  const [uuids, setUuids] = useState<string[]>([]);
  const [uuidCount, setUuidCount] = useState(5);

  React.useEffect(() => {
     try {
         setMd5(CryptoJS.MD5(stringInput).toString());
         setSha256(CryptoJS.SHA256(stringInput).toString());
     } catch {
         setMd5('Error'); setSha256('Error');
     }
  }, [stringInput]);

  const generateBcrypt = () => {
      const salt = bcrypt.genSaltSync(10);
      setBcryptHash(bcrypt.hashSync(stringInput, salt));
  };

  const generateUuids = () => {
      const newUuids = Array.from({ length: Math.min(Math.max(1, uuidCount), 100) }, () => crypto.randomUUID());
      setUuids(newUuids);
  };
  
  // Generating initial UUIDs
  React.useEffect(() => { generateUuids(); }, []);

  const copy = (text: string) => navigator.clipboard.writeText(text);

  const OutputRow = ({ label, value }: { label: string, value: string }) => (
      <div className="flex flex-col gap-2">
         <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{label}</label>
            {value && <button onClick={() => copy(value)} className="text-xs text-primary hover:text-primary/70 flex items-center gap-1"><Copy className="w-3 h-3"/> Copy</button>}
         </div>
         <div className="bg-muted px-4 py-3 rounded-lg font-mono text-sm border border-border break-all">
             {value || <span className="text-muted-foreground/50">Awaiting generation...</span>}
         </div>
      </div>
  );

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Hash className="w-6 h-6 text-primary" /> Hash & UUID Generator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-4">
        Instantly calculate MD5 and SHA digests, generate secure saled Bcrypt password hashes, or bulk-generate UUIDv4 strings.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[400px]">
          <div className="flex flex-col gap-6 bg-card border border-border rounded-3xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-2">Cryptographic Hashes</h3>
              <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Input String</label>
                  <input 
                      value={stringInput} 
                      onChange={e => setStringInput(e.target.value)} 
                      className="bg-transparent border-b-2 border-muted hover:border-primary/50 focus:border-primary outline-none transition-colors px-1 py-2 text-lg font-medium"
                  />
              </div>

              <OutputRow label="MD5 Digest" value={md5} />
              <OutputRow label="SHA-256 Digest" value={sha256} />
              
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                 <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Bcrypt (Salt 10)</label>
                    <button onClick={generateBcrypt} className="text-xs text-primary hover:text-primary/70 flex items-center gap-1"><RefreshCw className="w-3 h-3"/> Generate</button>
                 </div>
                 <div className="bg-muted px-4 py-3 rounded-lg font-mono text-sm border border-border break-all flex justify-between items-center">
                     {bcryptHash ? bcryptHash : <span className="text-muted-foreground/50">Click generate to hash via Bcrypt.</span>}
                     {bcryptHash && <button onClick={() => copy(bcryptHash)} className="text-muted-foreground hover:text-primary"><Copy className="w-4 h-4" /></button>}
                 </div>
              </div>
          </div>

          <div className="flex flex-col gap-6 bg-card border border-border rounded-3xl shadow-sm p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">UUIDv4 Generator</h3>
                  <div className="flex items-center gap-3">
                      <input 
                          type="number" 
                          min={1} max={100} 
                          value={uuidCount} 
                          onChange={e => setUuidCount(parseInt(e.target.value))} 
                          className="w-16 bg-muted px-2 py-1 rounded text-sm text-center border-none outline-none"
                      />
                      <button onClick={generateUuids} className="px-3 py-1.5 bg-primary/20 text-primary font-medium rounded-md hover:bg-primary/30 transition-colors flex items-center gap-2 text-sm"><RefreshCw className="w-3.5 h-3.5"/> Refresh</button>
                  </div>
              </div>
              <div className="flex-1 overflow-auto bg-muted/40 border border-border rounded-xl p-4">
                  {uuids.map((id, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0 group">
                          <span className="font-mono text-sm opacity-90">{id}</span>
                          <button onClick={() => copy(id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"><Copy className="w-4 h-4" /></button>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
