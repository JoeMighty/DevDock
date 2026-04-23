import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Fingerprint, Copy, Hash, Network } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type Algo = 'SHA256' | 'SHA512' | 'SHA1' | 'MD5';

function computeHmac(message: string, key: string, algo: Algo): { hex: string; base64: string } {
  try {
    let sig: CryptoJS.lib.WordArray;
    const k = CryptoJS.enc.Utf8.parse(key);
    const m = CryptoJS.enc.Utf8.parse(message);
    switch (algo) {
      case 'SHA256': sig = CryptoJS.HmacSHA256(m, k); break;
      case 'SHA512': sig = CryptoJS.HmacSHA512(m, k); break;
      case 'SHA1':   sig = CryptoJS.HmacSHA1(m, k);   break;
      case 'MD5':    sig = CryptoJS.HmacMD5(m, k);    break;
    }
    return {
      hex: sig.toString(CryptoJS.enc.Hex),
      base64: sig.toString(CryptoJS.enc.Base64),
    };
  } catch {
    return { hex: '', base64: '' };
  }
}

export default function HmacCalculator() {
  const [message, setMessage] = useLocalStorage('devdock_hmac_message', 'Hello, World!');
  const [key, setKey]         = useLocalStorage('devdock_hmac_key', 'my-secret-key');
  const [algo, setAlgo]       = useLocalStorage<Algo>('devdock_hmac_algo', 'SHA256');
  const [copied, setCopied]   = useState<string | null>(null);

  const result = message && key ? computeHmac(message, key, algo) : { hex: '', base64: '' };

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const ALGOS: Algo[] = ['SHA256', 'SHA512', 'SHA1', 'MD5'];

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Fingerprint className="w-6 h-6 text-primary" /> HMAC Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Calculate HMAC signatures for webhook verification, API request signing, and token validation. Outputs both <code className="font-mono text-primary bg-primary/10 px-1 rounded">hex</code> and <code className="font-mono text-primary bg-primary/10 px-1 rounded">base64</code> encodings. Entirely offline.
      </p>
      <CompanionTool to="/tools/hash" icon={Hash} accent="cyan"
        title="Pair with Hash & UUID Generator"
        description="Compare HMAC signatures against plain SHA digests or generate UUIDs as HMAC keys." />
      <CompanionTool to="/tools/api-tester" icon={Network} accent="blue"
        title="Test the signed request in API Tester"
        description="Copy the HMAC signature as a header value and fire the signed request directly." />

      {/* Algorithm selector */}
      <div className="flex gap-2 flex-wrap">
        {ALGOS.map(a => (
          <button key={a} onClick={() => setAlgo(a)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${algo === a ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'}`}>
            HMAC-{a}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 bg-muted/30 border-b border-border">Message</div>
          <textarea value={message} onChange={e => setMessage(e.target.value)}
            spellCheck={false}
            className="w-full bg-transparent p-4 font-mono text-sm outline-none resize-none min-h-[120px] text-foreground" />
        </div>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2.5 bg-muted/30 border-b border-border">Secret Key</div>
          <textarea value={key} onChange={e => setKey(e.target.value)}
            spellCheck={false}
            className="w-full bg-transparent p-4 font-mono text-sm outline-none resize-none min-h-[120px] text-foreground" />
        </div>
      </div>

      {/* Results */}
      {result.hex && (
        <div className="flex flex-col gap-3">
          {[
            { label: `HMAC-${algo} (Hex)`, value: result.hex },
            { label: `HMAC-${algo} (Base64)`, value: result.base64 },
          ].map(({ label, value }) => (
            <div key={label} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
                <button onClick={() => copy(value, label)}
                  className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                  <Copy className="w-3.5 h-3.5" />
                  {copied === label ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 font-mono text-sm text-foreground break-all leading-relaxed">{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Webhook example */}
      <div className="bg-muted/20 border border-border rounded-xl p-4 text-xs text-muted-foreground">
        <span className="font-bold text-foreground block mb-1">Common use cases</span>
        GitHub webhooks use <code className="font-mono text-primary">HMAC-SHA256</code> · Stripe uses <code className="font-mono text-primary">HMAC-SHA256</code> · Slack uses <code className="font-mono text-primary">HMAC-SHA256</code> with a timestamp prefix · AWS SigV4 uses <code className="font-mono text-primary">HMAC-SHA256</code> in a chain of 4 iterations.
      </div>
    </div>
  );
}
