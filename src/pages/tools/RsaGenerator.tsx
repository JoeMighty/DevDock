import React, { useState } from 'react';
import { KeyRound, Shield, Copy, Check, RefreshCw } from 'lucide-react';
import forge from 'node-forge';

export default function RsaGenerator() {
  const [keySize, setKeySize] = useState(2048);
  const [keys, setKeys] = useState<{ public: string; private: string } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<'pub' | 'priv' | null>(null);

  const generate = () => {
    setGenerating(true);
    // Use setTimeout to allow UI to show loading
    setTimeout(() => {
      try {
        const pair = forge.pki.rsa.generateKeyPair(keySize);
        setKeys({
          public: forge.pki.publicKeyToPem(pair.publicKey),
          private: forge.pki.privateKeyToPem(pair.privateKey)
        });
      } catch (e) {
        console.error(e);
      } finally {
        setGenerating(false);
      }
    }, 100);
  };

  const copy = (type: 'pub' | 'priv') => {
    if (!keys) return;
    navigator.clipboard.writeText(type === 'pub' ? keys.public : keys.private);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><KeyRound className="w-6 h-6 text-primary" /> RSA Key Generator</h2>
        <div className="flex items-center gap-4">
          <select 
            value={keySize}
            onChange={(e) => setKeySize(Number(e.target.value))}
            className="bg-transparent text-sm font-bold border-b border-primary/20 outline-none cursor-pointer hover:border-primary transition-colors pr-2"
          >
            <option value="1024">1024-bit</option>
            <option value="2048">2048-bit</option>
            <option value="4096">4096-bit</option>
          </select>
          <button 
            disabled={generating}
            onClick={generate}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {generating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
            Generate Pair
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-[#22c55e]">Public Key (PEM)</span>
            {keys && (
              <button onClick={() => copy('pub')} className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                {copied === 'pub' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy Public
              </button>
            )}
          </div>
          <pre className="flex-1 p-4 font-mono text-[11px] text-foreground overflow-auto bg-black/10 leading-normal scrollbar-none">
            {keys?.public || <div className="h-full flex items-center justify-center italic text-muted-foreground/30 uppercase tracking-[0.2em]">Ready to generate</div>}
          </pre>
        </div>

        <div className="flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-[#ef4444]">Private Key (PEM)</span>
            {keys && (
              <button onClick={() => copy('priv')} className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                {copied === 'priv' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                Copy Private
              </button>
            )}
          </div>
          <pre className="flex-1 p-4 font-mono text-[11px] text-foreground overflow-auto bg-black/10 leading-normal scrollbar-none">
            {generating ? <div className="h-full flex flex-col items-center justify-center gap-2"><RefreshCw className="w-6 h-6 animate-spin text-primary" /><p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest animate-pulse">Running Primes...</p></div> : keys?.private || <div className="h-full flex items-center justify-center italic text-muted-foreground/30 uppercase tracking-[0.2em]">Ready to generate</div>}
          </pre>
          {keys && (
            <div className="absolute top-10 right-4 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[9px] font-bold tracking-tight uppercase">
              Keep secret
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
