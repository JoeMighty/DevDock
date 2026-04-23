import React, { useState, useCallback } from 'react';
import { KeySquare, Copy, RefreshCw, Check, ShieldCheck, Fingerprint } from 'lucide-react';
import { CompanionTool } from '@/components/CompanionTool';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMS  = '0123456789';
const SYMS  = '!@#$%^&*()-_=+[]{}|;:,.<>?';
const AMBIG = 'Il1O0';

function entropy(password: string): number {
  const has = (s: string) => [...new Set(password)].some(c => s.includes(c));
  let pool = 0;
  if (has(UPPER)) pool += 26;
  if (has(LOWER)) pool += 26;
  if (has(NUMS))  pool += 10;
  if (has(SYMS))  pool += SYMS.length;
  return pool > 0 ? Math.log2(Math.pow(pool, password.length)) : 0;
}

function strengthen(bits: number) {
  if (bits < 40)  return { label: 'Very Weak', color: 'bg-red-500',    pct: 15 };
  if (bits < 60)  return { label: 'Weak',      color: 'bg-orange-500', pct: 35 };
  if (bits < 80)  return { label: 'Fair',      color: 'bg-yellow-400', pct: 58 };
  if (bits < 100) return { label: 'Strong',    color: 'bg-green-500',  pct: 78 };
  return           { label: 'Very Strong', color: 'bg-emerald-400', pct: 100 };
}

function generate(length: number, upper: boolean, lower: boolean, nums: boolean, syms: boolean, noAmbig: boolean): string {
  let pool = '';
  const required: string[] = [];
  if (upper) { pool += UPPER; required.push(UPPER[Math.floor(Math.random() * UPPER.length)]); }
  if (lower) { pool += LOWER; required.push(LOWER[Math.floor(Math.random() * LOWER.length)]); }
  if (nums)  { pool += NUMS;  required.push(NUMS[Math.floor(Math.random()  * NUMS.length)]); }
  if (syms)  { pool += SYMS;  required.push(SYMS[Math.floor(Math.random()  * SYMS.length)]); }
  if (!pool) pool = LOWER;
  if (noAmbig) pool = pool.split('').filter(c => !AMBIG.includes(c)).join('');
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  const base = Array.from(arr, n => pool[n % pool.length]);
  // Splice required chars in
  required.forEach((c, i) => { base[i % base.length] = c; });
  // Fisher-Yates shuffle
  for (let i = base.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  return base.join('');
}

export default function PasswordGenerator() {
  const [length, setLength]     = useLocalStorage<number>('devdock_pwgen_length', 20);
  const [upper, setUpper]       = useLocalStorage<boolean>('devdock_pwgen_upper', true);
  const [lower, setLower]       = useLocalStorage<boolean>('devdock_pwgen_lower', true);
  const [nums, setNums]         = useLocalStorage<boolean>('devdock_pwgen_nums', true);
  const [syms, setSyms]         = useLocalStorage<boolean>('devdock_pwgen_syms', true);
  const [noAmbig, setNoAmbig]   = useLocalStorage<boolean>('devdock_pwgen_noambig', false);
  const [bulk, setBulk]         = useLocalStorage<number>('devdock_pwgen_bulk', 1);
  const [passwords, setPasswords] = useState<string[]>(() => [generate(20, true, true, true, true, false)]);
  const [copied, setCopied]     = useState<number | null>(null);

  const regen = useCallback(() => {
    setPasswords(Array.from({ length: bulk }, () => generate(length, upper, lower, nums, syms, noAmbig)));
  }, [length, upper, lower, nums, syms, noAmbig, bulk]);

  const copy = (pwd: string, i: number) => {
    navigator.clipboard.writeText(pwd);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${value ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'}`}>
      {label}
    </button>
  );

  const str = strengthen(entropy(passwords[0] || ''));

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><KeySquare className="w-6 h-6 text-primary" /> Password Generator</h2>
        <button onClick={regen}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted border border-border text-sm font-semibold rounded-lg transition-colors">
          <RefreshCw className="w-4 h-4" /> Regenerate
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80">
        Generate cryptographically secure passwords using <code className="font-mono text-primary bg-primary/10 px-1 rounded">crypto.getRandomValues()</code>. Configure charset, length and bulk-generate for password managers.
      </p>
      <CompanionTool to="/tools/bcrypt" icon={Fingerprint} accent="purple"
        title="Hash it with Bcrypt"
        description="Once generated, hash your password in Bcrypt Verifier to store it safely." />
      <CompanionTool to="/tools/password" icon={ShieldCheck} accent="green"
        title="Check its strength"
        description="Run the password through Password Analyzer for a detailed entropy breakdown." />

      {/* Config */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col gap-4">
        <div>
          <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
            <span>Length</span><span className="text-primary">{length} characters</span>
          </div>
          <input type="range" min={8} max={128} step={1} value={length}
            onChange={e => setLength(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Toggle label="A–Z Uppercase" value={upper} onChange={setUpper} />
          <Toggle label="a–z Lowercase" value={lower} onChange={setLower} />
          <Toggle label="0–9 Numbers"   value={nums}  onChange={setNums} />
          <Toggle label="Symbols"        value={syms}  onChange={setSyms} />
          <Toggle label="No Ambiguous"   value={noAmbig} onChange={setNoAmbig} />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Bulk Generate</span>
          {[1, 5, 10, 20].map(n => (
            <button key={n} onClick={() => setBulk(n)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${bulk === n ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
              ×{n}
            </button>
          ))}
        </div>
      </div>

      {/* Strength bar (for first password) */}
      {passwords[0] && bulk === 1 && (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
            <span className="text-muted-foreground">Strength</span>
            <span className={str.color.replace('bg-', 'text-')}>{str.label} · {Math.round(entropy(passwords[0]))} bits</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${str.color}`} style={{ width: `${str.pct}%` }} />
          </div>
        </div>
      )}

      {/* Password list */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {passwords.map((pwd, i) => (
          <div key={i} className="group flex items-center gap-3 bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/30 transition-all">
            <code className="flex-1 font-mono text-sm tracking-wider truncate text-foreground">{pwd}</code>
            <button onClick={() => copy(pwd, i)}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
              {copied === i ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      <button onClick={regen}
        className="w-full py-3.5 bg-gradient-to-r from-primary to-purple-600 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4" /> Generate {bulk > 1 ? `${bulk} Passwords` : 'Password'}
      </button>
    </div>
  );
}
