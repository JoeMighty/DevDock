import React, { useState, useEffect, useCallback } from 'react';
import * as OTPAuth from 'otpauth';
import { KeyRound, Copy, RefreshCw, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

function generateSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function OtpGenerator() {
  const [secret, setSecret] = useLocalStorage('devdock_otp_secret', generateSecret());
  const [digits, setDigits] = useLocalStorage<number>('devdock_otp_digits', 6);
  const [period, setPeriod] = useLocalStorage<number>('devdock_otp_period', 30);
  const [algo, setAlgo] = useLocalStorage<'SHA1' | 'SHA256' | 'SHA512'>('devdock_otp_algo', 'SHA1');
  const [code, setCode] = useState('');
  const [remaining, setRemaining] = useState(0);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCode = useCallback(() => {
    setError('');
    try {
      const totp = new OTPAuth.TOTP({
        algorithm: algo,
        digits,
        period,
        secret: OTPAuth.Secret.fromBase32(secret.toUpperCase().replace(/\s/g, '')),
      });
      setCode(totp.generate());
    } catch {
      setError('Invalid Base32 secret. Use only A-Z and 2-7.');
      setCode('');
    }
  }, [secret, digits, period, algo]);

  useEffect(() => {
    generateCode();
    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      setRemaining(period - (now % period));
      generateCode();
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [generateCode, period]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const progress = (remaining / period) * 100;
  const urgency = remaining <= 5;

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-primary" /> OTP / TOTP Generator
        </h2>
        <button onClick={() => setSecret(generateSecret())}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors">
          <RefreshCw className="w-4 h-4" /> New Secret
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Generate live Time-based One-Time Passwords (TOTP) for testing 2FA implementations. Enter your own Base32 secret or generate a random one.
      </p>

      {/* Live Code Display */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        {code ? (
          <>
            <button onClick={copyCode}
              className={`font-mono text-5xl font-black tracking-[0.25em] transition-colors ${urgency ? 'text-red-400' : 'text-primary'}`}>
              {code}
            </button>
            <button onClick={copyCode}
              className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted border border-border rounded-lg text-sm font-bold transition-colors">
              {copied ? <><Check className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Code</>}
            </button>
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Expires in</span>
                <span className={`font-mono font-bold ${urgency ? 'text-red-400' : 'text-foreground'}`}>{remaining}s</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${urgency ? 'bg-red-400' : 'bg-primary'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-destructive text-sm font-semibold">{error || 'Waiting...'}</div>
        )}
      </div>

      {/* Config */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-4">
        <div>
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Base32 Secret Key</label>
          <div className="flex gap-2">
            <input value={secret} onChange={e => setSecret(e.target.value)}
              className="flex-1 bg-background border border-border px-4 py-2.5 rounded-xl font-mono text-sm outline-none focus:border-primary transition-all tracking-wider"
              spellCheck="false" />
            <button onClick={() => navigator.clipboard.writeText(secret)}
              className="px-3 py-2 bg-muted/50 hover:bg-muted border border-border rounded-xl transition-colors">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {error && <p className="text-destructive text-xs mt-1.5 font-semibold">{error}</p>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Algorithm</label>
            <div className="flex flex-col gap-1">
              {(['SHA1', 'SHA256', 'SHA512'] as const).map(a => (
                <button key={a} onClick={() => setAlgo(a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all text-left ${algo === a ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Digits</label>
            {[6, 8].map(d => (
              <button key={d} onClick={() => setDigits(d)}
                className={`w-full mb-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${digits === d ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                {d} digits
              </button>
            ))}
          </div>
          <div>
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Period</label>
            {[30, 60].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`w-full mb-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${period === p ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
                {p}s
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
