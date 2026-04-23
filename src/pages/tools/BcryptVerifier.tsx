import React, { useState } from 'react';
import { CheckCircle2, ShieldOff, Fingerprint } from 'lucide-react';
import bcrypt from 'bcryptjs';

export default function BcryptVerifier() {
  const [plainText, setPlainText] = useState('');
  const [hash, setHash] = useState('');
  const [matchState, setMatchState] = useState<'idle' | 'matched' | 'failed'>('idle');

  const verify = () => {
      if (!plainText || !hash) return;
      try {
          const isValid = bcrypt.compareSync(plainText, hash);
          setMatchState(isValid ? 'matched' : 'failed');
      } catch {
          setMatchState('failed');
      }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Fingerprint className="w-6 h-6 text-primary" /> Bcrypt Hash Verifier</h2>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-6">
        Safely cross-verify heavily salted Bcrypt hashes against raw string inputs to test auth validation layers offline.
      </p>

      <div className="bg-card w-full max-w-3xl border border-border shadow-sm rounded-2xl p-6 lg:p-10 flex flex-col gap-6 mx-auto mt-4">
          
          <div>
             <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1.5">Plaintext Guess</label>
             <input 
                 value={plainText}
                 onChange={e => { setPlainText(e.target.value); setMatchState('idle'); }}
                 className="w-full bg-background border border-border px-5 py-4 rounded-xl text-lg outline-none focus:border-primary transition-all font-mono" 
                 placeholder="admin123" 
             />
          </div>

          <div className="relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-muted flex items-center justify-center border-4 border-card z-10 font-bold text-xs text-muted-foreground">VS</div>
             <div className="w-full h-px bg-border" />
          </div>

          <div>
             <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1.5">Bcrypt Hash Digest</label>
             <input 
                 value={hash}
                 onChange={e => { setHash(e.target.value); setMatchState('idle'); }}
                 className="w-full bg-background border border-border px-5 py-4 rounded-xl text-sm outline-none focus:border-primary transition-all font-mono" 
                 placeholder="$2a$10$w...salted...hash" 
             />
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
              <button 
                  onClick={verify}
                  disabled={!plainText || !hash}
                  className="w-full md:w-auto px-10 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                  Execute Cryptographic Verification
              </button>

              <div className="flex-1 w-full relative h-[56px] border border-border rounded-xl overflow-hidden bg-background">
                  {matchState === 'idle' && (
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-muted-foreground">Waiting for Execution</div>
                  )}
                  {matchState === 'matched' && (
                      <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center gap-3 text-green-500 font-bold tracking-tight text-lg">
                          <CheckCircle2 className="w-6 h-6" /> VALID MATCH
                      </div>
                  )}
                  {matchState === 'failed' && (
                      <div className="absolute inset-0 bg-destructive/10 flex items-center justify-center gap-3 text-destructive font-bold tracking-tight text-lg">
                          <ShieldOff className="w-6 h-6" /> INVALID HASH ALIGNMENT
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
}
